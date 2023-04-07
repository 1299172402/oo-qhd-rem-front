import axios from "@/utils/request";

// post
export function postAction(url, data, params) {
  return axios({
    url,
    method: "post",
    data,
    params
  });
}

// post method= {post | put}
export function httpAction(url, parameter) {
  return axios({
    url,
    method: "post",
    data: parameter
  });
}

// put
export function putAction(url, parameter) {
  return axios({
    url,
    method: "post",
    data: parameter
  });
}

// get
export function getAction(url, parameter, other) {
  return axios({
    url,
    method: "get",
    params: parameter,
    ...other
  });
}

// deleteAction
export function deleteAction(url, parameter) {
  return axios({
    url,
    method: "post",
    params: parameter
  });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url, parameter) {
  return axios({
    url,
    params: parameter,
    method: "get",
    responseType: "blob"
  });
}
/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl(avatar, subStr) {
  if (!subStr) subStr = "http";
  if (avatar && avatar.startsWith(subStr)) {
    return avatar;
  }
  if (avatar && avatar.length > 0 && avatar.indexOf("[") === -1) {
    return `${window._CONFIG.staticDomainURL}/${avatar}`;
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

/**
 * 解析数组类型的参数
 * @param url
 * @param parameter
 * @returns {AxiosPromise<any>}
 */
export function customParamsGetAction(url, parameter) {
  function parseArray(key = "", array = []) {
    const ret = array.map(x => `${key}=${x}`).join("&");
    return ret;
  }
  return axios.get(url, {
    params: parameter,
    paramsSerializer(params = {}) {
      const retArr = [];
      Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
          retArr.push(parseArray(key, params[key]));
        }
        if (typeof params[key] === "string" || typeof params[key] === "number") {
          if (params[key]) retArr.push(`${key}=${params[key]}`);
        }
      });
      const ret = retArr.join("&");
      return ret;
    }
  });
}