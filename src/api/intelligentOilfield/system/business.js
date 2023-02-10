import request from '@/utils/request'

// 查询角色列表
export function listBusiness(query) {
  return request({
    url: '/system/business/list',
    method: 'get',
    params: query
  })
}

// 新增入口
export function addBusiness(data) {
  return request({
    url: '/system/business',
    method: 'post',
    data
  })
}
// 删除入口
export function delBusiness(businessId) {
  return request({
    url: `/system/business/${businessId}`,
    method: 'delete'
  })
}

// 修改入口
export function updateBusiness(data) {
  return request({
    url: '/system/business',
    method: 'put',
    data
  })
}