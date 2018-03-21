<template>
    <div>
        <div v-if="show">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">名字</span>
                    <span slot="right">{{$state.user.name}}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码</span>
                    <span slot="right">{{$state.user.password}}</span>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">地址</span>
                    <span slot="right">{{$state.user.address}}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">头像</span>
                    <span slot="right">
                        <div class="image">
                            <img :src="$state.image_url" alt="" v-if="$state.image_url" />
                            <img src="/shop/public/uploads/404.jpg" alt="" v-if="!$state.image_url" />
                        </div>
                    </span>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button-group>
                <yd-button size="large" type="danger">注销</yd-button>
            </yd-button-group>
        </div>

        <div class="right_group" v-if="!show">
            <router-link to="/login">
                <yd-button size="small" type="primary">登录</yd-button>
            </router-link>

            <yd-button size="small" type="danger" @click.native="unlogin">注销</yd-button>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    if (this.$state.user.status == 0) {
      /* 没有登录 */
      this.$data.show = false;
    } else {
      this.$data.show = true;
    }
  },
  created() {},
  methods: {
    unlogin() {}
  }
};
</script>
<style scoped>
.right_group {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.right_group button {
  margin-left: 10px;
}
.image {
  width: 30px;
  height: 30px;
}
.image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>

