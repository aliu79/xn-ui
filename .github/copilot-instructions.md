# xianniu-ui Development Guide

## Project Overview
A Vue 2.7 component library built on top of Element UI (`@liuzengwei/element-ui`), providing enhanced business components with utilities. Published as `xianniu-ui` on npm.

## Architecture

### Component Structure
- **`packages/[component]/`**: Each component follows a standard pattern:
  - `index.js`: Component registration with `install()` method for Vue.use()
  - `main.vue`: Main component implementation
  - Components are imported in `src/index.js` and exported both individually and as a collection

### Build Targets
- **Development (`npm run dev`)**: Runs documentation site using `examples/main.js`
- **Playground (`npm run play`)**: Uses `examples/play.js` for isolated component testing (set via `PLAY_ENV=true`)
- **Library (`npm run build:lib`)**: Builds UMD bundle to `lib/` directory for npm distribution
  - Styles compiled separately via `npm run style` (gulp task in `packages/style/`)
  - Multiple output formats: `.umd.js`, `.umd.min.js`, `.common.js`

### Documentation System
- **Markdown Components**: `.md` files in `examples/docs/` are transformed into Vue components via custom `build/md-loader/`
  - Uses `markdown-it` with custom containers (`:::demo`) for live component demos
  - Demo code blocks are extracted and compiled as inline Vue components
  - See `examples/docs/table.md` for demo syntax examples

## Key Development Workflows

### Adding a New Component
1. Create `packages/[component-name]/` with `index.js` and `main.vue`
2. Add to `src/index.js` imports and components array
3. Create docs in `examples/docs/[component-name].md`
4. Create example in `examples/play/index-[component-name].vue` for testing

### Build & Release
```bash
npm run style         # Compile SCSS to CSS (gulp)
npm run build:lib     # Build library bundle
npm run release       # Interactive release (uses inquirer for version bumping)
```
Release script (`build/release.js`) offers: major/minor/patch semver bumps or cover (dangerous).

### Styling
- Main styles in `packages/style/src/*.scss` compiled to `lib/style/` via gulp
- Uses `sass`, `autoprefixer`, and `cssmin`
- Component styles should follow existing patterns in `packages/style/src/`

## Critical Dependencies

### Element UI Fork
- Uses custom fork `@liuzengwei/element-ui` v2.15.5-xn.4
- Babel configured to import styles automatically via `babel-plugin-component`
- Path alias: `element-ui` → `./node_modules/@liuzengwei/element-ui`

### Utility Libraries
Components can access via `Vue.prototype.$[name]`:
- `$utils`: General utilities (`src/utils/utils.js`)
- `$reg`: Regex patterns (`src/utils/reg.js`)
- `$format`: Formatting functions (`src/utils/format.js`)
- `$dayjs`: Date manipulation
- `$storage`: LocalStorage wrapper
- `$lodash`: Full lodash library
- `$math`: Math utilities

### Upload Configuration
Global config via `Vue.prototype.$XN.uploadUrl` for `XnUpload` component (uses `ali-oss`)

## Path Aliases
```javascript
'@' → './src'
'xn-ui' → './'
'packages' → './packages'
'examples' → './examples'
'lib' → './lib'
```

## Component Patterns

### XnTable Example
- Wraps `el-table` with common business features: selection, pagination, toolbar, refresh
- Props pattern: Uses `v-bind="$attrs"` and `v-on="$listeners"` for Element UI pass-through
- Slot usage: Named slots like `<slot name="tools">` for customization
- See `packages/table/main.vue` for full implementation

### Component Registration
```javascript
// Standard pattern in packages/[component]/index.js
import Component from './main.vue'
Component.install = function(Vue) {
  Vue.component(Component.name, Component)
}
export default Component
```

## Testing & Documentation
- Use `npm run play` for component development (isolated environment)
- Documentation lives in `examples/docs/*.md` with live demos
- Demo syntax: Wrap component code in `:::demo` containers

## Production Considerations
- Source maps disabled in production (`productionSourceMap: false`)
- Console statements stripped via `babel-plugin-transform-remove-console`
- Performance budgets: `maxEntrypointSize: 10MB`, `maxAssetSize: 30MB`
- Public path: `/xn-ui/` in production for GitHub Pages deployment
