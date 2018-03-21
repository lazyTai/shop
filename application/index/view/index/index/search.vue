<template>
  <yd-layout>

    <yd-search v-model="value1"></yd-search>

    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">价格</span>
        <span slot="right">
          <yd-spinner max="100" v-model="price1"></yd-spinner>
          <span class="_font">到</span>
          <yd-spinner max="100" v-model="price2"></yd-spinner>
        </span>
      </yd-cell-item>

      <AddressPick />

      <yd-cell-item>
        <span slot="left">时间之前</span>
       <yd-datetime type="date" slot="right" v-model="datetime" ></yd-datetime>
      </yd-cell-item>
    </yd-cell-group>

    <yd-button size="large" type="primary">primary</yd-button>

  </yd-layout>
</template>
<script>
import Vue from "vue";
import AddressPick from "./addressPick";
export default {
  data() {
    return {
      value1: "",
      price1: 0,
      price2: 0,
      datetime: ""
    };
  },
  methods: {},
  components: {
    AddressPick
  }
};
</script> 
<style  scoped>
._font {
  position: relative;
  top: -8px;
}
</style>


