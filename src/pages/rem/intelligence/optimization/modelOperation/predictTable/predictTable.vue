<template>
  <div class="stytable">
    <el-table ref="multipleTable" :data="this.$attrs.prodListTable" height="690"
              stripe
               @selection-change="handleSelectionChange">
      <el-table-column   align="center" type="selection" min-width="10"> </el-table-column>
      <el-table-column type="index" label="序号" align="center" min-width="10" />
      <el-table-column prop="name" label="模型井名" min-width="50" align="center">
        <template slot-scope="scope">
          <span >{{scope.row.wellName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开关井//状态" min-width="40" :render-header="renderHeader" align="center" >
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.status" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctrlMode" label="控制模式" min-width="40" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.ctrlMode" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.ctrlMode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultValue" label="默认参数" min-width="40" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.defaultValue" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.defaultValue}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxProd" label="产液量" min-width="40" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.maxProd" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.maxProd}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tstep" label="时间步" min-width="40" align="center"
                       :filters="filterList"
                       :filter-multiple="false"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span >{{scope.row.tstep}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" v-show="!scope.row.edit" class="buttonClassLogo"
                     style="background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                     @click="edit(scope.row, scope)">编辑</el-button>
          <el-row >
            <el-button v-show="scope.row.edit" size="mini" class="buttonClassLogo"
                       style="background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                       @click="save(scope.row)">保存</el-button>
            <el-button v-show="scope.row.edit" size="mini" class="buttonClassLogo"
                       style="background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                       @click="cancel(scope.row)">取消</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "predictTableWater",
  data() {
    return {
      multipleSelection: [],
      showEdit: [], // 显示编辑框
      showBtn: [], // 显示操作按钮
      submitData: [],
      tableWaterList: [],
      props: ["prodListTable",'tStep','submit1'],
      /*props: {
        submit1: {
          type: Function,
          default: null
        }
      },*/
      prodListTable1: [],
      prodListTable3: [],
      filterList:[],
    }
  },
  created(){
    setTimeout(() => {
      this.hh()}, 1000)
  },
  methods: {
      //单位换行
      renderHeader(h, { column }) {
          return h("span", {}, [
              h("span", {}, column.label.split("//")[0]),
              h("br"),
              h("span", {}, column.label.split("//")[1]),
          ])
      },
    hh(){
      for (let index = 0; index <this.$attrs.tStep.length; index++) {
        this.filterList.push({text:this.$attrs.tStep[index],value:this.$attrs.tStep[index]})
      }
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh145678541245',this.prodListTable)
      console.log("filterlist",this.filterList)
    },
    // 获取选中行的这一条数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("this",this.multipleSelection)
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
    },
    //编辑按钮
    edit(row, index) {
      //当edit为TRUE表格行可编辑
      row.edit = true;
      console.log(row.edit);
      //将原来数据赋值给新数据
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalmaxProd = row.maxProd;
      row.originalstatus = row.status;
      row.originalwellName = row.wellName;
    },
    save(row, index) {
      //不可编辑
      row.edit = false;
      this.$attrs.submit1();
    },
    cancel(row, index) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.maxProd = row.originalmaxProd;
      row.status = row.originalstatus;
      row.wellName = row.originalwellName;
      row.edit = false;

    },
    //选中全行
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   console.log(this.multipleSelection)
    // },
    // 从选中的行中取出修改的参数和值
    // handleQuery(row) {
    //   this.tableWaterList=this.$attrs.prodListTable
    //   this.multipleSelection.map((i, index) => {
    //     console.log("pt",this.multipleSelection)
    //     i.show = false;
    //     Vue.set(this.multipleSelection, index, i);
    //     this.submitData.push({
    //       rowNumber: this.multipleSelection[index].rowNumber,
    //       ctrlMode: this.multipleSelection[index].ctrlMode,
    //       defaultValue: this.multipleSelection[index].defaultValue,
    //       maxProd:this.multipleSelection[index].maxProd,
    //       status:this.multipleSelection[index].status,
    //       wellName:this.multipleSelection[index].wellName,
    //     });
    //   });
    //   // 取出所有选中修改的参数后还原表格所有操作按钮的状态
    //   this.tableWaterList.map((i, index) => {
    //     i.show = false;
    //     this.showEdit[index] = false;
    //     this.showBtn[index] = false;
    //     this.$set(this.showEdit, row, false);
    //     this.$set(this.showBtn, row, false);
    //   });
    // },
    //给父组件传递整张表格数据
    transData() {
      this.prodListTable1 = this.$attrs.prodListTable
      this.prodListTable3 = this.multipleSelection;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>