<template>
    <div class="app-container" style="height: 100%">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="措施效果跟踪表"
            :is-show-max-btn="true"
        >
            <button class="detailLinkBtn" @click="linkroute('analysisReport')">详细</button>
<!--            <span-->
<!--                style="font-size:14px;color: #1ec5e6; position: relative; top: -31px; left: 150px">措施潜力井统计表</span>-->
<!--            <span style="font-size:14px;color: #1ec5e6; position: relative; top: -31px; left: 160px"-->
<!--            >增油量值设置-->
<!--                <div class="inputstyle"><el-input></el-input></div>-->
<!--              </span>-->
            <el-table
                :data="tableData"
                highlight-current-row
                height="calc(100% - 50px)"
                id="tableData"
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px', color: '' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '0px' }"
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%;position: absolute;top:45px"
            >
                <el-table-column width="50px">
                    <template slot="header">
                        <div style="color: #1ec5e6">序号</div>
                    </template>
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="tjrq" width="100px" label="">
                    <template slot="header">
                        <div style="color: #1ec5e6">推荐日期</div>
                    </template>
                </el-table-column>
                <el-table-column prop="wellId" label="">
                    <template slot="header">
                        <div style="color: #1ec5e6">井号</div>
                    </template>
                </el-table-column>
                <el-table-column prop="showLabel" label="">
                    <template slot="header">
                        <div style="color: #1ec5e6">推荐措施</div>
                    </template>
                </el-table-column>
                <el-table-column prop="showMvalue" label="">
                    <template slot="header">
                        <div style="color: #1ec5e6">
                            预计增油量 <br/>
                            (m³/d)
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </info-window>
    </div>
</template>

<script>
import {queryMeasureEffectTrack} from "@/api/rem/reservoirbillboards";

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
            queryMeasureEffectTrack({evaluationDate:'2023-02-20',oilFieldId:'3FC9A818F5BC43B88270DB80BBB3018F'}).then(res=>{
                this.tableData = res.data.data
            })
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
    right: 50px;
    top: 10px;
    width: 50px;
    height: 20px;
    background: linear-gradient(90deg, #0751b0, #50a6ec);
    text-align: center;
    font-size: smaller;
    border: 0;
    cursor: pointer;
    color: #ffffff;
}

.inputstyle ::v-deep.el-input__inner {
    width: 10%;
    position: absolute;
    top: -39px;
    right: 280px;
    height: 20px;
}
</style>
