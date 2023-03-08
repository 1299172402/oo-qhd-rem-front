<!-- 后台——用户管理 -->
<template>
    <div class="app-container">
      <el-row :gutter="24">
        <!--用户数据-->
        <el-col :span="24" :xs="24" class="right">
          <el-form :model="queryParam" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="流程名称" prop="processDefinitionName">
              <el-input
                v-model="queryParam.processDefinitionName"
                placeholder="请输入流程名称"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="业务名称" prop="roleId">
                <el-input
                v-model="queryParam.businessName"
                placeholder="请输入业务名称"
                clearable
                size="medium"
                style="width: 240px; height: 40px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="状态" prop="postId">
              <el-select v-model="queryParam.instanceStatus"
               style="width: 240px"
                placeholder="请选择状态"
                 collapse-tags
                 clearable
                 >
                <el-option
                  v-for="item in processStatus"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
               type="primary"
                icon="el-icon-search" 
                size="mini"
                 @click="searchQuery"
                  style="height: 40px"

                >搜索</el-button
              >
              <el-button
               icon="el-icon-refresh"
               size="mini"
               class="commonBtn"
               @click="searchReset"
                >
                重置</el-button>
            </el-form-item>
          </el-form>
          <!-- v-loading="loading" -->
    <pagePanel headerTitle="我的已办">
            <el-table :data="dataSource" height="calc(100% - 125px)"
             :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }">
              <el-table-column label="序号" type="index" width="50"> </el-table-column>
              <el-table-column
                label="流程名称"
                align="center"
                key="processDefinitionName"
                prop="processDefinitionName"
                :show-overflow-tooltip="true"
              />
              <el-table-column 
              label="业务名称" 
              align="center" 
              :show-overflow-tooltip="true"
              prop="businessName"
              key="businessName"
              >
              </el-table-column>
              <el-table-column
                label="发起人"
                align="center"
                key="startUserName"
                prop="startUserName"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="流程创建时间"
                align="center"
                key="startTime"
                prop="startTime"
                :show-overflow-tooltip="true"
              >
            <template slot-scope="scope">
                <span>{{ dayjs(scope.row.startTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template>
            </el-table-column>
              <el-table-column
               label="流程结束时间"
                align="center"
                 key="status"
                 >
                <template slot-scope="scope">
                    <span>{{ scope.row.endTime && dayjs(scope.row.endTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
                </template>
              </el-table-column>
              <el-table-column
               label="状态" 
               align="center" 
               width="160" 
               class-name="small-padding fixed-width"
               key="instanceStatusText"
               prop="instanceStatusText"
              />
              <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handleView(scope.row)" v-hasPermi="['system:user:remove']"
                    >查看</el-button>
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
    </pagePanel>
        </el-col>
      </el-row>
    </div>
  </template>
  
<script>
import dayjs from "dayjs";
import { getAction, postAction } from "@/components/audit/process/api/manage";
import { transformPathToName } from "@/components/audit/utils";
import "@/assets/styles/pages/handleBusinessListStyle.less"
import { getProcessStatus } from "../api/status";
import OpenOtherTab from "@/pages/common/mixins/commonMixin"

export default {
  name: "DoneBusinessList",
  description: "我的已办流程",
  mixins: [OpenOtherTab],
  data () {
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
        showTotal: (total, range) => `${range[0]  }-${  range[1]  } 共${  total  }条`,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      url: {
        list: "/flow/instance/involved"
      },
      processStatus: []
    };
  },
  computed: {
    // 构建查询参数
    generateQueryParam () {
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
  mounted () {
    getProcessStatus().then((res) => {
      if (!res) {
        return;
      }
      this.processStatus = res.result
    })
    this.searchQuery();
  },
  methods: {
    searchQuery () {
      this.dataSource = [];
      this.ipagination.current = 1;
      this.lazyLoad();
    },
    lazyLoad() {
      this.loading = true;
      postAction(this.url.list, this.generateQueryParam).then((res) => {
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
    searchReset () {
      this.queryParam = {};
      this.searchQuery();
    },
    // 查看交接单
    handleView (record) {
      if (this.isWindowOpenOther(record)) {
        return;
      }
      const params = {
        businessKey: record.businessKey, // 交接单id
        processInstanceId: record.processInstanceId // 流程实例id
      };
      getAction(`/flow/instance/${record.processInstanceId}/view-component`, { }).then((res) => {
        if (res.success) {
          if (res.viewComponent) {
            this.$router.push({
              name: transformPathToName(res.viewComponent),
              query: params,
              params: {
                action: "View"
              }
            });
          }
        }
      });
    },
    handleTableChange (pagination) {
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