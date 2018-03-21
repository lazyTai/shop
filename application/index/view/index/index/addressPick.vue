<template>
    <div>
        <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly placeholder="请选择收货地址">
            </yd-cell-item>
        </yd-cell-group>

        <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
    </div>
</template>

<script>
    /* 前提是已经安装了 ydui-district */
    import District from 'ydui-district/dist/jd_province_city_area_id';

    export default {
        data() {
            return {
                show1: false,
                model1: '',
                district: District
            }
        },
        methods: {
            result1(ret) {
                this.model = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            }
        }
    }
</script>