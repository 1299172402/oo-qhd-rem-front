<!-- 产量形势预测 -->
<template>
    <div class="app-container">
        <pagePanelNew style="height:100%;margin-top:0;" headerTitle="" >
            <div class="pagePane-container">
                <el-tabs class="g-pageHeader" v-model="tabsValue" topline>
                    <el-tab-pane label="作业公司产量跟踪" name="作业公司产量跟踪"></el-tab-pane>
                    <el-tab-pane label="油田预测产量" name="油田预测产量"></el-tab-pane>
                    <el-tab-pane label="作业公司产量总览" name="作业公司产量总览"></el-tab-pane>
                    <el-tab-pane label="单井产量预测" name="单井产量预测"></el-tab-pane>
                </el-tabs>
                <div v-if="tabsValue=='作业公司产量跟踪'" style="height:calc(100% - 46px);padding-bottom:10px;">
                    <one ref="childComponent"></one>
                </div>
                <div v-if="tabsValue=='油田预测产量'" style="height:calc(100% - 46px);overflow-y: scroll;padding-right: 20px;">
                    <two ref="childComponent"></two>
                </div>
                <div v-if="tabsValue=='作业公司产量总览'" style="height:calc(100% - 46px);overflow-y: scroll;">
                    <three ref="childComponent"></three>
                </div>
                <div v-if="tabsValue=='单井产量预测'" style="height:calc(100% - 46px);overflow-y: scroll;">
                    <four ref="childComponent" ></four>
                </div>
            </div>
        </pagePanelNew>
    </div>
</template>

