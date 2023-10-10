<!-- 基础数据维护 - 密度维护表 -->
<template>
    <div class="app-container" style="height: 100%">
        <div style="display: flex;flex-direction: row; height: 100%;">
            <div style=" height: 100%">
                <tree-multiple-selection :level="'3'" :end="3" @change="layoutChange"/>
            </div>
            <div
                style="display: flex;flex-direction: column;  height:100%;margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
                <headerSearch class="g-w100 g-h100" style="height: auto">
                    <el-form :model="queryParams" :inline="true" style="margin-top: 18px">
                        <el-form-item label="油田：">
                            <el-select
                                v-model="queryParams.ogfId"
                                placeholder="请选择产品类型"
                                clearable
                                size="small"
                                style="width: 240px"
                            >
                                <el-option
                                    v-for="(item, index) in ogfList"
                                    :key="index"
                                    :label="item.ogfName"
                                    :value="item.ogfId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产品类型：">
                            <el-select
                                v-model="queryParams.productTypeCode"
                                placeholder="请选择产品类型"
                                clearable
                                size="small"
                                style="width: 240px"
                            >
                                <el-option
                                    v-for="(item, index) in producttype"
                                    :key="index"
                                    :label="item.appendixValueName"
                                    :value="item.appendixValueCode"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年度：">
                            <el-date-picker
                                type="year"
                                placeholder="选择年份"
                                value-format="yyyy"
                                v-model="queryParams.year"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini" @click="getInfo" icon="el-icon-search" type="primary">搜索
                            </el-button>
                            <el-button size="mini" @click="reset" icon="el-icon-refresh" class="commonBtn">重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                </headerSearch>
                <page-panel header-title="密度信息维护" style="flex:1;overflow: hidden;height: 100%" :show-btn="true">
                    <el-row>
                        
                            <el-button icon="el-icon-edit-outline" size="mini" @click="redact" type="primary">编辑
                            </el-button>
                            <el-button icon="el-icon-document-checked" size="mini" @click="save" type="primary">保存
                            </el-button>
