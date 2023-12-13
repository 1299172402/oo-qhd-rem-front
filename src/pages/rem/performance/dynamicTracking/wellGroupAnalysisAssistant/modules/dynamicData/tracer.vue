<!--示踪剂-->
<template>
  <div class="z-main">
    <div class="z-search">
      <el-radio-group v-model="selectPosition">
        <el-radio v-for="(item, index) in position" :key="index" :label="item.value">{{ item.label }}</el-radio>
      </el-radio-group>
    </div>
    <div class="z-container">
      <div class="z-row">
        <div class="z-col">
          <page-panel headerTitle="示踪剂结果" style="height: 100%; margin-top: 0" show-btn>
            <el-image :src="imageFirst" style="height: 100%; display: block; margin: 0 auto">
              <div slot="error"></div>
            </el-image>
          </page-panel>
        </div>
        <div class="z-col">
          <page-panel headerTitle="示踪剂报告" style="height: 100%; margin-top: 0" show-btn>
            <iframe
              :src="imageSecond ? imageSecond + '#toolbar=0' : ''"
              style="width: 100%; height: 100%"
              v-if="imageSecond"
            ></iframe>
          </page-panel>
        </div>
      </div>
      <div class="z-row">
        <div class="z-col">
          <page-panel headerTitle="示踪剂信息" style="height: 100%; margin-top: 0" show-btn>
            <!-- <el-image :src="imageThird"><div slot="error"></div></el-image> -->
            <el-table
              id="tableData"
              :data="tableData"
              border
              :row-style="{ height: '0px' }"
              header-cell-class-name="table_header"
              :cell-style="{ padding: '6px', 'text-align': 'center' }"
              style="width: 100%"
              height="100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
              :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            >
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="wellNo" label="井号"></el-table-column>
              <el-table-column prop="days" :label="`见剂时间\n(d)`"></el-table-column>
              <el-table-column prop="wellKm" :label="`井距\n(m)`" :formatter="toPrecise2"></el-table-column>
              <el-table-column prop="tracerSpeed" :label="`见剂速度\n(m/d)`" :formatter="toPrecise2"></el-table-column>
              <el-table-column
                prop="summitThickness"
                :label="`峰值浓度\n(ug/L)`"
                :formatter="toPrecise4"
              ></el-table-column>
              <el-table-column prop="peakWidth" :label="`峰值宽度\n(d)`" :formatter="toPrecise2"></el-table-column>
              <el-table-column prop="recoveryRatio" :label="`回采率\n(%)`" :formatter="toPrecise2"></el-table-column>
              <el-table-column prop="recoveryRat" :label="`回采率比例\n(%)`" :formatter="toPrecise2"></el-table-column>
            </el-table>
          </page-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tracer } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import { queryRemUploadFileMinio } from "@/api/rem/remuploadfileminio";
import { filePreview, downFile } from "@/components/upload/utils/file";
import FileSaver from "file-saver";
import { exportExcel } from "@/lib/exportExcel.js";


