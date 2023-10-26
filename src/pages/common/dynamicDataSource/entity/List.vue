<template>
  <div>
    <div class="staffList">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px;"
      >
        <el-form-item label="模拟各租户库都有此员工表-使用master数据源查询" prop="noticeContent" />
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery('dataSource4', 'staffList')"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataSource4"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="Id"
          prop="id"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="数据源"
          prop="source"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="员工姓名"
          prop="staffName"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="性别"
          prop="staffSex"
          :show-overflow-tooltip="true"
          align="center"
        />
      </el-table>
    </div>
    <div class="orderList">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px;"
      >
        <el-form-item label="只有共享库有此表-租户库没有该表" prop="noticeContent" />
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery('dataSource', 'orderList')"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataSource"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="Id"
          prop="id"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="产品Id"
          prop="productId"
          :show-overflow-tooltip="true"
          align="center"
        />
      </el-table>
    </div>
    <div class="productList">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px;"
      >
        <el-form-item label="只有租户库有此表-共享库库没有该表" prop="noticeContent" />
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery('dataSource2', 'productList')"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataSource2"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="Id"
          prop="id"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="产品名称"
          prop="productName"
          :show-overflow-tooltip="true"
          align="center"
        />
      </el-table>
    </div>
    <div class="productList2">
      <el-form
        ref="queryForm"
        :model="queryParams"
        :inline="true"
        style="margin-top: 18px;"
      >
        <el-form-item label="共享库-租户库级联查询" prop="noticeContent" />
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery('dataSource3', 'productList2')"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataSource3"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 100%;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          label="排序Id"
          prop="orderId"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="产品Id"
          prop="productId"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          label="产品名称"
          prop="productName"
          :show-overflow-tooltip="true"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAction } from "@/api/common/manage";

const ApiMap = {
  orderList: "/dynamic/order/list",
  productList: "/dynamic/product/list",
  productList2: "/dynamic/product/list2",
  staffList: "/dynamic/staff/list"
};

export default {
  data() {
    return {
      dataSource: [],
      dataSource2: [],
      dataSource3: [],
      dataSource4: [],
      queryParams: {}
    };
  },
  methods: {
    handleQuery(key, type) {
      getAction(ApiMap[type]).then(res => {
        this[key] = res;
      });
    }
  }
};
</script>

    <style>
    </style>