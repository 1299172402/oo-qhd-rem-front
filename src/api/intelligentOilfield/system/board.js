import request from "@/utils/request";
// 看板中心
export function listBoard(query) {
  return request({
    url: "/system/board/list",
    method: "get",
    params: query
  });
}

// 新增入口
export function addBoard(data) {
  return request({
    url: "/system/board",
    method: "post",
    data
  });
}
// 删除入口
export function delBoard(boardId) {
  return request({
    url: `/system/board/${boardId}`,
    method: "delete"
  });
}

// 修改入口
export function updateBoard(data) {
  return request({
    url: "/system/board",
    method: "put",
    data
  });
}

// 上传入口
export function uploadBoardImg(formData) {
  return request({
    url: "/system/board/uploadBoardImg",
    method: "post",
    data: formData
  });
}

// 门户办公模式-查询列表
export function getListBoard(query) {
  return request({
    url: "/system/board/getList",
    method: "get",
    params: query,
    headers: {
      showLoading: false
    }
  });
}

// 门户办公模式-选中
export function selectBoard(data) {
  return request({
    url: "/system/board/inBoard",
    method: "post",
    data
  });
}

// 门户办公模式-取消选中
export function noSelectBoard(data) {
  return request({
    url: "/system/board/outBoard",
    method: "post",
    data
  });
}

// 门户办公模式-确定取消
export function sureBoard(data) {
  return request({
    url: "/system/board/sureBoard",
    method: "post",
    data
  });
}