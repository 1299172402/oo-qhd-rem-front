<!--钻完井报告-->
<template>
 <div style="height: 100%;width: 100%">
    <!-- <iframe :src="image?(image+'#toolbar=0'):''" style="width: 100%;height:100%;"></iframe> -->
    <!-- <el-row> -->
<!--    <img-->
<!--      style="height: 100%;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
<!--    <img-->
<!--      style="height: 100%; margin-left: 20px;border: #022743 solid 1px"-->
<!--      src="@/pages/rem/performance/dynamicTracking/oilAuxiliaryAnalysis/modules/drillingCompletion/u331.png"-->
<!--    />-->
     <iframe style="height: 86%;width: 100%" :src="url"></iframe>
    <!-- </el-row> -->
  </div>
</template>

<script>
import { testWellReport } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
import {filePreview} from "@/components/upload/utils/file";
import {addRemUploadFileMinio, queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
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
        url:''
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    //调用图片
    doSearch() {
        console.log('wellId',this.wellId)
        console.log('oilFeildId',this.oilFeildId)
        console.log('platform',this.platform)
        let params ={
            operationId:this.wellId,
            operationType:'SJZWJBG',
            readOne:'one'
        }
        queryRemUploadFileMinio(params).then((res) => {
            console.log('this.res',res)
            if (res.data.data.code == 200) {
                let data =res.data.data.rows[0].fileId
                filePreview(data).then((res)=>{
                    console.log(res)
                    this.url = res.data.data
                })
            }else {
                this.$message.error("文件查询接口异常!");
            }
        });
        
    },
    //下载
    doDownLoad() {
      let fileName = "试井报告";
      if (this.wellName) {
        fileName = this.wellName + fileName;
      }
      downFile(this.image, fileName);
    },
  },
};
</script>

<style scoped lang="scss">
.z-main {
  width: 100%;
  height: calc(100% - 101px);
  iframe {
    border: 1px solid #ddd;
    border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
  }
}
</style>
