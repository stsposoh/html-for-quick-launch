import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import gulpIf from 'gulp-if';
import fileInclude from 'gulp-file-include';
import terser from 'gulp-terser';
import gcmq from 'gulp-group-css-media-queries';
import svgSprite from 'gulp-svg-sprite';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { rimraf } from 'rimraf';
import rename from 'gulp-rename';

const { src, dest, lastRun, watch, series, parallel } = gulp;
const argv = yargs(hideBin(process.argv)).argv;
const PRODUCTION = argv.prod;
const server = browserSync.create();
const sass = gulpSass(dartSass);

// Sass options
const sassOptions = {
  silenceDeprecations: ['legacy-js-api', 'import']
};

// Copy assets (fonts, favicon, etc.)
export const assets = () => {
  return src([
    'app/assets/**/*.*',
    '!app/assets/images/**/*.*',
    '!app/assets/svg-for-sprite/**/*.*'
  ], { since: lastRun(assets), encoding: false })
    .pipe(newer('dist'))
    .pipe(dest('dist'));
};

// Build HTML with includes
export const html = () => {
  return src('app/html/**/[^_]*.html')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'HTML',
        message: err.message
      }))
    }))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(debug({ title: 'HTML:' }))
    .pipe(dest('dist'));
};

// Compile CSS libraries
export const stylesLibs = () => {
  return src('app/scss/libs.scss')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles Libs',
        message: err.message
      }))
    }))
    .pipe(sass.sync(sassOptions).on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(dest('dist/css'));
};

// Compile main styles
export const styles = () => {
  return src('app/scss/bundle.scss')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles',
        message: err.message
      }))
    }))
    .pipe(gulpIf(!PRODUCTION, sourcemaps.init()))
    .pipe(sass.sync(sassOptions).on('error', sass.logError))
    .pipe(gulpIf(PRODUCTION, gcmq()))
    // .pipe(gulpIf(PRODUCTION, cleanCss()))  // Uncomment to minify CSS
    .pipe(gulpIf(!PRODUCTION, sourcemaps.write('.')))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
};

// Bundle JS libraries
export const libs = () => {
  return src([
    // Include JS libraries here
    'app/libs/empty.js',
  ])
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Libs',
        message: err.message
      }))
    }))
    .pipe(concat('libs.min.js'))
    .pipe(terser())
    .pipe(dest('dist/js'));
};

// Bundle main JS
export const js = () => {
  return src('app/js/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'JS',
        message: err.message
      }))
    }))
    .pipe(concat('bundle.js'))
    // .pipe(gulpIf(PRODUCTION, terser()))  // Uncomment to minify JS
    .pipe(dest('dist/js'));
};

// Create SVG sprite
export const svg = () => {
  return src('app/assets/svg-for-sprite/*.svg', { allowEmpty: true })
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(rename((path) => {
      if (path.dirname === 'stack') {
        path.dirname = '';
      }
    }))
    .pipe(dest('dist/images/'));
};

// Copy images
export const images = () => {
  return src('app/assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,avif}', { encoding: false })
    .pipe(newer('dist/images'))
    .pipe(dest('dist/images'));
};

// Start dev server
export const serve = (done) => {
  server.init({
    server: 'dist',
    notify: false,
    online: true,
    open: false
  });
  done();
};

// Reload browser
export const reload = (done) => {
  server.reload();
  done();
};

// Clean dist folder
export const clean = async () => {
  await rimraf('dist');
};

// Watch for file changes
export const watchFiles = () => {
  watch('app/scss/**/*.scss', styles);
  watch('app/js/**/*.js', series(js, reload));
  watch(['app/assets/**/*.*', '!app/assets/images/**/*.*', '!app/assets/svg-for-sprite/**/*.*'], series(assets, reload));
  watch('app/html/**/*.html', series(html, reload));
  watch('app/assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,avif}', series(images, reload));
  watch('app/assets/svg-for-sprite/*.svg', svg);
};

// Main tasks
const build = series(
  clean,
  parallel(svg, stylesLibs, styles, libs, html, assets, images, js)
);

const dev = series(
  build,
  serve,
  watchFiles
);

export { build };
export default dev;
