
const plugins = [];
// 生产环境下
if (process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console")
}
plugins.push([
  "component",
  {
    "libraryName": "element-ui",
    "styleLibraryName": "theme-chalk"
  }
])
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: plugins
}
