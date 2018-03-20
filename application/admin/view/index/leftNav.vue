<template>
    <div class="left_nav">
        <div class="list">
            <router-link to="cart">
                <div class="list_item">

                    <div class="list_item_icon">
                        <Icon icon="shubenshuqian" />
                    </div>
                    <div class="list_item_title">111</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import Icon from "../components/icon";
export default {
  data() {
    return {};
  },
  components: {
    Icon
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.left_nav {
  width: 200px;
  height: 100%;
  border-right: 1px solid #eee;
}
.list {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.list_item {
  width: 100%;
  display: flex;
  line-height: 40px;
  height: 40px;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.list_item_title {
  flex: 1;
  padding-left: 10px;
}
</style>