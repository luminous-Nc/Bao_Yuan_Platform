// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */

const store = new Vuex.Store({
  state: {
    username: 'ada Wang',
    ifLogin: false,
    targetPatient: {}
  },
  mutations: {
    changeUsername(state, nickName) {
      state.username = nickName;
    },
    changeIfLogin(state, newVal) {
      state.ifLogin = newVal;
    }
  }
});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
