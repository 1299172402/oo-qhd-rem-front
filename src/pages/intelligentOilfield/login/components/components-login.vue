<template>
  <div class="loginDiv">
    <!-- :style="{ border: $store.state.setting.mode == 'dark' ? '3px solid rgba(0, 222, 240, 0.6)' : '3px solid white' }" -->

    <!-- <div class="loginDivInner">
      <div class="tabSwitch">
        <div v-for="(item, index) in tabList" :key="index" style="width: 100%; height: 100%; cursor: pointer">
          <div
            @click="switchTab(item)"
            class="tabSwitchItem"
            :style="{
              color: item.isChecked
                ? $store.state.setting.mode == 'dark'
                  ? 'white'
                  : 'black'
                : 'rgba(255,255,255,0.8)',
              background: item.isChecked
                ? $store.state.setting.mode == 'dark'
                  ? 'rgba(70, 130, 180,0.5)'
                  : 'white'
                : 'transparent',
            }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        style="width: 100%; height: 88%; background: white; padding: 0 25px"
        :style="{ background: $store.state.setting.mode == 'dark' ? 'rgba(70, 130, 180,0.5)' : 'white' }"
      >
        <div :style="{ color: $store.state.setting.mode == 'dark' ? 'rgba(255,255,255,0.8)' : '' }" class="loginText">
          用户登录
        </div>
        <t-form
          ref="form"
          :data="formData"
          :rules="FORM_RULES"
          label-width="0"
          @validate="onValidate"
          class="formStyle"
        >
          <template>
            <t-form-item name="username" style="margin-bottom: 4%">
              <el-input
                class="loginInput"
                prefix-icon="el-icon-user"
                v-model="formData.username"
                placeholder="请输入用户名/手机号"
                style="width: 100%"
              >
              </el-input>
            </t-form-item>

            <t-form-item name="password" style="margin-bottom: 3%">
              <el-input
                class="loginInput"
                prefix-icon="el-icon-lock"
                v-model="formData.password"
                placeholder="请输入密码"
                style="width: 100%"
                show-password
              >
              </el-input>
            </t-form-item>

            <t-form-item name="yzm">
              <el-input
                class="loginInput"
                v-model="formData.code"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%"
              >
              </el-input>
              <div class="login-code">
                <img
                  :src="codeUrl"
                  @click="getCode"
                  class="login-code-img"
                  style="height: 42px; width: 100%; margin: 6px 0 0 20px"
                />
              </div>
            </t-form-item>

            <div class="check-container remember-pwd checkBox">
              <t-checkbox>自动登录</t-checkbox>
              <t-checkbox v-model="formData.rememberMe">记住密码</t-checkbox>
            </div>
          </template>

          <t-form-item style="margin: 3% 0">
            <t-button block size="large" type="submit" @click="loginSys('集团登录')"> 集团登录 </t-button>
          </t-form-item>
          <t-form-item class="btn-container">
            <t-button block size="large" type="submit" @click="loginSys('登录')"> 登录 </t-button>
          </t-form-item>
        </t-form>
      </div>
    </div>-->
    <!-- TODO: Maybe change back -->
    <!-- <div class="headerDiv">
      智能油田管理系统
    </div> -->
    <div class="tabline" />
    <div class="loginInput">
      <t-form
        ref="form"
        class="formDiv"
        :data="formData"
        :rules="FORM_RULES"
        label-width="0"
        @validate="onValidate"
      >
        <t-tabs theme="card" :value="tabValue" @change="(newValue) => (tabValue = newValue)">
          <t-tab-panel
            value="corp"
            label="集团用户"
            class="neibuLogin"
            :style="{ padding: tabValue === 'password' ? '50px 35px 20px' : '0px' }"
          >
            <components-company-login />
          </t-tab-panel>
          <t-tab-panel value="password" label="系统用户" style="padding: 50px 35px 20px">
            <t-form-item name="username">
              <div class="textDiv">
                用户名&nbsp;|
              </div>
              <el-input
                v-model="formData.username"
                class="loginInput"
                placeholder="请输入用户名/手机号"
                style="width: 100%"
              />
              <div class="bottomBorderDiv" />
            </t-form-item>

            <t-form-item name="password">
              <div class="textDiv">
                密&nbsp;&nbsp;&nbsp;码&nbsp;|
              </div>
              <el-input
                v-model="formData.password"
                class="loginInput"
                placeholder="请输入密码"
                style="width: 100%"
                show-password
              />
              <div class="bottomBorderDiv" />
            </t-form-item>

            <t-form-item name="yzm">
              <div class="textDiv">
                验证码&nbsp;|
              </div>
              <el-input
                v-model="formData.code"
                class="loginInput"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%"
              />
              <div class="bottomBorderDiv" style="width: 68%" />
              <div class="login-code">
                <img
                  :src="codeUrl"
                  class="login-code-img"
                  style="height: 38px; width: 100%"
                  @click="getCode"
                >
              </div>
            </t-form-item>
            <!-- TODO: Maybe change back -->
            <!-- <div class="pwdDiv">
              <div class="check-container remember-pwd checkBox">
                <t-checkbox>自动登录</t-checkbox>
                <t-checkbox v-model="formData.rememberMe">
                  记住密码
                </t-checkbox>
              </div>
            </div> -->
          </t-tab-panel>
        </t-tabs>
        <div class="loginBtn">
          <t-form-item v-if="tabValue === 'password'" class="btn-container">
            <t-button
              style="height: 49px; margin: 0 32px; border-radius: 4px; font-size: 18px; width: 350px"
              block
              size="large"
              type="submit"
              @click="loginSys('登录')"
            >
              登录
            </t-button>
          </t-form-item>
        </div>
      </t-form>
    </div>
    <!-- TODO: Maybe change back -->
    <!-- <div class="erweima">
      <div class="erweiDisplay">
        <div class="erweimaBg" />
        <div class="erweiText">
          陆地移动端下载
        </div>
      </div>
      <div class="erweiDisplay">
        <div class="erweimaBg" />
        <div class="erweiText">
          海上移动端下载
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import QrcodeVue from 'qrcode.vue';
// import { UserIcon, LockOnIcon, BrowseOffIcon, BrowseIcon } from 'tdesign-icons-vue';
import { getCodeImg } from "@/api/intelligentOilfield/login";
import { decrypt } from "@/utils/jsencrypt";
import Cookies from "js-cookie";
import proxy from "@/config/host";
import ComponentsCompanyLogin from "./components-companylogin.vue";

