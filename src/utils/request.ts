import axios from "axios";
import { MessageBox, Message, Loading, Notification } from "element-ui";
import _ from "lodash";
import { saveAs } from "file-saver";
import proxy from "../config/host";
import store from "@/store";
import router from "@/router/index";
import { tansParams, blobValidate } from "@/utils/commonSettings";
import errorCode from "@/utils/errorCode";

const whiteListLoading = store.getters["permission/whiteListLoading"];
const whiteListError = store.getters["permission/whiteListError"];

let downloadLoadingInstance;

// loading对象
let loading;
// 当前正在请求的数量
let needLoadingRequestCount = 0;
// 401拦截次数
let interceptCount = 0;

// 防抖：将 500ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
const toHideLoading = _.debounce(() => {
  if (needLoadingRequestCount !== 0) return;
  loading?.close();
  loading = null;
}, 500);

const env = import.meta.env.MODE || "development";

const API_HOST = env === "mock" ? "/" : proxy[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001
};

const quickCloseLoading = ["projectionMode", "officeMode"];

// 显示loading
function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (document.querySelector("#first-loading")) {
    return;
  }
  if (needLoadingRequestCount === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "数据加载中...",
      background: "rgba(0, 0, 0, 0.5)",
      target: target || "body"
    });
  }
  needLoadingRequestCount += 1;
}

function determineLoading(config) {
  if (!config) return false;
  return (
    store.getters["permission/scrollLoading"] &&
    config.headers.showLoading !== false &&
    !config.url.includes("/system/CustomPanel/listByCustomId") &&
    !config.url.includes("system/app/appListByUserIdAndTenantId") &&
    !whiteListLoading.includes(config.url)
  );
}

// 隐藏loading
function hideLoading(config = {}, needDetermine = true) {
  if (!needDetermine || determineLoading(config)) {
    needLoadingRequestCount -= 1;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); // 做个保护
    if (needLoadingRequestCount === 0) {
    // 关闭loading
      toHideLoading();
    }
  }
}

const instance = axios.create({
  baseURL: API_HOST,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "App-Id": proxy[env].appId
  }
});

function logoutBox(response = null) {
  const alertDom = document.querySelector(".auto-refresh-token-alert-box");
  if (alertDom || router.app?.$route?.path === "/" || router.app?.$route?.path === "/login") {
    return;
  }
  MessageBox.confirm("登录状态已过期,请重新登录", "系统提示", {
    confirmButtonText: "确定",
    type: "warning",
    showClose: false,
    closeOnClickModal: false,
    showCancelButton: false,
    customClass: "auto-refresh-token-alert-box",
    callback: () => {
      store.dispatch("permission/restore");
      store.dispatch("user/logout").then(() => {
        router.replace({ path: "/" });
      });
      hideLoading(response?.config);
    }
  });
}

// eslint-disable-next-line
// @ts-ignore
// axios的retry ts类型有问题
instance.interceptors.retry = 3;

