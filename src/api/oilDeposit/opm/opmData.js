import Axios  from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/opm-data" : "/opm-data"

export function wellFluxLastDayHour(data){
  return Axios({
    url: `${baseUrl}/daily/wellFluxLastDayHour`,
    method: 'post',
    data
  })
}