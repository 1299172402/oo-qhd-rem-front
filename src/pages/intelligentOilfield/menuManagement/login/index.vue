<template>
  <div class="login-wrapper">
    <div class="logoDiv" />
    <div class="login-Bg">
      <div
        style="width: 100%; height: 100%"
        :style="{
          background: currentModel == 'dark' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
        }"
      >
        <!-- <div class="logoDiv">
          <div class="logoBg"></div>
          <div>管理系统</div>
        </div> -->
        <div class="login-container">
          <!-- <div class="title-container">
          <h1 class="title margin-no" style="color: var(--white-color)">登录到</h1>
          <h1 class="title" style="color: var(--white-color)">智能油田管理系统</h1>
        </div> -->

          <login v-if="type === 'login'" />
          <register v-else @register-success="switchType('login')" />
          <tdesign-setting />
        </div>
      </div>
    </div>
    <div class="bottom-Div">
      XXXX石油集团有限公司版权所有
    </div>
  </div>
</template>
<script>
import Login from "./components/components-login.vue";
import Register from "./components/components-register.vue";
// import LoginHeader from './components/components-header.vue'
import TdesignSetting from "@/layouts/setting.vue";

export default {
  name: "LoginIndex",
  components: {
    // LoginHeader,
    Login,
    Register,
    TdesignSetting
  },
  data() {
    return {
      type: "login",
      currentModel: this.$store.state.setting.mode
    };
  },
  methods: {
    switchType(val) {
      this.type = val;
    }
  }
};
</script>
<style lang="less">
@import url("./index.less");
</style>