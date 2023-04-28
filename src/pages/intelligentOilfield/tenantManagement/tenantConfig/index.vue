<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 20px"
        @keyup.enter.native="searchQuery"
      >
        <el-form-item label="用户账号：" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户账号"
            clearable
            style="width: 240px;"
          />
        </el-form-item>
        <el-form-item label="用户名：" prop="phonenumber">
          <el-input
            v-model="queryParams.nickName"
            placeholder="请输入用户名"
            clearable
            style="width: 240px;"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchQuery"
          >
            搜索
          </el-button>
          <el-button icon="el-icon-refresh" class="commonBtn" @click="searchReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <page-panel-new header-title="分配用户" style="height: calc(100% - 100px);">
      <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
        <el-col v-show="isBindUser" :span="1.5">
          <select-user
            ref="select"
            v-hasPermi="['system:tenant:bind']"
            :data-sources="allSelectUser"
            @ok="loadData"
          />
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:tenant:unbind']"
            type="danger"
            :disabled="multiple"
            @click="cancelBind(userIds)"
          >
            {{ isBindUser ? "批量取消关联" : "批量取消绑定" }}
          </el-button>
          <el-button
            type="warning"
            class="commonBtn"
            @click="handleBack"
          >
            返回
          </el-button>
        </el-col>
      </el-row>
      <div class="footer-box container-box--background" style="height: 100%">
        <el-table
          :data="dataSource"
          height="calc(100% - 45px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :selectable="selectedTable"
            width="55"
            align="center"
          />
          <el-table-column label="用户账号" prop="userName" :show-overflow-tooltip="true" />
          <el-table-column label="用户名" prop="nickName" :show-overflow-tooltip="true" />
          <el-table-column label="所属部门" prop="deptName" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" prop="createTime" :show-overflow-tooltip="true" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-if="isBindUser || scope.row.isManager === '1'"
                v-hasPermi="['system:tenant:unbind']"
                type="text"
                @click="cancelBind([scope.row.userId])"
              >
                {{ isBindUser ? "取消关联" : "取消绑定" }}
              </el-button>
              <el-button
                v-else
                v-hasPermi="['system:tenant:bind']"
                type="text"
                icon="el-icon-lock"
                @click="bindManager(scope.row.userId)"
              >
                绑定
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="ipagination.total > 0"
          :total="ipagination.total"
          :page.sync="ipagination.current"
          :limit.sync="ipagination.pageSize"
          @pagination="handlePage"
        />
      </div>
    </page-panel-new>
  </div>
</template>

<script>
import selectUser from "../components/selectUser.vue";
import returnPaterPage from "@/utils/returnPaterPage";
import { ListMixins } from "@/components/mixins/ListMixin";
import { tenantUserList, unbindTenantUser, bindTenantManager, unbindTenantManager } from "@/api/intelligentOilfield/system/applicationCenter/tenant";

export default {
  components: { selectUser },
  mixins: [ListMixins],
  data() {
    return {
      // 选中用户组
      userIds: [],
      // 非多个禁用
      multiple: true,
      dataId: "",
      // 查询参数
      queryParams: {
        userName: undefined,
        nickName: undefined,
        tenantId: undefined
      },
      fn: {
        list: tenantUserList
      },
      showSearch: true,
      allSelectUser: []
    };
  },
  computed: {
    isBindUser() {
      // 判断是否进行绑定用户操作
      return this.$route.query.configName === "userBind";
    }
  },
  created() {
    this.dataId = this.$route.params.id;
    this.queryParams.tenantId = this.dataId;
  },
  methods: {
    /** 返回按钮 */
    handleBack() {
      returnPaterPage(this.$route.path, "Tenant");
    },
    /**
     * 多选框选中数据
     */
    handleSelectionChange(selection) {
      this.userIds = selection.map(item => item.userId);
      this.multiple = !selection.length;
    },
    selectedTable(row) {
      if (this.isBindUser || row.isManager === "1") {
        return true;
      }
    },
    /**
     * 取消绑定按钮操作
     */
    cancelBind(userIds) {
      const fn = this.isBindUser ? unbindTenantUser : unbindTenantManager;
      this.$modal.confirm("是否取消选中用户绑定数据项？").then(() => fn({ tenantId: this.dataId, userIds: userIds })).then(() => {
        this.loadData();
        this.isBindUser ? this.$modal.msgSuccess("取消关联成功") : this.$modal.msgSuccess("取消绑定成功");
      });
    },
    /**
     * 绑定租户管理员
     */
    bindManager(userId) {
      bindTenantManager({ tenantId: this.dataId, userIds: [userId] }).then(() => {
        this.loadData();
        this.$modal.msgSuccess("绑定成功");
      });
    },
    /**
     * 重置查询项
     */
    searchReset() {
      this.queryParams = { tenantId: this.dataId };
      this.loadData();
    },
    loadAfterwards() {
      this.fn.list({
        tenantId: this.dataId,
        pageNum: 1,
        pageSize: 9999
      })
        .then(res => {
          this.allSelectUser = res.data.rows;
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

.el-tree {
  max-height: 370px;
  overflow: scroll;
}
</style>