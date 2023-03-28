import request from '@/utils/request';

// 首页—查询部门下的各个信息
export function listAll(departId) {
  return request({
    url: `/system/departmentsNum/listAll/${departId}`,
    method: 'get',
  });
}

// 查询用户下租户个数量及活跃度
export function listNum(userId) {
  return request({
    url: `/system/departmentsNum/listTenant/${userId}`,
    method: 'get',
  });
}

// 获取通知公告
export function noticeList(tenantId) {
  return request({
    url: `/system/notice/noticeList/${tenantId}`,
    method: 'get',
  });
}
