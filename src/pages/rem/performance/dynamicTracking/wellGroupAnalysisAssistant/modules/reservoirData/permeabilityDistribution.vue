<!--渗透率分布图-->
<template>
  <div class="z-main">
    <div class="z-search">
      <el-select v-model="selectPosition" style="width: 220px" placeholder="请选择" filterable clearable>
        <el-option
          v-for="item in position"
          :key="item.fieldLayerId"
          :label="item.layerName"
          :value="item.fieldLayerId"
        ></el-option>
      </el-select>
      <div v-if="uploadTime" style="margin-left: 20px">上传时间：{{ uploadTime }}</div>
    </div>
    <el-row class="z-container" :gutter="20">
      <el-col :span="14">
        <page-panel-new style="height: 100%; margin-top: 0" show-btn>
          <div style="overflow: auto; width: 100%; height: 100%; display: flex; justify-content: center">
            <el-image :src="src">
              <div slot="error"></div>
            </el-image>
          </div>
        </page-panel-new>
      </el-col>
      <el-col :span="10">
        <page-panel-new style="height: 100%; margin-top: 0" show-btn>
          <el-table id="tableData" highlight :data="tableData" border style="width: 100%" height="100%">
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="wellName" label="井号" align="center"> </el-table-column>
            <el-table-column prop="fieldLayer" label="层位" align="center"> </el-table-column>
            <el-table-column prop="permeability" :label="`渗透率\n (mD)`" align="center"></el-table-column>
          </el-table>
        </page-panel-new>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fieldLayers } from "@/api/oilDeposit/rem-02/primaryinfo.js";
import { permeabilityDistribution } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
// Minio
import FileUpload from "@/components/intelligentOilfield/FileUpload/index.vue";
import { addRemUploadFileMinio, queryRemUploadFileMinio } from "@/api/rem/remuploadfileminio";
import { downFile } from "@/components/upload/utils/file";
export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //井组id
    wellGroupId: {},
  },
  data() {
    return {
      //mniIo
      fileId: "",
      filestrId: "",
      src: "",
      //所选择的层位
      selectPosition: "",
      //层位所选择内容信息
      position: [],
      //表格
      tableData: [],
      uploadTime: "", // 文件上传时间
    };
  },
  async mounted() {
    await this.doSearch();
  },
  methods: {
    async doSearch() {
      await this.fieldLayersApi();
      this.queryRemUploadFileMinioApi();
      this.permeabilityDistributionApi();
    },
    async fieldLayersApi() {
      await fieldLayers({ oilFieldId: this.oilFeildId, wellGroupId: this.wellGroupId }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0]) {
              if (
                this.position.find((item) => {
                  return item.fieldLayerId == "26C4B92661D345969091868C256A7902";
                })
              ) {
                this.selectPosition = "26C4B92661D345969091868C256A7902";
              } else if (
                this.position.find((item) => {
                  return item.fieldLayerId == "263518079CED49AE8B6C9FE5CEBDD26A";
                })
              ) {
                this.selectPosition = "263518079CED49AE8B6C9FE5CEBDD26A";
              } else if (
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
              this.$emit("childPara", this.selectPosition);
            }
          } else {
            this.position = [];
            this.selectPosition = "";
          }
        } else {
          this.position = [];
          this.selectPosition = "";
        }
      });
    },
    //minIo-获取底图
    queryRemUploadFileMinioApi() {
      let params = {
        operationId: this.blockId + "-" + this.selectPosition,
        operationType: "BLOCKCWDT",
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
    //获取表格数据
    permeabilityDistributionApi() {
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellGroupId: this.wellGroupId,
      };
      permeabilityDistribution(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.permeabilityDetails;
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "渗透率分布图";
      exportExcel("#tableData", fileName);

      if (!this.fileId) {
        this.$message.error("无可下载内容");
        return;
      }
      let file_suffix = this.filestrId.split(".")[1];
      downFile(this.id).then((res) => {
        FileSaver.saveAs(res, `${fileName}.${file_suffix}`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__fixed-header-wrapper .cell,
::v-deep .el-table__header-wrapper .cell {
  height: auto !important;
  line-height: 18px !important;
  white-space: pre;
}

.z-main {
  width: 100%;
  height: calc(100% - 101px);
  display: flex;
  flex-direction: column;

  .z-search {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .z-container {
    width: 100%;
    flex: 1;
    height: 0;
    display: flex;
    overflow-y: scroll;
  }
}
</style>
