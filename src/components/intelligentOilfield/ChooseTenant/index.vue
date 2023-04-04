<template>
  <div>
    <el-button type="primary" @click="handChooseUser">
      选择租户
    </el-button>
    <el-dialog
      title="选择租户"
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
          prop="tenantCode"
          label="租户编号"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="tenantName"
          label="租户名称"
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
import { tenantList } from "@/api/intelligentOilfield/system/applicationCenter/tenant.js";

export default {
  name: "ChooseRole",
  props: {
    tenantIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectTenement: [],
      dataSource: [],
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      tenantList({ pageNum: this.ipagination.current, pageSize: this.ipagination.pageSize }).then(response => {
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
      this.dataSource.forEach(row => {
        if (this.tenantIds.indexOf(row.tenantId) >= 0) {
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
      this.$emit("add-user", this.selectTenement);
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
  border-bottom: 1px solid #ebeef5;
}
</style>