<!--                            <el-button icon="el-icon-s-platform" size="mini" @click="dialogVisible = true"-->
<!--                                       type="primary"-->
<!--                            >运行计算-->
<!--                            </el-button>-->
                            <el-button style="float: right" type="primary" icon="el-icon-download" @click="doDownExcel()"
                            >下载
                            </el-button
                            >
                    </el-row>
                    <el-table
                        :data="noticeList"
                        ref="table"
                        highlight-current-row
                        height="calc(100% - 40px)"
                        style="margin-top: 10px;"
                        id="mdxxwh"
                        :row-style="{ height: '0px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                        header-cell-class-name="table_header"
                        :cell-style="{ 'text-align': 'center', padding: '2px' }"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column label="油气田" fixed width="130px" prop="ogfName"
                                         align="center"></el-table-column>
                        <el-table-column label="一月" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[0]">{{ scope.row.planDensityValue }}</span>
                                    <span v-else> <el-input v-model="scope.row.planDensityValue" size="small"/></span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[0]">{{ scope.row.january }}</span>
                                    <span v-else> <el-input v-model="scope.row.january" size="small"
                                                            @change="inputChange(1)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="二月" prop="two" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[1]">{{ scope.row.february }}</span>
                                    <span v-else>
                <el-input maxlength="10 " @change="inputChange(2)" v-model="scope.row.february" size="small"
                /></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="三月" prop="three" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[2]">{{ scope.row.march }}</span>
                                    <span v-else> <el-input v-model="scope.row.march" size="small"
                                                            @change="inputChange(3)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="四月" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[3]">{{ scope.row.april }}</span>
                                    <span v-else> <el-input v-model="scope.row.april" size="small"
                                                            @change="inputChange(4)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="五月" prop="five" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[4]">{{ scope.row.may }}</span>
                                    <span v-else> <el-input v-model="scope.row.may" size="small"
                                                            @change="inputChange(5)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="六月" prop="six" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[5]">{{ scope.row.june }}</span>
                                    <span v-else> <el-input v-model="scope.row.june" size="small"
                                                            @change="inputChange(6)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="七月" prop="seven" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[6]">{{ scope.row.july }}</span>
                                    <span v-else> <el-input v-model="scope.row.july" size="small"
                                                            @change="inputChange(7)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="八月" prop="eight" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[7]">{{ scope.row.august }}</span>
                                    <span v-else> <el-input v-model="scope.row.august" size="small"
                                                            @change="inputChange(8)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="九月" prop="nine" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[8]">{{ scope.row.september }}</span>
                                    <span v-else> <el-input v-model="scope.row.september" size="small"
                                                            @change="inputChange(9)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="十月" prop="ten" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[9]">{{ scope.row.october }}</span>
                                    <span v-else> <el-input v-model="scope.row.october" size="small"
                                                            @change="inputChange(10)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="十一月" prop="eleven" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[10]">{{ scope.row.november }}</span>
                                    <span v-else> <el-input v-model="scope.row.november" size="small"
                                                            @change="inputChange(11)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="十二月" prop="twelve" align="center">
                            <el-table-column :label="`计划\n(kg/m³)`" width="130px" prop="planDensityValue"
                                             align="center"></el-table-column>
                            <el-table-column :label="`实际\n(kg/m³)`" width="130px" align="center">
                                <template slot-scope="scope">
                                    <span v-if="isDisabled[11]">{{ scope.row.december }}</span>
                                    <span v-else> <el-input v-model="scope.row.december" size="small"
                                                            @change="inputChange(12)"/></span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </page-panel>
                <el-dialog title="模型运行结果通知" :visible.sync="dialogVisible" width="30%"
                           :close-on-click-modal="false">
      <span>
        AC-20井组指标变化趋势评价模型（日度）、AC-25井组注采平衡分析、AC-23井组措施推荐模型全部运行成功。AC-22井组注水受效分析运行失败。</span
      >
                    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
                </el-dialog>
                <!--        </pagePanel>-->

            </div>
        </div>

    </div>
</template>

<script>
import {queryProductList} from "@/api/rem/workcompanydesignate";
import {queryDensityInfo, save} from "@/api/rem/density.js";
import {queryOperatingCompanyDetail, queryOperatorsCheckFieldListsDetail,userListByUserNames} from "@/api/basic/master";
import treeMultipleSelection from "@/components/intelligentOilfield/tree_multiple_selection/index.vue";
import {exportExcel} from "@/lib/exportExcel";

