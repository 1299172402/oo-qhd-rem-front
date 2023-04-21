<template>
  <common-dialog
    v-model="dialogVisible"
    label=""
    append-to-body
    width="800px"
    dialog-title="配置数据源"
    @open="open"
    @closed="dialogVisible = false"
    @ok="addAccessRole"
  >
    <el-table
      ref="table"
      :data="dataSource"
      :row-key="row => row.roleId"
      border
      height="50vh"
      @selection-change="val => {selectRole = val}"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        :reserve-selection="true"
        :selectable="() => !isView"
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
      />
      <el-table-column
        prop="roleName"
        label="访间角色名称"
        align="center"
        min-width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="roleCode"
        label="访问角色代码"
        align="center"
        min-width="100"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="roleDesc"
        label="访间角色描述"
        min-width="200"
        :show-overflow-tooltip="true"
      />
    </el-table>
  </common-dialog>
</template>

<script>
import _ from "lodash";
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";

import { getResRoleAll } from "@/api/intelligentOilfield/system/role";

export default {
  name: "SelectAccessRole",
  components: { CommonDialog },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Array,
      default: () => []
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataSource: [],
      selectRole: []
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  created() {
    this.getResRoleAll();
  },
  methods: {
    open() {
      this.dataSource.map(item => {
        this.$delete(item, "configId");
        return item;
      });
      this.$nextTick(() => {
        this.$refs.table?.clearSelection();
        this.selectRole = [];
        if (this.configs.length) {
          this.configs.forEach(item => {
            const id = item.roleId || item.dsRoleId;
            const val = this.dataSource.find(i => i.roleId === id);
            if (val) {
              this.$set(val, "configId", item.id || "");
              this.selectRole.push(val);
              this.$refs.table.toggleRowSelection(val, true);
            }
          });
        }
      });
    },
    getResRoleAll() {
      getResRoleAll().then(res => {
        this.dataSource = res.data.data;
      });
    },
    addAccessRole() {
      this.$emit("save", _.cloneDeep(this.selectRole));
      this.dialogVisible = false;
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