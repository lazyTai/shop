<template>
    <div class="index">
        <header class="bar bar-nav">
            <a class="button button-link button-nav pull-left" href="/demos/card" data-transition='slide-out'>
                <span class="icon icon-left"></span>
                返回
            </a>
            <h1 class="title">我的购物</h1>

            <button class="button button-link button-nav pull-right">
                <router-link to="/login" v-if="!$store.state.userinfor.username">
                    登录/注册
                </router-link>
                <span
                        @click="loginout"
                        v-if="$store.state.userinfor.username">
                    {{$store.state.userinfor.username}}
                </span>
            </button>
        </header>

        <div class="bar bar-header-secondary">
            <div class="searchbar">
                <a class="searchbar-cancel">取消</a>
                <div class="search-input">
                    <label class="icon icon-search" for="search"></label>
                    <input type="search" id='search' placeholder='输入关键字...'/>
                </div>
            </div>
        </div>


        <!-- 这里是页面内容区 -->
        <div class="content content-main">
            <div class="content">
                <!-- Slider -->
                <div class="swiper-container" data-space-between='10'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img
                                src="http://s11.mogucdn.com/mlcdn/c45406/170802_0i688619gk2e2d61cke47d3ggg6h5_750x390.jpg_800x9999.v1c7E.70.webp"
                                alt=""></div>
                        <div class="swiper-slide"><img
                                src="http://s2.mogucdn.com/mlcdn/c45406/170801_79fk20h90ef7bad315f7de92cjeg0_750x390.jpg_800x9999.v1c7E.70.webp"
                                alt=""></div>
                        <div class="swiper-slide">
                            <img
                                    src="http://s11.mogucdn.com/mlcdn/c45406/170802_1jf6ij4162l5g1iij8hdaege4egje_750x360.jpg_800x9999.v1c7E.70.webp"
                                    alt=""></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>


            <div class="cards row no-gutter">

                <div class="col-50" v-for="item in goods_selectall">
                    <div class="card demo-card-header-pic">
                        <div valign="bottom"
                             class="card-header color-white no-border no-padding">
                            <img class='card-cover'
                                 :src="item.galleries.path"
                                 alt="">
                        </div>
                        <div class="card-content">
                            <div class="card-content-inner"
                                 style="height: 119px;overflow: hidden"
                            >
                                <p class="color-gray">
                                <div
                                        style="width:150px;
overflow: hidden;word-break:break-all;
">
                                    名字： {{item.goods_intro.name}}
                                </div>

                                </p>
                                <p class="item-desc">
                                    {{item.goods_intro.content}}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="link">￥
                                {{item.goods_intro.price}}</a>
                            <a class="link"
                               @click="addTocart(item)">加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var path_goods_getall = '/Home/Goods/select_all';
    var path_member_loginout = '/Home/member/loginout';
    export default {
        name: 'index',
        data() {
            return {
                goods_selectall: []
            }
        },
        mounted: function () {
            $(".swiper-container").swiper({});
            this.init();

        },
        methods: {
            init: function () {
                var me = this;
                post1(path_goods_getall, {}, function (res) {
                    if (json_parse(res).success) {
                        me.goods_selectall =
                            me.wrap_data_galleries
                            (json_parse(res).message);
                    }
                })
            },
            wrap_data_galleries: function (arr) {
                _.each(arr, function (item) {
                    if (!item.galleries) {
                        item.galleries = {};
                        item.galleries.path = '/Public/404.jpg';
                    }
                })
                return arr;
            },
            addTocart: function (item) {
                if (getCookie('userinfor')) {
                    this.$store.commit("push_to_cart", item);
                } else {
                    dialog('亲登录', 'title', function () {
                        return true
                    })
                }

            },
            loginout: function () {
                var me = this;
                $.dialog({
                    content: '确定要注销',
                    title: 'ok',
                    ok: function () {
                        post1(path_member_loginout, {}, function () {
                            clearCookie('userinfor')
                            window.timeclickclear();
                            document.location.reload();
                        })

//                        return false;
                    },
                    cancel: function () {
                    },
                    lock: false
                });
            }
        }
    }
</script>

<style scoped>
    .card-footer {
        font-size: small
    }

    .swiper-wrapper .swiper-slide {
        width: 100%;
        height: 200px;
    }

    .swiper-wrapper .swiper-slide img {
        width: 100%;
        height: 100%;
    }

    .cards {
        margin-top: 260px; /*display: flex;flex-wrap: wrap*/
    }

    .card {
    }

    .card.demo-card-header-pic {
        height: 260px;
    }

    .card .card-cover {
        height: 100px;
        width: 100%
    }

    .card-content .item-desc {
        min-height: 37px;
        max-height: 37px;
        /*display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;*/
        overflow: hidden;
    }

    .content-main {
        margin-bottom: 50px
    }
</style>
