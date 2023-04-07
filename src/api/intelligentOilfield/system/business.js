import request from "@/utils/request";

// 查询角色列表
export function listBusiness(query) {
  return request({
    url: "/system/business/list",
    method: "get",
    params: query
  });
}

// 新增入口
export function addBusiness(data) {
  return request({
    url: "/system/business",
    method: "post",
    data
  });
}
// 删除入口
export function delBusiness(businessId) {
  return request({
    url: `/system/business/${businessId}`,
    method: "delete"
  });
}

// 修改入口
export function updateBusiness(data) {
  return request({
    url: "/system/business",
    method: "put",
    data
  });
}

// 上传入口
export function uploadBusinessImg(formData) {
  return request({
    url: "/system/business/uploadBusinessImg",
    method: "post",
    data: formData
  });
}

// 门户投影模式-业务中心查询列表
export function getListBusiness(query) {
  return request({
    url: "/system/business/getList",
    method: "get",
    params: query
  });
}

// 门户投影模式-选中业务中心
export function selectBusiness(data) {
  return request({
    url: "/system/business/inBusiness",
    method: "post",
    data
  });
}

// 门户投影模式-取消选中业务中心
export function noSelectBusiness(data) {
  return request({
    url: "/system/business/outBusiness",
    method: "post",
    data
  });
}

// 门户投影模式-确定取消业务中心
export function sureBusiness(data) {
  return request({
    url: "/system/business/sureBusiness",
    method: "post",
    data
  });
}