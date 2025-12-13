import Vue from 'vue'
import Element from '@liuzengwei/element-ui'

// 开发环境和本地构建需要导入 Element UI 样式
// 只有 GitHub Pages 部署时通过 CDN 加载样式（见 public/index.html）
if (!process.env.DEPLOY_ENV) {
  require('@liuzengwei/element-ui/packages/theme-chalk/src/index.scss')
}

Vue.use(Element, {
    size: 'small'
})