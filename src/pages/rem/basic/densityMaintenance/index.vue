<!-- 基础数据维护 - 密度维护表 -->
<template>
  <div class="app-container" style="height: calc(100% - 85px)">
    <headerSearch class="g-w100 g-h100" style="height: auto">
      <el-form :model="queryParams" :inline="true" style="margin-top: 18px">
        <el-form-item label="作业公司：">
          <el-select v-model="queryParams.orgId" disabled>
            <el-option v-for="(item, index) in deptSelect" :key="index" :label="item.orgName" :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油田：">
          <el-select @change="getInfo()" v-model="queryParams.ogfId">
            <el-option
              v-for="(item, index) in oilFields"
              :key="index"
              :label="item.ogfName"
              :value="item.ogfId"
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
          <el-date-picker
            type="year"
            placeholder="选择年份"
            value-format="yyyy"
            v-model="queryParams.year"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="getInfo" icon="el-icon-search" type="primary">搜索 </el-button>
          <el-button size="mini" @click="reset" icon="el-icon-refresh" class="commonBtn">重置 </el-button>
        </el-form-item>
      </el-form>
    </headerSearch>
    <page-panel header-title="密度信息维护" style="height: 100%" :show-btn="true">
      <el-row>
        <el-button icon="el-icon-edit-outline" size="mini" @click="redact" type="primary">编辑</el-button>
        <el-button icon="el-icon-document-checked" size="mini" @click="save" type="primary">保存</el-button>
        <el-button icon="el-icon-s-platform" size="mini" @click="dialogVisible = true" type="primary"
          >运行计算
        </el-button>
      </el-row>
      <el-table
        :data="noticeList"
        @current-change="handleCurrentChange"
        highlight-current-row
        height="calc(100% - 30px)"
        style="margin-top: 10px"
        :row-style="{ height: '0px' }"
        :header-cell-style="{ 'text-align': 'center', padding: '0px' }"
        header-cell-class-name="table_header"
        :cell-style="{ 'text-align': 'center', padding: '2px' }"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="油气田" fixed width="130px" prop="ogfName" align="center"></el-table-column>
        <el-table-column label="一月" align="center">
          <el-table-column label="计划" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[0]">{{ scope.row.planDensityValue }}</span>
              <span v-else> <el-input v-model="scope.row.planDensityValue" size="small" /></span>
            </template>
          </el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[0]">{{ scope.row.january }}</span>
              <span v-else> <el-input v-model="scope.row.january" size="small" @change="inputChange(1)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="二月" prop="two" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[1]">{{ scope.row.february }}</span>
              <span v-else>
                <el-input maxlength="10 " @change="inputChange(2)" v-model="scope.row.february" size="small"
              /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="三月" prop="three" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[2]">{{ scope.row.march }}</span>
              <span v-else> <el-input v-model="scope.row.march" size="small" @change="inputChange(3)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="四月" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[3]">{{ scope.row.april }}</span>
              <span v-else> <el-input v-model="scope.row.april" size="small" @change="inputChange(4)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="五月" prop="five" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[4]">{{ scope.row.may }}</span>
              <span v-else> <el-input v-model="scope.row.may" size="small" @change="inputChange(5)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="六月" prop="six" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[5]">{{ scope.row.june }}</span>
              <span v-else> <el-input v-model="scope.row.june" size="small" @change="inputChange(6)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="七月" prop="seven" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[6]">{{ scope.row.july }}</span>
              <span v-else> <el-input v-model="scope.row.july" size="small" @change="inputChange(7)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="八月" prop="eight" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[7]">{{ scope.row.august }}</span>
              <span v-else> <el-input v-model="scope.row.august" size="small" @change="inputChange(8)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="九月" prop="nine" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[8]">{{ scope.row.september }}</span>
              <span v-else> <el-input v-model="scope.row.september" size="small" @change="inputChange(9)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十月" prop="ten" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[9]">{{ scope.row.october }}</span>
              <span v-else> <el-input v-model="scope.row.october" size="small" @change="inputChange(10)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十一月" prop="eleven" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[10]">{{ scope.row.november }}</span>
              <span v-else> <el-input v-model="scope.row.november" size="small" @change="inputChange(11)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="十二月" prop="twelve" align="center">
          <el-table-column label="计划" width="130px" prop="planDensityValue" align="center"></el-table-column>
          <el-table-column label="实际" width="130px" align="center">
            <template slot-scope="scope">
              <span v-if="isDisabled[11]">{{ scope.row.december }}</span>
              <span v-else> <el-input v-model="scope.row.december" size="small" @change="inputChange(12)" /></span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </page-panel>
    <el-dialog title="模型运行结果通知" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>
        AC-20井组指标变化趋势评价模型（日度）、AC-25井组注采平衡分析、AC-23井组措施推荐模型全部运行成功。AC-22井组注水受效分析运行失败。</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--        </pagePanel>-->
  </div>
</template>

