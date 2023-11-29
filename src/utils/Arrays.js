/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as FmtUtil from "@/utils/FmtUtil";
import StrUtil from "@/utils/StrUtil";

export function has(arr, v) {
  return arr.indexOf(v) !== -1;
}

export function max(arr) {
  return Math.max.apply(null, arr);
}

export function min(arr) {
  return Math.min.apply(null, arr);
}

export function ave(arr) {
  let total = 0;
  for (const v of arr) {
    total += v;
  }
  return total / arr.length;
}

export function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function times(arr, v) {
  for (const i in arr) {
    arr[i] *= v;
  }
}

export function add(arr, v) {
  for (const i in arr) {
    arr[i] += v;
  }
}

/**
 * 数组元素格式化
 * @param arr
 */
export function ftm(arr, k, b) {
  // eslint-disable-next-line no-use-before-define
  arr = parse(arr);
  for (const i in arr) {
    FmtUtil.unitConver(arr, i, k, b);
  }
  return arr;
}

/**
 * 解析为对象
 * @param arr
 * @returns {*}
 */
export function parse(arr) {
  if (!arr) {
    return;
  }
  if (Array.isArray(arr)) {
    return arr;
  }
  if (typeof (arr) === "string") {
    if (arr.includes("NaN")) {
      arr = arr.replaceAll("NaN", null);
    }
    arr = JSON.parse(arr);
    return arr;
  }
  const keys = Object.keys(arr);
  for (const k of keys) {
    arr[k] = parse(arr[k]);
  }
  return arr;
}

/**
 * 按照名称中的数字排序
 * @param wells
 */
export function sortByNameNo(wells) {
  if (wells) {
    wells.sort((a, b) => {
      // debugger
      // eslint-disable-next-line radix
      const n1 = parseInt(StrUtil.get1stNum(a.name));
      // eslint-disable-next-line radix
      const n2 = parseInt(StrUtil.get1stNum(b.name));
      // eslint-disable-next-line no-use-before-define
      return sortASC(n1, n2);
    });
  }
}

/**
 * 增序排序判断
 * @param n1
 * @param n2
 * @returns {number}
 */
export function sortASC(n1, n2) {
  if (n1 < n2) {
    return -1;
  } if (n1 > n2) {
    return 1;
  }
  return 0;
}

/**
 * 生成一个随机颜色字符串
 * @returns {string}
 */
export function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color;
}

export function forbidKeydown() {
  document.addEventListener("keydown", event => !(
    event.keyCode === 112 || // F1
    event.keyCode === 123 || // F12
    event.ctrlKey && event.keyCode === 82 || // ctrl + R
    event.ctrlKey && event.keyCode === 78 || // ctrl + N
    event.shiftKey && event.keyCode === 121 || // shift + F10
    event.altKey && event.keyCode === 115 || // alt + F4
    event.srcElement.tagName === "A" && event.shiftKey // shift + 点击a标签
  ) || (event.returnValue = false));
}

export function forbidCopy() {
  ["contextmenu", "selectstart", "copy"]
    .forEach(ev => {
      document.addEventListener(ev, event => {
        event.returnValue = false;
      });
    });
}

export function groupBy(array, field) {
  // debugger;
  const groups = {};
  array.forEach(item => {
    const group = JSON.stringify(item[field]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.values(groups);
}