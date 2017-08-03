<template>
    <div class="login">
        <header class="bar bar-nav">
            <a class="icon icon-left pull-left"></a>
            <a class="pull-right icon">
                <router-link
                        v-if="!$store.state.userinfor.username"
                        to="/register">
                    注册
                </router-link>
                <span v-else>
                    {{$store.state.userinfor.username}}
                </span>
            </a>
            <h1 class="title">登录</h1>
        </header>

        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">账户</div>
                                <div class="item-input">
                                    <input type="text" placeholder="username"
                                           v-model="params.username">
                                </div>
                            </div>
                        </div>
                    </li>


                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">密码</div>
                                <div class="item-input">
                                    <input type="password" placeholder="Password" v-model="params.password">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="content-block">
                <div class="row">
                    <div class="col-50"><a href="#"
                                           class="button
button-big button-fill button-danger">取消</a></div>
                    <div class="col-50"><a @click="login"
                                           class="button
button-big button-fill button-success">登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var login_url = 'Home/member/login'
    var shoppin_car_url = 'Home/cart/addtocart'
    var selectcart = "Home/cart/selectcart"
    var updatecart = "Home/cart/updatecart"
    export default {
        name: 'login',
        data() {
            return {
                params: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login: function () {
                var me = this;
                /*
                * 1.gogin
                * 2.cookie[userinfo]
                * 3.cookie[cart]
                * */
                post1(login_url, this.params, function (res) {
                    if (json_parse(res).success) {
                        $.toast("login success");
                        me.$store.commit('setUserinfor',
                            json_parse(res).message);

                        me.$router.push('/');
                    } else {
                        $.dialog({
                            content: 'login fail',
                            title: "alert",
                            width: 300,
                            time: 1000
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
