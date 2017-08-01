<template>
    <div class="edit">
        {{good}}
        <el-form ref="form" :model="good" label-width="80px">
            <el-form-item label="id">
                <el-input v-model="good.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <Mselect
                        v-model="good.band.id"
                        url='admin/band/selectall'
                        params=''
                        stext='name'
                        svalue='id'
                ></Mselect>
            </el-form-item>
            <el-form-item label="分类">
                <Mselect
                        v-model="good.goods_category.id"
                        url='admin/goods_category/selectall'
                        params=''
                        stext='name'
                        svalue='id'
                ></Mselect>
            </el-form-item>
            <el-form-item label="名字">
                <el-input
                        v-model="good.goods_intro.name"
                ></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input
                        type="textarea"
                        v-model="good.goods_intro.content"
                ></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input-number v-model="good.goods_intro.price"
                                 :min="1" :max="9999">

                </el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">立即创建
                </el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    var url_selectgoodone = 'admin/goods/select'
    var url_selectall_band = 'admin/band/selectall'
    var url_goods_catagrory_band = 'admin/goods_category/selectall'
    var url_good_edit = 'admin/goods/update'

    export default {
        name: 'edit',
        components: {
            Mselect: require('@/components/header/mselect')
        },
        data() {
            return {
                msg: '',
                editid: '',
                good: {
                    "id": "",
                    "band_id": "",
                    "goods_intro_id": "",
                    "band": {
                        "id": "",
                        "name": ""
                    },
                    "goods_category": {
                        id: '', name: ""
                    },
                    "goods_intro": {
                        "id": "",
                        "name": "",
                        "content": "",
                        "price": ""
                    }
                }
            }
        },
        mounted: function () {
            var me = this;
            me.editid = me.$route.params.goodid;
            me.init();
        },
        methods: {
            init: function () {
                var me = this;
                post1(url_selectgoodone, {id: me.editid}).done(
                    function (res) {
                        me.good = json_parse(res);
                    }
                )
            },
            onSubmit: function () {
                var me = this;
                post1(url_good_edit, {json: this.good})
                    .done(function (res) {
                        me.$router.push('/goods')
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
