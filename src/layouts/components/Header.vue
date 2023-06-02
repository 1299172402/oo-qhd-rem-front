<template>
  <div :class="layoutCls">
    <t-head-menu
      :class="menuCls"
      :theme="theme"
      expand-type="popup"
      :value="active"
      style="background: var(--bottom-light); margin-right: 0"
    >
      <template #logo>
        <span
          v-if="showLogo"
          class="header-logo-container"
          style="font-size: 20px; width: auto;caret-color: transparent"
          @click="goPage"
        >
          <!-- <span class="logoText">{{ systemName }}</span> -->
          <!-- TODO: 内网 Maybe change back -->
          <logo-full
            class="t-logo"
            style="width: 49px; height: 44px; margin-right: 10px;"
          />
          <span class="logoText">{{ systemName }}</span>
        </span>
        <!-- TODO: Maybe change back -->
        <!-- <div v-if="layout !== 'top' && !$store.getters['user/isGroupLogin']" class="header-operate-left">
          <t-button theme="default" shape="square" variant="text" @click="changeCollapsed" style="background: transparent;border: 0px;">
            <view-list-icon class="collapsed-icon" style="color: var(--white-color)" />
          </t-button> -->
        <!-- <search :layout="layout" /> -->
        <!-- </div> -->
        <!-- <div :style="{color: $store.state.setting.mode==='dark'? ' var(--light-blue-color)':'#fff'}" style="font-size: 14px;font-weight: 700px;margin-left: 20px">
          {{ $store.getters["user/tenantName"] }}
        </div> -->
        <!-- <el-select
          v-if="tenantOptions.length > 1 && $store.getters['user/isGroupLogin']"
          v-model="valueA"
          :disabled="!!appId"
          placeholder="请选择所属机构"
          class="noBgBorderTree whiteNoBorderSelect"
          style="width: 185px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
        >
          <el-option
            v-for="item in tenantOptions"
            :key="item.tenantId"
            :label="item.tenantName"
            :value="item.tenantCode"
            @click.native="treeselectSelect(item)"
          />
        </el-select> -->
      </template>
      <div v-show="layout !== 'side' && !$store.getters['user/isGroupLogin'] && $store.state.setting.layout === 'top' && iconvisible" class="scrollicon" style="padding-right: 10px;">
        <i class="el-icon-arrow-left" @mousedown="scrollrightdown()" @mouseup="scrollleftup()" />
      </div>
      <menu-content
        v-show="layout !== 'side' && !$store.getters['user/isGroupLogin']"
        class="header-menu"
        :nav-data="menu"
      />
      <div v-show="layout !== 'side' && !$store.getters['user/isGroupLogin'] && $store.state.setting.layout === 'top' && iconvisible" class="scrollicon" style="padding-left: 10px;">
        <i class="el-icon-arrow-right" @mousedown="scrollleftdown()" @mouseup="scrollleftup()" />
      </div>
      <template #operations>
        <div class="operations-container" style="margin-left: 20px">
          <div :style="{color: $store.state.setting.mode==='dark'? ' var(--light-blue-color)':'#fff'}" style="margin-right: 5px;font-size: 14px;font-weight: 700px;margin-left: 20px">
            {{ $store.getters["user/tenantName"] }}
          </div>
          <!-- 搜索框 -->
          <!-- <search v-if="layout !== 'side'" :layout="layout" /> -->
          <audio ref="musicAudio" muted="muted" src="@/assets/messageVideo.wav" />
          <!-- 全局通知，通告 -->
          <message style="margin-top: 2px" @play-audio="playAudio" />
          <!-- 全局通知，通告 -->
          <notice />
          <!-- <t-button v-show="$store.getters['user/isGroupLogin']" theme="default" variant="text" @click="switchMode" style="color: var(--white-color)"
            ><swap-icon style="color: var(--white-color)" />{{ currentMode }}</t-button
          > -->
          <!-- <t-button
            theme="default"
            variant="text"
            @click="projectionMode"
            style="color: var(--white-color)"
          ><swap-icon style="color: var(--white-color);"/>进入大屏模式</t-button> -->
          <t-tooltip placement="bottom" content="系统设置" style="color: var(--white-color);margin-top: 3px;margin-right: 0">
            <t-button
              theme="default"
              shape="square"
              variant="text"
              style="background: transparent;border: 0;"
              @click="toggleSettingPanel"
            >
              <svg-icon
                :icon-class="$store.state.setting.mode==='light'?'my-setting-new':'my-setting-new-dark'"
                class="panelIconClass"
              />
            </t-button>
          </t-tooltip>
          <t-dropdown :min-column-width="125" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <!-- <t-dropdown-item
                  class="operations-dropdown-container-item"
                  @click="handleNav('/user/index')"
                >
                  <user-circle-icon />个人中心
                </t-dropdown-item> -->
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleUpdate()">
                  <user-circle-icon />管理账号
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <poweroff-icon />退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button
              class="header-user-btn"
              theme="default"
              variant="text"
              style="margin: 0 0 1px -2px"
            >
              <template #icon>
                <svg-icon
                  :icon-class="$store.state.setting.mode==='light'?'person-new':'person-new-dark'"
                  class="panelIconClass"
                  style="margin-right: 4px"
                />
                <!-- <user-circle-icon class="header-user-avatar" style="color: var(--white-color)" /> -->
              </template>
              <div class="header-user-account" style="color: var(--white-color)">
                {{ $store.state.user.userInfo.nickName }}
                <chevron-down-icon />
              </div>
            </t-button>
          </t-dropdown>
        </div>
      </template>
    </t-head-menu>
    <!-- 账号管理 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      @close="closeDialog('form')"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <div class="headerinfo">
          基础信息
        </div>
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户名称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="请输入用户名称"
                maxlength="30"
                :disabled="form.ehr === '0' ? false : keys.includes('nickName')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="身份证" prop="idCard">
              <div>
                <el-input
                  v-if="form.ehr === '0' "
                  v-model="convertIdCard"
                  placeholder="请输入身份证"
                  maxlength="30"
                  :disabled="isInputDisable"
                />
                <el-input
                  v-else
                  v-model="convertIdCard"
                  placeholder="请输入身份证"
                  maxlength="30"
                  :disabled="keys.includes('idCard') || isInputDisable"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击后可查看或编辑身份证信息"
                  placement="bottom"
                >
                  <i class="searchStyle el-icon-view" @click="showOrHidden" />
                </el-tooltip>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="headerinfo">
          账号信息
        </div>
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户账号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户账号" :disabled="form.ehr === '0' ? false : keys.includes('userName')" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="账号邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入账号邮箱"
                maxlength="50"
                :disabled="form.ehr === '0' ? false : keys.includes('email')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="用户手机" prop="phonenumber">
              <el-input
                v-model="form.phonenumber"
                placeholder="请输入手机号码"
                maxlength="11"
                :disabled="form.ehr === '0' ? false : keys.includes('phonenumber')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="" class="addwork">
              <el-button type="primary" @click="addPost">
                修改密码
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancel('form')">
          取 消
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="updatePwd.open"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      @close="closeDialog('updatePwdForm')"
    >
      <el-form
        ref="updatePwdForm"
        :model="updatePwd"
        :rules="pwdRules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="旧密码" prop="initPwd" style="margin-bottom: 30px;">
              <el-input
                v-model="updatePwd.initPwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入旧密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="新密码" prop="updatePwd" style="margin-bottom: 30px;">
              <el-input
                v-model="updatePwd.updatePwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入新密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="surePwd">
              <el-input
                v-model="updatePwd.surePwd"
                maxlength="20"
                show-password
                type="password"
                placeholder="请输入确认密码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureUpdatePwd">
          确 定
        </el-button>
        <el-button class="cancelBtn" @click="cancelpwd('updatePwdForm')">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  //   LogoGithubIcon,
  //   HelpCircleIcon,
  UserCircleIcon,
  PoweroffIcon,
  ChevronDownIcon
  //   EditIcon,
  //   SwapIcon,
} from "tdesign-icons-vue";
import { prefix } from "@/config/global";
import LogoFull from "@/assets/logo.svg";

