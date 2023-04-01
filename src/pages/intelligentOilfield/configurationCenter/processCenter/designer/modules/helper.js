export const helperData = {
  "flow_node_designer_node_list_header": {
    content: `此行的内容格式为：节点名称|节点id 节点是否已经发布 节点是否还在模型中 节点的显示顺序\n
        节点名称：在画流程图时显示在流程图上的节点文字。
        节点id：在画流程图时推荐对每个节点都设置id，否则此处就会显示为长的Guid不易分辨。
        节点是否已经发布：如果节点添加到流程图后，还没有发布过为否，反之为是。
        节点是否在模型中：如果节点在发布后通过在线编辑器删除了为否，否则为是。
        节点的显示顺序：顺序号小的排在列表的前面，可以手工调整此顺序。`,
    width: 500
  },
  "flow_node_designer_sequence": {
    content: "编辑节点显示的先后顺序，因为流程图的结构为图，先后顺序在此可能并不满足要求，通过此处可以手工调整。",
    width: 226
  },
  "flow_node_designer_priority": {
    content: "数字越小优先级越高。优先级高的规则匹配后，优先级低的将被舍弃。",
    width: 226
  },
  "flow_node_designer_apply_scope": {
    content: `适用范围用于决定是否使用此规则，在运行时流程平台会将这里配置的每个适用范围值与发起流程接口传入的applyScopeValue参数进行比较，如果相同则使用此规则。\n
        适用范围【全部】是一个特例，当【全部】出现时此规则一定会被匹配。因此优先级为0，适用范围为全部的规则会作为默认规则。\n
        适用范围的值由业务系统提供，需要业务系统实现取适用范围接口，【全部】这个选项不需要业务系统提供。\n
        例如以公司做为适用范围，业务系统在实现取适用范围接口时将系统中的公司以列表方式返回。流程配置人员在此处可以通过选择列表中的值进行配置。发起流程时将登录人的公司作为applyScopeValue参数值。则在流程流转时发起人的公司对应的规则就会被匹配上。\n
        关于接口实现请查看更多`,
    width: 500,
    moreUrl: "help/designer_api.html"
  },
  "flow_node_designer_assign_rule": {
    content: `配置节点处理人。如果不开启此设置，在流程流转中查找指派设置时，即使此规则满足了适用范围也会继续查找下一个规则，直到找到匹配的开启了指派设置的规则。\n
        例如：某个节点有【通用规则】、【北京公司规则】、【上海公司规则】3个节点规则，指派的需求是北京公司由会计审批，其它公司由秘书处理。则上海公司的规则不需要开启此设置。在查找指派设置时虽然找到【上海公司规则】但因为没有开启指派设置，系统会继续查找匹配上【默认规则】上的秘书处理`,
    width: 500
  },
  "flow_node_designer_assign_rule_priority": {
    content: `节点配置为顺序会签时，优先级数字越小的优先审批。\n
        注：会签的配置是通过【可视化编辑器】，选中节点后可以设置会签类型为：None，并行(Parallel)，顺序(Sequential)` },
  "flow_node_designer_assign_rule_resource_type": {
    content: `发起人：流程的发起人为节点的处理人。流程的发起人是通过发起流程接口传给流程平台的。\n
        人：由业务系统实现取用户列表接口来实现，例如返回业务系统中的用户。\n
        组：由业务系统实现取组列 表接口来实现，例如返回业务系统中的角色。\n
        手工指派：配合【选择后续节点规则】来使用，在完成任务接口中通过传nextAuditInfos参数来指定节点的处理人。\n
        关于接口实现请查看更多`,
    width: 500,
    moreUrl: "help/designer_api.html"
  },
  "flow_node_designer_assign_rule_data_scope": {
    content: `这里的选项在 系统管理->字典管理 中自行维护，使用类型assign_resource_datascope，以下为参考设计，具体的取审批人的规则由业务系统实现，参考实现请查看更多。\n
        本部门（UpLevel_0_Dept）：与组配合使用，查找本部门下在指定组的人。
        本单位（UpLevel_0_Comp）：与组配合使用，查找本单位下在指定组的人。
        上1级单位（UpLevel_1_Comp）：与组配合使用，查找上1级单位下在指定组的人。\n
        这里本部门、本单位、上1级单位具体参照哪个部门或单位，需要配合适用范围（参看旁边适用范围的说明）。如果适用范围为空则使用发起人所在部门(启动流程Api时传给流程平台)或单位为参照，否则使用适用范围指定的机构为部门或单位作为参照。\n
        取审批人是需要业务系统要实现的接口，实现示例请查看更多`,
    width: 600,
    moreUrl: "help/audit_api.html"
  },
  "flow_node_designer_assign_rule_apply_scope": {
    content: `适用范围允许用户指定一个值，来改变计算审批人时的参照物，一般使用机构。\n
       例1：将适用范围指定为会计部，数据范围指定为本部门，资源指定为经理，语义为：查找会计部里有经理角色的人。
       例2：将适用范围指定为天津公司，数据范围指定为本单位，资源指定为总经理，语义为：查找天津公司这个单位里有总经理角色的人。
       例3：将适用范围指定为空，数据范围指定为本部门，资源指定为经理，语义为：查找发起人所在部门里有经理角色的人。
       例4：将适用范围指定为空，数据范围指定为本单位，资源指定为总经理，语义为：查找发起人所在单位里有总经理角色的人。
       `,
    width: 500
  },
  "flow_node_designer_assign_rule_multiins": {
    content: `仅节点配置为会签时有效，设置组内会签为是时如果运行时返回了多个人，则每个人都要审核。相反如果组内会签为否返回了多个人，则只需要一个人来认领处理。\n
       例1：节点配置为并行会签节点，配置了两条指派设置，一条是会计，一条是法务，两条的组内会签都为否且优先级不相同，在运行时返回了多个会计和多个法务，则多个会计中需要一个人来认领审批，多个法务中需要一个人来认领审批。
       例2：节点配轩为并行会签节点，配置了两条指派设置，一条是会计组内会签为是，一条是法务组内会签为否，两条优先级不相同，在运行时返回了多个会计和多个法务，则每个会计都需要审批，多个法务中只需要一个人来认领审批。`,
    width: 500
  },
  "flow_node_designer_assign_rule_custom_rule": {
    content: `根据实际业务自行定义取审批人员的规则\n
       在参考实现中使用Json的形式配置一个处理类，及处理类的参数，请查看更多。`,
    width: 500,
    moreUrl: "help/audit_api.html"
  },
  "flow_node_designer_next_audit_rule": {
    content: "允许用户选择后续节点及节点的审批人，这里的配置需要与业务系统的前端一起配合使用"
  },
  "flow_node_designer_select_next_node": {
    content: `允许用户手选后续节点，打开此选项的节点后面需要连接排它网关，排它网关后面的节点可以让用户选择一个作为下一节点。\n
        打开此选项后，需要在排它网关的每条出线上配置上条件 \${nextAct == '下一节点的id'}
        关于网关的说明，及参考实现请查看更多。`,
    width: 500,
    moreUrl: "help/select_next_node.html#select-next"
  },
  "flow_node_designer_manual_assign_rule": {
    content: "此处的设置需要与业务的前端相配合，这里为前端展示让用户选择提供选择范围。",
    width: 200
  },
  "flow_node_designer_manual_assign_rule_node": {
    content: "设置的是哪个节点的审批人",
    width: 150
  },
  "flow_node_designer_manual_assign_rule_relative": {
    content: `发起人：查找的范围以发起人所在部门为起点。
        处理人：查找的范围以处理人所在的部门为起点。`
  },
  "flow_node_designer_manual_assign_rule_group": {
    content: `选项为"流程节点设计器取组"接口返回的数据，一般使用系统的角色。可空当为空时不再按角色过滤人员。
        关于接口实现请查看更多`,
    moreUrl: "help/designer_api.html"
  },
  "flow_node_designer_manual_assign_rule_data_scope": {
    content: "与指派规则中的数据范围含义一致，使用的也是同一套字典值。配合参照人确定的起来查找同部门或同公司的人。"
  },
  "flow_node_designer_manual_assign_rule_apply_scope": {
    content: "与指派规则中的适用范围含义一致，取值也是相同的。若指定了适用范围则参数人选项失效，以适用范围为查找的起点。"
  },
  "flow_node_designer_manual_assign_rule_multiselect": {
    content: "是否允许先多个人，前端根据此值来决定使用单选还是多选控件。",
    width: 400
  },
  "flow_node_designer_manual_assign_rule_breakScope": {
    content: "配合前端使用，用户是否可以指定范围之外的人",
    width: 200
  },
  "flow_node_designer_form_rule": {
    content: "配置节点使用的页面组件信息，在流程级别也有同名属性，这里不配置时使用流程级别的配置。"
  },
  "flow_node_designer_reject_rule": {
    content: `设置流程在退回时的行为。\n
        发起节点：流程退回时退回到发起人节点。
        指定节点：选择此选项时，手工输入要退回到的节点id，流程会退回到指定id的节点。
        上一节点：流程退回时退回到上一个处理节点，流程平台会计算上一节点并执行退回。
        不可退回：当选到此项时，在获取审批页面信息的接口不会返回允许退回操作，此时业务的前端应将退回按钮隐藏。`,
    width: 500
  },
  "flow_node_designer_reject_back_rule": {
    content: `设置流程在退回时后再提交时的行为。\n
        按流程图：流程再提交时，按流程图的配置流转，此为默认行为。
        退回节点：流程再提交时，从哪个节点退回来的再返回到那个节点`
  },
  "flow_node_designer_end_rule": {
    content: "设置用户是否可手动结束流程的方式",
    width: 300
  },
  "flow_node_designer_end_rule_finish": {
    content: "直接完成流程用于将流程直接正常完成，类似于独裁的场景。设置这个选项时在获取审批页面信息接口时，AcceptActions数组中会出现\"Finish\"，根据这个值前端显示直接完成流程按钮给用户。通过调用直接完成流程接口完成流程。",
    width: 500
  },
  "flow_node_designer_end_rule_terminate": {
    content: "中止流程用于将流程作废，类似于驳回的场景。设置这个选项时在获取审批页面信息接口时，AcceptActions数组中会出现\"Terminate\"，根据这个值前端显示中止流程按钮给用户。通过调用中止流程接口中止流程。",
    width: 500
  },
  "flow_node_designer_notify_rule": {
    content: "设置流程流转到节点时，如何产生流程告知。流程告知类似于抄送通知，这与待办有本质的区别。待办需要用户去处理流程才能继续流转，而告知仅是一个通知不需要处理不会影响流程的流转。业务系统可通过流程告知接口获取告知数据。",
    width: 500
  },
  "flow_node_designer_notify_rule_can_notify": {
    content: "设置这个选项后在获取审批页面信息接口，AcceptActions数组中会出现\"Notify\"，根据这个值前端显示相应按钮给用户。如抄送按钮。"
  },
  "flow_node_designer_notify_rule_notify_node": {
    content: "当设置为告知节点时，流程流转到此节点时，不会产生待办任务而是产生流程告知。即节点会立即完成，而节点上的指派人会收到流程告知。"
  },
  "flow_node_designer_notify_assign_rule": {
    content: "此处的设置需要与业务的前端相配合，这里为前端展示让用户选择提供选择范围。"
  },
  "flow_node_designer_notify_rule_relative": {
    content: `发起人：查找的范围以发起人所在部门为起点。
        处理人：查找的范围以处理人所在的部门为起点。`
  },
  "flow_node_designer_notify_rule_group": {
    content: `选项为"流程节点设计器取组"接口返回的数据，一般使用系统的角色。可空当为空时不再按角色过滤人员。
        关于接口实现请查看更多`,
    moreUrl: "help/designer_api.html"
  },
  "flow_node_designer_notify_rule_data_scope": {
    content: "与指派规则中的数据范围含义一致，使用的也是同一套字典值。配合参照人确定的起来查找同部门或同公司的人。"
  },
  "flow_node_designer_notify_rule_apply_scope": {
    content: "与指派规则中的适用范围含义一致，取值也是相同的。若指定了适用范围则参数人选项失效，以适用范围为查找的起点。"
  },
  "flow_node_designer_jump_rule": {
    content: "设置节点在什么情况下可以自动完成，即跳过" },
  "flow_node_designer_jump_rule_no_audit": {
    content: "当节点查找不到审批人时，如果不打开这个选项流程平台会返回错误“找不到审批人”，如果打开这个选项此节点会自动完成流程继续向后流转。",
    width: 400
  },
  "flow_node_designer_jump_rule_same_audit": {
    width: 500,
    content: `当节点的处理人就是处理待办任务的人时，节点自动完成，流程继续向后流转。\n
        例如：用户完成了一个待办任务，流程平台判断待办任务对应的节点完成了会将流程流转到下一个节点，此时发现下一个节点的审批人还是这个用户，当下一个节点打开这个选项时，下一节点将自动完成，流程继续向后流转。`
  },
  "flow_node_designer_delegate_rule": {
    content: `设置用户是否可以将待办任务转给他人。此功能需要业务系统配合，业务系统在前端给用户提供选择用户的组件，再调用流程委托接口将任务委托给选择的人。\n
        委托接口支持流程程是否回到我功能：
          如果用户选择了流程回到我，委托人不能通过或退回流程只能将任务还给回给用户。即委托人处理完，用户再处理。
          如果用户不选择流程回到我，委托人可全权处理待办任务。即委托人处理完，用户不需再处理。`,
    width: 650
  },
  "flow_node_designer_delegate_rule_can_delegate": {
    content: "设置这个选项后在获取审批页面信息接口，AcceptActions数组中会出现\"Delegate\"，根据这个值前端显示相应按钮给用户，如加签按钮。",
    width: 400
  },
  "flow_node_designer_delegate_assign_rule": {
    content: "此处的设置需要与业务的前端相配合，这里为前端展示让用户选择提供选择范围。"
  },
  "flow_node_designer_delegate_rule_relative": {
    content: `发起人：查找的范围以发起人所在部门为起点。
        处理人：查找的范围以处理人所在的部门为起点。`
  },
  "flow_node_designer_delegate_rule_group": {
    content: `选项为"流程节点设计器取组"接口返回的数据，一般使用系统的角色。可空当为空时不再按角色过滤人员。
        关于接口实现请查看更多`,
    moreUrl: "help/designer_api.html"
  },
  "flow_node_designer_delegate_rule_data_scope": {
    content: "与指派规则中的数据范围含义一致，使用的也是同一套字典值。配合参照人确定的起来查找同部门或同公司的人。"
  },
  "flow_node_designer_delegate_rule_apply_scope": {
    content: "与指派规则中的适用范围含义一致，取值也是相同的。若指定了适用范围则参数人选项失效，以适用范围为查找的起点。"
  },
  "flow_node_designer_delegate_model": {
    content: "设置委托后的返回模式，用户选择表示在页面上让用户选择委托后流程是否还回到我。如果委托时选中流程回到我的被委托人只能将流程返回到我，不可做其他操作。",
    width: 500 },
  "flow_node_designer_delegate_node_name": {
    content: "设置委托后的节点名称，配合流程回到我，可以做到委托出去后节点名称变化，回到我后节点名称再变回来"
  },
  "flow_node_designer_urge_rule": {
    content: "设置催办的时间频率方式等",
    width: 200
  },
  "flow_node_designer_urge_rule_due": {
    content: "从收到待办开始计算，多久后待办任务超期。",
    width: 200
  },
  "flow_node_designer_urge_rule_before": {
    content: "在待办任务超期前多久催办。",
    width: 200
  },
  "flow_node_designer_urge_rule_interval": {
    content: "首次催办后隔多久再次催办。",
    width: 200
  },
  "flow_node_designer_urge_rule_method": {
    content: "催办方式，可复选",
    width: 200
  },
  "flow_node_designer_urge_rule_times": {
    content: "最多提醒多少次，-1为不限制",
    width: 200
  },
  "flow_node_designer_audit_page_rule": {
    content: "设置审批页面表单的设置",
    width: 200
  },
  "flow_node_designer_audit_page_rule_editable_field": {
    content: "在流转中，一些节点需要处理人录入数据，在这里配置节点可以录入的数据字段。这里配置的数据可以在获取审批页面信息接口获取到，前后端都可以通过这些设置对数据进行保存操作。",
    width: 500
  },
  "flow_node_designer_audit_page_rule_required": {
    content: "设置用户在执行相应操作时字段是否必填。如用户在完成任务时字段是否必填。"
  },
  "flow_node_designer_audit_page_rule_optional": {
    content: "设置用户在执行相应操作时字段是否可见。如用户在完成任务时字段是否可见。"
  },
  "flow_node_designer_audit_page_rule_changeable": {
    content: "设置用户在执行相应操作时字段是否可编辑。如用户在完成任务时字段是否可编辑。"
  },
  "flow_node_designer_audit_page_rule_ext_prop": {
    content: "扩展属性不同于可编辑表单项，是KV格式的数据，在此处可以定义很多节点上业务的属性，如是否需要电子签章等。这里配置的数据可以在获取审批页面信息接口获取到，前后端都可以通过这些设置进行特殊的业务逻辑处理。",
    width: 500
  },
  "flow_add_edit_model_key": {
    content: "一个租户下唯一，不推荐使用中文，长度不能大于20个字符。",
    width: 200
  },
  "flow_add_edit_tags": {
    content: `这里的选项在 系统管理->字典管理 中自行维护，使用类型lc_design_tag。\n
        在模型列表页左侧列出的就是流程标签，可以通过流程标签进行过滤查询。在获取待办任务接口中也可以通过流程标签过滤查询。`,
    width: 400
  },
  "flow_add_edit_finish_call_back": {
    content: `流程正常完成时是否回调业务系统通知流程正常完成，\n
        需要业务系统实现流程完成。参考实现查看更多`,
    moreUrl: "help/audit_api.html",
    width: 400
  },
  "flow_add_edit_finish_call_back_class": {
    content: "在流程正常完成回调时回传给业务系统，参考实现查看更多",
    moreUrl: "help/audit_api.html#completeCallback",
    width: 400
  },
  "flow_add_edit_view_component": {
    content: "节点审批页面的组件，此处配置的为流程级别的设置，可以在节点设计器针对某个节点覆盖此处的设置。",
    moreUrl: "help/audit_api.html#completeCallback",
    width: 400
  },
  "flow_add_edit_urge_rule": {
    content: "设置催办的时间频率方式等，此处配置的为流程级别的设置，可以在节点设计器针对某个节点覆盖此处的设置。",
    width: 200
  },
  "flow_add_edit_assign_task_alert": {
    content: "待办任务是否开启提醒，设提醒方式，可复选。",
    width: 200
  },
  "flow_add_edit_notify_alert": {
    content: "流程告知是否开启提醒，设提醒方式，可复选。在节点设计器中有流程告知相关的设置，流程平台的接口中有流程告知的相关接口。",
    width: 200
  }
};