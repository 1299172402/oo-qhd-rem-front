<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" :inline="true" style="margin-top: 18px">
        <el-form-item label="作业公司：">
          <el-select v-model="queryParams.orgId" disabled>
            <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select v-model="queryParams.ogfId">
            <el-option
              v-for="(item, index) in oilFields"
              :key="index"
              :label="item.oilFieldName"
              :value="item.oilFieldId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型：">
          <el-select
            v-model="queryParams.productTypeCode"
            placeholder="请选择产品类型"
            clearable
            size="small"
            @change="getInfo()"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in producttype"
              :key="index"
              :label="item.appendixValueName"
              :value="item.appendixValueCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份：">
          <el-date-picker type="year" placeholder="选择年份" @change="getInfo()" value-format="yyyy" v-model="queryParams.year"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-edit-outline" size="mini" @click="redact" type="primary">编辑</el-button>
          <el-button icon="el-icon-document-checked" size="mini" @click="save" type="primary">保存</el-button>
          <el-button icon="el-icon-s-platform" size="mini" @click="dialogVisible = true" type="primary"
            >运行计算</el-button
          >
        </el-form-item>
      </el-form>
    </headerSearch>

    <pagePanelNew style="height: calc(100% - 100px)">
      <info-window infoWidth="100%" infoHeight="100%" headerTitle="密度信息维护">
        <el-table
          :data="noticeList"
          @current-change="handleCurrentChange"
          highlight-current-row
          height="calc(100% - 45px)"
          :row-style="{ height: '0px' }"
          :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
          header-cell-class-name="table_header"
          :cell-style="{ 'text-align': 'center', padding: '2px' }"
          style="width: 100%; height: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column label="油气田" prop="oilFieldName" align="center"> </el-table-column>
          <el-table-column label="一月" align="center">
            <el-table-column label="计划值" width="135px" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input @input="writedata(scope)" v-model="scope.row.january" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="二月" prop="two" align="center">
            <el-table-column label="计划值" prop="planDensityValue" align="center"> </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input @input="writedata(scope)" v-model="scope.row.february" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="三月" prop="three" align="center">
            <el-table-column label="计划值" prop="planDensityValue" align="center"> </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input @input="writedata(scope)" v-model="scope.row.march" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="四月" align="center">
            <el-table-column label="计划值" prop="planDensityValue" align="center"> </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input @input="writedata(scope)" v-model="scope.row.april" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="五月" prop="five" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else>
                  <el-input @input="writedata(scope)" v-model="scope.row.planDensityValue" size="small"
                /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.may" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="六月" prop="six" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.june" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="七月" prop="seven" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.july" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="八月" prop="eight" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.august" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="九月" prop="nine" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.september" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="十月" prop="ten" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.october" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="十一月" prop="eleven" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.november" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="十二月" prop="twelve" align="center">
            <el-table-column label="计划值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
              </template>
            </el-table-column>
            <el-table-column label="实际值" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state == '0'">{{ scope.row.one }}</span>
                <span v-else> <el-input v-model="scope.row.december" size="small" /></span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </info-window>
    </pagePanelNew>
    <el-dialog title="模型运行结果通知" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>
        AC-20井组指标变化趋势评价模型（日度）、AC-25井组注采平衡分析、AC-23井组措施推荐模型全部运行成功。AC-22井组注水受效分析运行失败。</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryDensityInfo, getOilFieldList, queryProductList,save } from '@/api/rem/workcompanydesignate';
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
      producttype: [],
      deptSelect: [
        {
          deptId: '715AD1CD60484BB59E737CD18A9DE44A',
          deptName: '秦皇岛32-6渤中作业公司',
        },
      ], //作业公司
      oilFields: [],
      // 表格数据
      noticeList: [],
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
        productTypeCode: '002001',
        year: '',
        ogfId: '3FC9A818F5BC43B88270DB80BBB3018F',
        orgId: '715AD1CD60484BB59E737CD18A9DE44A',
      },
    };
  },
  created() {
    var data = new Date();
    var y = data.getFullYear();
    var m = data.getMonth() + 1;
    if (m >= 1 && m <= 9) {
      m = '0' + m;
    }
    this.queryParams.year = String(y);
    this.getList();
    this.getInfo()
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
      // debugger
      getOilFieldList({ orgId: '715AD1CD60484BB59E737CD18A9DE44A' }).then((res) => {
        if (res.data.code == 200) {
          this.oilFields = res.data.data;
        }
      });
      queryProductList().then((res) => {
        if (res.data.code == 200) {
          this.producttype = res.data.data;
        }
      });
     
    },
    getInfo(){
 queryDensityInfo(this.queryParams).then((res)=>{
         if (res.data.code == 200) {
         console.log(res)
         this.noticeList = [res.data.data]
        //  this.noticeList.map((n)=>{
        //   n.state = '0'
        //  })
         let a = ''
         this.oilFields.map((n)=>{
          if(n.oilFieldId == this.queryParams.ogfId){
               a = n.oilFieldName
          }
         })
         this.noticeList[0].oilFieldName = a
         this.noticeList[0].ogfId = this.queryParams.ogfId
        }else{
          this.$message.warning('系统错误请重新尝试或联系运维人员！');
          this.noticeList = [{oilFieldName:'测试1'}]
        }
      })
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
    writedata(scope){
      console.log(scope.$index)
    },
    /**
     *  编辑
     * @param noticeList 表格数据data
     */
    redact() {
      console.log(this.noticeList)
       this.noticeList[0].state = '1';
    },
    // 保存
    save() {
      let densityInfoQueryVo = this.queryParams 
      let densityModelInfo = this.noticeList[0]
       save({densityModelInfo,densityInfoQueryVo}).then((res) => {
        if (res.data.code == 200) {
          // this.producttype = res.data.data;
          console.log(res)
        }
      });
      // if (this.savelist) {
      //   this.noticeList[this.savelist.index].state = '0';
      //   this.$message.warning('修改成功');
      //   this.savelist = [];
      // }
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
