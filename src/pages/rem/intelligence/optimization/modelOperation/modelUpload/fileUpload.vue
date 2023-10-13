<template>
  <!-- 上传优化前文件 -->
  <div>
    <!-- <el-image
      :src="require('@/icons/svg/tableHeader.png')"
      style="position: absolute; top: 45px; height: 35px; width: 675px"
    >
    </el-image> -->
    <el-table
      v-loading="fileLoading"
      element-loading-text="上传中"
      element-loading-background="rgb(0, 40, 80, 0.6)"
      :data="tableData"
      style="position: absolute; width: 720px; top: 44px; font-size: 15px;margin-left: -15px;"
      :header-cell-style="headerClass"
      :key="certinfoKey"
      >
      <el-table-column prop="fileName" label="文件类型" width="140" align="center"></el-table-column>
      <el-table-column prop="uploadedFileNum" label="已上传文件个数" width="128" align="center">
        <template v-slot="scope">
          {{ scope.row.uploadedFileNum }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-table-column align="right" width="255">
          <template v-slot="scope">
            <!-- 路由跳转  :limit="scope.row.limit+1" :limit="scope.row.limit"-->
            <el-row>
              <el-upload
                class="upload-file"
                ref="upload"
                action=""
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :accept="scope.row.accept"
                :file-list="fileList"
                :on-exceed="
                  (file, fileList) => {
                    return handleExceed(file, fileList, scope.row, scope.$index);
                  }
                "
                :on-change="
                  (file, fileList) => {
                    return handleChange(file, fileList, scope.row, scope.$index);
                  }
                "
              >
                <el-row type="flex" justify="space-around" >
                  <el-button  class="buttonClassLogo"
                           style="width:65px;height:25px;line-height:10px;padding-left:10px;
                    "
                           size="mini" icon="el-icon-thumb" @click="choose(scope.$index,scope.row)">
                  <span style="font-size:13px">选择</span>
                </el-button>
                <el-button class="buttonClassLogo"
                style="width:65px;height:25px;line-height:10px;margin-left: 5px;padding-left:10px;background-color: transparent;"
                           size="mini" icon="el-icon-upload2" @click.stop="uploadFiles(scope.row,scope.$index)">
                  <span style="font-size:13px;">上传</span>
                </el-button>
                <el-button  size="mini" icon="el-icon-upload" class="buttonClassLogo"
                           style="width:65px;height:25px;line-height:10px;margin-left: 5px;padding-left:10px;background-color: transparent;"
                           @click.stop="updateFileType(scope.row, scope.$index)">
                  <span style="font-size:13px">查看</span>
                </el-button>
                </el-row>

                <!-- 查看已上传文件 -->
                <el-row slot="tip">
                  <el-dialog
                    title="已上传优化文件"
                    :close-on-click-modal="false"
                    :visible.sync="uploadFileDialogVisible"
                    :modal="false"
                    width="750px"
                    footer=""
                    style="text-align: center; margin-top: 188px; margin-left: 180px"
                  >
                    <!-- <el-image
                      :src="require('@/icons/svg/tableHeader.png')"
                      style="position: absolute; top: 45px; left: 18px; height: 40px; width: 680px"
                    >
                    </el-image> -->
                    <el-table
                      :data="uploadFileList"
                      v-loading="fileDeleteLoading"
                      element-loading-text="删除中"
                      element-loading-background="rgb(0, 40, 80, 0.6)"
                      height="510px"
                      style="width: 750px; top: -20px; font-size: 14px"
                      :header-cell-style="headerClassFile"
                      :cell-style="cellFontStyle"
                    >
                      <el-table-column prop="fileName" label="文件名称" width="400" align="center"></el-table-column>
                      <el-table-column
                        prop="isParseFlag"
                        label="文件状态"
                        width="100"
                        align="center"
                        v-if="isShowColumn"
                      >
                        <template v-slot="scope">
                          <div
                            :style="{
                              color:
                                scope.row.isParseFlag == 1 ? 'orange' : scope.row.isParseFlag == -1 ? 'red' : 'green',
                            }"
                          >
                            <span>{{
                              scope.row.isParseFlag == 1 ? "已解析" : scope.row.isParseFlag == 0 ? "未解析" : "解析错误"
                            }}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="operate" label="操作" align="center">
                        <template v-slot="scope">
                          <el-button
                            class="buttonClassLogo"
                            style="
                              background-color: transparent;
                              color: rgba(109, 187, 230, 0.8);
                      
                            "
                            size="mini"
                            icon="el-icon-delete"
                            @click="deleteFile(scope.row)"
                          >
                            <span style="font-size: 14px">删除</span>
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-row style="text-align: center; margin-top: -20px; float: right">
                      <el-button
                        class="buttonClassLogoColor"
                        :disabled="exitShowButton"
                        @click="
                          function () {
                            uploadFileDialogVisible = false;
                          }
                        "
                        size="small"
                        style="
                          font-size: 14px;
                          background-image: linear-gradient(to right, rgb(14, 108, 234), rgb(0, 213, 234));
                     
                          color: white;
                 
                        "
                        >退出查看</el-button
                      >
                    </el-row>
                  </el-dialog>
                </el-row>
              </el-upload>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="left" width="190">
          <template v-slot="scope">
            <span slot="tip" class="el-upload__tip" style="font-size: 14px; color: #6dbbe6"
              >允许上传“{{ scope.row.fileType }}”</span
            >
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  UploadMultipartFile,
  GetModelFileAttrListByModelBasicId,
  GetModelFileAttrListByCondition,
  DeleteModelFileAttrById,
  GetModelBasicById,
} from "@/api/rem/dispenseIndex.js";
export default {
  name: "fileUpload",
  props: ["modelBasicId"],
  data() {
    return {
      isShowColumn: false,
      fileLoading: false,
      fileDeleteLoading: false,
      exitShowButton: false, //退出查看按钮禁用
      uploadFileDialogVisible: false, //查看已上传文件（优化前）dialog
      tableData: [
        {
          fileType: ".A文件", //文件类型
          uploadedFileNum: 0, //上传文件数量
          operate: "", //操作
          fileName: "历史.A文件", //文件提醒名称
          accept: ".A*", //允许上传文件类型
          //limit: 1,              //限制文件上传数量
          fileTypeDatabase: "FA", //数据库中所存放的数据类型
          fileUploadName: [], //已上传文件名称
          //fileList:[],            //文件列表
        },
        {
          fileType: ".F文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "历史.F文件",
          accept: ".F*",
          limit: 3,
          fileTypeDatabase: "FF",
          fileUploadName: [],
          //fileList:[],
        },
        {
          fileType: ".pkl文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "训练模型文件",
          accept: ".pkl",
          limit: 1,
          fileTypeDatabase: "FT",
          fileUploadName: [],
          //fileList:[],
        },
        {
          fileType: ".dat文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "summary文件",
          accept: ".dat",
          limit: 1,
          fileTypeDatabase: "FY",
          fileUploadName: [],
          //fileList:[],
        },
        {
          fileType: ".GRDECL文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "grdecl文件",
          accept: ".GRDECL",
          limit: 1,
          fileTypeDatabase: "FN",
          fileUploadName: [],
          //fileList:[],
        },
        {
          fileType: ".FEGRID文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "fegrid文件",
          accept: ".FEGRID",
          limit: 1,
          fileTypeDatabase: "FD",
          fileUploadName: [],
          //isShowParseFlag:0,
          //fileList:[],
        },
        {
          fileType: ".xlsx文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "调控参数文件",
          accept: ".xlsx",
          limit: 1,
          fileTypeDatabase: "FR",
          fileUploadName: [],
          //isShowParseFlag:0,
          //fileList:[],
        },
        {
          fileType: ".dat文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "schedule文件",
          accept: ".dat",
          limit: 1,
          fileTypeDatabase: "FH",
          fileUploadName: [],
          //isShowParseFlag:0,
          //fileList:[],
        },
        {
          fileType: ".dat 或 .txt文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "小层划分文件",
          accept: ".txt,.dat",
          limit: 1,
          fileTypeDatabase: "FC",
          fileUploadName: [],
          isShowParseFlag: 1,
          //fileList:[],
        },
        {
          fileType: ".xlsx文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "井名对应文件",
          accept: ".xlsx",
          limit: 1,
          fileTypeDatabase: "FB",
          fileUploadName: [],
          //isShowParseFlag:0,
          //fileList:[],
        },
        {
          fileType: ".xlsx文件",
          uploadedFileNum: 0,
          operate: "",
          fileName: "固定制度文件",
          accept: ".xlsx",
          limit: 1,
          fileTypeDatabase: "FG",
          fileUploadName: [],
          //isShowParseFlag:0,
          //fileList:[],
        },
      ],
      //接收方案信息
      modelBasicInfo: {
        modelBasicId: "",
        modelStep: "",
        fileNum: "",
        modelSubmitNum: "",
      },
      //查看已上传文件
      uploadFileList: [],
      //其他
      caseFlag: null,
      fileTypeCustom: "", //接收文件类型
      fileList: [],
      certinfoKey: "",
      reId: "",
      rowIndex: "",
      uploadFileCountF: 0, //已上传 .F 文件数量
      userFileCountF: 0, //用户限制 .F 文件数量
      fileCount: {
        faCount: "", //1
        ffCount: "", //2
        ftCount: "", //3
        fyCount: "", //4
        fnCount: "", //5
        fdCount: "", //6
        frCount: "", //7
        fhCount: "", //8
        fcCount: "", //9
        fbCount: "", //10
        fgCount: "", //11
      },
      uploadFlag: 0,
      file: [],
    };
  },
  mounted() {
    this.receiveId();
  },
  methods: {
    //控制dialog展示
    // dialogShowF(){
    //   this.uploadFileDialogVisible=false;
    // },

    //表格表头样式
    headerClass({ column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        this.$nextTick(() => {
          if (document.getElementsByClassName(column.id).length !== 0) {
            document.getElementsByClassName(column.id)[0].setAttribute("rowSpan", 2);
            return false;
          }
        });
      }
      if (rowIndex === 1 && (columnIndex === 0 || columnIndex === 1)) {
        return {
          display: "none",
          border: "none !important",
        };
      }
      return (
        "background-color:transparent!important;" +
        "color:white;" +
        "font-size:14px!important" +
        "text-align:center!important"
      );
    },

    //查看文件表格表头样式
    headerClassFile() {
      return (
        "background-color:transparent!important;" + "color:white;" + "font-size:14px" + "text-align:center!important"
      );
    },
    //解析状态文字颜色
    cellFontStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.isParseFlag === "解析错误" && columnIndex === 1) {
        return "color: red";
      } else if (row.isParseFlag === "未解析" && columnIndex === 1) {
        return "color: orange";
      } else {
        return "";
      }
    },
    // //表格行样式
    // tableCellStyle(){
    //   return 'height:10px'
    // },
    //接收父组件的modelBasicId
    receiveId() {
      this.reId = this.modelBasicId;
    },

    //修改FileList 的值
    changeFileList() {
      this.fileList = [];
    },
    //得到表格行的ID
    choose(index, row) {
      this.fileList = [];
      this.rowIndex = index;
      this.fileTypeCustom = row.fileTypeDatabase;
      const param = {
        modelBasicId: this.modelBasicId,
        fileType: this.fileTypeCustom,
      };
      GetModelFileAttrListByCondition(param)
        .then((res) => {
          this.uploadFileList = res.result.fileList;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //jlj——钩子函数
    //文件上传钩子函数
    // on-preview	    点击文件列表中已上传的文件时的钩子	function(file)
    // on-remove	    文件列表移除文件时的钩子	function(file, fileList)
    // on-success	    文件上传成功时的钩子	function(response, file, fileList)
    // on-error	      文件上传失败时的钩子	function(err, file, fileList)
    // on-progress	  文件上传时的钩子	function(event, file, fileList)
    // on-change	    文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
    // before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	function(file)
    // before-remove	删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    // on-exceed	    文件超出个数限制时的钩子	function(files, fileList)

    //控制文件上传前||后
    modelUploadChildF() {
      //接收modelBasicId
      const param = {
        modelBasicId: this.modelBasicId,
        dataFlag: 0,
      };
      console.log("文件上传接收父组件传过来的id", this.modelBasicId);
      GetModelFileAttrListByModelBasicId(param)
        .then((res) => {
          console.log(param);
          this.tableData[0].uploadedFileNum = res.result.uploadFileList.FA.length;
          this.tableData[1].uploadedFileNum = res.result.uploadFileList.FF.length;
          this.tableData[2].uploadedFileNum = res.result.uploadFileList.FT.length;
          this.tableData[3].uploadedFileNum = res.result.uploadFileList.FY.length;
          this.tableData[4].uploadedFileNum = res.result.uploadFileList.FN.length;
          this.tableData[5].uploadedFileNum = res.result.uploadFileList.FD.length;
          this.tableData[6].uploadedFileNum = res.result.uploadFileList.FR.length;
          this.tableData[7].uploadedFileNum = res.result.uploadFileList.FH.length;
          this.tableData[8].uploadedFileNum = res.result.uploadFileList.FC.length;
          this.tableData[9].uploadedFileNum = res.result.uploadFileList.FB.length;
          this.tableData[10].uploadedFileNum = res.result.uploadFileList.FG.length;
          //this.uploadFileCountF = res.result.uploadFileList.FF.length
          console.log("HOUDUAN", res.result.uploadFileList);

          this.fileCount.faCount = res.result.uploadFileList.FA.length;
          this.fileCount.ffCount = res.result.uploadFileList.FF.length;
          this.fileCount.ftCount = res.result.uploadFileList.FT.length;
          this.fileCount.fyCount = res.result.uploadFileList.FY.length;
          this.fileCount.fnCount = res.result.uploadFileList.FN.length;
          this.fileCount.fdCount = res.result.uploadFileList.FD.length;
          this.fileCount.frCount = res.result.uploadFileList.FR.length;
          this.fileCount.fhCount = res.result.uploadFileList.FH.length;
          this.fileCount.fcCount = res.result.uploadFileList.FC.length;
          this.fileCount.fbCount = res.result.uploadFileList.FB.length;
          this.fileCount.fgCount = res.result.uploadFileList.FG.length;
        })
        .catch((err) => {
          console.log(err);
        });
      //通过方案ID查询一个方案信息
      GetModelBasicById(param)
        .then((res) => {
          this.modelBasicInfo.modelStep = res.result.modelBasicEntity.modelStep;
          this.modelBasicInfo.modelSubmitNum = res.result.modelBasicEntity.modelSubmitNum;
          this.modelBasicInfo.fileNum = res.result.modelBasicEntity.fileNum;
          //this.tableData[1].limit = res.result.modelBasicEntity.fileNum
          //this.userFileCountF = res.result.modelBasicEntity.fileNum
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //文件数量超出提醒     this.uploadFileCountF
    handleExceed(file, fileList, row, index) {
      //this.$message.warning(`本次选择了 ${file.length} 个文件，共选择了 ${file.length + fileList.length} 个文件`)

      //this.tableDataF[1].limit = this.caseInfo.fileNum
      //this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
      //需要获取到数据库中 .F 文件的数量，如果数量为空，则可以继续上传文件！！！
      /**
       * 问题----如果文件已经上传成功，将文件删除之后，不能再继续上传
       */
      //判断 .F 文件数量，根据数量限制判断进行提醒
    },

    /* ++++ 已解决
     * 1、如果文件已经上传，将不再上传-------若有重复文件，用户需要重新选择文件再上传
     * 2、控制每一行的手动上传只能上传符合该行的文件上传类型
     * */

    //文件状态改变函数
    handleChange(file, fileList, row, index) {
      this.fileList = [];
      this.fileList = fileList;
      this.file = file;
      console.log("file", file);
      console.log("row", row);
      console.log("fileList", this.fileList);
      /**
       * 1. 第一次上传 ———— 如果选择的文件超过用户定义的文件 --- 提醒+清空
       * 2. 如果已上传过文件 ———— 再次选择的文件+数据库已有文件 不能超过用户所限制的数量
       */
      //debugger
      // var fileSumCount = this.fileList.length + this.fileCount.ffCount
      // console.log("fileSumCount",fileSumCount)

      //当用户每次选择超过三个文件时提醒并清空，
      //当用户上传文件总数不够时，
      // if (index === 1) {
      //   setTimeout(() => {
      //     if ((this.fileList.length + this.fileCount.ffCount) > this.userFileCountF) {
      //       //console.log("fileSumCount   if",fileSumCount)
      //       this.$message.warning(`该类型限制上传 ${this.userFileCountF} 个文件`)
      //       this.fileList = []
      //     }
      //     setTimeout(() => {
      //       if (this.fileList.length > 3) {
      //         this.$message.warning(`请每次上传 3 个文件`)
      //         this.fileList = []
      //       }
      //     }, 1)
      //     this.modelUploadChildF()
      //     setTimeout(() => {
      //       if (this.fileCount.ffCount != this.modelBasicInfo.fileNum) {
      //         this.$message.warning(`需上传 ${this.userFileCountF} 个文件，已上传  ${this.fileCount.ffCount} 个文件`)
      //       }
      //     }, 1)
      //   }, 1000)
      // }
      if (index === 1) {
        setTimeout(() => {
          if (this.fileList.length > 3) {
            this.$message.warning(`请每次上传 3 个文件`);
            this.fileList = [];
          }
        }, 1);
      } else if (index === 2) {
        if (this.fileList.length + this.fileCount.ftCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 3) {
        if (this.fileList.length + this.fileCount.fyCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 4) {
        if (this.fileList.length + this.fileCount.fnCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 5) {
        if (this.fileList.length + this.fileCount.fdCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 6) {
        if (this.fileList.length + this.fileCount.frCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 7) {
        if (this.fileList.length + this.fileCount.fhCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 8) {
        if (this.fileList.length + this.fileCount.fcCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 9) {
        if (this.fileList.length + this.fileCount.fbCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      } else if (index === 10) {
        if (this.fileList.length + this.fileCount.fgCount > 1) {
          this.$message.warning(`该类型限制上传 ${row.limit} 个文件`);
          this.fileList = [];
        }
      }
      console.log("++++++++++", this.fileList.length + this.fileCount.ffCount);
      console.log("00", this.userFileCountF);
      //console.log("upload", this.$refs.upload)
      // if (index === 1) {
      //   if (this.uploadFileCountF === 0) {
      //     if (fileList.length > row.limit) {
      //       row.limit = this.userFileCountF;
      //       this.$message.warning(`该类型限制上传 ${row.limit} 个文件`)
      //     } else {
      //       this.handleChange(file, fileList)
      //     }
      //     this.modelUploadChildF()
      //   } else {
      //     let ll = this.uploadFileCountF + fileList.length;
      //     if (ll > row.limit) {
      //       this.$message.warning(`该类型限制上传 ${row.limit} 个文件`)
      //     } else {
      //       this.handleChange(file, fileList)
      //     }
      //   }

      // } else if (index != 0 && index != 1) {
      //   this.$message.warning(`该类型限制上传 ${row.limit} 个文件`)
      // }

      //判断文件类型上传
      if (index === 0) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes(".A")) {
            console.log("ok");
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`);
            this.fileList = [];
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes(".F")) {
            console.log("ok");
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`);
            this.fileList = [];
          }
        }
      } else if (index === 8) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes(".dat") || this.fileList[i].name.includes(".txt")) {
            console.log("ok");
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`);
            this.fileList = [];
          }
        }
      } else {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes(row.accept)) {
            console.log("ok");
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`);
            this.fileList = [];
          }
        }
      }
    },

    //判断文件是否重复
    isRepeatedFile() {
      //let fileType = file.name.substring(file.name.lastIndexOf(".") + 1)//获取上传文件的后缀名
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList.length != 0) {
          for (let j = 0; j < this.uploadFileList.length; j++) {
            console.log("this.fileList+++++++", this.fileList[i].name);
            //console.log('this.fileList[i].name/*/*/*/*/*/*/*/*/*',this.fileList[i].name)
            if (this.fileList[i].name === this.uploadFileList[j].fileName) {
              console.log("111111111" + this.fileList[i].name + "  " + this.uploadFileList[j].fileName);
              this.$message.warning(this.fileList[i].name + "文件重复");
              //this.fileList[i].slice();
              this.$delete(this.fileList, i);
            }
          }
        }
      }
    },

    //多文件上传
    uploadFiles(row, index) {
      if (this.fileList.length === 0) {
        return this.$message.warning("请选择文件后再上传！");
      }
      if (this.rowIndex === index) {
        //.$refs.upload.submit()
        // this.lookUploadFile()
        this.isRepeatedFile();

        //限制 .F 文件数量写在这里？？？--- 已解决
        this.fileLoading = true;
        this.$emit("parseSureButtonTrue");
        //this.$parent.parseSureBtnDisableTrue()

        // 下面的代码将创建一个空的FormData对象:
        let formData = new FormData();
        // 可以使用FormData.append来添加键/值对到表单里面；
        this.fileList.forEach((file) => {
          formData.append("file", file.raw);
        });
        // 添加自定义参数，不传可删除
        formData.append("modelBasicId", this.modelBasicId);
        formData.append("fileType", row.fileTypeDatabase);
        formData.append("uploadFlag", this.uploadFlag);
        UploadMultipartFile(formData)
          .then((res) => {
            if (res.code === 0) {
              this.fileLoading = false;
              this.$emit("parseSureButtonFalse");
              //this.$parent.parseSureBtnDisableFalse()
              this.$message.success("文件上传成功");
              //接收modelBasicId
              this.modelUploadChildF();
            } else {
              this.fileLoading = false;
              this.$emit("parseSureButtonFalse");
              //this.$parent.parseSureBtnDisableFalse()
              this.$message.error("文件上传失败");
            }
            //清空fileList
            this.fileList = [];
          })
          .catch((err) => {
            this.fileLoading = false;
            this.fileList = [];
            this.$emit("parseSureButtonFalse");
            console.log(err);
            console.log("文件进行修改了==========");
            this.$message.error("文件有修改！请保存后重新上传！");
            setTimeout(() => {
              this.$message.warning("请将文件保存关闭后上传！\n 若文件未保存，上传仍为修改前文件");
            });
          });
      } else {
        this.$message.warning("请选择合适的上传按钮");
      }
    },

    //获取上传文件类型
    updateFileType(row, index) {
      this.fileTypeCustom = row.fileTypeDatabase;
      //this.$emit('fatherDialogShowF')
      this.uploadFileDialogVisible = true;
      console.log("index---------", index);
      if (index == 0 || index == 1 || index == 8) {
        this.isShowColumn = true;
      } else {
        this.isShowColumn = false;
      }
      // if (this.uploadFileDialogVisible === false) {
      //   this.$emit('fatherDialogCloseF')
      // }
      this.lookUploadFile();
    },

    //查看已上传文件
    lookUploadFile() {
      const param = {
        modelBasicId: this.modelBasicId,
        fileType: this.fileTypeCustom,
      };
      GetModelFileAttrListByCondition(param)
        .then((res) => {
          console.log(param);
          console.log(res);
          this.uploadFileList = res.result.fileList;
          console.log("已上传", this.uploadFileList);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //通过fileAddressId删除文件
    deleteFile(row) {
      this.fileDeleteLoading = true;
      this.exitShowButton = true;
      const param = {
        modelFileAttributeId: row.modelFileAttributeId,
      };
      DeleteModelFileAttrById(param)
        .then((res) => {
          console.log(res);
          //this.$message.success(res.message)
          this.$message.success("删除成功");

          this.$emit("aa");

          console.log("this.$parent+++++++++++++++++++++", this.$parent.$parent.$parent);
          this.lookUploadFile();
          this.modelUploadChildF();
          this.fileDeleteLoading = false;
          this.exitShowButton = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // //点击确定之后 传---------------校验是否每行都传了文件
    // sureClickAfter(){
    //   this.modelDialogVisibleF = false
    //   const param = {
    //     caseId: this.caseInfo.caseId
    //   }
    //   ParseFiles(param).then(res => {
    //     //将caseId传到后端，暂时不需要做什么工作
    //   }).catch(err => {
    //     console.log(err)
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>

</style>
