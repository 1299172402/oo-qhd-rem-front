<!-- 流程平台首页——应用查询 -->
<template>
  <div class="Process-container">
    <!-- 查询 -->
    <div>
      <el-form
        v-show="showSearch"
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="应用名称">
          <el-input v-model="queryParams.appName" placeholder="请输入应用名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList">
            搜索
          </el-button>
          <el-button icon="el-icon-refresh" @click="searchReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 租户卡片 -->
    <div class="footer-box container-box--background">
      <div>
        <div v-if="dataSource.length > 0">
          <div class="body-style list-height">
            <div v-for="(item, index) in dataSource" :key="index">
              <process-center-card
                :process-center-info="item"
                :dict-text="dict.type.sys_app_category"
                :process-tenant-list="processAppList"
                @renovate="getList"
              />
            </div>
          </div>
          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            :page-sizes="pageSizes"
            @pagination="getList"
          />
        </div>
        <el-empty v-else :image-size="250" style="margin-top: 80px;" />
      </div>
    </div>
  </div>
</template>
<script>
import ProcessCenterCard from "@/pages/intelligentOilfield/configurationCenter/processCenter/modules/ProcessCenterCard.vue";

import { listApp } from "@/api/intelligentOilfield/system/applicationCenter/applicationCenter.js";
import { processTenantList } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/tenant.js";

export default {
  name: "ProcessCenterApply",
  components: {
    ProcessCenterCard
  },
  dicts: ["sys_app_category"],
  data() {
    return {
      dataSource: [],
      // 显示搜索条件
      showSearch: true,
      processAppList: [],
      // 所有应用的id
      ids: [],
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        appName: ""
      },
      pageSizes: [5, 8, 10]
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      listApp(this.queryParams).then(res => {
        this.dataSource = res.data.rows;
        this.total = res.data.total;
        this.ids = this.dataSource.map(item => item.appId);
        processTenantList({ tenantIds: this.ids }).then(res => {
          if (res && res.status === 200) {
            this.processAppList = res.data;
          }
        });
      });
    },
    searchReset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 8,
        appName: ""
      };
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.body-style {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}
</style>