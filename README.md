# HTML Quick Launch

Modern HTML5 template for quick start front-end development.

## Tech Stack

- **Gulp 5** — build system
- **Dart Sass** — modern SCSS with `@use/@forward`
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
├── assets/           # Static files (fonts, favicon)
│   ├── fonts/
│   ├── img/
│   └── svg-for-sprite/
├── html/
│   ├── _includes/    # HTML partials (header, footer)
│   └── *.html        # Pages
├── js/               # JavaScript files
├── libs/             # External JS libraries
└── scss/
    ├── bundle.scss   # Main stylesheet
    ├── libs.scss     # External CSS libraries
    └── components/   # SCSS components
        ├── _vars.scss       # Variables & CSS Custom Properties
        ├── _mixins.scss     # Mixins
        ├── _fonts.scss      # Font faces
        ├── _default.scss    # Base styles
        ├── _header.scss     # Header
        ├── _footer.scss     # Footer
        ├── _menu.scss       # Mobile menu
        ├── _components.scss # UI components (buttons, badges)
        ├── _sections.scss   # Page sections
        ├── _cards.scss      # Cards
        ├── _forms.scss      # Forms
        ├── _modals.scss     # Modals
        ├── _sliders.scss    # Sliders
        ├── _anims.scss      # Animations
        └── _index.scss      # Components export
```
