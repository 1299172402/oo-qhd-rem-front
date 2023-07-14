<template>
  <form-section submit-text="" :return-name="returnName" @save="handleSave">
    <div class="form-auth">
      <div class="table-body">
        <choose-tenement :tenant-ids="tenantIds" @add-user="chooseTenement" />
        <tenant-auth-table :table-data="tableData" />
      </div>
      <div class="table-body">
        <choose-role :role-ids="roleIds" @add-role="chooseRole" />
        <role-table :table-data="tableRoleData" />
      </div>
    </div>
  </form-section>
</template>

<script>
import returnPaterPage from "@/utils/returnPaterPage";

import { listAuthorizedApp, authorizeBatch } from "@/api/intelligentOilfield/system/app.js";
import { tenantDsList, appTenantDs } from "@/api/intelligentOilfield/system/role";

import TenantAuthTable from "../modules/TenantAuthTable.vue";
import ChooseRole from "@/components/intelligentOilfield/ChooseRole/index.vue";
import RoleTable from "../modules/RoleTable.vue";
import ChooseTenement from "@/components/intelligentOilfield/ChooseTenant/index.vue";
import FormSection from "@/components/intelligentOilfield/FormSection.vue";

export default {
  name: "ApplicationAuth",
  components: {
    FormSection,
    TenantAuthTable,
    ChooseTenement,
    RoleTable,
    ChooseRole
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableRoleData: [],
      returnName: "ApplicationList"
    };
  },
  computed: {
    /**
     * 应用ID
     */
    appId() {
      return this.$route.params.id || undefined;
    },
    /**
     * 应用租户已授权id集合
     */
    tenantIds() {
      return this.tableData?.map(item => item.tenantId) || [];
    },
    roleIds() {
      return this.tableRoleData?.map(item => item.roleId) || [];
    }
  },
  watch: {
    appId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue) {
            this.getUserData();
          }
        }
      }
    }
  },
  methods: {
    /**
     * 获取已授权租户信息
     */
    getUserData() {
      this.loading = true;
      return listAuthorizedApp(this.appId)
        .then(res => {
          if (res.data.code === 200) {
            this.handlerTableData(res.data.data.tenantInfos);
            this.tableRoleData = res.data.data.roleInfos;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 保存应用授权租户
     */
    handleSave() {
      if ((this.appId ?? "") !== "") {
        const tenantIds = this.tableData.map(item => item.tenantId);
        const roleIds = this.tableRoleData?.map(item => item.roleId);
        const tenantDs = {
          appId: this.appId,
          configs: []
        };
        this.tableData.forEach(item => {
          tenantDs.configs.push(...item.configs.map(i => ({
            appId: this.appId,
            tenantId: item.tenantId,
            dsCodeStr: i.dsList ? i.dsList.map(s => s.dsCode).join(",") : i.dsCodeStr,
            dsId: i.dsList ? i.dsList.map(s => s.dsId).join(",") : i.dsId,
            dsRoleCode: i.roleCode || i.dsRoleCode,
            dsRoleId: i.roleId || i.dsRoleId,
            remarks: i.remarks,
            id: i.configId
          })));
        });
        this.loading = true;
        return Promise.all([appTenantDs(tenantDs), authorizeBatch({ appId: this.appId, tenantIds, roleIds })])
          .then(res => {
            if (res[1].data.code === 200) {
              this.$message.success("保存成功");
              if (this.returnName && typeof this.returnName === "string") {
                returnPaterPage(this.$route.path, this.returnName);
              } else if (window.opener) {
                window.close();
              } else {
                this.$router.go(-1);
              }
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    /**
     * 添加选择租户
     */
    chooseTenement(arr) {
      this.handlerTableData(arr);
    },
    chooseRole(arr) {
      this.tableRoleData = arr;
    },
    handlerTableData(arr = []) {
      if (arr.length >= 0) {
        Promise.all(arr.map(item => tenantDsList({ appId: this.appId, tenantId: item.tenantId }))).then(res => {
          this.tableData = arr.map((i, index) => {
            const val = this.tableData.find(s => s.tenantId === i.tenantId);
            const configs = val ? val.configs : res[index].data.rows || [];
            return {
              ...i,
              configs
            };
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
/* stylelint-disable */
div.form-auth {
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  flex-wrap: wrap;

  .table-body {
    width:45%;
  }
}
/* stylelint-enable */
</style>