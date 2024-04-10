<!-- 模型 - 归因分析 -->
<template>
    <div style="width: 100%; height: calc(100% - 90px)" class="pageBox">
        <header-search class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <div style="width: 100%">
                    <el-form :inline="true">
                        <!--                        <el-form-item label="作业公司:" style="margin-left: 30px">-->
                        <!--                            <el-select v-model="queryData.orgId" disabled>-->
                        <!--                                <el-option v-for="item in zygsSelect" :key="item.orgId" :label="item.orgName"-->
                        <!--                                           :value="item.orgId">-->
                        <!--                                </el-option>-->
                        <!--                            </el-select>-->
                        <!--                        </el-form-item>-->
                        <el-form-item label="油田:">
                            <el-select v-model="queryData.ogfId" style="width: 160px" @change="choicepla">
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:">
                            <el-select v-model="queryData.assetCode" @change="choicewell" clearable
                                       style="width: 220px">
                                <el-option
                                    clearable
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformCode"
                                    :value="item.platformId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="link == 6" label="水井井组:">
                            <el-select v-model="queryData.wellGroup" style="width:180px" filterable clearable>
                                <el-option v-for="item in wellGroupList" :key="item.wellGroupName"
                                           :label="item.wellGroupName" :value="item.wellGroupName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="link == 1 || link == 2 || link == 3 || link == 4 || link == 5 "
                                      label="井号:">
                            <el-select v-model="queryData.well" clearable style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellName"
                                           :value="item.wellId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期:">
                            <el-date-picker
                                v-if="link == 4"
                                value-format="yyyy-MM-dd"
                                clearable
                                v-model="queryData.month"
                                type="date"
                                key="1"
                                style="width: 170px"
                                placeholder="选择月"
                            >
                            </el-date-picker>
                            <el-date-picker
                                v-if="link == 1 || link == 2 || link == 3 || link == 5 || link == 6"
                                value-format="yyyy-MM"
                                clearable
                                v-model="queryData.month"
                                type="month"
                                key="2"
                                style="width: 170px"
                                placeholder="选择月"
                                @change="handleMonthChange"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
                            <el-button class="commonBtn" @click="result" icon="el-icon-refresh"> 重置</el-button>
                        </el-form-item>

                        <el-form-item style="float: right">
                            <el-button type="primary" @click="returnRouter">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </header-search>
        <pagePanel v-if="link==1 || link==2 || link==3" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart id="option2" :chart-data="option" style="height: 100%"></Echart>
            <div class="overlay" v-if="isTableClick" style="z-index: 1"></div>
        </pagePanel>
        <pagePanel v-if="link==4" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart id="option2" :chart-data="option2" style="height: 100%"></Echart>
            <div class="overlay" v-if="isTableClick" style="z-index: 1"></div>
        </pagePanel>
        <pagePanel v-if="link==5" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart id="option2" :chart-data="option3" style="height: 100%;"></Echart>
            <div class="overlay" v-if="isTableClick" style="z-index: 1"></div>
        </pagePanel>
        <pagePanel v-if="link==6" :headerTitle="title" style="height: 120%" :show-btn="true">
            <Echart id="option2" :chart-data="option4" style="height: 100%"></Echart>
            <div class="overlay" v-if="isTableClick" style="z-index: 1"></div>
        </pagePanel>
        <pagePanel v-if="link=='5'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-button size="mini" @click="showGyCalDialog =true" type="primary"
                       style="float: left;margin-bottom: 10px;">执行归因计算
            </el-button>
            <el-button size="mini" @click="downexcelmid()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">中间数据库导出
            </el-button>
            <el-button size="mini" @click="downexcel()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">下载
            </el-button>
            <el-table
                height="calc(100% - 90px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                @current-change="handleCurrentChange"
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"
            >
                <el-table-column prop="wellName" min-width="150" label="井号"></el-table-column>
                <el-table-column prop="date" min-width="210" label="日期">
                    <template slot-scope="scope">
                        <span> {{ scope.row.date }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="declineRate" min-width="150" :label="`递减率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.declineRate !== null && scope.row.declineRate !== ''">{{
                                Number(scope.row.declineRate).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yield" min-width="150" :label="`月度产液量\n(m³)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yield !== null && scope.row.yield !== ''">{{
                                Number(scope.row.yield).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="monthlyProdEff" min-width="150" :label="`生产时率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.monthlyProdEff !== null && scope.row.monthlyProdEff !== ''">{{
                                Number(scope.row.monthlyProdEff).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="watCnt" min-width="150" :label="`含水率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.watCnt !== null && scope.row.watCnt !== ''">{{
                                Number(scope.row.watCnt).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pumpEfficiency" min-width="150" :label="`排量效率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.pumpEfficiency !== null && scope.row.pumpEfficiency !== ''">{{
                                Number(scope.row.pumpEfficiency).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="flwPrs" min-width="150" :label="`流压\n(MPa)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.flwPrs !== null && scope.row.flwPrs !== ''">{{
                                Number(scope.row.flwPrs).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="attribution" min-width="250" label="归因"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column prop="measure" min-width="250" label="建议措施"
                                 show-overflow-tooltip></el-table-column>
            </el-table>
            <pagination
                :pageSizes="[15, 20, 40, 100]"
                :total="pageTotal"
                :page.sync="queryData.page"
                :limit.sync="queryData.pageSize"
                @pagination="pagination"
            />
        </pagePanel>
        <pagePanel v-if="link=='6'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-button size="mini" @click="showGyCalDialog =true" type="primary"
                       style="float: left;margin-bottom: 10px;">执行归因计算
            </el-button>
            <el-button size="mini" @click="downexcelmid()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">中间数据库导出
            </el-button>
            <el-button size="mini" @click="downexcel()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">下载
            </el-button>
            <el-table
                height="calc(100% - 90px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                border
                @current-change="handleCurrentChange"
                ref="reset"
                style="width: 100%; height: 100%"
                id="cjyzsj"

            >
                <el-table-column prop="wellGroupName" min-width="250" label="井组名称"></el-table-column>
                <el-table-column prop="date" min-width="150" label="日期"></el-table-column>
                <el-table-column prop="pressureEvaluation" min-width="150" label="井组压力保持评价"></el-table-column>
                <el-table-column prop="monthlyLiquidProduction" min-width="150"
                                 :label="`井组月度产液量\n(m³)`"></el-table-column>
                <el-table-column prop="balanceAnalysisResult" min-width="150"
                                 label="注采平衡分析结果"></el-table-column>
                <el-table-column prop="monthlyWaterInjection" min-width="180"
                                 :label="`井组月注水量\n(m³)`"></el-table-column>
                <el-table-column show-overflow-tooltip prop="attribution" min-width="250"
                                 label="归因"></el-table-column>
                <el-table-column show-overflow-tooltip prop="measure" min-width="250"
                                 label="建议措施"></el-table-column>
            </el-table>
            <pagination
                :pageSizes="[15, 20, 40, 100]"
                :total="pageTotal"
                :page.sync="queryData.page"
                :limit.sync="queryData.pageSize"
                @pagination="pagination"
            />
        </pagePanel>
        <pagePanel v-if="link=='4'" :headerTitle="title+'明细表'" style="height: 100%" :show-btn="true">
            <el-button size="mini" @click="showGyCalDialog =true" type="primary"
                       style="float: left;margin-bottom: 10px;">执行归因计算
            </el-button>
            <el-button size="mini" @click="showGyCalDialog =true;modelCode='ZSQDPJ'" type="primary"
                       style="float: left;margin-bottom: 10px;margin-left: 10px">执行评价计算
            </el-button>
            <el-button size="mini" @click="downexcelmid()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">中间数据库导出
            </el-button>
            <el-button size="mini" @click="downexcel()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">下载
            </el-button>
            <el-table
                height="calc(100% - 90px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                @current-change="handleCurrentChange"
                border
                ref="reset"
                style="height: 100%"
                id="cjyzsj"
            >
                <el-table-column prop="wellNo" min-width="150" label="井号"></el-table-column>
                <el-table-column prop="evalTime" min-width="150" label="日期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.evalTime ? scope.row.evalTime.split(' ')[0] : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="layerName" min-width="200" show-overflow-tooltip label="层位"></el-table-column>
                <el-table-column prop="itemValue" min-width="150" :label="`注水强度`"
                                 :formatter="formatAmount"></el-table-column>
                <el-table-column prop="segmentedDailyInjVol" min-width="150" :label="`分层段日注量\n(m³)`"
                                 :formatter="formatAmount"></el-table-column>
                <el-table-column prop="dailyInjectionVolume" min-width="150" :label="`分层段配注量\n(m³)`"
                                 :formatter="formatAmount"></el-table-column>
                <el-table-column prop="injectionDuration" min-width="150" :label="`注水时长\n(h)`"
                                 :formatter="formatAmount"></el-table-column>
                <el-table-column prop="wellHeadWaterPressure" min-width="150" :label="`井口注水压力\n(MPa)`"
                                 :formatter="formatAmount"></el-table-column>
                <el-table-column prop="casingPressure" min-width="150" :label="`套压\n(MPa)`"
                                 :formatter="formatAmount"></el-table-column>

                <el-table-column prop="valueAttribution" min-width="200" show-overflow-tooltip
                                 label="归因"></el-table-column>
                <el-table-column prop="vauleMeasure" min-width="200" show-overflow-tooltip
                                 label="建议措施"></el-table-column>
            </el-table>
            <pagination
                :pageSizes="[15, 20, 40, 100]"
                :total="pageTotal"
                :page.sync="queryData.page"
                :limit.sync="queryData.pageSize"
                @pagination="pagination"
            />
        </pagePanel>
        <pagePanel v-if="link=='1' || link=='2' || link=='3'" :headerTitle="title+'明细表'" style="height: 100%"
                   :show-btn="true">
            <el-button size="mini" @click="showGyCalDialog =true" type="primary"
                       style="float: left;margin-bottom: 10px;">执行归因计算
            </el-button>
            <el-button size="mini" @click="downexcelmid()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">中间数据库导出
            </el-button>
            <el-button size="mini" @click="downexcel()" type="primary" icon="el-icon-download"
                       style="float: right;margin-bottom: 10px">下载
            </el-button>
            <el-table
                height="calc(100% - 90px)"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
                header-cell-class-name="table_header"
                :cell-style="{ padding: '3px', 'text-align': 'center' }"
                :data="tableData"
                @current-change="handleCurrentChange"
                border
                ref="reset"
                style="width: 100%; height: 100%"
                highlight-current-row
                id="cjyzsj"

            >
                <el-table-column prop="wellName" min-width="150" label="井号"></el-table-column>
                <el-table-column prop="date" min-width="150" label="日期">
                    <!--                    <template slot-scope="scope">-->
                    <!--                        <span> {{ scope.row.date ? scope.row.date.split(' ')[0].replace(/-01/g, '') : '' }} </span>-->
                    <!--                    </template>-->
                </el-table-column>
                <el-table-column v-if="link == 1" prop="intensity" min-width="150"
                                 :label="`采液强度\n(m³/d·m)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.intensity !== null && scope.row.intensity !== ''">{{
                                Number(scope.row.intensity).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="link == 2" prop="fluidProductionIndex" min-width="150"
                                 :label="`采液指数\n(m³/mPa·d)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fluidProductionIndex !== null && scope.row.fluidProductionIndex !== ''">{{
                                Number(scope.row.fluidProductionIndex).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="link == 3" prop="metreFluidProductionIndex" min-width="150"
                                 :label="`米采液指数\n(m³/mPa·d·m)`">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.metreFluidProductionIndex !== null && scope.row.metreFluidProductionIndex !== ''">{{
                                Number(scope.row.metreFluidProductionIndex).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yield" min-width="150" :label="`产液量\n(m³)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yield !== null && scope.row.yield !== ''">{{
                                Number(scope.row.yield).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="monthlyProdEff" min-width="150" :label="`生产时率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.monthlyProdEff !== null && scope.row.monthlyProdEff !== ''">{{
                                Number(scope.row.monthlyProdEff).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pumpEfficiency" min-width="150" :label="`排量效率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.pumpEfficiency !== null && scope.row.pumpEfficiency !== ''">{{
                                Number(scope.row.pumpEfficiency).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="watCnt" min-width="150" :label="`含水率\n(%)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.watCnt !== null && scope.row.watCnt !== ''">{{
                                Number(scope.row.watCnt).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="flwPrs" min-width="150" :label="`流压\n(MPa)`">
                    <template slot-scope="scope">
                        <span v-if="scope.row.flwPrs !== null && scope.row.flwPrs !== ''">{{
                                Number(scope.row.flwPrs).toFixed(2)
                            }}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="attribution" min-width="250" show-overflow-tooltip
                                 label="归因"></el-table-column>
                <el-table-column prop="measure" min-width="250" show-overflow-tooltip
                                 label="建议措施"></el-table-column>
            </el-table>
            <pagination
                :pageSizes="[15, 20, 40, 100]"
                :total="pageTotal"
                :page.sync="queryData.page"
                :limit.sync="queryData.pageSize"
                @pagination="pagination"
            />
        </pagePanel>
        <el-dialog :visible.sync="showGyCalDialog" title="选择时间范围更新模型数据" width="25%">
            <el-form ref="form" :model="gyDate" label-width="120px">
                <el-form-item label="开始时间">
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        clearable
                        v-model="gyDate.startDate"
                        type="date"
                        key="111"
                        style="width: 170px"
                        placeholder="开始时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        clearable
                        v-model="gyDate.endDate"
                        type="date"
                        key="222"
                        style="width: 170px"
                        placeholder="结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="showGyCalDialog = false">取消</el-button>
        <el-button type="primary" @click="executeModel(modelCode);showGyCalDialog = false">确认</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
import Echart from "@/components/tools/Echarts/index.vue";
import {
    QueryOgfDetail,
    QueryWellDetail, userListByUserNames, QueryPlatformDetail
} from "@/api/rem/marster.js";
import * as echarts from "echarts/core";
import {
    queryWaterInjIntensityAttributeAnalysis,
    queryWaterInjDownExcel,downloadFile
} from "@/api/rem/waterinjintensityattributeanalysis.js"
import {analyzeOilWellFluidAttributionQuery} from "@/api/rem/wellmonthlyanalysis";
import {oilWellFluidQuery, oilWellFluidDownExcel} from "@/api/rem/oilwellfluid";
import {selectWellGroup} from "@/api/oilDeposit/rem-02/primaryinfo";
import {queryProductionAnalysisList, queryProductionDownExcel} from "@/api/rem/productionanalysis";
import toFixed from "xe-utils/toFixed";
import FileSaver from 'file-saver'
import {updateDateByCode} from "@/api/rem/model"
import Queue from "tdesign-icons-vue/lib/components/queue";

export default {
    components: {
        Echart
    },
    data() {
        return {
            showGyCalDialog: false,
            //归因计算时间范围选择
            gyDate: {
                startDate: '',
                endDate: ''
            },
            //模型代码
            modelCode: "",
            //是否点击过表格
            isTableClick: false,
            //全局变量 第几个节点
            dataIndex: 0,
            //所有路径代码对应的 dataIndex
            codeDataIndexMap: new Map(),
            pageTotal: 0,
            chart: '',
            queryData: {
                assetCode: "",
                month: "",
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                well: "",
                pageNum: 1,
                pageSize: 15,
                wellGroup: ''
            },
            tableData: [],
            oilFields: [],
            platforms: [],
            wellList: {},
            wellGroupList: [],
            zygsSelect: [], //作业公司
            title: '油井采液强度归因分析',
            link: '1',
            evalResult: '',
            option: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井采液强度不合理",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度生产时率",
                                    "code": "YDSCSL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {

                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因1：关停原因(直接关联关停记录表)。\n下步措施：提高生产时率",
                                                                            "code": "003001"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },

                                        {
                                            "level": 3,
                                            "name": "判断油嘴和泵频率",
                                            "code": "YZBPL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断排量效率",
                                                    "code": "PLXL",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "判断含水率",
                                                            "code": "HSL",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因3：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                            "code": "003003"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因6：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                            "code": "003006"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "判断流压",
                                                                    "code": "LY",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "003004"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "003005"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "003007"
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "003004"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "003005"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "003007"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因2：调整参数影响。\n下步措施：参数二次调整",
                                                                            "code": "003002"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option11: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井采液强度不合理",
                            "children": [
                                {
                                    "level": 3,
                                    "name": "判断油嘴和泵频率",
                                    "code": "YZBPL",
                                    "children": [
                                        {
                                            "level": 4,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因1：调整参数影响。\n下步措施：参数二次调整",
                                                                    "code": "003002"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 4,
                                            "name": "判断排量效率",
                                            "code": "PLXL",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "判断含水率",
                                                    "code": "HSL",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因2：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                    "code": "003003"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因5：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                    "code": "003006"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "003004"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "003005"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "003007"
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 5,
                                                    "name": "判断流压",
                                                    "code": "LY",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "003004"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "003005"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "003007"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },

                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option5: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井采液指数不合理",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度生产时率",
                                    "code": "YDSCSL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因1：关停原因(直接关联关停记录表)。\n下步措施：提高生产时率",
                                                                            "code": "005001"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },

                                        {
                                            "level": 3,
                                            "name": "判断油嘴和泵频率",
                                            "code": "YZBPL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断排量效率",
                                                    "code": "PLXL",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "判断含水率",
                                                            "code": "HSL",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因3：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                            "code": "005003"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因6：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                            "code": "005006"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "判断流压",
                                                                    "code": "LY",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "005004"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "005005"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "005007"
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "005004"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "005005"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "005007"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因2：调整参数影响。\n下步措施：参数二次调整",
                                                                            "code": "005002"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option55: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井采液指数不合理",
                            "children": [
                                {
                                    "level": 3,
                                    "name": "判断油嘴和泵频率",
                                    "code": "YZBPL",
                                    "children": [
                                        {
                                            "level": 4,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因1：调整参数影响。\n下步措施：参数二次调整",
                                                                    "code": "005002"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 4,
                                            "name": "判断排量效率",
                                            "code": "PLXL",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "判断含水率",
                                                    "code": "HSL",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因2：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                    "code": "005003"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因5：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                    "code": "005006"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "005004"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "005005"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "005007"
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 5,
                                                    "name": "判断流压",
                                                    "code": "LY",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "005004"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "005005"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "005007"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option6: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井米采液指数不合理",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度生产时率",
                                    "code": "YDSCSL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因1：关停原因(直接关联关停记录表)。\n下步措施：提高生产时率",
                                                                            "code": "002001"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },

                                        {
                                            "level": 3,
                                            "name": "判断油嘴和泵频率",
                                            "code": "YZBPL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断排量效率",
                                                    "code": "PLXL",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "判断含水率",
                                                            "code": "HSL",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因3：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                            "code": "002003"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因6：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                            "code": "002006"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "判断流压",
                                                                    "code": "LY",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "002004"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "002005"
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "002007"
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因4：注采失调\n下步措施：排查周边井组状态",
                                                                            "code": "002004"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因5：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                            "code": "002005"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因7：地层能量不足。\n下步措施：优化注水",
                                                                            "code": "002007"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "归因2：调整参数影响。\n下步措施：参数二次调整",
                                                                            "code": "002002"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option66: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井米采液指数不合理",
                            "children": [
                                {
                                    "level": 3,
                                    "name": "判断油嘴和泵频率",
                                    "code": "YZBPL",
                                    "children": [
                                        {
                                            "level": 4,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因1：调整参数影响。\n下步措施：参数二次调整",
                                                                    "code": "002002"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 4,
                                            "name": "判断排量效率",
                                            "code": "PLXL",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "判断含水率",
                                                    "code": "HSL",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因2：目前处于中低含水期\n下步措施：存在乳化风险",
                                                                    "code": "002003"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因5：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                                    "code": "002006"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "判断流压",
                                                            "code": "LY",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "002004"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "002005"
                                                                },
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "002007"
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    "level": 5,
                                                    "name": "判断流压",
                                                    "code": "LY",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因3：注采失调\n下步措施：排查周边井组状态",
                                                                    "code": "002004"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵，查管柱；②邻井排查；③上作业",
                                                                    "code": "002005"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 6,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                    "code": "002007"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '10%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{h|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#3c8418',
                                // width:'10px',
                            },
                            h: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option2: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "注水强度归因分析 \n" +
                                '(注水井/日度/变高)',
                            "children": [
                                {
                                    "level": 2,
                                    "name": "分层段日注量",
                                    "code": "FCDRZL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "稳定/下降",
                                            "children": [
                                                {
                                                    "code": "004107",
                                                    "level": 6,
                                                    "name": "归因7：注水强度计算有误。\n" +
                                                        "建议措施：排查注水强度评价结果。",
                                                },
                                            ]
                                        },
                                        {
                                            "code": "FCDPZL",
                                            "level": 4,
                                            "name": "(上升)分层段配注量",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "上升",
                                                    "children": [
                                                        {
                                                            "children": [
                                                                {
                                                                    "children": [
                                                                        {
                                                                            "level": 6,
                                                                            "name": "对比前数值为0",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004101",
                                                                                    "name": "归因1：开井影响。\n" +
                                                                                        "建议措施：维持。",
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            "level": 6,
                                                                            "name": "对比前数值不为0",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004102",
                                                                                    "name":
                                                                                        "归因2：调配提水影响。\n" +
                                                                                        "建议措施：①下调水量；②维持",
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                    ]

                                                },
                                                {
                                                    "code": "ZSSC",
                                                    "level": 6,
                                                    "name": "稳定/下降(注水时长)",
                                                    "children": [
                                                        {
                                                            "level": 7,
                                                            "name": "上升",
                                                            "children": [
                                                                {
                                                                    "children": [
                                                                        {
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004103",
                                                                                    "name": "归因3：提高注水时率影响。\n" +
                                                                                        "建议措施：维持。",
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                        {

                                                            "level": 7,
                                                            "name": "稳定/下降(井口注水压力)",
                                                            "code": "JKZSYL",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "上升",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "code": "004104",
                                                                            "name": "归因4：提压/配水器开度调大/对应油井提液/对应水井注水量下降等影响\n" +
                                                                                "建议措施：降压/调小配水器开度/维持等"
                                                                        },
                                                                    ]
                                                                },
                                                                {

                                                                    "level": 7,
                                                                    "name": "稳定/下降(套压)",
                                                                    "code": "TY",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "下降",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004105",
                                                                                    "name": "归因5：①配水器冲蚀/封隔器失效/管柱漏失等；②大孔道等影响。\n" +
                                                                                        "建议措施：①作业换管柱；②调剖等。",
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "稳定/上升",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004106",
                                                                                    "name": "归因6：配水器开度调大/对应油井提液/对应水井注水量下降等影响 \n" +
                                                                                        "建议措施：维持/调小配水器开度等。",
                                                                                },
                                                                            ]
                                                                        },

                                                                    ]

                                                                },
                                                            ]

                                                        },
                                                    ]

                                                },
                                            ]


                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '8%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            optionzc: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "注水强度归因分析 \n" +
                                '(注水井/日度/变低)',
                            "children": [
                                {
                                    "level": 2,
                                    "name": "分层段日注量",
                                    "code": "FCDRZL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "稳定/上升",
                                            "children": [
                                                {
                                                    "code": "004007",
                                                    "level": 6,
                                                    "name": "归因7：注水强度计算有误。\n" +
                                                        "建议措施：排查注水强度评价结果。",
                                                },
                                            ]
                                        },
                                        {
                                            "code": "FCDPZL",
                                            "level": 4,
                                            "name": "(下降)分层段配注量",
                                            "children": [
                                                {
                                                    "level": 5,
                                                    "name": "下降",
                                                    "children": [
                                                        {
                                                            "children": [
                                                                {
                                                                    "children": [
                                                                        {
                                                                            "level": 6,
                                                                            "name": "当前值为0",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004001",
                                                                                    "name": "归因1：关井影响。\n" +
                                                                                        "建议措施：开井/作业扶井等。",
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            "level": 6,
                                                                            "name": "当前值不为0",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004002",
                                                                                    "name":
                                                                                        "归因2：调配降水影响。\n" +
                                                                                        "建议措施：①上调水量；②维持",
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                    ]

                                                },
                                                {
                                                    "code": "ZSSC",
                                                    "level": 6,
                                                    "name": "稳定/上升(注水时长)",
                                                    "children": [
                                                        {
                                                            "level": 7,
                                                            "name": "下降",
                                                            "children": [
                                                                {
                                                                    "children": [
                                                                        {
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004003",
                                                                                    "name": "归因3：直接关联关停记录表的停井原因。\n" +
                                                                                        "建议措施：提高注水时率。",
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                        {

                                                            "level": 7,
                                                            "name": "稳定/上升(井口注水压力)",
                                                            "code": "JKZSYL",
                                                            "children": [
                                                                {
                                                                    "level": 7,
                                                                    "name": "上升",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "code": "004004",
                                                                            "name": "归因4：①地层出砂/地层污染等；②注采失调：周围油井采液量下降或周围注水井注入量上升等影响。\n" +
                                                                                "建议措施：①作业防砂/酸化处理地层等。② 维持/注采调整：调整周围井的采液量或注水量等。"
                                                                        },
                                                                    ]
                                                                },
                                                                {

                                                                    "level": 7,
                                                                    "name": "稳定/下降(套压)",
                                                                    "code": "TY",
                                                                    "children": [
                                                                        {
                                                                            "level": 7,
                                                                            "name": "上升",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004005",
                                                                                    "name": "归因5：封隔器失效/管柱漏失等；\n" +
                                                                                        "建议措施：作业换管柱等。",
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "稳定/下降",
                                                                            "children": [
                                                                                {
                                                                                    "level": 7,
                                                                                    "code": "004006",
                                                                                    "name": "归因6：配水器开度调整等影响。\n" +
                                                                                        "建议措施：调整配水器开度/维持。",
                                                                                },
                                                                            ]
                                                                        },
                                                                    ]

                                                                },
                                                            ]

                                                        },
                                                    ]

                                                },
                                            ]


                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '8%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option3: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "油井递减率高",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "判断月度产液量",
                                    "code": "YDCYL",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "",
                                            "children": [
                                                {
                                                    "level": 99,
                                                    "name": "归因7：①注采失调；②水线突进。\n下步措施：产液结构优化调整、优化注水",
                                                    "code": "001007"
                                                },
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "判断月度含水率",
                                            "code": "YDHSL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "关联水井注水量分析",
                                                            "code": "ZSLFX",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因8：注水调配影响。\n下步措施：调整配注量",
                                                                    "code": "001009"
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因9：①封隔器失效；②水线突进。\n下步措施：①卡封；②产液结构优化调整",
                                                                    "code": "001010"
                                                                }
                                                            ]
                                                        }]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "判断月度生产时率",
                                            "code": "SCSL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断油嘴和泵频率",
                                                    "code": "YZBPL",
                                                    "children": [
                                                        {
                                                            "level": 99,
                                                            "name": "归因2：调整参数影响。\n下步措施：参数二次调整",
                                                            "code": "001002"
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "",
                                                            "children": [
                                                                {
                                                                    "level": 5,
                                                                    "name": "判断排量效率",
                                                                    "code": "PLXL",
                                                                    "children": [
                                                                        {
                                                                            "level": 4,
                                                                            "name": "判断流压",
                                                                            "code": "LY",
                                                                            "children": [
                                                                                {
                                                                                    "level": 3,
                                                                                    "name": "",
                                                                                    "children": [
                                                                                        {
                                                                                            "level": 99,
                                                                                            "name": "归因3：注采失调。\n下步措施：排查周边井组状态",
                                                                                            "code": "001003"
                                                                                        },
                                                                                        {
                                                                                            "level": 99,
                                                                                            "name": "归因4：①设备影响；②邻井干扰；③关停层、封堵层失效。\n下步措施：①检泵、查管柱；②邻井排查；③上作业",
                                                                                            "code": "001004"
                                                                                        },
                                                                                        {
                                                                                            "level": 99,
                                                                                            "name": "归因6：地层能量不足。\n下步措施：优化注水",
                                                                                            "code": "001006"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "level": 7,
                                                                            "name": "判断泵工况",
                                                                            "code": "BGK",
                                                                            "children": [
                                                                                {
                                                                                    "level": 99,
                                                                                    "name": "归因5：举升设备异常。\n下步措施：检泵",
                                                                                    "code": "001005"
                                                                                },
                                                                                {
                                                                                    "level": 6,
                                                                                    "name": "判断月度含水率",
                                                                                    "code": "YDHSL",
                                                                                    "children": [
                                                                                        {
                                                                                            "level": 7,
                                                                                            "name": "关联水井注水量分析",
                                                                                            "code": "ZSLFX",
                                                                                            "children": [
                                                                                                {
                                                                                                    "level": 99,
                                                                                                    "name": "归因8：注水调配影响。\n下步措施：调整配注量",
                                                                                                    "code": "001009"
                                                                                                },
                                                                                                {
                                                                                                    "level": 99,
                                                                                                    "name": "归因9：①封隔器失效；②水线突进。\n下步措施：①卡封；②产液结构优化调整",
                                                                                                    "code": "001010"
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                },
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 99,
                                                    "name": "归因1：关停原因(直接关联关停记录表)。\n下步措施：提高生产时率",
                                                    "code": "001001"
                                                },
                                            ]
                                        },

                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 99 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            option4: {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'tree',
                    data: [
                        {
                            "level": 1,
                            "name": "井组产油量降低",
                            "children": [
                                {
                                    "level": 2,
                                    "name": "调用井组压力保持评价模型",
                                    "code": "JZYLBCPJ",
                                    "children": [
                                        {
                                            "level": 3,
                                            "name": "判断井组月度产液量",
                                            "code": "JZYDCYL",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "判断井组月度注水量",
                                                    "code": "JZYDZSL",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因5：①封隔器失效；②水线突进。\n下步措施：①卡封；②产液结构优化调整",
                                                            "code": "006005"
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "分析示踪剂",
                                                            "code": "FXSZJ",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因4：注水调配影响。\n下步措施：调整配注量",
                                                                    "code": "006004"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "油井采液强度指标归因分析模型",
                                                    "code": "YJCYQDGY",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因统计分析",
                                                            "code": "006006"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "level": 3,
                                            "name": "调用井组注采平衡分析模型",
                                            "code": "JZZCPHFX",
                                            "children": [
                                                {
                                                    "level": 4,
                                                    "name": "分析井组水井分层月注水量",
                                                    "code": "JZSJFCYZSL",
                                                    "children": [
                                                        {
                                                            "level": 5,
                                                            "name": "油井采液强度指标归因分析模型",
                                                            "code": "YJCYQDGY",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因统计分析",
                                                                    "code": "006006"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "level": 5,
                                                            "name": "分析井组内水井分层月注水量",
                                                            "code": "SJFCZSL",
                                                            "children": [
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因1：井组超注。\n下步措施：控水调配注",
                                                                    "code": "006001"
                                                                },
                                                                {
                                                                    "level": 6,
                                                                    "name": "归因2：注采关系失调。\n下步措施：调整产液结构",
                                                                    "code": "006002"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "level": 4,
                                                    "name": "",
                                                    "children": [
                                                        {
                                                            "level": 6,
                                                            "name": "归因3：层内非均质性强。\n下步措施：调剖堵水",
                                                            "code": "006003"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    top: '1%',
                    left: '8%',
                    bottom: '1%',
                    right: '25%',
                    symbol: 'none',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12,
                        lineHeight: 24,
                        // width: 100,
                        // ellipsis: false,
                        formatter: function (params) {
                            if (params.data.level === 1 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else if (params.data.level === 2 && params.data.name) {
                                return '{b|' + params.name + '}'
                            } else if (params.data.level === 3 && params.data.name) {
                                return '{c|' + params.name + '}'
                            } else if (params.data.level === 4 && params.data.name) {
                                return '{d|' + params.name + '}'
                            } else if (params.data.level === 5 && params.data.name) {
                                return '{e|' + params.name + '}'
                            } else if (params.data.level === 6 && params.data.name) {
                                return '{f|' + params.name + '}'
                            } else if (params.data.level === 7 && params.data.name) {
                                return '{a|' + params.name + '}'
                            } else {
                                return ''
                            }
                        },
                        rich: {
                            a: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#546fc6'
                            },
                            b: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#7ab1a6'
                            },
                            c: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#446dd3'
                            },
                            d: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#904a9b'
                            },
                            e: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#1ca3c1',
                            },
                            f: {
                                padding: 6,
                                borderRadius: 3,
                                color: '#fff',
                                backgroundColor: '#9e2f5d',
                                // width:'10px',
                            },
                            z: {
                                color: '#ec1111',
                                fontWeight: 'bold'
                                // width:'10px',
                            }
                        }
                    },
                    lineStyle: {
                        color: '#91cd75'
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    emphasis: {
                        disabled: true,
                        focus: 'ancestor',
                    },
                    select: {
                        disabled: true
                    },
                    selectedMode: "multiple",
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
        };
    },
    mounted() {
        this.initData();
        this.gyDate.startDate = this.getCurrentTimeBeforeThreeStr();
        this.gyDate.endDate = this.getCurrentTimeStr();
    },
    created() {
        this.link = this.$route.query.link
    },
    methods: {
        executeModel(code) {
            updateDateByCode({
                code: code,
                startDate: this.gyDate.startDate,
                endDate: this.gyDate.endDate
            }).then((res) => {
                this.$message.success("执行归因计算成功")
            });
        },
        getCurrentTimeStr() {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        getCurrentTimeBeforeThreeStr() {
            const date = new Date();
            const year = date.getFullYear() - 2;
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        initData() {
            // 在组件被激活时执行归因计算操作
            this.getData();
            //跳转路由中获取参数赋值给查询条件
            this.queryData.month = this.$route.query.currentDate
            //判断url上是否有井组参数 有则赋值
            this.queryData.wellGroup = this.$route.query.searchKeys ? this.$route.query.searchKeys : ''
            //平台若是等于油田ID 重置为空
            if (this.$route.query.platform == '3FC9A818F5BC43B88270DB80BBB3018F') {
                this.$route.query.platform = ''
            }
            //赋值平台ID
            this.queryData.assetCode = this.$route.query.platform
            //赋值井号ID
            this.queryData.well = this.$route.query.wellId
            //赋值编码ID
            this.evalResult = this.$route.query.evalResult
            //判断link跳转的来源
            this.link = this.$route.query.link
            this.tableData = []
            this.chart = echarts.init(document.getElementById('option2'));
            if (this.link == '1') {
                this.modelCode = "YJCYQD";
                //变底正常走
                if (this.$route.query.evalResult == '0050104') {
                    this.initCodeDataIndex(this.option.series[0].data);
                    this.initTreeStyle(this.option.series[0]);
                    this.chart.setOption(this.option);
                } else {
                    this.initCodeDataIndex(this.option11.series[0].data);
                    this.initTreeStyle(this.option11.series[0]);
                    this.chart.setOption(this.option11);
                }
                this.title = '油井采液强度归因分析';
            } else if (this.link == '2') {
                this.modelCode = "YJCYZS";
                //变底正常走
                if (this.$route.query.evalResult == '0060104') {
                    this.initCodeDataIndex(this.option5.series[0].data);
                    this.initTreeStyle(this.option5.series[0]);
                    this.chart.setOption(this.option5);
                } else {
                    this.initCodeDataIndex(this.option55.series[0].data);
                    this.initTreeStyle(this.option55.series[0]);
                    this.chart.setOption(this.option55);
                }
                this.title = '油井采液指数归因分析';
            } else if (this.link == '3') {
                this.modelCode = "YJMCYZS";
                //变底正常走
                if (this.$route.query.evalResult == '0070104') {
                    this.initCodeDataIndex(this.option6.series[0].data);
                    this.initTreeStyle(this.option6.series[0]);
                    this.chart.setOption(this.option6);
                } else {
                    this.initCodeDataIndex(this.option66.series[0].data);
                    this.initTreeStyle(this.option66.series[0]);
                    this.chart.setOption(this.option66);
                }
                this.title = '油井米采液指数归因分析';
            } else if (this.link == '4') {
                this.modelCode = "ZSQD";
                if (this.link == 4 && this.$route.query.evalResult == '注水强度变高') {
                    this.initCodeDataIndex(this.option2.series[0].data);
                    this.initTreeStyle(this.option2.series[0]);
                    this.chart.setOption(this.option2);
                } else if (this.link == 4 && this.$route.query.evalResult == '注水强度变低') {
                    this.initCodeDataIndex(this.optionzc.series[0].data);
                    this.initTreeStyle(this.optionzc.series[0]);
                    this.chart.setOption(this.optionzc);
                }
                this.title = '注水强度归因分析';
            } else if (this.link == '5') {
                this.modelCode = "YJDJL";
                this.initCodeDataIndex(this.option3.series[0].data);
                this.initTreeStyle(this.option3.series[0]);
                this.chart.setOption(this.option3);
                this.title = '油井递减率归因分析';
            } else if (this.link == '6') {
                this.modelCode = "JZSCDT";
                this.initCodeDataIndex(this.option4.series[0].data);
                this.initTreeStyle(this.option4.series[0]);
                this.chart.setOption(this.option4);
                this.title = '井组生产动态归因分析';
            }
            this.getFormData();
        },
        initCodeDataIndex(treeData) {
            this.codeDataIndexMap.clear()
            this.dataIndex = 0;

            this.calculateTreeNodePosition(treeData[0], '');
            console.log(this.codeDataIndexMap);
        },
        initTreeStyle(treeData) {
            // treeData.left = '11%';
            // treeData.right = '30%';
            treeData.label.formatter = function (params) {
                if (params.data.level === 1 && params.data.name) {
                    return '{a|' + params.name + '}'
                } else if (params.data.level === 2 && params.data.name) {
                    return '{b|' + params.name + '}'
                } else if (params.data.level === 3 && params.data.name) {
                    return '{c|' + params.name + '}'
                } else if (params.data.level === 4 && params.data.name) {
                    return '{d|' + params.name + '}'
                } else if (params.data.level === 6 && params.data.name) {
                    return '{f|' + params.name + '}'
                } else if (params.data.level === 5 && params.data.name) {
                    return '{e|' + params.name + '}'
                } else if (params.data.level === 7 && params.data.name) {
                    return '{h|' + params.name + '}'
                } else {
                    return ''
                }
            };
            treeData.label.rich = {
                a: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#546fc6',
                    // fontSize: 14,
                },
                b: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#7ab1a6',
                    // fontSize: 14,
                },
                c: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#446dd3',
                    // fontSize: 14,
                },
                d: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#904a9b',
                    // fontSize: 14,
                },
                e: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#1ca3c1',
                    // fontSize: 14,
                },
                f: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#3c8418',
                    // fontSize: 14,
                },
                h: {
                    padding: 6,
                    borderRadius: 3,
                    color: '#fff',
                    backgroundColor: '#9e2f5d',
                    // fontSize: 14,
                }
            }

            this.setTreeStyle(treeData.data[0], 0);
        },
        setTreeStyle(treeData, leval) {
            //有name才设置leval
            if (treeData?.name != null && treeData?.name != undefined && treeData?.name != "") {
                leval++;
                let l = leval % 6;

                if (l === 0) {
                    l = 6
                }

                treeData.level = l;

                if (treeData?.children === null || treeData?.children === undefined || treeData?.children.length === 0) {
                    //叶子节点
                    treeData.level = 7;
                }
            }

            if (treeData.children != null && treeData.children != undefined) {
                for (let i = 0; i < treeData.children.length; i++) {
                    this.setTreeStyle(treeData.children[i], leval);
                }
            }
        },
        //计算节点位置
        calculateTreeNodePosition(treeData, attributionProcessResultCode) {
            this.dataIndex++;
            if (treeData.code != null && treeData.code != undefined) {
                if (this.dataIndex === 2) {
                    attributionProcessResultCode += treeData.code;
                } else {
                    attributionProcessResultCode = attributionProcessResultCode + "-" + treeData.code;
                }
                this.codeDataIndexMap.set(attributionProcessResultCode, this.dataIndex);
            }

            if (treeData.children != null && treeData.children != undefined) {
                for (let i = 0; i < treeData.children.length; i++) {
                    this.calculateTreeNodePosition(treeData.children[i], attributionProcessResultCode);
                }
            }

        },
        handleMonthChange() {
            selectWellGroup({
                ogfId: this.queryData.ogfId,
                platformId: this.queryData.assetCode,
                dateTime: this.queryData.month
            }).then((res) => {
                if (res.data.code == 200) {
                    this.wellGroupList = res.data.data;
                    this.wellGroupList.unshift({wellGroupName: '全部', wellGroupId: ''});
                    this.queryData.wellGroup = '全部'
                }
            });
        },
        downexcelmid(){
            let prams = {
                code:this.evalResult
            }
            downloadFile(params).then(res => {
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, params.title + '中间数据导出表.xls');
            })
        },
        downexcel() {
            let params = {
                date: this.queryData.month,
                wellId: this.queryData.well,//井号
                assetCode: this.queryData.assetCode,//平台
                ogfId: this.queryData.ogfId,//油田
                operationZone: this.queryData.orgId,//作业公司
                evalResult: this.evalResult,//编码
                evalTypeId: 'ZS',//判断是否为注水(仅获取注水列表需要传入该参数)
                wellGroupName: this.queryData.wellGroup === '全部' ? '' : this.queryData.wellGroup,//井组ID
                title: ''//对应的标题
            }
            if (this.link == '4') {
                if (this.evalResult == '注水强度变高') {
                    params.evalResult = 'BG'
                } else {
                    params.evalResult = 'BD'
                }
                params.title = this.title
                //查询注水列表接口
                queryWaterInjDownExcel(params).then(res => {
                    const aBlob = new Blob([res]);
                    FileSaver.saveAs(aBlob, params.title + '明细表.xls');
                })
            }
            if (this.link == '6') {
                params.title = this.title
                //查询井组动态分析归因接口
                queryProductionDownExcel(params).then(res => {
                    const aBlob = new Blob([res]);
                    FileSaver.saveAs(aBlob, params.title + '明细表.xls');
                })
            }
            if (this.link == '1' || this.link == '2' || this.link == '3' || this.link == '5') {
                //剩余归因分析共用接口
                params.title = this.title;
                oilWellFluidDownExcel(params).then(res => {
                    const aBlob = new Blob([res]);
                    FileSaver.saveAs(aBlob, params.title + '明细表.xls');
                });
            }
        },
        formatAmount(row, column, cellValue) {
            return Number(cellValue).toFixed(2);
        },
        toFixed,
        //获取查询条件中下拉列表的值
        async getData() {
            let params = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            }
            await userListByUserNames(params).then((res) => {
                this.queryData.orgId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
            })
            await QueryOgfDetail({operationZoneId: this.queryData.orgId}).then((res) => {
                if (res.data.code == 200) {
                    this.oilFields = res.data.data;
                    if (this.oilFields.length == 0) {
                        this.oilField = "";
                    } else {
                        if (this.queryData.orgId == '715AD1CD60484BB59E737CD18A9DE44A') {
                            this.queryData.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F'
                        } else {
                            this.queryData.ogfId = this.oilFields[0].ogfId
                        }
                    }
                    this.selectOilField = this.queryData.ogfId;
                    const requestPlat = {
                        ogfId: this.selectOilField,
                    };
                    selectWellGroup({
                        ogfId: this.queryData.ogfId,
                        dateTime: this.queryData.month
                    }).then((res) => {
                        if (res.data.code == 200) {
                            this.wellGroupList = res.data.data;
                            this.wellGroupList.unshift({wellGroupName: '全部', wellGroupId: ''});
                            this.queryData.wellGroup = '全部'
                        }
                    });
                    QueryWellDetail(requestPlat).then((res) => {
                        this.wellList = res.data.data;
                    });
                    QueryPlatformDetail(requestPlat).then((res) => {
                        if (res.data.code == 200) {
                            this.platforms = res.data.data;
                            this.platforms.map((n) => {
                                if (n.platformName == "全部") {
                                    n.platformId = "";
                                }
                            });
                            // this.queryData.assetCode = "";
                        }
                    });
                }
            });
        },
        //选择后重新复制井号下拉列表
        choicewell() {
            QueryWellDetail({platformId: this.queryData.assetCode}).then((res) => {
                this.wellList = res.data.data;
                if (res.data.data.length) {
                    this.queryData.well = res.data.data[0].wellId
                } else {
                    this.queryData.well = ''
                }
            });
            selectWellGroup({
                ogfId: this.queryData.ogfId,
                platformId: this.queryData.assetCode,
                dateTime: this.queryData.month
            }).then((res) => {
                if (res.data.code == 200) {
                    this.wellGroupList = res.data.data;
                    this.wellGroupList.unshift({wellGroupName: '全部', wellGroupId: ''});
                    this.queryData.wellGroup = '全部'
                }
            });
        },
        //切换分页
        pagination(e) {
            this.queryData.pageNum = e.page;
            this.queryData.pageSize = e.limit;
            this.getFormData()
        },
        // 返回按钮
        returnRouter() {
            this.$router.go(-1);
        },
        choicepla(val) {
            this.queryData.assetCode = ''
            QueryPlatformDetail({ogfId: val}).then(res => {
                this.platforms = res.data.data
                selectWellGroup({
                    ogfId: this.queryData.ogfId,
                    platformId: this.queryData.assetCode,
                    dateTime: this.queryData.month
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.wellGroupList = res.data.data;
                        this.wellGroupList.unshift({wellGroupName: '全部', wellGroupId: ''});
                        this.queryData.wellGroup = '全部'
                    }
                });
            })
        },
        doSearch() {
            this.getFormData()
        },
        result() {
            this.initData();
        },
        //获取表格数据
        getFormData() {
            this.isTableClick = false
            //移除高亮
            this.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: undefined
            })
            let params = {
                date: this.queryData.month,
                wellId: this.queryData.well,//井号
                assetCode: this.queryData.assetCode,//平台
                ogfId: this.queryData.ogfId,//油田
                operationZone: this.queryData.orgId,//作业公司
                evalResult: this.evalResult,//编码
                evalTypeId: 'ZS',//判断是否为注水(仅获取注水列表需要传入该参数)
                pageNum: this.queryData.pageNum,//分页页码
                pageSize: this.queryData.pageSize,//每页条数
                wellGroupName: this.queryData.wellGroup === '全部' ? '' : this.queryData.wellGroup //井组ID
            }
            if (this.link == '4') {
                if (this.evalResult == '注水强度变高') {
                    params.evalResult = 'BG'
                } else {
                    params.evalResult = 'BD'
                }
                //查询注水列表接口
                queryWaterInjIntensityAttributeAnalysis(params).then(res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                })
            }
            if (this.link == '6') {
                //查询井组动态分析归因接口
                queryProductionAnalysisList(params).then(res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                })
            }
            if (this.link == '1' || this.link == '2' || this.link == '3' || this.link == '5') {
                //剩余归因分析共用接口
                oilWellFluidQuery(params).then(res => {
                    this.tableData = res.data.data.rows
                    this.pageTotal = res.data.data.total
                })
            }
        },
        //表格鼠标悬浮事件
        handleCurrentChange(row) {
            if (row == null || row == undefined) {
                return;
            }
            this.isTableClick = true;
            let dataIndex = this.codeDataIndexMap.get(row.attributionProcessResultCode);
            this.chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: dataIndex
            })
        },
    },
};
</script>

<style scoped lang="scss">
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); /* 设置透明度和背景颜色 */
    z-index: 9999; /* 确保div位于其他元素的上方 */
}

.pageBox {
    color: var(--formText);
    position: relative;
    font-family: PingFangSC-Regular, PingFang SC;
}

.topSearchDiv {
    display: flex;
}

.btnPosition {
    margin: 0 0 20px 0;
    justify-content: flex-end;
}

::v-deep .el-table__footer-wrapper td.el-table__cell {
    text-align: center;
}

::v-deep.el-table .el-table__footer-wrapper .cell {
    color: rgb(174, 178, 179);
    font-weight: bolder;
}

::v-deep .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 17px !important;
}
</style>
<style lang="scss" scoped>
::v-deep .el-main {
    padding: 0px 0px 20px;
    overflow: hidden;
}

::v-deep .btnStyle {
    margin-bottom: 0px;
}

.formBox {
    & > div:not(:first-child) {
        margin-left: 20px;
    }
}

.basicTable {
    height: auto;
    // padding-bottom: 10px;
}

::v-deep .el-table .cell:empty::before {
    content: "-";
}

::v-deep .el-table__header-wrapper {
    .cell {
        height: auto !important;
        line-height: 1.5 !important;
        white-space: pre;
    }
}

::v-deep .el-tabs__header {
    margin: 0;
}
</style>
