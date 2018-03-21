import Vue from 'vue'
import Vuex from 'vuex';
import App from './app.vue'
import Add from './add.vue'
import Search from './index/search'

// const App = () => import('./app.vue')
// const Add = () => import('./add.vue')
// const Search = () => import('./index/search.vue')

import VueRouter from 'vue-router'
import YDUI from 'vue-ydui/dist/ydui.px.js'
import 'vue-ydui/dist/ydui.px.css';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog';
import {store} from './vuex/store'
Vue.use(YDUI);
const routes = [
    {
        path: '/app', component: App,
    },
    {
        path: '/add', component: Add,
    },
    {
        path:"/search",component:Search,
    },
    {
        path: '/',
        redirect: '/app'
    },
]
var router = new VueRouter({
    routes
})
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
new Vue({
    el: "#root", router, store
    // template: "<User/>",
    // components: { User },
})