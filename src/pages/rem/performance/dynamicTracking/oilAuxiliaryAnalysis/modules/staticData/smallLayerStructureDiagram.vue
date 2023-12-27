<!--油井辅助分析——小层顶面构造图-->
<template>
    <div style="height:calc(100% - 95px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable  @change="selectChange">
                <el-option v-for="(item, index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
            <div v-if="uploadTime" style="margin-left: 20px;">上传时间：{{ uploadTime }}</div>
        </div>
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
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
// import { fieldOilLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
import { fieldLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
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
            //mniIo文件列表
            mniIoFiles:[],
            //层位数据源
            position: [],
            //层位绑定值
            selectPosition: '',
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
            //初始化获取层段关系
            await fieldLayers({
                oilFieldId: this.oilFeildId,
                wellId: this.wellId
            }).then((res) => {
                // debugger
                if (res.data.code == 200) {
                    //层段数据
                    if (res.data.data) {
                        this.position = res.data.data.fieldLayers;
                        if (!this.selectPosition && this.position[0]) {
                            //this.selectPosition = this.position[0].fieldLayerId;
                            if (this.blockId == 'YCFXDY8B643EDC9007F96F570600457D' || this.blockId == '83D33B89B0DAB7DFA440BD060746883A') {
                                if (
                                    this.position.find((item) => {
                                        return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A';
                                    })
                                ) {
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
                            } else if (this.blockId == 'YCFXDY8B643EDC9007F96F570600458D') {
                                if (
                                    this.position.find((item) => {
                                        return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                    })
                                ) {
                                    this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                } else if (
                                    this.position.find((item) => {
                                        return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487';
                                    })
                                ) {
                                    this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
                            } else {
                                this.selectPosition = this.position[0].fieldLayerId;
                            }
                        }
                        this.$emit('childPara', this.selectPosition);
                    } else {
                        this.position = [];
                    }
                }
            });
            this.OnChangeImage();
        },
        //层位change
        selectChange(e){
            this.$emit('childPara', e);
            this.OnChangeImage();
        },
        //切换图片
        OnChangeImage() {
            this.imageList=[];
            let params ={
                operationId:this.blockId+'-'+this.selectPosition,
                operationType:'BLOCKXCDMGZT',
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
            let fileName = '小层顶面构造图';
            let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
            if (layerMess) {
                fileName= layerMess.layerName +'-'+fileName;
            }
            for(let i=0;i<this.mniIoFiles.length;i++){
                let fileId=this.mniIoFiles[i].fileId;
                let filestrId = this.mniIoFiles[i].filestrId;
                let file_suffix=filestrId.split('.')[1];
                downFile(fileId).then((res) => {
                    FileSaver.saveAs(res,`${fileName}.${file_suffix}`);
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .z-search{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .z-main {
        width: 100%;
        height: calc(100% - 50px);
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
