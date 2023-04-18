<!--开发现状表-->
<template>
    <el-table 
        id="tableData"
        :data="tableData" :border="false" :row-style="{ height: '0px' }"
        header-cell-class-name="table_header" :cell-style="{ padding: '6px', 'text-align': 'center' }"
        style="width:100%;" height="calc(100% - 101px)" :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }">
        <el-table-column prop="indicator" label="指标" align="center"></el-table-column>
        <el-table-column prop="evaluationResult" label="评价结果" align="center"></el-table-column>
        <el-table-column prop="conclusion" label="结论" align="center"></el-table-column>
    </el-table>
</template>

<script>
import { dynamicDataDevelopmentIndexTable } from '@/api/oilDeposit/rem-01/fielddynamicanalysis.js';
import { exportExcel } from '@/lib/exportExcel.js';
export default {
    props: {
        oilFieldId: {},
        blockId: {}
    },
    data() {
        return {
            tableData: []
        };
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        async doSearch() {
            //置空子组件参数
            this.$emit('childPara', '');
            //获得查询参数
            let request = {
                oilFieldId: this.oilFieldId,
                fieldId: this.blockId
            };
            //调用接口方法
            await dynamicDataDevelopmentIndexTable(request).then((res) => {
                if (res.data.code == 200) {
                    if(res.data.data&&res.data.data.dynamicDataDevelopments&&res.data.data.dynamicDataDevelopments.length){
                        let dynamicDataDevelopments = res.data.data.dynamicDataDevelopments;
                        dynamicDataDevelopments.forEach((el,i)=>{
                            if(el.evaluationResult&&el.evaluationResult.includes('.')){
                                let index=el.evaluationResult.indexOf('.');
                                dynamicDataDevelopments[i].evaluationResult=el.evaluationResult.substring(0,index+4);
                            }
                        })
                        this.tableData = dynamicDataDevelopments;
                    }
                }
            });
        },
        //下载
        doDownLoad() {
            let fileName = '开发指标评价表';
            if (this.blockName) {
                fileName = this.blockName + fileName;
            }
            exportExcel('#tableData', fileName);
        }
    }
};
</script>

<style scoped lang="scss">
#tableData {
    ::v-deep .cell:empty {
        &::before {
            content: '-';
        }
    }
}
</style>
