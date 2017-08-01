<template>
    <div class="register">
        <header class="bar bar-nav">
            <a class="icon icon-left pull-left"></a>
            <a class="icon  pull-right">login</a>
            <h1 class="title">register</h1>
        </header>

        <div class="content">
            <div class="list-block">
                <ul>
                    <!-- Text inputs -->
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-name"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">姓名</div>
                                <div class="item-input">
                                    <input type="text" v-model="params.username">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">邮箱</div>
                                <div class="item-input">
                                    <input type="email" v-model="params.email">
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
                                    <input type="password" v-model="params.password">
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">重复密码</div>
                                <div class="item-input">
                                    <input type="password" v-model="params.repaword">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">验证码</div>
                                <div class="item-input">
                                    <input type="text" placeholder="验证码" v-model="params.verify">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-password"></i></div>
                            <div class="item-inner">
                                <div class="item-title label"></div>
                                <div class="item-input">
                                    <img :src="verfiry_url"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div style="color: red" v-if="error">
                {{error}}
            </div>

            <div class="content-block">
                <div class="row">
                    <div class="col-50"><a href="#" class="button button-big button-fill button-danger">取消</a></div>
                    <div class="col-50"><a @click="register"
                                           class="button button-big button-fill button-success">register</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var member_register = 'Home/member/register';
    var member_verfiry = 'localhost/www.shop/after/index.php/Home/member/verfity'
    export default {
        name: 'register',
        data() {
            return {
                error: '',
                params: {
                    username: '',
                    password: '',
                    repaword: '',
                    email: '',
                    verify:''
                },
                verfiry_url: '/Home/member/verfity'
            }
        },
        methods: {
            init: function () {
                var me = this;
            },
            register: function () {
                var me = this;
                post1(member_register, this.params, function (res) {
                    if (!json_parse(res).success) {
                        me.error = json_parse(res).message;
                    }else{
                        $.alert('注册成功，请登录');
                        me.$router.push('/login')
                    }

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
