/**
 * 向已有的 url 中添加参数
 * @param {*} url 当前 url
 * @param {*} key 参数 key
 * @param {*} value 参数值
 * @returns 返回拼接好的 url
 */
export const appendQuery = (url, key, value) => {
  if (url.includes("?")) {
    url += `&${key}=${value}`;
  } else {
    url += `?${key}=${value}`;
  }
  return url;
};

/**
 * 获取 url 上某个参数值
 * @param {*} name 参数属性
 * @param {*} url  url 值
 * @returns 特定参数的值
 */
export const getQueryString = (name, url = window.location.href) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const search = url.split("?")[1] || "";
  const r = search.match(reg) || [];
  return decodeURIComponent(r[2] || "");
};

/**
 * 将对象转为 url 上的参数形式
 * @param {*} obj 参数对象
 * @returns 字符串类型的参数
 */
export const queryObjectToUrlString = (obj) => {
  const params = [];
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    params.push(`${key}=${obj[key]}`);
  }
  return encodeURIComponent(params.join("&"));
};