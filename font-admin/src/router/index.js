import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/index1'
import goods from '@/components/goods'
import edit from '@/components/edit'
import goodCatagrory from '@/components/goodcatagrory/goodCatagrory.vue'
import goodCatagrory_edit from '@/components/goodcatagrory/edit.vue'

import good_picture from '@/components/good/picture.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/goods',
            name: 'goods',
            component: goods
        },
        {
            path: '/edit/:goodid',
            name: 'edit',
            component: edit
        },
        {
            path: '/goodCatagrory',
            name: 'goodCatagrory',
            component: goodCatagrory
        },
        {
            path: '/goodCatagrory_edit/:id',
            name: 'goodCatagrory_edit',
            component: goodCatagrory_edit
        },
        {
            path: '/good_picture/:id',
            name: 'good_picture',
            component: good_picture
        }
    ]
})
