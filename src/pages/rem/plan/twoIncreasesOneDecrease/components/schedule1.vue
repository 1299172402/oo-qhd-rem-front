<template>
    <pagePanel infoWidth="100%" infoHeight="100%" headerTitle="附表1 秦皇岛32-6作业公司开发现状汇总表" style="height: 100%;" showBtn>
        <el-table class="doubleHeader" :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }" :data="tableData" header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }" height="calc(100% - 40px)">
            <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
            <el-table-column prop="operationarea" label="作业公司" min-width="180" fixed></el-table-column>
            <el-table-column prop="oilField" label="油田" min-width="180" fixed></el-table-column>
            <el-table-column prop="reservoirsType" min-width="160" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>油藏类型</span><br><span style="font-size: 12px">（分公司标准）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="proWellCount" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>油井总数</span><br><span style="font-size: 12px">（口）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="proWellOpen" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>油井开井数</span><br><span style="font-size: 12px">（口）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="wellUtilization" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>油井利用率</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="productionrate" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>生产井时率</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="combinedtimerate" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>综合时率</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="waterWellCount" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>注水井总数</span><br><span style="font-size: 12px">（口）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="waterWellOpen" min-width="120" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>注水井开井数</span><br><span style="font-size: 12px">（口）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="oilproduction" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>月产油量</span><br><span style="font-size: 12px">（10⁴m³）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="dailyoillevel" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>日产油水平</span><br><span style="font-size: 12px">（m³/d）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="dailyfuelcapacity" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>日产油能力</span><br><span style="font-size: 12px">（m³/d）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="Comprehensivegasoilratio" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>综合气油比</span><br><span style="font-size: 12px">（m³/m³）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="compressiveWaterCut" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>综合含水</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="workingreserve" min-width="110" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>动用地质储量</span><br><span style="font-size: 12px">（10⁴t）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="outputSpeed" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>采油速度</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="outputDegree" min-width="100" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>采出程度</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="Designatedrecoveryfactor" min-width="150" label-class-name="twoRowHeader">
                <template #header>
                    <div><span>当前井网标定采收率</span><br><span style="font-size: 12px">（%）</span></div>
                </template>
            </el-table-column>
        </el-table>
    </pagePanel>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    operationarea: "秦皇岛32-6作业公司",
                    oilField: "秦皇岛32-6油田",
                    reservoirsType: "中高渗河流相稠油",
                    proWellCount: "266",
                    proWellOpen: "249",
                    wellUtilization: "93.60",
                    productionrate: "96.60",
                    combinedtimerate: "92.60",
                    waterWellCount: "85",
                    waterWellOpen: "85",
                    oilproduction: "21.9400",
                    dailyoillevel: "7079.4121",
                    dailyfuelcapacity: "7330.12",
                    Comprehensivegasoilratio: "30.13",
                    compressiveWaterCut: "93.60",
                    workingreserve: "15879.0900",
                    outputSpeed: "1.47",
                    outputDegree: "21.80",
                    Designatedrecoveryfactor: "36.80",
                }, ],
            }
        },
    };
</script>
