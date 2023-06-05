<!-- 现场作业计划 -->
<template>
    <div class="app-container" style="height: calc(100% - 1000px)">
        <pagePanel headerTitle="现场作业计划表" style="height: 100%">
            <el-table
                :data="noticeList"
                highlight-current-row
                :row-style="{ height: '0px' }"
                :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
                header-cell-class-name="table_header"
                :cell-style="{ 'text-align': 'center', padding: '2px' }"
                style="width: 100%"
                height="100%"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="*日期" prop="date" align="center"></el-table-column>
                <el-table-column label="*生产单元" prop="prodectionUnit" align="center"></el-table-column>
                <el-table-column label="修井机状态" prop="workvoerRigStatus" align="center"></el-table-column>
                <el-table-column label="当前作业内容" prop="CurrentJobContent" align="center"></el-table-column>
                <el-table-column label="作业井号" prop="JobWellNo" align="center"></el-table-column>
                <el-table-column label="是否动管柱" prop="moveString" align="center"></el-table-column>
                <el-table-column label="开始时间" prop="startTime" align="center"></el-table-column>
                <el-table-column label="预计结束时间" prop="predictedEndTime" align="center"></el-table-column>
                <el-table-column label="当日作业内容简述" prop="oprgDesc" align="center"></el-table-column>
                <el-table-column label="下步作业内容" prop="nextJobContent" align="center"></el-table-column>
                <el-table-column label="作业井号" prop="nextJobWellNo" align="center"></el-table-column>
                <el-table-column label="是否动管柱" prop="moveString01" align="center"></el-table-column>
                <el-table-column label="预计作业时间" prop="predictedJobTime" align="center"></el-table-column>
                <el-table-column label="备注" prop="note" align="center"></el-table-column>
            </el-table>
        </pagePanel>
    </div>
</template>

<script>
import {getOnSiteWork} from '@/api/rem/actionplanmanagement';

export default {
    data() {
        return {
            open: false, // 新增弹框
            dialogVisible: false, //运行计算展示弹窗
            title: '', // 弹窗标题
            company: [],
            oilfield: [],
            deptSelect: [],
            addform: {
                noticeContent: '',
                noticeType: '',
                radio: '',
                sendTime: '',
                deptIds: [],
            },
            // 表格数据
            noticeList: [],
            // 是否展开，默认全部展开
            isExpandAll: true,
            deptList: [],
            // 总条数
            total: 0,
            // 查询参数
            queryParams: {
                actionEvent: '',
                assetCode: '',
                month: this.$route.query.currentDate.substr(0,7),
                ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
                wellNo: '',
                pageNum: 1,
                pageSize: 10,
            },
        };
    },
    created() {
        this.getList();
        // this.choiceDepts(); // 获取组织机构
    },
    methods: {
        show(data) {
            this.queryParams.ogfId = data.selectOilField
            this.queryParams.selectPlatform = data.assetCode
            this.queryParams.month= data.endTime
            getOnSiteWork(this.queryParams).then((res) => {
                if (res.data.code === 200) {
                    this.noticeList = res.data.data.rows;
                } else {
                    this.$message.warning('系统错误请重新尝试或联系运维人员！');
                }
            });
        },
     
        getList() {
            this.queryParams.assetCode = this.$route.query.platform
            if(this.queryParams.assetCode == '3FC9A818F5BC43B88270DB80BBB3018F'){
                this.queryParams.assetCode =''
            }
            getOnSiteWork(this.queryParams).then((res) => {
                if (res.data.code === 200) {
                    this.noticeList = res.data.data.rows;
                } else {
                    this.$message.warning('系统错误请重新尝试或联系运维人员！');
                }
            });
        },
       
    },
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
