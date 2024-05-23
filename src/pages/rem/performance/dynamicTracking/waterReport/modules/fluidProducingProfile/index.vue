<!--吸水剖面-->
<template>
    <page-panel header-title="吸水剖面" style="height: 600px;" show-btn>
     <div class="z-main" style="height: 100%">
        <div class="z-row" style="margin-right:20px;">
            <div class="z-draw">

            </div>
        </div>
        <div class="z-row">
            <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="100%">
                <el-table-column prop="testWellTime" label="测井日期" fixed align="center" width="120"></el-table-column>
                <el-table-column prop="layerName" label="解释层位" fixed align="center" min-width="150"></el-table-column>
                <el-table-column prop="dailyInj" :label="`吸水量\n(m³)`" align="center" min-width="80"></el-table-column>
                <el-table-column prop="topDepth" :label="`顶界深度\n(m)`" align="center" min-width="80"></el-table-column>
                <el-table-column prop="bottomDepth" :label="`底界深度\n(m)`" align="center" min-width="80"></el-table-column>
                <el-table-column prop="startPress" :label="`启动压力\n(MPa)`" align="center" min-width="80"></el-table-column>
                <el-table-column prop="apparentInjectivityIndex" :label="`视吸水指数\n(m³/(MPa·d))`" align="center" min-width="130"></el-table-column>
                <el-table-column prop="waterInjectivityIndex" :label="`吸水指数\n(m³/(MPa·d))`" align="center" min-width="130"></el-table-column>
                <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180"></el-table-column> -->
            </el-table>
        </div>
    </div>
    </page-panel>
</template>

<script>
import { outProfileLoggingInterpretation } from "@/api/oilDeposit/rem-01/dynamicAnalysis.js";
import { downFile } from "@/lib/remBase64Download.js";
import { exportExcel } from "@/lib/exportExcel.js";
export default {
  
    data() {
        return {
            image: '',
            tableData: [],
            oilFeildId: "",
            //选择平台
            platform: "",
            //选择井号
            wellId: "",
        };
    },
    methods: {
        passValue(val) {
            this.oilFeildId = val.ogfId;
            this.platform = val.assetCode;
            this.wellId = val.selectWellId;
            this.doSearch();
        },
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
    },
};
</script>

<style scoped lang="scss">
.z-main{
    display: flex;
    height:calc(100% - 101px);
    .z-row{
        width:0;
        flex:1;
        ::v-deep .el-table__fixed-header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .el-table__header-wrapper .cell{
            height: auto;
            line-height: 18px;
            white-space: pre;
        }
        ::v-deep .cell:empty{
            &::before {
                content: '-';
            }
        }
        .z-draw{
            height:100%;
            background-color: #b4c7e7;
        }
    }
}
</style>
