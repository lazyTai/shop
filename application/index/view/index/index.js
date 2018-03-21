import Vue from 'vue'
import Vuex from 'vuex';
import App from './app.vue'
import Add from './add.vue'
import Search from './index/search'


import VueRouter from 'vue-router'
import {store} from './vuex/store'
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
new Vue({
    el: "#root", router, store
    // template: "<User/>",
    // components: { User },
})