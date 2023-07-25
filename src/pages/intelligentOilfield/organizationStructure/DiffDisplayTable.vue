<template>
  <common-dialog
    v-model="visible"
    label="同步"
    width="98%"
    height="1"
    view-only
  >
    <diff-display
      :columns="columns"
      :list="list"
      :add-color="$store.state.setting.mode==='dark'?'#558153':'#d7ecd6'"
      :delete-color="$store.state.setting.mode==='dark'?'#915858':'#f7e5e5'"
    />
    <div slot="footer" class="dialog__footer">
      <el-button type="primary" @click="synchronous">
        同 步
      </el-button>
      <el-button class="cancelBtn" @click="visible = false">
        取 消
      </el-button>
    </div>
  </common-dialog>
</template>
<script>
import CommonDialog from "@/components/intelligentOilfield/dialog/CommonDialog.vue";
import DiffDisplay from "@/components/intelligentOilfield/diff-display/index.vue";

export default {
  name: "DiffDisplayTable",
  components: {
    CommonDialog,
    DiffDisplay
  },
  data: function() {
    return {
      visible: false,
      list: [],
      columns: [
        {
          prop: "deptName",
          label: "名称",
          ellipsis: true
        },
        {
          prop: "deptShort",
          label: "简称"
        },
        {
          prop: "parentName",
          label: "父级名称"
        },
        {
          prop: "parentId",
          label: "父级ID"
        }
      ]
    };
  },
  watch: {
    visible: function(val) {
      if (val) {
        this.getData();
      }
    }
  },
  methods: {
    getData() {
      this.$request.post("system/product/org/selectDiff")
        .then(v => {
          this.list = v.data.data || [];
        });
    },
    // 数据同步
    synchronous() {
      this.$modal
        .confirm("是否确认同步？")
        .then(() => {
          this.$request.post("system/product/org/sync")
            .then(() => {
              this.$modal.msgSuccess("同步成功");
              this.visible = false;
              this.$emit("updateList");
            });
        });
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .common-dialog .el-dialog__body > div {
  overflow-y: unset;
}

.dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>