<template>
  <form-section submit-text="" @save="submitForm">
    <div class="display-flex column" style="height: 100%;">
      <h4 class="form-header h4">
        基本信息
      </h4>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
      >
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" disabled />
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="form.userName" disabled />
        </el-form-item>
      </el-form>

      <h4 class="form-header h4">
        角色信息
      </h4>
      <div class="container-box--background" style="height: calc(100% - 130px);">
        <el-table
          ref="table"
          :row-key="getRowKey"
          :data="roles.slice((pageNum-1)*pageSize,pageNum*pageSize)"
          height="510px"
          @row-click="clickRow"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="序号"
            type="index"
            :index="indexMethod"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" :reserve-selection="true" width="55" />
          <el-table-column label="角色名称" align="center" prop="roleName" />
          <el-table-column label="权限字符" align="center" prop="roleKey" />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
        />
      </div>
    </div>
  </form-section>
</template>

<script>
import { getAuthRole, updateAuthRole } from "@/api/intelligentOilfield/system/user";
import FormSection from "@/components/intelligentOilfield/FormSection.vue";
import returnPaterPage from "@/utils/returnPaterPage";

export default {
  name: "AuthRole",
  components: {
    FormSection
  },
  data() {
    return {
      // 分页信息
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 选中角色编号
      roleIds: [],
      // 角色信息
      roles: [],
      // 用户信息
      form: {}
    };
  },
  created() {
    const userId = this.$route.params && this.$route.params.userId;
    if (userId) {
      getAuthRole(userId).then(response => {
        this.form = response.data.user;
        this.roles = response.data.roles;
        this.total = this.roles.length;
        this.$nextTick(() => {
          this.roles.forEach(row => {
            if (row.flag) {
              this.$refs.table.toggleRowSelection(row);
            }
          });
        });
      });
    }
  },
  methods: {
    // 自定义索引
    indexMethod(index) {
      return index + 1 + (this.pageNum - 1) * this.pageSize;
    },
    /** 单击选中行数据 */
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.roleIds = selection.map(item => item.roleId);
    },
    // 保存选中的数据编号
    getRowKey(row) {
      return row.roleId;
    },
    /** 提交按钮 */
    submitForm() {
      const { userId } = this.form;
      const roleIds = this.roleIds.join(",");
      updateAuthRole({ userId, roleIds }).then(() => {
        this.$modal.msgSuccess("授权成功");
        returnPaterPage(this.$route.path, "User");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.text-over-flow {
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-dialog__body .el-row {
  display: flex;
  justify-content: space-between;
}

/deep/ .el-table-column--selection div.cell {
  text-align: center;
}

</style>