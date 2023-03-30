<!-- 措施计划情况 -->
<template>
  <div class="app-container">
    <pagePanel headerTitle="现场作业计划表" style="height: calc(100% - 100px)">
      <el-table
        :data="noticeList"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        highlight-current-row
        height="calc(100% - 45px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px'}"
        style="width: 100%; height: 1000px"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="井基本信息" prop="name" align="center">
          <el-table-column label="井号" prop="one" align="center"></el-table-column>
          <el-table-column label="生产层位" prop="one" align="center"></el-table-column>
          <el-table-column label="所属区块" prop="one" align="center"></el-table-column>
          <el-table-column label="油藏厚度（m）" width="130px" prop="one" align="center"></el-table-column>
          <el-table-column label="水平段长度（m）" prop="one" align="center"></el-table-column>
          <el-table-column label="完井方式" prop="one" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="生产现状" prop="name" align="center">
          <el-table-column label="投产日期" prop="one" align="center"></el-table-column>
          <el-table-column label="日产液（m³/d）" prop="one" align="center"></el-table-column>
          <el-table-column label="日产油（m³/d）" prop="one" align="center"></el-table-column>
          <el-table-column label="含水（%）" prop="one" align="center"></el-table-column>
          <el-table-column label="泵频（Hz）" prop="one" align="center"></el-table-column>
          <el-table-column label="累产油（万方）" prop="one" align="center"></el-table-column>
          <el-table-column label="地层压力测试时间" prop="one" align="center"></el-table-column>
          <el-table-column label="测试压力值（MPa）" prop="one" align="center"></el-table-column>
          <el-table-column label="流压（MPa）" prop="one" align="center"></el-table-column>
          <el-table-column label="生产压差（MPa）" prop="one" align="center"></el-table-column>
          <el-table-column label="井控储量" prop="one" align="center"></el-table-column>
          <el-table-column label="剩余可采储量" prop="one" align="center"></el-table-column>
          <el-table-column label="采液指数（m³/d.MPa）" prop="one" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="预测值" prop="name" align="center">
          <el-table-column label="产液值" prop="one" align="center"></el-table-column>
          <el-table-column label="含水" prop="one" align="center"></el-table-column>
          <el-table-column label="日增油" prop="one" align="center"></el-table-column>
          <el-table-column label="日产油" prop="one" align="center"></el-table-column>
          <el-table-column label="生产压差" prop="one" align="center"></el-table-column>
          <el-table-column label="流压" prop="one" align="center"></el-table-column>
        </el-table-column>
         <el-table-column label="其他因素" prop="name" align="center">
          <el-table-column label="排量效率" prop="one" align="center"></el-table-column>
          <el-table-column label="历史出砂" prop="one" align="center"></el-table-column>
          <el-table-column label="近期出砂" prop="one" align="center"></el-table-column>
          <el-table-column label="出秒量" prop="one" align="center"></el-table-column>
          <el-table-column label="电泵情况" prop="one" align="center"></el-table-column>
          <el-table-column label="管柱情况" prop="one" align="center"></el-table-column>
          <el-table-column label="海管情况" prop="one" align="center"></el-table-column>
          <el-table-column label="泵能耗预测" prop="one" align="center"></el-table-column>
          <el-table-column label="变频器" prop="one" align="center"></el-table-column>
          <el-table-column label="变压器" prop="one" align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </pagePanel>
  </div>
</template>

<script>
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
    this.getList();
    // this.choiceDepts(); // 获取组织机构
  },
  methods: {
    /**
     *   获取下拉框数据
     * @param orgId 作业公司id
     * @param oilFieldId 油田id
     * @param oilfield 油田数据数组
     */
    getList() {
      getWorkCompany().then((data) => {
        let code = data.data.code;
        if (code == 200) {
          this.company = data.data.data;
          if (this.company) {
            this.queryParams.orgId = data.data.data[0].orgId;
            getOilFieldList({ orgId: this.queryParams.orgId }).then((res) => {
              let code = data.data.code;
              if (code == 200) {
                this.oilfield = res.data.data;
                if (this.oilfield) {
                  this.queryParams.oilFieldId = res.data.data[0].oilFieldId;
                }
              } else {
                this.$message.warning('系统错误请重新尝试或联系运维人员！');
              }
            });
          }
        } else {
          alert('系统错误请重新尝试或联系运维人员！');
        }
      });
    },
    show(data){
        console.log(data)
    },
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
::v-deep .el-table__header-wrapper {
  .cell {
    height: auto !important;
  }
}
.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
