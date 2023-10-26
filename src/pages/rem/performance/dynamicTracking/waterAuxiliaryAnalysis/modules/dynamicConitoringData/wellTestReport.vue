<!--试井报告-->
<template>
    <div class="z-main">
        <page-panel-new style="height: 100%; margin-top: 0;" show-btn>
            <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px;">上传时间：{{ uploadTime }}</div>
            <iframe style="height: 100%;width: 100%" :src="url"></iframe>
        </page-panel-new>
    </div>
</template>

<script>
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview,downFile} from "@/components/upload/utils/file";
    import FileSaver from "file-saver";
    export default {
      props: {
        //选择油田
        oilFeildId: {},
        //选择平台
        platform: {},
        //选择井号
        wellId: {}
      },
      data() {
        return {
            id:'',
            fileName:'',
            url:'',
            uploadTime: "", // 文件上传时间
        };
      },
      mounted() {
        this.doSearch();
      },
      methods: {
        //调用图片
        doSearch(){
            let params = {
                operationId: this.wellId,
                operationType: 'WATERSJBG',
                readOne: 'one'
            }
            queryRemUploadFileMinio(params).then((res) => {
                if (res.data.code == 200) {
                    if(res.data.data.length){
                        this.id = res.data.data[0].fileId;
                        this.fileName = res.data.data[0].filestrId;
                        // this.uploadTime=res.data.data[0].uploadTime || "";
                        filePreview(this.id).then((res) => {
                            this.url = res.data.data
                        })
                    } else {
                        this.fileId="";
                        this.fileName="";
                        this.uploadTime="";
                        this.url="";
                    }
                } else {
                    this.$message.error("文件查询接口异常!");
                }
            });
        },
        //下载功能
        doDownLoad() {
            if(!this.id) {
                this.$message.error('无可下载内容')
                return
            }
            let fileName = '试井报告';
            let file_suffix=this.fileName.split('.')[1];
            downFile(this.id).then(res=>{
                FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
            })
        }
      },
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 101px);
        iframe{
            // border: 1px solid #ddd;
            border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        }
    }
</style>