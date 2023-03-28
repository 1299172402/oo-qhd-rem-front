<template>
  <div class="app-container g-h100">
    <headerSearch class="g-w100 g-h100" >
    <el-form :inline="true" @keyup.enter.native="searchQuery" style="margin-top:18px">
      <el-form-item label="项目名称">
        <el-input placeholder="请输入项目名称" v-model="queryParam.projectName" />
      </el-form-item>
      <el-form-item label="客户单位">
        <el-input placeholder="请输入客户单位" v-model="queryParam.customName" />
      </el-form-item>
      <el-form-item label="上传提出人">
        <el-input placeholder="上传提出人" v-model="queryParam.publishUserName" />
      </el-form-item>
      <el-form-item label="上传日期">
        <el-date-picker
          v-model="queryParam.submitTime_flag"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="searchReset" class="commonBtn">重置</el-button>
      </el-form-item>
    </el-form>
    </headerSearch>
    <pagePanelNew headerTitle="生产环境发布列表" style="height: calc(100% - 100px)">
        <el-row :gutter="10" class="mb8" style="margin-bottom:20px">
      <el-col :span="1.5">
    <el-button type="primary" size="mini"  @click="handleAddToPage">发起申请</el-button>
      </el-col>
    </el-row>
      <!-- <gradientBox></gradientBox> -->
      <el-table :data="dataSource" height="calc(100% - 113px)"
        :row-style="{ height: '0px' }" :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header" :cell-style="{ padding: '2px', 'text-align': 'center' }"
        style="width: 100%; height: 100%;" :default-sort="{ prop: 'date', order: 'descending' }">
      >
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="250"> </el-table-column>
        <el-table-column prop="customName" label="客户单位" width="200"> </el-table-column>
        <el-table-column prop="publishUserName" label="上传提出人" width="200"> </el-table-column>
        <el-table-column prop="status" label="状态" width="200">
          <template slot-scope="{ row }">
            <div>
              {{ statusDictMap[row.status] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="publishDate" label="上传时间" width="140"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="handleViewToPage(row)">查看</el-button>
            <el-button v-if="row.canEdit" type="text" size="small" @click="handleEditToPage(row)">编辑</el-button>
            <el-button v-if="row.canAudit" type="text" size="small" @click="handleAuditToPage(row.procInstId, row.id)">审批</el-button>
            <el-button v-if="row.canEdit" type="text" size="small" style="color: #f56c6c" @click="handleDelete(row.id)">删除</el-button>
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
    </pagePanelNew>
  </div>
</template>
<script>
import ListMixin from '@/components/mixins/ListMixin';

export default {
  name: 'ProdEnvironmentReleaseList',
  mixins: [ListMixin],
  dicts: ["prod_env_apply_status"],
  props: {},
  data() {
    return {
      showSearch: '',
      dataSource: [],
      url: {
        list: '/system/apply/list',
        delete: "/system/apply/deleteApplyById"
      },
      routerInfo: {
        edit: {
          name: "ProdEnvironmentReleaseEdit/:action/:id?"
        },
        view: {
          name: "ProdEnvironmentReleaseView/:action/:id?"
        }
      }
    };
  },
  computed: {
    statusDictMap() {
      const map = {};
      this.dict.type.prod_env_apply_status.forEach(item => {
        map[item.value] = item.label
      })
      return map;
    }
  },
  methods: {},
};
</script>
<style scoped lang="less">
/deep/ .el-table__body-wrapper {
    height: 100% !important;
}
</style>