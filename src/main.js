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
    step: 0,
    targetPatient: {  //这次来看病的病人
      id: '',
      name: '',
      phone: '',
      address: '',
      age: '',
      sex: '',
      diagnoses: [{}],
    },
    targetDiagnose: {  //这个病人的这次就诊
      diagnoseId: 0,
      diagnoseTime: '',
      symptom: '',
      test: '',
      result: '',
      patient: '',
    },
    targetRecipe: {  //这次就诊的处方
      recipeId: '',
      recipeTime: '',
      medicineList: [],
      money: 0,
      patient: '',
      diagnose: ''
    }
  },
  mutations: {
    changeUsername(state, nickName) {
      state.username = nickName;
    },
    changeIfLogin(state, newVal) {
      state.ifLogin = newVal;
    },
    updatePatient(state, newVal) {
      state.targetPatient = newVal;
    },
    updatePatientDiagnose(state, newVal) {
      state.targetPatient['diagnoses'] = newVal;
    },
    updateDiagnose(state, newVal) {
      state.targetDiagnose = newVal;
      //state.targetPatient.diagnoses.push(newVal._id);
    },
    updateRecipe(state, newVal) {
      state.targetRecipe = newVal;
    },
    addRecipeId(state, newVal) {
      state.targetDiagnose.recipe = newVal;
    },
    zeroStep(state) {
      state.step = 0;
    },
    nextStep(state) {
      state.step++;
    },
    lastStep(state) {
      state.step--;
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
