import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
const routes = [
    { path: '/', component: App }
]
var router = new VueRouter({
    routes
})

new Vue({
    el: "#root",
    router
})