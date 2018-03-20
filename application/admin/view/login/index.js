import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login'
import { store, actionTypes} from './vuex/store'
import Toasted from 'vue-toasted';

Vue.use(Toasted)
const routes = [
    { path: '/', component: Login }
]
var router = new VueRouter({
    routes
})

new Vue({
    el: "#root",
    store,
    router
})