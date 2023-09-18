<template>
  <div class="first-tab-body">
    <div class="logo-img" />
    <!-- TODO: Maybe change back -->
    <!-- <div class="company-name"> -->
    <!-- <div class="chinese-name" /> -->
    <!-- TODO: Maybe change back -->
    <!-- <div class="english-name">这个公司的Englishname</div> -->
    <!-- </div> -->
    <t-button
      style="height: 49px; border-radius: 4px; width: 350px; font-size: 18px;"
      block
      size="large"
      class="login__submit-btn"
      @click="goCallBack"
    >
      集团登录
    </t-button>
  </div>
</template>

<script>
import { getGoOtherLogin } from "@/api/intelligentOilfield/login.js";

export default {
  data() {
    return {};
  },
  methods: {
    goCallBack() {
      getGoOtherLogin({ redirect: this.$route.query.redirect, srid: this.$route.query.srid }).then(response => {
        if (response.status === 200) {
          window.location.href = response.data.data;
        }
      });
      // TODO: Maybe change back
      // 仅供双因素测试使用，不提供真实功能
      // window.location.href = "https://devau.cnooc.cn/idp/authcenter/ActionAuthChain?entityld=znytgxt";
    }
  }
};
</script>
<style lang="less" scoped>
.first-tab-body .logo-img {
  width: 200px;
  height: 187px;
  background: url("@/assets/login-welcome.png") no-repeat;
  background-size: 100%;
  margin-bottom: 16px;
  margin-top: 35px;
}

.first-tab-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.company-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 45px;
  flex: 1;
}

.chinese-name {
  font-size: 28px;
  font-weight: 500;
  height: 33px;
  line-height: 33px;
}

.english-name {
  font-size: 22px;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
  margin-top: 5px;
}

.login-btn {
  width: 100%;
}
</style>