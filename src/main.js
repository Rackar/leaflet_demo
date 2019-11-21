//为了跨平台样式正常引入normalize
import "normalize.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import utils from "./utility";
import axios from "axios";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
//为解决safari中的bug引入fastclick
import FastClick from "fastclick";
if ("addEventListener" in document && "ontouchstart" in window) {
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus();
  };
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
// 全局引入mand;
import mandMobile from "mand-mobile";
import "mand-mobile/lib/mand-mobile.css";
Vue.use(mandMobile);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
