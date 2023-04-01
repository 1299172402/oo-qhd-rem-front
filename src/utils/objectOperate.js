/**
 * 将对象中值为null的属性删掉
 * @param {*} src 目标对象
 */
function cloneObjectDeleteNull(src) {
  let Result = src;
  switch (Object.prototype.toString.call(src)) {
    case "[object Array]":
    // eslint-disable-next-line no-case-declarations
      const temp = [];
      // eslint-disable-next-line no-case-declarations
      let i = 0;
      src.forEach(a => {
      // 使用push方法会让数组所有元素的类型变成undfined
      // eslint-disable-next-line no-plusplus
        temp[i++] = cloneObjectDeleteNull(a);
      });
      i = 0;
      Result = temp;
      break;
    case "[object Object]":
    // eslint-disable-next-line no-case-declarations
      const keys = Object.keys(src);
      // keys 为对象src的键名字数组
      keys.forEach(a => {
      // 将值为null或数组为[]的属性删掉
      // eslint-disable-next-line no-prototype-builtins
        if (!src[a] || Array.prototype.isPrototypeOf(src[a]) && src[a].length === 0) {
          delete src[a];
        } else {
          src[a] = cloneObjectDeleteNull(src[a]);
        }
      });
      Result = src;
      break;
    default:
      break;
  }
  return Result;
}
/**
 * 删掉目标对象中值为null的属性
 * @param {object} model 操作的对象
 */
export function deleteNullAttribute(model) {
  return cloneObjectDeleteNull(model);
}
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj === "object")) {
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && !obj[key] && obj[key] !== 0) {
      delete obj[key];
    }
  }
  return obj;
}

/**
 * 深度展开数组，得到对象
 */
export function flattenDeep(arr, childrenProp, key = "", value = "", object = null) {
  if (object) {
    arr.forEach(item => {
      if (item[key]) {
        object[item[key]] = item[value];
      }
      if (item[childrenProp]) {
        flattenDeep(item[childrenProp], childrenProp, key, value, object);
      }
    });
  }
}