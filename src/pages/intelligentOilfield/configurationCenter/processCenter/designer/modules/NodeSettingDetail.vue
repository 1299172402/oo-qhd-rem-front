<template>
  <common-dialog
    v-model="visible"
    append-to-body
    label
    v-bind="$attrs"
    :dialog-title="(model.id ? '编辑' : '新建') + '节点规则'"
    width="80%"
    height="1"
    class="node-setting-detail"
    @ok="toValidate"
    @closed="onClosed"
  >
    <div class="node-setting-detail">
      <el-form :ref="refName" :model="model" class="form-layout form-layout--140">
        <el-divider content-position="left">
          基本信息
        </el-divider>
        <el-form-item prop="name" label="规则名称" :rules="simpleRequired">
          <el-input v-model="model.name" :clearable="true" placeholder="请输入规则名称" />
        </el-form-item>
        <el-form-item prop="priority" label="优先级" :rules="simpleRequired">
          <question-info slot="label" label="优先级" tip="flow_node_designer_priority" />
          <el-input-number
            v-model="model.priority"
            :min="0"
            :precision="0"
            :clearable="true"
            controls-position="right"
            placeholder="请输入规则名称"
          />
        </el-form-item>
        <el-form-item prop="applyScopes" label="适用范围" :rules="arrayRequired">
          <question-info slot="label" label="适用范围" tip="flow_node_designer_apply_scope" />
          <div
            v-for="(item, index) in model.applyScopes"
            :key="item.id"
            class="display-flex apply-scopes-item"
          >
            <el-form-item
              class="flex-1"
              :prop="'applyScopes.' + index + '.applyScopeId'"
              :rules="simpleRequired"
            >
              <el-select
                v-model="item.applyScopeId"
                filterable
                clearable
                placeholder="请选择适用范围"
              >
                <el-option
                  v-for="(subItem, subIndex) in applyScopesOptions"
                  :key="subIndex"
                  :label="`${subItem.name}(${subItem.id})`"
                  :value="subItem.id"
                  @click.native="item.applyScopeId = subItem.id; item.applyScopeName = subItem.name;"
                />
              </el-select>
            </el-form-item>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="model.applyScopes.splice(index, 1)"
            />
          </div>
          <el-button type="text" @click="model.applyScopes.push({})">
            添加
          </el-button>
        </el-form-item>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_assign_rule" />
          指派设置
          <el-switch v-model="model.hasAssignRule" />
        </el-divider>
        <template v-if="model.hasAssignRule">
          <el-form-item label="指派规则" class="form-layout__item-col1">
            <el-table :data="model.assignResources" border>
              <el-table-column prop="resourcePriority" label="优先级">
                <question-info slot="header" label="优先级" tip="flow_node_designer_assign_rule_priority" />
                <template slot-scope="{row, $index}">
                  <el-form-item
                    :prop="'assignResources.' + $index + '.resourcePriority'"
                    :rules="simpleRequired"
                  >
                    <el-input-number
                      v-model="row.resourcePriority"
                      :min="1"
                      controls-position="right"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="resourceType" label="类型">
                <question-info slot="header" label="类型" tip="flow_node_designer_assign_rule_resource_type" />
                <template slot-scope="{row, $index}">
                  <el-form-item
                    :prop="'assignResources.' + $index + '.resourceType'"
                    :rules="simpleRequired"
                  >
                    <el-select
                      v-model="row.resourceType"
                      filterable
                      clearable
                      placeholder="请选择类型"
                      @change="(e) => changeResourceType(e, row)"
                    >
                      <el-option
                        v-for="(subItem, subIndex) in assignResourcesTypeOptions"
                        :key="subIndex"
                        :label="subItem.name"
                        :value="subItem.code"
                        @click.native="row.resourceTypeDisplayName = subItem.name"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="resourceName" label="资源">
                <template slot-scope="{row, $index}">
                  <el-form-item
                    v-if="row.resourceType !== 'initiator'"
                    :prop="'assignResources.' + $index + '.resourceId'"
                    :rules="simpleRequired"
                  >
                    <el-select
                      v-model="row.resourceId"
                      filterable
                      clearable
                      placeholder="请选择资源"
                    >
                      <el-option
                        v-for="(subItem, subIndex) in row.resourceType === 'user' ? assignResourcesUserSelectionsOptions : assignResourcesGroupSelectionsOptions"
                        :key="subIndex"
                        :label="subItem.name"
                        :value="subItem.id"
                        @click.native="row.resourceName = subItem.name"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataScope" label="数据范围">
                <question-info slot="header" label="数据范围" tip="flow_node_designer_assign_rule_data_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-if="row.resourceType === 'group'"
                    v-model="row.dataScope"
                    filterable
                    clearable
                    placeholder="请选择数据范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in dict.type.lc_datascope"
                      :key="subIndex"
                      :label="subItem.label"
                      :value="subItem.value"
                      @click.native="row.dataScopeDisplayName = subItem.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="applyScope" label="适用范围">
                <question-info slot="header" label="适用范围" tip="flow_node_designer_assign_rule_apply_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-if="row.resourceType === 'group'"
                    v-model="row.applyScope"
                    filterable
                    clearable
                    placeholder="请选择适用范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in applyScopesOptions"
                      :key="subIndex"
                      :label="`${subItem.name}(${subItem.id})`"
                      :value="subItem.id"
                      @click.native="row.applyScopeName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="isMultiInstance" label="组内会签" width="120">
                <question-info slot="header" label="组内会签" tip="flow_node_designer_assign_rule_multiins" />
                <template slot-scope="{row}">
                  <el-checkbox v-if="row.resourceType === 'group'" v-model="row.isMultiInstance" />
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.assignResources.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="text"
              @click="model.assignResources.push({resourcePriority: 1})"
            >
              添加
            </el-button>
          </el-form-item>
          <el-form-item label="指派自定义规则" class="form-layout__item-col1">
            <question-info slot="label" label="指派自定义规则" tip="flow_node_designer_assign_rule_custom_rule" />
            <el-input
              v-model="model.customAssignData"
              type="textarea"
              :rows="5"
              :clearable="true"
              placeholder="请输入指派自定义规则"
            />
          </el-form-item>
          <el-form-item label="选人规则" class="form-layout__item-col1">
            <el-table :data="model.nextAuditSelectResources" border>
              <el-table-column prop="relativePerson" label="参照人">
                <question-info slot="header" label="参照人" tip="flow_node_designer_delegate_rule_relative" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.relativePerson"
                    filterable
                    clearable
                    placeholder="请选择参照人"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in delegationSelectResourcesPersonOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.code"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="resourceId" label="组">
                <question-info slot="header" label="组" tip="flow_node_designer_delegate_rule_group" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.resourceId"
                    filterable
                    clearable
                    placeholder="请选择组"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in assignResourcesGroupSelectionsOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.id"
                      @click.native="row.resourceName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="dataScope" label="数据范围">
                <question-info slot="header" label="数据范围" tip="flow_node_designer_delegate_rule_data_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.dataScope"
                    filterable
                    clearable
                    placeholder="请选择数据范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in dict.type.lc_datascope"
                      :key="subIndex"
                      :label="subItem.label"
                      :value="subItem.value"
                      @click.native="row.dataScopeDisplayName = subItem.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="applyScope" label="适用范围">
                <question-info slot="header" label="适用范围" tip="flow_node_designer_delegate_rule_apply_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.applyScope"
                    filterable
                    clearable
                    placeholder="请选择适用范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in applyScopesOptions"
                      :key="subIndex"
                      :label="`${subItem.name}(${subItem.id})`"
                      :value="subItem.id"
                      @click.native="row.applyScopeName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="canMultiSelect" label="多选" width="120">
                <question-info slot="header" label="多选" tip="flow_node_designer_manual_assign_rule_multiselect" />
                <template slot-scope="{row}">
                  <el-checkbox v-model="row.canMultiSelect" />
                </template>
              </el-table-column>
              <el-table-column prop="canBreakScope" label="超范围" width="120">
                <question-info slot="header" label="超范围" tip="flow_node_designer_manual_assign_rule_breakScope" />
                <template slot-scope="{row}">
                  <el-checkbox v-model="row.canBreakScope" />
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.nextAuditSelectResources.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              v-if="model.nextAuditSelectResources.length === 0"
              type="text"
              @click="model.nextAuditSelectResources.push({ relativePerson: 'Starter', canMultiSelect: false })"
            >
              添加
            </el-button>
          </el-form-item>
          <el-form-item label="选人自定义规则" class="form-layout__item-col1">
            <question-info slot="label" label="选人自定义规则" tip="flow_node_designer_assign_rule_custom_rule" />
            <el-input
              v-model="model.customSelectData"
              type="textarea"
              :rows="5"
              :clearable="true"
              placeholder="请输入选人自定义规则"
            />
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_next_audit_rule" />
          选择后续节点规则
          <el-switch v-model="model.hasAssignNextRule" />
        </el-divider>
        <el-form-item v-if="model.hasAssignNextRule" label="手选后续节点">
          <question-info slot="label" label="手选后续节点" tip="flow_node_designer_select_next_node" />
          <el-switch v-model="model.canSelectNextAct" />
        </el-form-item>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_form_rule" />
          表单规则
          <el-switch v-model="model.hasFormRule" />
        </el-divider>
        <el-form-item v-if="model.hasFormRule" label="视图组件">
          <el-input v-model="model.viewComponent" :clearable="true" placeholder="请输入视图组件" />
        </el-form-item>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_reject_rule" />
          退回设置
          <el-switch v-model="model.hasRejectRule" />
        </el-divider>
        <template v-if="model.hasRejectRule">
          <el-form-item label="退回类型">
            <el-radio-group v-model="model.rejectType">
              <el-radio
                v-for="dict in dict.type.lc_design_return_type"
                :key="dict.value"
                :label="dict.value"
              >
                {{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="model.rejectType === 'specifiedActivity'"
            prop="rejectToKey"
            label="节点key"
          >
            <el-input v-model="model.rejectToKey" clearable placeholder="请输入节点key" />
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_reject_back_rule" />
          退回返回设置
          <el-switch v-model="model.hasRejectReturnRule" />
        </el-divider>
        <el-form-item v-if="model.hasRejectReturnRule" label="退回返回类型">
          <el-radio-group v-model="model.rejectReturnType">
            <el-radio
              v-for="dict in dict.type.lc_design_return_reject_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_end_rule" />
          结束规则
          <el-switch v-model="model.hasEndRule" />
        </el-divider>
        <template v-if="model.hasEndRule">
          <el-form-item label="可直接完成流程">
            <question-info slot="label" label="可直接完成流程" tip="flow_node_designer_end_rule_finish" />
            <el-switch v-model="model.canFinish" />
          </el-form-item>
          <el-form-item label="可中止流程">
            <question-info slot="label" label="可中止流程" tip="flow_node_designer_end_rule_terminate" />
            <el-switch v-model="model.canTerminate" />
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_notify_rule" />
          告知规则
          <el-switch v-model="model.hasNotifyRule" />
        </el-divider>
        <template v-if="model.hasNotifyRule">
          <el-form-item label="可告知他人">
            <question-info slot="label" label="可告知他人" tip="flow_node_designer_notify_rule_can_notify" />
            <el-switch v-model="model.canNotify" />
          </el-form-item>
          <el-form-item label="告知节点">
            <question-info slot="label" label="告知节点" tip="flow_node_designer_notify_rule_notify_node" />
            <el-switch v-model="model.notifyActivity" />
          </el-form-item>
          <el-form-item label="告知指派规则" class="form-layout__item-col1">
            <question-info slot="label" label="告知指派规则" tip="flow_node_designer_notify_assign_rule" />
            <el-table :data="model.notifySelectResources" border>
              <el-table-column prop="relativePerson" label="参照人">
                <question-info slot="header" label="参照人" tip="flow_node_designer_notify_rule_relative" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.relativePerson"
                    filterable
                    clearable
                    placeholder="请选择参照人"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in delegationSelectResourcesPersonOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.code"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="resourceId" label="组">
                <question-info slot="header" label="组" tip="flow_node_designer_notify_rule_group" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.resourceId"
                    filterable
                    clearable
                    placeholder="请选择组"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in assignResourcesGroupSelectionsOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.id"
                      @click.native="row.resourceName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="dataScope" label="数据范围">
                <question-info slot="header" label="数据范围" tip="flow_node_designer_notify_rule_data_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.dataScope"
                    filterable
                    clearable
                    placeholder="请选择数据范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in dict.type.lc_datascope"
                      :key="subIndex"
                      :label="subItem.label"
                      :value="subItem.value"
                      @click.native="row.dataScopeDisplayName = subItem.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="applyScope" label="适用范围">
                <question-info slot="header" label="适用范围" tip="flow_node_designer_notify_rule_apply_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.applyScope"
                    filterable
                    clearable
                    placeholder="请选择适用范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in applyScopesOptions"
                      :key="subIndex"
                      :label="`${subItem.name}(${subItem.id})`"
                      :value="subItem.id"
                      @click.native="row.applyScopeName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.notifySelectResources.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              v-if="model.notifySelectResources.length === 0"
              type="text"
              @click="model.notifySelectResources.push({})"
            >
              添加
            </el-button>
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_jump_rule" />
          节点跳过规则
          <el-switch v-model="model.hasSkipRule" />
        </el-divider>
        <template v-if="model.hasSkipRule">
          <el-form-item label="无审批人跳过">
            <question-info slot="label" label="无审批人跳过" tip="flow_node_designer_jump_rule_no_audit" />
            <el-switch v-model="model.skipNoAudit" />
          </el-form-item>
          <el-form-item label="相同审批人跳过">
            <question-info slot="label" label="相同审批人跳过" tip="flow_node_designer_jump_rule_same_audit" />
            <el-switch v-model="model.skipSameAudit" />
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_delegate_rule" />
          任务委托设置
          <el-switch v-model="model.hasDelegateRule" />
        </el-divider>
        <template v-if="model.hasDelegateRule">
          <el-form-item label="可委托他人">
            <question-info slot="label" label="可委托他人" tip="flow_node_designer_delegate_rule_can_delegate" />
            <el-switch v-model="model.canDelegate" />
          </el-form-item>
          <el-form-item label="流程回到我模式">
            <question-info slot="label" label="流程回到我模式" tip="flow_node_designer_delegate_model" />
            <el-select
              v-model="model.flowBackToMeMode"
              placeholder="请选择应用分类"
              clearable
            >
              <el-option
                v-for="dict in dict.type.lc_back_to_me_mode"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="委托后节点名称">
            <question-info slot="label" label="委托后节点名称" tip="flow_node_designer_delegate_node_name" />
            <el-input v-model="model.delegateTaskName" clearable placeholder="请输入委托后节点名称" />
          </el-form-item>
          <el-form-item label="委托指派规则" class="form-layout__item-col1">
            <question-info slot="label" label="委托指派规则" tip="flow_node_designer_delegate_assign_rule" />
            <el-table :data="model.delegationSelectResources" border>
              <el-table-column prop="relativePerson" label="参照人">
                <question-info slot="header" label="参照人" tip="flow_node_designer_manual_assign_rule_relative" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.relativePerson"
                    filterable
                    clearable
                    placeholder="请选择参照人"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in delegationSelectResourcesPersonOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.code"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="resourceId" label="组">
                <question-info slot="header" label="组" tip="flow_node_designer_manual_assign_rule_group" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.resourceId"
                    filterable
                    clearable
                    placeholder="请选择组"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in assignResourcesGroupSelectionsOptions"
                      :key="subIndex"
                      :label="subItem.name"
                      :value="subItem.id"
                      @click.native="row.resourceName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="dataScope" label="数据范围">
                <question-info slot="header" label="数据范围" tip="flow_node_designer_manual_assign_rule_data_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.dataScope"
                    filterable
                    clearable
                    placeholder="请选择数据范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in dict.type.lc_datascope"
                      :key="subIndex"
                      :label="subItem.label"
                      :value="subItem.value"
                      @click.native="row.dataScopeDisplayName = subItem.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="applyScope" label="适用范围">
                <question-info slot="header" label="适用范围" tip="flow_node_designer_manual_assign_rule_apply_scope" />
                <template slot-scope="{row}">
                  <el-select
                    v-model="row.applyScope"
                    filterable
                    clearable
                    placeholder="请选择适用范围"
                  >
                    <el-option
                      v-for="(subItem, subIndex) in applyScopesOptions"
                      :key="subIndex"
                      :label="`${subItem.name}(${subItem.id})`"
                      :value="subItem.id"
                      @click.native="row.applyScopeName = subItem.name"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="canBreakScope" label="超范围" width="120">
                <question-info slot="header" label="超范围" tip="flow_node_designer_manual_assign_rule_breakScope" />
                <template slot-scope="{row}">
                  <el-checkbox v-model="row.canBreakScope" />
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.delegationSelectResources.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              v-if="model.delegationSelectResources.length === 0"
              type="text"
              @click="model.delegationSelectResources.push({canBreakScope: false})"
            >
              添加
            </el-button>
          </el-form-item>
          <el-form-item label="委托自定义规则" class="form-layout__item-col1">
            <question-info slot="label" label="委托自定义规则" tip="flow_node_designer_assign_rule_custom_rule" />
            <el-input
              v-model="model.customDelegateData"
              type="textarea"
              :rows="5"
              :clearable="true"
              placeholder="请输入委托自定义规则"
            />
          </el-form-item>
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_urge_rule" />
          任务时限设置
          <el-switch v-model="model.hasDueDate" />
        </el-divider>
        <template v-if="model.hasDueDate">
          <node-default-time style="margin-left: 140px; width: 100%;" :default-time-model="model" :need-reminder-mode="false" />
        </template>
        <el-divider content-position="left">
          <question-info tip="flow_node_designer_audit_page_rule" />
          审批页面设置
          <el-switch v-model="model.hasEditableFieldRule" />
        </el-divider>
        <template v-if="model.hasEditableFieldRule">
          <el-form-item label="可编辑字段" class="form-layout__item-col1">
            <question-info slot="label" label="可编辑字段" tip="flow_node_designer_audit_page_rule_editable_field" />
            <el-table :data="model.editableFormFields" border>
              <el-table-column prop="editableFormField" label="字段">
                <template slot-scope="{row, $index}">
                  <el-form-item
                    :prop="'editableFormFields.' + $index + '.editableFormField'"
                    :rules="simpleRequired"
                  >
                    <el-input v-model="row.editableFormField" clearable placeholder="请输入字段" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="completeRequired" label="可见">
                <question-info slot="label" label="可见" tip="flow_node_designer_audit_page_rule_optional" />
                <template slot-scope="{ row }">
                  <el-checkbox
                    v-for="(item, index) in dict.type.lc_approve_set_edit"
                    :key="index"
                    v-model="row[`${item.value}Visible`]"
                    @change="handleChangeVisible($event, row, item.value)"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="completeRequired" label="可编辑">
                <question-info slot="label" label="可编辑" tip="flow_node_designer_audit_page_rule_changeable" />
                <template slot-scope="{ row }">
                  <el-checkbox
                    v-for="(item, index) in dict.type.lc_approve_set_edit"
                    :key="index"
                    v-model="row[`${item.value}Enable`]"
                    @change="handleChangeEnable($event, row, item.value)"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="completeRequired" label="必填">
                <question-info slot="label" label="必填" tip="flow_node_designer_audit_page_rule_required" />
                <template slot-scope="{ row }">
                  <el-checkbox
                    v-for="(item, index) in dict.type.lc_approve_set_edit"
                    :key="index"
                    v-model="row[`${item.value}Required`]"
                    @change="handleChangeRequired($event, row, item.value)"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="action"
                label="操作"
                width="100"
                align="center"
              >
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.editableFormFields.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="text"
              @click="handleAddEditRule"
            >
              添加
            </el-button>
          </el-form-item>
          <el-form-item label="自定义属性" class="form-layout__item-col1">
            <question-info slot="label" label="自定义属性" tip="flow_node_designer_audit_page_rule_ext_prop" />
            <el-table :data="model.extendProperties" border>
              <el-table-column prop="key" label="键">
                <template slot-scope="{row}">
                  <el-input v-model="row.key" clearable placeholder="请输入键" />
                </template>
              </el-table-column>
              <el-table-column prop="value" label="值">
                <template slot-scope="{row}">
                  <el-input v-model="row.value" clearable placeholder="请输入值" />
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="{$index}">
                  <el-button
                    type="text"
                    @click="model.extendProperties.splice($index, 1)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="text" @click="model.extendProperties.push({})">
              添加
            </el-button>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </common-dialog>
</template>
<script>
import { cloneDeep } from "lodash";

import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import QuestionInfo from "./QuestionInfo.vue";
import NodeDefaultTime from "./NodeDefaultTime.vue";
import { dialogAutoCreateMixinWithFind } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DialogMixin.js";

import {
  ruleFindById,
  ruleSave,
  applyScopeSelections,
  resourceTypeSelections,
  userSelections,
  groupSelections,
  relativePersonSelections
} from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/designer";

import { arrayRequired, simpleRequired } from "@/utils/validate.js";

export default {
  name: "NodeSettingDetail",
  dicts: ["lc_design_return_type", "lc_design_return_reject_type", "lc_back_to_me_mode", "lc_approve_set_edit", "lc_datascope"],
  components: {
    CommonDialog,
    QuestionInfo,
    NodeDefaultTime
  },
  mixins: [dialogAutoCreateMixinWithFind],
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    modelId: {
      type: String,
      default: undefined
    },
    actKey: {
      type: String,
      default: undefined
    },
    appId: {
      type: String,
      default: undefined
    },
    modelKey: {
      type: String,
      default: undefined
    }
  },
  data() {
    const modelSchema = {
      applyScopes: [],
      assignResources: [],
      nextAuditSelectResources: [], // 选人指派规则
      canSelectNextAct: false, // 手选后续节点
      actKey: undefined,
      processKey: undefined,
      customAssignData: undefined,
      editableFormFields: [],
      extendProperties: [],
      delegationSelectResources: [],
      hasAssignRule: false,
      hasFormRule: false,
      hasEditableFieldRule: false,
      hasRejectRule: false,
      hasRejectReturnRule: false,
      hasDelegateRule: false,
      hasDueDate: false,
      hasNotifyRule: false, // 告知规则
      canNotify: false, // 可告知他人
      notifyActivity: false, // 告知节点
      notifySelectResources: [], // 告知指派规则
      hasAssignNextRule: false, // 选择后续节点规则
      canFinish: false, // 可直接完成流程
      hasSkipRule: false, // 节点跳过规则
      skipNoAudit: false, // 无审批人跳过
      skipSameAudit: false, // 相同审批人跳过
      urgeModel: { // 任务时限设置表单
        maxAlertTimes: -1, // 提醒次数
        tipMethod: [], // 提醒方式
        dueDay: 0,
        dueHours: 0,
        dueMinute: 0,
        alertDateDay: 0,
        alertDateHours: 0,
        alertDateMinute: 0,
        intervalDay: 0,
        intervalHours: 0,
        intervalMinute: 0
      },
      flowBackToMeMode: "manual",
      hasEndRule: false,
      canDelegate: true,
      name: undefined,
      priority: "0",
      rejectType: "initiator",
      rejectReturnType: "normal",
      viewComponent: undefined,
      canTerminate: false,
      rejectToKey: undefined
    };
    return {
      simpleRequired,
      arrayRequired,
      modelSchema,
      model: JSON.parse(JSON.stringify(modelSchema)),
      applyScopesOptions: [],
      assignResourcesTypeOptions: [],
      assignResourcesUserSelectionsOptions: [],
      assignResourcesGroupSelectionsOptions: [],
      assignResourcesUseScopeOptions: [],
      delegationSelectResourcesPersonOptions: [],
      fn: {
        save: data =>
          ruleSave({ ...data, processKey: data.modelKey || this.modelKey, actKey: data.actKey || this.actKey }),
        findById: ruleFindById
      }
    };
  },
  watch: {
    showDialog(val) {
      if (val) {
        this.visible = true;
      }
    }
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    /**
     * 获取下拉选项数据
     */
    getOptions() {
      // 使用范围下拉选项
      applyScopeSelections({ appId: this.appId }).then(v => {
        this.applyScopesOptions = [{ id: "ALL", name: "全部" }].concat(v.data);
      });
      // 资源类型下拉项
      resourceTypeSelections().then(v => {
        this.assignResourcesTypeOptions = v;
      });
      // 指派资源--人
      userSelections({ appId: this.appId }).then(v => {
        this.assignResourcesUserSelectionsOptions = v.data || [];
      });
      // 委托指派规则-组
      groupSelections({ appId: this.appId }).then(v => {
        this.assignResourcesGroupSelectionsOptions = v.data || [];
        this.assignResourcesGroupSelectionsOptions.push({ id: "$CUR_ACT_KEY", text: "当前节点", na: "当前节点", name: "当前节点" });
      });
      // 委托指派规则-参照人
      relativePersonSelections().then(v => {
        this.delegationSelectResourcesPersonOptions = v;
      });
    },
    /**
     * toValidate 重载，需要校验多个必填项
     */
    toValidate() {
      // 让顶部放后面，可以滚动覆盖
      return this.$refs[this.refName]
        .validate()
        .catch(() => {
          this.$message.warning("请将必填项填写完整！");
          return Promise.reject();
        })
        .then(v => {
          if (v) {
            this.handleOk();
          }
        });
    },
    /**
     * 新增审批页面设置-可编辑字段
     */
    handleAddEditRule() {
      const filed = {};
      const visible = {
        complete: true,
        reject: true,
        delegate: true,
        resolve: true,
        finishProcess: true,
        terminateProcess: true
      };
      const enable = {
        complete: true,
        reject: false,
        delegate: true,
        resolve: true,
        finishProcess: true,
        terminateProcess: false
      };
      const required = {
        complete: false,
        reject: false,
        delegate: false,
        resolve: false,
        finishProcess: false,
        terminateProcess: false
      };
      Object.keys(visible).forEach(item => {
        filed[`${item}Visible`] = visible[item];
      });
      Object.keys(enable).forEach(item => {
        filed[`${item}Enable`] = enable[item];
      });
      Object.keys(required).forEach(item => {
        filed[`${item}Required`] = required[item];
      });
      this.model.editableFormFields.push(filed);
    },
    /**
     * 可见状态修改
     * 状态为不可见时将对应可编辑和必填状态为true的值改为false
     */
    handleChangeVisible(val, row, name) {
      const enable = `${name}Enable`;
      const required = `${name}Required`;
      if (!val && row[enable]) {
        row[enable] = !row[enable];
      }
      if (!val && row[required]) {
        row[required] = !row[required];
      }
    },
    /**
     * 可编辑状态修改
     * 状态为可编辑时将对应可见状态为false的值改为true
     */
    handleChangeEnable(val, row, name) {
      const attr = `${name}Visible`;
      if (val && !row[attr]) {
        row[attr] = !row[attr];
      }
    },
    /**
     * 必填状态修改
     * 状态为必填时将对应可见和可编辑状态为false的值改为true
     */
    handleChangeRequired(val, row, name) {
      const visible = `${name}Visible`;
      const enable = `${name}Enable`;
      if (val && !row[visible]) {
        row[visible] = !row[visible];
      }
      if (val && !row[enable]) {
        row[enable] = !row[enable];
      }
    },
    /**
     * 对返回的二进制值转为数组进行展示
     */
    getFindModel(re) {
      const cloneModel = cloneDeep(re);
      if (cloneModel.urgeModel) {
        cloneModel.urgeModel.tipMethod = [];
        if (cloneModel.urgeModel.method) {
          // eslint-disable-next-line no-bitwise
          if ((cloneModel.urgeModel.method & 4) === 4) {
            cloneModel.urgeModel.tipMethod.push("sms");
          }
          // eslint-disable-next-line no-bitwise
          if ((cloneModel.urgeModel.method & 2) === 2) {
            cloneModel.urgeModel.tipMethod.push("email");
          }
          // eslint-disable-next-line no-bitwise
          if ((cloneModel.urgeModel.method & 1) === 1) {
            cloneModel.urgeModel.tipMethod.push("inSite");
          }
        }
      } else {
        cloneModel.urgeModel = { ...this.modelSchema.urgeModel };
      }
      return cloneModel;
    },
    changeResourceType: function(currentType, row) {
      if (currentType === "manualAssign") {
        this.$set(row, "resourceId", "$CUR_ACT_KEY");
        this.$set(row, "resourceName", "当前节点");
      }
    }
  }
};
</script>
<style scoped lang="less">
.node-setting-detail {
  .node-setting-detail__title {
    line-height: 30px;
  }

  .apply-scopes-item {
    & + .apply-scopes-item {
      margin-top: 10px;
    }

    > :first-child {
      margin-right: 10px;
    }
  }

  ::v-deep .el-table {
    height: fit-content !important;

    .el-form-item {
      margin-bottom: 0;
    }

    .el-table__body-wrapper {
      height: 100% !important;
    }

    .el-table__cell {
      padding: 8px 0 !important;
    }

    .el-select .el-input {
      border: none;
    }

    .el-input__inner {
      border: 1px solid var(--light-blue-color);
    }

    .is-error .el-input__inner {
      border: 1px solid #f56c6c;
    }
  }
}
</style>