<!-- 后台——消息主题表单页 -->
<template>
  <common-dialog
    v-model="visible"
    :dialog-title="`${type[action]}消息主题`"
    label=""
    height="1"
    :view-only="isView"
    @ok="save"
    @close="() => { $refs.form.resetFields(); }"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="isView"
      class="form-layout"
      label-width="200px"
    >
      <el-form-item label="主题名称：" prop="title">
        <el-input v-model="form.title" :title="form.title" placeholder="请输入主题名称" />
      </el-form-item>
      <el-form-item label="触达类型：" prop="triggerType">
        <el-radio-group v-model="form.triggerType" :disabled="!!formId" @change="handleTriggerType">
          <el-radio v-for="item in options.triggerTypes" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="userTrigger" label="消息类型：" prop="messageType">
        <el-radio-group v-model="form.messageType">
          <el-radio
            v-for="item in options.userMessageTypes"
            :key="item.value"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 服务触达显示绑定应用 -->
      <el-form-item
        v-else
        label="绑定应用："
        prop="appId"
        class="form-layout__item-col1"
      >
        <el-radio-group v-model="form.appId" @input="changeApp">
          <el-radio
            v-for="item in appList"
            :key="item.appId"
            :label="item.appId"
            :title="item.appName"
            class="radio-type"
          >
            {{ item.appName }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.requestType && !userTrigger" label="应用类型：">
        {{ form.requestType === "INNER" ? "内部应用" : "外部应用" }}
      </el-form-item>
      <el-form-item label="消息接收处理API地址：" class="is-required">
        <template #label>
          <question-info tip="message_config_form_api" />消息接收处理API地址：
        </template>
        <div style="display: flex;">
          <el-form-item prop="exposeUri" style="flex: 1;">
            <el-input v-model="form.exposeUri" :title="form.exposeUri" placeholder="http://xxxxx/api/message/" />
          </el-form-item>
          <el-form-item prop="exposeKey" style="flex: 1; margin-left: 10px;">
            <el-input v-model="form.exposeKey" :title="form.exposeKey" placeholder="输入接收id" />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="运行状态：" class="is-required">
        <el-radio-group v-model="form.active">
          <el-radio v-for="dict in dict.type.sys_active_type" :key="dict.value" :label="dict.value">
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="租户使用授权：" prop="grantedTenants">
        <el-button
          v-if="!isView"
          type="primary"
          style="float: right;"
          @click="handleTenant"
        >
          选择租户
        </el-button>
        <el-table :data="form.grantedTenants" height="280">
          <el-table-column label="序号" type="index" width="55" />
          <el-table-column
            label="租户名称"
            prop="tenantName"
            align="center"
            :show-overflow-tooltip="true"
            min-width="150"
          />
          <el-table-column
            v-if="!isView"
            label="操作"
            width="200px"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" class="delbutton" @click="handleDel(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <select-tenant ref="selectTenant" :tenant-ids="form.grantedTenants" @ok="handleGrantedTenants" />
  </common-dialog>
</template>

<script>
import SelectTenant from "../components/selectTenant.vue";
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import QuestionInfo from "@/pages/intelligentOilfield/configurationCenter/processCenter/designer/modules/QuestionInfo.vue";
import { saveConfig, getConfig } from "@/api/intelligentOilfield/messaging";
import { listApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";
import { looselyValidURL } from "@/utils/validate.js";

export default {
  components: {
    CommonDialog,
    SelectTenant,
    QuestionInfo
  },
  dicts: ["sys_active_type"],
  data() {
    return {
      visible: false,
      formId: null,
      action: "",
      appList: [],
      form: {
        descr: undefined,
        exposeKey: undefined,
        exposeUri: undefined,
        grantedTenants: [],
        messageType: "MAIL",
        title: undefined,
        triggerType: "USER",
        active: "1",
        appId: undefined,
        requestType: undefined
      },
      options: {
        triggerTypes: [
          { label: "用户触达", value: "USER" },
          { label: "服务触达", value: "SERVICE" }
        ],
        userMessageTypes: [
          /* { value: "SMS", label: "短信" }, */
          { value: "MAIL", label: "邮件" },
          { value: "LETTER", label: "站内信" }/* ,
          { value: "PUSH", label: "移动云推送", disabled: true } */
        ]
      },
      rules: {
        title: [
          { required: true, message: "请输入主题名称", trigger: ["blur", "change"] },
          { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: ["blur", "change"] }
        ],
        triggerType: [{ required: true, message: "请选择触达类型", trigger: "change" }],
        messageType: [{ required: true, message: "请选择消息类型", trigger: "change" }],
        appId: [{ required: true, message: "请选择绑定应用", trigger: "change" }],
        exposeKey: [
          { required: true, message: "请输入消息接收标识", trigger: ["blur", "change"] },
          { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: ["blur", "change"] }
        ],
        exposeUri: [
          { required: true, message: "请输入消息接收URI", trigger: ["blur", "change"] },
          { min: 1, max: 128, message: "长度在 1 到 128 个字符", trigger: ["blur", "change"] },
          { validator: this.validateBaseUrl, trigger: ["change", "blur"] }
        ],
        grantedTenants: [
          { required: true, message: "请授权使用租户", trigger: ["change"] }
        ]
      },
      type: {
        "Add": "新增",
        "View": "查看",
        "Edit": "编辑"
      }
    };
  },
  computed: {
    // 是否查看
    isView() {
      return this.action === "View";
    },
    // 是否用户触达
    userTrigger() {
      return this.form.triggerType === "USER";
    }
  },
  methods: {
    handleOpen(formId, action) {
      this.formId = formId;
      this.action = action;
      this.visible = true;
      this.bindModel();
    },
    /** 数据回显 */
    bindModel() {
      if (this.formId) {
        getConfig(this.formId).then(data => {
          this.form = data;
          if (typeof this.form.active === "number") {
            this.form.active = String(this.form.active);
          }
        });
      } else {
        this.form = {
          descr: undefined,
          exposeKey: undefined,
          exposeUri: undefined,
          grantedTenants: [],
          messageType: "MAIL",
          title: undefined,
          triggerType: "USER",
          active: "1",
          appId: undefined,
          requestType: undefined
        };
      }
      const params = { pageNum: 1, pageSize: 30 };
      listApp(params).then(res => {
        if (res.data.code === 200) {
          this.appList = res.data.rows;
        }
      });
    },
    /** 租户弹窗显示 */
    handleTenant() {
      this.$refs.selectTenant.dialogVisible = true;
    },
    /** 取消返回配置页 */
    close() {
      this.visible = false;
      this.$emit("ok");
    },
    /** 显示选择的租户 */
    handleGrantedTenants(data) {
      this.form.grantedTenants = data;
    },
    /** 删除租户信息 */
    handleDel(index) {
      this.form.grantedTenants.splice(index, 1);
    },
    /** 保存配置信息 */
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.grantedTenants.length === 0) {
            this.$modal.msgError("请至少选择一个租户");
          } else {
            this.form.grantedTenants = this.form.grantedTenants.map(item => {
              item.tenantKey = item.tenantCode || item.tenantKey;
              return item;
            });
            this.form.active = Number(this.form.active);
            saveConfig(this.form).then(() => {
              this.$modal.msgSuccess("保存成功");
              this.close();
            })
              .catch(err => this.$modal.msgError(err.response.data.message));
          }
        } else {
          this.$modal.msgError("请将必填项填写完整");
          return false;
        }
      });
    },
    /**
     * 触达类型切换，清空选项
     */
    handleTriggerType() {
      this.form.messageType = this.userTrigger ? this.form.messageType : "SERVICE";
    },
    changeApp(appId) {
      const app = this.appList.find(item => item.appId === appId);
      this.form.requestType = app && app.appType === "0" ? "INNER" : "HTTP";
    },
    /**
     * 校验根路径格式是否正确
     */
    validateBaseUrl(rule, value, callback) {
      if (!looselyValidURL(value)) {
        callback(new Error("请输入正确的消息接收处理API地址"));
      }
      callback();
    }
  }
};
</script>

<style lang="less" scoped>
.form-layout {
  max-width: 1000px;
  min-height: calc(100vh - 300px);
  padding: 20px;
}

.radio-type {
  line-height: 2;
  width: 150px;
  overflow: hidden;
}
</style>