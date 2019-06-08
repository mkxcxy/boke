import Vue from 'vue'

import App from "./App.vue";
import router from "./router";
import store from "./store";
//  reset CSS
import "normalize.css/normalize.css";

import ELEMENT from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css"
import '@/styles/index.scss' // global css

import 'element-ui/lib/theme-chalk/display.css';//响应式插件

import '@/permission'

    // import {getToken} from "./utils/auth";
//全局配置axios
//今后都在单独的一个js设置axios
// import qs from 'qs'
// import Axios from 'axios'

// Axios.baseUrl = '/api';
// //不能在全局设置，否则请求头会设置为一开始就存在的那个值
// // Axios.defaults.headers.common['authorization'] = window.localStorage.getItem('token');
//
// Vue.prototype.$http = Axios
// Vue.prototype.$qs = qs

Vue.use(ELEMENT);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
