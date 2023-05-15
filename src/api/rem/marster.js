import request from '@/utils/request'
const masterUrl = process.env.NODE_ENV == "production" ? "/omc003d" : "/omc003d"
// http://10.77.78.243:8003/primaryInfo/fetchPlatforms

export function fetchPlatforms(data) {
  return request({
    url: `${masterUrl}/fetchPlatforms`,
    method: "post",
    data
  });
}
export function queryOgfReg(data) {
    return request({
      url: `${masterUrl}/queryOgfReg`,
      method: "post",
      data
    });
  }
  export function queryOperatingCompanyDetail(data) {
    return request({
      url: `${masterUrl}/queryOperatingCompanyDetail`,
      method: "post",
      data
    });
  }
  export function queryListOfOilfieldQueryPlatformsDetail(data) {
    return request({
      url: `${masterUrl}/queryListOfOilfieldQueryPlatformsDetail`,
      method: "post",
      data
    });
  }

  export function queryPlatformQueryWellListDetail(data) {
    return request({
      url: `${masterUrl}/queryPlatformQueryWellListDetail`,
      method: "post",
      data
    });
  }
  export function queryOilAndGasFieldQueryPositionDetail(data) {
    return request({
      url: `${masterUrl}/queryOilAndGasFieldQueryPositionDetail`,
      method: "post",
      data
    });
  }
  export function queryOperatorsCheckFieldListsDetail(data) {
    return request({
      url: `${masterUrl}/queryOperatorsCheckFieldListsDetail`,
      method: "post",
      data
    });
  }
  export function getYczcTree(data) {
    return request({
      url: `${masterUrl}/getYczcTree`,
      method: "post",
      data
    });
  }
  // export function queryPlatformQueryWellListDetail(data) {
  //   return request({
  //     url: `${masterUrl}/queryPlatformQueryWellListDetail`,
  //     method: "post",
  //     data
  //   });
  // }
  

