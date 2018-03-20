import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
const routes = [
    {
        path: '/', component: App, children: [
            {
                path: "/cart", component: require('./cart/cart').default
            }
        ],
        // path: '/user_infor', component: require('./userInfor/userInfor').default,
    }
]
var router = new VueRouter({
    routes
})

new Vue({
    el: "#root",
    router
})