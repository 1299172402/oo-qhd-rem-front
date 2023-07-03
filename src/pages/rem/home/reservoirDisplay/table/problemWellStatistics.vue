<!-- 油藏看板 - 问题井统计-->
<template>
    <div class="app-container" style="height: calc(100%);">
            <div
                style="height: calc(100%)">
                <headerSearch class="g-w100 g-h100" style="height: auto">
                    <el-form :model="queryParams" :inline="true" style="margin-top: 18px">
                        <el-form-item label="油田:" style="margin-left:20px">
                            <el-select v-model="queryParams.ogfId" disabled style="width: 160px;">
                                <el-option v-for="(item, index) in oilFields" :key="index" :label="item.ogfName"
                                           :value="item.ogfId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台:" style="margin-left:20px">
                            <el-select v-model="queryParams.assetCode" @change="choicewell" style="width: 220px">
                                <el-option
                                    v-for="(item, index) in platforms"
                                    :key="index"
                                    :label="item.platformName"
                                    :value="item.platformId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="井号:" style="margin-left:20px">
                            <el-select v-model="queryParams.wellId" clearable style="width: 170px">
                                <el-option v-for="(item, index) in wellList" :key="index" :label="item.wellNo"
                                           :value="item.wellId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="mini"  icon="el-icon-search" type="primary">搜索
                            </el-button>
                            <el-button size="mini" @click="reset" icon="el-icon-refresh" class="commonBtn">重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                </headerSearch>
                <page-panel header-title="油田低产低效井原因及潜力方向" style="flex:1;overflow: hidden" :show-btn="true">
                    <el-table
                        :data="noticeList"
                        ref="table"
                        highlight-current-row
                        height="calc(100% - 35px)"
                        style="margin-top: 10px"
                        :row-style="{ height: '0px' }"
                        id="gzjtj"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                        header-cell-class-name="table_header"
                        :cell-style="{ 'text-align': 'center', padding: '2px' }"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        
                        <el-table-column label="序号" width="50px" type="index" align="center">
                         
                        </el-table-column>
                        <el-table-column label="油田"  align="center">

                        </el-table-column>
                        <el-table-column label="井号"  align="center">

                        </el-table-column>
                        <el-table-column label="低产低效类别"  align="center">

                        </el-table-column>
                        <el-table-column label="生产情况"  align="center">
                            <el-table-column :label="`日产油\n(m³/d)`"  align="center">

                            </el-table-column>
                            <el-table-column :label="`日产气\n(m³/d)`"  align="center">

                            </el-table-column>
                            <el-table-column :label="`含水\n(%)`"  align="center">

                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="低产低效原因"  align="center">
                            <el-table-column label="一级原因"  align="center">

                            </el-table-column>
                            <el-table-column label="二级原因"  align="center">

                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="挖潜方向"  align="center">

                        </el-table-column>
                        <el-table-column label="是否纳入当年计划"  align="center">

                        </el-table-column>
                        <el-table-column :label="`计划日产\n(m³/d)`" align="center">

                        </el-table-column>
                        <el-table-column label="备注"  align="center">

                        </el-table-column>
                    </el-table>
                </page-panel>
               
                <!--        </pagePanel>-->

            </div>
       

    </div>
</template>

<script>

import {
    queryListOfOilfieldQueryPlatformsDetail,
    queryOperatingCompanyDetail,
    queryOperatorsCheckFieldListsDetail
} from "@/api/basic/master";
import {queryPlatformQueryWellListDetail} from "@/api/rem/marster";

export default {
    name: "density",
    dicts: ["sys_normal_disable"],
    components: {
    },
    data() {
        return {
            oilFields: [],
            // 表格数据
            noticeList: [],
            platforms:[],
            wellList:[],
            // 查询参数
            queryParams: {
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
            },
        };
    },
    created() {
        this.getlist();
    },
    methods: {
        getlist() {
            //根据作业公司查询油田
            queryOperatorsCheckFieldListsDetail({orgId:this.queryParams.orgId}).then(res=>{
                this.oilFields = res.data.data
            })
            //根据油田查询平台列表
            queryListOfOilfieldQueryPlatformsDetail({ogfId:this.queryParams.ogfId}).then(res=>{
                this.platforms = res.data.data
            })
            const requestPlat = {
                ogfId: this.queryParams.ogfId,
            };
            queryPlatformQueryWellListDetail(requestPlat).then((res) => {
                this.wellList = res.data.data;
            });
        },
        choicewell() {
            queryPlatformQueryWellListDetail({platformId: this.queryParams.assetCode}).then((res) => {
                this.wellList = res.data.data;
                if (res.data.data.length) {
                    this.queryParams.wellId = this.wellList[0].wellId
                } else {
                    this.queryParams.wellId = ''
                }
            });
        },
      
        // 重置
        reset() {
            this.queryParams.assetCode = ''
            this.queryParams.wellId = ''
            this.getlist()
            // this.getInfo()
        },
    },
};
</script>
<style lang="less" scoped>
#gzjtj {
    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
</style>