import Notice from "./Notice.vue";
import Message from "./Message.vue";
import proxy from "@/config/host";
// import Search from './Search.vue'
import MenuContent from "./MenuContent.vue";
import { updateLastLogout, getCodeImg } from "@/api/intelligentOilfield/login";
import { updateaccessPage, getUser, updateUseridcard, updateUserPwdByUserName, getNoEditable } from "@/api/intelligentOilfield/system/user";
import { getTenantsByUserId } from "@/api/intelligentOilfield/system/dept";
import { noticeList } from "@/api/intelligentOilfield/system/home";
import { exchangeTenant } from "@/api/intelligentOilfield/system/tenant";
import { encryptlogin } from "@/utils/jsencrypt";
import { goNewPage } from "@/api/intelligentOilfield/system/layout.js";

const env = import.meta.env.MODE || "development";

export default Vue.extend({
  components: {
    MenuContent,
    LogoFull,
    Notice,
    Message,
    // Search,
    // LogoGithubIcon,
    // HelpCircleIcon,
    UserCircleIcon,
    PoweroffIcon,
    ChevronDownIcon
    // EditIcon,
    // SwapIcon,
  },
  inject: ["reload"],
  props: {
    theme: String,
    layout: {
      type: String,
      default: "top"
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    menu: {
      type: Array
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    isCompact: {
      type: Boolean,
      default: false
    },
    maxLevel: {
      type: Number,
      default: 3
    }
  },
  data() {
    // 确认密码与修改密码一致函数
    const equalToPassword = (rule, value, callback) => {
      if (this.updatePwd.updatePwd !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      systemName: proxy[env].SYSTEM_NAME,
      prefix,
      visibleNotice: false,
      isSearchFocus: false,
      currentMode: "办公模式",
      valueA: this.$store.getters["user/tenantId"],
      tenantOptions: [],
      appId: proxy[env].appId,
      tid: null,
      leftnum: 10,
      iconvisible: 0,
      // 弹出层标题
      title: "",
      open: false,
      // 修改密码
      updatePwd: {
        // 是否显示弹出层
        open: false,
        // 当前密码
        initPwd: "",
        // 修改密码
        updatePwd: "",
        // 确认密码
        surePwd: ""
      },
      // 身份证输入框是否可见
      isInputDisable: false,
      keys: [],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
        ],
        nickName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            pattern:
              /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
            message: "请输入正确的身份证号，支持1代（15位）和2代（18位）"
          }
        ]
      },
      pwdRules: {
        initPwd: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
        updatePwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F])[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{12,20}$/,
            message: "必须包含大小写字母，数字和特殊字符，且字符在12到20之间"
          }
        ],
        surePwd: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      },
      // 表单参数
      form: {}
    };
  },
  computed: {
    convertIdCard: {
      get() {
        if (this.isInputDisable) {
          return this.form.idCard?.replace(/^(.{0})(?:\d+)(.{4})$/, "\$1**************\$2");
        }
        return this.form.idCard;
      },
      set(val) {
        this.form.idCard = val;
      }
    },
    active() {
      if (!this.$route.path) {
        return "";
      }
      return this.$route.path
        .split("/")
        .filter((item, index) => index <= this.maxLevel && index > 0)
        .map(item => `/${item}`)
        .join("");
    },
    showMenu() {
      return !(this.layout === "mix" && this.showLogo === "side");
    },
    layoutCls() {
      return [`${this.prefix}-header-layout`];
    },
    menuCls() {
      return [
        {
          [`${this.prefix}-header-menu`]: !this.isFixed,
          [`${this.prefix}-header-menu-fixed`]: this.isFixed,
          [`${this.prefix}-header-menu-fixed-side`]: this.layout === "side" && this.isFixed,
          [`${this.prefix}-header-menu-fixed-side-compact`]: this.layout === "side" && this.isFixed && this.isCompact
        }
      ];
    }
    // isGroupLogin() {
    //   return sessionStorage.getItem('isGroupLogin') === 'true';
    // },
  },
  watch: {
    iconvisible: {
      handler() {
        this.containerWidth();
      },
      immediate: true
    },
    "$store.state.user.isGroupLogin": {
      handler() {
        this.getInitDeptds();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getInitDeptds();
  },
  methods: {
    playAudio(audio) {
      if (audio) {
        this.$refs.musicAudio.play();
      } else {
        this.$refs.musicAudio.pause();
      }
    },
    containerWidth() {
      Vue.nextTick(() => {
        const scrolldom = document.getElementsByClassName("header-menu")[0].scrollWidth;
        const menudom = document.getElementsByClassName("header-menu")[0].parentElement.clientWidth;
        this.iconvisible = scrolldom > menudom;
      });
    },
    getInitDeptds() {
      getTenantsByUserId(this.$store.getters["user/userDetail"].user.userId).then(response => {
        // 租户列表
        this.tenantOptions = response.data.data;
        if (this.tenantOptions.length > 0) {
          this.valueA = this.$store.getters["user/userDetail"].user.currentTenantCode;
          if (!this.tenantOptions.find(item => item.tenantCode === this.valueA) || !this.valueA) {
            this.tenantCodeTenant(this.tenantOptions[0].tenantCode, this.tenantOptions[0].tenantId, this.tenantOptions[0].tenantName);
            return;
          }
          const currentTenantId = this.tenantOptions.find(item => item.tenantCode === this.valueA).tenantId;
          const currentTenantName = this.tenantOptions.find(item => item.tenantCode === this.valueA).tenantName;
          this.$store.commit("user/SETTENANTID", currentTenantId);
          this.$store.commit("user/SETTENANTName", currentTenantName);
          this.noticeList();
        } else {
          this.$message.error("没有权限");
        }
      });
    },
    // 编辑面板
    editPanel() {
      this.$bus.$emit("emitBus");
    },
    // 进入大屏模式
    projectionMode() {
      this.$store.commit("user/setProjectionMode", true);
    },
    toggleSettingPanel() {
      this.$store.commit("setting/toggleSettingPanel", true);
    },
    handleLogout() {
      // logout().then(res => {
      //     this.$confirm('确定注销并退出系统吗？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       if(res.data.code === 200) {
      //         this.$store.dispatch('user/logout');
      //         this.$store.dispatch('permission/restore');
      //         this.$router.push(`/login?redirect=${this.$router.history.current.fullPath}`);
      //       }
      //     })
      //   });
      //   console.log('当前路由', this.$router.app?.$route?.path);
      let currentSystem = 0; // 0:门户，1：后台管理系统
      if (
        this.$router.app?.$route?.path === "/portal/projectionMode" ||
        this.$router.app?.$route?.path === "/portal/officeMode"
      ) {
        currentSystem = 0;
      } else {
        currentSystem = 1;
      }
      const params = {
        userName: this.$store.getters["user/name"],
        logout: currentSystem
      };
      updateLastLogout(params).then(res => {
        if (res.data.code === 200) {
          //   console.log('退出登录结果===', res);
        }
      });

      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 更新访问页面
          const sysUser = { accessPage: this.$store.state.route.meta.title, userName: this.$store.state.user.name };
          updateaccessPage(sysUser).then(() => {});
          Promise.all([
            this.$store.dispatch("user/logout"),
            this.$store.dispatch("permission/restore")
          ])
            .then(() => {
              this.$router.push(`/login?redirect=${this.$router.history.current.fullPath}`);
            });
        })
        .catch(() => {});
    },
    changeCollapsed() {
      this.$store.commit("setting/toggleSidebarCompact");
    },
    handleNav(url) {
      this.$router.push(url);
    },
    /**
     * 切换租户
     */
    treeselectSelect(node) {
      this.tenantCodeTenant(this.valueA, node.tenantId, node.tenantName);
    },
    noticeList() {
      noticeList().then(response => {
        let val = "";
        response.data.data.forEach(item => {
          val += `${item.noticeContent}                                                                                                    `;
        });
        this.$store.commit("user/SETNOTICE", val);
      });
    },
    tenantCodeTenant(tenantRoleKey, tenantId, tenantName) {
      exchangeTenant({ tenantRoleKey }).then(async res => {
        this.$store.dispatch("user/exchangeTenant", {
          token: res.data.data,
          tenantId,
          tenantName
        });
        //  TODO: Maybe change back
        // 页面数据刷新的逻辑
        // if (this.$store.getters["user/isGroupLogin"]) {
        //   this.$store.commit("user/SETTENANTCODE", { value: this.valueA, state: true }); // 用于观察租户变化
        // } else {
        //   this.reload();
        // }
      });
    },
    scrollleftdown() {
      const scrollDom = document.getElementsByClassName("header-menu")[0];
      if (this.leftnum < 0) {
        this.leftnum = 10;
      }
      if (this.leftnum > 0 && this.leftnum < 1700) {
        this.tid = setInterval(() => {
          this.leftnum += 1;
          scrollDom.scrollLeft = this.leftnum;
        }, 0);
      }
    },
    scrollleftup() {
      clearInterval(this.tid);
    },
    scrollrightdown() {
      if (this.leftnum > 1700) {
        this.leftnum = 1699;
      }
      const scrollDom = document.getElementsByClassName("header-menu")[0];
      if (this.leftnum > 10 && this.leftnum < 1700) {
        this.tid = setInterval(() => {
          this.leftnum -= 1;
          scrollDom.scrollLeft = this.leftnum;
        }, 0);
      }
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUseridcard(this.form).then(res => {
            if (res ? res.data.code === 200 : false) {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
            }
          });
        }
      });
    },
    /** 修改密码弹窗 */
    addPost() {
      this.updatePwd.open = true;
    },
    /** 修改密码  */
    sureUpdatePwd() {
      this.$refs.updatePwdForm.validate(valid => {
        if (valid) {
          getCodeImg().then(res => {
            const { publicKey } = res.data.publicKey;
            updateUserPwdByUserName(
              this.form.userName,
              encryptlogin(this.updatePwd.initPwd, publicKey),
              encryptlogin(this.updatePwd.surePwd, publicKey)
            ).then(response => {
              if (response ? response.data.code === 200 : false) {
                this.$modal.msgSuccess("修改成功");
                this.updatePwd.open = false;
              }
            });
          });
        }
      });
    },
    /** 管理账号 */
    handleUpdate() {
      this.reset();
      this.isInputDisable = true;
      const userId = this.$store.getters["user/userDetail"].user.userId;
      getNoEditable().then(res => {
        const objValue = JSON.parse(res.data.data);
        this.keys = Object.keys(objValue);
      });
      getUser(userId).then(response => {
        this.form = response.data.data;
        this.open = true;
        this.title = "账号管理";
      });
    },
    // 取消按钮
    cancel(formName) {
      this.open = false;
      this.reset();
      this.$refs[formName].resetFields();
    },
    cancelpwd(formName) {
      this.updatePwd.open = false;
      this.resetpwd();
      this.$refs[formName].resetFields();
    },
    /** 显示/隐藏身份证操作 */
    showOrHidden() {
      this.isInputDisable = !this.isInputDisable;
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        userName: undefined,
        nickName: undefined,
        phonenumber: undefined,
        email: undefined,
        idCard: undefined
      };
      this.resetForm("form");
    },
    // 表单重置
    resetpwd() {
      this.updatePwd = {
        initPwd: undefined,
        updatePwd: undefined,
        surePwd: undefined,
        open: false
      };
      this.resetForm("updatePwdForm");
    },
    goPage() {
      goNewPage().then(res => {
        if (res.data?.data) {
          window.location.href = res.data.data;
        }
      });
    }
  }
});
</script>
<style lang="less">
@import "@/style/variables.less";

