import Vue from 'vue'

import Cookies from 'js-cookie'
import moment from 'moment'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './sass/element-variables.scss'

import '@/sass/index.scss' // global css
import App from './App'
import store from './store/store'
import router from './router/router'
import permission from './directive/permission'
import service from './utils/request'
import {
  baseUrl
} from './utils/request'
import util from './utils/utils';


import './assets/icons' // icon
import './permission' // permission control
import {
  getDicts
} from "@/api/system/dict/data";
import {
  getConfigKey
} from "@/api/system/config";

import Pagination from "@/components/Pagination.vue";
import TableHeader from "@/components/TableHeader.vue";

Vue.use(util);

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.$baseUrl = baseUrl

Vue.prototype.msgSuccess = function (msg = '') {
  this.$message({
    showClose: true,
    message: msg,
    type: "success"
  });
}

Vue.prototype.msgError = function (msg = '') {
  this.$message({
    showClose: true,
    message: msg,
    type: "error"
  });
}

Vue.prototype.msgInfo = function (msg = '') {
  this.$message.info(msg);
}
Vue.prototype.$http = service;
Vue.prototype.$moment = moment;
Vue.prototype.$cookies = Cookies

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('TableHeader', TableHeader)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
