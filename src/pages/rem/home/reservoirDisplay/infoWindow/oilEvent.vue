<!-- 示例组件 -->
<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="油田大事件"
            :is-show-max-btn="true"
        >
            <div class="g-w100 g-h100 g-row-flex" style="">
                <div style="height: 250px; width: 100%" class="g-w100">
                    <button class="detailLinkBtn" @click="linkroute('oilEventDetail')">详细</button>
                    <el-table
                        :data="tableData"
                        highlight-current-row
                        height="calc(100% - 50px)"
                        style="margin-top: 10px;margin: 0"
                        :row-style="{ height: '0px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                        header-cell-class-name="table_header"
                        :cell-style="{ 'text-align': 'center', padding: '2px' }"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column label="序号" min-width="60px" prop="ogfName" align="center">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="大事内容" min-width="180px" show-overflow-tooltip prop="remark" align="center"></el-table-column>
                        <el-table-column label="时间"  prop="startTime" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.startTime?scope.row.startTime.split(' ')[0]:'' }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </info-window>
    </div>
</template>
<script>
import {queryOilFieldIncident} from "@/api/rem/reservoirbillboards";

export default {
    components: {},
    data() {
        return {
            tableData:[]
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        linkroute(rname) {
            this.$router.push({name: rname});
        },
        getData() {
            queryOilFieldIncident({}).then(res => {
                this.tableData = res.data.data.data.slice(0,3)
            })
        }
    }
};
</script>

<style scoped lang="less">
.detailLinkBtn {
    position: absolute;
    right: 60px;
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
</style>