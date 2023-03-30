<!--井组动态分析——小层顶面构造图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px" placeholder="请选择" filterable clearable>
                <el-option v-for="item in position" :key="item.fieldLayerId" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-echarts">
            <el-carousel :interval="4000" height="570px" :autoplay="false" indicator-position="outside">
                <el-carousel-item v-for="(item, index) in imageList" ref="imageCaeousel" :key="index" style="height: 550px; overflow-y: auto;display: block">
                    <el-image :src="item" :fit="fitInfo" style="width: 100%" :preview-src-list="imageList">
                        <div slot="error"></div>
                    </el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    import {fieldLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {reservoirDataConstructureDaigramForWellGroup} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    export default {
        name: "smallLayerStructureDiagram",
        props: {
            //油田id
            oilFieldId: {},
            //区块id
            blockId: {},
            //层系id
            layerId: {},
            //井组id
            wellGroupId: {}
        },
        data() {
            return {
                //所选择的层位
                selectPosition: '',
                //层位所选择内容信息
                position: [],
                image: '',
                imageList: [],
            };
        },
        mounted() {
            //初始化调用搜索
            this.doSearch();
        },
        watch: {
            //监听层位信息，给其动态传值
            selectPosition(val) {
                this.$emit('childPara', this.selectPosition);
                this.OnChangeImage();
            }
        },
        methods: {
            //调用图片
            async doSearch() {
                await fieldLayers({oilFieldId:this.oilFeildId,wellGroupId:this.wellGroupId,}).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            if (!res.data.data.fieldLayers) {
                                this.position = [];
                                this.selectPosition = '';
                            }
                            this.position = res.data.data.fieldLayers;
                            if (!this.selectPosition && this.position[0]) {
                                if (this.position.find((item) => {return item.fieldLayerId == '26C4B92661D345969091868C256A7902'})) {
                                    this.selectPosition = '26C4B92661D345969091868C256A7902';
                                } else if (this.position.find((item) => { return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'})) {
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                                } else if (this.position.find((item) => {return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'})) {
                                    this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                } else if (this.position.find((item) => {return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'})) {
                                    this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
                                //this.selectPosition = '8CCB8A072D5D4677AFBDC091488A1AD7';
                                this.$emit('childPara', this.selectPosition);
                            }
                        } else {
                            this.position = [];
                            this.selectPosition = '';
                        }
                    } else {
                        this.position = [];
                        this.selectPosition = '';
                    }
                });
                let request = {
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    fieldLayerId: this.layerId,
                    wellGroupId: this.wellGroupId,
                };
                reservoirDataConstructureDaigramForWellGroup(request).then((res) => {
                    if (res.data.code == 200) {
                        let myImageList = res.data.data.layerPics;
                        console.log("reservoirDataConstructureDaigramForWellGroup==>", this.imageList);
                        for (let i = 0; i < myImageList.length; i++) {
                            if (myImageList[i].type && myImageList[i].data) {
                                this.selectPosition = myImageList[i].layerId;
                                break;
                            }
                        }
                        let imageMess = myImageList.find((item) => item.layerId == this.selectPosition);
                        if (!imageMess) {
                            this.image = '';
                            return;
                        }
                        this.imageList = [];
                        if (imageMess.data && imageMess.type) {
                            this.image = 'data:' + imageMess.type + ';base64,' + imageMess.data;
                            this.imageList.push('data:' + imageMess.type + ';base64,' + imageMess.data);
                        } else {
                            this.image = '';
                        }
                        console.log("reservoirDataConstructureDaigramForWellGroup==>R", this.imageList);
                    }
                });
            },
            //切换图片
            OnChangeImage() {
                this.image = '';
                let imageMess = this.imageList.find((item) => item.layerId == this.selectPosition);
                if (!imageMess) {
                    this.image = '';
                    return;
                }
                if (imageMess.data && imageMess.type){
                    this.image = 'data:' + imageMess.type + ';base64,' + imageMess.data;
                }else {
                    this.image = '';
                }
            },
            //下载
            doDownLoad() {
                let fileName = '小层顶面构造图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName = (layerMess.layerName ? layerMess.layerName : '') + fileName;
                }
                if (this.wellGroupName) {
                    fileName = this.wellGroupName + fileName;
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
        .z-search{
            height:60px;
            display: flex;
            align-items: center;
        }
        .z-echarts{
            padding-top:15px;
            padding-bottom:150px;
            width: 100%;
            flex:1;
        }
    }
</style>
