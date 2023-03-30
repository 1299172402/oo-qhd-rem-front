<template>
  <!-- 井组信息维护 -->
  <div style="width: 100%; height: 100%" class="pageBox">
    <!-- <el-header style="margin-top: 15px"> -->
    <header-search class="g-w100 g-h100" style="height: auto">
      <el-form inline>
        <el-form-item label="油田：">
          <el-select v-model="query.selectField" class="f2" @change="changeOilfield" disabled>
            <el-option
              v-for="item in options"
              :key="item.oilFieldId"
              :label="item.oilFieldName"
              :value="item.oilFieldId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区块：">
          <el-select v-model="query.selectBlock" placeholder="请选择" class="f2" ref="elselect1">
            <el-option
              v-for="item in blanks"
              :key="item.blockId"
              :label="item.blockName"
              :value="item.blockId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="query.value2"
            type="month"
            placeholder="请选择"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" class="confirmBut" @click="tableOilfield">确认</el-button>
        </el-form-item>
      </el-form>
    </header-search>
    <!-- </el-header> -->
    <pagePanel headerTitle="井组自定义" style="height: 100%">
      <div>
        <div style="text-align: right">
          <el-button type="primary" style="font-size: 12px; padding: 5px 10px 5px 10px; width: 85px" @click="saveBut">
            <i class="el-icon-plus el-icon--left" />
            保存
          </el-button>
          <el-button type="primary" style="font-size: 12px; padding: 5px 10px 5px 10px; width: 85px" @click="editBut">
            <i class="el-icon-edit el-icon--left" />
            更改
          </el-button>
          <el-button type="primary" style="font-size: 12px; padding: 5px 10px 5px 10px; width: 85px">
            <i class="el-icon-s-platform el-icon--left" />
            运行计算
          </el-button>
          <el-button type="primary" @click="preserve" style="font-size: 12px; padding: 5px 10px 5px 10px; width: 85px">
            <i class="el-icon-download el-icon--left" />
            下载
          </el-button>
        </div>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-table :data="tableData" highlight style="margin-top: 10px" height="550" :header-cell-style="wipeborder">
            <el-table-column label="井组关系" align="center">
              <el-table-column prop="injWellNo" show-overflow-tooltip label="水井" align="center"></el-table-column>
              <el-table-column prop="proWellNo" label="油井" show-overflow-tooltip align="center"></el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="14">
          <div>
            <el-table
              :data="tableData"
              id="indexscv"
              highlight
              border
              style="margin-top: 10px"
              height="550"
              :header-cell-style="wipeborder"
              :span-method="mergeTable"
            >
              <el-table-column label="小层井组定义" align="center">
                <el-table-column
                  prop="wellGroupName"
                  show-overflow-tooltip
                  label="井组名称"
                  align="center"
                ></el-table-column>
                <el-table-column prop="injWellNo" label="水井" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column
                  prop="layerName"
                  label="层位名称"
                  show-overflow-tooltip
                  align="center"
                ></el-table-column>
                <el-table-column prop="proWellNo" label="油井" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center">
                  <template slot-scope="scope">
                    <el-button @click="deleteWellGroup(scope.row)">删除井组</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div style="width: 25%; display: none">
        <el-col class="dataCount" style="padding: 20px">
          <div>
            <span class="border"></span>
            <span class="border"></span>
            <span class="border"></span>
            <span class="border"></span>
          </div>
          <div style="width: 100%">
            <div style="font-size: 20px; margin: 20px auto">本月措施情况:</div>
            <ul style="margin-left: 35px; text-align: left">
              <li>C4井转注,请新增井组;</li>
              <li>C4井关P3,请更改井组;</li>
              <li>H1H侧钻,请更改井组;</li>
              <li>H1H1调整井,请修改井组;</li>
            </ul>
            <div style="display: flex; justify-content: space-between">
              <span></span>
              <el-button type="primary" style="margin-top: 15px">确认</el-button>
            </div>
          </div>
        </el-col>
      </div>
    </pagePanel>
    <!-- </NormalCard> -->
    <!-- </el-main> -->

    <el-dialog title="井组自定义" :visible.sync="dialogVisible" class="dalog" width="800px">
      <div style="display: flex; align-items: center">
        <span>时间：{{ query.value2 }}</span>
        <div style="margin-left: 100px">
          <span>井组名称：</span>
          <el-select v-model="select.selectBlock" placeholder="请选择" class="f2" @change="selectBlockBut">
            <el-option
              v-for="item in blockList"
              :key="item.wellGroupId"
              :label="item.wellGroupName"
              :value="item.wellGroupId"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start">
        <div class="f1">
          <span>水井：</span>
          <el-select v-model="select.waterBlock" placeholder="请选择" class="f2" @change="waterBut" filterable>
            <el-option
              v-for="item in waterList"
              :key="item.injWellId"
              :label="item.injWellNo"
              :value="item.injWellId"
            ></el-option>
          </el-select>
        </div>
        <div class="f1">
          <span>层位：</span>
          <el-select v-model="select.layerBlock" placeholder="请选择" class="f2" @change="queryBlock">
            <el-option
              v-for="item in layerList"
              :key="item.layerId"
              :label="item.layerName"
              :value="item.layerId"
            ></el-option>
          </el-select>
        </div>
        <!-- 互换 -->
        <div class="ccc">
          <span style="margin-right: 20px">油井井号</span>
          <el-transfer
            filterable
            filter-placeholder="请输入油井井号"
            v-model="value"
            :data="transferData"
            :titles="['未选中', '已选中']"
          ></el-transfer>
        </div>
      </div>
      <!-- <div style="width: 100%; border: 1px solid #194363"></div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queryBut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <!-- </el-container> -->
