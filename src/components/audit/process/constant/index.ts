import { ModelSchema } from "@/components/audit/types";
import { ActionMap } from "@/components/audit/process/auditComp/AuditPanel";

export const modelSchema: ModelSchema = {
  bizId: "",
  taskId: "",
  procInstId: "",
  taskName: "",
  taskBeginDate: "",
  taskDueDate: "",
  opinion: "",
  attachments: "",
  editableFormFields: [],
  extendProperties: []
}

interface ActionOption {
    value: keyof ActionMap,
    text: string
}

export const acceptActionsOptions: ActionOption[] = [
  {
    value: "Complete",
    text: "通过"
  },
  {
    value: "Reject",
    text: "退回"
  },
  {
    value: "Delegate",
    text: "业务流转"
  },
  {
    value: "Terminate",
    text: "驳回"
  },
  {
    value: "Finish",
    text: "办结"
  }
];

export const FLOW_AUDIT = "flow_audit";