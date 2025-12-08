import Vue from 'vue'
import Element from '@liuzengwei/element-ui'

// 开发环境（npm run dev/play）需要导入 Element UI 完整样式
// 生产构建（npm run build:lib）通过 babel-plugin-component 按需引入
if (process.env.NODE_ENV === 'development') {
  require('@liuzengwei/element-ui/packages/theme-chalk/src/index.scss')
}

Vue.use(Element, {
    size: 'small'
})