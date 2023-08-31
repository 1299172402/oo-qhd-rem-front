<!--油井辅助分析——地震剖面图-->
<template>
    <div class="z-main">
        <page-panel-new style="height:100%;margin-top:0;" show-btn>
            <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px;">上传时间：{{ uploadTime }}</div>
             <el-image :src="src" style="height: 100%;width: 100%;">
                <div slot="error"></div>
            </el-image>
        </page-panel-new>
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    // miniIo
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
            wellId: {},
            //区块id
            blockId:{}
        },
        data() {
            return {
                //mniIo
                fileId:'',
                filestrId:'',
                src:'',
                uploadTime: "", // 文件上传时间
            };
        },
        async mounted() {
            this.doSearch();
        },
        methods: {
            //获取图片
            doSearch() {
                this.imageList=[];
                let params ={
                    operationId:this.blockId,
                    operationType:'BLOCKDZPMT',
                    readOne:'one' 
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
                            this.uploadTime=res.data.data[0].uploadTime || "";
                            downFile(this.fileId).then((res)=>{
                                this.src=window.URL.createObjectURL(res);
                            })
                        }else{
                            this.fileId="";
                            this.filestrId="";
                            this.uploadTime="";
                            this.src="";
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //下载功能
            doDownLoad() {
                if(!this.fileId) {
                    this.$message.error('无可下载内容')
                    return
                }
                let fileName = '地震剖面图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName= layerMess.layerName +'-'+fileName;
                }
                let file_suffix=this.filestrId.split('.')[1];
                downFile(this.id).then(res=>{
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 95px);
        overflow: auto;
        // border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        display: flex;
        justify-content: center;
    }
</style>


