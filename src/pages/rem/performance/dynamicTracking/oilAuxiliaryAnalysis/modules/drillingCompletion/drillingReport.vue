<!--钻完井报告-->
<template>
<!-- <div class="z-main" style="display: flex; justify-content: space-around">-->
<!--    &lt;!&ndash; <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:100%;"></iframe> &ndash;&gt;-->
<!--    &lt;!&ndash; <el-row> &ndash;&gt;-->
<!--    <img-->
<!--      style="height: 100%;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
<!--    <img-->
<!--        style="height: 100%;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
<!--    &lt;!&ndash; </el-row> &ndash;&gt;-->
<!--  </div>-->
    <page-panel-new style="height: 86%;width: 100%;margin-top: 0;" show-btn>
      <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px;">上传时间：{{ uploadTime }}</div>
      <iframe style="height: 100%;width: 100%" :src="url"></iframe>
    </page-panel-new>
</template>

<script>
import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
import {filePreview, downFile} from "@/components/upload/utils/file";
import FileSaver from "file-saver";
export default {
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
          image: "",
          url:'',
          id:'',
          fileName:'',
          uploadTime: "", // 文件上传时间
      };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
      doSearch() {
          let params ={
              operationId:this.wellId,
              operationType:'YJZWJBG',
              readOne:'one'
          }
          queryRemUploadFileMinio(params).then((res) => {
              if (res.data.code == 200 ) {
                  if(Array.isArray(res.data.data) && res.data.data.length){
                      let data =res.data.data[0].fileId;
                      this.id = res.data.data[0].fileId;
                      this.fileName = res.data.data[0].filestrId;
                      // this.uploadTime=res.data.data[0].uploadTime || "";
                      filePreview(data).then((res)=>{
                          this.url = res.data.data
                      })
                  }else{
                    this.id="";
                    this.fileName="";
                    this.uploadTime="";
                      this.url =''
                  }
              }else {
                  this.$message.error("文件查询接口异常!");
              }
          });

      },
      //下载
      doDownLoad() {
        if(!this.id) {
            this.$message.error('无可下载内容')
            return
        }
        let fileName = '钻完井报告';
        let file_suffix=this.fileName.split('.')[1];
        downFile(this.id).then(res=>{
          FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
        })
      },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  iframe {
    // border: 1px solid #ddd;
    border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
  }
}
</style>
