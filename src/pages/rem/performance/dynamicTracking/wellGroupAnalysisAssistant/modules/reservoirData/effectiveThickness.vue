<!--有效厚层图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px" placeholder="请选择" filterable clearable>
                <el-option v-for="item in position" :key="item.fieldLayerId" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-echarts">
            <el-image :src="image">
                <div slot="error"></div>
            </el-image>
        </div>
    </div>
</template>

<script>
    import { effectiveThicknessDiagram} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import {fieldLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {downFile} from "@/lib/remBase64Download.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
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
                //层段数据
                await fieldLayers({oilFieldId: this.oilFeildId,wellGroupId: this.wellGroupId,}).then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.data) {
                            if (!res.data.data.fieldLayers) {
                                this.position = [];
                                this.selectPosition = '';
                            }else{
                                this.position = res.data.data.fieldLayers;
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
                                console.log('this.selectPosition',this.selectPosition)
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
                effectiveThicknessDiagram(request).then((res) => {
                    if (res.data.code == 200) {
                        this.imageList = res.data.data.layerPics;
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
                if (imageMess.data && imageMess.type) {
                    this.image = 'data:' + imageMess.type + ';base64,' + imageMess.data;
                } else {
                    this.image = '';
                }
            },
            //下载
            doDownLoad() {
                let fileName = '有效厚层图';
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
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 101px);
        display: flex;
        flex-direction: column;

        .z-search{
            height:60px;
            display: flex;
            align-items: center;
            margin-bottom:15px;
        }
        .z-echarts{
            width: 100%;
            flex:1;
            height:0;
            border: 1px solid #ddd;
            border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
            overflow-y: scroll;
        }
    }
</style>
