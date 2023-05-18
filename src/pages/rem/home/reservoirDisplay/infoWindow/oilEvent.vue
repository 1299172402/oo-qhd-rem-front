<!-- 示例组件 -->
<template>
    <div style="font-size: 20px" class="g-w100 g-h100">
        <info-window
            info-width="100%"
            info-height="100%"
            header-title="油田大事件"
            :is-show-max-btn="true"
        >
            <div class="g-w100 g-h100 g-row-flex" style="padding: 20px">
                <div style="height: 250px; width: 100%" class="g-w100">
                    <button class="detailLinkBtn" @click="linkroute('oilEventDetail')">详细</button>
                    <el-row v-for="(item,index) in tableData" :key="index" style="margin-top: 20px">
                        <el-col :span="2">{{index+1}}</el-col>
                        <el-col :span="16"> {{item.remark}}</el-col>
                        <el-col :span="6"> {{item.startTime.split(' ')[0]}}</el-col>
                    </el-row>
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