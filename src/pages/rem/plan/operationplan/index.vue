<!-- 现场作业计划 -->
<template>
  <div class="app-container">
    <pagePanelNew headerTitle="现场作业计划表" style="height: calc(100% - 100px)">
      <el-table
        :data="noticeList"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        highlight-current-row
        height="calc(100% - 45px)"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        style="width: 100%; height: 1000px"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="*日期" prop="name" align="center"> </el-table-column>
        <el-table-column label="*生产单元" prop="one" align="center">
        </el-table-column>
        <el-table-column label="修井机状态" prop="two" align="center">
        </el-table-column>
        <el-table-column label="当前作业内容" prop="three" align="center">
        </el-table-column>
        <el-table-column label="作业井号" prop="four" align="center">
        </el-table-column>
        <el-table-column label="是否动管柱" prop="four" align="center"> </el-table-column>
        <el-table-column label="开始时间" prop="four" align="center"> </el-table-column>
        <el-table-column label="预计结束时间" prop="four" align="center"> </el-table-column>
        <el-table-column label="当日作业内容简述" prop="four" align="center"> </el-table-column>
        <el-table-column label="下步作业内容" prop="four" align="center"> </el-table-column>
        <el-table-column label="作业井号" prop="four" align="center"> </el-table-column>
        <el-table-column label="是否动管柱" prop="four" align="center"> </el-table-column>
        <el-table-column label="预计作业时间" prop="four" align="center"> </el-table-column>
        <el-table-column label="备注" prop="four" align="center"> </el-table-column>
      </el-table>
    </pagePanelNew>
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
    // 编辑
    /**
     *  选中表格事件
     * @param ids 选中的表格单行内容，携带index与判断条件
     */
    handleCurrentChange(val) {
      this.ids = [];
      this.ids = val;
      console.log(this.ids);
    },
    /**
     *  编辑
     * @param noticeList 表格数据data
     */
    redact() {
      let arr = [];
      this.noticeList.map((n) => {
        if (n.state == '1') {
          arr.push(n);
        }
      });
      if (arr.length >= 1) {
        this.$message.warning('同时只能编辑一个油田！');
      } else {
        this.noticeList[this.ids.index].state = '1';
        this.savelist = this.noticeList[this.ids.index];
      }
    },
    // 保存
    save() {
      if (this.savelist) {
        this.noticeList[this.savelist.index].state = '0';
        this.$message.warning('修改成功');
        this.savelist = [];
      }
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

.pertable thead .el-table-column--selection .cell {
  display: none;
}
</style>
