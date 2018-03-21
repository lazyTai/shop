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