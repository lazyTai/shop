import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index1 from '@/components/index1'
import register from '@/components/user/register'
import mine from '@/components/mine'
import card from '@/components/card'
import cart from '@/components/cart'
import address from '@/components/address'
import address_add from '@/components/address/address_add'
import address_edit from '@/components/address/address_edit'
import order from '@/components/order'
import order_items from '@/components/order_items'

import login from '@/components/user/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index1',
            component: index1
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/like',
            name: 'card',
            component: card
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/address_add',
            name: 'address_add',
            component: address_add
        },
        {
            path: '/address_edit/:id',
            name: 'address_edit',
            component: address_edit
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/order_items/:id',
            name: 'order_items',
            component: order_items
        },
    ]
})
