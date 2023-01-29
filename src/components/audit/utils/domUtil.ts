/**
 * 获取特定元素的计算属性
 * @param {*} obj 特定元素对象
 * @param {*} name 计算属性名
 */
export function getAttributeByName(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } 
  return getComputedStyle(obj, null)[name];
}

export default {}