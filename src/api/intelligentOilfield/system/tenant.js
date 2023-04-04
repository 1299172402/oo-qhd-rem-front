import request from "@/utils/request";

// 获取切换到的租户信息
export function exchangeTenant(params) {
  return request({
    url: "system/token/exchangeTenant",
    method: "get",
    params
  });
}