// instance.interceptors.request.use((config) => config);
instance.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false;
    if (store.getters["user/token"] && !isToken) {
      config.headers.Authorization = `Bearer ${store.getters["user/token"]}`; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // if (store.getters['user/token']) {
    //   // config.headers['token'] = store.getters['user/token']
    //   config.headers.Authorization = `Bearer ${store.getters['user/token']}`;
    // }
    // 判断当前请求是否设置了不显示Loading
    if (determineLoading(config)) {
      showLoading(config.headers.loadingTarget);
    }
    return config;
  },
  err => {
    const { config } = err;
    // 判断当前请求是否设置了不显示Loading
    hideLoading(config);
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => {
    if (quickCloseLoading.includes(router.currentRoute.name) && loading) {
      setTimeout(() => {
        loading?.close();
        loading = null;
        needLoadingRequestCount = 0;
      }, 1500);
    }
    if (response.headers.ntk) {
      // 相应的 headers 中有 ntk 时，更换 token
      store.commit("user/setToken", response.headers.ntk);
    }
    if (response.config.returnAll) {
      hideLoading(response.config);
      return response;
    }
    // 二进制数据则直接返回
    if (response.request.responseType === "blob" || response.request.responseType === "arraybuffer") {
      hideLoading(response.config);
      return response.data;
    }
    if (response.data.code === 401 && interceptCount === 0) {
      interceptCount += 1;
      logoutBox(response);
    } else if (response.data.code === 500) {
      if (response.config.url.substring(0, response.config.url.indexOf("?")) !== "/gem001b/queryAlcAlarmByParam" && whiteListError.indexOf(response.config.url) === -1) {
      // 过滤掉右上角小铃铛1min轮询接口,和报警信息列表接口的报错信息
      // TODO: Maybe change back，第一版顶部吐司形式
      // Message({
      //   message: response.data.msg,
      //   type: "error"
      // });
      // TODO: Maybe change back，第二版弹窗形式+登录正常校验
      // if (response.config.url === "auth/login") {
      //   Message({
      //     message: response.data.msg,
      //     type: "error"
      //   });
      // } else {
      //   MessageBox.alert("系统内部服务错误", "系统提示", {
      //     type: "error"
      //   });
      // }
      // 第三版右侧错误提示信息
        Notification.error({
          title: "",
          message: response.data.msg,
          duration: 1000,
          offset: 50
        });
      }
      hideLoading(response.config);
    } else if (response.data.code === 200) {
      interceptCount = 0;
      const { data } = response;
      // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
      hideLoading(response.config);
      if (router.app?.$route?.name === "login") { // 登录页面关闭所有loading
        needLoadingRequestCount = 1;
        hideLoading(response.config, false);
      }
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }
      return response;
    } else {
      hideLoading(response.config);
      return response.data;
    }
  },
  err => {
    const { config, response } = err;

    // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    hideLoading(config);
    if (!config || !config.retry) {
      if (response?.config.headers.unDisplayErrTip) {
        return Promise.reject(err);
      } if (err.response?.data.code === 401) {
        logoutBox();
      } else if (config.url.substring(0, config.url.indexOf("?")) !== "/gem001b/queryAlcAlarmByParam" && whiteListError.indexOf(config.url) === -1) {
        // 过滤掉右上角小铃铛1min轮询接口,和报警信息列表接口的报错信息
        // TODO: Maybe change back，弹窗形式
        // MessageBox.alert(err.response?.data?.errorInfo?.message || err.response?.data?.msg || err.response?.statusText || "接口报错", "系统提示", {
        //   type: "error"
        // });
        // TODO: Maybe change back，第二版弹窗形式+登录正常校验
        // if (config.url === "auth/login") {
        //   MessageBox.alert(err.response?.data?.errorInfo?.message || err.response?.data?.msg || err.response?.statusText || "接口报错", "系统提示", {
        //     type: "error"
        //   });
        // } else {
        //   MessageBox.alert("系统内部服务错误", "系统提示", {
        //     type: "error"
        //   });
        // }
        // 第三版右侧错误提示信息，特殊处理404
        if (err.response?.status === 404) {
          Notification.error({
            title: "",
            message: "系统内部服务错误",
            duration: 1000,
            offset: 50
          });
        } else {
          Notification.error({
            title: "",
            message: err.response?.data?.errorInfo?.message || err.response?.data?.msg || err.response?.statusText || "接口报错",
            duration: 1000,
            offset: 50
          });
        }
      }
      return Promise.reject(err);
    }

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve({});
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  }
);

// 通用下载方法
export function download(url, params, filename) {
  downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)" });
  return instance.post(url, params, {
    transformRequest: [params => tansParams(params)],
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    responseType: "blob"
  }).then(async data => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data]);
      saveAs(blob, filename);
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default;
      Message.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch(r => {
    console.error(r);
    Message.error("下载文件出现错误，请联系管理员！");
    downloadLoadingInstance.close();
  });
}

export default instance;