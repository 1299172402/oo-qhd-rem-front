
const windowPrefixes = ["webkit", "moz", "ms", "o"];

export function getHiddenProp() {
  // 如果 hidden 属性是原生支持的，直接返回
  if ("hidden" in document) {
    return "hidden";
  }
  // 其他的情况就循环现有的浏览器前缀，拼接我们所需要的属性
  for (let i = 0; i < windowPrefixes.length; i++) {
    // 如果当前的拼接的前缀在 document对象中存在 返回即可
    if ((`${windowPrefixes[i]}Hidden`) in document) {
      return `${windowPrefixes[i]}Hidden`;
    }
  }
  // 其他的情况 直接返回null
  return null;
}
export function getVisibilityState() {
  if ("visibilityState" in document) {
    return "visibilityState";
  }
  for (let i = 0; i < windowPrefixes.length; i++) {
    if ((`${windowPrefixes[i]}VisibilityState`) in document) {
      return `${windowPrefixes[i]}VisibilityState`;
    }
  }
  // 找不到返回 null
  return null;
}

export function getEvtname(visibleProp = getHiddenProp()) {
  return `${visibleProp.replace(/[H|h]idden/, "")}visibilitychange`;
}