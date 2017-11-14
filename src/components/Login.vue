<template>
  <el-form  ref="loginForm" label-position="left" label-width="0px" style="-webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;">
    <h3>系统登录</h3>
    <el-form-item >
       <img v-bind:src="loginCodeUrl" width="100%" v-if="valid">
       <label v-if="!valid">登录码失效，请重新刷新页面</label>
    </el-form-item>
  </el-form>
</template>

<script>
import { setLocalStorage } from "../api/api";
import { getLocalStorage } from "../api/api";
export default {
  data() {
    return {
      loginCodeName: "",
      loginCodeUrl: "",
      valid: true
    };
  },
  methods: {
    init() {
      this.loginCodeName = "test";
      this.getLoginUserInfo();
    },
    getLoginUserInfo() {
      var times = 0;
      window.this = this;
      let timer = setInterval(function() {
        times++;
        if (times > 18) {
          clearInterval(timer);
          this.valid = false;
        }
        window.this.$http
          .jsonp(
            "https://huangwenbin.xin/user/getLoginUserInfo?key=" +
              window.this.loginCodeName
          )
          .then(res => {
            if (res && res.data && res.data.code && res.data.code == 1) {
              clearInterval(timer);
              if (res.data.data && res.data.data.user) {
                var user = JSON.parse(res.data.data.user);
                if (user) {
                  setLocalStorage("eating-user", user);
                  window.this.$router.push("/mybusiness");
                }
              }
            }
          });
      }, 5000);
    }
  },
  mounted() {
    var user = getLocalStorage("eating-user");
    if (user) {
      this.$router.push("/mybusiness");
    }
    this.init();
  },
  watch: {
    loginCodeName: function(val) {
      this.loginCodeUrl =
        "https://www.huangwenbin.xin/picture/login_" + val + ".jpg";
    }
  }
};
</script>

<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
