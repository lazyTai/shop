<template>
    <div class="header">
        <!-- <div class="left"></div> -->
        <div class="title">购物后台系统</div>
        <div class="right">
            <div class="user_infor right_item">
                <router-link to="/user_infor">
                    <div class="user_image">
                        <img :src="user.image_url" alt="" v-if="user.image_url" />
                        <img src="/shop/public/uploads/404.jpg" />
                    </div>
                    <div class="user_name">
                        {{user.name}}
                    </div>
                </router-link>

            </div>

            <div class="unlogin right_item">
                <Icon icon="tuichufffpx" /> 注销
            </div>
        </div>
    </div>
</template>
<script>
import Icon from "../components/icon";
export default {
  data() {
    return {
      user: $user
    };
  },
  components: {
    Icon
  }
};
</script>
<style scoped>
.header {
  line-height: 40px;
  height: 40px;
  background: burlywood;
  display: flex;
}
.header .left {
  width: 100px;
}
.header .right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}
.header .title {
  padding-left: 20px;
  text-align: center;
}
.user_infor {
  margin-right: 4px;
}
.user_infor .user_image {
  width: 30px;
  height: 30px;
  margin-top: 4px;
  margin-right: 4px;
}
.user_infor .user_image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.user_infor {
  display: flex;
}
.right_item {
  font-size: 12px;
  cursor: pointer;
}
</style>
