import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"
const masterUrl = process.env.NODE_ENV == "production" ? "/masterService/api" : "/masterService/api"
// http://10.77.78.243:8003/primaryInfo/fetchPlatforms

export function fetchPlatforms(data) {
  return request({
    url: `${masterUrl}/primaryInfo/fetchPlatforms`,
    method: "post",
    data
  });
}