</template>

<script>
// import NormalCard from '@/components/tools/NormalCard';
// import { exportExcel } from '@/lib/exportExcel';
// import {
//   getoilfield, //油田下拉
//   getblock, //区块下拉
//   postCoefficientconnectivityList,
//   postCoefficientconnectivity, //获取表格
//   getselectWellGroup,
//   postselectProWellByGroup,
//   getwaterWellAndLayerData,
//   getlayerListByWaterWellId,
//   postsaveAndupdateWellGroup,
//   delectByWellGroupId,
//   saveAllWellGroup,
// } from '@/api/ipm-04/r-wellConnectEvaluate.js';
import {getOilFieldList, queryProductList } from '@/api/rem/workcompanydesignate';
export default {
  components: {},
  data() {
    return {
      options: [],
      transferData: [],
      query: {
        selectField: '68B63EC37E3649B38F7C0219C9BB0948',
        value2: this.getDate(),
        selectBlock: '6CD7342CA6DD418183A4B3BC38584F7C',
      },
      select: {
        selectBlock: '',
        waterBlock: '',
        layerBlock: '',
        ogfBlock: '',
      },
      blanks: [],
      waterList: [],
      ogfList: [],
      layerList: [],
      radio: '1',
      tableData: [],
      dialogVisible: false,
      value: [],
      blockList: [],
      cities: [],
    };
  },
  created() {
    //获取油田下拉数据
    this.selectData();
    this.selectblock();
    this.tableOilfield();
  },
  methods: {
    getDate() {
      let data = new Date();
      if (data.getMonth() + 1 < 10) {
        return data.getFullYear() + '-0' + (data.getMonth() + 1);
      } else {
        return data.getFullYear() + '-' + (data.getMonth() + 1);
      }
    },
    queryBlock() {
      this.transferData = [];
      postselectProWellByGroup({
        wellGroupId: this.select.selectBlock,
        blockId: this.query.selectBlock,
      }).then(({ wellGroup }) => {
        let data = [];
        // this.cities.push(...wellGroup);
        // this.cities.forEach((city, index) => {
        //   data.push({
        //     label: city.proWellNo,
        //     key: city.proWellId,
        //   });
        // });
        if (Array.isArray(wellGroup) && wellGroup.length) {
          wellGroup.forEach((item) => {
            data.push({
              label: item.proWellNo,
              key: item.proWellId,
            });
          });
        }
        this.transferData = data;
      });
    },
    mergeTable({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 4) {
        if (row.index == 0) {
          return [row.rowSpan, 1];
        } else {
          return [0, 0];
        }
      }
    },
    deleteWellGroup(row) {
      const param = {
        wellGroupId: row.wellGroupId,
        yearMonth: this.query.value2,
      };
      delectByWellGroupId(param).then((res) => {
        if (res.data.code == 0) {
          this.tableOilfield();
          this.$message({ type: 'success', message: '删除成功' });
        } else {
          this.$message({ type: 'error', message: '删除失败' });
        }
      });
    },
    // 去除边框线
    wipeborder({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        return 'border:none';
      }

      if (rowIndex === 0) {
        return 'border-bottom:1px solid #66ffff;box-shadow:0px -1px 5px #66ffff inset';
      }
    },
    // 新增/修改提交
    queryBut() {
      if (!Array.isArray(this.layerList) || !this.layerList.length) {
        this.dialogVisible = false;
        return;
      }
      let data = {
        proWellIds: this.value.join(),
        layerId: this.layerList[0].layerId,
        layerName: this.layerList[0].layerName,
        methodCode: 0,
        blockId: this.query.selectBlock,
        wellGroupId: this.select.selectBlock,
        injWellId: this.waterList[0].injWellId,
        injWellName: this.waterList[0].injWellName,
      };
      if (this.select.selectBlock != '0') data.methodCode = 1;
      postsaveAndupdateWellGroup(data).then((res) => {
        this.transferData = [];
        if (res) {
          this.$message.success('成功');
          this.tableOilfield();
        } else {
          this.$message.error('失败');
        }
        this.dialogVisible = false;
      });
    },
    // 更改
    editBut() {
      this.dialogVisible = true;
      let data = {
        ogfId: this.query.selectField,
        blockId: this.query.selectBlock,
        dateTime: this.query.value2,
      };
      this.select.waterBlock = '';
      this.select.layerBlock = '';
      this.select.selectBlock = '';
      this.transferData = [];
      this.getselectWell(data);
    },
    // 井组名称下拉事件
    selectBlockBut() {
      let data = {
        ogfId: this.query.selectField,
        blockId: this.query.selectBlock,
        dateTime: this.query.value2,
        // wellGroupId: '',
        wellGroupId: this.select.selectBlock,
        apifoxApild: '48248204',
      };
      this.select.waterBlock = '';
      this.select.layerBlock = '';
      this.waterList = [];
      this.layerList = [];
      this.transferData = [];
      this.value = [];
      if (data.wellGroupId == '0') {
        getwaterWellAndLayerData().then(({ waterWellList }) => {
          this.waterList = waterWellList;
        });
      } else {
        postCoefficientconnectivity(data).then((res) => {
          let arr = [];
          if (Array.isArray(res) && res.length) {
            arr.push({
              injWellId: res[0].injWellId,
              injWellNo: res[0].injWellNo,
              layerId: res[0].layerId,
              layerName: res[0].layerName,
            });
          }
          this.waterList = arr;
          this.layerList = arr;

          res.forEach((item) => {
            if (item.proWellId && item.proWellNo) {
              let obj = {
                proWellId: item.proWellId,
                proWellNo: item.proWellNo,
              };
              this.value.push(item.proWellId);
            }
          });
          this.select.waterBlock = res[0].injWellId;
          this.select.layerBlock = res[0].layerId;
          this.queryBlock();
        });
      }
    },
    // 水井下拉事件
    waterBut() {
      this.select.layerBlock = '';
      this.transferData = [];
      this.value = [];
      if (this.select.selectBlock != '0') return;
      getlayerListByWaterWellId({
        wellId: this.select.waterBlock,
        // wellId: "008259D4D5B24D97BBD0BAF2AA8C2D6F"
      }).then((res) => {
        this.layerList = res;
      });
    },
    // 井组名称下拉
    getselectWell(data) {
      getselectWellGroup(data).then((res) => {
        this.blockList = res;
        this.blockList.unshift({
          wellGroupId: '0',
          wellGroupName: '新增',
        });
      });
    },
    // 表格下载
    preserve() {
      if (this.query.selectBlock) {
        let blockName = this.blanks.find((item) => item.blockId == this.query.selectBlock).blockName;
        exportExcel('#indexscv', blockName + '小层井组定义');
      } else {
        this.$message.error('请选择区块');
      }
    },
    // 获取油田下拉数据
    selectData() {
      getOilFieldList({ orgId: '715AD1CD60484BB59E737CD18A9DE44A' }).then((res) => {
        if (res.data.code == 200) {
          this.options = res.data.data;
        }
      });
    },
    // 获取区块数据
    selectblock() {
      if (!this.query.selectField) return;
      getblock({
        ogfId: this.query.selectField,
      }).then(({ blockList }) => {
        this.blanks = blockList;
      });
    },
    // 油田下拉点击事件
    changeOilfield() {
      this.selectblock();
    },
    // 获取油田列表数据
    tableOilfield() {
      let data = {
        ogfId: this.query.selectField,
        blockId: this.query.selectBlock,
        dateTime: this.query.value2,
        apifoxApild: '48248204',
      };
      postCoefficientconnectivityList(data).then((res) => {
        if (res && res.length > 0) {
          let index = 0;
          let obj = {};
          this.tableData = res.map((item) => {
            if (!obj[item.wellGroupId]) {
              obj[item.wellGroupId] = res.filter((filter) => item.wellGroupId === filter.wellGroupId);
              index = 0;
            } else {
              index++;
            }
            item.rowSpan = obj[item.wellGroupId].length;
            item.index = index;
            return item;
          });
        } else {
          this.tableData = [];
        }
        console.log(this.tableData);
      });
    },
    // 保存
    saveBut() {
      saveAllWellGroup().then(() => {
        this.$message.success('保存成功');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ccc {
  margin: 30px 0;
  display: flex;
}
.el-transfer {
  text-align: left;
}
.f3 {
  background: rgb(23, 45, 65);
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 230px;
}

.disflex {
  display: flex;
  align-items: center;
}
.disflex > div {
  margin-left: 15px;
}

.el-main {
  padding: 0 20px 0 20px;
  height: 100vh;
}
.dalog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
}

.f1 {
  margin-top: 15px;
}

::v-deep .el-input {
  margin-top: none !important;
}

::v-deep .el-form--inline .el-form-item {
  margin: 10px 10px 10px 0;
}
</style>
