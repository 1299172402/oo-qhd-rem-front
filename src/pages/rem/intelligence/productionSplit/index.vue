<template>
    <div id="app-container" style="height: 100%">
        <header-search>
            <el-form style="margin-top: 20px" :inline="true">
                <el-form-item label="油田：">
                    <el-select
                        v-model="queryData.ogfId"
                        style="width: 180px"
                        @change="changeOil"
                    >
                        <el-option
                            v-for="item in oilList"
                            :key="item.ogfId"
                            :label="item.ogfName"
                            :value="{ value: item.ogfId, label: item.ogfName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区块：">
                    <el-select v-model="queryData.blockId">
                        <el-option
                            v-for="item in blockList"
                            :key="item.reservoirAnalyseUnitId"
                            :label="item.reservoirAnalyseUnitName"
                            :value="{ value: item.reservoirAnalyseUnitId, label: item.reservoirAnalyseUnitName }"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井别：">
                    <el-select v-model="queryData.wellCategory" filterable @change="changeWell" style="width: 100px">
                        <el-option
                            v-for="item in wellCategoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井号：">
                    <el-select
                        v-model="queryData.wellId"
                        class="collapseTags"
                        collapse-tags
                        multiple
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="item in wellList"
                            :key="item.wellId"
                            :label="item.wellName"
                            :value="item.wellId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker
                        v-model="queryData.value"
                        type="daterange"
                        style="width: 250px"
                        placeholder="请选择"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="createChange"
                    ></el-date-picker>
                </el-form-item>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    style="margin-left: 20px"
                    @click="doSearch"
                >搜索
                </el-button>
                <el-button
                    class="commonBtn"
                    icon="el-icon-refresh"
                    style="margin-left: 20px"
                    @click="resettingQuery"
                >重置
                </el-button>
                <el-button type="primary" style="float: right" class="buttonActive_primary" v-if="$route.query.page" @click="$router.push({name:$route.query.page});">返回</el-button>
            </el-form>
        </header-search>
        <page-panel
            :show-btn="true"
            header-title="产量劈分"
            style="margin-top: 20px;height: calc(100% - 80px)"
        >
            <div style="margin-bottom: 20px">
                <el-button
                    type="primary"
                    @click="splitSection('SplitSection')"
                >劈分剖面
                </el-button>
                <el-button
                    type="primary"
                    style="margin-left: 20px"
                    @click="splitSection('DividingCoefficient')"
                >劈分系数
                </el-button>
                <el-button
                    type="primary"
                    @click="doExportFile"
                    style="float: right"
                >下载
                </el-button>
            </div>
            <el-table
                :data="tableData"
                v-if="queryData.wellCategory == '01'"
                row-key="id"
                id="clpf"
                highlight
                height="calc(100% - 80px)"
                style="width: 100%; margin-top: 10px"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column prop="name" align="center" label="井号/层段"  width="250">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name.includes("秦皇岛32-6")? scope.row.name.replace("秦皇岛32-6", "QHD32-6") : scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="airPermeability"
                    align="center"
                    label="渗透率?（mD）"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.airPermeability }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="thicknessEffe"
                    align="center"
                    label="有效厚度?（m）"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.thicknessEffe }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="oilSplitData" label="产油量?（m³）" :render-header="renderheader" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oilSplitData }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="oilRatio" label="产油量占比?（%）" :render-header="renderheader" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oilRatio }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="waterSplitData"
                    label="产水量?（m³）"
                    align="center"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <!-- <template slot-scope="scope">
                      <span>{{ Math.round(scope.row.waterSplitData / 100) }}</span>
                    </template> -->
                </el-table-column>

                <el-table-column prop="waterRatio" label="产水量占比?（%）" :render-header="renderheader" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.waterRatio }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="remark" label="备注" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-table
                :data="tableData"
                v-else
                row-key="id"
                id="clpf"
                highlight
                height="calc(100% - 80px)"
                style="width: 100%; margin-top: 10px"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column prop="name" align="center" label="井号/层段" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="airPermeability"
                    align="center"
                    label="渗透率?(mD)"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.airPermeability }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="thicknessEffe"
                    align="center"
                    label="有效厚度?（m）"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.thicknessEffe }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="waterRatio" label="注水量?（m³）" :render-header="renderheader" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ Math.round(scope.row.waterRatio) }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="waterSplitData"
                    label="注水占比?（%）"
                    align="center"
                    min-width="100"
                    :render-header="renderheader"
                >
                    <!-- <template slot-scope="scope">
                      <span>{{ Number(scope.row.waterSplitData / 100).toFixed(1) }}</span>
                    </template> -->
                </el-table-column>

                <!-- <el-table-column prop="waterRatio" label="产水量占比(%)" align="center" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.waterRatio }}</span>
                </template>
                </el-table-column>-->

                <el-table-column prop="remark" label="备注" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </page-panel>
    </div>
