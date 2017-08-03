<template>
    <div class="mine">
        <header class="bar bar-nav">
            <h1 class="title">me</h1>
        </header>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <div class="item-title">
                                {{userinfor.username}}
                            </div>
                            <div class="item-after">名字</div>
                        </div>
                    </li>
                    <li class="item-content item-link">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <div class="item-title">详细信息</div>
                            <!--<div class="item-after">极致超薄型</div>-->
                        </div>
                    </li>
                    <li class="item-content item-link">
                        <div class="item-media"><i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <router-link to="/order">
                                <div class="item-title">订单查看</div>
                            </router-link>
                            <!--<div class="item-after">名字</div>-->
                        </div>
                    </li>
                </ul>
            </div>

            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <div class="item-media">
                            <i class="icon icon-f7"></i></div>
                        <div class="item-inner">
                            <div class="item-title">送货地址</div>
                            <router-link to="/address">
                                <div class="item-after">详细</div>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Address from 'captain-address';

    Vue.component(Address.name, Address);
    export default {
        name: 'mine',
        data() {
            return {
                userinfor: {},
                saveUrl: '',
                deleteUrl: '',
                showAddress: '',
                addressList: [
                    {
                        // 地址id，每条地址的唯一标识
                        "id": 54804656,
                        // 收货人姓名
                        "user_name": "张敏",
                        // 收货人手机号码
                        "tel": "18513622029",
                        // 地区编码，通过省市区的选择得到
                        "area_code": "330106",
                        // 邮政编码
                        "postal_code": "310000",
                        // 省份
                        "province": "浙江省",
                        // 城市
                        "city": "杭州市",
                        // 区县
                        "county": "西湖区",
                        // 详细地址
                        "address_detail": "文三路与工专路交口西南角 黄龙万科中心G座南角",
                        // 是否为默认地址
                        "is_default": "0"
                    }
                ]
            }
        },
        methods: {
            handleAddAddressClick: function () {
                debugger
            },
            handleAddressChange: function () {
            }
        },
        mounted: function () {
            this.userinfor = json_parse(getCookie('userinfor'))
        }
    }
</script>

<style scoped>
</style>
