<template>
    <div class="address_edit">
        <header class="bar bar-nav">
            <h1 class='title'>添加地址</h1>
        </header>

        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media">
                                <i class="icon
                    icon-form-name"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">电话</div>
                                <div class="item-input">
                                    <input type="text"
                                           v-model="params.tel"
                                           placeholder="tel">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="align-top">
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-comment"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">文本域</div>
                                <div class="item-input">
                                    <textarea
                                            v-model="params.detail_address">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="content-block">
                <div class="row">
                    <div class="col-50">
                        <router-link to="/mine">
                            <a class="button
button-big button-fill button-danger">取消</a>
                        </router-link>
                    </div>
                    <div class="col-50">
                        <a @click="update"
                           class="button button-big
button-fill button-success">修改</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var get_address_one = 'Home/address/selectone'
    var update_address_one = 'Home/address/update'


    export default {
        name: 'address_edit',
        data() {
            return {
                params: {
                    detail_address: '',
                    tel: ''
                }
            }
        },
        methods: {
            init: function () {
                var me = this;
                post1(get_address_one, {id: me.$route.params.id},
                    function (res) {
                        me.params = json_parse(res);
                    })
            },
            update: function () {
                var me = this;
                post1(update_address_one, me.params,
                    function (res) {
                        me.params = json_parse(res);
                        me.$router.push('/address')
                    })
            }
        },
        mounted: function () {
            this.init();
        }
    }
</script>

<style scoped>

</style>
