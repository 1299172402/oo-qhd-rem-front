<!-- 分配角色 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        style="margin-top: 20px"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="用户账号" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户账号"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input
            v-model="queryParams.email"
            placeholder="请输入用户邮箱"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="用户手机" prop="phonenumber">
          <el-input
            v-model="queryParams.phonenumber"
            placeholder="请输入用户手机"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <page-panel-new header-title="分配用户">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:roleUser:unbind']"
            type="danger"
            size="mini"
            :disabled="multiple"
            :class="multiple === true ? 'commonBtn' : 'errorBtn'"
            @click="cancelAuthUserAll"
          >
            取消授权
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:roleUser:add']"
            type="primary"
            size="mini"
            @click="openSelectUser"
          >
            增加
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        height="calc(100% - 114px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="用户账号" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column label="用户名称" prop="nickName" :show-overflow-tooltip="true" />
        <el-table-column label="所属机构" prop="dept.deptName" :show-overflow-tooltip="true" />
        <el-table-column label="用户岗位" prop="posts[0].postName" :show-overflow-tooltip="true" />
        <el-table-column label="用户邮箱" prop="email" :show-overflow-tooltip="true" />
        <el-table-column label="用户手机" prop="phonenumber" :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template> -->
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:roleUser:unbind']"
              size="mini"
              type="text"
              style="color: #a61d24"
              @click="cancelAuthUser(scope.row)"
            >
              取消授权
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </page-panel-new>

    <select-user ref="select" :role-id="queryParams.roleId" @ok="handleQuery" />
  </div>
</template>

<script>
import { authUserCancel, authUserCancelAll, viewUserList } from "@/api/intelligentOilfield/system/role";
import selectUser from "./selectUser.vue";

export default {
  name: "AuthUser",
  dicts: ["sys_normal_disable"],
  components: { selectUser },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中用户组
      userIds: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
        userName: undefined,
        phonenumber: undefined,
        email: undefined,
        status: undefined
      }
    };
  },
  created() {
    const roleId = this.$route.params && this.$route.params.roleId;
    if (roleId) {
      this.queryParams.roleId = roleId;
      this.getList();
    }
  },
  activated() {
    const roleId = this.$route.params && this.$route.params.roleId;
    if (roleId) {
      this.queryParams.roleId = roleId;
      this.getList();
    }
  },
  methods: {
    /** 查询授权用户列表 */
    getList() {
      this.loading = true;
      viewUserList(this.queryParams).then(response => {
        this.userList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 返回按钮
    handleClose() {
      const obj = { path: "/system/role" };
      this.$tab.closeOpenPage(obj);
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.userId);
      this.multiple = !selection.length;
    },
    /** 打开授权用户表弹窗 */
    openSelectUser() {
      this.$refs.select.show();
    },
    /** 取消授权按钮操作 */
    cancelAuthUser(row) {
      const { roleId } = this.queryParams;
      // 被取消授权的用户"${row.userName}"将无法正常登录,是否确定?
      this.$modal
        .confirm(`确认要取消该用户"${row.userName}"角色吗？`)
        .then(() => authUserCancel({ userId: row.userId, roleId }))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("取消授权成功");
          }
        });
    },
    /** 批量取消授权按钮操作 */
    cancelAuthUserAll() {
      const { roleId } = this.queryParams;
      const userIds = this.userIds.join(",");
      this.$modal
        .confirm("是否取消选中用户授权数据项？")
        .then(() => authUserCancelAll({ roleId, userIds }))
        .then(res => {
          if (res ? res.data.code === 200 : false) {
            this.getList();
            this.$modal.msgSuccess("取消授权成功");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}
</style>