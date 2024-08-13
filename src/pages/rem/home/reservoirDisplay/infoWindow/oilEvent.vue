<!-- 示例组件 -->
<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="油田单井大事件"
            :is-show-max-btn="true"
        >
            <div class="g-w100 g-h100 g-row-flex" style="">
                <div style="height: 100%; width: 100%" class="g-w100">
                    <el-button  type="primary" class="buttonActive_primary detailLinkBtn" @click="linkroute('OilEventDetail')">详情</el-button>
                    <el-table
                        id="tableD"
                        :data="tableData"
                        highlight-current-row
                        height="100%"
                        ref="table"
                        border
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
                                <div style="text-align: left" class="table-name">{{ remark(scope.row) }}</div>
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
            tableData: [],
            queryData: {
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                wellId: "",
                platformId: "",
                selectDate: [],
                event: [],
                page: 1,
                pageSize: 10,
                orgId: '715AD1CD60484BB59E737CD18A9DE44A',
            },
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
            var nowTime = new Date();
            var year = nowTime.getFullYear();
            nowTime =
                nowTime.getFullYear() +
                "-" +
                (nowTime.getMonth() + 1 >= 10 ? nowTime.getMonth() + 1 : "0" + (nowTime.getMonth() + 1)) +//月份从0开始
                "-" +
                (nowTime.getDate() >= 10 ? nowTime.getDate() : "0" + nowTime.getDate());
            var startTime = year + "-" + "01-01";
            var endTime = nowTime;
            this.$set(this.queryData.selectDate, 0, startTime);
            this.$set(this.queryData.selectDate, 1, endTime);
            
            let params = {
                ogfId: this.queryData.ogfId,
                platformId: this.queryData.platformId,
                wellId: this.queryData.wellId,
                chronicleTypeCode: this.queryData.event,
                startTime: this.queryData.selectDate ? this.queryData.selectDate[0] : '',
                endTime: this.queryData.selectDate ? this.queryData.selectDate[1] : ''
            }
            
            queryOilFieldIncident(params).then(res => {
                this.tableData = res.data.data.rows.slice(0, 10)
                this.$nextTick(()=>{
                    this.infinitScroll()
                })
            })
        },
        remark(row){
            const text = row.remark;
            const firstChar = text.charAt(0);
            const isLetter = /^[A-Za-z]$/.test(firstChar);
            if (isLetter) {
               return text
            } else {
               return row.wellNo.substring(row.wellNo.lastIndexOf("-") + 1) + '井' + text
            }
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
    right: 45px;
    top: 10px;
    width: 50px;
    line-height: 23px;
    padding: 0 !important;
    height: 20px !important;
    font-size: smaller !important;
    text-align: center !important;
}

.table-name {
    line-height: 100%;
    white-space: pre-wrap; /* 强制换行 */
}

::v-deep #tableD .cell {
    height: auto !important;
}
</style>