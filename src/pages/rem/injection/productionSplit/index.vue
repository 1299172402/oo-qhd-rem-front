<template>
    <div class="app-container">
        <headerSearch class="g-w100 g-h100" style="height: auto">
            <div class="g-row-flex-V g-w100 g-h100">
                <el-form :model="queryData" :inline="true" style="margin-top: 18px">
                    <el-form-item label="油田：">
                        <el-select
                            v-model="queryData.ogfId"
                            class="f2"
                            style="width: 180px"
                            @change="changeOil"
                        >
                            <el-option
                                v-for="item in oilList"
                                :key="item.ogfId"
                                :label="item.ogfName"
                                :value="{ value: item.ogfId, label: item.ogfName }"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区块：">
                        <el-select v-model="queryData.blockId" @change="changeBlock">
                            <el-option
                                v-for="item in blockList"
                                :key="item.blockId"
                                :label="item.blockName"
                                :value="{ value: item.blockId, label: item.blockName }"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="井别：">
                        <el-select
                            v-model="queryData.wellCategory"
                            class="f2"
                            filterable
                            @change="changeWell"
                        >
                            <el-option
                                v-for="(item, index) in wellCategoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="井号：">
                        <el-select
                            v-model="queryData.wellId"
                            class="f2"
                            multiple
                            @change="selectWell"
                        >
                            <el-option
                                v-for="(item, index) in wellList"
                                :key="item.wellId"
                                :label="item.wellName"
                                :value="{ value: item.wellId, label: item.wellName }"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <div class="fl" style="margin-left: 10px">
                            <el-date-picker
                                v-model="queryData.startTime"
                                type="date"
                                placeholder="开始日期"
                            >
                            </el-date-picker>

                            <el-date-picker
                                v-model="queryData.endTime"
                                type="date"
                                placeholder="结束日期"
                            >
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="doSearch">检索</el-button>
                        <el-button type="primary" size="mini" style="width: 70px" @click="doExportFile">下载</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </headerSearch>

        <pagePanel headerTitle="产量劈分">

            <el-button style="float: right;margin-right: 10px " type="primary" size="mini" @click="splitSection('DividingCoefficient')">
                劈分系数
            </el-button>
            <el-button style="float: right;margin-right: 10px" type="primary" size="mini"  @click="splitSection('splitSection')">劈分剖面
            </el-button>


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
                <el-table-column prop="name" label="井号/层段" width="250">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="airPermeability"
                    align="center"
                    label="渗透率（mD）"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.airPermeability }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="thicknessEffe"
                    align="center"
                    label="有效厚度（m）"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.thicknessEffe }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="oilSplitData" label="产油量（m³）" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oilSplitData }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="oilRatio" label="产油量占比（%）" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oilRatio }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="waterSplitData"
                    label="产水量（m³）"
                    align="center"
                    min-width="100"
                >
                    <!-- <template slot-scope="scope">
                      <span>{{ Math.round(scope.row.waterSplitData / 100) }}</span>
                    </template> -->
                </el-table-column>

                <el-table-column prop="waterRatio" label="产水量占比（%）" align="center" min-width="100">
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
                <el-table-column prop="name" label="井号/层段" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="airPermeability"
                    align="center"
                    label="渗透率(mD)"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.airPermeability }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="thicknessEffe"
                    align="center"
                    label="有效厚度（m）"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.thicknessEffe }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="waterRatio" label="注水量（m³）" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ Math.round(scope.row.waterRatio) }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="waterSplitData"
                    label="注水占比（%）"
                    align="center"
                    min-width="100"
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
        </pagePanel>
    </div>
