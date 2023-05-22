<template>
  <div class="upload-file" :class="{'view-only': viewOnly}">
    <template v-if="isPictureCard">
      <el-upload
        ref="upload"
        list-type="picture-card"
        action=""
        :accept="accept"
        :before-upload="handleBeforeUpload"
        :limit="limit"
        drag
        :disabled="viewOnly"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleDelete"
        :file-list="fileList"
        :http-request="httpRequest"
        class="upload-demo upload-file-uploader upload-file-picture"
        :class="[fileList.length >= limit ? 'hide-upload' : '', $store.getters['setting/mode'] === 'dark' ? 'picture-card' : undefined]"
      >
        <template v-if="!viewOnly">
          <i class="el-icon-upload" />
          <div :class="$store.getters['setting/mode'] === 'dark' ? 'dark-hover-style' : 'light-hover-style'">
            拖拽或者点击上传
          </div>
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
        </template>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :class="$store.getters['setting/mode'] === 'dark' ? 'dark-dialog' : 'light-dialog'">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </template>
    <template v-if="!isPictureCard">
      <el-upload
        ref="upload"
        :accept="accept"
        multiple
        action=""
        :before-upload="handleBeforeUpload"
        :file-list="fileList"
        :limit="limit"
        :drag="drag"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleDelete"
        :http-request="httpRequest"
        class="upload-demo upload-file-uploader upload-file-text"
        :show-file-list="false"
        :class="[fileList.length >= limit ? 'hide-upload' : '', drag ? 'text-align-center' : 'upload-file-text']"
      >
        <template v-if="!viewOnly">
          <div v-if="!drag">
            <!-- 上传按钮 -->
            <el-button :type="buttonType">
              选取文件
            </el-button>
          </div>
          <div v-else>
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em :class="$store.getters['setting/mode'] === 'dark' ? 'dark-text-style' : 'light-text-style'">点击上传</em>
            </div>
          </div>
        </template>
        <!-- 上传提示 -->
        <div v-if="showTip" slot="tip" class="el-upload__tip">
          请上传
          <template v-if="fileSize">
            大小不超过 <b style="color: #f56c6c;">{{ fileSize }}MB</b>
          </template>
          <template v-if="myFileType">
            格式为 <b style="color: #f56c6c;">{{ myFileType.join("/") }}</b>
          </template>
          的文件
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :class="$store.getters['setting/mode'] === 'dark' ? 'dark-dialog' : 'light-dialog'">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <!-- 文件列表 -->
      <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
        <li
          v-for="file in fileList"
          :key="file.id"
          :class="[$store.getters['setting/mode'] === 'dark' ? 'upload-file-list-border' : undefined]"
          class="el-upload-list__item ele-upload-list__item-content"
        >
          <el-link :underline="false">
            <span class="el-icon-document"> {{ file.name }} </span>
          </el-link>
          <div class="ele-upload-list__item-content-action">
            <el-link
              v-if="!viewOnly"
              :underline="false"
              type="danger"
              @click="handleDelete(file)"
            >
              删除
            </el-link>
            <el-link :underline="false" type="primary" @click="handleLoad(file)">
              下载
            </el-link>
            <el-link
              id="previewUrl"
              :underline="false"
              target="_blank"
              type="primary"
              @click="handlePreview(file)"
            >
              预览
            </el-link>
          </div>
        </li>
      </transition-group>
    </template>
  </div>
</template>
<script>
import { uploadFile, getImgUrl, downFile, downloadTemplate, filePreview } from "@/components/upload/utils/file.ts";

