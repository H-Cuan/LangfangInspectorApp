import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import axios from 'axios'
Vue.config.productionTip = false
App.mpType = 'app'
import UniIcons from './uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
Vue.component('UniIcons',UniIcons)
Vue.prototype.$axios = axios
//axios.defaults.baseURL = 'https://120.211.58.75:26006'
axios.defaults.baseURL = '/api' //
try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif