<template>
  <div>
    <div v-if="show">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">名字</span>
          <input slot="right" v-model="$state.user.name" class="_input" placeholder="请输入用户名" />
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">密码</span>
          <input slot="right" v-model="$state.user.password" class="_input" placeholder="密码" />
        </yd-cell-item>

        <AddressPick />

        <yd-cell-item>
          <span slot="left">头像</span>
          <span slot="right">
            <div class="image" @click="click_image">
              <img :src="$state.user.image_url" alt="" v-if="$state.user.image_url" />
              <img src="/shop/public/uploads/404.jpg" alt="" v-if="!$state.user.image_url" />
            </div>
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button-group>
        <yd-button size="large" type="primary" @click.native="chnage_user">修改</yd-button>
        <yd-button size="large" type="danger" @click.native="unlogin">注销</yd-button>
      </yd-button-group>
    </div>

    <div class="right_group" v-if="!show">
      <router-link to="/login">
        <yd-button size="small" type="primary">登录</yd-button>
      </router-link>

      <yd-button size="small" type="danger">注册</yd-button>
    </div>

    <input type="file" ref="image_file" v-show="false">
  </div>
</template>
<script>
import {
  fetch_unlogin,
  fetch_update_user,
  fetch_upload_image_in_good
} from "../../util/fetch";
import AddressPick from "./addressPick";
export default {
  data() {
    return {
      show: false
    };
  },
  components: { AddressPick },
  mounted() {
    this.dom_file = this.$refs["image_file"];
    this.dom_file.onchange = this.upload_image;
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
    chnage_user() {
      var self = this;
      fetch_update_user({
        data: self.$state.user,
        success(res) {
         window.location.href="/shop/public/index"
        }
      });
    },
    upload_image() {
      var self = this;
      fetch_upload_image_in_good({
        data: self.dom_file.files,
        success(res) {
          var json = JSON.parse(res);
          if (json.success) {
            self.$dispatch(self.$actionTypes.set_user, {
              user: {
                image_url: json.message[0]
              }
            });
          }
        }
      });
    },
    click_image() {
      this.dom_file.click();
    },
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
._input {
  border: none;
  width: 100%;
  padding: 10px;
}
</style>

