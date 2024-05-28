<template>
    <!-- 吸水评估预测 -->
    <page-panel header-title="分层调配数据">
    <div class="app-container" style="height: 100%">
        <page-panel-new :show-btn="true" style="height: calc(100% - 130px);">
            <div class="box_bjmod">
                <span class="bjdj bj0"></span><span class="bj_item">调配前</span>
                <span class="bjdj bj1"></span><span class="bj_item">调配后</span>
                <span class="bjdj bj2"></span><span class="bj_item">单层</span>
            </div>
            <el-table id="tableData" :data="tableData" height="calc(100% - 100px)" highlight style="margin-top: 10px; height: calc(100% - 100px);">
                <el-table-column label="序号" fixed type="index" width="80" align="center"></el-table-column>
                <el-table-column label="井号" fixed prop="wellName" show-overflow-tooltip align="center"
                                 min-width="80"></el-table-column>
                <el-table-column label="层段" prop="layerName" show-overflow-tooltip align="center"
                                 min-width="100">
                    <template slot-scope="scope">
                        <p v-if="scope.row.layerName">{{scope.row.layerName}}</p>
                        <p v-else>-</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="分注类型"
                    prop="injSeparateTypeCode"
                    show-overflow-tooltip
                    min-width="80"
                    align="center"
                > <template slot-scope="scope">
                    <p v-if="scope.row.injSeparateTypeCode">{{scope.row.injSeparateTypeCode}}</p>
                    <p v-else>-</p>
                </template>
                </el-table-column>
                <el-table-column label="最近一次吸水指数测试情况" prop="almostYearAvgAbsorp" align="center">
                    <el-table-column
                        label="测试日期"
                        prop="absorpTestDate"
                        show-overflow-tooltip
                        width="150"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.absorpTestDate">{{ scope.row.absorpTestDate?scope.row.absorpTestDate.split(' ')[0]:'-' }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="吸水指数?[m³/(d·MPa)]"
                        :render-header="renderheader"
                        prop="absorpIndex"
                        width="150"
                        show-overflow-tooltip
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span  v-if="scope.row.absorpIndex" :class="`bj_col${scope.row.typeFlag}`">{{ scope.row.absorpIndex }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="近半年月均视吸水指数?[m³/(d·MPa)]"
                    :render-header="renderheader"
                    show-overflow-tooltip
                    align="center"
                >
                    <el-table-column
                        v-for="(item,index) of table"
                        :key="index"
                        :label="item"
                        show-overflow-tooltip
                        :prop="item"
                        min-width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.almostYearAvgMonthAbsorpList[index].absorpAvgMonth">{{ scope.row.almostYearAvgMonthAbsorpList[index].absorpAvgMonth }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="预测当前吸水指数?[m³/(d·MPa)]"
                    :render-header="renderheader"
                    prop="absorpPredictIndex"
                    show-overflow-tooltip
                    width="220"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.absorpPredictIndex" :class="`bj_col${scope.row.typeFlag}`">{{ scope.row.absorpPredictIndex }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </el-table>
        </page-panel-new>
    </div>
    </page-panel>
</template>

<script>
// import dropDownUnit from "@/mixins/dropDownUnit.js" //mixins
import {exportExcel} from "@/lib/exportExcel";
import {
    getwaterAbsorptionPrediction,
    absorbWaterIndexForecastWithParam,
    absorbWaterIndexBanForecastWithParam
} from "@/api/rem/w-injectionEvaluation.js"
import {fetchOilFields} from "@/api/oilDeposit/rem-02/primaryinfo.js";
let timeNew = new Date()
let stopTime = new Date('2020-1-1')
export default {
    components: {},
    // mixins: [dropDownUnit],
    data() {
        return {
            selectArray: '',
            tableData: [],
            table: [],
            datePickOptions: {
                disabledDate: (time) => {
                    if (time.getTime() > timeNew.getTime()) {
                        return true;
                    } else if (time.getTime() < stopTime.getTime()) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            dialogVisible: false,
            dialogDisabled: false,
            dialogDateTime: '',
            dialogDateMonth: '',
            pickOptions: {
                disabledDate: (time) => {
                    return time.getTime() > new Date().getTime() - 3600 * 24 * 1000
                }
            },
            pickOptionsOther: {
                disabledDate: (time) => {
                    return time.getTime() > new Date(timeNew.getFullYear(), timeNew.getMonth() - 1).getTime()
                }
            },
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {},
        }
    },
    
    methods: {
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            this.doSearch();
        },
        doSearch() {
            let request = {
                ogfId: this.oilFeildId,
                platformId: this.platform,
                wellId: this.wellId,
                layerId:this.selectPosition,
                dateTime:new Date().format('yyyy-MM')
            };
            this.getForecast(request)
        },
        getForecast(data) {
            getwaterAbsorptionPrediction(data).then((res) => {
                const yearMonthList = []
                // this.table = []
                if (res && res.length > 0) {
                    this.tableData = res
                    // this.table = res[0].almostYearAvgMonthAbsorpList? res[0].almostYearAvgMonthAbsorpList : []
                    const params = {
                        ogfId: this.oilFeildId,
                        platformId: this.platform,
                        wellId: this.wellId,
                        layerId:this.selectPosition,
                        dateTime:new Date().format('yyyy-MM')
                    }
                    this.tableData.forEach((item) => {
                        const tempList = []
                        if (Array.isArray(item.almostYearAvgMonthAbsorpList) && item.almostYearAvgMonthAbsorpList.length) {
                            item.platId = this.platform,
                            item.dateTime = new Date().format('yyyy-MM')
                            // item.almostYearAvgMonthAbsorpList.forEach((el) => {
                            //   if(!this.table.includes(el.yearMonth)){
                            //     this.table.push(el.yearMonth)
                            //   }
                            //   item[el.yearMonth] = el.absorpAvgMonth ? Number(el.absorpAvgMonth).toFixed(2) : ''
                            // })
                            this.table.forEach(el => {
                                const list = item.almostYearAvgMonthAbsorpList.filter(elItem => elItem.yearMonth === el)
                                tempList.push({
                                    absorpAvgMonth: list.length ? list[0].absorpAvgMonth === null ? '' : Number(list[0].absorpAvgMonth).toFixed(2) : '',
                                    yearMonth: el
                                })
                            })
                            item.almostYearAvgMonthAbsorpList = tempList
                        } else {
                            item.almostYearAvgMonthAbsorpList = []
                            this.table.forEach(el => {
                                item.almostYearAvgMonthAbsorpList.push({
                                    absorpAvgMonth: '',
                                    yearMonth: el
                                })
                            })
                        }

                        item.selectParams = params
                        item.absorpIndex = item.absorpIndex === null ? '' : Number(item.absorpIndex).toFixed(2)
                        item.absorpPredictIndex = item.absorpPredictIndex === null ? '' : Number(item.absorpPredictIndex).toFixed(2)
                    })
                    // 年份排序
                    // this.table.sort()
                    // if(this.table.length < 1){
                    //   this.table.push('-')
                    // }
                } else {
                    this.tableData = [];
                    // this.table.push('-')
                }

            })
        },
        // 表格头部换行
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
    }
}
</script>

<style lang="scss" scoped>
.select {
    margin-right: 15px;

    .el-select {
        width: 150px;
    }
}

.route {
    border: 1px solid #66ffff;
    color: #66ffff;
    padding: 8px;
    text-decoration: none;
}

.router-link-active {
    color: white;
    background: #3399ff;
}

.box_bjmod {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;

}

.bj_item {
    margin-left: 10px;
    margin-right: 40px;
}

.bjdj {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 10px;
}

.bj0 {
    //background-color: rgb(255, 251, 0);
    background-color: rgb(200, 0, 255);
}

.bj1 {
    background-color: rgb(255, 165, 0);
}

.bj2 {
    background-color: rgb(0, 128, 0);
}

.bj_col0 {
    //color: rgb(255, 255, 0);
    color: rgb(200, 0, 255);
}

.bj_col1 {
    color: rgb(255, 165, 0);
}

.bj_col2 {
    color: rgb(0, 128, 0);
}

.dialog_search {
    margin-bottom: 20px
}

.dialog_search_title {
    display: inline-block;
    width: 115px
}
#tableData {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto !important;;
        line-height: 18px !important;
        white-space: pre !important;;
    }
    ::v-deep .el-table__fixed-header-wrapper .cell {
        height: auto;
        line-height: 18px !important;
        white-space: pre;
    }
    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
    .is-group{

    }
}
</style>