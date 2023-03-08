import request from '@/utils/request'

export function listIndex(query) {
  return request({
    url: '/system/index/list',
    method: 'get',
    params: query
  })
}

export function getList(query) {
  return request({
    url: '/system/index/getList',
    method: 'get',
    params: query
  })
}

export function sureIndex(data) {
  return request({
    url: '/system/index/sureIndex',
    method: 'post',
    data
  })
}

