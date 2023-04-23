<!--吸水剖面-->
<template>
    <el-row style="height: 600px;" :gutter="10">
        <el-col :span="12" style="overflow: auto;">
            <el-image :src="image">
                <div slot="error"></div>
            </el-image>
        </el-col>
        <el-col :span="12">
            <span class="tableTitle"> 吸水剖面测井结果</span>
            <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="600">
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="borepipeName" label="井名称" align="center" width="140"></el-table-column>
                <el-table-column prop="wellTestProjectInterpId" label="试井项目解释标识" width="140" align="center"></el-table-column>
                <el-table-column prop="layerName" label="解释层位" width="140" align="center"></el-table-column>
                <el-table-column prop="topDepth" :label="`顶界深度\n(m)`" width="120" align="center"></el-table-column>
                <el-table-column prop="bottomDepth" :label="`底界深度\n(m)`" align="center" width="120"></el-table-column>
                <el-table-column prop="startPress" :label="`启动压力\n(MPa)`" align="center" width="120"></el-table-column>
                <el-table-column prop="apparentInjectivityIndex" :label="`视吸水指数\n(m³/(MPa·d))`" align="center" width="140"></el-table-column>
                <el-table-column prop="waterInjectivityIndex" :label="`吸水指数\n(m³/(MPa·d))`" align="center" width="140"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center" min-width="180"></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
    import { outProfileLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
    import { downFile } from "@/lib/remBase64Download.js";
    import { exportExcel } from "@/lib/exportExcel.js";
    export default {
        props: {
            //选择油田
            oilFeildId: {},
            //选择平台
            platform: {},
            //选择井号
            wellId: {}
        },
        data() {
            return {
                image: '',
                tableData: [],
            };
        },
        mounted() {
            this.doSearch();
        },
        methods: {
            doSearch() {
                let request = {
                    ogfId: this.oilFeildId,
                    platformId: this.platform,
                    wellId: this.wellId,
                };
                outProfileLoggingInterpretation(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.fileType;
                        let firstParty = 'data:' + type + ';base64,';
                        if (imgData) {
                            this.image = firstParty + imgData;
                        } else {
                            this.image = '';
                        }
                        //注意这里返回有水井和油井的区别
                        this.tableData = res.data.data.injectivityIndexs;
                    }
                })
            },
            doDownLoad() {
                let fileName = '产液剖面';
                if (this.wellName) {
                    fileName = this.wellName + fileName;
                }
                if (this.image){
                    downFile(this.image, fileName);
                    exportExcel('#tableData', fileName);
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    .tableTitle {
        font-size: 1.5em;
        text-align: center;
        display: block;
    }
</style>
