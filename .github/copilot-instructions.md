# xianniu-ui Development Guide

## Project Overview
A Vue 2.7 component library built on top of Element UI (`@liuzengwei/element-ui`), providing enhanced business components with utilities. Published as `xianniu-ui` on npm. **Node version: 16.13.0** (managed via Volta).

## Architecture

### Component Structure
- **`packages/[component]/`**: Each component follows a standard pattern:
  - `index.js`: Component registration with `install()` method for `Vue.use()`
  - `main.vue`: Main component implementation
  - Components are imported in `src/index.js` and exported both individually and as a collection
- **Global install check**: `src/index.js` validates `Vue.prototype.$ELEMENT` exists, throws error if Element UI not installed

### Build System & Entry Points
- **Development (`npm run dev`)**: Documentation site via `examples/main.js`
  - Imports all components, registers `demo-block` globally, uses `highlight.js` for syntax highlighting
  - Automatically highlights code blocks in docs using `router.afterEach` hook
- **Playground (`npm run play`)**: Isolated testing via `examples/play.js`
  - Set by `PLAY_ENV=true` environment variable
  - Different entry in `vue.config.js` pages config
  - Sets test URLs: `$XN.stsUrl` and `$XN.setFileIdUrl` for upload component
- **Library Build (`npm run build:lib`)**:
  - Entry: `src/index.js` → Output: `lib/` directory
  - Build sequence: `npm run style` (compile SCSS) → `vue-cli-service build --target lib` → copy fonts/theme
  - Formats: `xianniu-ui.umd.js`, `xianniu-ui.umd.min.js`, `xianniu-ui.common.js`
  - Styles copied from `packages/style/lib` to `lib/style` via `cp-cli`

### Documentation System Architecture
- **Markdown → Vue Transformation**: Custom webpack loader at `build/md-loader/`
  - `index.js`: Main loader that processes `.md` files
  - `config.js`: Configures `markdown-it` with plugins (anchor, container)
  - `containers.js`: Defines `:::demo`, `:::tip`, `:::warning` custom blocks
  - `fence.js`: Handles code fence rendering
  - `util.js`: Extracts template/script from demo blocks
- **Demo Block Pattern**:
  ```markdown
  :::demo
  ```html
  <template>
    <xn-table :columns="cols" :data="data"></xn-table>
  </template>
  <script>
  export default {
    data() {
      return { cols: [...], data: [...] }
    }
  }
  </script>
  ```
  :::
  ```
  - Wrapped in `<demo-block>` component (`examples/components/demo-block.vue`)
  - Extracted code becomes inline Vue component: `element-demo0`, `element-demo1`, etc.
- **Webpack Rule**: `vue.config.js` configures `.md` files to use `vue-loader` → `md-loader`

## Development Workflows

### Adding a New Component (Complete Steps)
1. **Create component structure**:
   ```
   packages/
     [component-name]/
       index.js      # Standard install pattern
       main.vue      # Component implementation
   ```
2. **Register in `src/index.js`**:
   - Import: `import XnComponentName from '../packages/component-name/index'`
   - Add to `components` array
   - Export individually at bottom
3. **Create SCSS file**: `packages/style/src/[component-name].scss`
   - Import in `packages/style/src/index.scss`
4. **Create documentation**: `examples/docs/[component-name].md`
   - Use `:::demo` blocks for live examples
5. **Create playground test**: `examples/play/index-[component-name].vue`
6. **Add to navigation**: Update `examples/nav.config.json` (if needed)

### Build & Release Workflow
```bash
# Style compilation (SCSS → CSS)
npm run style         # Runs webpack with build-style.config.js + copies fonts

# Full library build
npm run build:lib     # Styles + UMD bundle + copy assets

# Interactive release
npm run release       # Prompts for version bump type
```
- **Release script** (`build/release.js`):
  - Uses `inquirer` for interactive prompts
  - Options: `major` (2.0.0), `minor` (1.1.0), `patch` (1.0.1), `cover` (dangerous!)
  - Sequence: `npm version [type]` → `npm run build:lib` → `npm publish` → `npm run deploy`
- **Deploy script** (`deploy.sh`): Builds docs → pushes to `gh-pages` branch for GitHub Pages

