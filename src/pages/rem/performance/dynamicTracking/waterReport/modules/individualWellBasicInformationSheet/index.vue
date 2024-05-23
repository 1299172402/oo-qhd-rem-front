<!--单井基本信息表-->
<template>
    <pagePanel headerTitle="单井基本信息表" style="height: calc(100% - 101px);" show-btn>
        <el-table id="tableData" :data="tableData" border :row-style="{ height: '0px' }"
                  header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
                  style="width:100%;" height="100%" :default-sort="{ prop: 'date', order: 'descending' }"
                  :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
            <el-table-column prop="wellNo" label="井号"></el-table-column>
            <el-table-column prop="fieldName" min-width="90px" label="区块"></el-table-column>
            <el-table-column prop="coordX" label="井坐标位置" min-width="250px">
                <template slot-scope="scope">
                    <span>{{ 'X：' + scope.row.coordX + ' , Y：' + scope.row.coordY }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="horizontalLength" :label="`水平段长度\n(m)`"></el-table-column>
            <el-table-column prop="completeType" label="完井方式"></el-table-column>
            <el-table-column prop="boreType" label="管柱类型"></el-table-column>
            <el-table-column prop="kb" :label="`补心海拔\n(m)`"></el-table-column>
            <el-table-column prop="baseLevelDepth" :label="`基准面深度\n(m)`"></el-table-column>
            <el-table-column :label="`投注时间\n(yyyy-dd-mm)`">
                <template slot-scope="scope">
                    <span>{{ scope.row.productionDate | formatTime }}</span>
                </template>
            </el-table-column>
        </el-table>
    </pagePanel>
</template>
<script>
import {wellBaseInfo} from '@/api/oilDeposit/rem-01/dynamicAnalysis.js';
import {exportExcel} from '@/lib/exportExcel.js';
import {queryBasicData} from "@/api/rem/oilanalysisreport";

export default {
    filters: {
        formatTime(val) {
            if (val) {
                return new Date(val).format('yyyy-MM-dd');
            } else {
                return '';
            }
        }
    },
    data() {
        return {
            tableData: [],
            oilFeildId: "",
            //选择平台
            platform: "",
            //选择井号
            wellId: "",
        };
    },
    methods: {
        //根据父组件传递过来的参数进行查询
        async doSearch() {
            try {
                const request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId
                };
                const [basicData, wellInfo] = await Promise.all([queryBasicData(request), wellBaseInfo(request)]);
                this.tableData = [Object.assign(wellInfo?.data.data.wellBaseInfo[0], basicData?.data.data[0])]
            } catch (error) {
                // 异常处理
                console.error(error);
            }
        },
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            this.doSearch();
        },
    }
};
</script>

<style scoped lang="scss">
#tableData {
    ::v-deep .cell:empty {
        &::before {
            content: '-';
        }
    }

    ::v-deep .el-table__header-wrapper .cell {
        height: auto;
        line-height: 18px;
        white-space: pre;
    }
}
</style>
