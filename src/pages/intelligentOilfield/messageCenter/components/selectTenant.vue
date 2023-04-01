<template>
  <div>
    <el-dialog
      title="选择租户"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
    >
      <el-table
        ref="table"
        :data="dataSource"
        border
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :reserve-selection="true"
        />
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
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
import { ListMixins } from "@/components/mixins/ListMixin";
import { tenantList as list } from "@/api/intelligentOilfield/system/applicationCenter/tenant";

export default {
  name: "ChooseTenant",
  mixins: [ListMixins],
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
      fn: {
        list
      }
    };
  },
  methods: {
    // 自定义索引
    indexMethod(index) {
      return index + 1 + (this.ipagination.pageNum - 1) * this.ipagination.pageSize;
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
      this.$emit("ok", this.selectTenement);
      this.dialogVisible = false;
    },
    /**
     * 选择租户
     */
    handleSelectionChange(val) {
      this.selectTenement = val;
    },
    getRowKey(row) {
      return row.tenantId;
    }
  }
};
</script>
<style scoped lang="less">
.el-table {
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-table__row {
  .cell {
    padding-left: 14px !important;
  }
}
</style>