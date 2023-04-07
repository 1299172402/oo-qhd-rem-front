<template>
  <form-section submit-text="" @save="handleOk">
    <div class="app-role-container">
      <el-table
        :data="authorizedAppList"
        class="all-app"
        height="calc(100vh - 260px)"
        row-key="appId"
        highlight-current-row
        @row-click="row => currentAppId = row.appId"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column prop="appName" label="应用名称" />
      </el-table>
      <el-table
        ref="roleTable"
        :data="appRoleList[currentAppId]"
        class="app-roles"
        :empty-text="currentAppId ? '暂无数据' : '请先选择一个应用'"
        row-key="roleId"
        @select-all="selectAll"
        @select="select"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column prop="roleKey" label="角色字符" />
        <el-table-column prop="roleName" label="角色名称" />
      </el-table>
      <el-table
        :data="pageModel.userRoles.filter(v => v.appId)"
        class="user-roles"
        row-key="roleId"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column prop="appId" label="所属应用">
          <template slot-scope="scope">
            {{ authorizedAppMap[scope.row.appId] }}
          </template>
        </el-table-column>
        <el-table-column prop="roleKey" label="角色字符" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </form-section>
</template>

<script>
import { mapGetters } from "vuex";
import { authorizedAppListByTenantCode } from "@/api/intelligentOilfield/system/app";
import { listRole } from "@/api/intelligentOilfield/system/role";
import { getAuthRole, updateAuthRole } from "@/api/intelligentOilfield/system/user";

import FormSection from "@/components/intelligentOilfield/FormSection.vue";

export default {
  name: "AppRole",
  components: {
    FormSection
  },
  data() {
    return {
      currentAppId: undefined,
      authorizedAppList: [],
      authorizedAppMap: {},
      appRoleList: {},
      model: {
        userId: this.$route.params.id
      },
      pageModel: {
        // 已经授权的角色信息
        userRoles: [],
        // 所有角色信息
        allRoles: []
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  watch: {
    currentAppId: function(val) {
      if (val) {
        this.getAppRoles(val)
          .then(() => {
            this.$nextTick(() => {
              this.appRoleList[val].forEach(row => {
                if (this.pageModel.userRoles.find(v => v.roleId === row.roleId)) {
                  this.$refs.roleTable.toggleRowSelection(row, true);
                }
              });
            });
          });
      }
    }
  },
  mounted() {
    this.getModel();
  },
  methods: {
    getModel: function() {
      // 查询用户已授权数据
      authorizedAppListByTenantCode(this.userInfo.currentTenantCode)
        .then(v => {
          this.authorizedAppList = v.data.data.map(app => {
            this.authorizedAppMap[app.appId] = app.appName;
            return app;
          });
        });
      // 查询历史用户角色信息
      getAuthRole(this.model.userId)
        .then(v => {
          this.pageModel.allRoles = v.data.roles;
          this.pageModel.userRoles = v.data.user.roles;
        });
    },
    /**
     * 保存
     */
    handleOk() {
      updateAuthRole({ ...this.model, roleIds: this.pageModel.userRoles.map(v => v.roleId).toString() })
        .then(() => {
          this.$message.success("保存成功！");
          this.$router.go(-1);
        });
    },
    /**
     * 获取app对应的角色信息
     */
    getAppRoles: function(appId) {
      if (this.appRoleList[appId]) {
        return Promise.resolve();
      }
      return listRole({
        pageNum: 1,
        pageSize: 999,
        appId: appId
      })
        .then(v => {
          this.$set(this.appRoleList, appId, v.data.rows);
        });
    },
    /**
     * 角色数据全选勾选变化时，处理数据
     */
    selectAll: function(selection) {
      if (selection.length) {
        // 全选
        selection.forEach(row => {
          if (!this.pageModel.userRoles.find(v => v.roleId === row.roleId)) {
            this.pageModel.userRoles.push(row);
          }
        });
      } else {
      // 取消全选
        const roleIds = this.appRoleList[this.currentAppId].map(v => v.roleId);
        this.pageModel.userRoles = this.pageModel.userRoles.filter(v => !roleIds.includes(v.roleId));
      }
    },
    /**
     * 角色数据单选勾选发生变化时，处理数据
     */
    select: function(selection, row) {
      if (selection.find(v => v.roleId === row.roleId)) {
        // 加入勾选
        this.pageModel.userRoles.push(row);
      } else {
        this.pageModel.userRoles = this.pageModel.userRoles.filter(v => v.roleId !== row.roleId);
      }
    },
    /**
     * 处理删除时需要将表格多选框一起联动
     */
    handleDelete: function(row) {
      this.pageModel.userRoles = this.pageModel.userRoles.filter(v => v.roleId !== row.roleId);
      const findItem = this.appRoleList[this.currentAppId].find(v => v.roleId === row.roleId);
      findItem && this.$refs.roleTable.toggleRowSelection(findItem, false);
    }
  }
};
</script>
<style scoped lang="less">
.app-role-container {
  display: flex;
  height: 100%;

  .el-table + .el-table {
    margin-left: 20px;
  }

  .all-app {
    width: 200px;
    flex: unset;
  }

  .app-roles {
    flex: 1;
  }

  .user-roles {
    flex: 1;
  }
}
</style>