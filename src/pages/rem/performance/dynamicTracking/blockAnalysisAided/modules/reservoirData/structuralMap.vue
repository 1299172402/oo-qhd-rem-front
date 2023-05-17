<!--区块动态分析——小层顶面构造图-->
<template>
    <div style="height:calc(100% - 100px);">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable>
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
import { reservoirDataConstructureDaigram } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
import { downFile } from '@/lib/remBase64Download.js';
export default {
    props: {
        oilFieldId: {},
        blockId: {}
    },
    data() {
        return {
            selectPosition: '',
            //层位所选择内容信息
            position: [],
            src: '../../static/img/blockAnalysisAided/reservoirData/structuralMap.jpg',
            image: '',
            imageList: [],
            fitInfo:'cover',    
        };
    },
    watch: {
        //监听层位信息，给其动态传值
        selectPosition(val) {
            this.$emit('childPara', this.selectPosition);
            this.OnChangeImage();
        }
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async initData() {
            //初始化获取层段关系
            await fieldOilLayers({
                oilFieldId: this.oilFeildId,
                fieldId: this.blockId
            }).then((res) => {
                if (res.data.code == 200) {
                    //层段数据
                    this.position = res.data.data.fieldLayers;
                    this.selectPosition = this.position[0].fieldLayerId;
                }
            });
        },
        async doSearch() {
            //this.$emit('childPara','');
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
                            this.$emit('childPara', this.selectPosition);
                        }
                    } else {
                        this.position = [];
                    }
                }
            });
            //获取参数油田id 平台id 井id
            let request = {
                oilFieldId: this.oilFieldId,
                fieldId: this.blockId,
                layerId: this.selectPosition
            };
            //获取图片组信息
            await reservoirDataConstructureDaigram(request).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.layerPics) {
                        this.imageList = [];
                        if (res.data.data.layerPics.length > 0) {
                            let imageData = res.data.data.layerPics[0];
                            let type = imageData.type;
                            this.image = 'data:' + type + ';base64,' + imageData.data;
                            this.imageList.push(this.image);
                        } else {
                            this.image = '';
                        }
                    } else {
                        this.image = '';
                    }
                } else {
                    this.image = '';
                }
            });
        },
        //切换图片
        OnChangeImage() {
            this.image = '';
            let request = {
                oilFieldId: this.oilFieldId,
                fieldId: this.blockId,
                layerId: this.selectPosition
            };
            reservoirDataConstructureDaigram(request).then((res) => {
                if (res.data.code == 200) {
                    if (res.data.data.layerPics) {
                        if (res.data.data.layerPics.length > 0) {
                            let imageData = res.data.data.layerPics[0];
                            let type = imageData.type;
                            this.image = 'data:' + type + ';base64,' + imageData.data;
                        } else {
                            this.image = '';
                        }
                    } else {
                        this.image = '';
                    }
                } else {
                    this.image = '';
                }
            });
        },
        //单选按钮选中改变事件
        changeRadio() {
            this.$emit('childPara', this.selectPosition);
            this.OnChangeImage();
        },
        //下载功能
        doDownLoad() {
            let fileName = '构造图';
            let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
            if (layerMess) {
                fileName = (layerMess.layerName ? layerMess.layerName : '') + fileName;
            }
            if (this.blockName) {
                fileName = this.blockName + fileName;
            }
            downFile(this.image, fileName);
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
