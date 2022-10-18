import XnExport from './main.vue'

XnExport.install = function (Vue) {
  Vue.component(XnExport.name, XnExport)
}

export default XnExport