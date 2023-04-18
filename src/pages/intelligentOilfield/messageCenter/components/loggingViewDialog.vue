<template>
  <el-dialog
    :close-on-click-modal="false"
    title="消息详情"
    :visible.sync="visible"
    width="800px"
    append-to-body
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="消息主题：">
        <el-input v-model="form.title" readonly />
      </el-form-item>
      <el-form-item label="发送方：">
        <el-input v-model="form.senderKey" readonly />
      </el-form-item>
      <el-form-item label="接收方：">
        <el-input v-model="form.recipients" readonly />
      </el-form-item>
      <el-form-item label="送达时间：">
        <el-input v-model="form.sentTime" readonly />
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-input v-model="form.createdTime" readonly />
      </el-form-item>
      <el-form-item label="消息状态：">
        <el-input v-model="form.status" readonly />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="close">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getLogData } from "@/api/intelligentOilfield/messaging";

export default {
  name: "LoggingView",
  data() {
    return {
      form: {
        title: "",
        senderKey: "",
        recipients: "",
        sentTime: "",
        createdTime: "",
        status: ""
      },
      visible: false
    };
  },
  methods: {
    /** 数据回显 */
    bindModel(messageId) {
      if (messageId) {
        getLogData(messageId).then(data => {
          this.form = data;
        });
      }
    },
    /** 弹窗显示 */
    show(id) {
      this.visible = true;
      this.messageId = id;
      this.bindModel(id);
    },
    /** 弹窗关闭 */
    close() {
      this.visible = false;
    }
  }
};
</script>