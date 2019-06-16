import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import utils from './utility'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$utils = utils;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')