.header-menu {
  flex: 1 1 1;
  display: inline-flex;
  align-items: center;

  li {
    height: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.operations-container {
  display: flex;
  align-items: center;
  margin-right: 0;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin: 0 8px;

    &.header-user-btn {
      margin: 0;
      background: transparent;
      border: 0;
    }
  }

  .t-icon {
    font-size: 20px;

    &.general {
      margin-right: 16px;
    }
  }
}

.header-operate-left {
  display: flex;
  margin-left: -20px;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}

.header-logo-container {
  width: 184px;
//   height: 26px;
  // TODO: 内网 Maybe change back
  height: 55px;
  align-items: center;
  display: flex;
  margin-left: 24px;
  // color: var(--td-text-color-primary);
  color: var(--white-color);

  .logoText {
    width: auto;
    height: 28px;
    // font-size: 20px;
    // TODO: 内网 Maybe change back
    font-size: 18px;
    font-family: PingFangSC-Semibold, "PingFang SC";
    font-weight: 600;
    color: #fff;
    line-height: 28px;
    text-align: center;
  }

  .t-logo {
    width: 100%;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  color: var(--td-text-color-primary);
  font-size: 12px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;

  .t-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}

.t-head-menu__inner {
  border-bottom: 1px solid var(--td-border-level-1-color);
  height: 60px;
}

.t-menu--light {
  .header-user-account {
    color: var(--td-text-color-primary);
  }
}

.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
    height: 60px;
  }

  .header-user-account {
    color: rgba(255, 255, 255, 0.55);
  }

  .t-button {
    --ripple-color: var(--td-gray-color-10) !important;

    &:hover {
      background: transparent !important;
    }
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  .t-icon {
    margin-right: 8px;
  }

  .t-dropdown__item {
    width: 100%;
    margin-bottom: 0;

    .t-dropdown__item__content {
      display: flex;
      justify-content: center;
    }

    .t-dropdown__item__content__text {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }

  &:last-child {
    .t-dropdown__item {
      margin-bottom: 8px;
    }
  }
}
</style>
<style scoped>
.panelIconClass {
  width: 24px !important;
  height: 24px !important;
  cursor: pointer;
  color: #fff;
}

.operations-container .t-button {
  margin: 0 5px;
}

.scrollicon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchStyle {
  position: absolute;
  top: 10px;
  right: 8px;
  color: var(--light-blue-color);
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

.el-dialog__body .el-row {
  display: flex;
  justify-content: space-between;
}
</style>