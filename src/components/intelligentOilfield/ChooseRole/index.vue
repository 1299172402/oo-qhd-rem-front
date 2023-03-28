<template>
  <div>
    <el-button type="primary" @click="handChooseUser">
      选择角色
    </el-button>
    <el-dialog
      title="选择角色"
      :visible.sync="dialogVisible"
      top="30vh"
      width="40%"
    >
      <el-table
        ref="table"
        :data="dataSource"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="createTime"
          label="角色创建时间"
          align="center"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">取 消</el-button>
        <el-button icon="el-icon-check" type="primary" @click="addTenement">确 定</el-button>
      </span>
      <pagination
        v-show="ipagination.total > 0"
        :total="ipagination.total"
        :page.sync="ipagination.pageNum"
        :limit.sync="ipagination.pageSize"
        @pagination="handlePage"
      />
    </el-dialog>
  </div>
</template>

<script>
import { listRole } from "@/api/intelligentOilfield/system/role.js";

export default {
  name: "ChooseTenant",
  props: {
    roleIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectTenement: [],
      dataSource:[],
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
    };
  },
  created(){
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      listRole({pageNum:this.ipagination.current, pageSize:this.ipagination.pageSize}).then((response) => {
        this.dataSource = response.data.rows;
        this.ipagination.total = response.data.total;
        this.loading = false;
      });
    },
    /**
     * 点击分页重新加载数据
     */
    handlePage(pageInfo) {
      this.$set(this.ipagination, "current", pageInfo.page);
      this.$set(this.ipagination, "pageSize", pageInfo.limit);
      this.getList();
    },
    /**
     * 设置已有用户选中状态
     */
    handChangeSelection() {
      this.dataSource.forEach((row) => {
        if (this.roleIds.indexOf(row.roleId) >= 0) {
          this.$refs.table.toggleRowSelection(row, true);
        } else {
          this.$refs.table.toggleRowSelection(row, false);
        }
      });
    },
    handChooseUser() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.handChangeSelection();
      });
    },
    /**
     * 增加租户
     */
    addTenement() {
      this.$emit("add-role", this.selectTenement);
      this.dialogVisible = false;
    },
    /**
     * 选择租户
     */
    handleSelectionChange(val) {
      this.selectTenement = val;
    }
  }
};
</script>
<style scoped lang="less">
.el-table {
  border-bottom: 1px solid #EBEEF5;
}
</style>