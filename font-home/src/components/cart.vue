<template>
    <div class="cart">
        <header class="bar bar-nav">
            <h1 class="title">购物车</h1>
        </header>
        <div class="content">
        </div>
        <div class="content">
            <div class="item" v-for="item in $store.state.cart">
                <div class="content-block-title row no-gutter">
                    <!--<div class="col-90">商家</div>-->
                    <div class="col-10" style="text-align: right">
                        <span
                                @click="$store.commit('removecart',item)"
                        >x</span>
                    </div>

                </div>
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-media">
                                <i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                                <div class="item-title">
                                    {{item.goods_intro.name}}
                                </div>
                                <div class="item-after">
                                    名字
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-media"><i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                                <div class="item-title">价格</div>
                                <div class="item-after">
                                    <div class="item-input">
                                        ￥{{item.goods_intro.price}}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-media"><i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                                <div class="item-title">数量</div>
                                <div class="item-after">
                                    {{item.num}}
                                </div>
                                <div class="item-after">
                                    <p class="buttons-row">
                                        <span class="button button-round" @click="$store.commit('addnum',item)">上</span>
                                        <span class="button button-round active" @click="$store.commit('downnum',item)">下</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="item total">
                <div class="content-block-title"></div>
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-media"><i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                                <div class="item-title">总计</div>
                                <div class="item-after" v-if="total_price">{{total_price}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="content-block">
                    <p><a href="#" class="button button-round">结算</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cart',
        data() {
            return {}
        },
        mounted: function () {
            this.init();
        },
        methods: {
            init: function () {
                if (!getCookie('cart')) {
                    this.$store.state.cart = []
                } else {
                    this.$store.state.cart = json_parse(getCookie('cart'))
                }

            }
        },
        computed: {
            total_price: function () {
                var num = 0;
                var me = this;
                for (var i = 0; i <= me.$store.state.cart.length;
                     i++) {
                    var item = me.$store.state.cart[i];
                    if (item) {
                        num += item.num * item.goods_intro.price;
                    }
                }
                return num;
            }
        }
    }
</script>

<style scoped>
    .content {
        padding-bottom: 60px;
    }
</style>
