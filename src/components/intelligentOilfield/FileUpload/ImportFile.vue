<template>
  <!-- 导入excel文件交给后端接口解析，解析后获取返回结果 -->
  <el-upload
    ref="upload"
    :multiple="multiple"
    :action="uploadFileUrl"
    :on-error="handleError"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    :show-file-list="false"
    :headers="headers"
    :accept="accept"
    class="import-file"
  >
    <el-button
      :type="btnType"
      :icon="btnIcon"
      plain
      :loading="loading"
    >
      {{ btnText }}
    </el-button>
  </el-upload>
</template>
<script>
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
export default {
  name: "ImportFile",
  props: {
    accept: {
      type: String,
      default: ".xlsx, .xls"
    },
    uploadAction: {
      type: String,
      default: "/sys/common/upload"
    },
    btnType: {
      type: String,
      default: "warning"
    },
    btnIcon: {
      type: String,
      default: "el-icon-upload2"
    },
    btnText: {
      type: String,
      default: "导入"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    // 上传文件时，是否可以多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 以后 token 统一了就可以删掉了，目前测试流程平台需要单独的
    otherHeaders: {
      type: Object,
      default: () => ({})
    },
    baseUrl: {
      type: String,
      default: proxy[env].API
    },
    // 上传url
    uploadUrl: {
      type: String,
      default: "/file/upload"
    }
  },
  data() {
    return {
      loading: false,
      uploadFileUrl: `${this.baseUrl}${this.uploadUrl}`,
      headers: this.otherHeaders || { Authorization: `Bearer ${this.$store.getters["user/token"]}` }
    };
  },
  methods: {
    handleBeforeUpload() {
      this.$modal.loading("正在上传文件，请稍候...");
      this.loading = true;
    },
    handleSuccess(res) {
      if (this.showMessage) {
        this.$message.success((res && res.message) || "导入成功");
      }
      this.$emit("ok", res);
      this.$modal.closeLoading();
      this.loading = false;
    },
    handleError(res) {
      console.error(res, res.message, res.errorInfo);
      if (this.showMessage) {
        let tip;
        try {
          tip = `导入失败：${JSON.parse(res.message).errorInfo.message}`;
        } catch (_) {
          tip = "导入失败";
        }
        this.$message.error(tip);
      }
      this.$modal.closeLoading();
      this.loading = false;
    }
  }
};
</script>
<style scoped lang="less">
.import-file /deep/ .el-upload {
  margin-top: 0;
}
</style>