<template>
    <div class="login">
        <header class="bar bar-nav">
            <a class="icon icon-left pull-left"></a>
            <a class="pull-right icon">
                <router-link to="/register">register</router-link>
            </a>
            <h1 class="title">login</h1>
        </header>

        <div class="content">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">name</div>
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
                    <div class="col-50"><a href="#" class="button button-big button-fill button-danger">cancel</a></div>
                    <div class="col-50"><a @click="login" class="button button-big button-fill button-success">login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var login_url = 'Home/member/login'
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
                post1(login_url, this.params, function (res) {
                    if (json_parse(res).success) {
                        me.$store.commit('setUserinfor',
                            json_parse(res))
                    } else {
                        $.alert("login fail")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
