import Vue from "vue";
import { DownloadIcon } from "tdesign-icons-vue";
import PreviewPDF from "./PreviewPDF";
import { downFile, download } from "../utils/api";
import { previewable, retryPreview, preview, getImgUrl } from "../utils/file";

export default Vue.extend({
  name: "PreviewPage",
  components: {
    PreviewPDF
  },
  props: {
    // 是否是签章
    isSignature: {
      type: Boolean,
      default: false
    },
    // 弹窗中展示的文件
    modalFileId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgSrcs: {},
      loading: true,
      headers: {},
      previewType: "",
      textContent: "",
      previewLoading: false,
      unPreviewText: "",
      previewImage: "",
      pdfFileData: "",
      isFullScreen: true,
      pdfFile: null,
      imgFile: null,
      otherFile: null,
      fileId: "",
      fileName: ""
    };
  },
  watch: {
    modalFileId: {
      handler(val) {
        if (val) {
          this.fileId = val;
          this.handlePreviewFile({ filePath: this.fileId });
        }
      },
      immediate: true
    }
  },
  created() {
    if (!this.modalFileId) {
      this.fileId = this.$route.query.id;
      this.fileName = this.$route.query.name;
      this.handlePreviewFile({ filePath: this.fileId });
    }
  },
  methods: {
    /**
     * 点击下载按钮下载文件
     */
    handleDownload() {
      downFile(this.fileId)
        .then(v => {
          download(v, this.fileName);
        });
    },
    /**
     * 进入页面请求文件数据，看是否可以预览
     */
    handlePreviewFile(item) {
      const _this = this as any;
      _this.previewLoading = true;
      previewable(item.filePath)
        .then(v => _this.handleRetryPreview(v, item));
    },
    /**
     * 重试预览
     */
    handleRetryPreview(v, item) {
      const _this = this as any;
      if (v.previewable) {
        _this.handlePreviewFileAchieve(v.previewType, item);
      } else if (v.previewStatus === "converting_pdf" && v.retriable) {
        // 正在转为 pdf，自动调用重试接口
        retryPreview(item.filePath)
          .then(v => _this.handleRetryPreview(v, item));
      } else if (v.retriable) {
        this.$confirm({
          title: "提示",
          content: "在线预览失败，点击重试",
          okText: "重试",
          cancelText: "取消",
          closable: true,
          mask: false,
          onOk: () => {
            retryPreview(item.filePath)
              .then(v => _this.handleRetryPreview(v, item));
          },
          onCancel: () => {
            _this.unPreviewText = "在线预览失败";
          }
        });
      } else {
        if (!this.supportErrorDialog) {
          this.supportErrorDialog = this.$dialog({
            header: "提示",
            body: "此文件类型不支持在线预览",
            confirmBtn: "确定",
            onConfirm: () => {
              _this.previewLoading = false;
              _this.unPreviewText = "此文件类型不支持在线预览";
            }
          });
        }
        this.supportErrorDialog.show();
      }
    },
    /**
     * 预览文件实现
     */
    handlePreviewFileAchieve(type, file) {
      const _this = this as any;
      const readerOnload = evt => {
        this.otherFile = file;
        this.textContent = evt.target.result;
        this.previewLoading = false;
      };
      switch (type) {
        case "image":
          preview(file.filePath)
            .then(v => getImgUrl(v))
            .then(v => {
              _this.previewType = type;
              _this.imgFile = file;
              _this.previewImage = v;
              _this.previewLoading = false;
            });
          break;
        case "txt":
          preview(file.filePath)
            .then(v => {
              _this.previewType = type;
              const reader = new FileReader();
              reader.readAsText(v as any, "utf-8");
              reader.onload = readerOnload;
            });
          break;
        case "pdf":
          preview(file.filePath)
            .then(v => window.URL.createObjectURL(new Blob([v as any])))
            .then(v => {
              _this.previewType = type;
              _this.pdfFileData = v;
              _this.pdfFile = file;
              _this.previewLoading = false;
            });
          break;
        default:
          if (!this.typeErrordialog) {
            this.typeErrordialog = this.$dialog({
              header: "提示",
              body: "此文件类型不确定，预览失败",
              confirmBtn: "确定",
              onConfirm: () => {
                _this.previewLoading = false;
                _this.unPreviewText = "此文件类型不确定，预览失败";
              }
            });
          }
          this.typeErrordialog.show();
          break;
      }
    }
  },
  render() {
    let topRightEl;
    let previewPDFEl;

    if (this.previewType !== "pdf") {
      topRightEl = (
        <div>
          <t-button variant="text" theme="primary" onClick={() => this.handleDownLoad(this.pdfFile || this.imgFile || this.otherFile)} title="下载">
            <DownloadIcon />下载
          </t-button>
        </div>
      );
    }

    const previewFontELDisplay = this.previewLoading ? "block" : "none";
    const previewFontELStyle = `padding-top: 20px; width: 100px; margin: 60px auto; display: ${previewFontELDisplay};`;
    const previewFontEL = (<div style={previewFontELStyle}>加载中...</div>);

    const previewImgElDisplay = !this.previewLoading && this.previewType === "image" ? "inline" : "none";
    const previewImgEl = <img alt="图片预览" src={this.previewImage} style={`display: ${previewImgElDisplay}`} />;

    if (!this.previewLoading && this.previewType === "pdf") {
      previewPDFEl = <PreviewPDF
        is-full-screen={this.isFullScreen}
        file-id={this.pdfFileData}
        file-name={this.fileName}
      />;
    }

    const textContentElDisplay = !this.previewLoading && this.previewType === "txt" ? "block" : "none";
    const textContentElStyle = `padding: 10px; display: ${textContentElDisplay}`;
    const textContentEl = <div style={textContentElStyle}>{this.textContent}</div>;

    return (
      <div style="height: 100vh">
        {
          !this.unPreviewText
            ? (
              <t-loading loading={this.previewLoading} style="height: 100%">
                {topRightEl}
                {previewFontEL}
                {previewImgEl}
                {previewPDFEl}
                {textContentEl}
              </t-loading>
            ) : <span>{this.unPreviewText}</span>
        }
      </div>
    );
  }
});