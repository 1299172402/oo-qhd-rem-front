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
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="wellboreName" label="井筒" width="120"></el-table-column>
                    <el-table-column prop="interceptBeginDate" label="开始时间" width="140">
                        <template slot-scope="scope">
                            <span>{{scope.row.interceptBeginDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interceptEndDate" label="完成时间" width="140">
                        <template slot-scope="scope">
                            <span>{{scope.row.interceptEndDate | dateTimeFormat}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interceptLayer" label="层位" width="140"></el-table-column>
                    <el-table-column prop="topDepth" :label="`段顶深\n (m)`" width="140"></el-table-column>
                    <el-table-column prop="bottomDepth" :label="`段底深\n (m)`" width="140"></el-table-column>
                    <el-table-column prop="checkPosition" label="计量位置"></el-table-column>
                    <el-table-column prop="oilDaily" :label="`日产油量\n (m³)`" width="140"></el-table-column>
                    <el-table-column prop="gasDaily" :label="`日产气量\n (m³)`" width="140"></el-table-column>
                    <el-table-column prop="waterDaily" :label="`日产水量\n (m³)`" width="140"></el-table-column>
                    <el-table-column prop="waterRatio" :label="`含水率\n (%)`" width="140"></el-table-column>
                    <el-table-column prop="fluidDailyRatio" :label="`日产液占比\n (%)`" width="140"></el-table-column>
                    <el-table-column prop="gasProdUnderWell" :label="`井下产气\n (m³)`" width="140"></el-table-column>
                    <el-table-column prop="interceptResult" label="解释结论" width="240"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="240"></el-table-column>
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
        height:calc(100% - 100px);
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
