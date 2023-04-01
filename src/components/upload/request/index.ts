import axios from "axios";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
const API_HOST = env === "mock" ? "/" : proxy[env].PREVIEW_FILE_API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const service = axios.create({
  baseURL: API_HOST,
  timeout: 60000,
  withCredentials: true
});

service.interceptors.request.use(config => config, error => Promise.reject(error));

const err = () => {};

service.interceptors.response.use(response => response.data, err);

export {
  service as axios
};

export default {};