const env = import.meta.env.MODE;
// const INITIAL_DATA = {
//   phone: '',
//   username: '',
//   password: '',
//   verifyCode: '',
//   checked: false,
//   code: '',
//   uuid: '',
//   rememberMe: false,// 记住密码
// };

const FORM_RULES = {
  phone: [{ required: true, message: "手机号必填", type: "error" }],
  username: [{ required: true, message: "账号必填", type: "error" }],
  password: [{ required: true, message: "密码必填", type: "error" }],
  verifyCode: [{ required: true, message: "验证码必填", type: "error" }]
};
/** 高级详情 */
export default Vue.extend({
  name: "Login",
  components: {
    // QrcodeVue,
    // UserIcon,
    // LockOnIcon,
    // BrowseOffIcon,
    // BrowseIcon,
    // RefreshIcon,
    ComponentsCompanyLogin
  },
  data() {
    const loginType = proxy[env].LOGIN_TYPES;
    return {
      tabValue: loginType[0] === "password" ? "password" : "corp",
      tabList: [
        { name: "业务门户", isChecked: true },
        { name: "管理后台", isChecked: false }
      ],
      currentTab: "业务门户",
      FORM_RULES,
      type: "password",
      //   formData: { ...INITIAL_DATA },
      formData: {
        phone: "",
        username: "",
        password: "",
        verifyCode: "",
        checked: false,
        code: "",
        uuid: "",
        rememberMe: false // 记住密码
      },
      showPsw: false,
      countDown: 0,
      intervalTimer: null,
      codeUrl: "",
      // 验证码开关
      captchaOnOff: true,
      loginType: "集团登录",
      currentTheme: "light"
    };
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  beforeDestroy() {
    clearInterval(this.intervalTimer);
  },
  methods: {
    switchTab(item) {
      this.tabList.forEach(el => {
        el.isChecked = false;
      });
      item.isChecked = true;
      this.currentTab = item.name;
    },
    async onValidate({ validateResult }) {
      if (validateResult && typeof validateResult === "boolean") {
        await this.onSubmit(this.loginType);
      }
    },
    loginSys(type) {
      this.loginType = type;
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = !res.data.captchaOnOff ? true : res.data.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = `data:image/gif;base64,${res.data.img}`;
          this.formData.uuid = res.data.uuid;
        }
      });
      // this.$request
      //   .get(`code`)
      //   .then((res) => {
      //     //   console.log('接口结果====', res.data);
      //     this.captchaOnOff = res.data.captchaOnOff === undefined ? true : res.data.captchaOnOff;
      //     if (this.captchaOnOff) {
      //       this.codeUrl = `data:image/gif;base64,${res.data.img}`;
      //       this.formData.uuid = res.data.uuid;
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.formData = {
        username: !username ? this.formData.username : username,
        password: !password ? this.formData.password : decrypt(password),
        rememberMe: !rememberMe ? false : Boolean(rememberMe)
      };
    },
    switchType(val) {
      this.type = val;
      this.$refs.form.reset();
    },
    async onSubmit(type) {
      //   if (validateResult === true) {
      //   await this.$store.dispatch('user/login', this.formData);
      this.checkUrl();
      if (type === "登录") {
        this.$store
          .dispatch("user/login", this.formData)
          .catch(() => {
            this.getCode();
          });
      }

      //   this.$store
      //     .dispatch('user/login', this.formData)
      //     .then(() => {
      //       this.$store
      //         .dispatch('user/getUserInfo')
      //         .then(() => {
      //           console.log('111111', this.$store.getters['user/logout']);
      //           this.getCode();
      //           if (this.$store.getters['user/logout'] === '0') {
      //             sessionStorage.setItem('isGroupLogin', 'true');
      //             console.log('门户，上次登出的位置');
      //             this.$router.push('/portal/projectionMode');
      //           } else if(this.$store.getters['user/logout'] === '1'){
      //             sessionStorage.setItem('isGroupLogin', 'false');
      //             console.log('后台，上次登出的位置');
      //             this.$router.push('/homePage/index');
      //           } else if (!this.$store.getters['user/loginBack']) {
      //             sessionStorage.setItem('isGroupLogin', 'true');
      //             console.log('门户，只有门户权限');
      //             this.$router.push('/portal/projectionMode');
      //           } else {
      //             sessionStorage.setItem('isGroupLogin', 'false');
      //             console.log('后台，有门户+后台的权限');
      //             this.$router.push('/homePage/index');
      //           }

      //           this.$store.dispatch('permission/initRoutes', this.$store.getters['user/roles']);
      //         })
      //         .catch((err) => {
      //           this.getCode();
      //           console.log(err);
      //         });
      //     })
      //     .catch((err) => {
      //       this.getCode();
      //       console.log(err);
      //     });

      //   if (this.currentTab === '业务门户') {
      //     sessionStorage.setItem('isGroupLogin', 'true');
      //     this.$router.push('/portal/projectionMode');
      //   } else {
      //     sessionStorage.setItem('isGroupLogin', 'false');
      //     this.$router.push('/homePage/index');
      //   }
      //   this.$router.replace('/').catch(() => '');
      //   }
    },
    /**
     * 检查url是否包含srid参数，如果有，将其作为登录接口参数
     */
    checkUrl() {
      if (this.$route.query && this.$route.query.srid) {
        this.$set(this.formData, "srid", this.$route.query.srid);
      }
    },
    handleCounter() {
      this.countDown = 60;
      this.intervalTimer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        } else {
          clearInterval(this.intervalTimer);
          this.countDown = 0;
        }
      }, 1000);
    }
  }
});
</script>
<style scoped lang="scss">
// .loginDiv {
//   border: 3px solid white;
//   width: 100%;
//   height: 100%;
//   padding: 5px;
//   border-radius: 4px;
//   .loginDivInner {
//     background: transparent;
//     width: 100%;
//     height: 100%;
//     .tabSwitch {
//       width: 100%;
//       display: flex;
//       height: 12%;
//       /* background: white; */
//       .tabSwitchItem {
//         height: 100%;
//         align-items: center;
//         justify-content: center;
//         display: flex;
//       }
//     }
//     .loginText {
//       font-size: 20px;
//       height: 15%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//     }
//     .formStyle {
//       height: 73%;
//       display: flex;
//       flex-direction: column;
//       .t-form-item {
//         margin-bottom: 0px !important;
//       }
//       .checkBox {
//         display: flex;
//         justify-content: space-between;
//       }
//     }
//   }
// }
.loginDiv {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .tabline {
    width: 100%;
    height: 0px;
    background: #d8d8d8;
    position: absolute;
    left: 0;
    top: 60px;
  }

  .headerDiv {
    height: 15%;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #0075e9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginInput {
    height: 60%;
    .formDiv {
      height: 100%;

      .textDiv {
        font-size: 14px;
        font-family: "STHeiti", "Microsoft YaHei", "宋体", "arial";
        font-weight: 400;
        color: #566570;
        margin-right: 0px;
        width: 75px;
        padding-left: 9px;
      }
      .borderDiv {
        width: 1px;
        height: 20px;
        color: #566570;
        margin-right: 10px;
      }
      .bottomBorderDiv {
        position: absolute;
        bottom: 0px;
        width: 100%;
        border-bottom: 1px solid #d8d8d8;
      }
      .login-code {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .pwdDiv {
        height: 8%;

        .checkBox {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .erweima {
    height: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .erweiDisplay {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .erweimaBg {
    background-image: url("@/assets/qr-code.png");
    width: 64px;
    height: 64px;
    margin-bottom: 2%;
  }
  .erweiText {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #909399;
  }

  .t-tabs {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.9);
    border-radius: 4px;
  }

  .t-tabs__nav-wrap {
    flex: 1;
    padding-bottom: 20px;
    border-bottom: 1px solid #d8d8d8;
  }

  ::v-deep .el-input__inner {
    padding: 2px 8px;
  }

  ::v-deep .t-tabs__header {
    background: #0075e9;
    color: #fff;
  }

  ::v-deep .t-tabs__nav-item-text-wrapper {
    font-size: 16px;
  }

  ::v-deep .t-tabs__nav--card.t-tabs__nav-item:not(:first-of-type) {
    border-left: 0px;
  }

  ::v-deep .t-tabs__nav--card.t-tabs__nav-item {
    border-bottom: 0px;
    padding: 0 12px;
  }

  ::v-deep .t-tabs__nav--card.t-tabs__nav-item:last-of-type {
    border-right: 0px;
  }

  ::v-deep .t-tabs__nav--card.t-tabs__nav-item:hover {
    color: unset !important;
    background-color: unset !important;
  }
  ::v-deep .t-tabs__nav-item {
    height: 60px !important;
    line-height: 60px !important;
    color: unset;
  }

  ::v-deep .t-tabs__nav-item-wrapper {
    background-color: #fff !important;
  }

  ::v-deep .t-tabs__bar {
    color: #0060a6 !important;
    background: #0060a6 !important;
  }
  ::v-deep .t-tabs__nav-container.t-is-top::after {
    content: none;
  }
  ::v-deep .t-tabs__nav--card.t-tabs__nav-item.t-is-active:hover {
    background: #fff !important;
  }

  ::v-deep .t-tabs__nav--card.t-tabs__nav-item.t-is-active {
    color: #0075e9 !important;
    background: #fff !important;
  }

  ::v-deep .t-button {
    background: #0075e9 !important;
  }
}
</style>
<style scoped>
.loginInput >>> .el-input__inner {
  border: 1px solid transparent !important;
  color: #696969 !important;
}

.loginInput >>> .t-checkbox__input {
  border: 1px solid #0075e9 !important;
  background-color: #fff;
}

.loginInput >>> .t-checkbox.t-is-checked .t-checkbox__input {
  background-color: #0075e9 !important;
}

.loginInput >>> .t-checkbox__label {
  font-size: 12px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  color: #606266;
}

.loginBtn >>> .t-button {
  background: #0075e9;
  border-radius: 6px;
}
</style>