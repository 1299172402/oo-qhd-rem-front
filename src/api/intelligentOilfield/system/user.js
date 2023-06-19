import request from "@/utils/request";
import { praseStrEmpty } from "@/utils/commonSettings";

//  门户-修改用户投影/办公模式布局数据
export function updateUserModel(data) {
  return request({
    url: "/system/user/updateModel",
    method: "post",
    data
  });
}

// 查询用户列表
export function listUser(query) {
  return request({
    url: "/system/user/list",
    method: "get",
    params: query
  });
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: `/system/user/${praseStrEmpty(userId)}`,
    // url: `/system/user/${userId}`,
    method: "get"
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: "/system/user",
    method: "post",
    data
  });
}

// 修改用户
export function updateUser(data) {
  return request({
    url: "/system/user",
    method: "put",
    data
  });
}

// 管理账号
export function updateUseridcard(data) {
  return request({
    url: "/system/user/updateUserSelf",
    method: "put",
    data
  });
}

// 删除用户
export function delUser(userId) {
  return request({
    url: `/system/user/${userId}`,
    method: "delete"
  });
}

// 用户密码重置
export function resetUserPwd(userId, password, userName) {
  const data = {
    userId,
    password,
    userName
  };
  return request({
    url: "/system/user/resetPwd",
    method: "put",
    data
  });
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  };
  return request({
    url: "/system/user/changeStatus",
    method: "put",
    data
  });
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: "/system/user/profile",
    method: "get"
  });
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: "/system/user/profile",
    method: "put",
    data
  });
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  };
  return request({
    url: "/system/user/profile/updatePwd",
    method: "put",
    params: data
  });
}

// 用户密码修改
export function updateUserPwdByUserName(userName, oldPassword, newPassword) {
  const data = {
    userName,
    oldPassword,
    newPassword
  };
  return request({
    url: "/system/user/updatePwd",
    method: "put",
    params: data
  });
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: "/system/user/profile/avatar",
    method: "post",
    data
  });
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: `/system/user/authRole/${userId}`,
    method: "get"
  });
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: "/system/user/authRole",
    method: "put",
    params: data
  });
}

// 查询用户访问列表
export function listUseraccess(query) {
  return request({
    url: "/system/user/userAccess",
    method: "get",
    params: query
  });
}

// 查询统计表信息
export function getAccessCount() {
  return request({
    url: "/system/user/getAccessCount",
    method: "post"
  });
}

// 访问页面
export function updateaccessPage(data) {
  return request({
    url: "/system/user/updateAccessPage",
    method: "post",
    data
  });
}

// 添加用户访问记录
export function addAccessinfo(data) {
  return request({
    url: "/system/user/addAccessinfo",
    method: "post",
    data
  });
}

// 保存页面配置
export function setpageConfig(data) {
  return request({
    url: "/system/pageConfig/saveOrUpdatePageConfig",
    method: "post",
    data
  });
}

// 应用访问统计列表
export function appAccessList(query) {
  return request({
    url: "/system/app/getAppAccessList",
    method: "get",
    params: query
  });
}

// 获取编辑用户时的不可编辑项
export function getNoEditable() {
  return request({
    url: "/system/user/nonEditable",
    method: "get"
  });
}

export function uploadFile(updateSupport, data) {
  return request({
    url: `/system/user/importData?updateSupport=${updateSupport}`,
    method: "post",
    data
  });
}

// 访问菜单页面，调用统计接口，传参menuName：菜单名称和menuPath：访问莱单路径
export function sysMenuAccess(data) {
  return request({
    url: "/system/SysMenuAccess/add",
    method: "post",
    data
  });
}

// 检验当前token是否过期
export function checkAndRefreshToken(data) {
  return request({
    url: "/auth/checkAndRefreshToken",
    method: "post",
    data
  });
}