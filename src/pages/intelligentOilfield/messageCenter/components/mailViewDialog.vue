<template>
  <el-dialog
    :close-on-click-modal="false"
    title="邮件消息"
    :visible.sync="visible"
    width="800px"
    append-to-body
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="邮件标题：">
        <el-input v-model="form.subject" readonly />
      </el-form-item>
      <el-form-item label="邮件内容：">
        <el-input
          v-model="form.content"
          :autosize="{ minRows: 3 }"
          type="textarea"
          readonly
        />
      </el-form-item>
      <el-form-item label="发送地址：">
        <el-input v-model="form.fromAddr" readonly />
      </el-form-item>
      <el-form-item label="接收地址：">
        <el-input v-model="form.toAddr" readonly />
      </el-form-item>
      <el-form-item label="抄送地址：">
        <el-input v-model="form.ccAddr" readonly />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close" class="cancel-btn" @click="close">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMailData } from "@/api/intelligentOilfield/messaging";

export default {
  name: "MailView",
  data() {
    return {
      form: {
        ccAddr: "",
        content: "",
        fromAddr: "",
        subject: "",
        toAddr: ""
      },
      visible: false
    };
  },
  methods: {
    /** 数据回显 */
    bindModel(messageId) {
      if (messageId) {
        getMailData(messageId).then((res) => {
          if (res.status === 200) {
            this.form = res.data;
          }
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