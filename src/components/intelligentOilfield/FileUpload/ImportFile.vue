<template>
  <!-- 导入excel文件交给后端接口解析，解析后获取返回结果 -->
  <el-upload
    ref="upload"
    :multiple="multiple"
    action=""
    :on-error="handleError"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    :show-file-list="false"
    :accept="accept"
    class="import-file"
    :http-request="httpRequest"
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
import { uploadFile } from "@/components/upload/utils/file.ts";

export default {
  name: "ImportFile",
  props: {
    accept: {
      type: String,
      default: ".xlsx, .xls"
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
      default: undefined
    },
    // 上传url
    uploadUrl: {
      type: String,
      default: "/file/upload"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    /**
     * 使用统一的 axios 处理文件上传，方便统一拦截处理
     */
    httpRequest: function(val) {
      const fd = new FormData();
      fd.append("file", val.file, val.file.name);
      return uploadFile(fd, this.baseUrl, this.uploadUrl);
    },
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