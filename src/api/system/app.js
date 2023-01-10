import request from '@/utils/request'

// 新增数据权限
export function addApp(data) { 
  return request({
    url: '/app',
    method: 'post',
    data
  })
}

export function fakeData(data) { 
  return request({
    url: '/app',
    method: 'post',
    data
  })
}