<template>
    <div class="select">
        <el-select
                v-model="value1"
                @change="change">
            <el-option
                    v-for="item in alllist"
                    :label="item[stext]"
                    :value="item[svalue]">
                {{item[stext]}}
            </el-option>
        </el-select>
    </div>
</template>

<script>
    /*
    *  v-model="good.band.id"
                        url='admin/band/selectall'
                        params=''
                        :oldvalue="good.band.id"
                        stext='name'
                        svalue='id'
    * */
    import Vue from 'vue';

    export default {
        name: 'select',
        data() {
            return {
                alllist: [],
                value1: ''
            }
        },
        computed: {},
        props: ['url', 'params', 'stext', 'svalue', 'value'],
        mounted: function () {
            var me = this;
            _.delay(function () {
                me.init()
            }, 300)
        },
        methods: {
            init: function () {
                var me = this;
                post1(me.url, me.params).done(function (res) {
                    me.alllist = json_parse(res);
                    me.value1 = me.value;
                })
            },
            change: function (val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
