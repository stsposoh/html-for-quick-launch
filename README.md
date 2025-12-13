# HTML Quick Launch

Modern HTML5 template for quick start front-end development.

## Tech Stack

- **Gulp 5** — build system
- **Dart Sass** — SCSS compilation
- **ES Modules** — native JavaScript modules
- **BrowserSync** — live reload & browser sync
- **CSS Custom Properties** — theming variables

## Requirements

- Node.js 18+

## Installation

```bash
npm install
```

## Commands

```bash
# Development mode (with live reload)
npm run dev

# Production build
npm run build

# Clean dist folder
npm run clean
```

## Project Structure

- `app/` — source files for development
- `dist/` — compiled production-ready build

```
app/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── svg-for-sprite/    # SVG icons for sprite generation
├── html/
│   ├── _includes/          # Partials (header, footer)
│   └── *.html              # Pages
├── js/                     # JavaScript (auto-bundled)
├── libs/                   # External JS libraries
└── scss/
    ├── bundle.scss         # Main file (controls import order)
    ├── libs.scss           # External CSS libraries
    ├── utils/              # Tokens, mixins
    ├── base/               # Fonts, reset
    ├── layout/             # Header, footer, menu
    ├── components/         # Buttons, cards, forms, modals
    └── sections/           # Page sections, animations
```

## How It Works

- **SCSS**: Import order controlled by `bundle.scss`
- **JS**: All files in `js/` bundled into `bundle.js`
- **HTML**: Use `@@include('./_includes/_header.html')` for partials

## SVG Sprite

The project includes automatic SVG sprite generation using `gulp-svg-sprite`.

### Usage

1. **Add SVG icons** to `app/assets/svg-for-sprite/` folder
2. **Build the sprite** — it's automatically generated during build/dev
3. **Result** — sprite file is created at `dist/images/sprite.svg`

### Using Icons in HTML

Use icons with `#icon-id` syntax:

```html
<svg>
  <use xlink:href="./images/sprite.svg#icon-name"></use>
</svg>
```

The icon ID is generated from the SVG filename (e.g., `home-icon.svg` → `#home-icon`).

### Example

```html
<!-- Place home.svg in svg-for-sprite/ -->
<svg width="24" height="24">
  <use xlink:href="./images/svg/stack/sprite.svg#home"></use>
</svg>
```

**Note**: The sprite is automatically regenerated when SVG files change in dev mode.
