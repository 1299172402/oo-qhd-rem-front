import request from ".";

// 分页查询流程定义
export function list(param) {
  return request({
    url: "/app/rest/models_new/list",
    method: "post",
    data: param
  });
}
// 保存流程定义基本信息
export function saveDesignInfo(data) {
  if (data.id) {
    return request({
      url: `/app/rest/models_new/${data.id}`,
      method: "post",
      data
    });
  }
  return request({
    url: "/app/rest/models_new",
    method: "post",
    data
  });
}
// 查询流程定义基本信息单条数据
export function findById(id) {
  return request({
    url: `/app/rest/models/${id}`,
    method: "get"
  });
}
// 发布流程
export function publish(id) {
  return request({
    url: `/app/rest/models/${id}/publish`,
    method: "post"
  });
}
// 根据id删除流程定义
export function deleteById(id) {
  return request({
    url: `/app/rest/models/${id}/delete`,
    method: "post"
  });
}
// 复制模型
export function copyInfo(data) {
  return request({
    url: `/app/rest/models_new/${data.id}/clone`,
    method: "post",
    data
  });
}
// 导出流程定义
export function exportInfo(id) {
  return request({
    url: `/app/rest/models/${id}/bpmn20/nocheck`,
    method: "get",
    returnAll: true
  });
}
// 根据流程id分页查询节点规则
export function ruleList(id, param) {
  return request({
    url: `/app/rest/act-ruler/model/${id}/act-rules`,
    method: "post",
    data: param
  });
}
// 导出节点规则
export function exportRule(id) {
  return request({
    url: `/app/rest/act-ruler/model/${id}/export-custom/nocheck`,
    method: "get"
  });
}
// 根据id删除节点规则
export function deleteRuleById(id) {
  return request({
    url: `/app/rest/act-ruler/act-rule/${id}/delete`,
    method: "post"
  });
}
// 节点规则排序
export function ruleSort(data) {
  return request({
    url: "/app/rest/act-ruler/model/act-sort",
    method: "post",
    data
  });
}
// 保存节点规则
export function ruleSave(data) {
  if (data.id) {
    return request({
      url: `/app/rest/act-ruler/act-rule/${data.id}`,
      method: "post",
      data
    });
  }
  return request({
    url: "/app/rest/act-ruler/act-rule",
    method: "post",
    data
  });
}
// 根据节点规则id查询规则
export function ruleFindById(id) {
  return request({
    url: `/app/rest/act-ruler/act-rule/${id}`,
    method: "get"
  });
}
// 查询所有的使用范围信息
export function applyScopeSelections(params) {
  return request({
    url: "/app/rest/act-ruler/apply-scope-selections",
    method: "get",
    params
  });
}
// 获取指派资源类型
export function resourceTypeSelections() {
  return request({
    url: "/app/rest/act-ruler/resource-type-selections",
    method: "get"
  });
}
// 获取指派资源--人
export function userSelections(params) {
  return request({
    url: "/app/rest/act-ruler/user-selections",
    method: "get",
    params
  });
}
// 获取指派资源--组
export function groupSelections(params) {
  return request({
    url: "/app/rest/act-ruler/group-selections",
    method: "get",
    params
  });
}
// 获取委托指派参照人
export function relativePersonSelections() {
  return request({
    url: "/app/rest/act-ruler/relative-person-selections",
    method: "get"
  });
}