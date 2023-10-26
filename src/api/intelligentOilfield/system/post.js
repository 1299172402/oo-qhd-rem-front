import request from "@/utils/request";

// 查询岗位列表
export function listPost(query) {
  return request({
    url: "/system/post/list",
    method: "get",
    params: query
  });
}

// 查询岗位详细
export function getPost(postId) {
  return request({
    url: `/system/post/getInfo/${postId}`,
    method: "get"
  });
}

// 新增岗位
export function addPost(data) {
  return request({
    url: "/system/post/addPost",
    method: "post",
    data
  });
}

// 修改岗位
export function editPost(data) {
  return request({
    url: "/system/post/editPost",
    method: "post",
    data
  });
}

// 删除岗位
export function delPost(postId) {
  return request({
    url: `/system/post/removePost?postId=${postId}`,
    method: "post"
  });
}

// 分配岗位详情
export function viewPostUserInfo(query) {
  return request({
    url: "/system/user/viewPostUserInfo",
    method: "get",
    params: query
  });
}

// 取消用户授权岗位
export function authUserCancel(data) {
  return request({
    url: "/system/post/authUser/cancel",
    method: "post",
    data
  });
}

// 批量取消用户授权岗位
export function authUserCancelAll(data) {
  return request({
    url: "/system/post/authUser/cancelAll",
    method: "post",
    data
  });
}
// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: "/system/post/authUser/selectAll",
    method: "post",
    data
  });
}

// 查询岗位未授权用户列表
export function unallocatedList(query) {
  return request({
    url: "/system/post/authUser/unallocatedList",
    method: "get",
    params: query
  });
}

// 获取编辑时的不可编辑项
export function getNoEditable() {
  return request({
    url: "/system/post/nonEditable",
    method: "get"
  });
}