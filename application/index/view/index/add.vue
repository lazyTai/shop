<template>
    <yd-layout>
        <Header />
        <Infor />
    </yd-layout>
</template>
<script>
import Infor from './add/infor.vue'
import Header from "./add/header";
export default {
  components: {
    Header,
    Infor,
  }
};
</script>
