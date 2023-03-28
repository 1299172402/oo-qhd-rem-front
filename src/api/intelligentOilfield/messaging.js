import request from "@/utils/request";

// 查询消息日志列表
export function listMessage(data) {
  return request({
    url: "/message-service/management/logging/paginate",
    method: "post",
    data
  });
}

// 失败邮件类消息重试
export function reSendMail(exposeKey) {
  return request({
    url: `/message-service/message/mail/send/${exposeKey}`,
    method: "post"
  });
}

// 失败短信类消息重试
export function reSendSms(exposeKey) {
  return request({
    url: `/message-service/message/sms/send/${exposeKey}`,
    method: "post"
  });
}

// 获取邮件数据
export function getMailData(messageId) {
  return request({
    url: `/message-service/management/logging/mail/${messageId}`,
    method: "get"
  });
}

// 获取短信数据
export function getSmsData(messageId) {
  return request({
    url: `/message-service/management/logging/sms/${messageId}`,
    method: "get"
  });
}

// 获取日志数据
export function getLogData(messageId) {
  return request({
    url: `/message-service/management/logging/${messageId}`,
    method: "get"
  });
}

// 获取错误日志
export function getErrorLogData(messageId) {
  return request({
    url: `/message-service/management/logging/errors/${messageId}`,
    method: "get"
  });
}

// 查询配置列表
export function listConfig(data) {
  return request({
    url: "/message-service/management/binding/paginate",
    method: "post",
    data
  });
}

// 获取配置数据
export function getConfig(bindingId) {
  return request({
    url: `/message-service/management/binding/${bindingId}`,
    method: "get"
  });
}

// 删除配置数据
export function delConfig(bindingId) {
  return request({
    url: `/message-service/management/binding/unbind/${bindingId}`,
    method: "post"
  });
}

// 保存消息配置
export function saveConfig(data) {
  return request({
    url: "/message-service/management/binding/bind",
    method: "post",
    data
  });
}
// 查询租户列表信息
export function listTenant(query) {
  return request({
    url: "/system/tenant/list",
    method: "get",
    params: query
  });
}

// 消息主题导出
export function themeExport(data) {
  return request({
    url: "/message-service/management/binding/export",
    method: "post",
    data,
    responseType: "blob"
  }) 
}

// 消息日志导出
export function logExport(data) {
  return request({
    url: "/message-service/management/logging/export",
    method: "post",
    data,
    responseType: "blob"
  }) 
}