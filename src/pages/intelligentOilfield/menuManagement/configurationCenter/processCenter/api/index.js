import request from "@/utils/request";
import proxy from "@/config/host";
import route from "@/router/index";
import JSEncrypt from "jsencrypt/bin/jsencrypt";

const env = import.meta.env.MODE || "development";

export const baseURL = proxy[env].processAPI;
// 加密
const encryptor = new JSEncrypt();
// 设置公钥
encryptor.setPublicKey(proxy[env].PROCESS_PULBIC_KEY);

// 统一拦截流程平台的接口替换前缀
export default function axios(args) {
  // 时间戳
  const date = new Date().getTime();
  // 租户ID或者应用ID
  const ftId = route.app && route.app._route.query.identify;
  return request({
    baseURL,
    ...args,
    headers: {
      FtId: ftId ? encryptor.encrypt(`${ftId},${date}`) : encryptor.encrypt(`admin,${date}`)
    }
  });
}