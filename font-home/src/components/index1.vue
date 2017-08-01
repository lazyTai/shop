<template>
    <div class="index">
        <header class="bar bar-nav">
            <a class="button button-link button-nav pull-left" href="/demos/card" data-transition='slide-out'>
                <span class="icon icon-left"></span>
                返回
            </a>
            <h1 class="title">我的购物</h1>

            <button class="button button-link button-nav pull-right">
                <router-link to="/login" v-if="!$store.userinfor">
                    登录/注册
                </router-link>
                <router-link to="/login" v-if="$store.userinfor">
                    {{$store.userinfor.username}}
                </router-link>
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
                                src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1n3rZHFXXXXX9XFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg"
                                alt=""></div>
                        <div class="swiper-slide"><img
                                src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i4/TB10rkPGVXXXXXGapXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg"
                                alt=""></div>
                        <div class="swiper-slide"><img
                                src="//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i1/TB1kQI3HpXXXXbSXFXXXXXXXXXX_!!0-item_pic.jpg_320x320q60.jpg"
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
                            <div class="card-content-inner">
                                <p class="color-gray"> 品牌：{{item.band.name}}</p>
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
    var path_goods_getall = '/Home/Goods/selectall';
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
                    me.goods_selectall = me.wrap_data_galleries(json_parse(res));
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
                this.$store.commit("push_to_cart", item);
            }
        }
    }
</script>

<style scoped>
    .swiper-wrapper .swiper-slide img {
        width: 100%;
        height: 250px;
    }

    .cards {
        margin-top: 260px; /*display: flex;flex-wrap: wrap*/
    }

    .card {
    }

    .card.demo-card-header-pic {
        height: 211px;
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
