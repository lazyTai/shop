<template>
    <div class="goods">
        <Search :params="params" :onSubmit="onSubmit">
            <el-form-item label="牌子">
                <Sselect v-model="params.band.id"
                         url="/admin/Band/selectall"
                         params=""
                         stext="name"
                         svalue="id"
                ></Sselect>
            </el-form-item>
        </Search>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="band.name"
                    label="品牌">
            </el-table-column>
            <el-table-column
                    prop="goods_category.name"
                    label="分类">
            </el-table-column>
            <el-table-column
                    prop="goods_intro.name"
                    label="名字">
            </el-table-column>
            <el-table-column
                    prop="goods_intro.content"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="goods_intro.price"
                    label="价格">
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
                            @click="handlepictuceEdit(scope.$index, scope.row)">图片
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
    var path_selectall = '/admin/Goods/selectall';
    export default {
        name: 'goods',
        data() {
            return {
                value: '',
                params: {keyword: '', band: {id: '', name: ''}},
                tableData: []
            }
        },
        mounted: function () {
            var me = this;
            me.init();
        },
        components: {
            Search: require('@/components/header/search'),
            Sselect: require('@/components/header/mselect')
        },
        methods: {
            handlepictuceEdit: function (index,rows) {
                this.$router.push('/good_picture/'+rows.id)
            },
            handleDelete: function () {

            },
            handleEdit: function (index,rows) {
                this.$router.push('/edit/'+rows.id)
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
