import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm/api" : "/ipm/api"
export function getIsoline() {
  return Axios({
    url: `${baseUrl}/WellBorePipe/getIsoline`,
    method: "get",
  });
}
