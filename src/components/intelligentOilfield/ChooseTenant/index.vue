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
      @close="cancel"
    >
      <el-table
        ref="table"
        class="dialog-table"
        :data="dataSource"
        row-key="tenantId"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :reserve-selection="true"
          align="center"
        />
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
        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTenement">确 定</el-button>
      </span>
      <pagination
        v-show="ipagination.total > 0"
        key="tenant"
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
  methods: {
    getList() {
      tenantList({ pageNum: this.ipagination.current, pageSize: this.ipagination.pageSize }).then(response => {
        this.dataSource = response.data.rows;
        this.ipagination.total = response.data.total;
        this.handChangeSelection();
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
      if (this.tenantIds.length) {
        this.$nextTick(() => {
          this.dataSource.forEach(row => {
            const index = this.tenantIds.indexOf(row.tenantId);
            if (index !== -1) {
              this.$refs.table.toggleRowSelection(row, true);
            }
          });
        });
      }
    },
    handChooseUser() {
      this.getList();
      this.dialogVisible = true;
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
    },
    cancel() {
      this.$refs.table.clearSelection();
    }
  }
};
</script>
<style scoped lang="less">
.el-table {
  border-bottom: 1px solid #ebeef5;
}
</style>