<script>
    import { exportExcel,exportComplexHeaderExcelFromJson } from '@/lib/exportExcel.js';
    import one from "./components/one.vue";
    import two from "./components/two.vue";
    import three from "./components/three.vue";
    import four from "./components/four.vue";
    export default {
        name: 'productionSituationPrediction',
        components: {
          one,
          two,
          three,
          four
        },
        data() {
            return {
                tabsValue: '作业公司产量跟踪',
            };
        },
        methods: {
            //下载
            doDownLoad(index) {
                if (index === 2) {
                    let fileName = '油田预测产量';
                    exportExcel('#ForecastProductionTable', fileName);
                }
                if (index === 3) {
                    let fileName1 = '油田剩余水平';
                    exportExcel('#ResidualLevelTable', fileName1);
                }
                if (index === 4) {
                    let fileName = '作业公司产量跟踪';
                    exportExcel('#TaskOutputTrackingTable', fileName);
                }
            },
            //下载作业公司产量跟踪表格数据
            downloadOutputTracking() {
                let queryParams = {
                    date: this.outputTrackingForm.queryDate,
                    unitType: this.outputTrackingForm.selectUnitOfProduction,
                };
                getReportFroms(queryParams).then((data) => {
                    // 'QHD32-6', 'QHD33-1', 'NB35-2', 'QHD33-1S', 'CFD6-4', 'BZ3-2'
                    let header = {
                        DDATE: {
                            v: this.outputTrackingTableDate
                        },
                        ZYGS: {
                            v: '作业公司'
                        },
                        ZYGS_1: {
                            v: '基础'
                        },
                        ZYGS_2: {
                            v: '措施'
                        },
                        ZYGS_3: {
                            v: '调整井'
                        },
                        ZYGS_4: {
                            v: '开发井'
                        },
                        ZYGS_SUM: {
                            v: '合计'
                        },
                        QHD326: {
                            v: 'QHD32-6'
                        },
                        QHD326_1: {
                            v: '基础'
                        },
                        QHD326_2: {
                            v: '措施'
                        },
                        QHD326_: {
                            v: '调整井'
                        },
                        QHD326_SUM: {
                            v: '合计'
                        },
                        QHD331: {
                            v: 'QHD33-1'
                        },
                        QHD331_1: {
                            v: 'NB35-2'
                        },
                        QHD331_2: {
                            v: '基础'
                        },
                        QHD331_3: {
                            v: '措施'
                        },
                        QHD331_4: {
                            v: '调整井'
                        },
                        QHD331_SUM: {
                            v: '合计'
                        },
                        NB352: {
                            v: 'NB35-2'
                        },
                        ONB352_1: {
                            v: '基础'
                        },
                        ONB352_2: {
                            v: '措施'
                        },
                        ONB352_3: {
                            v: '调整井'
                        },
                        ONB352_SUM: {
                            v: '合计'
                        },
                        QHD331S: {
                            v: 'QHD33-1S'
                        },
                        QHD331S_1: {
                            v: '基础'
                        },
                        QHD331S_2: {
                            v: '措施'
                        },
                        QHD331S_3: {
                            v: '调整井'
                        },
                        QHD331S_SUM: {
                            v: '合计'
                        },
                        CFD64: {
                            v: 'CFD6-4'
                        },
                        CFD64_1: {
                            v: '基础'
                        },
                        CFD64_2: {
                            v: '措施'
                        },
                        CFD64_3: {
                            v: '调整井'
                        },
                        CFD64_SUM: {
                            v: '合计'
                        },
                        BZ32: {
                            v: 'BZ3-2'
                        },
                        BZ32_1: {
                            v: '基础'
                        },
                        BZ32_2: {
                            v: '措施'
                        },
                        BZ32_3: {
                            v: '调整井'
                        },
                        BZ32_4: {
                            v: '开发井'
                        },
                        BZ32_5: {
                            v: '合计'
                        },
                        SUM: {
                            v: '合计'
                        },
                    }
                    // let header = {
                    //     A1: { v: this.outputTrackingTableDate},
                    //     B1: { v: '作业公司'},
                    //     B2: { v: '基础'},
                    //     C2: { v: '措施'},
                    //     D2: { v: '调整井'},
                    //     E2: { v: '开发井'},
                    //     F2: { v: '合计'},
                    //     G1: { v: 'QHD32-6'},
                    //     G2: { v: '基础'},
                    //     H2: { v: '措施'},
                    //     I2: { v: '调整井'},
                    //     J2: { v: '合计'},
                    //     K1: { v: 'NB35-2'},
                    //     K2: { v: '基础'},
                    //     L2: { v: '措施'},
                    //     M2: { v: '调整井'},
                    //     N2: { v: '合计'},
                    //     O1: { v: 'QHD33-1S'},
                    //     O2: { v: '基础'},
                    //     P2: { v: '措施'},
                    //     Q2: { v: '调整井'},
                    //     R2: { v: '合计'},
                    //     S1: { v: 'QHD33-1'},
                    //     S2: { v: '基础'},
                    //     T2: { v: '措施'},
                    //     U2: { v: '调整井'},
                    //     V2: { v: '开发井'},
                    //     W2: { v: '合计'},
                    //     X2: { v: 'BZ合计'},
                    // }
                    var merges = [
                        //{s开始位置: {c:横坐标，r:纵坐标}, e结束位置: {c:横坐标，r:纵坐标}}
                        {
                            s: {
                                c: 0,
                                r: 0
                            },
                            e: {
                                c: 0,
                                r: 1
                            }
                        }, //日期 A1 A2合并
                        {
                            s: {
                                c: 1,
                                r: 0
                            },
                            e: {
                                c: 5,
                                r: 0
                            }
                        }, //作业公司 B1-H1合并
                        {
                            s: {
                                c: 6,
                                r: 0
                            },
                            e: {
                                c: 9,
                                r: 0
                            }
                        }, //QHD32-6 G1-J1合并
                        {
                            s: {
                                c: 10,
                                r: 0
                            },
                            e: {
                                c: 13,
                                r: 0
                            }
                        }, //NB35-2 K1-N1合并
                        {
                            s: {
                                c: 14,
                                r: 0
                            },
                            e: {
                                c: 17,
                                r: 0
                            }
                        }, //QHD33-1S O1-R1合并
                        {
                            s: {
                                c: 18,
                                r: 0
                            },
                            e: {
                                c: 23,
                                r: 0
                            }
                        }, //QHD33-1 S1-W1合并
                    ];
                    //需要进行一次查询
                    let listData = this.dealOutputTrackingData(data.data.data);
                    var resData = {};
                    listData.forEach((item, index) => {
                        var cellIndex = parseInt(index) + 3;
                        resData['A' + cellIndex] = {
                            v: item.type
                        };
                        resData['B' + cellIndex] = {
                            v: item.zygsjc
                        };
                        resData['C' + cellIndex] = {
                            v: item.zygscs
                        };
                        resData['D' + cellIndex] = {
                            v: item.zygstz
                        };
                        resData['E' + cellIndex] = {
                            v: item.zygskf
                        };
                        resData['F' + cellIndex] = {
                            v: item.zygshj
                        };
                        resData['G' + cellIndex] = {
                            v: item.seljc
                        };
                        resData['H' + cellIndex] = {
                            v: item.selcs
                        };
                        resData['I' + cellIndex] = {
                            v: item.seltz
                        };
                        resData['J' + cellIndex] = {
                            v: item.selhj
                        };
                        resData['K' + cellIndex] = {
                            v: item.ewyjc
                        };
                        resData['L' + cellIndex] = {
                            v: item.ewycs
                        };
                        resData['M' + cellIndex] = {
                            v: item.ewytz
                        };
                        resData['N' + cellIndex] = {
                            v: item.ewyhj
                        };
                        resData['O' + cellIndex] = {
                            v: item.ewysjc
                        };
                        resData['P' + cellIndex] = {
                            v: item.ewyscs
                        };
                        resData['Q' + cellIndex] = {
                            v: item.ewystz
                        };
                        resData['R' + cellIndex] = {
                            v: item.ewyshj
                        };
                        resData['S' + cellIndex] = {
                            v: item.yjsjc
                        };
                        resData['T' + cellIndex] = {
                            v: item.yjscs
                        };
                        resData['U' + cellIndex] = {
                            v: item.yjstz
                        };
                        resData['V' + cellIndex] = {
                            v: item.yjskf
                        };
                        resData['W' + cellIndex] = {
                            v: item.yjshj
                        };
                        resData['X' + cellIndex] = {
                            v: item.bzhj
                        };
                    })
                    exportComplexHeaderExcelFromJson(header, merges, resData, this.outputTrackingTableDate + '作业公司产量跟踪');
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
                this.allOutputTrackingTableData.forEach((item, index) => {
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
                switch (this.outputTrackingForm.selectUnitOfProduction) {
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
                        lineTitle = '报表产量/' + unit1;
                        break;
                    case "下舱产量/":
                        lineTitle = '下舱产量/' + unit1;
                        break;
                    case "baoBiaoYesterday":
                        lineTitle = '前一日报表产量/' + unit1;
                        break;
                    case "前一日下舱产量/":
                        lineTitle = '前一日下舱产量/' + unit1;
                        break;
                    case "yuCe":
                        lineTitle = '滚动预测/' + unit2;
                        break;
                    case "fenDou":
                        lineTitle = '分公司奋斗/' + unit2;
                        break;
                    case "kaoHe":
                        lineTitle = '分公司考核/' + unit2;
                        break;
                    case "当日-前一日产量":
                        lineTitle = '当日-前一日产量';
                        break;
                    case "下舱产量-滚动预测(/":
                        lineTitle = '下舱产量-滚动预测(/' + unit2 + ')';
                        break;
                    case "下舱产量-滚动预测奋斗(/":
                        lineTitle = '下舱产量-滚动预测奋斗(/' + unit2 + ')';
                        break;
                    case "下舱产量-分公司奋斗":
                        lineTitle = '下舱产量-分公司奋斗';
                        break;
                    case "下舱产量-分公司考核":
                        lineTitle = '下舱产量-分公司考核';
                        break;
                    case "baoBiaoYuCeDiff":
                        lineTitle = '报表产量-滚动预测产量';
                        break;
                }
                return lineTitle;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
        .pagePane-container{
            height:100%;
        }
    }
</style>
