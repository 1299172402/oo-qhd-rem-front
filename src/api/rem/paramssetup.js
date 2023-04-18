import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function parameterSetting() {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/parameterSetting`,
    method: "get",
  });
}
