<template>
    <div class="search">
        <el-form :inline="true"

                 class="demo-form-inline">
            <el-form-item label="关键词">
                <el-input
                        v-model="params.keyword"
                        placeholder="关键词"></el-input>
            </el-form-item>
            <slot></slot>
            <el-form-item>
                <el-button
                        type="primary"
                        @click="onSubmit">查询
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'search',
        data() {
            return {
                msg: '',
            }
        },
        props: ['params','onSubmit'],
        methods: {
            /*onSubmit: function () {
                this.onSubmit()
            }*/
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
