<template>
    <div class="left">
        <el-menu default-active="1"
                 theme="Dark White"
                 class="el-menu-vertical-demo"
                 :collapse="this.$store.state.isCollapse"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleSelect">
            <el-menu-item index="1">
                <i class="el-icon-caret-left" v-if="!this.$store.state.isCollapse"></i>
                <i class="el-icon-caret-right" v-if="this.$store.state.isCollapse"></i>
                <span slot="title" v-if="!this.$store.state.isCollapse">收起</span>
            </el-menu-item>


            <!-- <el-submenu index="2">
                 <template slot="title">
                     <i class="el-icon-message"></i>
                     <span slot="title">导航一</span>
                 </template>
                 <el-menu-item-group>
                     <template slot="title">分组一</template>
                     <el-menu-item index="2-1">选项1</el-menu-item>
                     <el-menu-item index="2-2">选项2</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group title="分组2">
                     <el-menu-item index="2-3">选项3</el-menu-item>
                 </el-menu-item-group>
                 <el-submenu index="2-4">
                     <template slot="title">选项4</template>
                     <el-menu-item index="2-4-1">选项1</el-menu-item>
                 </el-submenu>
             </el-submenu>-->


            <el-menu-item :index="item.index" v-for="(item,index) in menu">
                <i class="el-icon-date"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'left',
        data() {
            return {
                msg: '',
                menu: [
                    {index: 'caidan', name: '商品'},
                    {index: 'goodCatagrory', name: '商品分类'}
                ]
            }
        },
        mounted: function () {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key);
            },
            handleClose(key, keyPath) {
                console.log(key);
            },
            handleSelect: function (key, keypath) {
                console.log(key);
                var me = this;
                switch (key) {
                    case '1':
                        this.$store.commit("setIsCollapse");
                        break;
                    case 'caidan':
                        me.$router.push('/goods')
                        break;
                    case 'goodCatagrory':
                        me.$router.push('/goodCatagrory')
                        break;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-menu.el-menu-vertical-demo {
        background: #F9FAFC;
    }
</style>
