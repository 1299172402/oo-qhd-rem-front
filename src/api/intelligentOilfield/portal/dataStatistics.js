import request from "@/utils/request";

export function listIndex(query) {
  return request({
    url: "/system/index/list",
    method: "get",
    params: query
  });
}

// 门户投影模式-查询列表
export function getList(query) {
  return request({
    url: "/system/index/getList",
    method: "get",
    params: query
  });
}

export function getListSelect(query) {
  return request({
    url: "/system/index/shadowSelected",
    method: "get",
    params: query
  });
}
export function getListAll(query) {
  return request({
    url: "/system/index/shadowSelector",
    method: "get",
    params: query
  });
}

// 门户投影模式-确定/取消
export function sureIndex(data) {
  return request({
    url: "/system/index/sureIndex",
    method: "post",
    data
  });
}

// 门户投影模式-取消选中
export function noSelectIndex(data) {
  return request({
    url: "/system/index/outIndex",
    method: "post",
    data
  });
}

// 门户投影模式-选中
export function selectIndex(data) {
  return request({
    url: "/system/index/inIndex",
    method: "post",
    data
  });
}

// 新增自定义面板
export function addCustomPanel(data) {
  return request({
    url: "/system/CustomPanel",
    method: "post",
    data
  });
}

// 编辑自定义面板
export function updateCustomPanel(data) {
  return request({
    url: "/system/CustomPanel/update",
    method: "post",
    data
  });
}

// 查询自定义面板
export function listByCustomId(customId) {
  return request({
    url: `/system/CustomPanel/listByCustomId/${customId}`,
    method: "get",
    headers: {
      showLoading: false
    }
  });
}