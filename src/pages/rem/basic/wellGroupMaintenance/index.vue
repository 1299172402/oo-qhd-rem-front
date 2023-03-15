<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100">
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" style="margin-top: 18px">
        <el-form-item label="油田：" prop="noticeContent">
          <el-select v-model="queryParams.deptId" placeholder="请选择油田" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区块：" prop="createBy">
          <el-select v-model="queryParams.deptId" placeholder="请选择区块" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：" prop="noticeType">
          <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 200px"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="save" class="commonBtn">确认</el-button>
        </el-form-item>
      </el-form>
    </headerSearch>

    <pagePanelNew headerTitle="生产井运行概况" style="height: calc(100% - 100px)">
      <div class="btnPosition g-row-flex">
        <el-button @click="dialogVisible=true" type="primary" icon="el-icon-edit">更改</el-button>
        <el-button class="" type="primary">保存</el-button>
        <el-button class="" type="primary">运行计算</el-button>
        <el-button class="" type="primary" icon="el-icon-download">下载</el-button>
      </div>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-table
            :data="noticeList"
            highlight-current-row
            height="calc(100% - 45px)"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
            header-cell-class-name="table_header"
            :cell-style="{ 'text-align': 'center', padding: '2px' }"
            style="width: 100%; height: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="井组关系" prop="name" align="center">
              <el-table-column label="水井" prop="name" align="center"> </el-table-column>
              <el-table-column label="油井" prop="name" align="center"> </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="noticeList"
            highlight-current-row
            height="calc(100% - 45px)"
            :row-style="{ height: '0px' }"
            :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
            header-cell-class-name="table_header"
            :cell-style="{ 'text-align': 'center', padding: '2px' }"
            style="width: 100%; height: 1000px"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="小层并组定义" prop="name" align="center">
              <el-table-column label="井组名称" prop="name" align="center"> </el-table-column>
              <el-table-column label="水井" prop="name" align="center"> </el-table-column>
              <el-table-column label="层位名称" prop="name" align="center"> </el-table-column>
              <el-table-column label="油井" prop="name" align="center"> </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </pagePanelNew>
    <el-dialog title="井组自定义"  :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
        <el-row >
         <el-form :model="queryParams" ref="queryForm"  :inline="true" style="margin-top: 18px">
       <el-form-item label="水井：" prop="noticeContent">
          <el-select v-model="queryParams.deptId" placeholder="请选择水井" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="层位：" prop="noticeContent">
          <el-select v-model="queryParams.deptId" placeholder="请选择层位" clearable size="small" style="width: 240px">
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
       
      </el-form>
        </el-row>
        <el-transfer
      v-model="value"
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['源列表', '目的列表']"
      @change="handleChange"
      :data="data"
    >
      <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
    </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listDept } from '@/api/intelligentOilfield/system/dept';
import { addnotice, noticeList, deldataNotice, updatenotice } from '@/api/intelligentOilfield/system/notice';

export default {
  name: 'Notice',
  dicts: ['sys_normal_disable'],
  data() {
    return {
      open: false, // 新增弹框
      dialogVisible: false,
      title: '', // 弹窗标题
      types: [
        { noticeType: '1', type: '通知' },
        { noticeType: '2', type: '公告' },
      ], // 类型
      deptSelect: [],
      noticetypes: [
        { noticeId: 1, noticeName: '通知' },
        { noticeId: 2, noticeName: '公告' },
      ],
      addform: {
        noticeContent: '',
        noticeType: '',
        radio: '',
        sendTime: '',
        deptIds: [],
      },
      // 表格数据
      noticeList: [
        {
          name: '油田一期',
          one: '',
          two: '',
          three: '',
          index: 0,
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田二期',
          index: 1,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田三期',
          index: 2,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
        {
          name: '油田四期',
          index: 3,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          nine: '',
          ten: '',
          eleven: '',
          twelve: '',
          state: '0',
        },
      ],
      // 是否展开，默认全部展开
      isExpandAll: true,
      deptList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,

      // 选中数组
      ids: [],
      // 保存数组
      savelist: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: undefined,
        noticeContent: undefined,
        createBy: undefined,
        noticeType: undefined,
      },
    };
  },
  created() {
    this.getList();
    this.choiceDepts(); // 获取组织机构
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.app-container {
  height: 100%;

  .el-table {
    overflow: scroll;
  }
}

.el-tree {
  max-height: 370px;
  overflow: scroll;
}
.btnPosition {
  margin: 0 0 20px 0;
  justify-content: flex-end;
}
.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
