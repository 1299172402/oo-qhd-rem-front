<template>
  <common-dialog
    v-model="visible"
    :loading="loading"
    v-bind="$attrs"
    dialog-title="启动测试流程"
    @ok="toValidate"
  >
    <form-auto-create
      ref="formAutoCreate"
      :model="form"
      :items="items"
      form-class="column"
      @ok="handleClose"
    />
  </common-dialog>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import FormAutoCreate from "@/components/intelligentOilfield/form-auto-create/FormAutoCreate.vue";

import { dialogAutoCreateMixinWithFind } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DialogMixin.js";
import { DictArrayAddOptionsMixin } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DictArrayAddOptions.js";
import { startProcess } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/instanceList.js";

export default {
  name: "StartDialog",
  components: {
    CommonDialog, FormAutoCreate
  },
  mixins: [dialogAutoCreateMixinWithFind, DictArrayAddOptionsMixin],
  dicts: ["lc_design_complete_callback"],
  data() {
    return {
      form: {
        processDefinitionKey: undefined,
        businessKey: undefined,
        businessName: undefined,
        startUserId: undefined,
        startUserName: undefined,
        applyScopeValue: undefined,
        auditUserSearchCallBackData: undefined,
        completeFirstAct: "false",
        variablesProp: "{}",
        autoComplete: "true"
      },
      items: [
        {
          label: "流程定义Key",
          prop: "processDefinitionKey",
          required: true
        },
        {
          label: "业务主键",
          prop: "businessKey",
          required: true
        },
        {
          label: "业务名称",
          prop: "businessName",
          required: true
        },
        {
          label: "流程发起人Id",
          prop: "startUserId",
          required: true
        },
        {
          label: "流程发起人姓名",
          prop: "startUserName",
          required: true
        },
        {
          label: "适用范围值",
          prop: "applyScopeValue",
          required: true
        },
        {
          label: "取节点审批人回调数据",
          prop: "auditUserSearchCallBackData",
          required: true
        },
        {
          label: "自动完成第一个节点",
          prop: "completeFirstAct",
          type: "radio",
          dict: "lc_design_complete_callback",
          options: []
        },
        {
          label: "流程变量",
          prop: "variablesProp",
          type: "textarea",
          required: true
        },
        {
          label: "自动完成模拟流程",
          prop: "autoComplete",
          type: "radio",
          dict: "lc_design_complete_callback",
          options: []
        }
      ],
      loading: false
    };
  },
  methods: {
    handleClose() {
      try {
        this.form.variables = JSON.parse(this.form.variablesProp);
        startProcess(this.form, this.form.processDefinitionKey)
          .then(() => {
            this.$message.success("启动成功！");
            this.$emit("ok");
          }).catch(() => {
            this.$message.error("启动失败！");
          }).finally(() => {
            this.visible = false;
          });
      } catch (error) {
        this.$message.error("流程变量格式不正确,请重新输入！");
      }
    }
  }
};
</script>

<style>

</style>