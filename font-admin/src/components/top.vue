<template>
    <div class="top">
        <el-row>
            <el-menu :default-active="activeIndex"
                     class="el-menu-demo"
                     mode="horizontal"
                     @select="handleSelect">

                <el-col :span="19">
                    <el-menu-item index="1">首页</el-menu-item>
                </el-col>


                <el-col :span="3">
                    <el-submenu index="2" v-if="!user.username">
                        <template slot="title">lmt</template>
                        <el-menu-item index="2-1">个人信息</el-menu-item>
                        <el-menu-item index="2-2">注销</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" v-if="user.username">
                        <template slot="title">注册/登录</template>
                        <el-menu-item index="2-1">注册</el-menu-item>
                        <el-menu-item index="2-2">登录</el-menu-item>
                    </el-submenu>
                </el-col>

            </el-menu>
        </el-row>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        name: 'top',
        data() {
            return {
                activeIndex: '1',
                user: {username: '', password: ''}
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(json_string(key));
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
