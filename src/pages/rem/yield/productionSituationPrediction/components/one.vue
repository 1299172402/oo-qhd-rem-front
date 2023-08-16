<!-- 作业公司产量跟踪 -->
<template>
    <div class="z-main" style="height:100%;">
        <div style="display: flex;justify-content: space-between;align-items: center;margin-bottom:15px;">
           <div>
                <span>滚动预测：</span>
                <el-select v-model="searchForm.rollingForecastDate" placeholder="请选择" style="width:200px;margin-right:15px;">
                    <el-option v-for="item in rollingForecastDateList" :key="item.source_ID" :label="item.source_NAME" :value="item.source_ID"></el-option>
                </el-select>
                <span>日期：</span>
                <!-- :picker-options="pickerOptions"  -->
                <el-date-picker v-model="searchForm.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="margin-right:15px;"></el-date-picker>
                <span>产量单位选择：</span>
                <el-select v-model="searchForm.unitType" placeholder="请选择" style="width:100px;margin-right:15px;">
                    <el-option v-for="item in unitTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
                <el-button class="commonBtn" icon="el-icon-refresh" style="margin-left:15px!important;margin-right:auto;" @click="resetting">重置</el-button>
           </div>
           <el-button icon="el-icon-download" type="primary" style="margin-bottom: 20px;" @click="doDownExcel('#tableData', '作业公司产量跟踪')">下载</el-button>
        </div>
        <el-table id="tableData" :data="tableData" highlight style="width:100%;" height="calc(100% - 58px)">
            <el-table-column fixed style="overflow-x:hidden;" prop="type" :label="outputTrackingTableDate" align="center" width="300"></el-table-column>
            <el-table-column label="作业公司" align="center">
                <el-table-column prop="zygsjc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="zygscs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="zygstz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="zygskf" label="开发井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="zygshj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <!-- QHD32-6 -->
            <el-table-column label="QHD32-6" align="center">
                <el-table-column prop="qhd326jc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd326cs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd326tz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd326hj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="CFD6-4" align="center">
                <el-table-column prop="cfd64jc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="cfd64cs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="cfd64tz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="cfd64hj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <!-- NB35-2 -->
            <el-table-column label="NB35-2" align="center">
                <el-table-column prop="nb352jc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="nb352cs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="nb352tz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="nb352hj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="BZ3-2" align="center">
                <el-table-column prop="bz32jc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="bz32cs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="bz32tz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="bz32hj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="QHD33-1" align="center">
                <el-table-column prop="qhd331jc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331cs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331tz" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331kf" label="开发井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331hj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
            <el-table-column label="QHD33-1S" align="center">
                <el-table-column prop="qhd331sjc" label="基础" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331scs" label="措施" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331stj" label="调整井" align="center" width="100">
                </el-table-column>
                <el-table-column prop="qhd331shj" label="合计" align="center" width="100">
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getReportFroms, getForecastDate} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import {exportExcel} from '@/lib/exportExcel.js';

    export default {
        data() {
            return {
                //滚动预测数据源
                rollingForecastDateList:[],
                oilFieldData: ['QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'],
                unitTypeList: [{label: "m³",value: "m",},{label: "t",value: "t",}],
                searchForm:{
                    rollingForecastDate:'',//滚动预测
                    date:new Date().addDays(-1).format('yyyy-MM-dd'),//日期
                    unitType:'m',//单位
                },
                pickerOptions: {
                  disabledDate(time) {
                    // 油田预测产量
                    var date = new Date();
                    var year = date.getFullYear();
                    var end_date = new Date(year, 12, 0);
                    var begin_date = new Date(year, date.getMonth(), date.getDate());
                    if (time >= begin_date && time <= end_date) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                },
                tableData: [],
                outputTrackingTableDate: '',
                allTableData: [
                    {
                        "type": '报表产量/',
                        code: 'baoBiao'
                    },
                    {
                        "type": '前一日报表产量/',
                        code: 'baoBiaoYesterday'
                    },
                    {
                        "type": '滚动预测/',
                        code: 'yuCe'
                    },
                    {
                        "type": '分公司奋斗/',
                        code: 'fenDou'
                    },
                    {
                        "type": '分公司考核/',
                        code: 'kaoHe'
                    },
                    {
                        "type": '报表产量-滚动预测产量',
                        code: 'baoBiaoYuCeDiff'
                    },
                    {
                        "type": '当日-前一日产量',
                        code: '当日-前一日产量'
                    },
                    {
                        "type": '下舱产量/',
                        code: '下舱产量/'
                    },
                    {
                        "type": '前一日下舱产量/',
                        code: '前一日下舱产量/'
                    },
                    {
                        "type": '下舱产量-滚动预测(/',
                        code: '下舱产量-滚动预测(/'
                    },
                    {
                        "type": '下舱产量-滚动预测奋斗(/',
                        code: '下舱产量-滚动预测奋斗(/'
                    },
                    {
                        "type": '下舱产量-分公司奋斗',
                        code: '下舱产量-分公司奋斗'
                    },
                    {
                        "type": '下舱产量-分公司考核',
                        code: '下舱产量-分公司考核'
                    },
                ],
            };
        },
        async mounted() {
            await this.getForecastDate();
            this.doSearch();
        },
        methods: {
            //重置
            resetting(){
            	this.$nextTick( async ()=>{
            		Object.assign(this.$data, this.$options.data());
                    await this.getForecastDate();
            		this.doSearch();
            	})
            },
            doSearch() {
                this.getReportFromsApi();
            },
            //获取滚动预测下拉框数据源
            async getForecastDate() {
                await getForecastDate().then((res) => {
                    if (res.data.code==200) {
                        this.rollingForecastDateList = res.data.data;
                        this.searchForm.rollingForecastDate = this.rollingForecastDateList[0].source_ID;
                    }
                    this.doSearch();
                });
            },
            getReportFromsApi() {
                // let queryParams = {
                //     date: this.searchForm.date,
                //     unitType: this.searchForm.unitType,
                // };
                getReportFroms(this.searchForm).then(res=> {
                    console.log(res,888)
                    if (res.data.code == '200') {
                        this.tableData = this.dealOutputTrackingData(res.data.data);
                        this.outputTrackingTableDate = this.searchForm.date;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '作业公司产量跟踪数据获取失败！',
                            type: 'error'
                        })
                    }
                })
            },
            dealOutputTrackingData(objData) {
                var reList = [];
                var keys = Object.keys(objData);
                if (keys == null || keys.length == 0) {
                    return reList;
                }
                keys.forEach((item, index) => {
                    var lineTitle = this.dealLineTitle(item);
                    if (lineTitle != null && lineTitle != '') {
                        let obj_keys = Object.keys(objData[item]);
            
                        this.oilFieldData.forEach(wellName => {
                            if (undefined != objData[item] && undefined != objData[item][wellName]) {
                                if (undefined == objData[item][wellName].jiChu) {
                                    objData[item][wellName].jiChu = 0;
                                }
                                if (undefined == objData[item][wellName].cuoShi) {
                                    objData[item][wellName].cuoShi = 0;
                                }
                                if (undefined == objData[item][wellName].tiaoZheng) {
                                    objData[item][wellName].tiaoZheng = 0;
                                }
                                if (undefined == objData[item][wellName].kaiFa) {
                                    objData[item][wellName].kaiFa = 0;
                                }
                                if (undefined == objData[item][wellName].heJi) {
                                    objData[item][wellName].heJi = parseFloat(parseFloat(objData[item][wellName].jiChu) + parseFloat(objData[item][wellName].cuoShi) + parseFloat(objData[item][wellName].tiaoZheng)).toFixed(2)
                                }
                            } else {
                                objData[item][wellName] = {}
                            }
                        })
                    }
                })
                keys.forEach((item, index) => {
                    let lineTitle = this.dealLineTitle(item);
                    if (lineTitle != null && lineTitle != '') {
                        // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
                        // 'QHD32-6', 'NB35-2' , 'QHD33-1S','QHD33-1'
                        let lineObj = {
                            'type': lineTitle,
                            'code': item,
                            'zygsjc': (
                                (objData[item]['QHD32-6']['jiChu'] ? parseFloat(objData[item]['QHD32-6']['jiChu']) : 0) +
                                (objData[item]['QHD33-1']['jiChu'] ? parseFloat(objData[item]['QHD33-1']['jiChu']) : 0) +
                                (objData[item]['NB35-2']['jiChu'] ? parseFloat(objData[item]['NB35-2']['jiChu']) : 0) +
                                (objData[item]['QHD33-1S']['jiChu'] ? parseFloat(objData[item]['QHD33-1S']['jiChu']) : 0) +
                                (objData[item]['CFD6-4']['jiChu'] ? parseFloat(objData[item]['CFD6-4']['jiChu']) : 0) +
                                (objData[item]['BZ3-2']['jiChu'] ? parseFloat(objData[item]['BZ3-2']['jiChu']) : 0)
                            ).toFixed(2),
                            'zygscs': (
                                (objData[item]['QHD32-6']['cuoShi'] ? parseFloat(objData[item]['QHD32-6']['cuoShi']) : 0) +
                                (objData[item]['QHD33-1']['cuoShi'] ? parseFloat(objData[item]['QHD33-1']['cuoShi']) : 0) +
                                (objData[item]['NB35-2']['cuoShi'] ? parseFloat(objData[item]['NB35-2']['cuoShi']) : 0) +
                                (objData[item]['QHD33-1S']['cuoShi'] ? parseFloat(objData[item]['QHD33-1S']['cuoShi']) : 0) +
                                (objData[item]['CFD6-4']['cuoShi'] ? parseFloat(objData[item]['CFD6-4']['cuoShi']) : 0) +
                                (objData[item]['BZ3-2']['cuoShi'] ? parseFloat(objData[item]['BZ3-2']['cuoShi']) : 0)
                            ).toFixed(2),
                            'zygstz': (
                                (objData[item]['QHD32-6']['tiaoZheng'] ? parseFloat(objData[item]['QHD32-6']['tiaoZheng']) : 0) +
                                (objData[item]['QHD33-1']['tiaoZheng'] ? parseFloat(objData[item]['QHD33-1']['tiaoZheng']) : 0) +
                                (objData[item]['NB35-2']['tiaoZheng'] ? parseFloat(objData[item]['NB35-2']['tiaoZheng']) : 0) +
                                (objData[item]['QHD33-1S']['tiaoZheng'] ? parseFloat(objData[item]['QHD33-1S']['tiaoZheng']) : 0) +
                                (objData[item]['CFD6-4']['tiaoZheng'] ? parseFloat(objData[item]['CFD6-4']['tiaoZheng']) : 0) +
                                (objData[item]['BZ3-2']['tiaoZheng'] ? parseFloat(objData[item]['BZ3-2']['tiaoZheng']) : 0)
                            ).toFixed(2),
                            'zygskf': objData[item]['QHD33-1']['kaiFa'] ? parseFloat(objData[item]['QHD33-1']['kaiFa'].toFixed(2)) : '',
                            'zygshj': (
                                parseFloat(objData[item]['QHD32-6']['jiChu']) +
                                parseFloat(objData[item]['QHD33-1']['jiChu']) +
                                parseFloat(objData[item]['NB35-2']['jiChu']) +
                                parseFloat(objData[item]['QHD33-1S']['jiChu']) +
                                parseFloat(objData[item]['CFD6-4']['jiChu']) +
                                parseFloat(objData[item]['BZ3-2']['jiChu']) +
            
                                parseFloat(objData[item]['QHD32-6']['cuoShi']) +
                                parseFloat(objData[item]['QHD33-1']['cuoShi']) +
                                parseFloat(objData[item]['NB35-2']['cuoShi']) +
                                parseFloat(objData[item]['QHD33-1S']['cuoShi']) +
                                parseFloat(objData[item]['CFD6-4']['cuoShi']) +
                                parseFloat(objData[item]['BZ3-2']['cuoShi']) +
            
                                parseFloat(objData[item]['QHD32-6']['tiaoZheng']) +
                                parseFloat(objData[item]['QHD33-1']['tiaoZheng']) +
                                parseFloat(objData[item]['NB35-2']['tiaoZheng']) +
                                parseFloat(objData[item]['QHD33-1S']['tiaoZheng']) +
                                parseFloat(objData[item]['CFD6-4']['tiaoZheng']) +
                                parseFloat(objData[item]['BZ3-2']['tiaoZheng']) +
                                parseFloat(objData[item]['QHD33-1']['kaiFa'])
                            ).toFixed(2),
                            'qhd326jc': objData[item]['QHD32-6']['jiChu'] ? objData[item]['QHD32-6']['jiChu'] : '',
                            'qhd326cs': objData[item]['QHD32-6']['cuoShi'] ? objData[item]['QHD32-6']['cuoShi'] : '',
                            'qhd326tz': objData[item]['QHD32-6']['tiaoZheng'] ? objData[item]['QHD32-6']['tiaoZheng'] : '',
                            'qhd326hj': objData[item]['QHD32-6']['heJi'] ? objData[item]['QHD32-6']['heJi'] : '',
                            // NB35-2
                            'nb352jc': objData[item]['NB35-2']['jiChu'] ? objData[item]['NB35-2']['jiChu'] : '',
                            'nb352cs': objData[item]['NB35-2']['cuoShi'] ? objData[item]['NB35-2']['cuoShi'] : '',
                            'nb352tz': objData[item]['NB35-2']['tiaoZheng'] ? objData[item]['NB35-2']['tiaoZheng'] : '',
                            'nb352hj': objData[item]['NB35-2']['heJi'] ? objData[item]['NB35-2']['heJi'] : '',
                            // QHD33-1S
                            'qhd331sjc': objData[item]['QHD33-1S']['jiChu'] ? objData[item]['QHD33-1S']['jiChu'] : '',
                            'qhd331scs': objData[item]['QHD33-1S']['cuoShi'] ? objData[item]['QHD33-1S']['cuoShi'] : '',
                            'qhd331stz': objData[item]['QHD33-1S']['tiaoZheng'] ? objData[item]['QHD33-1S']['tiaoZheng'] : '',
                            'qhd331shj': objData[item]['QHD33-1S']['heJi'] ? objData[item]['QHD33-1S']['heJi'] : '',
                            // CFD6-4
                            'cfd64jc': objData[item]['CFD6-4']['jiChu'] ? objData[item]['CFD6-4']['jiChu'] : '',
                            'cfd64cs': objData[item]['CFD6-4']['cuoShi'] ? objData[item]['CFD6-4']['cuoShi'] : '',
                            'cfd64tz': objData[item]['CFD6-4']['tiaoZheng'] ? objData[item]['CFD6-4']['tiaoZheng'] : '',
                            'cfd64hj': objData[item]['CFD6-4']['heJi'] ? objData[item]['CFD6-4']['heJi'] : '',
                            // BZ3-2
                            'bz32jc': objData[item]['BZ3-2']['jiChu'] ? objData[item]['BZ3-2']['jiChu'] : '',
                            'bz32cs': objData[item]['BZ3-2']['cuoShi'] ? objData[item]['BZ3-2']['cuoShi'] : '',
                            'bz32tz': objData[item]['BZ3-2']['tiaoZheng'] ? objData[item]['BZ3-2']['tiaoZheng'] : '',
                            'bz32hj': objData[item]['BZ3-2']['heJi'] ? objData[item]['BZ3-2']['heJi'] : '',
                            // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
                            'qhd331jc': objData[item]['QHD33-1']['jiChu'] ? objData[item]['QHD33-1']['jiChu'] : '',
                            'qhd331cs': objData[item]['QHD33-1']['cuoShi'] ? objData[item]['QHD33-1']['cuoShi'] : '',
                            'qhd331tz': objData[item]['QHD33-1']['tiaoZheng'] ? objData[item]['QHD33-1']['tiaoZheng'] : '',
                            'qhd331kf': objData[item]['QHD33-1']['kaiFa'] ? objData[item]['QHD33-1']['kaiFa'] : '',
                            'qhd331hj': objData[item]['QHD33-1']['heJi'] ? objData[item]['QHD33-1']['heJi'] : '',
                            'bzhj': ((objData[item]['NB35-2']['jiChu'] ? parseFloat(objData[item]['NB35-2']['jiChu']) : 0) +
                                (objData[item]['QHD33-1S']['jiChu'] ? parseFloat(objData[item]['QHD33-1S']['jiChu']) : 0) +
                                (objData[item]['QHD33-1']['jiChu'] ? parseFloat(objData[item]['QHD33-1']['jiChu']) : 0) +
                                (objData[item]['NB35-2']['cuoShi'] ? parseFloat(objData[item]['NB35-2']['cuoShi']) : 0) +
                                (objData[item]['QHD33-1S']['cuoShi'] ? parseFloat(objData[item]['QHD33-1S']['cuoShi']) : 0) +
                                (objData[item]['QHD33-1']['cuoShi'] ? parseFloat(objData[item]['QHD33-1']['cuoShi']) : 0) +
                                (objData[item]['NB35-2']['tiaoZheng'] ? parseFloat(objData[item]['NB35-2']['tiaoZheng']) : 0) +
                                (objData[item]['QHD33-1S']['tiaoZheng'] ? parseFloat(objData[item]['QHD33-1S']['tiaoZheng']) : 0) +
                                (objData[item]['QHD33-1']['tiaoZheng'] ? parseFloat(objData[item]['QHD33-1']['tiaoZheng']) : 0) +
                                (objData[item]['QHD33-1']['kaiFa'] ? parseFloat(objData[item]['QHD33-1']['kaiFa']) : 0)).toFixed(2),
                        };
                        reList.push(lineObj);
                    }
                    console.log('reList')
                    console.log(reList)
                })
                let today = reList.find((item) => {
                    return item.code == "baoBiao"
                });
                let yesterday = reList.find((item) => {
                    return item.code == "baoBiaoYesterday"
                });
                console.log(today, yesterday)
                var obj = {
                    'type': "当日-前一日产量",
                    'zygsjc': (today['zygsjc'] == '' && yesterday['zygsjc'] == '') ? '' : (today['zygsjc'] - yesterday['zygsjc']).toFixed(2),
                    'zygscs': (today['zygscs'] == '' && yesterday['zygscs'] == '') ? '' : (today['zygscs'] - yesterday['zygscs']).toFixed(2),
                    'zygstz': (today['zygstz'] == '' && yesterday['zygstz'] == '') ? '' : (today['zygstz'] - yesterday['zygstz']).toFixed(2),
                    'zygskf': (today['zygskf'] == '' && yesterday['zygskf'] == '') ? '' : (today['zygskf'] - yesterday['zygskf']).toFixed(2),
                    'zygshj': (today['zygshj'] == '' && yesterday['zygshj'] == '') ? '' : (today['zygshj'] - yesterday['zygshj']).toFixed(2),
            
                    // QHD32-6
                    'qhd326jc': (today['qhd326jc'] == '' && yesterday['qhd326jc'] == '') ? '' : (today['qhd326jc'] - yesterday['qhd326jc']).toFixed(2),
                    'qhd326cs': (today['qhd326cs'] == '' && yesterday['qhd326cs'] == '') ? '' : (today['qhd326cs'] - yesterday['qhd326cs']).toFixed(2),
                    'qhd326tz': (today['qhd326tz'] == '' && yesterday['qhd326tz'] == '') ? '' : (today['qhd326tz'] - yesterday['qhd326tz']).toFixed(2),
                    'qhd326hj': (today['qhd326hj'] == '' && yesterday['qhd326hj'] == '') ? '' : (today['qhd326hj'] - yesterday['qhd326hj']).toFixed(2),
            
                    // QHD33-1
                    'qhd331jc': (today['qhd331jc'] == '' && yesterday['qhd331jc'] == '') ? '' : (today['qhd331jc'] - yesterday['qhd331jc']).toFixed(2),
                    'qhd331cs': (today['qhd331cs'] == '' && yesterday['qhd331cs'] == '') ? '' : (today['qhd331cs'] - yesterday['qhd331cs']).toFixed(2),
                    'qhd331tz': (today['qhd331tz'] == '' && yesterday['qhd331tz'] == '') ? '' : (today['qhd331tz'] - yesterday['qhd331tz']).toFixed(2),
                    'qhd331hj': (today['qhd331hj'] == '' && yesterday['qhd331hj'] == '') ? '' : (today['qhd331hj'] - yesterday['qhd331hj']).toFixed(2),
            
                    // NB35-2
                    'nb352jc': (today['nb352jc'] == '' && yesterday['nb352jc'] == '') ? '' : (today['nb352jc'] - yesterday['nb352jc']).toFixed(2),
                    'nb352cs': (today['nb352cs'] == '' && yesterday['nb352cs'] == '') ? '' : (today['nb352cs'] - yesterday['nb352cs']).toFixed(2),
                    'nb352tz': (today['nb352tz'] == '' && yesterday['nb352tz'] == '') ? '' : (today['nb352tz'] - yesterday['nb352tz']).toFixed(2),
                    'nb352hj': (today['nb352hj'] == '' && yesterday['nb352hj'] == '') ? '' : (today['nb352hj'] - yesterday['nb352hj']).toFixed(2),
            
                    // QHD33-1S
                    'qhd331sjc': (today['qhd331sjc'] == '' && yesterday['qhd331sjc'] == '') ? '' : (today['qhd331sjc'] - yesterday['qhd331sjc']).toFixed(2),
                    'qhd331scs': (today['qhd331scs'] == '' && yesterday['qhd331scs'] == '') ? '' : (today['qhd331scs'] - yesterday['qhd331scs']).toFixed(2),
                    'qhd331stz': (today['qhd331stz'] == '' && yesterday['qhd331stz'] == '') ? '' : (today['qhd331stz'] - yesterday['qhd331stz']).toFixed(2),
                    'qhd331shj': (today['qhd331shj'] == '' && yesterday['qhd331shj'] == '') ? '' : (today['qhd331shj'] - yesterday['qhd331shj']).toFixed(2),
            
                    // CFD6-4
                    'cfd64jc': (today['cfd64jc'] == '' && yesterday['cfd64jc'] == '') ? '' : (today['cfd64jc'] - yesterday['cfd64jc']).toFixed(2),
                    'cfd64cs': (today['cfd64cs'] == '' && yesterday['cfd64cs'] == '') ? '' : (today['cfd64cs'] - yesterday['cfd64cs']).toFixed(2),
                    'cfd64tz': (today['cfd64tz'] == '' && yesterday['cfd64tz'] == '') ? '' : (today['cfd64tz'] - yesterday['cfd64tz']).toFixed(2),
                    'cfd64hj': (today['cfd64hj'] == '' && yesterday['cfd64hj'] == '') ? '' : (today['cfd64hj'] - yesterday['cfd64hj']).toFixed(2),
            
                    // BZ3-2
                    'bz32jc': (today['bz32jc'] == '' && yesterday['bz32jc'] == '') ? '' : (today['bz32jc'] - yesterday['bz32jc']).toFixed(2),
                    'bz32cs': (today['bz32cs'] == '' && yesterday['bz32cs'] == '') ? '' : (today['bz32cs'] - yesterday['bz32cs']).toFixed(2),
                    'bz32tz': (today['bz32tz'] == '' && yesterday['bz32tz'] == '') ? '' : (today['bz32tz'] - yesterday['bz32tz']).toFixed(2),
                    'bz32hj': (today['bz32hj'] == '' && yesterday['bz32hj'] == '') ? '' : (today['bz32hj'] - yesterday['bz32hj']).toFixed(2),
            
                    'total_sum': (today['bzhj'] == '' && yesterday['bzhj'] == '') ? '' : (today['bzhj'] - yesterday['bzhj']).toFixed(2),
                };
                reList.push(obj);
                var finalList = [];
                this.allTableData.forEach((item, index) => {
                    var lineTitle = this.dealLineTitle(item.code);
                    var obj = reList.find(item1 => {
                        return item1.type == lineTitle;
                    })
                    if (obj == null) {
                        obj = {
                            'type': lineTitle,
                            'zygsjc': '',
                            'zygscs': '',
                            'zygstz': '',
                            'zygskf': '',
                            'zygshj': '',
                            'seljc': '',
                            'selcs': '',
                            'seltz': '',
                            'selhj': '',
                            'ewyjc': '',
                            'ewycs': '',
                            'ewytz': '',
                            'ewyhj': '',
                            'ewysjc': '',
                            'ewyscs': '',
                            'ewystz': '',
                            'ewyshj': '',
                            'yjsjc': '',
                            'yjscs': '',
                            'yjstz': '',
                            'yjskf': '',
                            'yjshj': '',
                            'bzhj': '',
                        }
                    }
                    finalList.push(obj);
                });
                return finalList;
            },
            dealLineTitle(value) {
                var unit1 = '',
                    unit2 = '';
                switch (this.searchForm.unitType) {
                    case "t":
                        unit1 = '吨';
                        unit2 = '吨';
                        break;
                    case "m":
                        unit1 = 'm³';
                        unit2 = 'm³';
                        break;
                }
                var lineTitle = '';
                switch (value) {
                    case "baoBiao":
                        lineTitle = '报表产量(' + unit1+')';
                        break;
                    case "下舱产量/":
                        lineTitle = '下舱产量(' + unit1+')';
                        break;
                    case "baoBiaoYesterday":
                        lineTitle = '前一日报表产量(' + unit1+')';
                        break;
                    case "前一日下舱产量/":
                        lineTitle = '前一日下舱产量(' + unit1+')';
                        break;
                    case "yuCe":
                        lineTitle = '滚动预测(' + unit2+')';
                        break;
                    case "fenDou":
                        lineTitle = '分公司奋斗(' + unit2+')';
                        break;
                    case "kaoHe":
                        lineTitle = '分公司考核(' + unit2+')';
                        break;
                    case "当日-前一日产量":
                        lineTitle = '当日-前一日产量(' + unit2 + ')';
                        break;
                    case "下舱产量-滚动预测(/":
                        lineTitle = '下舱产量-滚动预测(' + unit2 + ')';
                        break;
                    case "下舱产量-滚动预测奋斗(/":
                        lineTitle = '下舱产量-滚动预测奋斗(' + unit2 + ')';
                        break;
                    case "下舱产量-分公司奋斗":
                        lineTitle = '下舱产量-分公司奋斗';
                        break;
                    case "下舱产量-分公司考核":
                        lineTitle = '下舱产量-分公司考核';
                        break;
                    case "baoBiaoYuCeDiff":
                        lineTitle = '报表产量-滚动预测产量(' + unit2 + ')';
                        break;
                }
                return lineTitle;
            },
            //下载导出文件 tableId tableName
            doDownExcel(tableId, tableName) {
                exportExcel(tableId, tableName);
            },
        },
    };
</script>