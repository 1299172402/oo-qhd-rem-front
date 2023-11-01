<template>
  <div class="stytable">
    <el-table ref="multipleTable" :data="this.$attrs.chooseAllData" height="690"
              stripe
              @click="clearFilter" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" min-width="15"> </el-table-column>
      <el-table-column type="index" label="序号" align="center"min-width="10" />
      <el-table-column prop="name" label="模型井名" align="center" min-width="50">
        <template slot-scope="scope">
          <span >{{scope.row.wellName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="injType" label="注入类型" align="center" min-width="45">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.injType" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.injType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开关井//状态" :render-header="renderHeader" align="center" min-width="40">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.status" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctrlMode" label="控制模式" align="center" min-width="40">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.ctrlMode" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.ctrlMode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultValue" label="默认参数" align="center" min-width="40">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.defaultValue" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.defaultValue}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maxInj" label="注入量" align="center" min-width="30">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.maxInj" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.maxInj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tstep" label="时间步" align="center" min-width="40"
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
          <el-row>
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
  name: "predictTableInj",
  data() {
    return {
      multipleSelection: [],
      showEdit: [], // 显示编辑框
      showBtn: [], // 显示操作按钮
      submitData: [],
      tableList: [],
      props: ["chooseAllData",'tStep','prodListTable','submit1','filterHandler'],
      prodListTable2: [],
      prodListTable4: [],
      filterList:[],
      filelistsum:[],
      /*props: {
        submit1: {
          type: Function,
          default: null
        },
        filterHandler: {
          type: Function,
          default: null
        },
      },*/
    }
  },
  created(){
    setTimeout(() => {
      this.hh()}, 1000)

  },
    computed: {
        getGlobeTheme(val) {
            return this.$store.state.setting.mode;
        },
    },
    watch: {
        getGlobeTheme: {
            handler(Nval) {
                if (Nval == "dark") {
                    this.optionfczc.legend.textStyle.color = "#fff";
                } else {
                    this.optionfczc.legend.textStyle.color = "#000000";
                }
            },
            deep: true,
            immediate: true
        },
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
      console.log("11111111111111111111111111111111111111111111",this.filterList)
    },
    // 获取选中行的这一条数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)

    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;

    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
    },
    // 切换选中
    toggleSelection(rows) {
      console.log("rows", rows)
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //编辑表格数据
    edit(row, index) {
      row.edit = true;
      console.log(row.edit)
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalinjType = row.injType;
      row.originalmaxInj = row.maxInj;
      row.originalwellName = row.wellName;
      row.originalstatus = row.status;
    },
    //保存数据
    save(row, index) {
      row.edit = false;
      this.$attrs.submit1();
    },
    //取消编辑
    cancel(row, index) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.injType = row.originalinjType;
      row.maxInj = row.originalmaxInj;
      row.wellName = row.originalwellName;
      row.status = row.originalstatus;
      row.edit = false;

    },
    // 点击编辑
    handleEdit(index, row) {
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalinjType = row.injType;
      row.originalmaxInj = row.maxInj;
      row.originalwellName = row.wellName;
      row.originalstatus = row.status;
      //console.log(row.originalctrlMode)
      this.$refs.multipleTable.toggleRowSelection(row);
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
    },
    // 取消编辑
    handleCancel(index, row) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.injType = row.originalinjType;
      row.maxInj = row.originalmaxInj;
      row.wellName = row.originalwellName;
      row.status = row.originalstatus;
      this.$refs.multipleTable.toggleRowSelection(row);
      this.showEdit[index] = false;
      this.showBtn[index] = false;
      this.$set(this.showEdit, row, false);
      this.$set(this.showBtn, row, false);
    },
    // 从选中的行中取出修改的参数和值
    handleQuery(row) {
      this.tableList = this.$attrs.chooseAllData
      this.multipleSelection.map((i, index) => {
        console.log("ptImul", this.multipleSelection)
        i.show = false;
        Vue.set(this.multipleSelection, index, i);
        this.submitData.push({
          rowNumber: this.multipleSelection[index].rowNumber,
          ctrlMode: this.multipleSelection[index].ctrlMode,
          defaultValue: this.multipleSelection[index].defaultValue,
          injType: this.multipleSelection[index].injType,
          maxInj: this.multipleSelection[index].maxInj,
          wellName: this.multipleSelection[index].wellName,
          status: this.multipleSelection[index].status,
        });
      });
      // 取出所有选中修改的参数后还原表格所有操作按钮的状态
      this.tableList.map((i, index) => {
        i.show = false;
        this.showEdit[index] = false;
        this.showBtn[index] = false;
        this.$set(this.showEdit, row, false);
        this.$set(this.showBtn, row, false);
      });
    },
    // 提交修改参数
    transData() {
      this.prodListTable2 = this.$attrs.chooseAllData
      this.prodListTable4 = this.multipleSelection;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>