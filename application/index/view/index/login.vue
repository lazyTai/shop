<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="登录">
            <router-link to="/app" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">名字：</span>
                <input slot="right" type="text" placeholder="名字" v-model="name">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">密码：</span>
                <input slot="right" type="password" placeholder="密码" v-model="password">
            </yd-cell-item>
        </yd-cell-group>
        <yd-button-group>
            <yd-button size="large" type="primary" @click.native="click_login">登录</yd-button>
        </yd-button-group>
    </yd-layout>
</template>
<script>
import { fetch_login } from "../util/fetch";
export default {
  data: () => {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    click_login() {
      var self = this;
      fetch_login({
        data: { name: this.name, password: this.password },
        success(res) {
          if (JSON.parse(res)["success"]) {
            self.$dispatch(self.$actionTypes.set_user, {
              user: JSON.parse(res)["message"]
            });
            window.location = "/shop/public/index";
          } else {
            self.$dialog.toast({
              mes: JSON.parse(res)["message"],
              timeout: 600
            });
          }
        }
      });
    }
  }
};
</script>