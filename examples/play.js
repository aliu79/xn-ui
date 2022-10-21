import Vue from 'vue';
import '@/plugins/index'
import XNUI from '@/index';
import App from './play/index.vue';
import 'packages/style/src/index.scss'

Vue.use(XNUI);


new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#appDoc');
