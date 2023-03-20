<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height:auto">
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true" style="margin-top: 18px">
        <el-form-item label="作业公司：" prop="deptId">
          <el-select
            v-model="queryParams.orgId"
            placeholder="请选择作业公司"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in company"
              :key="index"
              :label="item.orgShortName"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油田：" prop="noticeContent">
          <el-select
            v-model="queryParams.oilFieldId"
            placeholder="请选择油田"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in oilfield"
              :key="index"
              :label="item.oilFieldName"
              :value="item.oilFieldId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型：" prop="createBy">
          <el-select
            v-model="queryParams.cplx"
            placeholder="请选择产品类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in deptSelect"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份：" prop="noticeType">
          <el-date-picker type="year" placeholder="选择年份" v-model="date3"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-edit-outline" size="mini" @click="redact" class="commonBtn">编辑</el-button>
          <el-button icon="el-icon-document-checked" size="mini" @click="save" class="commonBtn">保存</el-button>
          <el-button icon="el-icon-s-platform" size="mini" @click="dialogVisible = true" class="commonBtn"
            >运行计算</el-button
          >
        </el-form-item>
      </el-form>
    </headerSearch>

    <pagePanelNew headerTitle="通知通告列表" style="height: calc(100% - 100px)">
      <info-window infoWidth="100%" infoHeight="100%" headerTitle="密度信息维护">
        <el-row :gutter="10" class="mb8" style="margin-bottom: 20px">
          <!-- <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['system:role:add']">新增</el-button>
      </el-col> -->
        </el-row>
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
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <el-table-column label="油气田" prop="name" align="center"> </el-table-column>
          <el-table-column label="一月" prop="one" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
              <span v-else> <el-input v-model="scope.row.one" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="二月" prop="two" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.two }}</span>
              <span v-else> <el-input v-model="scope.row.two" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="三月" prop="three" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.three }}</span>
              <span v-else> <el-input v-model="scope.row.three" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="四月" prop="four" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.four }}</span>
              <span v-else> <el-input v-model="scope.row.four" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="五月" prop="five" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.five }}</span>
              <span v-else> <el-input v-model="scope.row.five" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="六月" prop="six" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.six }}</span>
              <span v-else> <el-input v-model="scope.row.six" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="七月" prop="seven" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.seven }}</span>
              <span v-else> <el-input v-model="scope.row.seven" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="八月" prop="eight" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.eight }}</span>
              <span v-else> <el-input v-model="scope.row.eight" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="九月" prop="nine" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.nine }}</span>
              <span v-else> <el-input v-model="scope.row.nine" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="十月" prop="ten" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.ten }}</span>
              <span v-else> <el-input v-model="scope.row.ten" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="十一月" prop="eleven" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.eleven }}</span>
              <span v-else> <el-input v-model="scope.row.eleven" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="十二月" prop="twelve" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '0'">{{ scope.row.twelve }}</span>
              <span v-else> <el-input v-model="scope.row.twelve" size="small" /></span>
            </template>
          </el-table-column>
        </el-table>
      </info-window>
    </pagePanelNew>
    <el-dialog title="模型运行结果通知" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>何时使用：需要用户处理事务，又不希望跳转</span>
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
                if(this.oilfield){
                  this.queryParams.oilFieldId = res.data.data[0].oilFieldId
                }
               }else{
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
      console.log(this.ids)
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
