import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function waterAbsorptionCapacityForecast(data) {
  return request({
    url: `${baseUrl}/injectAssessAnalyse/waterAbsorptionCapacityForecast`,
    method: "post",
    data
  });
}
