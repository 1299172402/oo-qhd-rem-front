<!-- 后台——用户管理 -->
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!--用户数据-->
      <el-col :span="24" :xs="24" class="right">
        <header-search class="g-w100 g-h100 colon">
          <el-form
            ref="queryForm"
            :model="queryParam"
            :inline="true"
          >
            <el-form-item label="流程名称" prop="processDefinitionName">
              <el-input
                v-model="queryParam.processDefinitionName"
                placeholder="请输入流程名称"
                clearable
                style="width: 240px"
                @keyup.enter.native="searchQuery"
              />
            </el-form-item>
            <el-form-item label="业务名称" prop="roleId">
              <el-input
                v-model="queryParam.businessName"
                placeholder="请输入业务名称"
                clearable
                style="width: 240px"
                @keyup.enter.native="searchQuery"
              />
            </el-form-item>
            <el-form-item class="buttonArea">
              <el-button
                type="primary"
                icon="el-icon-search"
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
        <page-panel-new header-title="我的待办" :style="{height: showFooter ? '86%' : '90%'}">
          <el-table
            :data="dataSource"
            height="calc(100% - 66px)"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
            header-cell-class-name="table_header"
            :cell-style="{ padding: '2px', 'text-align': 'center' }"
            style="width: 100%; height: 100%; margin-top: 20px;"
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
              key="activityName"
              label="当前节点"
              align="center"
              prop="activityName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              key="lastAuditUserName"
              label="上一处理人"
              align="center"
              prop="lastAuditUserName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              key="startUserName"
              label="发起人"
              align="center"
              prop="startUserName"
            />
            <el-table-column
              key="startTime"
              label="创建时间"
              align="center"
              prop="startTime"
            >
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.startTime) }}</span>
              </template>
            </el-table-column>
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
                  @click="handleBusiness(scope.row)"
                >
                  {{ showHandleText(scope.row) }}
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
import { postAction } from "@/api/common/manage";
import "@/assets/styles/pages/handleBusinessListStyle.less";
import OpenOtherTab from "@/pages/common/mixins/commonMixin";
import { mapGetters } from "vuex";
import { getApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";
import jumpSupApp from "@/utils/jumpSupApp.js";
/* eslint-disable */
function routeWatch(val) {
  if (val.path === "/bpm/personalOffice/HandleBusinessList" && this.closeTabKey) {
    this.searchQuery();
    this.$store.dispatch("ToggleCloseTabKey", "");
  }
}
/* eslint-disable */

export default {
  name: "HandleBusinessList",
  description: "我的待办任务",
  mixins: [OpenOtherTab],
  data() {
    return {
      description: "我的待办",
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
      queryParam: {
        processDefinitionName: "",
        businessName: ""
      },
      spinning: false,
      url: {
        list: "/system/flow/integration/todo/assigned"
      }
    };
  },
  computed: {
     ...mapGetters({
      showFooter: "setting/showFooter"
    }),
    ...mapGetters(["closeTabKey"]),
    // 构建查询参数
    generateQueryParam() {
      return {
        procDefName: this.queryParam.processDefinitionName
          ? `%${this.queryParam.processDefinitionName}%`
          : this.queryParam.processDefinitionName,
        businessName: this.queryParam.businessName ? `%${this.queryParam.businessName}%` : this.queryParam.businessName,
        sort: "startTime",
        start: (this.ipagination.current - 1) * this.ipagination.pageSize,
        size: this.ipagination.pageSize
      };
    }
  },
  watch: {
    // eslint-disable-next-line
    $route: routeWatch.bind(this)
  },
  activated() {
    if (this.$route.query.isRefresh) {
      this.searchQuery();
    }
  },
  mounted() {
    this.searchQuery();
    document.addEventListener("visibilitychange", this.visibilitychange);
  },
  beforeDestroy() {
    document.removeEventListener("visibilitychange", this.visibilitychange);
  },
  methods: {
    searchQuery() {
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
    searchReset() {
      this.queryParam = {};
      this.searchQuery();
    },
    handleTableChange(pagination) {
      this.ipagination.current = pagination.page;
      this.ipagination.pageSize = pagination.limit;
      this.lazyLoad();
    },
    // 办理
    handleBusiness(record) {
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
          const query = {
            businessKey,
            processInstanceId,
            taskId: id,
            action: "Audit",
            url: "task"
          };
          jumpSupApp(res.data.data.appPcAccessUrl, query);
        });
    },
    /**
     * 默认显示处理，有特殊需求的特殊显示按钮
     */
    showHandleText(record) {
      return (record.extendProps || {}).audit_button_text || "处理";
    },
    /**
     * 从别的tab回到我的待办时，刷新数据
     */
    visibilitychange() {
      if (!document.hidden) {
        this.lazyLoad();
      }
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