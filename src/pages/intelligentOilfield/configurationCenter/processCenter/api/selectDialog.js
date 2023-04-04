import request from ".";

// 获取下拉选项数据
export function getOptions(url, method = "get", data) {
  return request({
    url,
    method,
    data
  });
}