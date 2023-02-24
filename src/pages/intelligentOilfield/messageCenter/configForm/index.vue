<!-- 后台——消息主题表单页 -->
<template>
  <common-dialog label="" height="1" :viewOnly="isView" v-model="visible" @ok="save" >
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
        <el-radio-group v-model="form.triggerType">
          <el-radio v-for="item in options.triggerTypes" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="消息类型：" prop="messageType">
        <el-radio-group v-if="form.triggerType === 'USER'" v-model="form.messageType">
          <el-radio
            v-for="item in options.userMessageTypes"
            :key="item.value"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
        <el-radio-group v-else v-model="form.messageType">
          <el-radio
            v-for="item in options.serviceMessageTypes"
            :key="item.value"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="消息接收处理API地址：" class="is-required">
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
          <el-radio v-for="item in options.activeTypes" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="租户使用授权：">
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
              <el-button type="text" @click="handleDel(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <select-tenant ref="selectTenant" :tenants-data="form.grantedTenants" @ok="handleGrantedTenants" />
  </common-dialog>
</template>

<script>
import SelectTenant from "../components/selectTenant.vue";
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import { saveConfig, getConfig } from "@/api/intelligentOilfield/messaging";

export default {
  components: {
    CommonDialog,
    SelectTenant
  },
  data() {
    return {
      visible: false,
      formId: null,
      action: "",
      form: {
        descr: undefined,
        exposeKey: undefined,
        exposeUri: undefined,
        grantedTenants: [],
        messageType: undefined,
        title: undefined,
        triggerType: "USER",
        active: true
      },
      options: {
        triggerTypes: [
          { label: "用户触达", value: "USER" },
          { label: "服务触达", value: "SERVICE" }
        ],
        userMessageTypes: [
          { value: "SMS", label: "短信" },
          { value: "MAIL", label: "邮件" },
          { value: "PUSH", label: "移动云推送", disabled: true },
          { value: "LETTER", label: "站内信", disabled: true }
        ],
        serviceMessageTypes: [
          { value: "EQUIPMENT", label: "设备状态", disabled: true },
          { value: "FORWARDING", label: "服务转发", disabled: true }
        ],
        activeTypes: [
          { value: true, label: "正常" },
          { value: false, label: "离线" }
        ]
      },
      rules: {
        title: [
          { required: true, message: "请输入主题名称", trigger: "blur" },
          { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "blur" }
        ],
        triggerType: [{ required: true, message: "请选择触达类型", trigger: "change" }],
        messageType: [{ required: true, message: "请选择消息类型", trigger: "change" }],
        exposeKey: [
          { required: true, message: "请输入消息接收标识", trigger: "blur" },
          { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        exposeUri: [
          { required: true, message: "请输入消息接收URI", trigger: "blur" },
          { min: 1, max: 128, message: "长度在 1 到 128 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    // 是否查看
    isView() {
      return this.action === "View";
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
        getConfig(this.formId).then((data) => {
          this.form = data;
        });
      }
    },
    /** 租户弹窗显示 */
    handleTenant() {
      this.$refs.selectTenant.show();
    },
    /** 取消返回配置页 */
    close() {
      this.visible = false;
      this.$emit("ok");
    },
    /** 显示选择的租户 */
    handleGrantedTenants(data) {
      this.form.grantedTenants = this.form.grantedTenants.concat(data);
    },
    /** 删除租户信息 */
    handleDel(index) {
      this.form.grantedTenants.splice(index, 1);
    },
    /** 保存配置信息 */
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.grantedTenants.length === 0) {
            this.$modal.msgError("请至少选择一个租户");
          } else {
            saveConfig(this.form).then(() => {
              this.$modal.msgSuccess("保存成功");
              this.close();
            })
              .catch((err) => this.$modal.msgError(err.response.data.message))
          }
        } else {
          this.$modal.msgError("请将必填项填写完整");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form-layout {
  max-width: 1000px;
  min-height: calc(100vh - 280px);
  padding: 20px;
}
</style>