<template>
  <div class="tablebody">
    <!-- 上传优化后文件 -->
      <!-- <el-image :src="require('@/icons/svg/tableHeader.png')"
                style="position:absolute;top: 45px;height: 35px;width: 675px"></el-image> -->
      <el-table v-loading="fileLoading" element-loading-text="上传中"
                element-loading-background="rgb(0, 40, 80, 0.6)"
                :data="tableData"
                :header-cell-style="headerClass">
        <el-table-column prop="fileName" label="文件类型"  min-width="40"  align="center" ></el-table-column>
        <el-table-column prop="uploadedFileNum" label="已上传文件个数" min-width="45" align="center">
          <template v-slot="scope">
            {{ scope.row.uploadedFileNum }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="235">
          <el-table-column align="right">
            <template v-slot="scope">
              <!-- 路由跳转 -->
              <el-row >
                <el-upload style="border: none !important;"
                    class="upload-file"
                    ref="upload"
                    action=""
                    :multiple="true"
                    :show-file-list="false"
                    :auto-upload="false"
                    :accept="scope.row.accept"
                    :file-list="fileList"
                    :on-change="(file,fileList)=>{return handleChange(file, fileList, scope.row, scope.$index)}">
                    
                    <el-row type="flex" justify="space-around">
                      <el-button
                             style="width:65px;height:25px;line-height:10px;padding-left:10px;background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                             size="mini" icon="el-icon-thumb" @click="choose(scope.$index,scope.row)">
                    <span style="font-size:13px">选择</span>
                  </el-button>
                  <el-button class="buttonClassLogo"
                      style="width:65px;height:25px;line-height:10px;margin-left: 5px;padding-left:10px;background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                      size="mini" icon="el-icon-upload2"
                      @click.stop="uploadFiles(scope.row,scope.$index)">
                    <span style="font-size:13px;">上传</span>
                  </el-button>
                  <el-button 
                             size="mini" icon="el-icon-upload"
                             class="buttonClassLogo"
                             style="width:65px;height:25px;line-height:10px;margin-left: 5px;padding-left:10px;background-color: transparent;color: rgba(109,187,230,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                             @click.stop="updateFileType(scope.row)">
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
                        width="715px"
                        footer=""
                        style="text-align: center;margin-top: 180px;margin-left: 190px">
                      <el-image :src="require('@/icons/svg/tableHeader.png')"
                                style="position:absolute;  top:55px;left:28px;height: 40px;width: 655px"></el-image>
                      <el-table :data="uploadFileList" height="500" v-loading="fileDeleteLoading"
                                element-loading-text="删除中" element-loading-background="rgb(0, 40, 80, 0.6)"
                                style="width: 715px;top: -30px;font-size: 14px"
                                :header-cell-style="headerClassFile" :cell-style="cellFontStyle">
                        <el-table-column prop="fileName" label="文件名称" width="400"  align="center"></el-table-column>
                        <el-table-column prop="isParseFlag" label="文件状态" width="100" align="center">
                          <template v-slot="scope">
                            <div :style="{'color':scope.row.isParseFlag == 1? 'orange':scope.row.isParseFlag == -1? 'red' : 'green' }">
                              <span>{{ scope.row.isParseFlag == 1? "已解析": scope.row.isParseFlag == 0 ? "未解析" : "解析错误"}}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="operate" label="操作" align="center">
                          <template v-slot="scope">
                            <el-button class="buttonClassLogo"
                                style="background-color: transparent;color: rgba(109,187,230,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                                       size="mini" icon="el-icon-delete"
                                       @click="deleteFile(scope.row)">
                              <span style="font-size:14px">删除</span>
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-row style="text-align: center; margin-top: -10px;float: right">
                        <el-button :disabled="exitShowButton" @click="function(){ uploadFileDialogVisible = false }" 
                          size="small" type="primary"
                                   >退出查看</el-button>
                      </el-row>
                    </el-dialog>
                  </el-row>
                </el-upload>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column align="left" min-width="55">
            <template v-slot="scope">
              <span slot="tip" class="el-upload__tip" style="font-size: 14px;color: #6DBBE6" >允许上传“{{ scope.row.fileType }}”</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    <!--    <el-row style="text-align: center; margin-top: 20px">-->
    <!--      <el-button @click="sureClickAfterA"-->
    <!--                 style="font-size: 17px;-->
    <!--                   background-image:linear-gradient(to right,rgb(14,108,234), rgb(0, 213, 234));-->
    <!--                   border: 0px solid #136F93;-->
    <!--                   color: white;-->
    <!--                   width: 120px;-->
    <!--                   border-radius:0%;">确 定</el-button>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
import {
  UploadMultipartFile,
  GetModelFileAttrListByModelBasicId,
  GetModelBasicById, 
  GetModelFileAttrListByCondition, 
  DeleteModelFileAttrById
} from "@/api/rem/dispenseIndex";
export default {
  name: "fileUploadPredict",
  props:['modelBasicId'],
  data(){
    return{
      fileLoading:false,
      fileDeleteLoading:false,
      exitShowButton:false,
      uploadFileDialogVisible:false,  //查看已上传文件（优化后）dialog
      tableData: [
        {
          fileType: '.A文件',      //文件类型
          uploadedFileNum: 0,     //上传文件数量
          operate: '',            //操作
          fileName: "预测.A文件",  //文件提醒名称
          accept:'.A*',           //允许上传文件类型
          //limit:3,              //限制文件上传数量
          fileTypeDatabase:'BA',  //数据库中所存放的数据类型
          fileUploadName:[],      //已上传文件名称
          //fileList:[],            //文件列表
        },
        {
          fileType: '.F文件',
          uploadedFileNum: 0,
          operate: '',
          fileName: '预测.F文件',
          accept:'.F*',
          //limit:0,
          fileTypeDatabase:'BF',
          fileUploadName:[],
          //fileList:[],
        }
      ],
      //接收方案信息
      modelBasicInfo:{
        modelBasicId:"",
        modelStep:'',
        fileNum:'',
        modelSubmitNum:'',
      },
      //查看已上传文件
      uploadFileList:[],
      //其他
      currentFileList: [],
      fileAddLength:0,//添加文件数量
      caseFlag:null,
      fileTypeCustom:'',  //接收文件类型
      fileCaseFCount:'',  //接收创建注采方案时的.F文件数量
      fileList:[],
      reId: '',
      rowIndex: '',
      uploadFileCountF: 0,   //已上传 .F 文件数量
      userFileCountF: 0,     //用户限制 .F 文件数量
      uploadFlag: 1,
    }
  },
  mounted() {
    this.receiveId();
  },
  methods:{
    //表格表头样式
    headerClass({ column,rowIndex,columnIndex }){
      if(rowIndex===0 && columnIndex===0) {
        this.$nextTick(()=> {
          if(document.getElementsByClassName(column.id).length!==0) {
            document.getElementsByClassName(column.id)[0].setAttribute('rowSpan',2);
            return false
          }
        })
      }
      if(rowIndex===1 && (columnIndex===0 || columnIndex===1)) {
        return {display:'none',
          border:'none!important'}
      }
      return 'background-color:transparent!important;' +
          'color:white;' +
          'font-size:14px' +
          'text-align:center!important'
    },
    //查看文件表格表头样式
    headerClassFile() {
      return 'background-color:transparent!important;' +
          'color:white;' +
          'font-size:14px' +
          'text-align:center!important'
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
    //接收父组件的modelBasicId
    receiveId(){
      this.reId = this.modelBasicId;
    },

    //修改FileList 的值
    changeFileListA(){
      this.fileList = []
    }, 
    //得到表格行的ID
    //得到表格行的ID
    choose(index, row) {
      this.fileList = [];
      this.rowIndex = index;
      this.fileTypeCustom = row.fileTypeDatabase
      const param = {
        modelBasicId: this.modelBasicId,
        fileType: this.fileTypeCustom
      }
      GetModelFileAttrListByCondition(param).then(res => {
        this.uploadFileList = res.result.fileList;
      }).catch(err => {
        console.log(err)
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
    modelUploadChildA(){
      //接收caseId
      const param = {
        modelBasicId:this.modelBasicId,
        dataFlag:1
      }
      console.log("hou",this.modelBasicId)
      GetModelFileAttrListByModelBasicId(param).then(res => {
        console.log("houParam",param)
        this.tableData[0].uploadedFileNum = res.result.uploadFileList.BA.length
        this.tableData[1].uploadedFileNum = res.result.uploadFileList.BF.length
      }).catch(err => {
        console.log(err)
      });
      //通过方案ID查询一个方案信息
      // GetModelBasicById(param).then(res => {
      //   this.modelBasicInfo.modelStep = res.result.modelBasicEntity.modelStep
      // }).catch(err => {
      //   console.log(err)
      // });
    },

    //文件状态改变函数
    handleChange(file, fileList, row, index) {
      this.fileList = [];
      this.fileList = fileList;
      if (index === 1) {
        setTimeout(() => {
          if (this.fileList.length > 3) {
            this.$message.warning(`请每次上传 3 个文件`)
            this.fileList = []
          }
        }, 1)
      }
      //判断文件类型上传
      if (index === 0) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes('.A')) {
            console.log("ok")
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`)
            this.fileList = [];
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name.includes('.F')) {
            console.log("ok")
          } else {
            this.$message.warning(`允许上传 ${row.accept} 文件`)
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
            if (this.fileList[i].name === this.uploadFileList[j].fileName) {
              console.log("111111111" + this.fileList[i].name + "  " + this.uploadFileList[j].fileName);
              this.$message.warning(this.fileList[i].name + "文件重复");
              //this.fileList[i].slice();
              this.$delete(this.fileList, i)
            }
          }
        }
      }
    },
    //多文件上传
    uploadFiles(row,index) {
      //this.$refs.upload.submit()
      if (this.fileList.length === 0){
        return this.$message.warning('请选择文件后再上传！')
      }
      if(this.rowIndex === index) {
        this.isRepeatedFile();
        this.fileLoading = true
        this.$emit('parseSureButtonTrue')
        
        // 下面的代码将创建一个空的FormData对象:
        let formData = new FormData()
        // 你可以使用FormData.append来添加键/值对到表单里面；
        this.fileList.forEach((file) => {
          formData.append('file', file.raw)
        })
        // 添加自定义参数，不传可删除
        formData.append('modelBasicId', this.modelBasicId)
        formData.append('fileType', row.fileTypeDatabase)
        formData.append('uploadFlag',this.uploadFlag)
        UploadMultipartFile(formData).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.fileLoading = false
            this.$emit('parseSureButtonFalse')
            this.$message.success('文件上传成功');
            this.modelUploadChildA()
          } else {
            this.fileLoading = false
            this.$emit('parseSureButtonFalse')
            this.$message.error('文件上传失败');
          }
          //清空fileList
          this.fileList = []
        }).catch(err => {
          this.fileLoading = false
          this.fileList = []
          this.$emit('parseSureButtonFalse')
          console.log(err)
          console.log('文件进行修改了==========')
          this.$message.error('文件有修改！请保存后重新上传！')
          setTimeout( ()=>{
            this.$message.warning('请将文件保存关闭后上传！\n 若文件未保存，上传仍为修改前文件')
          })
        })
      }else{
        this.$message.warning('请选择合适的上传按钮')
      }
    },
    
    //获取上传文件类型
    updateFileType(row){
      this.fileTypeCustom = row.fileTypeDatabase
      this.uploadFileDialogVisible = true
      this.lookUploadFile()
    },
    //查看已上传文件
    lookUploadFile(){
      const param = {
        modelBasicId: this.modelBasicId,
        fileType: this.fileTypeCustom
      }
      GetModelFileAttrListByCondition(param).then(res => {
        this.uploadFileList  = res.result.fileList
      }).catch(err => {
        console.log(err)
      });
    },
    //通过fileAddressId删除文件
    deleteFile(row){
      this.fileDeleteLoading = true
      this.exitShowButton = true
      const param = {
        modelFileAttributeId: row.modelFileAttributeId
      }
      DeleteModelFileAttrById(param).then(res => {
        this.lookUploadFile()
        this.$message.success("删除成功！")
        this.$emit('aa')
        this.modelUploadChildA()
        this.fileDeleteLoading = false
        this.exitShowButton = false
      }).catch(err => {
        console.log(err)
      });
    },
    
  }
}
</script>

<style lang="scss" scoped>
.tablebody ::v-deep.el-table--border .el-table__cell {
    border-right:#012733 !important;
}
</style>