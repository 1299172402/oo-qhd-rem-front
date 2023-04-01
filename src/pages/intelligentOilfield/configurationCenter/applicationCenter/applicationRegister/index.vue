<template>
  <form-section submit-text="" :return-name="returnName" @save="handleOk">
    <div class="application-register">
      <div class="application-form">
        <application-form ref="ruleForm" :form-model="model" />
        <section v-if="action === 'add'">
          <application-info ref="appForm" :action="action" :application-info="applicationInfo" />
        </section>
      </div>
      <div class="application-table">
        <aside>
          <div v-if="action === 'add'">
            <choose-tenement :tenant-ids="tenantIds" @add-user="chooseDept" />
            <tenant-auth-table :table-data="tableData" :config-columns="false" />
            <choose-role :role-ids="roleIds" @add-role="chooseRole" />
            <role-table :table-data="tableRoleData" />
          </div>
          <div v-else>
            <application-info ref="appForm" :action="action" :application-info="applicationInfo" />
          </div>
        </aside>
      </div>
    </div>
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
      returnName: "ApplicationList"
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
        console.error("AuditContainer:请确认returnPath路径配置正确");
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
    }

  }
};
</script>

<style scoped lang="less">
div.application-register {
  width: 100%;
  min-height: calc(100vh - 280px);
  overflow-y: auto;
  display: flex;

  div.application-form {
    flex: 0 0 50%;
    padding-right: 40px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
  }

  div.application-table {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    aside,
    section {
      flex: 1;
      padding: 0 30px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }

    section {
      padding: 20px 30px;
      border: none;
    }
  }
}
</style>