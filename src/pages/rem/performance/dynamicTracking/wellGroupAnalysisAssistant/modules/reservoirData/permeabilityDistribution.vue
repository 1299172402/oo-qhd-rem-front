<!--渗透率分布图-->
<template>
    <div class="z-main">
        <div class="z-search">
            <el-select v-model="selectPosition" style="width: 220px" placeholder="请选择" filterable clearable>
                <el-option v-for="item in position" :key="item.fieldLayerId" :label="item.layerName" :value="item.fieldLayerId"></el-option>
            </el-select>
        </div>
        <div class="z-container">
            <el-col :span="14" style="overflow: auto;">
                <el-image :src="image">
                    <div slot="error"></div>
                </el-image>
            </el-col>
            <el-col :span="10">
                <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="100%">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="wellName" label="井号"> </el-table-column>
                    <el-table-column prop="fieldLayer" label="层位"> </el-table-column>
                    <el-table-column prop="permeability" label="渗透率 (%)"></el-table-column>
                </el-table>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {fieldLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
    import {permeabilityDistribution} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
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
                src:'',
                image: '',
                imageList: [],
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            async doSearch() {
                await fieldLayers({
                    oilFieldId: this.oilFeildId,
                    wellGroupId: this.wellGroupId,
                }).then((res) => {
                    if (res.data.code == 200) {
                        //层段数据
                        if (res.data.data) {
                            if (!res.data.data.fieldLayers) {
                                this.position = [];
                                this.selectPosition = '';
                            }
                            this.position = res.data.data.fieldLayers;
                            if (!this.selectPosition && this.position[0]) {
                                if (this.position.find((item) => {
                                        return item.fieldLayerId == '26C4B92661D345969091868C256A7902'
                                    })) {
                                    this.selectPosition = '26C4B92661D345969091868C256A7902';

                                } else if (this.position.find((item) => {
                                        return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
                                    })) {
                                    this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';

                                } else if (this.position.find((item) => {
                                        return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'
                                    })) {
                                    this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                                } else if (this.position.find((item) => {
                                        return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'
                                    })) {
                                    this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                                } else {
                                    this.selectPosition = this.position[0].fieldLayerId;
                                }
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
                permeabilityDistribution(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.permeabilityDetails;
                        this.imageList = res.data.data.layerPics;
                        let imageMess = this.imageList.find((item) => item.layerId == this.selectPosition);
                        if (!imageMess) {
                            this.image = '';
                            return;
                        }
                        if (imageMess.data && imageMess.type)
                            this.image = 'data:' + imageMess.type + ';base64,' + imageMess.data;
                        else {
                            this.image = '';
                        }
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '渗透率分布图';
                let layerMess = this.position.find((item) => item.fieldLayerId == this.selectPosition);
                if (layerMess) {
                    fileName = (layerMess.layerName ? layerMess.layerName : '') + fileName;
                }
                if (this.wellGroupName) {
                    fileName = this.wellGroupName + fileName;
                }
                downFile(this.image, fileName);
                exportExcel('#tableData', fileName);
            },
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
        .z-container{
            width: 100%;
            flex:1;
            height:0;
            display: flex;
            overflow-y: scroll;
        }
    }
</style>