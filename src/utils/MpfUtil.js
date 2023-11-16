/* eslint-disable no-use-before-define */
/**
 * 计算偏差值
 * @param x0
 * @param x1
 */
export function e(x0, x1) {
  return x1 - x0;
}

/**
 * 计算相对偏差
 * @param x0
 * @param x1
 */
export function er(x0, x1) {
  if (!x0) {
    return 0;
  }
  return percent(e(x0, x1), x0);
}

/**
 * 计算百分比
 * @param top
 * @param bottom
 */
export function percent(top, bottom) {
  if (!bottom) {
    return 0;
  }
  return top / bottom * 100;
}

export function area(d) {
  return 0.25 * Math.PI * d * d;
}