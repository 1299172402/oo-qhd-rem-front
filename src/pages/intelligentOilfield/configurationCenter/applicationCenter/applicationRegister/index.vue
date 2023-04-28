<template>
  <form-section
    submit-text=""
    :save-text="isLastStep ? '保存': ''"
    :return-name="returnName"
    @save="handleOk"
  >
    <div style="width: 100%" class="stepsrow">
      <el-steps :active="active" align-center finish-status="success">
        <el-step v-for="(item, index) in stepList" :key="index" :title="item" />
      </el-steps>
    </div>
    <div
      :class="{
        'application-form': true,
        'show-all': isLastStep
      }"
    >
      <div>
        <application-form
          v-show="active === 0 || isLastStep"
          ref="ruleForm"
          :form-model="model"
          :only-read="isLastStep"
        />
        <application-info
          v-show="active === 1 || isLastStep"
          ref="appForm"
          :action="action"
          :application-info="applicationInfo"
          :only-read="isLastStep"
        />
      </div>
      <div v-show="action === 'add' && (active === 2 || isLastStep)" class="application-table">
        <aside>
          <choose-tenement v-if="!isLastStep" :tenant-ids="tenantIds" @add-user="chooseDept" />
          <tenant-auth-table :only-read="isLastStep" :table-data="tableData" :config-columns="false" />
        </aside>
        <aside>
          <choose-role v-if="!isLastStep" :role-ids="roleIds" @add-role="chooseRole" />
          <role-table :only-read="isLastStep" :table-data="tableRoleData" />
        </aside>
      </div>
    </div>
    <template #btn>
      <el-button v-if="active > 0" type="primary" @click="active--">
        上一步
      </el-button>
      <el-button v-if="active >= 0 && !isLastStep" type="primary" @click="next">
        下一步
      </el-button>
    </template>
  </form-section>
</template>

<script>
import { addApp, getApp, updateApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";
import ChooseRole from "@/components/intelligentOilfield/ChooseRole/index.vue";
import RoleTable from "../modules/RoleTable.vue";
import TenantAuthTable from "../modules/TenantAuthTable.vue";

import ApplicationInfo from "../modules/ApplicationInfo.vue";
import ApplicationForm from "../modules/ApplicationForm.vue";
import ChooseTenement from "@/components/intelligentOilfield/ChooseTenant/index.vue";
import FormSection from "@/components/intelligentOilfield/FormSection.vue";
import returnPaterPage from "@/utils/returnPaterPage";
// import { FormMixins } from "@/mixinsBytzFormMixins.js";

export default {
  name: "ApplicationRegister",
  components: {
    TenantAuthTable,
    ApplicationInfo,
    FormSection,
    ApplicationForm,
    ChooseTenement,
    ChooseRole,
    RoleTable
  },
  // mixins: [FormMixins],
  data() {
    return {
      model: {
        mobile: []
      },
      applicationInfo: {},
      tableData: [],
      fn: {
        save: addApp
      },
      tableRoleData: [],
      returnName: "ApplicationList",
      active: 0
    };
  },
  computed: {
    /**
     * 应用租户已授权id集合
     */
    tenantIds() {
      return this.tableData.map(item => item.tenantId) || [];
    },
    roleIds() {
      return this.tableRoleData.map(item => item.roleId) || [];
    },
    action() {
      return this.$route.query.action || "";
    },
    stepList() {
      return this.$route.params.id ? [
        "填写应用信息",
        "确认接口信息",
        "完成应用修改"
      ] : [
        "填写应用信息",
        "确认接口信息",
        "绑定租户与角色",
        "完成应用新增"
      ];
    },
    isLastStep() {
      return this.active === this.stepList.length - 1;
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getModel(this.$route.params.id);
    }
  },
  methods: {
    getModel(id) {
      this.loading = true;
      return getApp(id)
        .then(v => {
          this.model = this.getFindModel(v);
          if (this.model.isPc === 1) {
            this.model.mobile = "0";
          }
          if (this.model.isMobile === 1) {
            this.model.mobile = "1";
          }
          this.applicationInfo = this.model;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getFindModel(res) {
      return Object.assign(res.data.data, { mobile: [] });
    },
    /**
     * 重载该方法特殊处理，需要对两个表单进行校验
     * 保存应用注册
     */
    handleOk() {
      return Promise.all([this.validateRuleForm(), this.validateAppForm()])
        .then(() => {
          this.postForm();
        }).catch(() => {
          this.$message.warning("请将必填项填写完整！");
        });
    },
    /**
     * 保存数据方法
     */
    postForm() {
      this.loading = true;
      const realAction = this.action === "add" ? addApp : updateApp;
      realAction(this.getSaveModel())
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.$message.success("保存成功");
            this.handleBack();
            this.$emit("ok");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 页面返回
     */
    handleBack() {
      if (this.returnName && typeof this.returnName === "string") {
        returnPaterPage(this.$route.path, this.returnName);
      } else {
        console.error("AuditContainer:请确认returnName配置正确");
      }
    },
    /**
     * 应用信息表单校验
     */
    validateRuleForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.$children[0].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(new Error("请将必填项填写完整"));
          }
        });
      });
    },
    /**
     * appId表格表单校验
     */
    validateAppForm() {
      return new Promise((resolve, reject) => {
        this.$refs.appForm.$children[0].validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(new Error("请将必填项填写完整"));
          }
        });
      });
    },
    /**
     * 重载该方法对保存数据处理
     */
    getSaveModel() {
      this.$set(this.model, "tenantIds", this.tableData.map(item => item.tenantId));
      this.$set(this.model, "roleIds", this.tableRoleData.map(item => item.roleId));
      this.model.appCategory = this.model.appCategory ? this.model.appCategory : "0";
      return { ...this.model, ...this.applicationInfo };
    },
    /**
     * 添加应用租户
     */
    chooseDept(arr) {
      if (arr.length >= 0) {
        this.tableData = arr;
      }
    },
    chooseRole(arr) {
      if (arr.length >= 0) {
        this.tableRoleData = arr;
      }
    },
    next() {
      if (this.active === 0) {
        this.validateRuleForm().then(() => {
          this.active += 1;
        });
      } else if (this.active === 1) {
        this.validateAppForm().then(() => {
          this.active += 1;
        });
      } else {
        this.active += 1;
      }
    }
  }
};
</script>

<style scoped lang="less">
.application-form {
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.application-table {
  display: flex;
  width: 80%;
  justify-content: space-around;
  gap: 10px;

  aside {
    flex: 1;
  }
}

.show-all {
  gap: 10px;
  justify-content: space-evenly;

  .application-table {
    width: 40%;
    flex-direction: column;
    justify-content: start;
  }
}
</style>