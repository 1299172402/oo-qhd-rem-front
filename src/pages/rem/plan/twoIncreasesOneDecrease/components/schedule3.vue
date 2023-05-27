<template>
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="附表3 秦皇岛32-6/渤中作业公司历年自然递减率" :isShowMaxBtn="true">
        <el-table class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" width="60px" fixed></el-table-column>
            <el-table-column prop="operatingcompany" label="作业公司" fixed show-overflow-tooltip></el-table-column>
            <el-table-column prop="oilField" label="油田" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2016" label="2016年" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2017" label="2017年" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2018" label="2018年" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2019" label="2019年" show-overflow-tooltip></el-table-column>
            <el-table-column prop="2020" label="2020年" show-overflow-tooltip></el-table-column>
        </el-table>
    </info-window>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    operatingcompany: '秦皇岛',
                    oilField: 'QHD32-6',
                    2016: '17.49',
                    2017: '14.26',
                    2018: '11',
                    2019: '9.07',
                    2020: '15.41',
                }],
            };
        }
    };
</script>

<style lang="scss" scoped>
    
</style>
