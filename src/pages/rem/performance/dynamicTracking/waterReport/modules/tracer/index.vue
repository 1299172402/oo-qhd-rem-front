<!--示踪剂-->
<template>
    <div class="z-main">
        <page-panel header-title="示踪剂">
            <div class="z-search">
                <el-radio-group v-model="selectPosition">
                    <el-radio v-for="(item, index) in position" :key="index" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </div>
            <div class="z-container">
                <div class="z-row">
                    <div class="z-col">
                        <page-panel infoWidth="100%" infoHeight="100%" headerTitle="示踪剂结果" isShowMaxBtn>
                            <el-image :src="imageFirst" style="height: 100%; display: block; margin: 0 auto">
                                <div slot="error"></div>
                            </el-image>
                        </page-panel>
                    </div>
                    <div class="z-col">
                        <page-panel infoWidth="100%" infoHeight="100%" headerTitle="示踪剂报告" isShowMaxBtn>
                            <iframe
                                :src="imageSecond ? imageSecond + '#toolbar=0' : ''"
                                style="width: 100%; height: 100%"
                                v-if="imageSecond"
                            ></iframe>
                        </page-panel>
                    </div>
                </div>
                <div class="z-row">
                    <div class="z-col">
                        <page-panel infoWidth="100%" infoHeight="100%" headerTitle="示踪剂信息" isShowMaxBtn>
                            <!-- <el-image :src="imageThird"><div slot="error"></div></el-image> -->
                            <el-table
                                id="tableData"
                                :data="tableData"
                                border
                                :row-style="{ height: '0px' }"
                                header-cell-class-name="table_header"
                                :cell-style="{ padding: '6px', 'text-align': 'center' }"
                                style="width: 100%"
                                height="100%"
                                :default-sort="{ prop: 'date', order: 'descending' }"
                                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                            >
                                <el-table-column type="index" label="序号" width="100"></el-table-column>
                                <el-table-column prop="wellNo" label="井号"></el-table-column>
                                <el-table-column prop="days" :label="`见剂时间\n(d)`"></el-table-column>
                                <el-table-column prop="wellKm" :label="`井距\n(m)`"></el-table-column>
                                <el-table-column prop="tracerSpeed" :label="`见剂速度\n(m/d)`"></el-table-column>
                                <el-table-column prop="summitThickness" :label="`峰值浓度\n(ug/L)`"></el-table-column>
                                <el-table-column prop="peakWidth" :label="`峰值宽度\n(d)`"></el-table-column>
                                <el-table-column prop="recoveryRatio" :label="`回采率\n(%)`"></el-table-column>
                                <el-table-column prop="recoveryRat" :label="`回采率比例\n(%)`"></el-table-column>
                            </el-table>
                        </page-panel>
                    </div>
                </div>
            </div>
        </page-panel>
    </div>
</template>

<script>
import { tracer } from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
import { getWellGroupByWellId } from "@/api/rem/tracer.js";
export default {
    data() {
        return {
            //示踪剂信息
            imageFirst: "",
            //示踪剂报告
            imageSecond: "",
            //示踪剂结果
            imageThird: "",
            //单选按钮对应信息
            position: [
                { label: "示踪剂结果", value: "TRACER_RESULTS" },
                { label: "示踪剂报告", value: "TRACER_REPORT" },
                { label: "示踪剂信息", value: "TRACER_INFORMATION" },
            ],
            //单选按钮选中项
            selectPosition: "",
            wellGroupId: "",
            tableData: [],
            fieldId: "",
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {},
            
        };
    },
    
    methods: {
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            this.doSearch();
        },
        doSearch() {
            let params = { wellId: this.wellId};
            // let WellId?wellId=8AD478C388D54C1590FDD6AE2DFFB2F5
            getWellGroupByWellId(params).then((res) => {
                this.wellGroupId = res.data.data.wellGroupId;
                this.fieldId = res.data.data.blockId;
                let request = {
                    oilFieldId: this.oilFeildId,
                    fieldId:  this.platform,
                    wellGroupId: this.wellId,
                };
                tracer(request).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.tracerInfos;
                        let first = res.data.data.tracePic;
                        let firstType = res.data.data.tracePicType;
                        let second = res.data.data.report;
                        let secondType = res.data.data.reportType;
                        let third = res.data.data.information;
                        let thirdType = res.data.data.informationType;
                        if (first) {
                            this.imageFirst = "data:" + firstType + ";base64," + first;
                        } else {
                            this.imageFirst = "";
                        }
                        if (second) {
                            this.imageSecond = "data:" + secondType + ";base64," + second;
                        } else {
                            this.imageSecond = "";
                        }
                        if (third) {
                            this.imageThird = "data:" + thirdType + ";base64," + third;
                        } else {
                            this.imageThird = "";
                        }
                    }
                });
            });
        },
        //下载
        doDownLoad() {
            if (this.imageFirst) downFile(this.imageFirst, fileName + "示踪剂结果");
            if (this.imageSecond) downFile(this.imageSecond, fileName + "示踪剂报告");
            // if (this.imageThird) downFile(this.imageThird, fileName + '示踪剂信息');
        },
    },
};
</script>

<style lang="scss" scoped>
.z-main {
    width: 100%;
    height: calc(100% - 101px);
    .z-search {
        height: 60px;
        display: flex;
        align-items: center;
    }
    .z-container {
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: scroll;
        overflow-x: hidden;
        .z-row {
            height: 500px;
            display: flex;
            .z-col {
                flex: 1;
                margin-right: 20px;
            }
            margin-bottom: 20px;
        }
        #tableData {
            ::v-deep .el-table__header-wrapper .cell {
                height: auto;
                line-height: 18px;
                white-space: pre;
            }
            ::v-deep .cell:empty {
                &::before {
                    content: "-";
                }
            }
        }
    }
}
</style>
