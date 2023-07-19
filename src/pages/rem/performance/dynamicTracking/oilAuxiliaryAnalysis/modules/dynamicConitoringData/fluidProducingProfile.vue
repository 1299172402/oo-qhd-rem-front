<!--产液剖面-->
<template>
    <div class="z-main">
        <div class="z-left-view">
            <page-panel-new style="width: 100%; height: 100%;margin-top: 0;" show-btn>
                <iframe style="height: 100%;width: 100%" :src="url"></iframe>
            </page-panel-new>
        </div>
        <div class="z-right-view">
            <page-panel style="width: 100%; height: 100%;margin-top: 0;" headerTitle="产液剖面解释成果表" show-btn>
                <el-table 
                    id="tableData"
                    :data="tableData" :border="false" :row-style="{ height: '0px' }"
                    header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                    style="width:100%;padding:0 10px;" height="calc(100% - 10px)" :default-sort="{ prop: 'date', order: 'descending' }"
                    :header-cell-style="{ 'text-align': 'center', padding: '0px 0'}">
                    <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
                    <el-table-column prop="wellboreName" label="井号" width="120" fixed></el-table-column>
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
            </page-panel>
        </div>
    </div>
</template>

<script>
    import {queryRemUploadFileMinio} from "@/api/rem/remuploadfileminio";
    import {filePreview} from "@/components/upload/utils/file";
    import {outProfileLoggingInterpretation} from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import {exportExcel} from "@/lib/exportExcel.js";
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
                id:'',
                fileName:'',
                url:'',
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let params = {
                    operationId: this.wellId,
                    operationType: 'OILCYPM',
                    readOne: 'one'
                }
                queryRemUploadFileMinio(params).then((res) => {
                    if (res.data.code == 200) {
                        if(res.data.data.length){
                            this.id = res.data.data[0].fileId;
                            this.fileName = res.data.data[0].filestrId;
                            filePreview(this.id).then((res) => {
                                this.url = res.data.data
                            })
                        }
                    } else {
                        this.$message.error("文件查询接口异常!");
                    }
                });
                //获取表格数据 
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                outProfileLoggingInterpretation(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.outProfiles;
                    }
                });
            },
            //下载
            doDownLoad() {
                let fileName = '产液剖面';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                exportExcel('#tableData', fileName);
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
            padding-right:20px;
            iframe{
                // border: 1px solid #ddd;
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
