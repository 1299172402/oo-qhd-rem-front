<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <div class="topSearchDiv">
      <div>角色名称：<el-input v-model="input" style="width: 300px" placeholder="请输入角色名称"></el-input></div>
      <div style="margin: 0 20px">
        状态：<el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button class="commonBtn">重置</el-button>
      </div>
    </div>
    <div
      class="footerBox"
      :style="{
        background: $store.state.setting.mode == 'dark' ? 'transparent' : '#fff',
      }"
    >
      <div class="headerStyle">角色列表</div>

      <!-- <gradientBox></gradientBox> -->
      <el-table
        height="calc(100% - 170px)"
        :row-style="{ height: '0px' }"
        class="tableDiv"
        :header-cell-style="{ 'text-align': 'center', padding: '6px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '6px', 'text-align': 'center' }"
        :data="tableData"
        style="width: 98%; height: 100%; margin: 20px"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index" label="序号" width="100"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="150"> </el-table-column>
        <el-table-column prop="permissions" label="权限字段" width="150"> </el-table-column>
        <el-table-column prop="roleSort" label="角色排序" width="100"> </el-table-column>
        <el-table-column prop="assigningUser" label="分配用户" width="150"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100"> </el-table-column>
        <el-table-column prop="date" label="创建时间" width="180"> </el-table-column>
        <el-table-column label="操作" width="400">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">禁用</el-button>
            <el-button type="text" size="small" style="color: #f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination>
    </div>
  </div>
</template>

<script>
// import gradientBox from '@/components/irregularity-box/gradient.vue';

export default {
  components: {
    // gradientBox,
  },
  data() {
    return {
      input: '',
      value: '',
      options: [
        {
          value: '选项1',
          label: '正常',
        },
        {
          value: '选项2',
          label: '停用',
        },
      ],
      tableData: [
        {
          roleName: '管理员',
          permissions: 'admin',
          roleSort: '1',
          assigningUser: '查看（1）',
          status: '正常',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '组织机构',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（12）',
          status: '正常',
          date: '2013-03-12 05:11',
        },
        {
          roleName: '其余角色',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（10）',
          status: '停用',
          date: '2022-12-04 01:45',
        },
        {
          roleName: '管理员',
          permissions: 'admin',
          roleSort: '1',
          assigningUser: '查看（1）',
          status: '正常',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '其余角色',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（10）',
          status: '停用',
          date: '2022-12-04 01:45',
        },
        {
          roleName: '其余角色',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（10）',
          status: '停用',
          date: '2022-12-04 01:45',
        },
        {
          roleName: '管理员',
          permissions: 'admin',
          roleSort: '1',
          assigningUser: '查看（1）',
          status: '正常',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '组织机构',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（12）',
          status: '正常',
          date: '2013-03-12 05:11',
        },
        {
          roleName: '其余角色',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（10）',
          status: '停用',
          date: '2022-12-04 01:45',
        },
        {
          roleName: '管理员',
          permissions: 'admin',
          roleSort: '1',
          assigningUser: '查看（1）',
          status: '正常',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '其余角色',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（10）',
          status: '停用',
          date: '2022-12-04 01:45',
        },
        {
          roleName: '管理员',
          permissions: 'admin',
          roleSort: '1',
          assigningUser: '查看（1）',
          status: '正常',
          date: '2016-05-04 12:21',
        },
        {
          roleName: '组织机构',
          permissions: 'common',
          roleSort: '2',
          assigningUser: '查看（12）',
          status: '正常',
          date: '2013-03-12 05:11',
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.pageBox {
  color: var(--formText);
  position: relative;
  font-family: PingFangSC-Regular, PingFang SC;
}
.topSearchDiv {
  display: flex;
}
.tableDiv {
}
.paginationDiv {
  position: absolute;
  bottom: 50px;
  right: 0;
  float: right;
  margin-top: 20px;
}
.footerBox {
  border: 1px solid var(--lightBlueColor);
  width: 100%;
  margin: 20px 0 0 0;
  position: relative;
  height: calc(100% - 60px) !important;
}
.headerStyle {
  height: 32px;
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  color: var(--whiteColor);
  padding: 0 0 0 20px;
  background: linear-gradient(to right, rgba(0, 96, 166, 1), rgba(0, 96, 166, 0.2));
}
</style>
