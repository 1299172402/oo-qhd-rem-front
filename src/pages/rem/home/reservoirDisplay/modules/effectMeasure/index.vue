<template>
    <div class="app-container" style="height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="措施建议表"
            :is-show-max-btn="true"
        >
            <el-button class="buttonActive_primary detailLinkBtn"  type="primary" @click="linkroute('OilAnalysisReport')">详细</el-button>
            <el-button class="buttonActive_primary detailLinkBtn"  type="primary"  style="right:110px"  @click="downtable">下载</el-button>
            <el-table
                :data="tableData"
                highlight-current-row
                height="calc(100% - 50px)"
                id="tablecsxg"
                border
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px', color: '' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '0px' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
               
            >
                <el-table-column width="50px">1
                    <template slot="header">
                        <div >序号</div>
                    </template>
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="evalTime" width="100px" label="">
                    <template slot="header">
                        <div >评价日期</div>
                    </template>
                    <template slot-scope="scope">
                        <span v-if="scope.row.evalTime !== null && scope.row.evalTime !== ''">{{scope.row.evalTime}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="wellName" label="">
                    <template slot="header">
                        <div >井号</div>
                    </template>
                    <template slot-scope="scope">
                        <span v-if="scope.row.wellName !== null && scope.row.wellName !== ''">{{scope.row.wellName}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="evalEvidence" label="">
                    <template slot="header">
                        <div >推荐措施</div>
                    </template>
                    <template slot-scope="scope">
                        <span v-if="scope.row.evalEvidence !== null && scope.row.evalEvidence !== ''">{{scope.row.evalEvidence}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="itemValue" label="">
                    <template slot="header">
                        <div >
                            预计增油量(m³/d)
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <span v-if="scope.row.itemValue !== null && scope.row.itemValue !== ''">{{scope.row.itemValue}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </el-table>

        </info-window>
    </div>
</template>

<script>
import {queryMeasureEffectTrack} from "@/api/rem/reservoirbillboards";
import {exportExcel} from "@/lib/exportExcel";
export default {
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData(){
            queryMeasureEffectTrack({evaluationDate:'',oilFieldId:'3FC9A818F5BC43B88270DB80BBB3018F'}).then(res=>{
                if(res.data.data){
                    this.tableData = res.data.data                    
                }
            })
        },
        downtable(){
                exportExcel("#tablecsxg", "措施建议表");
        },
        linkroute(rname) {
            this.$router.push({name: rname});
        },
    }
};
</script>

<style lang="scss" scoped>
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

.detailLinkBtn {
position: absolute;
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 20px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}

.inputstyle ::v-deep.el-input__inner {
    width: 10%;
    position: absolute;
    top: -39px;
    right: 280px;
    height: 20px;
}
</style>
