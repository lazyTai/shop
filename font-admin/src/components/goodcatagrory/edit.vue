<template>
    <div class="edit">
        <el-form ref="form" :model="item" label-width="80px">
            <el-form-item label="id">
                <el-input v-model="item.id" disabled></el-input>
            </el-form-item>

            <el-form-item label="名字">
                <el-input
                        v-model="item.name"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">update
                </el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    var url_selectgoodone = 'admin/goods_category/selectone'
    var url_good_edit = 'admin/goods_category/update'

    export default {
        name: 'edit',
        components: {
            Mselect: require('@/components/header/mselect')
        },
        data() {
            return {
                msg: '',
                editid: '',
                item: {
                    "id": "",
                    "name": "",
                }
            }
        },
        mounted: function () {
            var me = this;
            me.editid = me.$route.params.id;
            me.init();
        },
        methods: {
            init: function () {
                var me = this;
                post1(url_selectgoodone, {id: me.editid}).done(
                    function (res) {
                        me.item = json_parse(res);
                    }
                )
            },
            onSubmit: function () {
                var me = this;
                post1(url_good_edit, this.item)
                    .done(function (res) {
                        me.$router.push('/goodCatagrory')
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
