import request from "@/utils/request";

// 查询文件上传配置列表
export function list(query) {
  return request({
    url: "/system/upload/config/paginate",
    method: "get",
    params: query
  });
}

// 查询文件上传配置详细
export function findById(id) {
  return request({
    url: `system/upload/config/${id}`,
    method: "get"
  });
}

// 删除文件上传配置
export function delConfig(id) {
  return request({
    url: `system/upload/config/${id}`,
    method: "delete"
  });
}

// 保存文件上传配置
export function save(data) {
  return request({
    url: "system/upload/config",
    method: "put",
    data
  });
}