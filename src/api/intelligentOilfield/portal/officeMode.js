// 门户-办公模式
import request from '@/utils/request'

// 应用中心-列表
export function applicationCenterList(data) { 
  return request({
    url: `system/app/getList?appName=${data.appName}&apply=${data.apply}&appCategory=${data.appCategory}`,
    method: 'get',
    data
  })
}

// 应用中心-批量选中未选中应用确认
export function batchUpdateApp(data) { 
  return request({
    url: '/system/app/batchUpdateSelectedStatus',
    method: 'post',
    data
  })
}

// 应用中心-单个选中未选中应用确认
export function updateApp(data) { 
  return request({
    url: '/system/app/updateSelectedStatus',
    method: 'post',
    data
  })
}

// 门户办公模式-应用中心-选中未选中应用确认【zhangbin版本】
export function saveAppUserRelation(data) { 
  return request({
    url: '/system/app/saveAppUserRelation',
    method: 'post',
    data
  })
}

// 门户办公模式-应用中心-选中未选中应用确认【zhangbin版本】
export function batchSaveAppUserRelation(data) { 
  return request({
    url: '/system/app/batchSaveAppUserRelation',
    method: 'post',
    data
  })
}

// 菜单管理-所属应用下拉来源
export function applicationAllList() { 
  return request({
    url: `system/app/listAll`,
    method: 'get',
  })
}

// 我的事项-我的待办
export function getAssignedList(data) { 
  return request({
    url: `system/flow/integration/todo/assigned`,
    method: 'post',
    data
  })
}

// 我的事项-我的已办
export function getInvolvedList(data) { 
  return request({
    url: `system/flow/instance/involved`,
    method: 'post',
    data
  })
}

// 我的事项-我发起的
export function getInitiatedList(data) { 
  return request({
    url: `system/flow/instance/initiated`,
    method: 'post',
    data
  })
}