export default {
  props: {
    //油田id
    oilFieldId: {},
    //区块id
    blockId: {},
    //层系id
    layerId: {},
    //井组id
    wellGroupId: {},
    wellGroupName: {},
  },
  data() {
    return {
      //示踪剂结果
      imageFirst: "",
      fileFirstId: "",
      filestrFirstId: "",
      //示踪剂报告
      imageSecond: "",
      fileSecondId: "",
      filestrSecondId: "",
      //示踪剂信息
      // imageThird: "",
      //单选按钮对应信息
      position: [
        { label: "示踪剂结果", value: "TRACER_RESULTS" },
        { label: "示踪剂报告", value: "TRACER_REPORT" },
        { label: "示踪剂信息", value: "TRACER_INFORMATION" },
      ],
      //单选按钮选中项
      selectPosition: "",
      tableData: [],
    };
  },
  watch: {
    selectPosition(val) {
      this.$emit("childPara", this.selectPosition);
    },
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      queryRemUploadFileMinio({
        operationId: this.blockId + "-" + this.wellGroupName,
        operationType: "TRACER_RESULTS",
        readOne: "one",
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length) {
            this.fileFirstId = res.data.data[0].fileId;
            this.filestrFirstId = res.data.data[0].filestrId;
            // this.uploadTime=res.data.data[0].uploadTime || "";
            downFile(this.fileFirstId).then((res) => {
              this.imageFirst = window.URL.createObjectURL(res);
            });
          } else {
            this.fileFirstId = "";
            this.filestrFirstId = "";
            this.imageFirst = "";
            // this.uploadTime="";
          }
        } else {
          this.$message.error("文件查询接口异常!");
        }
      });
      queryRemUploadFileMinio({
        operationId: this.blockId + "-" + this.wellGroupName,
        operationType: "TRACER_REPORT",
        readOne: "one",
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length) {
            this.fileSecondId = res.data.data[0].fileId;
            this.filestrSecondId = res.data.data[0].filestrId;
            // this.uploadTime=res.data.data[0].uploadTime || "";
            filePreview(this.fileSecondId).then((res) => {
              this.imageSecond = res.data.data;
            });
          } else {
            this.fileSecondId = "";
            this.filestrSecondId = "";
            this.imageSecond = "";
            // this.uploadTime="";
          }
        } else {
          this.$message.error("文件查询接口异常!");
        }
      });
      tracer({
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        fieldLayerId: this.layerId,
        wellGroupId: this.wellGroupId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.tracerInfos;
          //   let first = res.data.data.tracePic;
          //   let firstType = res.data.data.tracePicType;
          //   let second = res.data.data.report;
          //   let secondType = res.data.data.reportType;
          //   let third = res.data.data.information;
          //   let thirdType = res.data.data.informationType;
          //   if (first) {
          //     this.imageFirst = "data:" + firstType + ";base64," + first;
          //   } else {
          //     this.imageFirst = "";
          //   }
          //   if (second) {
          //     this.imageSecond = "data:" + secondType + ";base64," + second;
          //   } else {
          //     this.imageSecond = "";
          //   }
          //   if (third) {
          //     this.imageThird = "data:" + thirdType + ";base64," + third;
          //   } else {
          //     this.imageThird = "";
          //   }
        }
      });
    },
    //下载
    doDownLoad() {
      //   if (this.imageFirst) downFile(this.imageFirst, fileName + "示踪剂结果");
      //   if (this.imageSecond) downFile(this.imageSecond, fileName + "示踪剂报告");
      //   if (this.imageThird) downFile(this.imageThird, fileName + "示踪剂信息");
      if (!this.fileFirstId) {
        this.$message.error("示踪剂结果无可下载内容");
        return;
      }
      let file_suffix1 = this.filestrFirstId.split(".")[1];
      downFile(this.fileFirstId).then((res) => {
        FileSaver.saveAs(res, `示踪剂结果.${file_suffix1}`);
      });
      if (!this.fileSecondId) {
        this.$message.error("示踪剂报告无可下载内容");
        return;
      }
      let file_suffix2 = this.filestrSecondId.split(".")[1];
      downFile(this.fileSecondId).then((res) => {
        FileSaver.saveAs(res, `示踪剂报告.${file_suffix2}`);
      });
      exportExcel("#tableData", "示踪剂信息");
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
    // 表格格式化方法 - 数值只保留四位小数
    toPrecise4(row, column) {
      if (
        (row[column.property] || parseFloat(row[column.property]) === 0) &&
        typeof parseFloat(row[column.property]) === "number"
      ) {
        return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
          ? parseFloat(row[column.property]).toFixed(4)
          : "0";
      } else {
        return row[column.property] ? row[column.property] : "-";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  .z-search {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .z-container {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
    .z-row {
      height: 500px;
      display: flex;
      .z-col {
        flex: 1;
        margin-right: 20px;
      }
      margin-bottom: 20px;
    }
    #tableData {
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
  }
}
</style>
