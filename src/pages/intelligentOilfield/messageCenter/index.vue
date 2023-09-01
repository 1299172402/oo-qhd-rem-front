<!-- 后台——消息日志 -->
<template>
  <div class="app-container">
    <header-search class="g-w100 g-h100 colon">
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
      >
        <el-form-item label="消息主题" prop="messageType">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入消息主题"
            clearable
            style="width: 240px;"
          />
        </el-form-item>
        <el-form-item label="消息内容" prop="summary">
          <el-input
            v-model="queryParams.summary"
            placeholder="请输入消息内容"
            clearable
            style="width: 240px;"
          />
        </el-form-item>
        <el-form-item label="消息状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择消息状态"
            clearable
          >
            <el-option
              v-for="item in [{value:'SUCCESS', text:'成功'},{value:'FAILURE', text:'失败'}]"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="送达时间" prop="postId">
          <el-date-picker
            v-model="dataTimeRange"
            style="width: 240px;"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item class="buttonArea">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            class="commonBtn"
            @click="resetQuery"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>

    <page-panel-new header-title="消息日志">
      <el-row class="mbBottom">
        <el-col class="placeholder" :span="20">
          <el-button
            v-hasPermi="['message:config']"
            type="primary"
            @click="onMessageConfig"
          >
            配置
          </el-button>
        </el-col>
        <el-col :span="4" style="text-align: right;">
          <el-button
            v-hasPermi="['message:export']"
            type="primary"
            @click="handleExport"
          >
            导出
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="data"
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="序号"
          type="index"
          width="55"
          align="center"
        />
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :label="item.label"
          :prop="item.props"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="item.props !== 'status'">{{ columnsFormatter(scope.row, item.props) }}</span>
            <span v-else>
              <el-tag v-if="scope.row[item.props] === 'SUCCESS'">成功</el-tag>
              <el-tag v-if="scope.row[item.props] === 'FAILURE'" type="danger">失败</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-hasPermi="['message:view']" type="text" @click="handleView(scope.row.id, scope.row)">
              查看
            </el-button>
            <!-- <el-button
              v-if="scope.row.status === 'FAILURE'"
              v-hasPermi="['message:retry']"
              type="text"
              @click="handleResend(scope.row)"
            >
              重试
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
      <!-- 邮件类型查看 -->
      <mail-view ref="mailView" />
      <!-- 短信类型查看 -->
      <sms-view ref="smsView" />
      <!-- 错误日志查看 -->
      <error-log-view ref="errorView" />
      <!-- 其他类型查看 -->
      <logging-view ref="loggingView" />
    </page-panel-new>
  </div>
</template>

<script>
import { get } from "lodash";

import MailView from "./components/mailViewDialog.vue";
import SmsView from "./components/smsViewDialog.vue";
import LoggingView from "./components/loggingViewDialog.vue";
import ErrorLogView from "./components/errorLogViewDialog.vue";

import { filterObj } from "@/utils/objectOperate";
import { listMessage, reSendMail, reSendSms } from "@/api/intelligentOilfield/messaging";
import exportFile from "@/utils/exportFile.js";

const columns = [
  { props: "title", label: "消息主题" },
  { props: "summary", label: "消息内容" },
  { props: "messageType", label: "发送方" },
  { props: "recipients", label: "接收方" },
  { props: "sentTime", label: "送达时间" },
  { props: "createdTime", label: "创建时间" },
  { props: "status", label: "消息状态" }
];
export default {
  name: "MessageLog",
  dicts: ["sys_message_type"],
  components: {
    MailView,
    SmsView,
    LoggingView,
    ErrorLogView
  },
  data() {
    return {
      loading: false,
      data: [],
      columns,
      showSearch: true,
      // 查询参数
      total: 0,
      messageTypelabel: {},
      queryParams: {
        pageNo: 1,
        pageSize: 10
      },
      dataTimeRange: []
    };
  },
  watch: {
    // 送达时间查询项
    dataTimeRange() {
      this.queryParams.sentTimeStart = this.dataTimeRange && this.dataTimeRange[0];
      this.queryParams.sentTimeEnd = this.dataTimeRange && this.dataTimeRange[1];
    }
  },
  created() {
    this.$on("dictReady", () => {
      this.messageTypelabel = this.dict.label.sys_message_type;
    });
  },
  mounted() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      filterObj(this.queryParams);
      return listMessage(this.queryParams).then(res => {
        this.data = res.records;
        this.total = res.total;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNo: 1, pageSize: 10 };
      this.dataTimeRange = [];
      this.$nextTick(() => {
        this.handleQuery();
      });
    },
    /** 配置跳转 */
    onMessageConfig() {
      this.$router.push({ name: "MessageSubject" });
    },
    /** * 表格展示特殊格式化 */
    columnsFormatter(row, prop) {
      let re = get(row, prop);
      switch (prop) {
        case "messageType":
          re = this.messageTypelabel[re] || re || "";
          break;
        case "sentTime":
          re = re || "-"; break;
        default: break;
      }
      return re;
    },
    /** 查看操作 */
    handleView(id, row) {
      if (row.status === "SUCCESS") {
        if (row.messageType === "SMS") {
          return this.$refs.smsView.show(id);
        }
        if (row.messageType === "MAIL") {
          return this.$refs.mailView.show(id);
        }
        return this.$refs.loggingView.show(id);
      }
      return this.$refs.errorView.show(id);
    },
    /** 重试发送消息操作 */
    handleResend(row) {
      if (row.exposeKey) {
        if (row.messageType === "SMS") {
          reSendSms(row.exposeKey).then(res => {
            if (res.status === 200) {
              this.$modal.msgSuccess("发送成功");
            }
          });
        } else if (row.messageType === "Mail") {
          reSendMail(row.exposeKey).then(res => {
            if (res.status === 200) {
              this.$modal.msgSuccess("发送成功");
            }
          });
        }
      }
    },
    /**
     * 消息日志导出
     */
    handleExport() {
      exportFile("/message-service/management/logging/export", this.queryParams);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  .el-table {
    overflow: scroll;
  }
}
</style>