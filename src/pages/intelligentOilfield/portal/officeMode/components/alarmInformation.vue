<!-- 报警信息组件 -->
<template>
  <div style="font-size: 20px; position: relative" class="g-w100 g-h100">
    <info-window infoWidth="100%" infoHeight="100%" headerTitle="报警信息">
      <div class="g-w100 g-h100" style="font-size: 20px">
        <div class="g-row-flex-V aa">
          <div>11</div>
          <div>22</div>
        </div>
        <div>
          <el-table
            height="350px"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '6px 0' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '6px', 'text-align': 'center' }"
            :data="tableData"
            style="width: 98%; height: 100%; margin: 20px"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column prop="roleName" label="报警类型" width="200"> </el-table-column>
            <el-table-column prop="permissions" label="报警名称" width="100"> </el-table-column>
            <el-table-column prop="assigningUser" label="报警内容" min-width="500"> </el-table-column>
            <el-table-column prop="date" label="发送时间" width="350"> </el-table-column>
            <el-table-column label="操作" width="150">
              <template>
                <el-button type="text" size="small" @click="sureWarn">确认</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv">
          </el-pagination>
        </div>
      </div>
    </info-window>
  </div>
</template>
<script>
import infoWindow from '@/components/info-window/index.vue';

export default {
  components: {
    infoWindow,
  },
  data() {
    return {
      tableData: [
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '安全帽识别类型',
          permissions: '安全帽识别',
          assigningUser:
            '报警：安全帽按客户刷卡还是卡上课打瞌睡的货款是的速度还是肯定会卡死啊上课的哈萨克的哈三大石窟的哈萨克的阿松大按时打卡是的卡上打算的卡刷点卡',
          date: '2016-05-04 12:21',
        },
      ],
    };
  },
  methods: {
    sureWarn() {
      console.log('queren');
    },
  },
};
</script>

<style scoped>
.aa {
  justify-content: space-between;
  padding: 20px 20px 0 20px;
}
.paginationDiv {
  position: absolute;
  bottom: 50px;
  right: 0;
  float: right;
  margin-top: 20px;
}
</style>
