<!-- 基础数据维护 - 井控储量数据界面 -->
<template>
    <div style="width: 100%; height: 100%" class="pageBox">
        <div style="display: flex;flex-direction: row; height: 100%;">

            <div style=" height: 100%">
                <!--                <tree-multiple-selection :level="'5'" @childinfo='childinfo'/>-->
                <treeSelectionAll
                    ref="treeSelectionAll"
                    level="5"
                    :defaultCheckedKeys="defaultCheckedKeys"
                    @getSelectItems="getSelectItems"
                />
            </div>
            <div
                style="display: flex;flex-direction: column;  height: calc(100%);margin-left: 15px; flex:1;  right: 0; overflow: hidden;">
                <header-search class="g-w100 g-h100" style="height: auto">
                    <div class="g-row-flex-V g-w100 g-h100">
                        <div>
                            <el-form :inline="true">
                                <el-form-item label="油田：">
                                    <el-select v-model="queryData.ogfId" @change="choicepla">
                                        <el-option
                                            v-for="(item, index) in oilFields"
                                            :key="index"
                                            :label="item.ogfName"
                                            :value="item.ogfId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="平台：" prop="pt">
                                    <el-select v-model="queryData.pt" @change="onPlatfromChange">
                                        <el-option v-for="item in platforms" :key="item.platformId"
                                                   :label="item.platformCode"
                                                   :value="item.platformId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="井号：">
                                    <el-select v-model="queryData.wellId" @change="changewell">
                                        <el-option v-for="(item,index) in wells" :key="item.wellId"
                                                   :label="item.wellName"
                                                   :value="item.wellId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="queryserch()" icon="el-icon-search">搜索
                                    </el-button>
                                    <el-button class="commonBtn" @click="refresh()" icon="el-icon-refresh">重置
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </header-search>

                <pagePanel headerTitle="单井储量信息维护界面" style="height: calc(100% - 80px)" class="g-w100"
                           :show-btn="true">
                    <div style="margin-top: 5%">
                        <div class="alltitle">{{ wellName }}</div>
                        <div class="boxall" style="height: 500px; width: 900px; margin: auto">
                            <div style="margin-left:4%;margin-top:100px">
                                <el-form
                                    :model="djclForm"
                                    style="width: 800px; padding-top: 20px"
                                    ref="djclForm"
                                    label-width="110px"
                                    class="demo-ruleForm"
                                >
                                    <el-row>
                                        <el-col :span="10">
                                            <el-form-item label="层位选择" prop="cw">
                                                <el-select v-model="djclForm.layerId" @change="selectcw"
                                                           style="width: 100.5%">
                                                    <el-option
                                                        v-for="item in cwOptions"
                                                        :key="item.layerId"
                                                        :label="item.layerName"
                                                        :value="item.layerId"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">&nbsp;</el-col>
                                        <el-col :span="10">
                                            <el-form-item label="有效厚度" prop="cw">
                                                <el-input v-model="djclForm.thicknessEffe" type="number"
                                                          :disabled="edit"><i
                                                    slot="suffix">m</i></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="10" style="padding-top:30px">
                                            <el-form-item label="控制储量" prop="kzcl">
                                                <el-input v-model="djclForm.probReservesWell" type="number"
                                                          :disabled="edit"><i
                                                    slot="suffix">10⁴m³</i></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">&nbsp;</el-col>
                                        <el-col :span="10" style="padding-top:30px">
                                            <el-form-item label="控制面积" prop="kzmj">
                                                <el-input v-model="djclForm.controlArea" type="number" :disabled="edit">
                                                    <i slot="suffix">km²</i>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10" style="padding-top:30px">
                                            <el-form-item label="可采储量" prop="kzmj">
                                                <el-input v-model="djclForm.recoverableReserves" type="number"
                                                          :disabled="edit">
                                                    <i slot="suffix">10⁴m³</i>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <!-- <el-col :span="2">㎡</el-col> -->
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24" align="right" style="padding-top: 85px;padding-right: 68px">
                                            <el-button type="primary" @click="redact" icon="el-icon-edit">编辑
                                            </el-button>
                                            <el-button type="primary" @click="save">保存</el-button>
                                            <!--                                            <el-button type="primary" icon="el-icon-search">运行计算</el-button>-->
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="boxfoot"></div>
                        </div>
                    </div>

                </pagePanel>
            </div>
        </div>
    </div>
</template>
<script>
import {
    addWellControlReserves,
    queryWellControlReservesLayer,
    queryWellControlReserves
} from "@/api/rem/welldetailedevaluationresult";
import {
    QueryOgfDetail,
    QueryPlatformDetail,
    QueryWellDetail,userListByUserNames
} from "@/api/basic/master";
import treeMultipleSelection from "@/pages/rem/basic/components/index.vue";
import treeSelectionAll from "@/pages/rem/basic/components/treeSelectionAll.vue";

