<template>
  <div>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">标题</span>
        <input type="text" slot="right" v-model="good.title">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">省市县</span>
        <input slot="right" type="text" @click.stop="show1 = true" v-model="good.a_s_s_x" readonly placeholder="请选择收货地址">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">街道地址</span>
        <input slot="right" type="text" v-model="good.a_address">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">价格</span>
        <input type="number" slot="right" v-model="good.price">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">图片上传</span>
        <input type="file" slot="right" @change="file_change">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">表述</span>
        <yd-textarea slot="right" v-model="good.desc" placeholder="输入商品描述" maxlength="100"></yd-textarea>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button slot="right" size="large" type="primary" @click.native="click_submit">提交</yd-button>
    <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>

  </div>

</template>
<script>
import Vue from "vue";
import { Button, ButtonGroup } from "vue-ydui/dist/lib.px/button";
import { CitySelect } from "vue-ydui/dist/lib.px/cityselect";
import { TextArea } from "vue-ydui/dist/lib.px/textarea";
import { CellGroup, CellItem } from "vue-ydui/dist/lib.px/cell";
import District from "ydui-district/dist/jd_province_city_area_id";
import { actionTypes } from "../vuex/store";
import { fetch_upload_image_in_good, fetch_good_add } from "../../util/fetch";

Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

Vue.component(TextArea.name, TextArea);
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
Vue.component(CitySelect.name, CitySelect);
var { set_good } = actionTypes;
export default {
  data() {
    return {
      good: {
        title: "",
        desc: "",
        desc: "",
        a_sheng: "",
        a_shi: "",
        a_xain: "",
        a_address: "",
        price: "",
        image_url: "",
        a_s_s_x: ""
      },
      show1: false,
      district: District
    };
  },
  methods: {
    result1(ret) {
      this.$data.good.a_s_s_x =
        ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
      this.$data.good.a_sheng = ret.itemName1;
      this.$data.good.a_shi = ret.itemName2;
      this.$data.good.a_xain = ret.itemName3;
    },
    click_submit() {
      var { dispatch } = this.$store;
      var self = this;
      dispatch(set_good, { good: self.$data.good });
      fetch_good_add({
        data: self.$data.good,
        success(res) {
         self.$dialog.toast({ mes: JSON.parse(res)['message'], timeout: 500 });
        }
      });
    },
    file_change(event) {
      var self = this;
      var files = event.target.files;
      fetch_upload_image_in_good({
        data: files,
        success(res) {
          var josn = JSON.parse(res);
          if (josn["success"]) {
            self.$data.good.image_url = josn["message"][0];
            self.$dialog.toast({ mes: "上次成功", timeout: 500 });
          }
        }
      });
    }
  }
};
</script>
