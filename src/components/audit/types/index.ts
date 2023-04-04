export interface AuditUser {
    email?: string,
    phone?: string,
    userId: string,
    userRealName: string,
    realname: string
}

export interface NextAuditUser {
    actId: string
    users: AuditUser[]
}

export type NextAuditUsers = NextAuditUser[];

interface OutsideAuditModel {
    action: undefined | string,
    actionDisabled: boolean
}

interface EditableFormFields {
    completeEnable: boolean,
    completeRequired: boolean,
    completeVisible: boolean,
    delegateEnable: boolean,
    delegateRequired: boolean,
    delegateVisible: boolean,
    fieldName: string,
    finishProcessEnable: boolean,
    finishProcessRequired: boolean,
    finishProcessVisible: boolean,
    rejectEnable: boolean,
    rejectRequired: boolean,
    rejectVisible: boolean,
    resolveEnable: boolean,
    resolveRequired: boolean,
    resolveVisible: boolean,
    terminateProcessEnable: boolean,
    terminateProcessRequired: boolean,
    terminateProcessVisible: boolean
}

interface ExtendPropertie {
    key: string,
    value: string
}

interface AuditModel {
    attachments: string,
    bizId: string,
    editableFormFields: EditableFormFields[],
    extendProperties: ExtendPropertie[],
    flowBackToMeMode: string,
    opinion: string,
    procInstId: string,
    taskBeginDate: string,
    taskDueDate: string,
    taskId: string,
    taskName: string
}

export interface ActionAreaProps {
    businessType,
    dataSource: AuditModel,
    isView: boolean,
    successCallback: () => any,
    errorCallback: () => void,
    outsideAuditModel: OutsideAuditModel,
}

export interface ModelSchema {
    bizId: "",
    taskId: "",
    procInstId: "",
    taskName: "",
    taskBeginDate: "",
    taskDueDate: "",
    opinion: "",
    attachments: "",
    editableFormFields: EditableFormFields[],
    extendProperties: ExtendPropertie[]
}

type Action = "Complete" | "Reject" | "Delegate" | "Terminate" | "Finish" | "Claim";
export interface AuditPageInfo {
    acceptActions: Action[],
    activityName: string,
    alertDate: any,
    allowRejectActivities: any,
    applyScope: string,
    claimTime: null | string,
    dueDate: null | string,
    editableFormFields: EditableFormFields[],
    executionId: string,
    extendProperties: ExtendPropertie[],
    flowBackToMeMode: any,
    formKey: any,
    identityLinks: any,
    nextActivities: any,
    preActivities: any,
    processDefinitionId: string,
    processDefinitionKey: string,
    processInstanceId: string,
    selectCCSettings: any,
    selectDelegationSettings: any,
    startTime: string,
    success: boolean,
    taskDefinitionKey: string
}