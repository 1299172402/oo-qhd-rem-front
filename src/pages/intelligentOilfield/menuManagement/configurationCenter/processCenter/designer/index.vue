<!-- 后台——流程设计器 -->
<template>
  <div class="app-container process-design g-h100">
    <header-search class="g-w100 g-h100">
      <el-form
        v-show="showSearch"
        style="margin-top: 18px"
        :model="queryParams"
        :inline="true"
        @keyup.enter.native="searchQuery"
        @submit.native.prevent
      >
        <el-form-item label="标签">
          <el-select
            v-model="queryParams.tags"
            multiple
            filterable
            placeholder="请选择标签"
          >
            <el-option
              v-for="dict in dict.type.lc_design_tag"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="流程名称">
          <el-input v-model="queryParams.filter" placeholder="请输入流程名称" clearable />
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="queryParams.sort" filterable placeholder="请选择排序方式">
            <el-option
              v-for="dict in dict.type.lc_design_sort"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchQuery">
            查询
          </el-button>
          <el-button class="commonBtn" icon="el-icon-refresh" @click="searchReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </header-search>

    <page-panel-new header-title="流程设计" style="height: calc(100% - 100px)">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <template v-if="$route.query.identify">
            <process-info
              label="新建流程"
              btn-type="primary"
              :renovate="renovate"
              :process-center-info="processCenterInfo"
              :body-scroll="true"
              @input="showProcessInfo(true)"
              @ok="reLoadData"
            />
          </template>
        </el-col>
        <el-col :span="1.5">
          <import-file
            :base-url="prefixApi"
            upload-url="/app/rest/import-process-model"
            btn-text="导入流程(bpmn文件)"
            class="gap--left"
            accept=""
            @ok="searchQuery"
          />
        </el-col>
      </el-row>
      <div class="footer-box" style="border: none;height: calc(100% - 120px)">
        <ul class="flow-list list-height">
          <li
            v-for="item in dataSource"
            :key="item.id"
            class="flow-list__item"
            @click="handleEditToPage(item.id)"
          >
            <div class="flow-list__item-pic" :style="{'background-image': `url(${prefixApi}/app/rest/models/${item.id}/thumbnail/nocheck?${Math.random() * 1000})`}">
              <span class="flow-list__item-pic__version">
                <i>V</i>
                {{ item.version }}
              </span>
            </div>
            <div class="flow-list__item-info">
              <p title="流程名称" class="flow-list__item-info__name">
                <svg-icon
                  class="svg-icon-class"
                  icon-class="component"
                />
                {{ item.name }}
              </p>
              <p title="创建人" class="flow-list__item-info__create-by">
                <svg-icon
                  class="svg-icon-class"
                  icon-class="user"
                />
                {{ item.createdBy }}
              </p>
              <p title="更新时间" class="flow-list__item-info__create-time">
                <svg-icon
                  class="svg-icon-class"
                  icon-class="time"
                />  {{ item.lastUpdated | moment }}
              </p>
              <p title="流程描述" class="flow-list__item-info__desc">
                <svg-icon
                  class="svg-icon-class"
                  icon-class="education "
                />
                {{ item.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <pagination
        :page-sizes="ipagination.pageSizes"
        :total="ipagination.total"
        :limit="ipagination.pageSize"
        :page="ipagination.current"
        @pagination="handlePage"
      />
    </page-panel-new>
  </div>
</template>

<script>
import { processCenterPrefixApiMixin, ProcessListMixin } from "../indexMixin";
import ImportFile from "@/components/intelligentOilfield/FileUpload/ImportFile.vue";
import ProcessInfo from "./modules/ProcessInfo.vue";

import { list } from "@/pages/intelligentOilfield/configurationCenter/processCenter/api/designer.js";

export default {
  name: "Designer",
  dicts: ["lc_design_sort", "lc_design_tag"],
  components: {
    ImportFile,
    ProcessInfo
  },
  mixins: [ProcessListMixin, processCenterPrefixApiMixin],
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      fn: {
        list
      },
      queryParamsOther: {
        order: "desc"
      },
      queryParams: {
        sort: "lastUpdated"
      },
      routeInfo: {
        edit: "PROCESSDETAIL_FORM"
      },
      renovate: false,
      processCenterInfo: {
        tenantCode: this.$route.query.identify
      }
    };
  },
  methods: {
    /**
     * searchReset 重载，默认按照修改时间查询
     */
    searchReset() {
      this.queryParams = {
        sort: "lastUpdated"
      };
      this.loadData();
    },
    handleEditToPage(id) {
      this.$router.push({ name: "ProcessDetail/:id?", params: { id }});
    },
    /**
     * 控制流程模型显示和隐藏
     */
    showProcessInfo(val) {
      this.renovate = val;
    },
    /**
     * 重新加载数据
     */
    reLoadData() {
      this.loadData();
    }
  }
};
</script>

<style scoped lang="less">
.app-container .pagination-container{
  position: relative;
}

ul.flow-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  li {
    display: block;
    margin: 1%;
    width: 17.8%;
    padding-bottom: 20%;
    height: 0;
    border: 1px solid #dadada;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    .flow-list__item-pic {
      position: absolute;
      width: 100%;
      height: 80%;
      padding-top: 5px;
      background-repeat: no-repeat;
      background-position-y: 20px;

      img {
        width: 100%;
        height: 80%;
      }

      .flow-list__item-pic__version {
        border: 1px solid gainsboro;
        background: bisque;
        border-radius: 10px;
        text-align: center;
        margin: 2px;
        color: cadetblue;
        padding-left: 3px;
        padding-right: 3px;
        position: absolute;
        top: 2px;
        left: 2px;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .flow-list__item-info {
      background: #e8edf1;
      position: absolute;
      width: 100%;
      bottom: -52px;
      line-height: 28px;
      min-height: 60%;
      color: #373e48;
      font-size: 13px;
      padding-left: 5px;
      transition: bottom 0.5s ease;
    }

    &:hover .flow-list__item-info {
      bottom: 0;
    }
  }
}
</style>