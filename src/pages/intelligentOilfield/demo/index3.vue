<template>
  <div style="width: 100%; height: 100%" class="pageBox">
    <header-search class="g-w100 g-h100">
      <div class="g-row-flex-V g-w100 g-h100" style="margin-top: 20px;padding-bottom: 22px;">
        <div>角色名称：<el-input v-model="input" style="width: 200px" placeholder="请输入角色名称" /></div>
        <div style="margin: 0 10px">
          状态：<el-select v-model="value" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button type="primary">
            搜索
          </el-button>
          <el-button class="commonBtn">
            重置
          </el-button>
        </div>
      </div>
    </header-search>
    <page-panel-new header-title="角色列表" style="height: calc(100% - 100px);" class="g-w100">
      <!-- <gradientBox></gradientBox> -->
      <div class="btnPosition g-row-flex">
        <el-button class="" type="primary">
          新增
        </el-button>
      </div>
      <el-table
        height="calc(100% - 113px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px 0' }"
        header-cell-class-name="table_header"
        :cell-style="{ padding: '3px', 'text-align': 'center' }"
        :data="tableData"
        style="width: 100%; height: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="roleName" label="角色名称" min-width="150" />
        <el-table-column prop="permissions" label="权限字段" width="150" />
        <el-table-column prop="roleSort" label="角色排序" width="100" />
        <el-table-column prop="assigningUser" label="分配用户" width="150" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="date" label="创建时间" width="180" />
        <el-table-column label="操作" width="400">
          <el-button type="text" size="small">
            编辑
          </el-button>
          <el-button type="text" size="small">
            禁用
          </el-button>
          <el-button type="text" size="small" style="color: #f56c6c">
            删除
          </el-button>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
      />
      <!-- <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination> -->
    </page-panel-new>
  </div>
</template>

<script>
// import gradientBox from '@/components/intelligentOilfield/irregularity-box/gradient.vue';

export default {
  components: {
    // gradientBox,
  },
  data() {
    return {
      // 总条数
      total: 10,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      input: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "正常"
        },
        {
          value: "选项2",
          label: "停用"
        }
      ],
      tableData: [
        {
          roleName: "管理员",
          permissions: "admin",
          roleSort: "1",
          assigningUser: "查看（1）",
          status: "正常",
          date: "2016-05-04 12:21"
        },
        {
          roleName: "组织机构",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（12）",
          status: "正常",
          date: "2013-03-12 05:11"
        },
        {
          roleName: "其余角色",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（10）",
          status: "停用",
          date: "2022-12-04 01:45"
        },
        {
          roleName: "管理员",
          permissions: "admin",
          roleSort: "1",
          assigningUser: "查看（1）",
          status: "正常",
          date: "2016-05-04 12:21"
        },
        {
          roleName: "其余角色",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（10）",
          status: "停用",
          date: "2022-12-04 01:45"
        },
        {
          roleName: "其余角色",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（10）",
          status: "停用",
          date: "2022-12-04 01:45"
        },
        {
          roleName: "管理员",
          permissions: "admin",
          roleSort: "1",
          assigningUser: "查看（1）",
          status: "正常",
          date: "2016-05-04 12:21"
        },
        {
          roleName: "组织机构",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（12）",
          status: "正常",
          date: "2013-03-12 05:11"
        },
        {
          roleName: "其余角色",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（10）",
          status: "停用",
          date: "2022-12-04 01:45"
        },
        {
          roleName: "管理员",
          permissions: "admin",
          roleSort: "1",
          assigningUser: "查看（1）",
          status: "正常",
          date: "2016-05-04 12:21"
        },
        {
          roleName: "其余角色",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（10）",
          status: "停用",
          date: "2022-12-04 01:45"
        },
        {
          roleName: "管理员",
          permissions: "admin",
          roleSort: "1",
          assigningUser: "查看（1）",
          status: "正常",
          date: "2016-05-04 12:21"
        },
        {
          roleName: "组织机构",
          permissions: "common",
          roleSort: "2",
          assigningUser: "查看（12）",
          status: "正常",
          date: "2013-03-12 05:11"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.pageBox {
  color: var(--form-text);
  position: relative;
  font-family: PingFangSC-Regular, "PingFang SC";
}

.topSearchDiv {
  display: flex;
}

.btnPosition {
  margin: 0 0 20px;
  justify-content: flex-start;
}
</style>