<!-- 产量波动统计表 -->
<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100" style="height:auto;padding-top:18px;padding-bottom:8px;margin-bottom:20px;">
            <div style="display: flex;align-items: center;flex-wrap:wrap;">
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>油田：</span>
                    <el-select v-model="searchForm.ogfId" disabled @change="onFieldChange" style="width:165px;">
                        <el-option v-for="(item, index) in oilFields" :key="index" :label="item.name" :value="item.oilFieldId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>平台：</span>
                    <el-select v-model="searchForm.platId" @change="onPlatfromChange" style="width: 220px;">
                        <el-option v-for="(item, index) in platforms" :key="index" :label="item.platName" :value="item.platFormId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>井号：</span>
                    <el-select v-model="searchForm.wellId" filterable style="width:170px;">
                        <el-option v-for="(item, index) in wells" :key="index" :label="item.wellName" :value="item.wellId"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>对比基准日期：</span>
                    <el-date-picker v-model="searchForm.prodDate" :clearable="false" style="width:160px;" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>对比日期：</span>
                    <el-date-picker v-model="searchForm.prodDateCompare" :clearable="false" style="width:160px;" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <span>影响因素：</span>
                    <el-select v-model="searchForm.influenceFactor" style="width:170px;">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item" :value="item" v-for="(item,index) in measures" :key="index"></el-option>
                    </el-select>
                </div>
                <div style="margin-right:15px;margin-bottom:10px;">
                    <el-button type="primary" icon="el-icon-search" @click="getWellOutputWaveTable">搜索</el-button>
                </div>
            </div>
        </headerSearch>
        <div class="z-container">
            <pagePanelNew style="height:100%;margin-top:0;">
                <div class="pageHeader" style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom:10px;margin-left: 0;">
                    <span>秦皇岛32-6油田单井产量变化</span>
                    <el-button type="primary" style="height:30px;" @click="$router.go(-1)">返回</el-button>
                </div>
                <div class="tableBox" id="tableBox" style="height:calc(100% - 75px)">
                    <el-table 
                      id="tableData" 
                      :data="tableData" 
                      :border="false"
                      :row-style="{ height: '0px' }" 
                      header-cell-class-name="table_header" 
                      :cell-style="{ padding: '6px', 'text-align': 'center' }"
                      style="width: 100%; margin: 20px 0" 
                      height="100%" 
                      :default-sort="{ prop: 'date', order: 'descending' }" 
                      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
                      <el-table-column prop="wellNo" label="井号" width="150"/>
                      <el-table-column :label="searchForm.prodDate">
                        <el-table-column prop="fluidProdDaily" :label="`日产液\n(m³/d)`" width="110" />      
                        <el-table-column prop="oilProdDaily" :label="`日产油\n(m³/d)`" width="110" />
                        <el-table-column prop="waterRatio" :label="`含水\n(%)`" width="110" />
                        <el-table-column prop="dhFlowingPress" :label="`井底流压\n(Mpa)`" width="120" />
                        <el-table-column prop="pumpFrequency" :label="`泵频率\n(Hz)`" width="110" />
                      </el-table-column>
                      <el-table-column :label="searchForm.prodDateCompare">
                        <el-table-column prop="fluidProdDailyCompare" :label="`日产液\n(m³/d)`" width="110" />
                        <el-table-column prop="oilProdDailyCompare" :label="`日产油\n(m³/d)`" width="110" />
                        <el-table-column prop="waterRatioCompare" :label="`含水\n(%)`" width="110" />
                        <el-table-column prop="dhFlowingPressCompare" :label="`井底流压\n(Mpa)`" width="120" />
                        <el-table-column prop="pumpFrequencyCompare" :label="`泵频率\n(Hz)`" width="110" />
                      </el-table-column>
                      <el-table-column label="变化量">
                        <el-table-column :label="`产液对比\n(m³/d)`" width="160">
                            <template slot-scope="{ row }">
                                <span style="display: flex;align-items: center;justify-content: center;">
                                    {{ row.fluidProdDaily!==null?numReduce(row.fluidProdDaily,row.fluidProdDailyCompare):'-' }}
                                    <img src="@/assets/rem/yieId/upTriangle.png" alt="" v-if="row.fluidProdDaily!==null&&numReduce(row.fluidProdDaily,row.fluidProdDailyCompare)>0" style="width:20px;height:20px;">
                                    <span v-if="row.fluidProdDaily!==null&&numReduce(row.fluidProdDaily,row.fluidProdDailyCompare)===0"  style="width:12px;height:3px;background-color: #ffe706;margin-left:8px;"></span>
                                    <img src="@/assets/rem/yieId/downTriangle.png" alt="" v-if="row.fluidProdDaily!==null&&numReduce(row.fluidProdDaily,row.fluidProdDailyCompare)<0" style="width:20px;height:20px;">
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="`产油对比\n(m³/d)`" width="160">
                            <template slot-scope="{row,$index}">
                                <span style="display: flex;align-items: center;justify-content: center;">
                                    {{row.oilProdDaily!==null?row.comparisonOilProduction:'-'}}
                                    <span v-if="row.oilProdDaily!==null" :style="{width:row.comparisonOilWidth+'px',height:'13px',backgroundColor:'#ff9716',marginLeft:'4px'}"></span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="`含水对比\n(%)`" width="160">
                            <template slot-scope="{ row }">
                                <span style="display: flex;align-items: center;justify-content: center;">
                                    {{ row.waterRatio!==null?numReduce(row.waterRatio,row.waterRatioCompare):'-' }}
                                    <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.waterRatio!==null&&numReduce(row.waterRatio,row.waterRatioCompare)>0" style="width:20px;height:20px;">
                                    <img src="@/assets/rem/yieId/equation.png" alt="" v-if="row.waterRatio!==null&&numReduce(row.waterRatio,row.waterRatioCompare)==0" style="width:20px;height:20px;margin-left:8px;">
                                    <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.waterRatio!==null&&numReduce(row.waterRatio,row.waterRatioCompare)<0" style="width:20px;height:20px;">
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="`井底流压对比\n(Mpa)`" width="170">
                            <template slot-scope="scope">
                                {{scope.row.dhFlowingPress!==null?numReduce(scope.row.dhFlowingPress,scope.row.dhFlowingPressCompare):'-'}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="`泵频率对比\n(Hz)`" width="160">
                            <template slot-scope="{ row }">
                                <span style="display: flex;align-items: center;justify-content: center;">
                                    {{ row.pumpFrequency!==null?numReduce(row.pumpFrequency,row.pumpFrequencyCompare):'-' }}
                                    <img src="@/assets/rem/yieId/UP.png" alt="" v-if="row.pumpFrequency!==null&&numReduce(row.pumpFrequency,row.pumpFrequencyCompare)>0" style="width:20px;height:20px;">
                                    <img src="@/assets/rem/yieId/equation.png" alt="" v-if="row.pumpFrequency!==null&&numReduce(row.pumpFrequency,row.pumpFrequencyCompare)==0" style="width:20px;height:20px;margin-left:8px;">
                                    <img src="@/assets/rem/yieId/DOWN.png" alt="" v-if="row.pumpFrequency!==null&&numReduce(row.pumpFrequency,row.pumpFrequencyCompare)<0" style="width:20px;height:20px;">
                                </span>
                            </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column prop="remark" label="备注" width="250"/>
                    </el-table>
                </div>
            </pagePanelNew>
        </div>
    </div>
</template>

<script>
    import { fetchOilFields, fetchPlatforms,fetchInjectionWells, fetchInjectionWellsByPlatform,fetchProductionWells, fetchProductionWellsByPlatform} from '@/api/oilDeposit/rem-02/primaryinfo.js';
    import { fetchMeasureInfos,nameAndCode} from '@/api/oilDeposit/rem-03/oilfieldmanageplan.js';
    import { getWellOutputWaveTable } from "@/api/oilDeposit/rem-04/yieId.js"
    import { exportExcel } from '@/lib/exportExcel.js';
    import * as D3 from "d3"
    export default {
        // name: 'statisticalTableProduction',
        data() {
            return {
                //油田下拉框
                oilFields: [],
                //平台下拉框
                platforms: [],
                //井号下拉框
                wells: [],
                //影响因素
                measures:[
                    '弃井&转注',
                    '新井',
                    '水井&弃井',
                    '关停',
                    '启井',
                    '阶段关井',
                    '提频扩油嘴',
                    '提频缩油嘴',
                    '降频扩油嘴',
                    '降频缩油嘴',
                    '扩油嘴',
                    '缩油嘴',
                    '提频',
                    '降频',
                    '产液上升',
                    '含水上升',
                    '含水下降',
                    '产液下降',
                ],
                //参数
                searchForm:{
                    ogfId:'',
                    platId:'',
                    wellId:'',
                    wellIds:[],//井标识集合
                    prodDate:new Date().addDays(-1).format('yyyy-MM-dd'),//对比基准日期
                    prodDateCompare:new Date().format('yyyy-MM-dd'),//对比日期
                    influenceFactor:''//影响因素
                },
                //表格数据
                tableData: [],
                //产油对比-实际值
                min:0,
                max:0,
                //产油对比-宽度
                min2:10,
                max2:30,
            };
        },
        mounted() {
            if(Object.keys(this.$route.query).length){
                let wellIds=JSON.parse(this.$route.query.wellIds);
                if(wellIds.length){
                    this.searchForm.wellIds=wellIds.map(el=>el.borepipeId);
                }
                this.searchForm.prodDate=this.$route.query.prodDate,
                this.searchForm.prodDateCompare=this.$route.query.prodDateCompare
            }
            this.initData();
        },
        methods: {
            //页面初始化信息
            async initData() {
                //油田
                await fetchOilFields().then((res) => {
                    if (res.data.code == 200) {
                        this.oilFields = res.data.data.oilFields;
                        this.searchForm.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F';
                    }
                });
                //平台
                await fetchPlatforms({oilFieldId: this.searchForm.ogfId}).then((res) => {
                    if (res.data.code == 200) {
                        let platforms=res.data.data.platform;
                        platforms[0].platFormId=this.searchForm.ogfId;
                        this.searchForm.platId=platforms[1].platFormId;
                        this.platforms =platforms;
                    } 
                });
                //井号
                await fetchProductionWells({oilFieldId: this.searchForm.ogfId}).then((res) => {
                    if (res.data.code == 200) {
                        const wellData = res.data.data.productionWells;
                        const wellList = wellData.filter(el => el.wellName);
                        this.wells = [...wellList];
                    }
                });
                this.getWellOutputWaveTable();
            },
            //油田下拉-change
            onFieldChange(val) {
                const request = {
                    oilFieldId:val,
                };
                fetchPlatforms(request).then((res) => {
                    if (res.data.code == 200) {
                        this.platforms = res.data.data.platform;
                    }
                });
            },
            //平台下拉-change
            onPlatfromChange(val) {
                this.wells = [];
                if (this.searchForm.ogfId == this.searchForm.platId) {
                    const request = {
                        oilFieldId:this.searchForm.ogfId
                    };
                    fetchProductionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData = res.data.data.productionWells || [];
                            if (wellData.length) {
                                const wellList = wellData.filter(el => el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                    fetchInjectionWells(request).then((res) => {
                        if (res.data.code == 200) {
                            const waterWellList = res.data.data.injectionWell || [];
                            this.wells = this.wells.concat(waterWellList);
                        }
                    });
                } else {
                    const request = {
                        platformId:this.searchForm.platId
                    };
                    fetchProductionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            let wellData = res.data.data.productionWells || [];
                            if (wellData.length) {
                                const wellList = wellData.filter(el => el.wellName);
                                this.wells = this.wells.concat(wellList);
                            }
                        }
                    });
                    fetchInjectionWellsByPlatform(request).then((res) => {
                        if (res.data.code == 200) {
                            const waterWellList = res.data.data.injectionWell || [];
                            this.wells = this.wells.concat(waterWellList);
                        }
                    });
                }
                this.wells.unshift({wellId: '', wellName: '全部'});
                this.searchForm.wellId = '';
            },
            //产量波动统计表
            getWellOutputWaveTable() {
                if(this.searchForm.wellId){
                    this.searchForm.wellIds=[];
                }
                getWellOutputWaveTable(this.searchForm).then((res) => {
                    if (res.data.code == 200) {
                        let tableData=res.data.data;
                        let minMax=[];
                        if(tableData.length){
                            tableData.forEach((el,i)=>{
                                if(el.oilProdDaily!==null){//产油对比
                                    let comparisonOilProduction=this.numReduce(el.oilProdDaily,el.oilProdDailyCompare);
                                    tableData[i].comparisonOilProduction=comparisonOilProduction;
                                    minMax.push(comparisonOilProduction)
                                }
                            })
                            this.min=Math.min(...minMax);   
                            this.max=Math.max(...minMax);
                            let numScale=D3.scaleLinear();
                            let linearScale=numScale.domain([this.min,this.max]).range([this.min2,this.max2]);
                            tableData.forEach((el,i)=>{
                                if(el.oilProdDaily!==null){//产油对比
                                    tableData[i].comparisonOilWidth=linearScale(el.comparisonOilProduction);
                                }
                            })
                            console.log('table数据',tableData);
                            this.tableData=tableData;
                        }else{
                            this.tableData=[];
                        }
                    }
                });
            },
            //两数相减
            numReduce(num1, num2){
            	const num1Digits = (num1.toString().split('.')[1] || '').length;
            	const num2Digits = (num2.toString().split('.')[1] || '').length;
            	const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
                const num=(num1 * baseNum - num2 * baseNum) / baseNum;
                const rnum= num.toFixed(2);
                return Number(rnum);
            },
            //两数相乘
            accMul(arg1,arg2){
            	var m = 0,
            		s1 = arg1.toString(),
            		s2 = arg2.toString();
            	try {
            		m += s1.split(".")[1].length
            	} catch (e) {}
            	try {
            		m += s2.split(".")[1].length
            	} catch (e) {}
            	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
            },
            //两数相除
            numExcept(a, b) {
                a = isNaN(a) ? 0 : a
                b = isNaN(b) ? 0 : b
                var c, d, e = 0,
                    f = 0;
                try {
                    e = a.toString().split(".")[1].length;
                } catch (g) {
                    g == g
                }
                try {
                    f = b.toString().split(".")[1].length;
                } catch (g) {
                    g == g
                }
                return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.accMul(c / d, Math.pow(10, f - e));
            },
        },
    };
</script>

<style lang="scss" scoped>
    .app-container {
        height: 100%;
        display: flex;
        flex-direction: column;

        .z-container {
            flex: 1;
            height: 0;
        }
        
        
        #tableData{
            ::v-deep .el-table__header-wrapper{
                .el-table__header{
                    thead {
                        tr:last-child{
                            .cell{
                                height: auto;
                                line-height: 18px;
                                white-space: pre;
                            } 
                        }
                    } 
                }
            } 
            ::v-deep .cell:empty{
                &::before {
                    content: '-';
                } 
            }
        } 
    }
</style>
