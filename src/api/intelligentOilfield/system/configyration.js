import request from '@/utils/request'

// 查询角色列表
export function listEnter(query) {
  return request({
    url: '/system/enter/list',
    method: 'get',
    params: query
  })
}

// 新增入口
export function addEnter(data) {
  return request({
    url: '/system/enter',
    method: 'post',
    data
  })
}
// 删除入口
export function delEnter(enterId) {
  return request({
    url: `/system/enter/${enterId}`,
    method: 'delete'
  })
}

// 修改入口
export function updateEnter(data) {
  return request({
    url: '/system/enter',
    method: 'put',
    data
  })
}