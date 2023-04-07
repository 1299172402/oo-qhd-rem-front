<template>
  <el-table :data="updateData" border>
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="80"
    />
    <el-table-column
      prop="roleName"
      label="角色名称"
      align="center"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      label="操作"
      width="120"
      align="center"
    >
      <template slot-scope="scope">
        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: "TenantAuthTable",
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    updateData: {
      get() {
        return this.tableData;
      },
      set(val) {
        this.$emit("update:updateData", val);
      }
    }
  },
  methods: {
    /**
       * 点击编辑
       */
    handleClick(id) {
      // eslint-disable-next-line no-console
      console.log(id);
    },
    /**
       * 点击删除
       */
    handleDelete(index, row) {
      this.$modal
        .confirm(`是否确认删除租户名称为"${row.roleName}"的数据项？`)
        .then(() => {
          this.updateData.splice(index, 1);
        }).catch(() => {
          this.$message.warning("已取消");
        });
    }
  }
};
</script>
  <style scoped lang="less">
  .el-table {
    margin: 20px 0;
    border-bottom: 1px solid #ebeef5;
  }

  .el-button--text {
    color: red;
  }
  </style>