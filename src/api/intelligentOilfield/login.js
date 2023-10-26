import request from "@/utils/request";

import { encrypt } from "@/utils/jsencrypt";
import proxy from "@/config/host";

function getDataWithEncryptAppId(data) {
  const env = import.meta.env.MODE;
  if (proxy[env].appId) {
    data.appId = encrypt(proxy[env].appId);
  }
  return data;
}

// 登录方法
export function login(data, params) {
  return request({
    url: "auth/login",
    headers: {
      isToken: false
    },
    method: "post",
    data: getDataWithEncryptAppId(data),
    params
  });
}

// 注册方法
export function register(data) {
  return request({
    url: "auth/register",
    headers: {
      isToken: false
    },
    method: "post",
    data
  });
}

// 刷新方法
export function refreshToken() {
  return request({
    url: "auth/refresh",
    method: "post"
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "system/user/getInfo",
    method: "get"
  });
}

// 获取用户详细信息,带appId,目的是拿到已有的第一个路由,方便进行后续跳转
export function getInfoByAppId(appId) {
  return request({
    url: `system/user/getInfo?appId=${appId}`,
    method: "get"
  });
}

// 退出方法
export function logout() {
  return request({
    url: "auth/logout",
    method: "delete"
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: "code",
    headers: {
      isToken: false
    },
    method: "get",
    timeout: 20000
  });
}

// 登出保存上次登录系统位置（门户/后台）
export function updateLastLogout(data) {
  return request({
    url: "system/user/updateLastLogout",
    method: "post",
    data
  });
}
// 一键登录
export function getGoOtherLogin(query) {
  return request({
    url: "/auth/getCorpOauthUrl",
    method: "get",
    params: query
  });
}
// 三方登录
export function callBackLogin(data, params) {
  return request({
    headers: {
      isToken: false
    },
    url: "/auth/login",
    method: "post",
    data: getDataWithEncryptAppId(data),
    params
  });
}

// 修改下次登录是否显示接口
export function updateBrowse(userId, showTips) {
  return request({
    url: `system/user/updateBrowse?userId=${userId}&showTips=${showTips}`,
    method: "get"
  });
}