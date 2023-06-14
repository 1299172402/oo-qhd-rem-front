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
                <div style="height: 100%; width: 100%" class="g-w100">
                    <button class="detailLinkBtn" @click="linkroute('oilEventDetail')">详细</button>
                    <el-table
                        id="tableD"
                        :data="tableData"
                        highlight-current-row
                        height="100%"
                        ref="table"
                        style="margin-top: 10px;margin: 0"
                        :row-style="{ height: '50px' }"
                        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                        header-cell-class-name="table_header"
                        :cell-style="{ 'text-align': 'center', padding: '2px' }"
                        :default-sort="{ prop: 'date', order: 'descending' }"
                    >
                        <el-table-column label="序号" min-width="30px" prop="ogfName" align="center">
                            <template slot-scope="scope" style="height: 100%">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column label="大事内容" prop="remark" align="center">
                            <template slot-scope="scope">
                                <div class="table-name">{{ scope.row.remark }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="时间" min-width="40px" prop="startTime" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.startTime ? scope.row.startTime.split(' ')[0] : '' }}</span>
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
            tableData: []
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
                this.tableData = res.data.data.data.slice(0, 10)
                this.$nextTick(()=>{
                    this.infinitScroll()
                })
            })
        },
        infinitScroll() {
            const table = this.$refs.table;
            const divData = table.bodyWrapper
            divData.onmouseover = function () {
                clearInterval(t);
            };
            divData.onmouseout = function () {
                start()
            };
            let t;
            function start() {
                if (divData.clientHeight >= divData.scrollHeight){
                    return;
                }
                t = setInterval(() => {
                    divData.scrollTop += 1
                    if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
                        divData.scrollTop = 0
                    }
                }, 100)
            }
            start()
        },
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

.table-name {
    line-height: 100%;
    white-space: pre-wrap; /* 强制换行 */
}

::v-deep #tableD .cell {
    height: auto !important;
}
</style>