<!-- 后台——站内信列表 -->
<template>
  <div class="app-container">
    <!-- <page-panel header-title="站内信" style="height: 100%; margin-top: 0"> -->
    <!-- <el-tabs v-model="activeName" class="g-pageHeader" @tab-click="handleClick">
        <el-tab-pane label="消息列表" name="first"></el-tab-pane>
        <el-tab-pane label="报警列表" name="second"></el-tab-pane>
                                  </el-tabs> -->
    <el-row :gutter="10" class="mb8" style="margin-bottom: 20px;">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:role:add']"
          type="primary"
          size="mini"
          @click="updateAllStatus"
        >
          全部已读({{ num }})
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="dataList"
      height="calc(100% - 103px)"
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '2px', 'text-align': 'center' }"
      style="width: 100%; height: 100%;"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column label="序号" type="index" width="50" />
      <!-- <el-table-column :label="activeName == 'first' ? '消息类型' : '报警类型'" prop="key1" width="150" align="center"
                            :show-overflow-tooltip="true" /> -->
      <el-table-column
        :label="activeName == 'first' ? '消息标题' : '报警名称'"
        prop="title"
        width="150"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        min-width="300"
        :label="activeName == 'first' ? '消息内容' : '报警内容'"
        prop="content"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        label="来源应用"
        align="center"
        prop="appName"
        width="150"
        show-overflow-tooltip
      />
      <!-- <el-table-column label="设施" prop="key5" width="150" align="center" /> -->
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="150"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status === '1'" style="font-size: 14px; color: var(--light-blue-color);">
            已读
          </div>
          <div
            v-else
            style="color: #ff4d4f;font-size: 14px;"
          >
            未读
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      style="bottom: 78px;"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- </page-panel> -->
  </div>
</template>

<script>
import { getByTenantId, updateAllStatus } from "@/api/intelligentOilfield/system/notification.js";

export default {
  dicts: ["sys_normal_disable"],
  data() {
    return {
      activeName: "first",
      num: 4,
      size: [10, 20, 30, 50],
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      dataList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: this.$store.getters["user/userDetail"].user.userId
      }
    };
  },
  created() {
    // tab页显示初始化，路由传参
    this.activeName = this.$route.params.activeName ? this.$route.params.activeName : "first";
  },
  mounted() {
    this.getList();
  },
  methods: {
    /** 查询指标列表 */
    getList() {
      this.loading = true;
      // this.total = this.dataList.length
      this.loading = false;
      // 判断是那个列表先，在请求数据 num计算未读消息的数量
      if (this.activeName === "first") {
        // 消息列表
        getByTenantId(this.queryParams).then(response => {
          this.dataList = response.data.rows;
          this.total = response.data.total;
          this.loading = false;
        });
        getByTenantId({ userId: this.$store.getters["user/userDetail"].user.userId }).then(res => {
          this.num = res.data.rows.filter(item => Number(item.status) === 0).length;
        });
      } else {
        // 报警列表
        // listRole(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        //     this.dataList = response.data.rows;
        //     this.total = response.data.total;
        //     this.loading = false;
        // });
      }
    },
    /** 切换tab标签页 */
    // handleClick() {
    //   this.queryParams.pageNum = 1
    //   this.getList()
    // },
    resetData() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userId: this.$store.getters["user/userDetail"].user.userId
      };
    },
    updateAllStatus() {
      updateAllStatus(this.$store.getters["user/userDetail"].user.userId).then(() => {
        this.getList();
        this.getNoList();
      });
    },
    getNoList() {
      getByTenantId({ userId: this.$store.getters["user/userDetail"].user.userId, status: "0" }).then(res => {
        this.$store.commit("notification/setMsgData", res.data.rows);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.app-container {
  height: 600px;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}
</style>