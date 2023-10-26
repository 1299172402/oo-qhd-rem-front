<template>
  <common-dialog
    v-model="visible"
    v-bind="$attrs"
    :dialog-title="(isEdit ? '编辑' : '配置') + '租户'"
    :body-scroll="true"
    @ok="toValidate"
    @closed="handleClosed"
  >
    <div style="display: flex; justify-content: right;">
      <el-button type="text" @click="handleToPage">
        点击查看帮助
      </el-button>
    </div>
    <form-auto-create
      ref="formAutoCreate"
      :model="model"
      :items="items"
      form-class="form-layout--160 column"
      @ok="handleOk"
    />
  </common-dialog>
</template>
<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import FormAutoCreate from "@/components/intelligentOilfield/form-auto-create/FormAutoCreate.vue";
import { dialogAutoCreateMixinWithFind } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DialogMixin.js";
import { findById, saveTenantInfo, saveEditTenantInfo } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/tenant.js";
import { requiredLengthLE20 } from "@/utils/validate.js";

export default {
  name: "ProcessTenant",
  components: {
    CommonDialog,
    FormAutoCreate
  },
  mixins: [dialogAutoCreateMixinWithFind],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    tenantCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      model: {},
      tenantId: "",
      items: [
        {
          label: "租户编号：",
          prop: "id",
          disabled: true
        },
        {
          label: "名称：",
          prop: "displayName",
          required: true,
          rules: requiredLengthLE20
        },
        {
          label: "基本链接：",
          prop: "baseUri",
          placeholder: "http(s)://"
        },
        {
          label: "令牌头：",
          prop: "tokenHeader"
        },
        {
          label: "令牌：",
          prop: "token",
          type: "textarea"
        },
        {
          label: "短信催办通知模板：",
          prop: "smsUrgeTemplate",
          type: "textarea"
        },
        {
          label: "站内信催办通知模板：",
          prop: "insideUrgeTemplate",
          type: "textarea"
        },
        {
          label: "邮件催办通知模板：",
          prop: "emailUrgeTemplate",
          type: "textarea"
        },
        {
          label: "短信待办通知模板：",
          prop: "smsAssignTemplate",
          type: "textarea"
        },
        {
          label: "站内信待办通知模板：",
          prop: "insideAssignTemplate",
          type: "textarea"
        },
        {
          label: "邮件待办通知模板：",
          prop: "emailAssignTemplate",
          type: "textarea"
        },
        {
          label: "短信告知通知模板：",
          prop: "smsCCTemplate",
          type: "textarea"
        },
        {
          label: "站内信告知通知模板：",
          prop: "insideCCTemplate",
          type: "textarea"
        },
        {
          label: "邮件告知通知模板：",
          prop: "emailCCTemplate",
          type: "textarea"
        },
        {
          label: "桌面端待办任务地址：",
          prop: "auditPageUrl",
          placeholder: "http(s)://"
        },
        {
          label: "移动端待办任务地址：",
          prop: "mobileAuditPageUrl",
          placeholder: "http(s)://"
        }
      ],
      fn: {
        save: saveTenantInfo,
        findById
      }
    };
  },
  watch: {
    "$attrs.visible": function(val) {
      this.visible = val;
      if (this.visible) {
        this.handleOpenTenant();
      }
    }
  },
  methods: {
    /**
     * 查看帮助跳转
     */
    handleToPage() {
      window.open("help/tenant_setting_help.html", "_blank");
    },
    /**
     * 弹窗打开
     */
    handleOpenTenant() {
      this.$set(this.model, "id", this.tenantCode);
      if (this.isEdit) {
        this.getModel(this.tenantCode);
        this.fn.save = saveEditTenantInfo;
      }
    },
    /**
     * 关闭后刷新
     */
    handleClosed() {
      this.$emit("on-config-close");
      this.onClosed();
    },
    getFindModel(re) {
      return re;
    }
  }
};
</script>