</template>
<script>
    /*
        import NormalCard from "@/components/tools/NormalCard";
        import {
            getProductionSplit,
            getOgfInfo,
            getblockData,
            getWellData,
            exportProductionSplit
        } from "@/api/ipm-04/r-intelligentIPA.js";
        import { exportExcel } from "@/lib/exportExcel";
        import FileSaver from "file-saver";
    */

    let timeNew = new Date();
    timeNew.setMonth(timeNew.getMonth() - 1);
    timeNew.setDate(1)
    let lastDay = new Date(timeNew.getFullYear(), timeNew.getMonth() + 1, 0);
    let stopTime = new Date('2020-1-1')
    let filterTime = new Date();
    export default {
        name: 'app',
        components: {
            
        },
        data() {
            return {
                queryData: {
                    ogfId: {
                        value: "3FC9A818F5BC43B88270DB80BBB3018F",
                        label: "秦皇岛32-6",
                    }, //油田
                    blockId: {
                        value: "6CD7342CA6DD418183A4B3BC38584F7C",
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
                    {id: "02", name: "水井"},
                ],
                //井号下拉
                wellList: [],
                //table表格数据
                tableData: [],
                //已完成条数
                finishNum: 0,
                tData: [
                    {
                        "airPermeability": 2037,
                        "intervaData": [{
                            "airPermeability": 1554,
                            "intervId": "0909c4eed5ab4acca932e37dc0abb81e",
                            "intervInjRatio": null,
                            "intervNo": "P1",
                            "intervSplit": null,
                            "layerData": [
                                {
                                    "airPermeability": 834,
                                    "intervId": "5cd82fd665de43f9b2d3ee34c72f8e50",
                                    "intervInjRatio": null,
                                    "intervNo": "e95e7b11bae94232b3a1fc87a963c65e",
                                    "intervSplit": null,
                                    "layerData": null,
                                    "layerId": "3300f60185004f37bb0d54d34a68f8fd",
                                    "layerNo": "明化镇组下段0油组4小层",
                                    "oilRatio": 15,
                                    "oilSplitData": 68,
                                    "openStatus": null,
                                    "ratio": null,
                                    "remark": "地层系数",
                                    "stateDate": null,
                                    "thicknessEffe": 5.8,
                                    "waterRatio": 15,
                                    "waterSplitData": 2384,
                                    "wellId": null,
                                    "wellName": null
                                }
                            ],
                            "layerId": "8284eb84b5724ba6b4048c8c468fe612",
                            "layerNo": "92144abf705744018330ffedbb3f190e",
                            "oilRatio": 100,
                            "oilSplitData": 456,
                            "openStatus": null,
                            "ratio": null,
                            "remark": "地层系数",
                            "stateDate": null,
                            "thicknessEffe": 21,
                            "waterRatio": 100,
                            "waterSplitData": 15898,
                            "wellId": null,
                            "wellName": null,
                        }],
                        "oilRatio": 100,
                        "oilSplitData": 456,
                        "remark": "地层系数",
                        "thicknessEffe": 54.8,
                        "waterRatio": 100,
                        "waterSplitData": 15898,
                        "wellId": "022ba67dc7f04949918c100e52585353",
                        "wellInjRatio": null,
                        "wellNo": "QHD32-6-C1",
                        "wellSplit": null
                    },
                    {
                        "name": "111",
                        "airPermeability": "22%",
                        "thicknessEffe": "0.001",
                        "oil": "222",
                        "oilRatio": "333",
                        "water": "4444",
                        "waterRatio": "5555",
                        "remark": "66666",
                    }
                ]
            };
        },
        created() {
            this.queryProductionSplit()
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
                this.queryData.blockId.value = "6CD7342CA6DD418183A4B3BC38584F7C"
                this.queryData.blockId.label = "秦皇岛32-6南区"
                this.queryData.wellCategory = "01"
                this.queryData.wellId = ["DA0269628E74490ABDE198E7D1DBF3EA"]
            }
            this.queryOilFeild();
            this.queryBlockFeild();
            this.queryWellData();
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
            queryOilFeild() {
                /*     getOgfInfo().then((res) => {
                         this.oilList = res.ogfId;
                     });*/
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
                /*       let param = {
                           ogfId: this.queryData.ogfId.value,
                       };
                       getblockData(param).then((res) => {
                           this.blockList = res.blockList;
                       });*/
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
                let params = {
                    blockId: this.queryData.blockId.value,
                    apprndixId: this.queryData.wellCategory,
                };
                /*  getWellData(params).then((res) => {
                      this.wellList = res.wellList;
                  });*/
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
                };
                if (this.queryData.wellId.length == 0 || this.queryData.value.length == 0) {
                    this.tableData = []
                    this.$message({
                        message: "井号，时间未选择",
                        type: 'error',
                        duration: 1500
                    })
                    return
                }
                var res = this.tData
                console.log(res)
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
                    ;
                });
                console.log(res)
                this.tableData = res;

                /* getProductionSplit(params).then((res) => {
                     console.log(res)
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
                         };
                     });
                     console.log(res)
                     this.tableData = res;
                 });*/
            },
            /**
             * 下载
             */
            doExportFile() {
                // exportExcel("#clpf", "产量劈分");
                /*       exportProductionSplit({
                           endTime: this.queryData.endTime,
                           startTime: this.queryData.startTime,
                           wellIdList: this.queryData.wellId.join(','),
                           wellType: this.queryData.wellCategory,
                       }).then((res)=>{
                           const aBlob = new Blob([res.data]);
                           FileSaver.saveAs(aBlob, `产量劈分.xls`);
                       })*/
            },
            /**
             * 搜索
             */
            doSearch() {
                this.queryProductionSplit();
            },

            /**
             * 劈分剖面
             */
            splitSection(str) {
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
                
               /* if (this.queryData.wellId.length > 0) {
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
                }*/
            },

            selectWell(val) {
                console.log(val)
            },
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

            /**
             * 劈分剖面
             */
            splitSections() {
                this.$router.push({name: "splitSection", params: this.queryData});
            },
            /**
             * 劈分系数
             */
            splitCoefficient() {
                this.$router.push({name: "DividingCoefficient", params: this.queryData});
            },
        },
    };
</script>
<style scoped lang="scss">
    ::v-deep .el-icon-arrow-right:before {
        content: "\e6e0";
        color: #66ffff;
        font-size: 16px;
    }

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

    .pertable thead .el-table-column--selection .cell {
        display: none;
    }
</style>
