<template>
  <div>
    <common-dialog
      v-model="visible"
      v-bind="$attrs"
      label="选择应用"
      btn-type="primary"
      dialog-title="选择应用"
      :append-to-body="true"
      @closed="visible=false"
      @ok="handleApplication"
      @open="handleOpen"
    >
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="应用分类：" prop="apply">
          <el-select
            v-model="queryParams.apply"
            placeholder="请选择应用分类"
            clearable
          >
            <el-option
              v-for="dict in dict.type.sys_app_applyCenter"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="应用名称：" prop="appName">
          <el-input
            v-model="queryParams.appName"
            placeholder="请输入应用名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="searchQuery"
          >
            搜索
          </el-button>
          <el-button
            class="commonBtn"
            @click="searchReset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="table"
        :data="dataSource"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
        @cell-click="handleSelectCell"
      >
        <el-table-column
          v-if="multiple"
          :reserve-selection="true"
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          align="center"
        />
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :label="item.label"
          :prop="item.props"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="item.props === 'apply'">
              <dict-tag :options="dict.type.sys_app_applyCenter" :value="scope.row.apply" list-class="default" />
            </span>
            <span v-else-if="item.props === 'supportTerminal'">
              <span> {{ scope.row.isPc === 1 ? "PC" : "" }} </span>
              <span v-if="scope.row.isPc === 1 && scope.row.isMobile === 1"> / </span>
              <span> {{ scope.row.isMobile === 1 ? "移动端" : "" }} </span>
            </span>
            <span v-else>
              {{ scope.row[item.props] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="ipagination.total"
        :page.sync="ipagination.current"
        :limit.sync="ipagination.pageSize"
        @pagination="handlePage"
      />
    </common-dialog>
  </div>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import { ListMixins } from "@/components/mixins/ListMixin";
import { dialogAutoCreateMixinWithFind } from "@/components/mixins/BytzDialogMixin.js";
import { listApp } from "@/api/intelligentOilfield/system/app";

export default {
  name: "ChooseTenant",
  dicts: ["sys_app_applyCenter"],
  components: {
    CommonDialog
  },
  mixins: [ListMixins, dialogAutoCreateMixinWithFind],
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const columns = [
      { props: "appName", label: "应用名称" },
      { props: "apply", label: "应用分类" },
      { props: "supportTerminal", label: "支持终端" }
    ];
    return {
      visible: false,
      fn: {
        list: listApp
      },
      queryParams: {
        apply: "",
        appName: ""
      },
      columns,
      appIds: []
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1 + (this.ipagination.current - 1) * this.ipagination.pageSize;
    },
    handleSelectCell(data) {
      if (!this.multiple) {
        this.$emit("on-select-app", data);
        this.visible = false;
      }
    },
    /**
     * 弹窗打开操作
     */
    handleOpen() {
      this.$nextTick(() => {
        this.getAppIds();
        this.dataSource.forEach(row => {
          if (this.appIds.indexOf(row.appId) >= 0) {
            this.$refs.table.toggleRowSelection(row, true);
          } else {
            this.$refs.table.toggleRowSelection(row, false);
          }
        });
      });
    },
    /**
     * 获取已选appId集合
     */
    getAppIds() {
      this.appIds = this.tableData.map(item => item.appId);
    },
    /**
     * 选择租户
     */
    handleSelectionChange(val) {
      this.selectApplication = val;
    },
    /**
     * 点击确定返回已选数据
     */
    handleApplication() {
      this.$emit("selected", this.selectApplication);
      this.visible = false;
    },
    /**
     * 返回行数据key
     */
    getRowKey(row) {
      return row.appId;
    }
  }
};
</script>
<style scoped lang="less">
@import "@/style/less/list.less";

</style>