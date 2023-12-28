<!--油井辅助分析——地震属性图-->
<template>
  <div style="height: calc(100% - 95px)">
    <div class="z-search">
      <el-select
        v-model="selectPosition"
        style="width: 220px"
        placeholder="请选择"
        filterable
        clearable
        @change="selectChange"
      >
        <el-option
          v-for="(item, index) in position"
          :key="index"
          :label="item.layerName"
          :value="item.fieldLayerId"
        ></el-option>
      </el-select>
      <div v-if="uploadTime" style="margin-left: 20px">上传时间：{{ uploadTime }}</div>
    </div>
    <div class="z-main">
      <page-panel-new style="height: 100%; margin-top: 0" show-btn>
        <div style="overflow: auto; width: 100%; height: 100%">
          <el-image :src="src" style="width: 100%">
            <div slot="error"></div>
          </el-image>
        </div>
      </page-panel-new>
    </div>
  </div>
</template>

<script>
// import { fieldOilLayers } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { fieldLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
// miniIo
import { queryRemUploadFileMinio } from "@/api/rem/remuploadfileminio";
import { filePreview, downFile } from "@/components/upload/utils/file";
import FileSaver from "file-saver";
export default {
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
    //区块id
    blockId: {},
  },
  data() {
    return {
      //mniIo
      fileId: "",
      filestrId: "",
      src: "",
      //层位数据源
      position: [], //选中层位
      selectPosition: "",
      uploadTime: "", // 文件上传时间
    };
  },
  async mounted() {
    await this.doSearch();
  },
  methods: {
    //获取层位接口
    async fieldOilLayersApi() {
      //初始化获取层段关系
      await fieldLayers({
        oilFieldId: this.oilFeildId,
        wellId: this.wellId,
      }).then((res) => {
        if (res.data.code == 200) {
          //层段数据
          if (res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0]) {
              if (
                this.blockId == "83D33B89B0DAB7DFA440BD060746883A" ||
                this.blockId == "83D33B89B0DAB7DFA440BD060746883A"
              ) {
                if (
                  this.position.find((item) => {
                    return item.fieldLayerId == "263518079CED49AE8B6C9FE5CEBDD26A";
                  })
                ) {
                  this.selectPosition = "263518079CED49AE8B6C9FE5CEBDD26A";
                } else {
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              } else if (this.blockId == "YCFXDY8B643EDC9007F96F570600458D") {
                if (
                  this.position.find((item) => {
                    return item.fieldLayerId == "87795A3E6BBC4469BC9AC5AE0BBE759C";
                  })
                ) {
                  this.selectPosition = "87795A3E6BBC4469BC9AC5AE0BBE759C";
                } else if (
                  this.position.find((item) => {
                    return item.fieldLayerId == "02398139A19A4F62BEFAC658E870D487";
                  })
                ) {
                  this.selectPosition = "02398139A19A4F62BEFAC658E870D487";
                } else {
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              } else {
                this.selectPosition = this.position[0].fieldLayerId;
              }
              this.$emit("childPara", this.selectPosition);
            }
          } else {
            this.position = [];
          }
          this.$emit("childPara", this.selectPosition);
        }
      });
    },
    //获取图片
    async doSearch() {
      await this.fieldOilLayersApi();
      this.imageList = [];
      let params = {
        operationId: this.blockId + "-" + this.selectPosition,
        operationType: "BLOCKDZSXT",
        readOne: "one",
      };
      queryRemUploadFileMinio(params).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length) {
            this.fileId = res.data.data[0].fileId;
            this.filestrId = res.data.data[0].filestrId;
            this.uploadTime = res.data.data[0].uploadTime || "";
            downFile(this.fileId).then((res) => {
              this.src = window.URL.createObjectURL(res);
            });
          } else {
            this.fileId = "";
            this.filestrId = "";
            this.uploadTime = "";
            this.src = "";
          }
        } else {
          this.$message.error("文件查询接口异常!");
        }
      });
    },
    //层位change
    selectChange(e) {
      this.$emit("childPara", e);
      this.doSearch();
    },
    //下载功能
    doDownLoad() {
      if (!this.fileId) {
        this.$message.error("无可下载内容");
        return;
      }
      let fileName = "地震属性图";
      let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
      if (layerMess) {
        fileName = layerMess.layerName + "-" + fileName;
      }
      let file_suffix = this.filestrId.split(".")[1];
      downFile(this.id).then((res) => {
        FileSaver.saveAs(res, `${fileName}.${file_suffix}`);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.z-search {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.z-main {
  width: 100%;
  height: calc(100% - 50px);
  // border: 1px solid #ddd;
  // border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
  overflow: auto;
}
</style>
