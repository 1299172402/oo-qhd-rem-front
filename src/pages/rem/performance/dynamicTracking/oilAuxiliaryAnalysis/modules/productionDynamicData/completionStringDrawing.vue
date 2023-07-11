<!--完井管柱图-->
<template>
    <!-- <div class="image-content">
        <div style="width:100%;height:100%;">
            <iframe style="height: 100%;width: 100%" :src="src"></iframe>
        </div>
    </div> -->
    <div class="z-main">
        <el-image :src="src">
            <div slot="error"></div>
        </el-image>
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
                fileId:'',
                filestrId:'',
                src:'',
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let params = {
                    operationId: this.wellId,
                    operationType: 'OILWJGZT',
                    readOne: 'one'
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
                    } else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            },
            //下载功能
            doDownLoad() {
                let fileName = '完井管柱图';
                let file_suffix=this.filestrId.split('.')[1];
                downFile(this.fileId).then(res=>{
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .image-content {
        width: 100%;
        height: calc(100% - 101px);
        overflow-y: scroll;
    }
    .z-main{
        width: 100%;
        height:calc(100% - 95px);
        overflow: auto;
        border: 1px solid #ddd;
        border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        display: flex;
        justify-content: center;
    }
</style>