export default {
    name: 'Reserves',
    components: {treeSelectionAll, treeMultipleSelection},
    data() {
        return {
            // 主数据树结构默认选中的值
            defaultCheckedKeys: [],
            cwOptions: [],
            edit: true,
            queryData: {
                assetCode: "",
                month: new Date().format("yyyy-MM"),
                ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
                // wellId: "09D30C16BD1D4F759D53F74941701307",
                wellId: "",
                orgId: "715AD1CD60484BB59E737CD18A9DE44A",
                pt: "",
            },
            deptSelect: [], //作业公司
            wells: [],
            platforms: [],
            oilFields: [],
            djclForm: {
                layerId: '',
                controlArea: '',
                evalDetailId: "",
                probReservesWell: "",
                recoverableReserves: "",
                thicknessEffe: "",
            },
            wellName: "",
        };
    },
    mounted() {
        this.getList();
    },
    watch: {
        queryData: {
            handler(val) {
                let obj = {};
                obj = this.wells.find((item) => {
                    return item.wellId === val.wellId;
                });
                this.wellName = obj?.wellName
            },
            deep: true,
        }
    },
    methods: {
        getSelectItems(selectList, selectData) {
            let ogfId = selectList.ogfId;
            let platformIds = selectList.platformIds;
            let wellIds = selectList.wellIds;

            let ogfIdOld = this.queryData.ogfId;
            let platformIdsOld = this.queryData.pt;
            let wellIdsOld = this.queryData.wellId;

            if (ogfId != ogfIdOld) {
                this.queryData.ogfId = ogfId;
                this.choicepla(ogfId);
            }else if (platformIds != platformIdsOld) {
                this.queryData.pt = platformIds;
                this.onPlatfromChange(platformIds);
            }else if (wellIds != wellIdsOld) {
                this.queryData.wellId = wellIds;
                this.changewell(wellIds);
            }
        },
        getList() {
            //获取作业公司
            let params = {
                searchKeys: [this.$store.getters["user/userDetail"].user.userName],
            }

            userListByUserNames(params).then((res) => {
                this.queryData.orgId = (res.data.data[0]?.currentTenantBindOrgId) ? res.data.data[0].currentTenantBindOrgId : undefined;
            })
            //根据作业公司查询油田
            QueryOgfDetail({operationZoneId: this.queryData.orgId}).then(res => {
                this.oilFields = res.data.data
            })
            //根据油田查询平台列表
            QueryPlatformDetail({ogfId: this.queryData.ogfId}).then(res => {
                this.platforms = res.data.data
                this.queryData.pt = this.platforms[0].platformId;
                QueryWellDetail({platformId: this.queryData.pt}).then((res) => {
                    this.wells = res.data.data
                    this.queryData.wellId = this.wells[0].wellId
                    queryWellControlReservesLayer({wellId: this.queryData.wellId}).then((res) => {
                        this.cwOptions = res.data.data;
                    });

                    this.defaultCheckedKeys = [this.queryData.ogfId, this.queryData.pt, this.queryData.wellId];
                })
            })
        },
        selectcw() {
            let adta = {
                wellId: this.queryData.wellId,
                layerId: this.djclForm.layerId,
            };
            queryWellControlReserves(adta).then((res) => {
                if (res.data.data) {
                    this.djclForm.evalDetailId = res.data.data[0].evalDetailId
                    this.djclForm.thicknessEffe = res.data.data[0].thicknessEffe
                    this.djclForm.probReservesWell = res.data.data[0].probReservesWell
                    this.djclForm.controlArea = res.data.data[0].controlArea
                    this.djclForm.recoverableReserves = res.data.data[0].recoverableReserves
                } else {
                    this.djclForm =  {
                        layerId: '',
                            controlArea: '',
                            evalDetailId: "",
                            probReservesWell: "",
                            recoverableReserves: "",
                            thicknessEffe: "",
                    }
                }
            });
        },
        choicepla(val) {
            QueryPlatformDetail({ogfId: val}).then(res => {
                this.platforms = res.data.data
                this.queryData.pt = this.platforms[0].platformId;
                QueryWellDetail({platformId: this.queryData.pt}).then((res) => {
                    this.wells = res.data.data
                    this.queryData.wellId = this.wells[0].wellId
                    queryWellControlReservesLayer({wellId: this.queryData.wellId}).then((res) => {
                        this.cwOptions = res.data.data;
                    });
                    this.defaultCheckedKeys = [this.queryData.ogfId, this.queryData.pt, this.queryData.wellId];
                })
            })
        },
        redact() {
            if (this.djclForm.layerId == '') {
                this.$message.error('请选择层位！')
                return
            } else {
                this.edit = false;
            }

        },
        queryserch() {
            //获取层位
            queryWellControlReservesLayer({wellId: this.queryData.wellId}).then((res) => {
                this.cwOptions = res.data.data;
            });
        },
        save() {
            this.djclForm.controlArea = Number(this.djclForm.controlArea);
            this.djclForm.probReservesWell = Number(this.djclForm.probReservesWell);
            this.djclForm.thicknessEffe = Number(this.djclForm.thicknessEffe);
            this.djclForm.recoverableReserves = Number(this.djclForm.recoverableReserves);
            addWellControlReserves({...this.djclForm, wellId: this.queryData.wellId}).then((res) => {
                if (res.data.code == 200) {
                    this.edit = true;
                    this.$message.success("保存成功！");
                } else {
                    this.$message.error("系统错误请重新尝试或联系运维人员！");
                }
            });
        },
        //平台下拉-change
       async onPlatfromChange(val) {
          await  QueryWellDetail({platformId: val, ogfId: this.queryData.ogfId}).then((res) => {
                this.wells = res.data.data
                this.queryData.wellId = this.wells[0]?.wellId
                this.defaultCheckedKeys = [this.queryData.ogfId, this.queryData.pt, this.queryData.wellId];
            })
            this.djclForm = {
                layerId: '',
                controlArea: '',
                evalDetailId: "",
                probReservesWell: "",
                recoverableReserves: "",
                thicknessEffe: ""
            }
           await this.queryserch()
        },
        refresh() {
            if (this.queryData.orgId == '715AD1CD60484BB59E737CD18A9DE44A') {
                this.queryData.ogfId = '3FC9A818F5BC43B88270DB80BBB3018F'
            } else {
                this.queryData.ogfId = this.oilFields[0].ogfId
            }
            QueryPlatformDetail({ogfId: this.queryData.ogfId}).then(res => {
                this.platforms = res.data.data
                this.queryData.pt = ''
            })
            QueryWellDetail({ogfId: this.queryData.ogfId}).then((res) => {
                if (res.data.code == 200) {
                    this.wells = res.data.data
                    this.queryData.wellId = this.wells[0].wellId
                    queryWellControlReservesLayer({wellId: this.queryData.wellId}).then((res) => {
                        this.cwOptions = res.data.data;
                    });
                }
            });
            this.djclForm = {
                layerId: '',
                controlArea: '',
                evalDetailId: "",
                probReservesWell: "",
                recoverableReserves: "",
                thicknessEffe: ""
            }
        },
        changewell() {
            this.djclForm = {
                layerId: '',
                    controlArea: '',
                    evalDetailId: "",
                    probReservesWell: "",
                    recoverableReserves: "",
                    thicknessEffe: ""
            }
            this.defaultCheckedKeys = [this.queryData.ogfId, this.queryData.pt, this.queryData.wellId];
            this.queryserch()
        },
        childinfo(data) {
            this.queryData.pt = data[3].value
            this.queryData.wellId = data[4].value
        },
    },
};
</script>

