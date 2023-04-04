import request from "@/utils/request";

// 查询角色列表
export function listIndex(query) {
  return request({
    url: "/system/index/list",
    method: "get",
    params: query
  });
}

// 新增入口
export function addIndex(data) {
  return request({
    url: "/system/index",
    method: "post",
    data
  });
}
// 删除入口
export function delIndex(indexId) {
  return request({
    url: `/system/index/${indexId}`,
    method: "delete"
  });
}

// 修改入口
export function updateIndex(data) {
  return request({
    url: "/system/index",
    method: "put",
    data
  });
}

// 上传入口
export function uploadIndexImg(formData) {
  return request({
    url: "/system/index/uploadIndexImg",
    method: "post",
    data: formData
  });
}