</template>
<script>

import {
    getProductionSplit,
    exportProductionSplit
} from "@/api/rem/r-intelligentIPA.js";
import {exportExcel} from "@/lib/exportExcel";
import {getuserListByUserNames,getFieldListsDetail,getblockData,getWellData} from "@/api/basic/masterBycoderXu.js"
import FileSaver from "file-saver";

let timeNew = new Date();
timeNew.setMonth(timeNew.getMonth() - 1);
timeNew.setDate(1)
let lastDay = new Date(timeNew.getFullYear(), timeNew.getMonth() + 1, 0);
let stopTime = new Date('2020-1-1')
let filterTime = new Date();
export default {
    name: 'productionSplit',
    components: {},
    data() {
        return {
            orgId:'',
            queryData: {
                ogfId: {
                    value: "3FC9A818F5BC43B88270DB80BBB3018F",
                    label: "秦皇岛32-6",
                }, //油田
                blockId: {
                    // value: "6CD7342CA6DD418183A4B3BC38584F7C",
                    value: "YCFXDY8B643EDC9007F96F570600457D",
                    label: "秦皇岛32-6南区",
                }, //区块
                wellCategory: "01", //井别
                wellId: ["DA0269628E74490ABDE198E7D1DBF3EA"], //井号
                value: [timeNew.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')],
                // ['2022-10-24', '2022-11-24']
                startTime: '',
                endTime: ''
            },
            //油田下拉框
            oilList: [],
            datePickOptions: {
                disabledDate: (time) => {
                    if (time.getTime() > filterTime.getTime()) {
                        return true;
                    } else if (time.getTime() < stopTime.getTime()) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
            //区块下拉
            blockList: [],
            //井别下拉
            wellCategoryList: [
                {id: "01", name: "油井"},
                {id: "02", name: "水井"}
            ],
            //井号下拉
            wellList: [],
            //table表格数据
            tableData: [],
            //已完成条数
            finishNum: 0,
        };
    },
    created() {
        const params = JSON.parse(localStorage.getItem('PRODUCTION_SPLIT'))
        if (params && params.blockId) {
            this.queryData.ogfId.value = params.ogfId.value
            this.queryData.ogfId.label = params.ogfId.label
            this.queryData.blockId.value = params.blockId.value
            this.queryData.blockId.label = params.blockId.label
            this.queryData.wellCategory = params.wellCategory
            this.queryData.value = params.value
            let arr = []
            params.wellId.forEach(item => {
                arr.push(item.wellId)
            })
            this.queryData.wellId = arr
            localStorage.removeItem('PRODUCTION_SPLIT')
        } else {
            this.queryData.ogfId.value = "3FC9A818F5BC43B88270DB80BBB3018F"
            this.queryData.ogfId.label = "秦皇岛32-6"
            this.queryData.blockId.value = "YCFXDY8B643EDC9007F96F570600457D"
            this.queryData.blockId.label = "秦皇岛32-6南区"
            this.queryData.wellCategory = "01"
            this.queryData.wellId = ["DA0269628E74490ABDE198E7D1DBF3EA"]
        }
        this.getuserListByUserNamesData();
        
        
        this.createChange(this.queryData.value)
        
    },
    //方法
    methods: {
        createChange(dates) {
            if (dates && dates.length == 2) {
                this.queryData.startTime = dates[0];
                this.queryData.endTime = dates[1];
            } else {
                this.queryData.startTime = "";
                this.queryData.endTime = "";
            }
        },
        /**
         * 获取油田
         */
        getuserListByUserNamesData(){
          let params = {
            searchKeys:[this.$store.getters["user/userDetail"].user.userName],
          }
          getuserListByUserNames(params).then((res)=>{
            this.orgId=res.data.data[0].currentTenantBindOrgId
            this.queryOilFeild()
          })

        },
        queryOilFeild() {
          getFieldListsDetail({operationZoneId:this.orgId}).then((res) => {
            this.oilList = res.data.data;
            var list =res.data.data;
            for(var i=0;i<list.length;i++){
              if(list[i].ogfId==='3FC9A818F5BC43B88270DB80BBB3018F'){
                this.queryData.ogfId.value=list[i].ogfId
              }
            }
            this.queryBlockFeild()
          });
        },
        //改变油田
        changeOil() {
            // this.queryData.blockId = "";
            this.queryData.wellId = [];
            this.queryBlockFeild();
        },
        /**
         * 获取区块
         */
        queryBlockFeild() {
          getblockData({ogfId:this.queryData.ogfId.value}).then((res) => {
            this.blockList = res.data.data;
            for(var i=0;i<this.blockList.length;i++){
              if(this.blockList[i].reservoirAnalyseUnitId=="83D33B89B0DAB7DFA440BD060746883A"){
                this.queryData.blockId.value=this.blockList[i].reservoirAnalyseUnitId
              }
            }
            this.queryWellData();
          });
        },
        /**
         * 改变区块
         */
        changeBlock(e) {
            console.log(e)
            this.queryData.wellId = [];
            if (this.queryData.wellCategory) {
                this.queryWellData();
            }
        },
        /**
         * 改变井别
         */
        changeWell() {
            if (this.queryData.blockId) {
                this.queryData.wellId = []
                this.tableData = []
                this.queryWellData();

            }
        },
        /**
         * 井号下拉
         */
        queryWellData() {
            // let params = {
            //     blockId: this.queryData.blockId.value,
            //     apprndixId: this.queryData.wellCategory,
            // };
            var welltypeName=null;
            if(this.queryData.wellCategory==="01"){
              welltypeName='采油井'
            }else {
              welltypeName='注水井'
            }
            getWellData({blockId:this.queryData.blockId.value,ogfId:this.queryData.ogfId.value,wellboreType:welltypeName,objectState:'生产'}).then((res) => {
                this.wellList=res.data.data
                this.queryProductionSplit()
                // this.wellList = res.wellList;
            });
        },
        /**
         * 获取表格数据
         */
        queryProductionSplit() {
            let params = {
                endTime: this.queryData.endTime,
                startTime: this.queryData.startTime,
                wellIdList: this.queryData.wellId.join(','),
                wellType: this.queryData.wellCategory,
                blockId: this.queryData.blockId.value,
            };
            if (this.queryData.wellId.length == 0 || this.queryData.value.length == 0) {
                this.tableData = []
                this.$message.error("井号或时间未选择")
                return
            }
            getProductionSplit(params).then((res) => {
                res.forEach((item) => {
                    item.name = item.wellNo;
                    item.id = item.wellId;
                    item.airPermeability = Math.floor(item.airPermeability)
                    item.oilSplitData = Math.floor(item.oilSplitData)
                    // item.waterSplitData = item.waterSplitData * 100;
                    item.oilRatio = Number(item.oilRatio).toFixed(1)
                    item.waterRatio = Number(item.waterRatio).toFixed(1)
                    item.thicknessEffe = Number(item.thicknessEffe).toFixed(1)
                    if (item.intervaData) {
                        item.children = item.intervaData;
                        item.intervaData.forEach((inter) => {
                            inter.name = inter.intervNo;
                            inter.id = inter.intervId;
                            inter.airPermeability = Math.floor(inter.airPermeability)
                            inter.oilSplitData = Math.floor(inter.oilSplitData)
                            inter.thicknessEffe = Number(inter.thicknessEffe).toFixed(1)
                            inter.oilRatio = Number(inter.oilRatio).toFixed(1)
                            // inter.waterSplitData = inter.waterSplitData * 100
                            inter.waterRatio = Number(inter.waterRatio).toFixed(1)
                            if (inter.layerData && inter.layerData.length > 0) {
                                inter.layerData.map((layer) => {
                                    layer.name = layer.layerNo;
                                    layer.id = layer.layerId;
                                    layer.airPermeability = Math.floor(layer.airPermeability)
                                    layer.oilSplitData = Math.floor(layer.oilSplitData)
                                    layer.thicknessEffe = Number(layer.thicknessEffe).toFixed(1)
                                    layer.oilRatio = Number(layer.oilRatio).toFixed(1)
                                    // layer.waterSplitData = layer.waterSplitData * 100
                                    layer.waterRatio = Number(layer.waterRatio).toFixed(1)
                                    return layer;
                                });
                                inter.children = inter.layerData;
                            }
                        })
                    }
                });
                this.tableData = res;
            });
        },
        /**
         * 下载
         */
        doExportFile() {
            // exportExcel("#clpf", "产量劈分");
            exportProductionSplit({
                endTime: this.queryData.endTime,
                startTime: this.queryData.startTime,
                wellIdList: this.queryData.wellId.join(','),
                wellType: this.queryData.wellCategory,
                blockId: this.queryData.blockId.value,
            }).then((res) => {
                const aBlob = new Blob([res]);
                FileSaver.saveAs(aBlob, `产量劈分.xls`);
            })
        },
        /**
         * 搜索
         */
        doSearch() {
            this.queryProductionSplit();
        },
        resettingQuery(){
            this.queryData.wellId = [""];
            this.queryData.wellCategory = '01'
            this.queryData.blockId = {
                value: "6CD7342CA6DD418183A4B3BC38584F7C",
                label: "秦皇岛32-6南区",
            },
            this.queryData.value = [timeNew.format('YYYY-MM-DD'), lastDay.format('YYYY-MM-DD')]
            this.doSearch()
        },

        /**
         * 劈分剖面
         */
        splitSection(str) {

            if (this.queryData.wellId.length > 0) {
                let arr = []
                this.queryData.wellId.forEach(item => {
                    this.wellList.forEach(data => {
                        if (item == data.wellId) {
                            let obj = {
                                wellName: data.wellName,
                                wellId: data.wellId
                            }
                            arr.push(obj)
                        }
                    })
                })
                let crr = {
                    ogfId: {
                        value: this.queryData.ogfId.value,
                        label: this.queryData.ogfId.label,
                    }, //油田
                    blockId: {
                        value: this.queryData.blockId.value,
                        label: this.queryData.blockId.label,
                    }, //区块
                    wellCategory: this.queryData.wellCategory, //井别
                    wellId: arr, //井号
                    value: this.queryData.value,
                }
                localStorage.setItem('PRODUCTION_SPLIT', JSON.stringify(crr));
                this.$router.push({
                    name: str,
                    params: crr
                })
            } else {
                this.$message.error("请填写完毕")
            }
        },
        renderheader(h, {column, $index}) {
            return h('span', {}, [
                h('span', {}, column.label.split('?')[0]),
                h('br'),
                h('span', {}, column.label.split('?')[1])
            ]);
        },
        selectWell(val) {
            console.log(val)
        }
        /**
         * 劈分系数
         */
        // splitCoefficient () {
        //   if (this.queryData.wellId.length > 0) {
        //     let arr = []
        //     this.queryData.wellId.forEach(item => {
        //       this.wellList.forEach(data => {
        //         if (item == data.wellId) {
        //           let obj = {
        //             wellName: data.wellName,
        //             wellId: data.wellId
        //           }
        //           arr.push(obj)
        //         }
        //       })
        //     })
        //     this.$router.push({
        //       name: "DividingCoefficient",
        //       params: {
        //         ogfId: {
        //           value: this.queryData.ogfId.value,
        //           label: this.queryData.ogfId.label,
        //         }, //油田
        //         blockId: {
        //           value: this.queryData.blockId.value,
        //           label: this.queryData.blockId.label,
        //         }, //区块
        //         wellCategory: this.queryData.wellCategory, //井别
        //         wellId: arr, //井号
        //         value: this.queryData.value,
        //       }
        //     });
        //   } else {
        //     this.$message.error("请填写完毕")
        //   }
        // },
    },
};
</script>
<style scoped lang="scss">
::v-deep .el-icon-arrow-right:before {
    content: "\e6e0";
    color: #66ffff;
    font-size: 16px;
}

#clpf {
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
