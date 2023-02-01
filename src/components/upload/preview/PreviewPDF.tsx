import Vue from "vue";

export default Vue.extend({
  name: "PreviewPDF",
  props: {
    fileId: {
      type: String,
      default: ""
    },
    fileName: {
      type: String,
      default: "document.pdf"
    }
  },
  data() {
    return {
      serverUrl: "/pdfjs/web/viewer.html"
    };
  },
  computed: {
    url() {
      if (this.fileId) {
        const mode = import.meta.env.MODE;
        let url;
        if (!mode || mode === "development") {
          url = this.serverUrl;
        } else {
          url = `/b/${this.serverUrl}`
        }
        return `${url}?file=${encodeURIComponent(`${this.fileId}#${this.newFileName}`)}`
      }
      return "";
    },
    newFileName() {
      let data = this.fileName;
      data = `${data.slice(0, data.lastIndexOf("."))  }.pdf`;
      return data;
    }
  },
  render() {
    return (
      <div style="height: 100%">
        <iframe src={this.url} width="100%" height="100%" />
      </div>
    )
  }
});