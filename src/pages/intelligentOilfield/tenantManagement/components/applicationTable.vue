<template>
  <div>
    <el-table :data="updateData" height="calc(100vh - 580px)">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      />
      <el-table-column
        prop="appName"
        label="应用名称"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)" class="delbutton">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <common-dialog
      v-model="visible"
      label=""
      btn-type="primary"
      :dialog-title="label"
      @closed="visible=false"
      @ok="handleEditInfo"
    >
      <el-form :model="form">
        <el-form-item>
          <el-input
            v-model="form.sourceRole"
            type="textarea"
            placeholder="请输入应用相关信息"
            :clearable="true"
          />
        </el-form-item>
      </el-form>
    </common-dialog>
  </div>
</template>

<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import { dialogAutoCreateMixinWithFind } from "@/components/mixins/BytzDialogMixin.js";

export default {
  name: "ApplicationTable",
  components: {
    CommonDialog
  },
  mixins: [dialogAutoCreateMixinWithFind],
  props: {
    tableData: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      updateData: [],
      visible: false,
      label: "",
      form: {
        appId: "",
        sourceRole: ""
      }
    };
  },
  watch: {
    tableData() {
      this.updateData = this.tableData;
    }
  },
  methods: {
    /**
     * 点击编辑
     */
    handleClick(scope) {
      this.label = scope.row.appName;
      this.visible = true;
      this.form = scope.row;
    },
    /**
     * 点击删除
     */
    handleDelete(index, row) {
      this.$modal
        .confirm(`是否确认删除租户名称为"${row.appName}"的数据项？`)
        .then(() => {
          this.updateData.splice(index, 1);
          this.$emit("update-data", this.updateData);
        }).catch(() => {
          this.$message.warning("已取消");
        });
    },
    handleEditInfo() {
      this.$emit("update-data", this.updateData);
      this.visible = false;
    }
  }
};
</script>