<!--开发调整方案-->
<template>
    <div class="z-main">
        <div class="z-echarts">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px;">上传时间：{{ uploadTime }}</div>
                <iframe style="width: 100%;height: 100%;border: none;" :src="url"></iframe>
            </page-panel-new>
        </div>
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
            oilFieldId: {},
            blockId: {},
        },
        data() {
            return {
                //mniIo
                fileId:'',
                filestrId:'',
                url:'',
                uploadTime: "", // 文件上传时间
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //获取图片
            doSearch() {
                let params ={
                    operationId:this.blockId,
                    operationType:'BLOCKKFTZFA',
                    readOne:'one' 
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.fileId=res.data.data[0].fileId;
                            this.filestrId=res.data.data[0].filestrId;
                            // this.uploadTime=res.data.data[0].uploadTime || "";
                            filePreview(this.fileId).then((res)=>{
                                this.url = res.data.data
                            })
                        } else {
                            this.fileId="";
                            this.filestrId="";
                            this.uploadTime="";
                            this.url="";
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
                let fileName = '开发调整方案';
                let file_suffix=this.filestrId.split('.')[1];
                downFile(this.id).then(res=>{
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        display:flex;
        flex-direction: column;
        padding-bottom:15px;
        .z-echarts{
            width: 100%;
            flex:1;
            // overflow-y:scroll;
            // border: 1px solid #ddd;
            border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
        }
    }
</style>