### Styling System
- **Main entry**: `packages/style/src/index.scss` imports all component styles
- **Compilation**: Gulp task in `packages/style/gulpfile.js`
  - SCSS → CSS with autoprefixer (IE9+, last 2 versions)
  - CSS minification
  - Output: `packages/style/lib/*.css`
- **Utility classes** (`packages/style/src/basic.scss`):
  - Color: `.text-primary`, `.text-blue`, `.text-red`, etc.
  - Font weight: `.fw-1` through `.fw-7`
  - Spacing: `.m-{0-30}`, `.mt-{0-30}`, `.p-{0-30}`, etc. (pixel-based)
- **Theme system**: `packages/style/src/theme/` contains variables and theme overrides
  - Import order: `theme/index.scss` → component styles (ensures variables defined first)

## Critical Dependencies & Configuration

### Element UI Fork Integration
- **Package**: `@liuzengwei/element-ui` v2.15.5-xn.4
- **Babel plugin**: `babel-plugin-component` auto-imports theme styles
  ```javascript
  // babel.config.js
  ["component", {
    "libraryName": "@liuzengwei/element-ui",
    "styleLibraryName": "theme-chalk"
  }]
  ```
- **Path alias**: `element-ui` → `./node_modules/@liuzengwei/element-ui` (in `vue.config.js`)
- **Global config**: `src/plugins/index.js` sets `Vue.use(Element, { size: 'small' })`

### Utility Libraries (Global Injection)
Registered in `src/index.js` install function:
- `$utils`: General utilities (`src/utils/utils.js`)
- `$reg`: Regex patterns (`src/utils/reg.js`)
- `$format`: Formatting functions (`src/utils/format.js`)
- `$dayjs`: Date manipulation library
- `$storage`: LocalStorage wrapper
- `$lodash`: Full lodash library
- `$math`: Math operations utility
- All sourced from `src/utils/index.js` which exports individual modules

### Upload Component Configuration
- Global config object: `Vue.prototype.$XN = { uploadUrl: '' }`
- XnUpload accesses: `this.$XN.stsUrl`, `this.$XN.setFileIdUrl`
- Uses `ali-oss` library for Aliyun OSS integration
- In playground: URLs set to dev gateway endpoints

## Path Aliases (vue.config.js)
```javascript
'@' → './src'
'xn-ui' → './'
'packages' → './packages'
'examples' → './examples'
'lib' → './lib'
'element-ui' → './node_modules/@liuzengwei/element-ui'
```

## Component Development Patterns

### Wrapper Component Pattern (XnTable, XnSearch)
- **Props inheritance**: `v-bind="$attrs"` passes all props to wrapped Element UI component
- **Event forwarding**: `v-on="$listeners"` forwards all parent listeners
- **Accessing attrs in methods**: `this.$attrs.selectable` to check prop values
- **Named slots**: Use `<slot name="tools">` for user customization points
- Example in `packages/table/main.vue`: Wraps `<el-table>` with selection, pagination, refresh

### Standard Component Registration
```javascript
// packages/[component]/index.js
import Component from './main.vue'
Component.install = function(Vue) {
  Vue.component(Component.name, Component)
}
export default Component
```

### Component Naming Convention
- Vue component `name`: `XnComponentName` (PascalCase with Xn prefix)
- File/folder: `component-name` (kebab-case)
- Import name matches component name: `import XnTable from '../packages/table'`

## Testing & Development

### Playground Environment
- **Command**: `npm run play` (sets `PLAY_ENV=true`)
- **Entry**: `examples/play.js` → mounts `examples/play/index.vue`
- **Test files**: `examples/play/index-[component].vue` for isolated component testing
- **Purpose**: Quick iteration without full docs rebuild

### Documentation Testing
- **Command**: `npm run dev`
- **Hot reload**: Changes to `.md` files trigger rebuild via webpack watch
- **Code highlighting**: Applied automatically via `highlight.js` in `router.afterEach`

## Production Considerations
- Source maps disabled in production (`productionSourceMap: false`)
- Console statements stripped via `babel-plugin-transform-remove-console`
- Performance budgets: `maxEntrypointSize: 10MB`, `maxAssetSize: 30MB`
- Public path: `/xn-ui/` in production for GitHub Pages deployment
