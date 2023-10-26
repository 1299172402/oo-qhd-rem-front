<template>
  <el-dialog
    :close-on-click-modal="false"
    title="错误日志"
    :visible.sync="visible"
    width="800px"
    append-to-body
  >
    <el-form>
      <el-table :data="dataSource" width="100%">
        <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center"
        />
        <el-table-column label="失败时间" prop="logTime" align="center" />
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="commonBtn" @click="close">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getErrorLogData } from "@/api/intelligentOilfield/messaging";

export default {
  name: "ErrorLogView",
  data() {
    return {
      dataSource: [],
      visible: false
    };
  },
  methods: {
    /** 数据回显 */
    bindModel(messageId) {
      if (messageId) {
        getErrorLogData(messageId).then(data => {
          this.dataSource = data;
        });
      }
    },
    /** 弹窗关闭 */
    close() {
      this.visible = false;
    },
    /** 弹窗展示 */
    show(id) {
      this.visible = true;
      this.bindModel(id);
    }
  }
};
</script>