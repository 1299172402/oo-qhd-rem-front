/**
 * responseWhitelist
 * 请求中的响应数据的白名单, responseMap时存放白名单识别符Url以及Callback.
 */
const responseMap = new Map();

const cutUrl = (responseConfig) => responseConfig.url.split(responseConfig.baseURL)[1];

/**
 * 查询请求的URL是否在Map中,若在其中调用存储的Callback
 * @param response
 * @returns {*}
 */
const responseCallback = (response) => {
  if (responseMap.size) {
    const {config} = response;
    if (responseMap.has(cutUrl(config))) {
      const callback = responseMap.get(cutUrl(config));
      return callback(response);
    } 
    return response.data;
    
  } 
  return response.data;
  
};

/**
 * 注册
 * @param key URL
 * @param callback 入参为response, 需要有返回值
 */
const use = (key, callback) => {
  if (key && callback) {
    responseMap.set(key, callback);
  }
};

/**
 * 移除
 * @param key URL
 */
const clear = (key) => {
  responseMap.delete(key);
};

/**
 * 移除全部
 */
const clearAll = () => {
  responseMap.clear();
};

const responseWhitelist = {
  use,
  clear,
  clearAll
};
export {
  responseCallback as whitelistCallback,
  responseWhitelist
};
