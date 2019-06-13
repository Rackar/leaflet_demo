import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import utils from './utility'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
Vue.config.productionTip = false
Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')