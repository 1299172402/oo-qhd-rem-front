<!-- 后台——用户管理 -->
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24" class="right">
        <header-search class="g-w100 g-h100">
          <el-form
            ref="queryForm"
            :model="queryParam"
            :inline="true"
            label-width="68px;"
            style="height: calc(100% - 100px); margin-top: 18px"
          >
            <el-form-item label="流程名称" prop="processDefinitionName">
              <el-input
                v-model="queryParam.processDefinitionName"
                placeholder="请输入流程名称"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="searchQuery"
              />
            </el-form-item>
            <el-form-item label="业务名称" prop="roleId">
              <el-input
                v-model="queryParam.businessName"
                placeholder="请输入业务名称"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="searchQuery"
              />
            </el-form-item>
            <el-form-item label="状态" prop="postId">
              <el-select
                v-model="queryParam.instanceStatus"
                style="width: 240px"
                placeholder="请选择状态"
                collapse-tags
                clearable
              >
                <el-option
                  v-for="item in dict.type.process_instance_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                style="height: 40px"
                @click="searchQuery"
              >
                搜索
              </el-button>
              <el-button
                icon="el-icon-refresh"
                size="mini"
                class="commonBtn"
                @click="searchReset"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </header-search>
        <!-- v-loading="loading" -->
        <page-panel-new header-title="我的已办" style="height: calc(100% - 90px)">
          <el-table
            :data="dataSource"
            height="calc(100% - 46px)"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '2px', 'text-align': 'center' }"
            style="width: 100%; height: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column
              key="processDefinitionName"
              label="流程名称"
              align="center"
              prop="processDefinitionName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              key="businessName"
              label="业务名称"
              align="center"
              :show-overflow-tooltip="true"
              prop="businessName"
            />
            <el-table-column
              key="startUserName"
              label="发起人"
              align="center"
              prop="startUserName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              key="startTime"
              label="流程创建时间"
              align="center"
              prop="startTime"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{ dayjs(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column key="status" label="流程结束时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime && dayjs(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column
              key="instanceStatusText"
              label="状态"
              align="center"
              width="160"
              class-name="small-padding fixed-width"
              prop="instanceStatusText"
            />
            <el-table-column
              label="操作"
              align="center"
              width="220"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-hasPermi="['system:user:remove']"
                  size="mini"
                  type="text"
                  @click="handleView(scope.row)"
                >
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="ipagination.total > 0"
            :total="ipagination.total"
            :page.sync="ipagination.current"
            :limit.sync="ipagination.pageSize"
            @pagination="handleTableChange"
          />
        </page-panel-new>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { postAction } from "@/api/common/manage";
import "@/assets/styles/pages/handleBusinessListStyle.less";
import OpenOtherTab from "@/pages/common/mixins/commonMixin";
import { getApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";

export default {
  name: "DoneBusinessList",
  description: "我的已办流程",
  dicts: ["process_instance_status"],
  mixins: [OpenOtherTab],
  data() {
    return {
      dayjs,
      description: "我的已办",
      columns: [
        {
          title: "流程名称",
          class: "width-max-width-200",
          dataIndex: "processDefinitionName"
        },
        {
          title: "业务名称",
          dataIndex: "businessName",
          class: "width-max-width-300",
          ellipsis: true
        },
        // {
        //   title: "当前节点",
        //   align: "center",
        //   dataIndex: "activityName"
        // },
        // {
        //   title: "上一处理人",
        //   align: "center",
        //   dataIndex: "lastAuditUserName"
        // },
        {
          title: "发起人",
          dataIndex: "startUserName",
          class: "width-max-width-120"
        },
        {
          title: "流程创建时间",
          dataIndex: "startTime",
          align: "left",
          class: "width-max-width-157",
          scopedSlots: { customRender: "startTime" }
        },
        {
          title: "流程结束时间",
          dataIndex: "endTime",
          align: "left",
          class: "width-max-width-157",
          scopedSlots: { customRender: "endTime" }
        },
        {
          title: "状态",
          dataIndex: "instanceStatusText",
          class: "width-max-width-70"
        },
        {
          title: "操作",
          dataIndex: "action",
          class: "width-max-width-70",
          scopedSlots: { customRender: "action" }
        }
      ],
      queryParam: {
        processDefinitionName: "",
        businessName: ""
      },
      spinning: false,
      loading: false,
      dataSource: [],
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: (total, range) => `${range[0]}-${range[1]} 共${total}条`,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      url: {
        list: "/system/flow/instance/involved"
      },
      processStatus: []
    };
  },
  computed: {
    // 构建查询参数
    generateQueryParam() {
      return {
        procDefName: this.queryParam.processDefinitionName,
        businessName: this.queryParam.businessName,
        instanceStatus: this.queryParam.instanceStatus,
        sort: "startTime",
        start: (this.ipagination.current - 1) * this.ipagination.pageSize,
        size: this.ipagination.pageSize
      };
    }
  },
  mounted() {
    this.searchQuery();
  },
  methods: {
    searchQuery() {
      this.ipagination.current = 1;
      this.lazyLoad();
    },
    lazyLoad() {
      this.loading = true;
      postAction(this.url.list, this.generateQueryParam).then(res => {
        if (!res) {
          this.dataSource = [];
          this.ipagination.total = 0;
        } else {
          this.dataSource = res.data;
          this.ipagination.total = res.total;
        }
        this.loading = false;
        this.spinning = false;
      });
    },
    searchReset() {
      this.queryParam = {};
      this.searchQuery();
    },
    // 查看交接单
    handleView(record) {
      if (this.isWindowOpenOther(record)) {
        return;
      }
      const { appId, businessKey, id, processInstanceId } = record;
      if (!appId) {
        this.$message.error("缺少appId!");
        return;
      }
      getApp(appId)
        .then(res => {
          const url = res.data.data.appPcAccessUrl ? res.data.data.appPcAccessUrl.split("?")[0] : "";
          if (!url) {
            this.$message.error("路径错误!");
            return;
          }
          window.open(`${url}?businessKey=${businessKey}&taskId=${id}&processInstanceId=${processInstanceId}&action=View`, "_blank");
        });
    },
    handleTableChange(pagination) {
      // 分页、排序、筛选变化时触发
      // TODO 筛选
      this.ipagination.current = pagination.page;
      this.ipagination.pageSize = pagination.limit;
      this.lazyLoad();
    }
  }
};
</script>
  <style lang="less" scoped>
.textOverFlow {
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-dialog__body .el-row {
  display: flex;
  justify-content: space-between;
}
</style>