<!--区块动态分析——小层顶面构造图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable @change="selectChange">
                <el-option v-for="(item, index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-main">
            <page-panel-new style="height:100%;margin-top:0;" show-btn>
                <div class="z-container">
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
import { fieldOilLayers } from '@/api/oilDeposit/rem-02/primaryinfo.js';
// miniIo
import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
import {filePreview,downFile} from "@/components/upload/utils/file";
import FileSaver from "file-saver";
export default {
    props: {
        oilFieldId: {},
        blockId: {}
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
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            //初始化获取层段关系
            await fieldOilLayers({
                oilFieldId: this.oilFieldId,
                fieldId: this.blockId,
                wellId: ''
            }).then((res) => {
                if (res.data.code == 200) {
                    //层段数据
                    if (res.data.data) {
                        this.position = res.data.data.fieldLayers;
                        if (!this.selectPosition && this.position[0]) {
                            //this.selectPosition = this.position[0].fieldLayerId;
                            if (this.blockId == '6CD7342CA6DD418183A4B3BC38584F7C' || this.blockId == 'B440B47EE4D64C6CB56100AFE868DCA3') {
                                if (
                                    this.position.find((item) => {
                                        return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A';
                                    })
                                ) {
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
                            } else if (this.blockId == 'F35E226D47CE4B09B497B852D774D122') {
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
                        for(let i=0;i<this.mniIoFiles.length;i++){
                            let fileId = this.mniIoFiles[i].fileId;
                            downFile(fileId).then((res)=>{
                                let src=window.URL.createObjectURL(res);
                                this.imageList.push(src);
                            })
                        }
                    }
                }else {
                    this.$message.error("文件查询接口异常!");
                }
            });
        },
        //下载功能
        doDownLoad() {
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
        height:50px;
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
