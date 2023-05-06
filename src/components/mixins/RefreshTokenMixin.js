
import { getHiddenProp, getEvtname, getVisibilityState } from "@/utils/bomHelper.js";

let refreshTokenTimer = null;
const intervalTime = 5 * 1000 * 60;

const visibleProp = getHiddenProp();
const evtname = getEvtname(visibleProp);
let cbFn = null;

export default {
  data() {
    return {
      needRefreshToken: true
    };
  },
  // TOKEN_NAME, USER_NAME, env, proxy 放 data 的 refreshTokenData 对象下 中
  computed: {
    /**
     * 如果是处于 iframe 的状态，则需要刷新 token，也不需要提示
     */
    isInIframe: function() {
      return window.self !== window.top;
    }
  },
  watch: {
    "$route.path": {
      handler: function(val) {
        if (!this.needRefreshToken) {
          return;
        }
        if (val === "/login") {
          this.clearTokenInfo();
        }
        if (!this.needTime(val)) {
        // 登录页取消定时器
          this.stopTiming();
        } else if (!refreshTokenTimer) {
          // 否则如果是登录后，则有定时器
          this.startTiming();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.handleWindowTab();
  },
  beforeDestroy() {
    this.stopTiming();
    document.removeEventListener(evtname, this.windowTabActive, false);
  },
  methods: {
    /**
     * 是否需要计时刷新 token
     */
    needTime: function(path = this.$route.path) {
      if (["/login", "/"].includes(path)) {
        return false;
      }
      return true;
    },
    /**
     * 页签激活
     */
    handleWindowTab: function() {
      if (!this.needRefreshToken) {
        return;
      }
      if (visibleProp) {
        document.addEventListener(evtname, this.windowTabActive, false);
      }
    },
    /**
     * 处理页签激活逻辑
     */
    windowTabActive: function() {
      if (document[getVisibilityState()] !== "visible") {
        return false;
      }
      this.refreshToken()
        .then(() => {
          if (this.needTime()) {
            // 激活页签重置计时
            this.startTiming();
          }
        })
        .catch();
    },
    /**
     * 获取请求刷新的参数
     */
    getRequestData: function() {
      const data = {};
      const userInfo = this.$store.getters["user/userInfo"];
      if (userInfo?.userName) {
        data.username = userInfo.userName;
        // 说明是登录状态，如果用户名不一致，说明切换了用户
        if (!this.localIsStoreUser()) {
          // 带着新 token 和老用户名比较
          this.setLocalToStoreToken();
        }
      }
      if (this.$route.query.srid) {
        data.srid = this.$route.query.srid;
      }
      data.token = this.getToken();
      return data;
    },
    /**
     * 处理刷新 token 接口逻辑
     */
    refreshToken: function() {
      if (!this.getToken()) {
        // 如果没有 token，不需要去访问了
        this.stopTiming();
        return Promise.reject();
      }
      // 是登录后的状态
      return this.$request.post(
        `/auth/checkAndRefreshToken${this.$route.query.srid ? `?srid=${this.$route.query.srid}` : ""}`,
        {
          ...this.getRequestData()
        },
        {
          headers: {
            showLoading: false
          }
        }
      )
        .then(this.handleRequestResult);
    },
    handleRequestResult: function(response) {
      const data = response.data.data;
      if (this.isInIframe) {
        if (data.newToken) {
          this.$store.commit("user/setToken", data.newToken);
        }
        return;
      }
      if (data.tokenInvalid) {
        this.reloadWindow(data.message || "token 无效", "确定", () => {
          this.$route.push("/login");
        });
        return;
      }
      if (data.redirectUrl) {
        this.reloadWindow("已在其他页面登录，页面将重新载入", "确定", () => {
          window.location.href = this.setComplateRedirectUrl(data);
        });
      } else if (data.refreshTokenExpired) {
        // 当前登录已经退出了，有可能又重新登录了，所以这里不能清空 token
        // 判断如果当前用户一致，那可能是退出之后又重新登录了
        const appId = this.refreshTokenData.proxy[this.refreshTokenData.env].appId;
        if (this.localIsStoreUser() && (!appId || appId === "$system$")) {
          // 避免切换租户后登出再登录，本页面还是老租户，仅平台走此逻辑
          this.reloadWindow("已在其他页面重新登录，页面将重新载入");
        } else {
          this.$store.commit("user/removeToken");
          this.reloadWindow("已在其它页面登出", "重新登录");
        }
      } else if (data.tokenExpired) {
        // 这个 token 已经过期
        if (this.$route.path !== "/login") {
          this.reloadWindow("登录状态已过期", "重新登录", () => {
            this.$store.dispatch("user/logout");
          });
        } else {
          this.$store.commit("user/removeToken");
        }
      } else if (data.userChanged) {
        // 切换了用户
        if (this.$route.path === "/login") {
          // 平台 - 如果是登录页面，设置 token，然后跳转到首页
          // 子应用，会直接走 refreshTokenExpired 的逻辑
          this.reloadWindow("已在其他页面登录，页面将重新载入", "确定", () => {
            this.setLocalToStoreToken();
            this.$router.push(this.$route.query.redirect || "/homePage/index");
          });
        } else {
          this.reloadWindow(`登录用户已改变【新用户为：${data.newUsername}】，页面将重新载入`);
        }
      } else if (data.tenantChanged) {
        this.$store.commit("user/setToken", data.newToken);
        this.reloadWindow("租户已改变，页面将重新载入");
      } else if (data.newToken) {
        this.$store.commit("user/setToken", data.newToken);
      }
    },
    reloadWindow: function(tip, okText = "确定", cb = () => window.location.reload()) {
      const alertDom = document.querySelector(".auto-refresh-token-alert-box");
      if (alertDom) {
        this.refreshTip(alertDom, tip, okText);
      } else {
        this.$alert(tip, "系统提示", {
          type: "warning",
          showClose: false,
          confirmButtonText: okText,
          closeOnClickModal: false,
          customClass: "auto-refresh-token-alert-box",
          callback: () => {
            (cbFn || cb)();
          }
        });
      }
    },
    refreshTip: function(dom, tip, okText, cb) {
      dom.querySelector(".el-message-box__message").innerHTML = `<p>${tip}</p>`;
      dom.querySelector(".el-button").innerHTML = `<span>${okText}</span>`;
      cbFn = cb;
    },
    /**
     * 开始计时
     */
    startTiming: function() {
      if (refreshTokenTimer) {
        clearInterval(refreshTokenTimer);
      }
      refreshTokenTimer = setInterval(() => {
        this.refreshToken();
      }, intervalTime);
    },
    /**
     * 停止计时
     */
    stopTiming: function() {
      if (refreshTokenTimer) {
        clearInterval(refreshTokenTimer);
        refreshTokenTimer = null;
      }
    },
    /**
     * 登录页需要清空 token 相关信息，避免后续请求相关数据时被数据影响
     */
    clearTokenInfo: function() {
      this.$store.commit("user/removeToken");
      this.$store.commit("user/setUserInfo");
    },
    getToken: function() {
      return this.$store.getters["user/token"] || localStorage.getItem(this.refreshTokenData.TOKEN_NAME);
    },
    /**
     * 获取完整的跳转地址
     */
    setComplateRedirectUrl: function(data) {
      let baseURL;
      if (this.refreshTokenData.env === "development") {
        baseURL = `${window.location.origin}${this.refreshTokenData.proxy[this.refreshTokenData.env].API}`;
      } else {
        baseURL = this.refreshTokenData.proxy[this.refreshTokenData.env].API;
      }
      baseURL = `${baseURL}/auth${data.redirectUrl}`;
      return baseURL;
    },
    /**
     * 判断 vuex 中的用户是否是 本地缓存的用户
     */
    localIsStoreUser: function() {
      const localUsername = localStorage.getItem(this.refreshTokenData.USER_NAME);
      return localUsername && this.$store.getters["user/userInfo"]?.userName === localUsername;
    },
    /**
     * 将本地 token 更新给 store
     */
    setLocalToStoreToken: function() {
      this.$store.commit("user/setToken", localStorage.getItem(this.refreshTokenData.TOKEN_NAME));
    }
  }
};