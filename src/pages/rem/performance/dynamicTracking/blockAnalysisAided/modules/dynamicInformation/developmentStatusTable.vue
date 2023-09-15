<!--开发现状表-->
<template>
    <page-panel-new style="height:calc(100% - 101px);margin-top:0;" show-btn>
        <el-table
            id="tableData" 
            :data="tableData" :border="false" :row-style="{ height: '0px' }"
            header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
            style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column prop="date" label="时间" align="center" show-overflow-tooltip min-width="200" fixed="left">
                <template slot-scope="scope">{{ scope.row.date | dateFormat }}</template>
            </el-table-column>
            <el-table-column prop="ogfName" label="区块" show-overflow-tooltip min-width="180" fixed="left"></el-table-column>
            <el-table-column :label="`油井\n (口)`">
                <el-table-column prop="proWellCount" label="总井" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="proWellOpen" label="开井" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column :label="`月均日产水平\n (m³/d)`">
                <el-table-column prop="liquidDailySum" label="液量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="oilDailySum" label="油量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column :label="`平均单井日产\n (m³/d)`">
                <el-table-column prop="liquidDailyAvg" label="液量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="oilDailyAvg" label="油量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column :label="`注水井\n (口)`">
                <el-table-column prop="injectionWellCount" label="总井" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="injectionWellOpen" label="开井" show-overflow-tooltip min-width="120"></el-table-column>
            </el-table-column>
            <el-table-column :label="`日注水\n (m³/d)`">
                <el-table-column prop="injectionDailySum" label="合计" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="injectionDailyAvg" label="平均单井" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column prop="compressiveWaterCut" :label="`综合含水\n (%)`" show-overflow-tooltip :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="cumOilProdYearly" :label="`截止当月年产油\n (m³)`" min-width="140" show-overflow-tooltip :formatter="toPrecise2"></el-table-column>
            <el-table-column label="注采比">
                <el-table-column prop="injectionProduceRateMonth" label="月" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="injectionProduceRateSum" label="累计" show-overflow-tooltip min-width="120" :formatter="toPrecise4"></el-table-column>
            </el-table-column>
            <el-table-column :label="`采油速度\n (%)`">
                <el-table-column prop="reservoirsProduceSpeed" label="地质储量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="reservoirsProduceSpeedAvaliable" label="可采储量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column :label="`累计产量\n (10⁴m³)`">
                <el-table-column prop="oilSum" label="油量" show-overflow-tooltip min-width="120" :formatter="toPrecise4"></el-table-column>
                <el-table-column prop="waterSum" label="水量" show-overflow-tooltip min-width="120" :formatter="toPrecise4"></el-table-column>
            </el-table-column>
            <el-table-column :label="`采出程度\n (%)`">
                <el-table-column prop="reservoirsProduceDegree" label="地质储量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="reservoirsProduceDegreeAvaliable" label="可采储量" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column :label="`递减率\n (%)`">
                <el-table-column prop="natureDeclineRate" label="自然递减率" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
                <el-table-column prop="compressveDeclineRate" label="综合递减率" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            </el-table-column>
            <el-table-column prop="waterContainRaiseRate" :label="`含水上升率\n (%)`" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
            <el-table-column prop="waterOilRateSum" :label="`累计水油比\n (m³/m³)`" show-overflow-tooltip min-width="120" :formatter="toPrecise2"></el-table-column>
        </el-table>
    </page-panel-new>
</template>

<script>
import { dynamicDataDevelopmentStatusTable } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
import { exportExcel } from '@/lib/exportExcel.js';

export default {
    props: {
        oilFieldId: {},
        blockId: {}
    },
    filters: {
        dateFormat(val) {
            if (val) {
                return new Date(val).format('yyyy-MM');
            } else {
                return val;
            }
        }
    },
    data() {
        return {
            tableData: []
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            //置空子组件参数
            this.$emit('childPara', '');
            //获得查询参数
            let request = {
                oilFieldId: this.oilFieldId
            };
            this.tableData = [];
            //调用接口方法
            await dynamicDataDevelopmentStatusTable(request).then((res) => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data.developStatus;
                } else {
                    this.tableData = [];
                }
            });
        },
        //下载
        doDownLoad() {
            let fileName1 = '开发现状';
            exportExcel('#tableData', fileName1);
        },
        // 表格格式化方法 - 数值只保留两位小数
        toPrecise2(row, column) {
            if (
                (row[column.property] || parseFloat(row[column.property]) === 0) &&
                typeof parseFloat(row[column.property]) === "number"
            ) {
                return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                ? parseFloat(row[column.property]).toFixed(2)
                : "0";
            } else {
                return row[column.property] ? row[column.property] : "-";
            }
        },
        // 表格格式化方法 - 数值只保留四位小数
        toPrecise4(row, column) {
            if (
                (row[column.property] || parseFloat(row[column.property]) === 0) &&
                typeof parseFloat(row[column.property]) === "number"
            ) {
                return parseFloat(row[column.property]) || parseFloat(row[column.property]) === 0
                ? parseFloat(row[column.property]).toFixed(4)
                : "0";
            } else {
                return row[column.property] ? row[column.property] : "-";
            }
        },
    }
};
</script>

<style scoped lang="scss">
    #tableData{
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            padding:3.5px 10px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            } 
        }
    } 
</style>
