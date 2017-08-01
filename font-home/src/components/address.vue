<template>
    <div class="address">
        <header class="bar bar-nav">
            <h1 class="title">地址</h1>
        </header>

        <div class="content">
            <p class="content-block ">
                <router-link class="button button-round"
                             to="/address_add">
                    添加
                </router-link>
            </p>

            <div class="item" v-for="item in addresslist">
                <!--<div class="content-block-title">简单卡片</div>-->
                <div class="card">
                    <div class="card-content">
                        <div class="card-content-inner">
                            <b>详细地址：</b>
                            <span>{{item.detail_address}}</span>
                            <br/>
                            <b>电话：</b>
                            <span>{{item.tel}}</span>
                        </div>
                    </div>
                    <div class="card-footer no-border">
                        <router-link class="link" :to="'/address_edit/'+item.id">编辑</router-link>
                        <a class="link" @click="delete1(item.id)">删除</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var addresspath = 'Home/address/selectallbymemberid';
    var delete1 = 'Home/address/delete1';
    export default {
        name: 'address',
        data() {
            return {
                addresslist: []
            }
        },
        mounted: function () {
            this.init()
        },
        methods: {
            init: function () {
                var me = this;
                post1(addresspath, function (res) {
                    me.addresslist = json_parse(res);
                })
            },
            delete1: function (id) {
                var me = this;
                post1(delete1, {id: id}, function (res) {
                    document.location.reload()
                })
            }
        }
    }
</script>

<style scoped>

</style>
