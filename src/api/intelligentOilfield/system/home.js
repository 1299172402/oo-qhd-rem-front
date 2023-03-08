import request from '@/utils/request'

// 首页—查询部门下的各个信息
export function listAll(departId) {
  return request({
    url: `/system/departmentsNum/listAll/${departId}`,
    method: 'get',
  })
}

// 查询部门下个数量及活跃度
export function listNum(departId) {
  return request({
    url: `/system/departmentsNum/listNum/${departId}`,
    method: 'get',
  })
}

// 获取通知公告
export function noticeList() {
  return request({
    url: `/system/notice/noticeList`,
    method: 'get',
  })
}