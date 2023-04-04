import request from "@/utils/request";
/**
 * 根据appId 和 应用回调地址oauthCallbackApiUrl 获取跳转重定向url
 * @param data
 * @returns {*}
 */
export function getAppRedirectUrl(params) {
  return request({
    url: "/auth/getInnerAppOauthUrl",
    method: "get",
    headers: {
      isToken: false
    },
    params
  });
}