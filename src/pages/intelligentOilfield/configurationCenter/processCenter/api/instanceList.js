import request from ".";

// 获取列表数据
export function list(data) {
  return request({
    url: "/app/rest/flow-admin/procinst",
    method: "post",
    data
  });
}

// 升级版本
export function upVersion(id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/migrate`,
    method: "get"
  });
}

// 终止流程
export function stopProcess(id, data) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}`,
    method: "DELETE",
    data
  });
}

// 根据id查询实例信息
export function getById(id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}`,
    method: "get"
  });
}

// 根据id查询实例流程列表
export function getByTaskList(data, id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/task`,
    method: "POST",
    data
  });
}

// 根据id查询可跳转的节点
export function getActDefs(id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/actDefs`,
    method: "GET"
  });
}

// 指定节点跳转
export function appointNode(id, data) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/jump`,
    method: "POST",
    data
  });
}

// 手动指派
export function appointUser(id, data) {
  return request({
    url: `/app/rest/flow-admin/task/${id}`,
    method: "POST",
    data
  });
}

// 完成任务
export function completeTask(id) {
  return request({
    url: `/app/rest/flow-admin/task/${id}/complete`,
    method: "POST"
  });
}

// 根据id查询实例流程列表
export function getByCandidateList(data, id) {
  return request({
    url: `/app/rest/flow-admin/task/${id}/candidate/list`,
    method: "POST",
    data
  });
}

// 删除候选人
export function deleteCandidate(id) {
  return request({
    url: `/app/rest/flow-admin/candidate/${id}`,
    method: "DELETE"
  });
}

// 添加候选人
export function addCandidate(id, data) {
  return request({
    url: `/app/rest/flow-admin/task/${id}/candidate`,
    method: "PUT",
    data
  });
}

// 查询变量列表
export function getByVariableList(data, id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/variable/list`,
    method: "POST",
    data
  });
}

// 添加变量
export function addVariable(data, id) {
  return request({
    url: `/app/rest/flow-admin/procinst/${id}/variable`,
    method: "POST",
    data
  });
}

// 删除变量
export function deleteVariable(id) {
  return request({
    url: `/app/rest/flow-admin/procvariable/${id}/delete`,
    method: "POST"
  });
}

// 修改变量
export function editVariable(data, id) {
  return request({
    url: `/app/rest/flow-admin/procvariable/${id}`,
    method: "POST",
    data
  });
}

// 启动流程
export function startProcess(data, processDefinitionKey) {
  return request({
    url: `/app/rest/flow-admin/${processDefinitionKey}/start-test`,
    method: "POST",
    data
  });
}

// 查看结果
export function viewResults(id) {
  return request({
    url: `/app/rest/flow-admin/${id}/test-result`,
    method: "GET"
  });
}