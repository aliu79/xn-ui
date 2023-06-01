import Vue from 'vue';
import '@/plugins/index'
import XNUI from '@/index';
console.log('XNUI: ', XNUI);
import App from './play/index.vue';
import 'packages/style/src/index.scss'

Vue.use(XNUI);
Vue.prototype.$XN.stsUrl = 'https://gateway.dev.xianniu.cn/xn-file/oss/getAssumeRoleResponse'
Vue.prototype.$XN.setFileIdUrl = 'https://gateway.dev.xianniu.cn/xn-file/oss/saveFileInfo'
console.log(this);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#appDoc');
