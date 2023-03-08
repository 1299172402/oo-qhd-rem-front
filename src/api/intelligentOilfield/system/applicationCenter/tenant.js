import request from "@/utils/request";

// 查询租户分页列表
export function list(query) {
  return request({
    url: "/system/tenant/list",
    method: "get",
    params: query
  });
}

export function list1(query) {
  return request({
    url: "/system/tenant/list",
    method: "get",
    params: query
  });
}