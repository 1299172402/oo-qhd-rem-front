<!-- 连井剖面图 -->
<template>
    <div style="height:calc(100% - 95px);">
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <div class="z-container">
                    <el-button style="position: absolute; height: 22px; padding: 0 16px; top: 5px;right:36px;" size="mini" class="commonBtn" @click="doDownLoad()">下载</el-button>
                    <el-carousel :interval="4000" :autoplay="false" indicator-position="outside" arrow="hover">
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
import { fieldOilLayers,getinjWellByGroupId } from '@/api/oilDeposit/rem-02/primaryinfo.js';
// miniIo
import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
import {filePreview,downFile} from "@/components/upload/utils/file";
import FileSaver from "file-saver";
export default {
    props: {
        //油田id
        oilFieldId: {},
        //区块id
        blockId: {},
        //井组id
        wellGroupId: {}
    },
    data() {
        return {
            //mniIo文件列表
            mniIoFiles:[],
            imageList: [],
            downid:'',
            fitInfo:'cover',
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            let wellid = '',blockid = ''
            if(this.blockId = '3FC9A818F5BC43B88270DB80BBB3018F'){
                blockid = ''
            }else{
                blockid = this.blockId;
            }
            let data = {
                blockId: blockid,
                ogfId: this.oilFieldId,
                wellGroupId: this.wellGroupId
            }
            getinjWellByGroupId(data).then((res)=>{
                wellid = res.data.data[0].injWellId
                this.imageList=[];
                let params ={
                    operationId:wellid,
                    operationType:'REMLJPMT',
                    readOne:''
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.mniIoFiles=res.data.data;
                            // this.downid = res.data?.data[0].fileId
                            for(let i=0;i<this.mniIoFiles.length;i++){
                                let fileId = this.mniIoFiles[i].fileId;
                                downFile(fileId).then((res)=>{
                                    let src=window.URL.createObjectURL(res);
                                    this.imageList.push(src);
                                })
                            }
                        }else{
                            this.imageList=[];
                        }
                    }else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
            })
           
        },
        // 下载功能
        doDownLoad() {
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
