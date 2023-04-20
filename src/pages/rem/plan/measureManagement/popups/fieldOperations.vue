<!-- 现场作业进度表-弹框 -->
<template>
  <el-dialog title="现场作业进度表" width="1100px" :visible.sync="show" @close="close" @open="open">
    <pagePanelNew style="height: calc(100% - 100px)">
      <div class="tableBox">
        <el-table
          :data="
            tableData.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)
          "
          height="calc(100% - 114px)"
          :row-style="{ height: '0px' }"
          :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
          header-cell-class-name="table_header"
          :cell-style="{ padding: '2px', 'text-align': 'center' }"
          style="width: 100%; height: 100%"
        >
          <el-table-column prop="name1" label="井号"></el-table-column>
          <el-table-column prop="name2" label="作业进度">
            <template slot-scope="scope">
              <div class="progress">
                <div class="progress-item"><span></span></div>
                <div class="progress-title">50%</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name3" label="开始时间"></el-table-column>
          <el-table-column prop="name4" label="预计结束时间"></el-table-column>
          <el-table-column prop="name5" label="当前作业内容"></el-table-column>
        </el-table>
        <pagination
          v-show="pageTotal > 0"
          layout="prev, pager, next,total"
          :pageSizes="[5, 10, 15]"
          :total="pageTotal"
          :page.sync="queryParams.page"
          :limit.sync="queryParams.pageSize"
          @pagination="pagination"
        />
      </div>
    </pagePanelNew>
    <div class="dialog-footer">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>
  
  <script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['']),
    show: {
      get() {
        return this.dialogVisible;
      },
      set() {},
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageTotal: 1,
      queryParams: {
        page: 1,
        pageSize: 5,
      },
      tableData: [
        {
          name1: 'QHD32-6-D18H1',
          name2: '50',
          name3: '2022-07-26 08:00',
          name4: '2022-07-26 18:00',
          name5: '移架井A15井',
        },
      ],
    };
  },
  methods: {
    open() {
      Object.assign(this.$data, this.$options.data());
    },
    close() {
      this.$emit('close');
    },
    /**
     * zxb
     * 切换分页
     *
     */
    pagination(e) {
      this.page = e.page;
      this.pageSize = e.limit;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.tableBox {
  height: 300px;
  .progress {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-item {
      width: 130px;
      height: 16px;
      background: #d4d4d4;
      margin-right: 5px;
      display: flex;
      span {
        width: 50%;
        height: 100%;
        background: #28ff90;
      }
    }
  }
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-button {
    margin-top: 20px;
    width: 100px;
  }
}
</style>
  