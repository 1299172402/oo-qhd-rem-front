import store from "@/store";
import { appendQuery, queryObjectToUrlString } from "./urlHelper";

/**
 * 打开新应用，带上 token 跳转
 * @param {*} url 新应用的地址
 */
export function jumpToApplication(url) {
  window.open(appendQuery(url, "token", store.getters["user/token"]));
}

/**
 * 请求参数中如果带有 token，则表示是从门户来的，需要将 token 取出来使用，再继续正常跳转
 * @param {*} to 要跳转的路由信息
 * @returns 更正后的跳转路由信息
 */
export function jumpFromGateway(to) {
  if (to.query.token) {
    store.commit("user/setToken", to.query.token);
    store.commit("user/SET_ROLES", []);
    const query = { ...to.query };
    delete query.token;
    if (Object.keys(query).length) {
      window.location.href = `${window.location.origin}/#${to.path}?${queryObjectToUrlString(query)}`;
    } else {
      window.location.href = `${window.location.origin}/#${to.path}`;
    }
    // 重新加载，否则不能进入系统
    window.location.reload();
    return true;
  }
  return false;
}