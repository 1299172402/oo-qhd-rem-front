<!--测井曲线-->
<template>
    <div class="z-main">
        <page-panel-new style="height:100%;margin-top:0;" show-btn>
            <div style="display: flex; justify-content: center; overflow: auto;width: 100%; height: 100%;">
                <el-image :src="src">
                    <div slot="error"></div>
                </el-image>
            </div>
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
        },
        data() {
            return {
                //mniIo
                fileId:'',
                filestrId:'',
                src:'',
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
                    operationId:this.wellId,
                    operationType:'WATERCJQX',
                    readOne:'one' 
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
                            downFile(this.fileId).then((res)=>{
                                this.src=window.URL.createObjectURL(res);
                            })
                        }else{
                            this.src="";
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //下载功能
            doDownLoad() {
                let fileName = '测井曲线图';
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
        // display: flex;
        // justify-content: center;
    }
</style>