import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
const defaultPictureType = ["bmp", "jpg", "jpeg", "png", "gif"];
const defaultVideoType = ["mpg", "mpeg", "avi", "rm", "rmvb", "mov", "wmv", "asf", "dat"];
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
    // 是否可拖拽
    drag: {
      type: Boolean,
      default: true
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: undefined
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
    viewOnly: {
      type: Boolean,
      default: false
    },
    bizPath: {
      type: String
    },
    uploadType: {
      type: String,
      default: "minio"
    }
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      baseUrl: `${proxy[env].API}`,
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      accept: "",
      myFileType: undefined,
      defaultFileType: ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "pdf", ...defaultPictureType, ...defaultVideoType],
      defaultPictureType,
      defaultVideoType,
      isMyEmit: false
    };
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.myFileType || this.fileSize);
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : val.split("|");
          // 然后将数组转为对象数组
          if (!this.isMyEmit) {
            this.initFileList(list.map(item => {
              if (typeof item === "string") {
                const [id, name] = item.split(":");
                item = { id, name };
              }
              return item;
            }));
          } else {
            this.isMyEmit = false;
          }
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.fileType) {
      this.myFileType = this.fileType;
    } else if (this.isPictureCard) {
      this.myFileType = this.defaultPictureType;
    } else {
      this.myFileType = this.defaultFileType;
    }
    this.accept = this.myFileType.map(item => `.${item}`).join(",");
  },
  methods: {
    /**
     * 使用统一的 axios 处理文件上传，方便统一拦截处理
     */
    httpRequest: function(val) {
      const fd = new FormData();
      fd.append("file", val.file, val.file.name);
      fd.append("bizPath", this.bizPath);
      fd.append("uploadType", this.uploadType);
      return new Promise((reslove, reject) => {
        uploadFile(fd).then(res => {
          if (res.data.code === 200) {
            reslove(res);
          } else {
            reject(res);
          }
        })
          .catch(e => {
            reject(e);
          });
      });
    },
    /**
     * 初始化文件
     */
    initFileList(list) {
      if (this.isPictureCard && list.length > 0) {
        this.fileList = [];
        list.forEach(file => downFile(file.id)
          .then(v => getImgUrl(v))
          .then(v => {
            this.$set(file, "url", v);
            this.fileList.push(file);
          }));
      } else {
        this.fileList = list;
      }
    },
    /**
     * 上传前校检格式和大小
     */
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.myFileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.myFileType.some(type => {
          if (file.type.indexOf(type) > -1) { return true; }
          if (fileExtension && fileExtension.indexOf(type) > -1) { return true; }
          return false;
        });
        if (!isTypeOk) {
          this.$modal.msgError(`文件格式不正确, 请上传${this.myFileType.join("/")}格式文件!`);
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
    handleUploadSuccess(res, file) {
      const [id, name] = res.data.data.split(":");
      if (res.data.code === 200) {
        this.uploadList.push({ name, id, url: file.url });
        if (this.uploadList.length === this.number) {
          this.fileList.push(...this.uploadList);
          this.uploadList = [];
          this.number = 0;
          this.handleEmit();
          this.$modal.closeLoading();
        }
      }
    },
    /**
     * 对象转成指定字符串分隔
     */
    listToString(list) {
      list = list || [];
      return list.map(v => `${v.id}:${v.name}`).join("|");
    },
    /**
     * 图片预览
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 删除文件
     */
    handleDelete(file) {
      this.fileList.splice(this.fileList.findIndex(v => v.id === file.id), 1);
      this.handleEmit();
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
    },
    /**
     * 下载文件
     */
    handleLoad(file) {
      downloadTemplate(`/file/download/${file.id}`, file);
    },
    /**
     * 文件预览
     */
    handlePreview(file) {
      const fileName = file.name.split(".")[1];
      if (this.defaultPictureType.includes(fileName)) {
        downFile(file.id)
          .then(v => getImgUrl(v))
          .then(v => {
            this.dialogImageUrl = v;
            this.dialogVisible = true;
          });
      } else {
        filePreview(file.id).then(res => {
          window.open(res.data.data);
        });
      }
    },
    handleEmit: function() {
      this.isMyEmit = true;
      this.$emit("input", this.listToString(this.fileList));
      this.$emit("change", this.fileList);
      this.validateFile();
    }
  }
};
</script>
<style scoped lang="less">
.upload-file-uploader {
  margin-bottom: 5px;
}

.upload-file-text {
  ::v-deep .el-upload {
    text-align: right;
  }

  .dark-text-style {
    color: rgb(0, 222, 240);
  }

  .light-text-style {
    color: #0075e9;
  }
}

.text-align-center {
  ::v-deep .el-upload {
    text-align: center;
  }
}

::v-deep .upload-file-picture {
  width: 100%;

  .el-upload--picture-card {
    width: 148px;
    height: 148px;
    line-height: 0;
  }

  .el-upload-dragger {
    height: 100%;

    .dark-hover-style:hover {
      color: rgb(0, 222, 240);
    }

    .light-hover-style:hover {
      color: #0075e9;
    }
  }
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #0075e9;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
  padding-left: 5px;

  .el-icon-document {
    color: #0075e9;
  }

  ::v-deep .el-link.el-link--primary {
    color: #0075e9;
  }
}

.upload-file-list .upload-file-list-border {
  border: 1px solid rgb(0, 222, 240);
  line-height: 2;
  margin-bottom: 10px;
  position: relative;

  &:hover {
    background-color: rgba(0, 222, 240, 0.2);
  }

  .el-icon-document {
    color: rgb(0, 222, 240);
  }

  ::v-deep .el-link.el-link--primary {
    color: rgb(0, 222, 240);
  }
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

::v-deep .el-upload-list__item:first-child {
  margin-top: 0;
}

.picture-card {
  color: rgb(193, 196, 204) !important;

  ::v-deep .el-upload--picture-card {
    background-color: transparent;
  }
}

.dark-dialog {
  ::v-deep .el-dialog__header {
    background: none;
    border: none;
  }
}

.light-dialog {
  ::v-deep .el-dialog__header {
    background: none;
    border: none;

    .el-icon-close::before {
      color: #908291;
    }
  }
}

.upload-file {
  /deep/ .el-upload {
    margin-top: 0;
  }

  &.view-only {
    /deep/ .el-upload {
      display: none;
    }
  }

  /deep/ .el-upload-list__item.is-ready,
  /deep/ .el-upload-list__item.is-uploading {
    display: none !important;
  }
}

::v-deep .hide-upload .el-upload__tip {
  display: none;
  transition: all 0.5s;
}
</style>