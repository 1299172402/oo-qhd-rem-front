<!-- 后台——租户管理 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      style="margin-top:20px"
    >
      <el-form-item label="租户名称：" prop="messageType">
        <el-input
          v-model="queryParams.tenantName"
          placeholder="请输入租户名称"
          clearable
          @keyup.enter.native="searchQuery"
        />
      </el-form-item>
      <el-form-item label="租户状态：" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择租户状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_app_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            clearable
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          class="commonBtn"
          @click="searchReset"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    </headerSearch>
    <pagePanelNew headerTitle="租户管理" style="height:calc(100% - 100px);">
    <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:tenant:add']"
          type="primary"
          plain
          @click="handleAdd"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <div class="footer-box container-box--background">
      <el-table :data="dataSource">
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          width="55"
          align="center"
        />
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :label="item.label"
          :prop="item.props"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="item.props === 'status'">
              <dict-tag :options="dict.type.sys_app_status" :value="scope.row.status" list-class="default" />
            </span>
            <span v-else-if="item.props === 'appName'">
              {{ handleAppName(scope.row.appName) }}
            </span>
            <span v-else>{{ scope.row[item.props] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:tenant:edit']"
              type="text"
              @click="handleEdit(scope.row.tenantId)"
            >
              修改
            </el-button>
            <el-button
              v-hasPermi="['system:tenant:remove']"
              type="text"
              @click="handleDelete([scope.row.tenantId])"
              class="delbutton"
            >
              删除
            </el-button>
            <el-dropdown style="margin-left: 20px;" @command="(command) => handleCommand(command, scope.row)">
              <el-button type="text">
                更多
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handleBindUser">
                  分配用户
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        class="pagination-div"
        :total="ipagination.total"
        :page.sync="ipagination.pageNum"
        :limit.sync="ipagination.pageSize"
        @pagination="handlePage"
      />
    </div>
    </pagePanelNew>
  </div>

</template>

<script>
import {ListMixins, DeleteMixin,} from "@/components/mixins/ListMixin";
import { tenantList as list, deleteTenant } from "@/api/intelligentOilfield/system/applicationCenter/tenant";

const columns = [
  { props: "tenantCode", label: "租户编号" },
  { props: "tenantName", label: "租户名称" },
  { props: "userNum", label: "用户数量" },
  { props: "appName", label: "授权应用" },
  { props: "createTime", label: "添加日期" },
  { props: "status", label: "运行状态" }
];
export default {
  mixins: [ListMixins, DeleteMixin,],
  dicts: ["sys_app_status"],
  data() {
    return {
      queryParams: {
        tenantName: "",
        status: ""
      },
      // 显示搜索条件
      showSearch: true,
      columns,
      isAdd: true,
      visible: false,
      data: [],
      routeInfo: {
        edit: "",
        editParams: {}
      },
      fn: {
        list,
        delete: deleteTenant       
      },
    };
  },
  methods: {
    // 自定义索引
    indexMethod(index) {
      return index + 1 + (this.ipagination.pageNum - 1) * this.ipagination.pageSize;
    },
    /**
     * 修改操作
     */
    handleEdit(rowId) {
      this.routeInfo = { edit: "TenantForm", editParams: { id : rowId }, tenantId: rowId };
      this.handleEditToPage(rowId);
    },
    handleEditToPage(row) {
      this.$router.push({
        name: this.routeInfo.edit,
        params: {id:this.routeInfo.editParams.id}
      })
    },
    handleAddToPage() {
      this.$router.push({
        name: this.routeInfo.edit,
        params: {}
      })
    },
    /**
     * 新增操作
     */
    handleAdd() {
      this.routeInfo = {edit: "TenantForm"};
      this.handleAddToPage();
    },
    /**
     * 列表应用授权回显
     */
    handleAppName(appNames) {      
      return appNames ? appNames.join(",") : "-";
    },
    /**
     * 更多操作
     */
    handleCommand(command, row) {
      this.handleBindUser(row);
    },
    /**
     * 分配用户页面操作
     */
    handleBindUser(row) {
      this.routeInfo = { edit: "TenantConfig", editParams: { id : row.tenantId }, tenantId: row };
      this.handleEditToPage(row.tenantId);
    }
  }
};
</script>

<style scoped lang="less">
@import "@/style/less/list.less";

.app-container {
  height: 100%;
}
</style>