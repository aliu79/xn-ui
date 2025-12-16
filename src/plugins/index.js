import Vue from 'vue'
import Element from '@liuzengwei/element-ui'

// 始终导入 Element UI 样式（不使用 CDN）
require('@liuzengwei/element-ui/packages/theme-chalk/src/index.scss')

Vue.use(Element, {
    size: 'small'
})