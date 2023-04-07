<template>
  <div class="upload-file">
    <template v-if="isPictureCard">
      <el-upload
        ref="upload"
        list-type="picture-card"
        action=""
        :before-upload="handleBeforeUpload"
        :limit="limit"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :headers="headers"
        :file-list="imageList"
        :http-request="httpRequest"
        class="upload-file-uploader upload-file-picture"
        :class="[fileList.length >= limit ? 'hide-upload' : '']"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </template>
    <template v-if="!isPictureCard">
      <el-upload
        v-if="showUpload"
        ref="upload"
        multiple
        action=""
        :before-upload="handleBeforeUpload"
        :file-list="fileList"
        :limit="limit"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :show-file-list="false"
        :http-request="httpRequest"
        class="upload-file-uploader"
      >
        <!-- 上传按钮 -->
        <el-button :type="buttonType">
          选取文件
        </el-button>
        <!-- 上传提示 -->
        <div v-if="showTip" slot="tip" class="el-upload__tip">
          请上传
          <template v-if="fileSize">
            大小不超过 <b style="color: #f56c6c;">{{ fileSize }}MB</b>
          </template>
          <template v-if="fileType">
            格式为 <b style="color: #f56c6c;">{{ fileType.join("/") }}</b>
          </template>
          的文件
        </div>
      </el-upload>

      <!-- 文件列表 -->
      <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
        <li v-for="(file, index) in fileList" :key="file.url" class="el-upload-list__item ele-upload-list__item-content">
          <el-link :href="`${file.url}`" :underline="false" target="_blank">
            <span class="el-icon-document"> {{ file.name }} </span>
          </el-link>
          <div v-if="!viewOnly" class="ele-upload-list__item-content-action">
            <el-link :underline="false" type="danger" @click="handleDelete(index)">
              删除
            </el-link>
          </div>
        </li>
      </transition-group>
    </template>
  </div>
</template>
<script>
import { uploadFile } from "@/components/upload/utils/file.ts";

import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
export default {
  name: "FileUpload",
  props: {
    // 值
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Object, Array],
    // 数量限制
    limit: {
      type: Number,
      default: 5
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["doc", "xls", "ppt", "txt", "pdf"]
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 是否为照片墙
    isPictureCard: {
      type: Boolean,
      default: false
    },
    // 上传按钮格式
    buttonType: {
      type: String,
      default: "primary"
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    viewOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      imageList: [],
      baseUrl: `${proxy[env].API}`,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map(item => {
            if (typeof item === "string") {
              item = { name: item, url: item };
            }
            item.uid = item.uid || new Date().getTime() + temp;
            temp += 1;
            return item;
          });
          this.$nextTick(() => {
            this.initFileList(val);
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * 使用统一的 axios 处理文件上传，方便统一拦截处理
     */
    httpRequest: function(val) {
      const fd = new FormData();
      fd.append("file", val.file, val.file.name);
      return uploadFile(fd);
    },
    /**
     * 初始化文件
     */
    initFileList(paths) {
      this.loading = true;
      if (!paths || paths.length === 0) {
        this.fileList = [];
        this.loading = false;
        return;
      }
      if (this.isPictureCard && this.fileList.length > 0) {
        let len = this.fileList.length;
        this.imageList = [];
        this.fileList.forEach(file => {
          this.imageList.push({ url: file.url, name: file.name });
          len -= 1;
          if (len === 0) {
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
      }
    },
    /**
     * 上传前校检格式和大小
     */
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) { return true; }
          if (fileExtension && fileExtension.indexOf(type) > -1) { return true; }
          return false;
        });
        if (!isTypeOk) {
          this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      this.$modal.loading("正在上传文件，请稍候...");
      this.number += 1;
      return true;
    },
    /**
     * 文件个数超出
     */
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError() {
      this.$modal.msgError("上传图片失败，请重试");
      this.$modal.closeLoading();
    },
    /**
     * 上传成功回调
     */
    handleUploadSuccess(res) {
      if (res.code === 200) {
        this.uploadList.push({ name: res.data.name, url: res.data.url });
        if (this.uploadList.length === this.number) {
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;
          this.$emit("input", this.listToString(this.fileList));
          this.$emit("change", this.fileList);
          this.validateFile();
          this.$modal.closeLoading();
        }
      }
    },
    /**
     * 删除文件
     */
    handleDelete(index) {
      this.fileList.splice(index, 1);
      this.$emit("input", this.listToString(this.fileList));
      this.$emit("change", this.fileList);
      this.validateFile();
    },
    /**
     * 对象转成指定字符串分隔
     */
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i = 0; i < list.length; i++) {
        strs += list[i].url + separator;
      }
      return strs !== "" ? strs.substr(0, strs.length - 1) : "";
    },
    /**
     * 图片预览
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 删除图片
     */
    handleRemove(file, fileList) {
      this.fileList = fileList?.map(item => ({ name: item.name, url: item.name })) || [];
      this.$emit("input", this.listToString(this.fileList));
      this.validateFile();
    },
    /**
     * 校验方法
     */
    validateFile() {
      this.dispatch("el-form-item", "el.form.blur", this.value);
    },
    /**
     * 寻找到最近一个el-form-item进行表单校验
     */
    dispatch(componentName, eventName, value) {
      let parent = this.$parent || this.$root;
      let name = parent.$options._componentTag;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options._componentTag;
        }
      }
      if (parent) {
        parent.$emit(eventName, value);
      }
    }
  }
};
</script>
<style scoped lang="less">
.upload-file-uploader {
  margin-bottom: 5px;
}

::v-deep .upload-file-picture {
  width: 100%;

  .el-upload-list--picture-card {
    display: inline-block;
    margin-top: 10px;
  }

  .el-upload--picture-card {
    width: 148px;
    height: 130px;
  }
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}

.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}

.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}

::v-deep .hide-upload div.el-upload {
  display: none;
  transition: all 0.5s;
}
</style>