<template>
    <div id="app">
        <Etop></Etop>
        <el-row class="down-content">
            <el-col :span="this.$store.state.isCollapse?3:4"
                    :xs="2" :sm="2" :md="4" :lg="3">
                <Eleft></Eleft>
            </el-col>
            <el-col class="main-content"
                    :xs="16" :sm="17" :md="18" :lg="19"
            >
                <el-card class="box-card">
                    <router-view></router-view>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {
            Etop: require('@/components/top'),
            Eleft: require('@/components/left')
        }
    }
</script>

<style>
    body, html {
        margin: 0;
        padding: 0
    }

    .down-content {
        margin-top: 20px
    }

    .main-content {
        margin: 20px
    }

    .padding-20 {
        padding: 20px;
    }
</style>
