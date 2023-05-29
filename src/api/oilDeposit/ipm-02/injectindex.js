import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"

export function getWaterQualityIndex(data) {
  return Axios({
    url: `${baseUrl}/injectIndex/getWaterQualityIndex`,
    method: "post",
    data
  });
}
