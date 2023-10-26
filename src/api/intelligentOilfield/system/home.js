import request from "@/utils/request";

// 首页—查询部门下的各个信息
export function listAll(departId) {
  return request({
    url: `/system/departmentsNum/listAll/${departId}`,
    method: "get"
  });
}

// 查询用户下租户个数量及活跃度
export function listNum(userId) {
  return request({
    url: `/system/departmentsNum/listTenant/${userId}`,
    method: "get"
  });
}

// 获取通知公告
export function noticeList() {
  return request({
    url: "/system/notice/noticeList",
    method: "get"
  });
}

// 首页-详情-指标列表
export function getHomeList(param) {
  return request({
    url: `/system/index/getHomeList?indexModule=${param.indexModule}&tenantId=${param.tenantId}`,
    method: "get"
  });
}

// 首页-详情-指标-确定/取消
export function sureHomeIndex(data) {
  return request({
    url: "/system/index/sureHomeIndex",
    method: "post",
    data
  });
}

// 首页-详情-指标-取消选中
export function outHomeIndex(data) {
  return request({
    url: "/system/index/outHomeIndex",
    method: "post",
    data
  });
}

// 首页-详情-指标-选中
export function inHomeIndex(data) {
  return request({
    url: "/system/index/inHomeIndex",
    method: "post",
    data
  });
}