import axios from "axios";

import proxy from "@/config/host";

const env = import.meta.env.MODE || 'development';
const FLOW_API_HOST = env === 'mock' ? '/' : proxy[env].BIZ_FLOW_API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const service = axios.create({
  baseURL: FLOW_API_HOST,
  timeout: 60000, // 请求超时时间
  withCredentials: true
});

// 编码
const enCode = (str) => {
  const code = encodeURI(str) // 进行URI编码
  const base64 = btoa(code) // 进行base64格式的编码
  return base64
}


service.interceptors.request.use(config => {
  if (config.method === "get") {
    if (config.url.indexOf("sys/dict/getDictIntems") < 0) {
      const _t = String(Date.parse(new Date().toString()) / 1000);
      config.params = {
        _t: `${_t  }_${  enCode(_t)}`,
        ...config.params
      }
    }
  }
  return config;
}, (error) => Promise.reject(error));

const responseFn = (response) => {
  if (response.config.requestOptions && response.config.requestOptions.length > 0) {
    const re = {
      data: response.data
    };
    response.config.requestOptions.forEach(v => {
      re[v] = response.headers[v];
    });
    return re;
  }
  return response.data;
}

const err = (err) => {
  console.error(err);
}

service.interceptors.response.use(responseFn, err);

export default service;
