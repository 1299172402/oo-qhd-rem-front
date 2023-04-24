<!--吸水剖面-->
<template>
    <div class="z-main">
        <div class="z-row" style="margin-right:20px;">
            <info-window infoWidth="100%" infoHeight="100%" headerTitle="吸水剖面测井结果图" isShowMaxBtn>
                <div class="z-draw">
                    
                </div>
            </info-window>
        </div>
        <div class="z-row">
            <info-window infoWidth="100%" infoHeight="100%" headerTitle="吸水剖面测井结果表" isShowMaxBtn>
                <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="calc(100% - 10px)">
                    <el-table-column prop="testWellTime" label="测井日期" align="center" width="120"></el-table-column>
                    <el-table-column prop="layerName" label="解释层位" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="dailyInj" :label="`吸水量\n(m³)`" min-width="80" align="center"></el-table-column>
                    <el-table-column prop="topDepth" :label="`顶界深度\n(m)`" min-width="80" align="center"></el-table-column>
                    <el-table-column prop="bottomDepth" :label="`底界深度\n(m)`" align="center" min-width="80"></el-table-column>
                    <el-table-column prop="startPress" :label="`启动压力\n(MPa)`" align="center" min-width="80"></el-table-column>
                    <el-table-column prop="apparentInjectivityIndex" :label="`视吸水指数\n(m³/(MPa·d))`" align="center" min-width="130"></el-table-column>
                    <el-table-column prop="waterInjectivityIndex" :label="`吸水指数\n(m³/(MPa·d))`" align="center" min-width="130"></el-table-column>
                    <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180"></el-table-column> -->
                </el-table>
            </info-window>
        </div>
    </div>
</template>

<script>
    import { outProfileLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import { downFile } from "@/lib/remBase64Download.js";
    import { exportExcel } from "@/lib/exportExcel.js";
    export default {
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
                image: '',
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                outProfileLoggingInterpretation(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.fileType;
                        let firstParty = 'data:' + type + ';base64,';
                        if (imgData) {
                            this.image = firstParty + imgData;
                        } else {
                            this.image = '';
                        }
                        //注意这里返回有水井和油井的区别
                        this.tableData = res.data.data.injectivityIndexs;
                    }
                })
            },
            doDownLoad() {
                let fileName = '产液剖面';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                if (this.image){
                    downFile(this.image, fileName);
                    exportExcel('#tableData', fileName);
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    .z-main{
        display: flex;
        height:calc(100% - 101px);
        .z-row{
            width:0;
            flex:1;
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
            .z-draw{
                height:100%;
                background-color: #b4c7e7;
            }
        }
    }
</style>
