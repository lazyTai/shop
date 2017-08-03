<template>
    <div class="cart">
        <header class="bar bar-nav">
            <h1 class="title">购物车</h1>
        </header>


        <div class="content">
            <!--地址==============-->
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-gender"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">地址选择</div>
                                <div class="item-input">
                                    <select v-model="address_id">
                                        <option v-for="address in addresslist"
                                                :value="address.id">
                                            {{address.detail_address}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


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
                                    {{item.amount}}
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
                    <p><a @click="makeorder" class="button button-round">结算</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var make_order_path = '/Home/order/add'
    var address_selectall_path = '/Home/address/select_all'
    var path_get_cart = '/Home/cart/selectcart'
    export default {
        name: 'cart',
        data() {
            return {
                address_id: '',
                addresslist: []
            }
        },
        mounted: function () {
            this.init();
        },
        methods: {
            init: function () {
                var me = this;
                /*
                * init cart
                * */
                if (!getCookie('cart')) {
                    this.$store.state.cart = []
                } else {
                    this.$store.state.cart =
                        json_parse(getCookie('cart'))
                }


                /*get address infor*/
                post1(address_selectall_path, json_parse(getCookie('userinfor')), function (res) {
                    me.addresslist = json_parse(res).message;
                    me.address_id = me.addresslist[0].id
                })

            },
            makeorder: function () {
                var me = this;
                var params = {
                    order_items: me.$store.state.cart,
                    price: me.total_price,
                    address_id: me.address_id
                }
                /*
                * 1.add order success
                *   1-1:clear cooike[cart]
                *   1-2:to='/'
                * 2.add order no success
                *   2-1:alert('no succee')
                * */
                post1(make_order_path, params, function (res) {
                    if (json_parse(res).success) {
                        clearCookie('cart');
                        me.$store.state.cart=[];
                        me.$router.push('/')
                    } else {
                        dialog('订单没有生成', 'title', function () {
                            return true
                        })
                    }
                })
            }
        }
        ,
        computed: {
            total_price: function () {
                var num = 0;
                var me = this;
                for (var i = 0; i <= me.$store.state.cart.length;
                     i++) {
                    var item = me.$store.state.cart[i];
                    if (item) {
                        num += item.amount * item.goods_intro.price;
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
