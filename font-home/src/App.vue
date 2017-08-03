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
    window.dialog = function (content, title, success, cancel) {
        $.dialog({
            content: content,
            title: title,
            ok: success,
            cancel: cancel,
            lock: false
        });
    }
    window.timeclick = function (callback) {
        window.timeclickindex = setInterval(callback, 1000/* * 60*/)
    }
    window.timeclickclear = function () {
        clearInterval(window.timeclickindex);
    }

    export default {
        name: 'app',
        mounted: function () {
            this.init();
        },
        methods: {
            /*
            * 1.cookie[userinfor]
            * 2.cookie[cart]
            * */
            init: function () {
                var me = this;
                var userinfor = getCookie('userinfor')
                if (userinfor && userinfor != 'undefined') {
                    me.$store.commit('setUserinfor', json_parse(userinfor))
                }

                if (!getCookie('cart')) {
                    setCookie('cart', json_string([]))
                }
                me.$store.state.cart = json_parse(getCookie('cart'))

            }
        }
    }
</script>

<style>
    .router-link-exact-active {
        color: dodgerblue !important;
    }
</style>