<style scoped>
.pageBox {
    color: var(--formText);
    position: relative;
    font-family: PingFangSC-Regular, PingFang SC;
}

/* .smart-energy-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);
} */
.alltitle {
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
}

.boxall {
    border: 2px solid rgba(25, 186, 139, 0.17);
    /* padding: 0 .2rem .4rem .15rem; */
    margin-left: 20px;
    background-size: 100% auto;
    position: relative;
    width: 100px;
    height: 100px;
    /* margin-bottom: 10px; */
    z-index: 10;
}

.boxall:before,
.boxfoot:before {
    border-left: 10px solid rgb(0, 183, 255);
    left: 0;
}

.boxall:after,
.boxfoot:after {
    border-right: 10px solid rgb(0, 183, 255);
    right: 0;
}

.alltitle {
    color: #fff;
    text-align: center;
    line-height: 30px;
}

.boxfoot {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
}

.boxall:before,
.boxall:after {
    position: absolute;
    width: 50px;
    height: 50px;
    content: "";
    border-top: 4px solid rgb(0, 183, 255);
    top: 0;
}

.boxall:before,
.boxfoot:before {
    border-left: 4px solid rgb(0, 183, 255);
    left: 0;
}

.boxall:after,
.boxfoot:after {
    border-right: 4px solid rgb(0, 183, 255);
    right: 0;
}

.boxfoot:before,
.boxfoot:after {
    position: absolute;
    width: 50px;
    height: 50px;
    content: "";
    border-bottom: 4px solid rgb(0, 183, 255);
    bottom: 0;
}
</style>
<style lang="scss" scoped>
.smart-energy-item {
    width: 1000px;
    height: 500px;
    // text-align: center;
    border: 2px solid #5be4e4;
    margin: 50px auto 30px;
    position: relative;
    padding-top: 70px;
    padding-left: 80px;

    &::after {
        content: "";
        width: calc(100% - 20px);
        height: 100%;
        position: absolute;
        left: 12px;
        top: -1px;
        bottom: -1px;
        border-bottom: 2px solid #0e393b;
        border-top: 2px solid #0e393b;
        z-index: -1;
    }

    &::before {
        content: "";
        width: 100%;
        height: calc(100% - 20px);
        position: absolute;
        left: -1px;
        right: -1px;
        top: 12px;
        border-left: 2px solid #0e393b;
        border-right: 2px solid #0e393b;
        z-index: -1;
    }
}
</style>
