# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML landing page for Lantec, based on the "Solid State" template from HTML5 UP. The site is designed to be fully responsive with a modern, angular aesthetic.

## Architecture

### HTML Structure

The site follows a consistent page structure across all pages:
- **Page Wrapper** (`#page-wrapper`): Root container for all page content
- **Header** (`#header`): Sticky navigation bar with site title and menu toggle
  - Uses `.alt` class on home page for transparent header that changes on scroll
- **Menu** (`#menu`): Slide-in navigation overlay (appended to body via JavaScript)
- **Banner** (`#banner`): Hero section (home page only)
- **Wrapper** (`#wrapper`): Main content container with sections
- **Footer** (`#footer`): Contact form and site information

### Pages

- [index.html](index.html) - Home page with banner, spotlight sections, and features grid
- [generic.html](generic.html) - Generic content page template
- [elements.html](elements.html) - Component showcase/reference page

### SASS Architecture

Styles are organized in a modular structure in [assets/sass/](assets/sass/):

**Entry point:** [assets/sass/main.scss](assets/sass/main.scss) imports all modules

**Structure:**
- `libs/` - Core utilities (variables, mixins, functions, breakpoints, vendor prefixes)
- `base/` - Foundation styles (reset, page defaults, typography)
- `components/` - Reusable UI components (buttons, forms, icons, tables, etc.)
- `layout/` - Page structure components (header, menu, banner, wrapper, footer)

**Breakpoints** (defined in main.scss):
- xlarge: 1281px - 1680px
- large: 981px - 1280px
- medium: 737px - 980px
- small: 481px - 736px
- xsmall: 361px - 480px
- xxsmall: ≤360px

### JavaScript Architecture

The site uses jQuery with custom scripts and plugins:

**Dependencies:**
- jQuery (core library)
- jquery.scrollex (scroll-based effects for header)
- browser.min.js, breakpoints.min.js, util.js (responsive utilities)

**Main functionality** ([assets/js/main.js](assets/js/main.js)):
- **Preload animation**: Removes `is-preload` class after page load
- **Header behavior**: Adds/removes `.alt` class based on banner scroll position
- **Menu system**: Slide-in overlay navigation with lock mechanism to prevent animation conflicts
  - Menu toggles `is-menu-visible` class on body
  - Accessible via `[href="#menu"]` links or ESC key

## Development Workflow

### CSS Compilation

The project uses SASS for styling. To compile styles:

**If using a SASS compiler (recommended):**
```bash
# Install sass if not already installed
npm install -g sass

# Watch for changes and compile
sass --watch assets/sass/main.scss:assets/css/main.css

# Or compile once
sass assets/sass/main.scss:assets/css/main.css
```

**If using VS Code:**
Install the "Live Sass Compiler" extension and configure it to watch `assets/sass/main.scss`

### Local Development

Since this is a static site, you can:
1. Open HTML files directly in a browser
2. Use a local server for better development experience:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if http-server is installed)
   npx http-server -p 8000
   ```

### Making Style Changes

1. Edit SASS files in [assets/sass/](assets/sass/) (never edit [assets/css/main.css](assets/css/main.css) directly)
2. Compile SASS to CSS
3. Refresh browser to see changes

## Template Components

### Spotlight Sections
Alternating content/image sections with style variants (`.style1`, `.style2`, `.style3`)

### Features Grid
Grid layout for showcasing multiple items (used in section `#four` on home page)

### Forms
Contact form in footer with styled inputs and textareas

### Icons
Font Awesome icons via `fontawesome-all.min.css` (use class patterns like `icon solid fa-*` or `icon brands fa-*`)

## Important Notes

- This is a template-based project - maintain the existing HTML structure when adding content
- The menu is dynamically moved to body via JavaScript - don't add content inside `#menu` that relies on normal DOM structure
- Header behavior on home page relies on `#banner` and `.alt` class - maintain these for proper scroll effects
- All pages share the same navigation structure for consistency
