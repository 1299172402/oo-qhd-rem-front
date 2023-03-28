import { getAction } from "@/api/common/manage";
/**
 * 查询部门信息
 * swOrganType:0内部，1外部
 */
export function getDeptTreeData(status = "0") {
  return getAction(`/system/dept/treeselect?status=${status}`)
    .then(v => v.data.data);
}

export default {};