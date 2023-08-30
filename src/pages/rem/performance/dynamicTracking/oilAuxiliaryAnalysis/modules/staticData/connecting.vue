<!-- 连井剖面图 -->
<template>
    <div style="height:calc(100% - 95px);">
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <div v-if="uploadTime" style="position: absolute; left: 20px; top: 5px;">上传时间：{{ uploadTime }}</div>
                <div class="z-container">
                    <el-carousel :interval="4000" :autoplay="false" indicator-position="outside" arrow="hover" @change="carouselChange">
                        <el-carousel-item v-for="(item, index) in imageList" ref="imageCaeousel" :key="index" style="height: 100%; overflow-y: auto;">
                            <el-image :src="item" :fit="fitInfo" style="width: 100%" :preview-src-list="imageList">
                                <div slot="error"></div>
                            </el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </page-panel-new>
        </div>
    </div>
</template>

<script>
import { fieldOilLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
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
            //mniIo文件列表
            mniIoFiles:[],
            imageList: [],
            fitInfo:'cover',    
            uploadTime: "", // 文件上传时间
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            this.imageList=[];
            let params ={
                operationId:this.wellId,
                operationType:'REMLJPMT',
                readOne:'' 
            }
            queryRemUploadFileMinio(params).then((res) => {
                if (res.data.code == 200) {
                    if(res.data.data.length){
                        this.mniIoFiles=res.data.data;
                        this.uploadTime=res.data.data[0].uploadTime || "";
                        for(let i=0;i<this.mniIoFiles.length;i++){
                            let fileId = this.mniIoFiles[i].fileId;
                            downFile(fileId).then((res)=>{
                                let src=window.URL.createObjectURL(res);
                                this.imageList.push(src);
                            })
                        }
                    }else{
                        this.mniIoFiles=[];
                        this.uploadTime="";
                        this.imageList=[];
                    }
                }else {
                    this.$message.error("文件查询接口异常!");
                }
            });
        },
        //  轮播图片切换事件 
        carouselChange(newIndex) {
            let uploadTime = this.uploadTime;
            this.uploadTime = this.mniIoFiles[newIndex]?.uploadTime ? this.mniIoFiles[newIndex].uploadTime :  uploadTime;
        },
        //下载功能
        doDownLoad() {
            if(this.mniIoFiles.length <= 0) {
                this.$message.error('无可下载内容')
                return
            }
            let fileName = '连井剖面图';
            for(let i=0;i<this.mniIoFiles.length;i++){
                let fileId=this.mniIoFiles[i].fileId;
                let filestrId = this.mniIoFiles[i].filestrId;
                let file_suffix=filestrId.split('.')[1];
                downFile(fileId).then((res) => {
                    FileSaver.saveAs(res,`${fileName}-${i+1}.${file_suffix}`);
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .z-main {
        width: 100%;
        height: calc(100%);
        display: flex;
        flex-direction: column;
        .z-container{
            height: 100%; 
            ::v-deep .el-carousel{
                height:100%;
                .el-carousel__container{
                    height:100%;
                }
                .el-carousel__item{
                    overflow-x: hidden!important;
                    overflow-y: scroll!important;
                }
                .el-carousel__arrow{
                    background-color: rgba(31,45,61,.5);
                }
            }
        }
    }
</style>
