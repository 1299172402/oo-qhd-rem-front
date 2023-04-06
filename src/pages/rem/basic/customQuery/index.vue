<template>
    <div class="app-container">
        <el-row>
            <div style="display: inline-block" >
                <span>油田：</span>
                <el-select v-model="ogfId" @change="getInfo()">
                    <el-option
                        v-for="(item, index) in oilFields"
                        :key="index"
                        :label="item.oilFieldName"
                        :value="item.oilFieldId"
                    />
                </el-select>
            </div>
       
                <div style="display: inline-block;float:right">
                    <el-button
                        icon="el-icon-search"
                        style="margin-right: 30px; "
                        type="primary"
                        @click="doSearch">指标查询
                    </el-button>
                </div>
           
        </el-row>
        <page-panel-new>
            <el-row>
                <el-col span="5" style="margin-left: 50px;margin-right: 20px">
                    <pagePanel headerTitle="目标类型">
                        <el-radio-group v-model="activeTabIndex">
                            <el-radio :label="0">
                                单井
                            </el-radio>
                            <el-radio :label="1">
                                油田(区块)
                            </el-radio>
                        </el-radio-group>
                    </pagePanel>
                </el-col>
                <el-col span="5" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="时间类型">

                    </pagePanel>
                </el-col>
                <el-col span="12" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="数据类型">

                    </pagePanel>
                </el-col>
            </el-row>

            <el-row>
                <el-col span="8" style="margin-left: 50px;margin-right: 20px">
                    <pagePanel headerTitle="状态指标">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="复选框 A"/>
                            <el-checkbox label="复选框 B"/>
                            <el-checkbox label="复选框 C"/>
                        </el-checkbox-group>
                    </pagePanel>
                </el-col>
                <el-col span="6" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="生产指标">

                    </pagePanel>
                </el-col>
                <el-col span="8" style="margin-left: 20px;margin-right: 20px">
                    <pagePanel headerTitle="类产指标">

                    </pagePanel>
                </el-col>
            </el-row>
        </page-panel-new>
        <el-dialog
            title="查询"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
        >
            <span>这是个弹出框</span>
            <span slot="footer" class="dialog-footer">
        <el-button class="cancelBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CustomQuery",
        data() {
            return {
                activeTabIndex: 0,
                checkList: ["复选框 A"],
                dialogVisible: false,
                ogfId: "",
                oilFields: [
                    {
                        oilFieldId: "715AD1CD60484BB59E737CD18A9DE44A",
                        oilFieldName: "秦皇岛32-6"
                    }
                ]
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        methods: {
            // 油井选择改变
            getInfo(val) {
                this.$message.success("选择了油井");
            },
            doSearch(val) {
                this.$message.success("点击了查询" + this.checkList);
                this.dialogVisible = true
            }
        }
    };
</script>
<style lang="less" scoped>
    .app-container {
        height: 100%;

        .el-table {
            overflow: scroll;
        }
    }

    .el-tree {
        max-height: 370px;
        overflow: scroll;
    }

    .pertable thead .el-table-column--selection .cell {
        display: none;
    }
</style>