export default {
    name: "density",
    dicts: ["sys_normal_disable"],
    components: {
        treeMultipleSelection
    },
    data() {
        return {
            dialogVisible: false, //运行计算展示弹窗
            producttype: [
                {
                    appendixValueName: '原油',
                    appendixValueCode: '002001'
                },
                {
                    appendixValueName: '天然气',
                    appendixValueCode: '002002'
                },
            ],
            deptSelect: [], //作业公司
            oilFields: [],
            // 表格数据
            noticeList: [],
            //油田列表
            ogfList:[],
            // 查询参数
            queryParams: {
                productTypeCode: "002001",
                year: "",
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
            },
            year: '',
            isDisabled: [true, true, true, true, true, true, true, true, true, true, true, true],
        };
    },
    created() {
        var data = new Date();
        var y = data.getFullYear();
        var m = data.getMonth() + 1;
        if (m >= 1 && m <= 9) {
            m = "0" + m;
        }
        this.queryParams.year = String(y);
        this.year = String(y);
        this.getInfo();
        this.selectData();
    },
    methods: {
        // 获取油田下拉数据  
        selectData() {
            let params = {
                searchKeys:[this.$store.getters["user/userDetail"].user.userName],
            }
            let orgId
            userListByUserNames(params).then((res)=>{
                orgId = (res.data.data[0] && res.data.data[0]?.tenantInfos && res.data.data[0]?.tenantInfos[0]) ? res.data.data[0].tenantInfos[0]?.deptId : undefined;
                queryOperatorsCheckFieldListsDetail({orgId:orgId}).then((res) => {
                    console.log(res)
                    this.ogfList = res.data.data;
                    if(orgId==='715AD1CD60484BB59E737CD18A9DE44A'){
                        this.queryParams.ogfId='3FC9A818F5BC43B88270DB80BBB3018F'
                    }
                });
            })

        },
        // change时间
        layoutChange() {
            this.$refs.table.doLayout()
        },

        getInfo() {
            queryDensityInfo(this.queryParams).then((res) => {
                if (res.data.code == 200) {
                    this.noticeList = [res.data.data];
                }
            });
        },

        // 编辑
        /**
         *  编辑
         * @param noticeList 表格数据data
         */
        redact() {
            var data = new Date();
            var m = data.getMonth() + 1;
            for (let i = 0; i < m; i++) {
                this.$set(this.isDisabled, i, false);
            }
        },
        // 保存
        save() {
            if (this.isDisabled.findIndex(target => target === false) == -1) {
                this.$message.error("请先点击编辑按钮!");
            } else {
                let panduan = this.isDisabled.every
                let densityInfoQueryVo = this.queryParams;
                let densityModelInfo = this.noticeList[0];
                save({densityModelInfo, densityInfoQueryVo}).then((res) => {
                    if (res.data.code == 200 && res.data.msg == '1') {
                        this.$message.success("保存成功！");
                    } else {
                        this.$message.error("系统错误请重新尝试或联系运维人员！");
                    }
                });
                for (let i = 0; i < 12; i++) {
                    this.$set(this.isDisabled, i, true);
                }
            }
        },
        inputChange(monthNum) {
            const MONTHS = {
                1: 'january',
                2: 'february',
                3: 'march',
                4: 'april',
                5: 'may',
                6: 'june',
                7: 'july',
                8: 'august',
                9: 'september',
                10: 'october',
                11: 'november',
                12: 'december'
            };
            let month = this.noticeList[0];
            let monthDen = 0;
            switch (monthNum) {
                case 1:
                    monthDen = month.january;
                    break;
                case 2:
                    monthDen = month.february;
                    break;
                case 3:
                    monthDen = month.march;
                    break;
                case 4:
                    monthDen = month.april;
                    break;
                case 5:
                    monthDen = month.may;
                    break;
                case 6:
                    monthDen = month.june;
                    break;
                case 7:
                    monthDen = month.july;
                    break;
                case 8:
                    monthDen = month.august;
                    break;
                case 9:
                    monthDen = month.september;
                    break;
                case 10:
                    monthDen = month.october;
                    break;
                case 11:
                    monthDen = month.november;
                    break;
                case 12:
                    monthDen = month.december;
                    break;
            }
            switch (monthNum) {
                case 1:
                    month.february = monthDen;
                case 2:
                    month.march = monthDen;
                case 3:
                    month.april = monthDen;
                case 4:
                    month.may = monthDen;
                case 5:
                    month.june = monthDen;
                case 6:
                    month.july = monthDen;
                case 7:
                    month.august = monthDen;
                case 8:
                    month.september = monthDen;
                case 9:
                    month.october = monthDen;
                case 10:
                    month.november = monthDen;
                case 11:
                    month.december = monthDen;
            }
        },
        doDownExcel() {
            exportExcel("#mdxxwh", "密度信息维护");
        },
        // 重置
        reset() {
            this.selectData();
            this.queryParams.orgId= orgId;
            this.queryParams.productTypeCode = "002001"
            this.queryParams.year = this.year
            this.getInfo()
        },
    },
};
</script>
<style lang="less" scoped>
.app-container {
    height: 100%;

    .el-table {
        overflow: scroll;
    }
}

.el-tree {
    max-height: 370px;
    overflow: scroll;
}
#mdxxwh {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 22px;
        white-space: pre;
    }
}

.pertable thead .el-table-column--selection .cell {
    display: none;
}
</style>
