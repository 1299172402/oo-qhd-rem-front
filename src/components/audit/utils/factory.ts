import {
  AuditUser,
  NextAuditUser
} from "@/components/audit/types";

export function buildInfos(newVal, needOutsideAuditModel: boolean) {
  const target = {
    title: "",
    // 流程id
    processId: "",
    // 检查id
    id: "",
    acceptActions: [],
    editableFormFields: [],
    businessType: "",
    activityName: "",
    model: {},
    outsideAuditModel: null
  };
  if (typeof needOutsideAuditModel === "object") {
    target.outsideAuditModel = needOutsideAuditModel;
  } else if (needOutsideAuditModel) {
    target.outsideAuditModel = {
      action: undefined,
      actionDisabled: false
    };
  }

  return Object.assign(target, newVal);
}
interface Setting {
    actId: string
}

export function buildNextAuditInfos(userArray: AuditUser[], setting: Setting): NextAuditUser {
  const auditor = {
    actId: setting && setting.actId,
    users: []
  };
  userArray.forEach(item => {
    auditor.users.push({
      userId: item.userId,
      userRealName: item.realname || item.userRealName,
      email: item.email || "",
      phone: item.phone || ""
    });
  });
  return auditor;
}