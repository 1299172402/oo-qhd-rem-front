import axios from "./request";

const api = {
  user: "/api/user",
  role: "/api/role",
  service: "/api/service",
  permission: "/api/permission",
  permissionNoPager: "/api/permission/no-pager"
};

export default api;

// post
export function postAction (url: string, data?, params?): any {
  return axios({
    url,
    method: "post",
    data,
    params
  });
}

// post method= {post | put}
export function httpAction (url: string, parameter, method) {
  return axios({
    url,
    method,
    data: parameter
  });
}

// put
export function putAction (url, parameter) {
  return axios({
    url,
    method: "put",
    data: parameter
  });
}

// get
export function getAction (url: string, parameter?, other?): any {
  return axios({
    url,
    method: "get",
    params: parameter,
    ...other
  });
}

// deleteAction
export function deleteAction (url, parameter) {
  return axios({
    url,
    method: "post",
    params: parameter
  });
}

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: "get",
    params: parameter
  });
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: "get",
    params: parameter
  });
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: "get",
    params: parameter
  });
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: "get",
    params: parameter
  });
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    // eslint-disable-next-line eqeqeq
    method: parameter.id == 0 ? "post" : "put",
    data: parameter
  });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @param method
 * @returns {*}
 */
export function downFile (url, parameter, method = "get") {
  return axios({
    url,
    params: parameter,
    method,
    responseType: "blob"
  });
}
/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl (avatar, subStr): string {
  if (!subStr) subStr = "http";
  if (avatar && avatar.startsWith(subStr)) {
    return avatar;
  } 
  if (avatar && avatar.length > 0 && avatar.indexOf("[") === -1) {
    return `${(window as any)._CONFIG.staticDomainURL  }/${  avatar}`;
  }
  
}
/**
 * 文书签章超时设置10分钟
 * @param url
 * @param parameter
 */
export function signDocPostAction(url, parameter) {
  return axios({
    timeout: 10 * 60 * 1000,
    url,
    method: "post",
    data: parameter
  });
}
