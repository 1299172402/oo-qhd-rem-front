<!--饱和度测井-->
<template>
    <div class="z-main">
        <div class="z-left-view">
            <iframe :src="image?(image+'#toolbar=0'):''" style="width:100%;height:100%;"></iframe>
        </div>
        <div class="z-right-view">
            <info-window infoWidth="100%" infoHeight="calc(100%)" headerTitle="饱和度测井数据">
                <el-table 
                    id="tableData"
                    :data="tableData" :border="false" :row-style="{ height: '0px' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                    style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                    <el-table-column type="index" label="序号" fixed></el-table-column>
                    <el-table-column prop="wellBore" label="井号" width="140" fixed></el-table-column>
                    <el-table-column prop="beginDate" label="解释开始时间" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.beginDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="endDate" label="解释完成时间" width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.endDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="layerName" label="解释层位" width="140"></el-table-column>
                    <el-table-column prop="topDepth" :label="`顶界深度\n (m)`" width="140"></el-table-column>
                    <el-table-column prop="bottomDepth" :label="`底界深度\n (m)`" width="140"></el-table-column>
                    <el-table-column prop="originalWaterSaturation" :label="`含水饱和度\n (%)`" width="140"></el-table-column>
                    <el-table-column prop="waterSaturation" :label="`含油饱和度\n (%)`" width="140"></el-table-column>
                    <el-table-column prop="waterVeriation" :label="`含气饱和度\n (%)`" width="140"></el-table-column>
                    <el-table-column prop="conclusion" label="解释结论" min-width="180"></el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="180"></el-table-column>
                </el-table>
            </info-window>
        </div>
    </div>
</template>

<script>
    import { saturationLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        filters: {
            dateTimeFormat(val) {
                if (val) {
                    return new Date(val).format('yyyy-MM-dd');
                } else {
                    return '';
                }
            }
        },
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        data() {
            return {
                radio: 3,
                src: '../../static/img/oilAuxiliaryAnalysis/productionDynamicData/fluidProducingProfile.jpg',
                tableData: [],
                image: '',
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            //根据父组件传递过来的参数进行查询
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                saturationLoggingInterpretation(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.type;
                        let firstParty = 'data:' + type + ';base64,';
                        if (imgData) {
                            this.image = firstParty + imgData;
                        } else {
                            this.image = '';
                        }
                        this.tableData = res.data.data.saturationLoggingInterpretations;
                    }
                })
            },
            //下载
            doDownLoad() {
                let fileName = '饱和度测井';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                if (this.image) {
                    downFile(this.image,fileName);
                }
                exportExcel('#tableData',fileName);
            },
        }
    }
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 100px);
        display: flex;
        overflow: hidden;
        .z-left-view{
            width:600px;
            padding-right:40px;
            iframe{
                border: 1px solid #ddd;
                border-image: linear-gradient(180deg, rgba(0, 96, 166, 0.2), var(--onlyLightBlueColor)) 1 1;
            }
        }
        .z-right-view{
            flex:1;
            width:0;
        }
    }
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
