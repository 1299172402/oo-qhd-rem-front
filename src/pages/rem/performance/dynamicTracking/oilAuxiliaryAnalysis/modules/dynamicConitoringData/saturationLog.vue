<!--饱和度测井-->
<template>
  <div class="z-main">
    <div class="z-left-view">
      <page-panel-new style="width: 100%; height: 100%; margin-top: 0" show-btn>
        <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px">上传时间：{{ uploadTime }}</div>
        <iframe style="height: 100%; width: 100%" :src="url"></iframe>
      </page-panel-new>
    </div>
    <div class="z-right-view">
      <page-panel style="width: 100%; height: 100%; margin-top: 0" headerTitle="饱和度测井数据" show-btn>
        <el-table
          id="tableData"
          :data="tableData"
          border
          :row-style="{ height: '0px' }"
          header-cell-class-name="table_header"
          :cell-style="{ padding: '6px', 'text-align': 'center' }"
          style="width: 100%"
          height="calc(100% - 10px)"
          :default-sort="{ prop: 'date', order: 'descending' }"
          :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        >
          <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
          <el-table-column prop="wellBore" label="井号" width="160" fixed></el-table-column>
          <el-table-column prop="beginDate" :label="`解释开始时间\n (yyyy-mm-dd)`" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.beginDate | dateTimeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endDate" :label="`解释完成时间\n (yyyy-mm-dd)`" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.endDate | dateTimeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="layerName" label="解释层位" width="140"></el-table-column>
          <el-table-column
            prop="topDepth"
            :label="`顶界深度\n (m)`"
            width="140"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column
            prop="bottomDepth"
            :label="`底界深度\n (m)`"
            width="140"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column
            prop="originalWaterSaturation"
            :label="`含水饱和度\n (%)`"
            width="140"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column
            prop="waterSaturation"
            :label="`含油饱和度\n (%)`"
            width="140"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column
            prop="waterVeriation"
            :label="`含气饱和度\n (%)`"
            width="140"
            :formatter="toPrecise2"
          ></el-table-column>
          <el-table-column prop="conclusion" label="解释结论" min-width="180"></el-table-column>
          <el-table-column prop="remark" label="备注" min-width="180"></el-table-column>
        </el-table>
      </page-panel>
    </div>
  </div>
</template>

<script>
import { queryRemUploadFileMinio } from "@/api/rem/remuploadfileminio";
import { filePreview, downFile } from "@/components/upload/utils/file";
import FileSaver from "file-saver";
import { saturationLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  filters: {
    dateTimeFormat(val) {
      if (val) {
        return new Date(val).format("yyyy-MM-dd");
      } else {
        return "";
      }
    },
  },
  props: {
    //选择油田
    oilFeildId: {},
    //选择平台
    platform: {},
    //选择井号
    wellId: {},
  },
  data() {
    return {
      id: "",
      fileName: "",
      url: "",
      tableData: [],
      uploadTime: "", // 文件上传时间
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      let params = {
        operationId: this.wellId,
        operationType: "OILBHDCJ",
        readOne: "one",
      };
      queryRemUploadFileMinio(params).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length) {
            this.id = res.data.data[0].fileId;
            this.fileName = res.data.data[0].filestrId;
            // this.uploadTime=res.data.data[0].uploadTime || "";
            filePreview(this.id).then((res) => {
              this.url = res.data.data;
            });
          } else {
            this.id = "";
            this.fileName = "";
            this.uploadTime = "";
            this.url = "";
          }
        } else {
          this.$message.error("文件查询接口异常!");
        }
      });
      //获取表格数据
      let request = {
        ogfId: this.oilFeildId,
        platformId: this.platform,
        wellId: this.wellId,
      };
      saturationLoggingInterpretation(request).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.saturationLoggingInterpretations;
        }
      });
    },
    //下载
    doDownLoad() {
      let fileName = "饱和度测井";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      if (this.image) {
        downFile(this.image, fileName);
      }
      exportExcel("#tableData", fileName);
      if (!this.id) {
        this.$message.error("无可下载内容");
        return;
      }
      let file_suffix = this.fileName.split(".")[1];
      downFile(this.id).then((res) => {
        FileSaver.saveAs(res, `${fileName}.${file_suffix}`);
      });
    },
    // 表格格式化方法 - 数值只保留两位小数
    toPrecise2(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(2)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  overflow: hidden;
  .z-left-view {
    width: 600px;
    padding-right: 20px;
    iframe {
      // border: 1px solid #ddd;
      border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
    }
  }
  .z-right-view {
    flex: 1;
    width: 0;
  }
}
#tableData {
  ::v-deep .el-table__fixed-header-wrapper .cell,
  ::v-deep .el-table__header-wrapper .cell {
    height: auto;
    line-height: 18px;
    white-space: pre;
  }
  ::v-deep .cell:empty {
    &::before {
      content: "-";
    }
  }
}
</style>
