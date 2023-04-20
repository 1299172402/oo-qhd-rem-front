<!--井组连通图-->
<template>
    <div class="z-main">
        <div class="z-container">
            <div class="v1">
                <page-panel-new style="height:100%;margin-top:0;" show-btn>
                    <div class="v1-con">
                        <el-image :src="image">
                            <div slot="error"></div>
                        </el-image>
                    </div>
                </page-panel-new>
            </div>
            <div class="v2">
                <el-table id="tableData" highlight :data="tableData" style="width: 100%" height="100%">
                    <el-table-column type="index" label="序号" align="center"></el-table-column>
                    <el-table-column prop="proWell" label="井名" align="center"></el-table-column>
                    <el-table-column prop="wellType" label="井别" align="center"></el-table-column>
                    <!-- <el-table-column prop="layerThickness" label="油层厚度"></el-table-column>
                    <el-table-column prop="injWell" label="注水井"></el-table-column>
                    <el-table-column prop="injLayer" label="水井层位"></el-table-column>
                    <el-table-column prop="injLayerThickness" label="水井层位厚度"></el-table-column> -->
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {conectionPlot} from "@/api/oilDeposit/rem-01/wellgroupdynamicanalysis.js";
    import {downFile} from "@/lib/remBase64Download.js";
    import {exportExcel} from "@/lib/exportExcel.js";
    export default {
        props: {
            //油田id
            oilFieldId: {},
            //区块id
            blockId: {},
            //层系id
            layerId: {},
            //井组id
            wellGroupId: {}
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
                    oilFieldId: this.oilFieldId,
                    fieldId: this.blockId,
                    fieldLayerId: this.layerId,
                    wellGroupId: this.wellGroupId,
                };
                conectionPlot(request).then((res) => {
                    if (res.data.code == 200) {
                        let imgData = res.data.data.data;
                        let type = res.data.data.type;
                        let firstParty = 'data:' + type + ';base64,';
                        if (imgData) {
                            this.image = firstParty + imgData;
                        } else {
                            this.image = '';
                        }
                        this.tableData = res.data.data.wellGroupConnections;
                    }
                });
            },
            doDownLoad() {
                let fileName = '井组连通图';
                if (this.wellGroupName) {
                    fileName = this.wellGroupName + fileName;
                }
                downFile(this.image, fileName);
                exportExcel('#tableData', fileName);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .z-main {
        width: 100%;
        height: calc(100% - 101px);
        display: flex;
        flex-direction: column;

        .z-container{
            width: 100%;
            flex:1;
            height:0;
            display: flex;
            overflow-y: scroll;
            .v1{
                flex:2;
                margin-right:20px;
                .v1-con{
                    width:100%;
                    height:100%;
                    overflow-y: scroll;
                }
            }
            .v2{
                flex:1;
            }
        }
    }
</style>
