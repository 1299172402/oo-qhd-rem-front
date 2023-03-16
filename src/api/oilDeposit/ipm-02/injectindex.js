import Axios from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/ipm02/api" : "/ipm02/api"

export function getWaterQualityIndex(data) {
  return Axios({
    url: `${baseUrl}/injectIndex/getWaterQualityIndex`,
    method: "post",
    data
  });
}
