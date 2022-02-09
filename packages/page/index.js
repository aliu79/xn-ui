import XnPage from './main.vue'

XnPage.install = function (Vue) {
  Vue.component(XnPage.name, XnPage)
}

export default XnPage