<template>
  <div class="app">
    <Header />
    <div class="down">
      <div class="left">
        <LeftNav />
      </div>
      <div class="right">
        <router-view>
          <div>
            shop-admin-child-show
          </div>
        </router-view>
      </div>
    </div>

  </div>
</template>
<script>
import Header from "./header";
import Icon from "../components/icon";
import LeftNav from "./leftNav";
export default {
  data() {
    return {
      user: $user
    };
  },
  components: {
    LeftNav,
    Icon,
    Header
  },
  created() {},
  mounted() {
    this.$router.push("/cart");
  }
};
</script>
<style scoped>
.down {
  padding: 10px;
  display: flex;
}
</style>