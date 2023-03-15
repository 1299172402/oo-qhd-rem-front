import request from '@/utils/request'

// 登录方法
export function login(data,param) {
  return request({
    url: 'auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data, 
    param
  })
}

// 注册方法
export function register(data) {
  return request({
    url: 'auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}

// 刷新方法
export function refreshToken() {
  return request({
    url: 'auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: 'system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: 'code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 登出保存上次登录系统位置（门户/后台）
export function updateLastLogout(data) {
  return request({
    url: 'system/user/updateLastLogout',
    method: 'post',
    data
  })
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
    data,
    params
  });
}