import request from "@/utils/request";

// 查询模型列表
export function listModel(query) {
  return request({
    url: "/system/model/list",
    method: "get",
    params: query
  });
}

// 新增模型
export function addModel(data) {
  return request({
    url: "/system/model/add",
    method: "post",
    data
  });
}

// 修改模型
export function updateModel(data) {
  return request({
    url: "/system/model/update",
    method: "post",
    data
  });
}

// 删除模型
export function deleteModel(query) {
  return request({
    url: "/system/model/remove",
    method: "post",
    params: query
  });
}

// 查询模型详细
export function getModel(modelId) {
  return request({
    url: `/system/model/${modelId}`,
    method: "get"
  });
}