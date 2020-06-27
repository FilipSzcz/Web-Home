import Main from './components/Main.vue'
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Panel from './components/Panel.vue';
import Add from './components/Add.vue';
import Adv from './components/Adv.vue';
import Filter from './components/Filter.vue';

export const routes = [{
    path: '/',
    component: Main
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/panel',
    component: Panel
  },
  {
    path: '/add',
    component: Add
  },
  {
    path: '/adv/:id',
    component: Adv
  },
  {
    path: '/filter',
    component: Filter
  }
]
