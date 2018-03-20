<template>
  <div class="app">
    <div class="header">

      <div class="left">
        <a href="/shop/public/admin">
          首页
        </a>
      </div>
      <div class="title">登录</div>
      <div class="right"></div>
    </div>

    <div class="input">
      <div class="name form_item">
        <div class="tlabel">名字</div>
        <input type="text" :value="$store.state.user.name" @input="input_name" />
      </div>
      <div class="password form_item">
        <div class="tlabel">密码</div>
        <input type="password" :value="$store.state.user.password" @input="input_password" />
      </div>
      <!-- <div class="captcha form_item">
        <div class="tlabel">验证码</div>
        <div class="image">
          <img src="" alt="" />
        </div>
      </div> -->
      <div class="btns form_item">
        <button @click="click_login">登录</button>
        <button>注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import { actionTypes } from "./vuex/store";
import { fetch_logging } from "../util/fetch";
var { set_user_name, set_user_password } = actionTypes;
export default {
  data() {
    return {};
  },
  methods: {
    input_name(event) {
      var self = this;
      var { dispatch, state } = this.$store;
      var { user } = state;
      var input_value = event.target.value;
      if (input_value) {
        dispatch(set_user_name, { name: input_value });
      }
    },
    input_password(event) {
      var self = this;
      var { dispatch, state } = this.$store;
      var { user } = state;
      var input_value = event.target.value;
      if (input_value) {
        dispatch(set_user_password, { password: input_value });
      }
    },
    click_login() {
      var self=this;
      var { dispatch, state } = this.$store;
      var { user } = state;
      fetch_logging({
        data: user,
        success(res) {
          var returnJson = JSON.parse(res);
          if (returnJson["success"]) {
            self.$router.go("/shop/public/admin/index/index");
          } else {
            Vue.toasted.show("密码账户出错");
          }
        }
      });
    }
  },
  mounted() {
    // this.dom_captcha = document.querySelector("#captcha");
  }
};
</script>
<style scoped>
a {
  text-decoration-color: #333;
  text-decoration: none;
  color: #333;
}
.header {
  display: flex;
  padding: 10px;
  background: cadetblue;
  color: #fff;
}
.header .left {
  width: 100px;
}
.header .left a {
  color: #fff;
}
.header .right {
  width: 100px;
}
.header .title {
  text-align: center;
  flex: 1;
}
.form_item {
  display: flex;
  padding: 30px;
  align-items: center;
}
.form_item .image {
  flex: 1px;
  height: 40px;
  background: #eee;
}
.form_item .image img {
  width: 100%;
  height: 100%;
}
.form_item .tlabel {
  width: 100px;
  text-align: center;
}
.form_item input {
  border: none;
  background: #eee;
  height: 40px;
  line-height: 40px;
  width: 100%;
}
.form_item button {
  height: 40px;
  line-height: 40px;
  margin: 10px;
}
.btns {
  text-align: center;
  justify-content: center;
}
</style>