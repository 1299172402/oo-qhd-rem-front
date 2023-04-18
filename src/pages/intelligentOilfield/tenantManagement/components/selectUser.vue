<template>
  <!-- 选择分配用户弹窗 -->
  <common-dialog
    v-model="visible"
    v-bind="$attrs"
    label="添加用户"
    btn-type="primary"
    dialog-title="添加用户"
    view-only
    @closed="visible=false"
    @ok="handleSelectUser"
    @open="handleOpen"
  >
    <div style="display: flex;">
      <el-aside width="200px">
        <el-header style="height: 50px;">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            prefix-icon="el-icon-search"
            style="margin-bottom: 10px;"
          />
        </el-header>
        <el-scrollbar style="height: 500px;">
          <el-tree
            ref="tree"
            :data="deptOptions"
            node-key="id"
            :current-node-key="deptId"
            :filter-node-method="filterNode"
            highlight-current
            default-expand-all
            @node-click="handleNodeClick"
          />
        </el-scrollbar>
      </el-aside>
      <el-divider direction="vertical" />
      <el-container direction="vertical">
        <div>
          <header-search class="g-w100 g-h100">
            <el-header style="height: 50px;">
              <el-form
                ref="queryForm"
                :model="queryParams"
                :inline="true"
                style="margin-top: 20px"
                @keyup.enter.native="searchQuery"
              >
                <el-form-item label="用户名称：" prop="userName">
                  <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable />
                </el-form-item>
                <el-form-item label="手机号码：" prop="phonenumber">
                  <el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="searchQuery">
                    搜索
                  </el-button>
                  <el-button icon="el-icon-refresh" @click="searchReset">
                    重置
                  </el-button>
                </el-form-item>
              </el-form>
            </el-header>
          </header-search>
          <page-panel-new header-title="分配用户" style="height: calc(100% - 100px);">
            <el-main class="container">
              <el-table
                ref="table"
                height="415px"
                :data="dataSource"
                :row-key="getRowKey"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  :reserve-selection="true"
                  :selectable="selectable"
                  width="55"
                />
                <el-table-column label="用户账号" prop="userName" :show-overflow-tooltip="true" />
                <el-table-column label="用户名称" prop="nickName" :show-overflow-tooltip="true" />
                <el-table-column label="所属机构" prop="dept.deptName" :show-overflow-tooltip="true" />
                <el-table-column label="状态" align="center" prop="status">
                  <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
                  </template>
                </el-table-column>
              </el-table>
              <pagination
                v-show="ipagination.total > 0"
                :total="ipagination.total"
                :page.sync="ipagination.pageNum"
                :limit.sync="ipagination.pageSize"
                style="position: relative; margin-top: 20px;"
                @pagination="handlePage"
              />
            </el-main>
          </page-panel-new>
        </div>
      </el-container>
      <el-divider direction="vertical" />
      <el-aside direction="vertical" style="height: 510px;">
        <el-table :data="selectedUser" height="500px">
          <el-table-column label="已选用户" prop="userName" :show-overflow-tooltip="true" />
        </el-table>
      </el-aside>
    </div>
    <el-button
      slot="footer"
      v-hasPermi="['system:tenant:bind']"
      :loading="loading"
      type="primary"
      style="margin: 20px;"
      @click="handleSelectUser"
    >
      分配
    </el-button>
  </common-dialog>
</template>
<script>

import { listUser } from "@/api/intelligentOilfield/system/user";
import { treeselect } from "@/api/intelligentOilfield/system/dept";
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import { bindTenantUser } from "@/api/intelligentOilfield/system/applicationCenter/tenant";
import { ListMixins } from "@/components/mixins/ListMixin";

export default {
  dicts: ["sys_normal_disable"],
  components: {
    CommonDialog
  },
  mixins: [ListMixins],
  props: {
    dataSources: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      visible: false,
      // 选中数组值
      userIds: [],
      // 查询参数
      queryParams: {
        userName: undefined,
        phonenumber: undefined,
        deptId: undefined
      },
      selectedUser: [],
      selectedUserId: [],
      // 部门树选项
      deptOptions: undefined,
      deptId: "",
      deptName: "",
      fn: {
        list: listUser
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    dataSources: {
      handler() {
        this.selectedUser = this.dataSources;
        this.selectedUserId = this.dataSources.map(i => i.userId);
      }
    },
    dataSource: {
      handler() {
        this.$nextTick(() => {
          const userIds = this.selectedUser.map(v => v.userId);
          this.dataSource.forEach(row => {
            if (userIds.indexOf(row.userId) >= 0) {
              this.$refs.table?.toggleRowSelection(row, true);
            } else {
              this.$refs.table?.toggleRowSelection(row, false);
            }
          });
        });
      }
    }
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    selectable(row) {
      if (this.selectedUserId.indexOf(row.userId) >= 0) {
        return false;
      }
      return true;
    },
    handleOpen() {
      this.loadData();
    },
    /**
     * 查询部门下拉树结构
     */
    getTreeselect() {
      treeselect().then(response => {
        this.deptOptions = response.data.data;
      });
    },
    /**
     * 多选框选中数据
     */
    handleSelectionChange(selection) {
      const data = selection.filter(item => !this.selectedUserId.includes(item.userId));
      this.selectedUser = [...this.dataSources, ...data];
    },
    /**
     * 返回行数据key
     */
    getRowKey(row) {
      return row.userId;
    },
    /**
     * 点击部门节点切换用户
     */
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.queryParams.pageNum = 1;
      this.loadData();
    },
    /**
     * 筛选节点
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 选择分配用户操作
     */
    handleSelectUser() {
      this.userIds = this.selectedUser.map(item => item.userId);
      if (this.userIds.length === 0) {
        this.$modal.msgError("请选择要关联的用户");
        return;
      }
      bindTenantUser({ tenantId: this.$route.params.id, userIds: this.userIds }).then(res => {
        if (res ? res.data.code === 200 : false) {
          this.$modal.msgSuccess("关联成功");
          this.$emit("ok");
          this.visible = false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
  .el-header {
    width: 100%;
    text-align: center;
  }

  .el-main {
    width: 100%;
    text-align: center;
  }

  ::v-deep .el-dialog {
    width: 80%;
  }

  .container {
    padding: 20px 20px 0;
    height: 515px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 600px;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }

  ::v-deep .el-tree-node__content {
    height: 36px;
  }
</style>