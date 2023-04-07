import request from "@/utils/request";

export function getList(query) {
  return request({
    url: "/system/instationmail/list",
    method: "get",
    params: query
  });
}

export function updateAllStatus(userId) {
  return request({
    url: `/system/instationmail/updateAllStatus/${userId}`,
    method: "get"
  });
}

export function updateOneStatus(data) {
  return request({
    url: "/system/instationmail/updateOneStatus",
    method: "post",
    data
  });
}