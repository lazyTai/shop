<template>
    <div>
        <yd-search v-model="value1" :on-submit="submitHandler"></yd-search>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">左边内容一</span>
                <span slot="right">右边内容一</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">左边内容二</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item>
        </yd-cell-group>

         <yd-button size="large" type="primary">primary</yd-button>
    </div>
</template>
<script>
import Vue from "vue";
import { Search } from "vue-ydui/dist/lib.px/search";
import { CellGroup, CellItem } from "vue-ydui/dist/lib.px/cell";
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.px/button'; 

Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
Vue.component(Search.name, Search);

export default {
  data() {
    return {
      value1: ""
    };
  },
  methods: {
    submitHandler(value) {
      this.$dialog.toast({ mes: `搜索：${value}` });
    }
  }
};
</script>