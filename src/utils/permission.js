import store from "@/store";

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters && store.getters["user/permissions"];
    const permissionDatas = value;
    const allPermission = "*:*:*";

    const hasPermission = permissions.some(permission => allPermission === permission || permissionDatas.includes(permission));

    if (!hasPermission) {
      return false;
    }
    return true;
  }
  console.error("need roles! Like checkPermi=\"['system:user:add','system:user:edit']\"");
  return false;
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters["user/userRoles"];
    const permissionRoles = value;
    const superAdmin = "admin";

    const hasRole = roles.some(role => superAdmin === role || permissionRoles.includes(role));

    if (!hasRole) {
      return false;
    }
    return true;
  }
  console.error("need roles! Like checkRole=\"['admin','editor']\"");
  return false;
}