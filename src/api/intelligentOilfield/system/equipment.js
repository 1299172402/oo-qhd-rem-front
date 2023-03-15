import request from '@/utils/request'

// 查询设备维护列表
export function equipmentList(query) {
  return request({
    url: 'system/equipment/list',
    method: 'get',
    params: query
  })
}

// 搜索
export function searchequipment(data) {
  return request({
    url: '/system/equipment/listByLike',
    method: 'post',
    data
  })
}

// 获取状态
export function equipmentStatus(query) {
  return request({
    url: 'system/equipment/selectStatus',
    method: 'get',
    params: query
  })
}
