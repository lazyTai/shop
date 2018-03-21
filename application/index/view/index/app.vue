<template>
    <div>
        <yd-layout>
            <yd-navbar slot="navbar" title="主页">
                <router-link to="/" slot="left">
                    <!-- <yd-navbar-back-icon></yd-navbar-back-icon> -->
                    <yd-icon name="home"></yd-icon>
                </router-link>
            </yd-navbar>
            <router-link to="/search">
                <yd-search></yd-search>
            </router-link>
            <yd-list theme="3">
                <yd-list-item v-for="(item, key ) in list" :key="key">
                    <img slot="img" :src="item.image_url">
                    <span slot="title">{{item.title}}</span>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">
                                <em>¥</em>{{item.price}}</span>
                            <span class="demo-list-del-price">
                                <yd-icon name="like"></yd-icon>
                            </span>
                        </div>
                        <div>
                            {{item.desc}}
                        </div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>

            <yd-tabbar slot="tabbar">
                <yd-tabbar-item title="首页" link="#">
                    <yd-icon name="home" slot="icon"></yd-icon>
                </yd-tabbar-item>
                <yd-tabbar-item title="" link="/add" active>
                    <yd-icon name="compose" slot="icon"></yd-icon>
                </yd-tabbar-item>

                <yd-tabbar-item title="购物车" link="#" active>
                    <yd-icon name="shopcart" slot="icon"></yd-icon>
                </yd-tabbar-item>

                <yd-tabbar-item title="个人中心" link="#">
                    <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
                </yd-tabbar-item>
            </yd-tabbar>

        </yd-layout>
    </div>
</template>
<script>
import Vue from "vue";
// import {
//   NavBar,
//   NavBarBackIcon,
//   NavBarNextIcon
// } from "vue-ydui/dist/lib.px/navbar";
// import { Search } from "vue-ydui/dist/lib.px/search";
// import { Layout } from "vue-ydui/dist/lib.px/layout";
// import { TabBar, TabBarItem } from "vue-ydui/dist/lib.px/tabbar";
// import { Icons } from "vue-ydui/dist/lib.px/icons";

// import { ListTheme, ListItem, ListOther } from "vue-ydui/dist/lib.px/list";

// Vue.component(Search.name, Search);
// Vue.component(ListTheme.name, ListTheme);
// Vue.component(ListItem.name, ListItem);
// Vue.component(ListOther.name, ListOther);

// Vue.component(Icons.name, Icons);
// Vue.component(TabBar.name, TabBar);
// Vue.component(TabBarItem.name, TabBarItem);
// Vue.component(NavBar.name, NavBar);
// Vue.component(NavBarBackIcon.name, NavBarBackIcon);
// Vue.component(NavBarNextIcon.name, NavBarNextIcon);

// Vue.component(Layout.name, Layout);
export default {
  data() {
    return {
      list: $list
    };
  },
  components: {
  }
};
</script>