import Vue from "vue";
import { LinkIcon, DeleteIcon, DownloadIcon, BrowseIcon } from "tdesign-icons-vue";
import { getImgUrl } from "./utils/file";
import "./style/index.less";
import { downFile, download } from "./utils/api";
import { fileTypeMap, fileTypeReverseMap, imgTypeArr } from "./utils/fileType";
import proxy from "@/config/host";

const env = import.meta.env.MODE || "development";
const uidGenerator = () => `-${parseInt((Math.random() * 10000 + 1).toString(), 10)}`;

export default Vue.extend({
  name: "Upload",
  props: {
    // file | img
    mode: {
      type: String,
      default: "file"
    },
    action: {
      type: String,
      default: `${proxy[env].API}/file/upload`
    },
    // 该属性将自动转换为W3C要求的格式
    accept: {
      type: String,
      default: ""
    },
    fileSize: {
      type: Number,
      default: 50
    },
    uploadParams: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Array],
      required: false,
      default: ""
    },
    iconComp: {
      type: Function,
      default: () => LinkIcon
    },
    canDelete: {
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
      fileList: [],
      autoUpload: true,
      imgValues: [],
      upload: "/sys/common/upload",
      urlDownload: "/sys/common/static/",
      loading: true,
      headers: { Authorization: `Bearer ${this.$store.getters["user/token"]}` }
    };
  },
  computed: {
    uploadActionUrl() {
      const keyArray = Object.keys(this.uploadParams);
      if (keyArray.length !== 0) {
        let params = "";
        keyArray.forEach(item => {
          params += `&${item}=${this.uploadParams[item]}`;
        });
        return `${this.action}?${params}`;
      }
      return this.action;
    }
  },
  watch: {
    value() {
      this.initFileList(this.value);
    }
  },
  mounted() {
    this.initFileList(this.value);
  },
  methods: {
    initFileList(paths: string) {
      this.loading = true;
      if (!paths || paths.length === 0) {
        this.fileList = [];
        this.loading = false;
        return;
      }
      const pathsArray = paths.split("|");
      this.fileList = pathsArray.map(filePath => ({
        uid: uidGenerator(),
        name: filePath.split(":")[1],
        status: "done",
        fileId: filePath.split(":")[0],
        response: {
          status: "history",
          message: filePath
        }
      }));
      // 处理图片
      if (this.mode === "img" && this.fileList.length > 0) {
        const promiseArr = this.fileList.map(file => downFile(file.fileId).then(v => getImgUrl(v).then(url => ({ name: file.name, url }))));
        Promise.all(promiseArr).then(res => {
          this.imgValues = res;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    defaultHandleFail(val) {
      const [currentFile] = val.currentFiles;
      this.$emit("fail", val);
      this.$message.error(`文件 ${currentFile.name} 上传失败`);
    },
    uploadChange(val) {
      // 如果是删除操作
      switch (this.mode) {
        case "img":
          return;
        case "file":
          if (this.fileList.length > val.length) {
            this.fileList = val;
            return;
          }
          break;
        default: break;
      }
      this.$emit("change", val);
      const lastFile = val[val.length - 1];
      const { response } = lastFile;
      let { status } = lastFile;
      const { result } = response;
      const file = result.split(":");
      const [id, name] = file;
      if (this.mode === "img") {
        downFile(id).then(v => {
          getImgUrl(v).then(url => {
            this.imgValues.push({ name, url });
          });
        });
      } else {
        // 如果状态是status的话转换为done
        if (status === "success") {
          status = "done";
        }
        this.fileList.splice(this.fileList.length - 1, 1, { fileId: id, name, response, status });
      }
    },
    handleDownLoad(file) {
      downFile(file.fileId)
        .then(v => {
          download(v, file.name);
        });
    },
    handlePreviewFile(item) {
      const mode = import.meta.env.MODE;
      const url = `${mode === "development" ? "/#" : "/#/b"}/file/preview?id=${item.fileId}&name=${item.name}`;
      window.open(url, "_blank");
    },
    onFileListClick(val) {
      this.$emit("fileListClick", val);
    },
    onFileListDelete(val) {
      this.fileList = this.fileList.filter(item => item.fileId !== val.fileId);
      this.$emit("input", this.fileList);
    },
    handleFail(file) {
      switch (this.mode) {
        case "file":
          this.fileList.splice(this.fileList.length - 1, 1);
          break;
        default:
          break;
      }
      this.defaultHandleFail(file);
    }
  },
  render(h) {
    let newAccept = ""; // 文件类型限制提示
    let imgAccept = ""; // 图片类型限制提示
    let acceptArr = [];
    if (this.accept) {
      newAccept = this.accept.split(",").map(item => {
        const w3cType = fileTypeReverseMap[item];
        acceptArr.push(w3cType);
        return w3cType;
      }).join(",");
    }
    if (this.mode === "img") {
      acceptArr = imgTypeArr;
      imgAccept = imgTypeArr.map(item => fileTypeMap[item]).join(",");
    }
    // 图片和文件的上传策略
    const beforeUploadStrategy = {
      img: () => {
        if (this.$attrs.max && this.imgValues.length === this.$attrs.max) {
          this.$message.warning(`最多只能上传${this.$attrs.max}个文件`);
          return false;
        }
      },
      file: file => {
        if (this.$attrs.max && this.fileList.length === this.$attrs.max) {
          this.$message.warning(`最多只能上传${this.$attrs.max}个文件`);
          return false;
        }
        const { name, status } = file;
        this.fileList.push({ name, status });
        return true;
      }
    };
    // 上传前的最终检查
    const beforeUploadFn = file => {
      const { type } = file.raw;
      if ((this.accept || this.mode === "img") && !acceptArr.includes(type)) {
        this.$message.error(`只能上传文件类型为【${this.mode === "img" ? imgAccept : this.accept}】的文件`);
        return false;
      }
      if (file.size / 1024 / 1024 > this.fileSize) {
        this.$message.error(`只能上传${this.fileSize}MB以下的文件`);
        return false;
      }
      return beforeUploadStrategy[this.mode](file);
    };
    const icon = this.iconComp();
    let fileListEl = () => null;
    if (this.fileList.length > 0) {
      fileListEl = () => (
        <div
          class="upload-component-list"
        >
          <ul>
            {
              this.fileList.map((item, index) => {
                if (item.status === "done") {
                  return (
                    <li>
                      <div>
                        {h(icon)}
                        <a onClick={() => this.onFileListClick(item)}>
                          {item.name}
                        </a>
                      </div>
                      <div class="action">
                        <BrowseIcon onClick={() => this.handlePreviewFile(item, index)} />
                        <DownloadIcon onClick={() => this.handleDownLoad(item)} />
                        {
                          !this.viewOnly ? <DeleteIcon
                            class="delete"
                            onClick={() => this.onFileListDelete(item)}
                          /> : null
                        }
                      </div>
                    </li>
                  );
                }
                return (
                  <li class="uploading-file">
                    <div>
                      {h(icon)}
                      <a style="color: red">{`${item.name}【文件正在上传...】`}</a>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
    // 文件上传组件
    const file = (
      <div>
        <t-upload
          accept={newAccept}
          disabled={this.$attrs.disabled}
          abridgeName={this.$attrs.abridgeName || [6, 6]}
          action={this.uploadActionUrl}
          headers={this.headers}
          value={this.fileList}
          fileListDisplay={fileListEl}
          before-upload={beforeUploadFn}
          on-change={this.uploadChange}
          on-fail={this.handleFail}
        />
      </div>
    );
    const data = {};
    // 图片上传组件
    const img = (
      <div>
        <t-upload
          theme="image"
          accept="image/*"
          multiple={this.$attrs.multiple}
          disabled={this.$attrs.disabled}
          tips="请选择单张图片文件上传"
          abridgeName={this.$attrs.abridgeName || [6, 6]}
          action={this.uploadActionUrl}
          value={this.imgValues}
          data={data}
          headers={this.headers}
          formatResponse={this.formatImgResponse}
          on-fail={this.handleFail}
          on-change={this.uploadChange}
          before-upload={beforeUploadFn}
        />
      </div>
    );
    const UploadComponentMode = { file, img };
    return (
      <t-loading loading={this.loading}>
        {this.viewOnly ? fileListEl() : UploadComponentMode[this.mode]}
      </t-loading>
    );
  }
});