<template>
    <div class="goodCatagrory">
        <Search :params="params" :onSubmit="onSubmit"></Search>

        <div class="padding-20">
            <el-button
                    @click="">添加
            </el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名字">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    width="200"
                    label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    var path_selectall = '/admin/goods_category/selectall';
    export default {
        name: 'goodCatagrory',
        data() {
            return {
                value: '',
                params: {keyword: '',},
                tableData: []
            }
        },
        mounted: function () {
            var me = this;
            me.init();
        },
        components: {
            Search: require('@/components/header/search'),
        },
        methods: {
            handleDelete: function () {

            },
            handleEdit: function (index, rows) {
                this.$router.push('/goodCatagrory_edit/' + rows.id)
            },
            init: function () {
                var me = this;
                post1(path_selectall, me.params).done(function (res) {
                    me.tableData = json_parse(res);
                })
            },
            onSubmit: function () {
                var me = this;
                post1(path_selectall, me.params).done(function (res) {
                    me.tableData = json_parse(res);
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
