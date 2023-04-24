<template>
  <div>
    <el-table :data="updateData" border>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      />
      <el-table-column
        prop="tenantName"
        label="租户名称"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        v-if="configColumns"
        label="配置内容"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" style="font-size: 10px; border-radius: 5px;" @click="handleClick(scope.row, true)">
            查看
          </el-button>
          <el-button type="text" style="font-size: 10px; border-radius: 5px;" @click="handleClick(scope.row, false)">
            配置
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!onlyRead"
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            style="font-size: 10px; border-radius: 5px;"
            class="button-danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <select-access-role
      :visible.sync="visible"
      :configs="configs"
      :is-view="isView"
      @save="saveRoles"
    />
  </div>
</template>

<script>
import SelectAccessRole from "./SelectAccessRole.vue";

export default {
  name: "TenantAuthTable",
  components: { SelectAccessRole },
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    configColumns: {
      type: Boolean,
      default: true
    },
    onlyRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      configs: [],
      tenantId: "",
      isView: false
    };
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
    handleClick(row, type) {
      this.configs = row.configs;
      this.tenantId = row.tenantId;
      this.isView = type;
      this.visible = true;
    },
    /**
     * 点击删除
     */
    handleDelete(index, row) {
      this.$modal
        .confirm(`是否确认删除租户名称为"${row.tenantName}"的数据项？`)
        .then(() => {
          this.updateData.splice(index, 1);
        }).catch(() => {
          this.$message.warning("已取消");
        });
    },
    saveRoles(val) {
      this.updateData.find(item => item.tenantId === this.tenantId).configs = val;
    }
  }
};
</script>
<style scoped lang="less">
.el-table {
  margin: 20px 0;
  border-bottom: 1px solid #ebeef5;
}

.button-danger {
  color: red;
}
</style>