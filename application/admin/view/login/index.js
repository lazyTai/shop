import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './login'
const routes = [
    { path: '/', component: Login }
]
var router = new VueRouter({
    routes
})

new Vue({
    el: "#root",
    router
})