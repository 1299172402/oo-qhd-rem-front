<template>
  <common-dialog
    v-model="visible"
    v-bind="$attrs"
    width="60%"
    height="1"
    :dialog-title="(model.id ? '编辑' : '新建') + '流程模型'"
    @ok="toValidate"
    @closed="onClosed"
    v-on="$listeners"
  >
    <form-auto-create
      ref="formAutoCreate"
      :model="model"
      :items="items"
      label-width="160px"
      form-class="form-layout--160 column"
      @ok="handleOk"
    >
      <question-info
        slot="label"
        slot-scope="{item}"
        :label="item.label"
        :tip="item.tip"
      />
      <template slot="timeSet">
        <div class="time-set">
          <legend class="legend-title form-label--color container-box--background">
            <question-info tip="flow_add_edit_urge_rule" />
            节点默认时限设置
          </legend>
          <node-default-time class="node-default-time" :default-time-model="model" />
        </div>
      </template>
      <template #appSelect="{ item }">
        <el-form-item
          :label="item.label"
          :name="item.prop"
          :prop="item.required ? item.prop : ''"
          :rules="item.required ? item.rules: []"
        >
          <el-select
            v-model="model[item.prop]"
            :placeholder="item.placeholder || ('请选择' + item.label)"
          >
            <el-option
              v-for="subItem in item.options"
              :key="subItem.value"
              :label="subItem.appName"
              :value="subItem.appId"
            />
          </el-select>
        </el-form-item>
      </template>
    </form-auto-create>
  </common-dialog>
</template>
<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-bitwise */
import { cloneDeep } from "lodash";

import QuestionInfo from "@/pages/intelligentOilfield/configurationCenter/processCenter/designer/modules/QuestionInfo.vue";
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import FormAutoCreate from "@/components/intelligentOilfield/form-auto-create/FormAutoCreate.vue";
import NodeDefaultTime from "./NodeDefaultTime.vue";
import { dialogAutoCreateMixinWithFind } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DialogMixin.js";
import { DictArrayAddOptionsMixin } from "@/pages/intelligentOilfield/configurationCenter/processCenter/DictArrayAddOptions.js";

import { findById, saveDesignInfo } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/designer";
import { getInfoByCode } from "@/api/intelligentOilfield/system/applicationCenter/tenant.js";
import { requiredLengthLE20 } from "@/utils/validate.js";

export default {
  name: "ProcessInfo",
  components: {
    CommonDialog,
    FormAutoCreate,
    QuestionInfo,
    NodeDefaultTime
  },
  dicts: ["lc_design_tag", "lc_design_complete_callback"],
  mixins: [dialogAutoCreateMixinWithFind, DictArrayAddOptionsMixin],
  props: {
    renovate: {
      type: Boolean,
      default: false
    },
    processCenterInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const modelSchema = {
      assignAlertMethod: 0,
      ccAlertMethod: 0,
      modelType: "0",
      processCompleteCallback: "false",
      cbxAssignAlertMethod: [], // 待办提醒方式
      cbxCcAlertMethod: [], // 告知提醒方式
      urgeModel: {
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
      }
    };
    return {
      modelSchema,
      model: JSON.parse(JSON.stringify(modelSchema)),
      queryParams: {
        pageNum: 1,
        pageSize: 30
      },
      items: [
        {
          label: "模型名称",
          prop: "name",
          required: true
        },
        {
          label: "模型key",
          prop: "key",
          required: true,
          rules: requiredLengthLE20("模型key"),
          tip: "flow_add_edit_model_key"
        },
        {
          label: "描述",
          prop: "description",
          type: "textarea"
        },
        {
          label: "应用",
          prop: "appId",
          itemSlot: "appSelect",
          required: true,
          rules: [{ required: true, message: "应用必填", trigger: ["change"] }],
          options: []
        },
        {
          label: "标签",
          prop: "tags",
          type: "select",
          multiple: true,
          tip: "flow_add_edit_tags",
          dict: "lc_design_tag",
          options: []
        },
        {
          label: "完成是否回调",
          prop: "processCompleteCallback",
          type: "radio",
          tip: "flow_add_edit_finish_call_back",
          dict: "lc_design_complete_callback",
          options: []
        },
        {
          label: "流程结束回调处理类",
          prop: "processCompleteCallbackClass",
          tip: "flow_add_edit_finish_call_back_class"
        },
        {
          label: "节点默认视图组件",
          prop: "defaultActViewComponent",
          tip: "flow_add_edit_view_component"
        },
        {
          itemSlot: "timeSet"
        }
      ],
      fn: {
        save: saveDesignInfo,
        findById
      }
    };
  },
  watch: {
    renovate: {
      handler(val) {
        this.visible = val;
      }
    },
    visible: {
      handler(val) {
        if (val) {
          this.getAppList();
        }
      }
    }
  },
  methods: {
    getSaveModel() {
      return {
        ...this.model,
        "tags[0]": this.model?.tags?.[0] || ""
      };
    },
    /**
     * 对返回的二进制值转为数组进行展示
     */
    getFindModel(re) {
      const cloneModel = cloneDeep(re);
      cloneModel.cbxAssignAlertMethod = [];
      cloneModel.cbxCcAlertMethod = [];
      cloneModel.urgeModel.tipMethod = [];
      const obj = {
        cbxAssignAlertMethod: "assignAlertMethod",
        cbxCcAlertMethod: "ccAlertMethod"
      };
      for (const key in obj) {
        if ((re[obj[key]] & 4) === 4) {
          cloneModel[key].push("sms");
        }
        if ((re[obj[key]] & 2) === 2) {
          cloneModel[key].push("email");
        }
        if ((re[obj[key]] & 1) === 1) {
          cloneModel[key].push("inSite");
        }
      }
      if (cloneModel.urgeModel.method) {
        if ((cloneModel.urgeModel.method & 4) === 4) {
          cloneModel.urgeModel.tipMethod.push("sms");
        }
        if ((cloneModel.urgeModel.method & 2) === 2) {
          cloneModel.urgeModel.tipMethod.push("email");
        }
        if ((cloneModel.urgeModel.method & 1) === 1) {
          cloneModel.urgeModel.tipMethod.push("inSite");
        }
      }
      cloneModel.processCompleteCallback = String(cloneModel.processCompleteCallback);
      return cloneModel;
    },
    getAppList() {
      this.$router.push({
        query: { identify: this.processCenterInfo.tenantCode || this.processCenterInfo.appId }
      });
      if (this.processCenterInfo.tenantCode) {
        // 有租户 code 时根据租户 code 查询有权限的应用
        getInfoByCode(this.processCenterInfo.tenantCode).then(res => {
          const index = this.items.findIndex(item => item.prop === "appId");
          this.items[index].options = res.data.data.appList || [];
        });
      }
    }
  }
};
</script>
<style scoped lang="less">
div.time-set {
  position: relative;
  display: flex;

  legend.legend-title {
    box-sizing: border-box;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 12px 0 0;
    width: 160px;
    text-align: end;
  }

  .node-default-time {
    width: calc(100% - 160px);

    /deep/ .el-card {
      border: none;
      box-shadow: none;

      .el-card__body {
        padding: 0;

        .remind-count {
          width: auto !important;
        }
      }
    }
  }
}
</style>