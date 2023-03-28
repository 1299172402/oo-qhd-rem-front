<template>
  <el-dialog
    :close-on-click-modal="false"
    title="短信消息"
    :visible.sync="visible"
    width="800px"
    append-to-body
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="手机号：">
        <el-input v-model="form.mobileNums" readonly />
      </el-form-item>
      <el-form-item label="短信优先级：">
        <el-input v-model="levelText" readonly />
      </el-form-item>
      <el-form-item label="短信内容：">
        <el-input
          v-model="form.message"
          :autosize="{ minRows: 6 }"
          type="textarea"
          readonly
        />
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
import { getSmsData } from "@/api/intelligentOilfield/messaging";

export default {
  name: "SmsView",
  data() {
    return {
      form: {
        message: "",
        mobileNums: "",
        level: 3  // 默认等级为中
      },
      visible: false
    };
  },
  computed: {
    levelText() {
      // 短信优先级文字回显
      const text = ["高", "较高", "中", "较低", "低"];
      return text[Math.round(this.form.level) - 1];
    }
  },
  methods: {
    /** 数据回显 */
    bindModel(messageId) {
      if (messageId) {
        getSmsData(messageId).then((data) => {
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