<script>
import { getOilFieldList, queryProductList } from "@/api/rem/workcompanydesignate";
import { queryDensityInfo, save } from "@/api/rem/density.js";
import { mapGetters } from "vuex";
import { queryOperatingCompanyDetail, queryOperatorsCheckFieldListsDetail } from "@/api/basic/master";

export default {
  name: "Notice",
  dicts: ["sys_normal_disable"],
  data() {
    return {
      open: false, // 新增弹框
      dialogVisible: false, //运行计算展示弹窗
      oilfield: [],
      producttype: [],
      deptSelect: [], //作业公司
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
      tableList: ["oilFieldName"],
      ids: [],
      // 保存数组
      savelist: [],
      // 查询参数
      queryParams: {
        productTypeCode: "002001",
        year: "",
        ogfId: "3FC9A818F5BC43B88270DB80BBB3018F",
        orgId: "715AD1CD60484BB59E737CD18A9DE44A",
      },
      isDisabled: [true, true, true, true, true, true, true, true, true, true, true, true],
    };
  },
  created() {
    var data = new Date();
    var y = data.getFullYear();
    var m = data.getMonth() + 1;
    if (m >= 1 && m <= 9) {
      m = "0" + m;
    }
    this.queryParams.year = String(y);
    this.getList();
    this.getInfo();
    // this.choiceDepts(); // 获取组织机构
  },
  computed: {
    ...mapGetters(["mapboxMap"]),
    maxboxMap1() {
      return this.mapboxMap;
    },
  },
  methods: {
    /**
     *   获取下拉框数据
     * @param orgId 作业公司id
     * @param oilFieldId 油田id
     * @param oilfield 油田数据数组
     */
    getList() {
        //获取作业公司
        queryOperatingCompanyDetail({}).then(res=>{
            this.deptSelect = res.data.data
        })
        //根据作业公司查询油田
        queryOperatorsCheckFieldListsDetail({orgId:this.queryParams.orgId}).then(res=>{
            this.oilFields = res.data.data
        })
      // // debugger
      // getOilFieldList({ orgId: "715AD1CD60484BB59E737CD18A9DE44A" }).then((res) => {
      //   if (res.data.code == 200) {
      //     this.oilFields = res.data.data;
      //   }
      // });
      queryProductList().then((res) => {
        if (res.data.code == 200) {
          this.producttype = res.data.data;
        }
      });
    },
    getInfo() {
      queryDensityInfo(this.queryParams).then((res) => {
        if (res.data.code == 200) {
          this.noticeList = [res.data.data];
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
      var data = new Date();
      var m = data.getMonth() + 1;

      for (let i = 0; i < m; i++) {
        this.$set(this.isDisabled, i, false);
      }
    },
    // 保存
    save() {
      let densityInfoQueryVo = this.queryParams;
      let densityModelInfo = this.noticeList[0];
      save({ densityModelInfo, densityInfoQueryVo }).then((res) => {
        if (res.data.code == 200) {
          // this.producttype = res.data.data;
          this.$message.success("保存成功！");
        }
      });

      for (let i = 0; i < 12; i++) {
        this.$set(this.isDisabled, i, true);
      }
      // if (this.savelist) {
      //   this.noticeList[this.savelist.index].state = '0';
      //   this.$message.warning('修改成功');
      //   this.savelist = [];
      // }
    },
    inputChange(monthNum) {
      let month = this.noticeList[0];
      let monthDen = 0;
      switch (monthNum) {
        case 1:
          monthDen = month.january;
          break;
        case 2:
          monthDen = month.february;
          break;
        case 3:
          monthDen = month.march;
          break;
        case 4:
          monthDen = month.april;
          break;
        case 5:
          monthDen = month.may;
          break;
        case 6:
          monthDen = month.june;
          break;
        case 7:
          monthDen = month.july;
          break;
        case 8:
          monthDen = month.august;
          break;
        case 9:
          monthDen = month.september;
          break;
        case 10:
          monthDen = month.october;
          break;
        case 11:
          monthDen = month.november;
          break;
        case 12:
          monthDen = month.december;
          break;
      }

      switch (monthNum) {
        case 1:
          month.february = monthDen;
        case 2:
          month.march = monthDen;
        case 3:
          month.april = monthDen;
        case 4:
          month.may = monthDen;
        case 5:
          month.june = monthDen;
        case 6:
          month.july = monthDen;
        case 7:
          month.august = monthDen;
        case 8:
          month.september = monthDen;
        case 9:
          month.october = monthDen;
        case 10:
          month.november = monthDen;
        case 11:
          month.december = monthDen;
      }
    },
    // 重置
    reset() {
      (this.queryParams.ogfId = "3FC9A818F5BC43B88270DB80BBB3018F"),
        (this.queryParams.orgId = "715AD1CD60484BB59E737CD18A9DE44A");
        this.queryParams.productTypeCode = "002001"
        this.getInfo()
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
