<!--动液面等值图-->
<template>
    <div class="gradientBoxLeft">
        <el-row style="margin-top:10px">
            <el-radio-group v-model="radio">
                <el-radio :label="1"><span style="font-size:14px">层位1</span></el-radio>
                <el-radio :label="2"><span style="font-size:14px">层位2</span></el-radio>
                <el-radio :label="3"><span style="font-size:14px">层位3</span></el-radio>
                <el-radio :label="4"><span style="font-size:14px">层位4</span></el-radio>
            </el-radio-group>
        </el-row>
        <el-row style="margin-top:10px;">
            <img style="height: 100%;width:800px" :src="src">
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                radio: 1,
                src: '../../static/img/blockAnalysisAided/dynamicInformation/liquidOilWaterDifference.png'
            };      
        }
    }
</script>