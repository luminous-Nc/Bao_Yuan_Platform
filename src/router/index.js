import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import patient from '@/pages/patient/patient'
import diagnose from '@/pages/diagnose/diagnose'
import recipe from '@/pages/recipe/recipe'
import see from '@/pages/see'
import medicine from '@/pages/medicine/medicine'
import begin from '@/pages/doctor/begin'
import patientInfo from '@/pages/patient/patientInfo'
import errorPage from '@/pages/errorPage'
import recipeInfo from '@/pages/recipe/recipeInfo'
import seeDoctor from '@/pages/doctor/seeDoctor'
import login from '@/login'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/pc',
      component: Home,
      children: [
        {
          path:'',
          component:see,
          name:'see',
        },
        {
          path:'home',
          component:see,
          name:'see',
        },
        { path:'begin',
          name:'begin',
          component: begin,
        },
        {
          path: 'seeDoctor/:ifHasPatient',
          name: 'seeDoctor',
          component: seeDoctor,
        },
        {
          name:'patient',
          path:'patient',
          component:patient,
        },
        { name:'patientInfo',
          path:'patient/:patientid',
          component:patientInfo
        },
        { name:'diagnose',
          path:'diagnose',
          component:diagnose
        },
        { name:'medicine',
          path:'medicine',
          component: medicine
        },
        { name:'recipe',
          path:'recipe',
          component:recipe
        },
        { name:'recipeInfo',
          path:'recipe/:recipeid',
          component:recipeInfo
        },
        { path:'*',
          component:errorPage
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path:'*',
      component:errorPage
    }
  ]
})
