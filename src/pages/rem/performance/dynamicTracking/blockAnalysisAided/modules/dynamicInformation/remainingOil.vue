<!--剩余油分布图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable clearable>
                <el-option v-for="(item,index) in position" :key="index" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div> 
        <div class="z-echarts">
            <el-image :src="image" style="width:100%;">
                <div slot="error"></div>
            </el-image>
        </div> 
    </div>
</template>

<script>
    import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {dynamicDataRemainingOilDistribution} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    export default {
        props: {
            oilFieldId: {},
            blockId: {}
        },
        data() {
            return {
                radio: 1,
                src: '',
                //选中层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
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
            async doSearch() {
                //初始化获取层段关系
                await fieldOilLayers({oilFieldId: this.oilFieldId,fieldId: this.blockId,wellId: '',}).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data) {
                            this.position = res.data.data.fieldLayers;
                            if (!this.selectPosition && this.position[0]) {
                                let isTrue=this.position.find((item) => {return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'})
                                if (isTrue){
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                }else{
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
                    layerId: this.selectPosition,
                }
                //获取图片组信息
                await dynamicDataRemainingOilDistribution(request).then((res) => {
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
            //切换图片
            OnChangeImage() {
                this.image = '';
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    layerId: this.selectPosition,
                }
                dynamicDataRemainingOilDistribution(request).then((res) => {
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
                let fileName = '含油饱和度分布图';
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
    }
</script>

<style lang="scss" scoped>
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        display:flex;
        flex-direction: column;
        padding-bottom:150px;
        .z-search{
            height:60px;
            display: flex;
            align-items: center;
            margin-bottom:15px;
        }
        .z-echarts{
            width: 100%;
            flex:1;
            overflow-y:scroll;
        }
    }
</style>



