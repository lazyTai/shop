<template>
    <div class="order_items">
        <header class="bar bar-nav">
            <router-link to="/order">
                <button class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                    返回
                </button>
            </router-link>
            <h1 class="title">订单详细</h1>
        </header>

        <div class="content">
            <div class="list-block" v-for="order_item in order_items">
                <ul>
                    <li class="item-content">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <div class="item-title">商品名称</div>
                            <div class="item-after">
                                {{
                                order_item.good.name
                                }}
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <div class="item-title">数量</div>
                            <div class="item-after">
                                {{
                                order_item.amount
                                }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    var order_items = "/Home/order_items/select_one";
    export default {
        name: 'order_items',
        data() {
            return {
                order_items: []
            }
        },
        mounted: function () {
            this.init();
        },
        methods: {
            init: function () {
                var me = this;
                post1(order_items, {
                    order_id: me.$route.params['id']
                }, function (res) {
                    if (json_parse(res).success) {
                        me.order_items = json_parse(res).message
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        margin-bottom: 50px;
    }
</style>
