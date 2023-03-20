import Axios from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/ipm01/api" : "/ipm01/api"

export function getOilMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/effect/getOilMeasuresEffect`,
    method: "post",
    data
  });
}
export function getWaterMeasuresEffect(data) {
  return Axios({
    url: `${baseUrl}/effect/getWaterMeasuresEffect`,
    method: "post",
    data
  });
}

export function getProdLayer(data) {
  return Axios({
    url: `${baseUrl}/effect/getProdLayer`,
    method: "post",
    data
  })
}

export function getWellborePathType(){
  return Axios({
    url: `${baseUrl}/effect/getWellborePathType`,
    method: "get",
  })
}

export function getInjMethod(){
  return Axios({
    url: `${baseUrl}/effect/getInjMethod`,
    methods: "get",
  })
}

export function getBlock(ogfId){
  return Axios({
    url: `${baseUrl}/effect/getBlock?ogfId=${ogfId}`,
    methods: "get"
  })
}

