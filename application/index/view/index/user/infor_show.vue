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
                <yd-button size="large" type="danger" @click.native="unlogin">注销</yd-button>
            </yd-button-group>
        </div>

        <div class="right_group" v-if="!show">
            <router-link to="/login">
                <yd-button size="small" type="primary">登录</yd-button>
            </router-link>

            <yd-button size="small" type="danger">注册</yd-button>
        </div>

    </div>
</template>
<script>
import { fetch_unlogin } from "../../util/fetch";
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    /* 设置用户信息 */
    this.$dispatch(this.$actionTypes.set_user, {
      user: $user
    });
    if (this.$state.user.status == 0) {
      /* 没有登录 */
      this.$data.show = false;
    } else {
      this.$data.show = true;
    }
  },
  created() {},
  methods: {
    unlogin() {
      var self = this;
      fetch_unlogin({
        success(res) {
          self.$dialog.toast({ mes: res });
          window.location.href = "/shop/public/index";
        }
      });
    }
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

