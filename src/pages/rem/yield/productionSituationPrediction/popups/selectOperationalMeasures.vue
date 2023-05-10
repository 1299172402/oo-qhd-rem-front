<template>
    <div>
        <el-row>
            <el-col>您选择的措施是：{{ measureType.label }}</el-col>
        </el-row>
        <div style="height: 400px;overflow: scroll;">
            <el-tree :data="treeList" @node-click="handleNodeClick"></el-tree>
        </div>
        <el-row>
            <el-button type="primary" @click="handleConfirmBtnEvt">确定</el-button>
        </el-row>
    </div>
</template>
<script>
    import { getMeasureTypeList } from "@/api/oilDeposit/rem-03/WellDailyMeasureImprove.js";
    export default {
        props: {
            recvData: Function,
            closeSelDialog: Function
        },
        data() {
            return {
                treeList: [],
                measureType: {
                    label: '',
                    code: ''
                }
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            ogfId() {
                this.init()
            }
        },
        methods: {
            //初始化加载数据
            init() {
                getMeasureTypeList().then(res => {
                    this.treeList = res.data.data
                })
            },
            handleNodeClick(node) {
                this.measureType.label = node.label
                this.measureType.code = node.id
            },
            handleConfirmBtnEvt() {
                // 关闭弹框
                this.recvData(this.measureType)
            }
        }
    }
</script>
