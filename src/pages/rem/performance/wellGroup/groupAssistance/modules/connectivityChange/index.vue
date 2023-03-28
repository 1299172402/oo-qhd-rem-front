
<template>
  <div class="app-container">
    <pagePanelNew style="height: calc(100% - 100px)">
        <el-table
         highlight-current-row
        height="100%"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column label="序号"> </el-table-column>
          <el-table-column label="水井"> </el-table-column>
          <el-table-column label="层位"> </el-table-column>
          <el-table-column label="油井"> </el-table-column>
          <el-table-column label="受效情况"> </el-table-column>
          <el-table-column label="2022年5月注水情况">
            <el-table-column label="连通系数"> </el-table-column>
            <el-table-column label="注水劈分量"> </el-table-column>
            <el-table-column label="产业劈分量"> </el-table-column>
          </el-table-column>
          <el-table-column label="2022年7月注水强度">
            <el-table-column label="连通系数"> </el-table-column>
            <el-table-column label="注水劈分量"> </el-table-column>
            <el-table-column label="产业劈分量"> </el-table-column>
          </el-table-column>
          <el-table-column label="调整幅度">
            <el-table-column label="连通系数"> </el-table-column>
            <el-table-column label="注水劈分量"> </el-table-column>
            <el-table-column label="产业劈分量"> </el-table-column>
          </el-table-column>
          <el-table-column label="备注"> </el-table-column>
        </el-table>
    </pagePanelNew>
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
      dialogVisible: false, //运行计算展示弹窗
      title: '', // 弹窗标题
      company: [],
      oilfield: [],
      deptSelect: [],
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
      rules: {
        noticeContent: [{ required: true, message: '通知内容不能为空', trigger: 'blur' }],
        noticeType: [{ required: true, message: '通知类型不能为空', trigger: 'blur' }],
        radio: [{ required: true, message: '发送时间不能为空', trigger: 'blur' }],
        sendTime: [{ required: true, message: '定时时间不能为空', trigger: 'blur' }],
        deptIds: [{ required: true, message: '通知对象不能为空', trigger: 'blur' }],
      },
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
        orgId: undefined,
        oilFieldId: undefined,
        createBy: undefined,
        noticeType: undefined,
      },
    };
  },
  created() {
  },
  methods: {
  },
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

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
