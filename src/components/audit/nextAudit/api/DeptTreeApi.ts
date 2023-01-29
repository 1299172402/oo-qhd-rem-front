import { getAction } from "../../process/api/manage";
/**
 * 查询部门信息
 * swOrganType:0内部，1外部
 */
export function getDeptTreeData(data) {
  return getAction("/sys/sysSwDepart/queryTreeList", data)
    .then(v => v.result);
}

export default {}