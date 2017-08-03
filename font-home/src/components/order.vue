<template>
    <div class="order">
        <header class="bar bar-nav">
            <router-link to="/mine">
                <button class="button button-link button-nav pull-left">
                    <span class="icon icon-left"></span>
                    返回
                </button>
            </router-link>
            <h1 class="title">订单</h1>
        </header>

        <div class="content">
            <div v-for="order in order_list">
                <div class="content-block-title">
                    <router-link
                            :to="'/order_items/'+order.id"
                    > {{order.order_member}}
                    </router-link>
                </div>
                <div class="list-block">
                    <ul>
                        <Mli
                                :title="order.order_member"
                                content="下单"
                        ></Mli>
                        <Mli
                                :title="order.address.detail_address"
                                content="地址"
                        ></Mli>
                        <Mli
                                :title="order.price"
                                content="价格"
                        ></Mli>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var get_order_path = 'Home/order/select_one_by_member_id'
    export default {
        name: 'order',
        data() {
            return {
                order_list: []
            }
        },
        mounted: function () {
            this.init()
        },
        components: {
            Mli: require('@/components/parts/mli.vue')
        },
        methods: {
            init: function () {
                var me = this;
                post1(get_order_path,
                    {
                        member_id: json_parse(
                            getCookie('userinfor'))
                            ['id']
                    },
                    function (res) {
                        if (json_parse(res).success) {
                            me.order_list = json_parse(res).message
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
