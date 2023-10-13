<!--井组配注变化动态-->
<template>
    <el-form label-width="90px" style="height: calc(100% - 55px)">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <el-form-item label="开始时间" style="margin-bottom: 0;">
                <el-date-picker
                    value-format="yyyy-MM"
                    :clearable="false"
                    :picker-options="picker"
                    @change="choiceendtime"
                    v-model="queryData.firstMonth"
                    type="month"
                    placeholder="选择月"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="对比时间" style="margin-bottom: 0;">
                <el-date-picker
                    value-format="yyyy-MM"
                    :clearable="false"
                    :picker-options="pickerOption"
                    @change="choiceendtime"
                    v-model="queryData.secondMonth"
                    type="month"
                    placeholder="选择月"

                >
                </el-date-picker>
            </el-form-item>
        </div>
        <page-panel-new style="height:calc(100% - 101px);margin-top: 0px" show-btn>
            <el-table
                highlight
                :data="tableData"
                height="100%"
                id="tableData"
                :key="itemKey"
                :header-cell-style="{'text-align':'center'}"
            >
                <el-table-column type="index" label="序号" fixed width="100" align="center"></el-table-column>
                <el-table-column prop="wellNo" label="井号" fixed min-width="130"
                                 align="left"></el-table-column>
                <el-table-column prop="layerName" label="层位" min-width="200" align="left"></el-table-column>
                <el-table-column header-align="center">
                    <template slot="header">
                        <div>{{ firstMonth }}注水情况</div>
                    </template>
                    <el-table-column prop="dosage01" :label="`配注量\n(m³/d)`" min-width="160"
                                     align="right"></el-table-column>
                    <el-table-column prop="injectionRatio01" label="注采比" min-width="100" align="right">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.injectionRatio01 !== null && scope.row.injectionRatio01 !== ''">{{
                                    scope.row.injectionRatio01
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injectionStrength01" min-width="160" :label="`注水强度\n(m³*d.m)`"
                                     align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.injectionStrength01 !== null && scope.row.injectionStrength01 !== ''">{{
                                    scope.row.injectionStrength01
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column header-align="center">
                    <template slot="header">
                        <div>{{ secondMonth }}注水情况</div>
                    </template>
                    <el-table-column prop="dosage02" :label="`配注量\n(m³/d)`" min-width="160"
                                     align="right"></el-table-column>
                    <el-table-column prop="injectionRatio02" label="注采比" min-width="100" align="right">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.injectionRatio02 !== null && scope.row.injectionRatio02 !== ''">{{
                                    scope.row.injectionRatio02
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injectionStrength02" min-width="160" :label="`注水强度\n(m³*d.m)`"
                                     align="right">
                    </el-table-column>
                </el-table-column>
                <el-table-column header-align="center">
                    <template slot="header">
                        <div>调整幅度</div>
                    </template>
                    <el-table-column :label="`配注量\n(m³/d)`" min-width="120" align="right">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.dosage02 !== null && scope.row.dosage02 !== ''">{{
                                    Number(scope.row.dosage02 - scope.row.dosage01).toFixed(2)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="injectionRatio02" min-width="140" label="注采比" align="right">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.injectionRatio02 !== null && scope.row.injectionRatio02 !== ''">{{
                                    (scope.row.injectionRatio02 - scope.row.injectionRatio01).toFixed(2)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="`注水强度\n(m³*d.m)`" min-width="160" align="right">
                        <template slot-scope="scope">
                            <span v-if="scope.row.injectionStrength02 !== null && scope.row.injectionStrength02 !== ''">{{
                                    (scope.row.injectionStrength02 - scope.row.injectionStrength01).toFixed(2)
                                }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <!--                <el-table-column prop="fieldName" min-width="130" label="备注" header-align="center"></el-table-column>-->
            </el-table>
        </page-panel-new>
    </el-form>
</template>

<script>
import {
    getWellGroupInjectionDynamic,
    queryWellGroupInjDynamicData,
    getWellGroupsByBlock
} from "@/api/rem/oilwellauxiliaryanalysis.js";
import {exportExcel} from "@/lib/exportExcel.js";
import {queryLinkageAlarmInfo} from "@/api/rem/injectionproductionlinkage";
import request from "@/utils/request";

export default {
    props: {
        //油田id
        oilFieldId: {},
        //层系id
        layerId: {},
        //井组id
        wellGroupId: {},
        wellGrouplist: [],
    },
    data() {
        return {
            wellGroupName: '',
            tableData: [],
            secondMonth: "",
            firstMonth: "",
            wellGroupname: "",
            itemKey: 0,
            queryData: {
                month: "",
                secondMonth: "",
                firstMonth: "",
            },
            picker: {
                disabledDate: (time) => {
                    let data = new Date(this.queryData.secondMonth).getTime();
                    return time.getTime() > data - 24 * 60 * 60 * 1000;
                },
            },
            pickerOption: {
                disabledDate(time) {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth() + 1;
                    let days = new Date(year, month, 0).getDate();
                    return time.getTime() > Date.now() - 24 * 60 * 60 * 1000 * days;
                },
            },
        };
    },
    mounted() {
        this.wellGroupname = (this.wellGrouplist?.find(obj => obj.wellGroupId == this.wellGroupId))?.wellGroupName;
        var date = new Date();
        var months = date.getMonth() + 1;
        var m = "0" + (months - 1);
        var x = "0" + (months - 2);
        var y = date.getFullYear();
        if (months == 1) {
            y--;
            m = "12";
        }
        if (months == 1) {
            y--;
            m = "11";
        }
        this.queryData.secondMonth = y + "-" + m.substr(m.length - 2, 2);
        this.queryData.firstMonth = y + "-" + x.substr(m.length - 2, 2);
        this.secondMonth = y + "-" + m.substr(m.length - 2, 2);
        this.firstMonth = y + "-" + x.substr(m.length - 2, 2);
        this.doSearch();
    },
    methods: {
        doSearch() {
            this.getdata()
        },
        async getdata() {
            this.wellGroupname = (this.wellGrouplist?.find(obj => obj.wellGroupId == this.wellGroupId))?.wellGroupName;
            this.tableData = []
            this.secondMonth = this.queryData.secondMonth;
            this.firstMonth = this.queryData.firstMonth;
            this.itemKey++;
            let firstMonth = {
                wellGroupName: this.wellGroupname,
                month: this.queryData.firstMonth,
            };

            let secondMonth = {
                wellGroupName: this.wellGroupname,
                month: this.queryData.secondMonth,
            };
            try {
                const [res1, res2] = await Promise.all([
                    queryWellGroupInjDynamicData(firstMonth),
                    queryWellGroupInjDynamicData(secondMonth)
                ]);
                res1.data.data.map((n) => {
                    let data = {
                        wellNo: n.wellNo,
                        layerName: n.layerName,
                        dosage01: n.injectionAmount,
                        injectionRatio01: n.iocRatio,
                        injectionStrength01: n.waterInjectionIntensity,
                    }
                    this.tableData.push(data)
                })
                res2.data.data.map((j) => {
                    this.tableData.map((item, index) => {
                        if (item.wellNo == j.wellNo && item.layerName == j.layerName) {
                            let data = {
                                dosage02: j.injectionAmount,
                                injectionRatio02: j.iocRatio,
                                injectionStrength02: j.waterInjectionIntensity,
                            }
                            this.tableData[index] = {...item, ...data}
                        }
                    })
                })
            } catch (error) {
                // 处理错误
                console.error(error);
            }
        },
        choiceendtime() {
            if (new Date(this.queryData.secondMonth) <= new Date(this.queryData.firstMonth)) {
                let sj = new Date(this.queryData.secondMonth).getTime() - 24 * 60 * 60 * 1000;
                var m = new Date(sj).getMonth() + 1;
                var y = new Date(sj).getFullYear();
                this.queryData.firstMonth = (m != 10) & (m != 11) & (m != 12) ? y + "-" + "0" + m : y + "-" + m;
            }
        },
        doDownLoad() {
            let fileName = "井组配注变化动态";
            if (this.wellGroupName) {
                fileName = this.wellGroupName + fileName;
            }
            exportExcel("#tableData", fileName);
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table .cell:empty::before {
    content: "-";
}
</style>
<style scoped lang="scss">
#tableData {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 22px;
        white-space: pre;
    }

    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}
</style>
