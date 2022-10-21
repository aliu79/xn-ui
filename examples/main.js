import Vue from 'vue'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.js';
import XN from '@/index'
import './assets/common.scss';
import '@/plugins/index'

import 'packages/style/src/index.scss'

import demoBlock from './components/demo-block';
Vue.use(router)
Vue.config.productionTip = false
Vue.use(XN)
Vue.component('demo-block', demoBlock);


router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#appDoc')
