import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/prm/api" : "/prm/api"

export function queryPlatformPob(data) {
    return request({
        url: `${baseUrl}/prm/rc/queryPlatformPob`,
      method: "post",
      data
    });
  }