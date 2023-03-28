<!--产液剖面-->
<template>
    <div class="z-main">
        <div class="z-left-view">
            <iframe :src="image?(image+'#toolbar=0'):''" style="width:100%;height:100%;"></iframe>
        </div>
        <div class="z-right-view">
            <info-window infoWidth="100%" infoHeight="calc(100%)" headerTitle="产液剖面解释成果表">
                <el-table 
                    id="tableData"
                    :data="tableData" :border="false" :row-style="{ height: '0px' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                    style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                    <el-table-column type="index" label="序号" align="center"></el-table-column>
                    <el-table-column prop="wellboreName" label="井筒" align="center" width="120"></el-table-column>
                    <el-table-column prop="interceptBeginDate" label="开始时间" min-width="140" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.interceptBeginDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interceptEndDate" label="完成时间" min-width="140" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.interceptEndDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interceptLayer" label="层位" align="center" min-width="140"></el-table-column>
                    <el-table-column prop="topDepth" :render-header="renderHeader" label="段顶深 (m)" min-width="140" align="center"></el-table-column>
                    <el-table-column prop="bottomDepth" :render-header="renderHeader" label="段底深 (m)" min-width="140" align="center"></el-table-column>
                    <el-table-column prop="checkPosition" label="计量位置" align="center"></el-table-column>
                    <el-table-column prop="oilDaily" :render-header="renderHeader" label="日产油量 (m³)" align="center"></el-table-column>
                    <el-table-column prop="gasDaily" :render-header="renderHeader" label="日产气量 (m³)" align="center"></el-table-column>
                    <el-table-column prop="waterDaily" :render-header="renderHeader" label="日产水量 (m³)" align="center"></el-table-column>
                    <!-- 新加内容 不全 待补充 -->
                    <el-table-column prop="waterRatio" :render-header="renderHeader" label="含水率 (%)" align="center"></el-table-column>
                    <el-table-column prop="fluidDailyRatio" :render-header="renderHeader" label="日产液占比 (%)" align="center" min-width="140"></el-table-column>
                    <el-table-column prop="gasProdUnderWell" :render-header="renderHeader" label="井下产气 (m³)" align="center" min-width="140"></el-table-column>
                    <el-table-column prop="interceptResult" label="解释结论" align="center" min-width="240"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" min-width="240"></el-table-column>
                </el-table>
            </info-window>
        </div>
    </div>
</template>

<script>
    import {outProfileLoggingInterpretation} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    import {downFile} from "@/lib/remBase64Download.js";
    export default {
        filters: {
            /**
             * hwh
             * 处理事件格式
             * @param val
             * @returns {string|*}
             */
            dateTimeFormat(val) {
                if (val) {
                    return new Date(val).format('yyyy-MM-dd');
                } else {
                    return '-';
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
                tableData: [],
                image: '',
            };
        },
        mounted() {
            //初始化调用搜索
            this.doSearch();
        },
        methods: {
            /**
             * hwh
             * 根据父组件传递过来的参数进行查询
             */
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
                        this.tableData = res.data.data.outProfiles;
                    }
                });
            },
            /**
             * hwh
             * 下载
             */
            doDownLoad() {
                let fileName = '产液剖面';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                if (this.image) {
                    downFile(this.image, fileName);
                }
                exportExcel('#tableData', fileName);

            },
            /**
             * hwh el table 表格头 标题单位样式
             * @param h
             * @param column
             * @returns {*[]}
             */
            renderHeader(h, {
                column
            }) {
                let header = column.label.split(' ');
                return [h('p', [
                    h('p', {}, header[0]),
                    h('span', {}, header[1])
                ])];
            },
        }
    };
</script>

<style scoped lang="scss">
    .z-main{
        width: 100%;
        height:calc(100% - 86px);
        display: flex;
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
    ::v-deep .el-table .cell:empty::before {
        content: '-';
    }
</style>
