<template>
    <div id="app">
        <router-view></router-view>
        <nav class="bar bar-tab">
            <router-link to="/" class="tab-item">
                <span class="icon icon-home"></span>
                <span class="tab-label">首页</span>
            </router-link>
            <router-link to="/mine" class="tab-item">
                <span class="icon icon-me"></span>
                <span class="tab-label">我的</span>
            </router-link>
            <router-link to="/like" class="tab-item">
                <span class="icon icon-star"></span>
                <span class="tab-label">收藏</span>
            </router-link>
            <router-link to="/cart" class="tab-item">
                <span class="icon icon-cart"></span>
                <span class="badge" v-if="$store.state.cart.length">
          {{$store.state.cart.length}}
                </span>
                <span class="tab-label">购物车</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted: function () {
            this.init();
        },
        methods: {
            init: function () {
                var me = this;
                var userinfor = getCookie('userinfor')
                if (userinfor && userinfor != 'undefined') {
                    debugger
                    me.$store.commit('setUserinfor', json_parse(userinfor))
                }
                debugger

            }
        }
    }
</script>

<style>
    .router-link-exact-active {
        color: dodgerblue !important;
    }
</style>
