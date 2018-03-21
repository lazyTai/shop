<template>

    <yd-navbar title="添加二手商品">
        <router-link to="/app" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  NavBarBackIcon,
  NavBarNextIcon
} from "vue-ydui/dist/lib.px/navbar";

Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);
export default {};
</script>


