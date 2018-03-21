<template>
    <yd-layout>
        <Header />
        <Infor />
    </yd-layout>
</template>
<script>
import { Layout } from "vue-ydui/dist/lib.px/layout";
import Infor from './add/infor.vue'
import Header from "./add/header";
Vue.component(Layout.name, Layout);
export default {
  components: {
    Header,
    Infor,
  }
};
</script>
