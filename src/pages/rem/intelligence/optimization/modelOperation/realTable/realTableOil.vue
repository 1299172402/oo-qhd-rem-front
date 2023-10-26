<template>
  <div class="stytable">
      <el-table ref="multipleTable"  :data="prodRealList" height="520"
                v-loading="pageLoading" element-loading-text="加载中" element-loading-background="rgba(0, 40, 80, 0.7)"
                :header-cell-style="headerClass" stripe>
        <el-table-column type="index" label="序号" align="center" :index=" (this.currentPage-1)*this.pageSize+1" />

        <el-table-column prop="name" label="井名" align="center" >
          <template slot-scope="scope">
            <span >{{scope.row.wellName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="开关井//状态" :render-header="renderHeader" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.status" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctrlMode" label="控制//模式" :render-header="renderHeader" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.ctrlMode" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.ctrlMode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="defaultValue" label="默认//参数" :render-header="renderHeader" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.defaultValue" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.defaultValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="oilProdDaily" label="日产油" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.oilProdDaily" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.oilProdDaily}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gasProdDaily" label="日产气" align="center" >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.gasProdDaily" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.gasProdDaily}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="oilProdDaily" label="日产水" align="center" >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.waterProdDaily" v-show="scope.row.edit" />
            <span v-show="!scope.row.edit">{{scope.row.waterProdDaily}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-show="!scope.row.edit" class="buttonClassLogo"
                       style="background-color: transparent;color: rgba(255,255,255,0.8);border: 1px dashed rgba(255,255,255,0.5)"
                       @click="edit(scope.row, scope)">编辑</el-button>
            <el-row type="flex" justify="space-between">
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
    <el-pagination
          small
        background
        layout="prev, pager, next"
        :total="prodTotal"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="100"
        style="text-align: center;">
      </el-pagination>

<!--    </el-row>-->
  </div>
</template>

<script>
import Vue from "vue";
import { GetFactSchedule} from "@/api/rem/dispenseModel";
export default {
  name: "realTableOil",
  data() {
    return {
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageLoading:false,
      pageSize:100,
      zhezhao:false,
      multipleSelection: [],
      showEdit: [], // 显示编辑框
      showBtn: [], // 显示操作按钮
      submitData: [],
      tableWaterList: [],
      props: ["prodListTable","schDownLoading","startDate","endDate","modelBasicId"],
      editOilData: [],
      prodRealList:[],
      injRealList:[],
      prodTotal:undefined

    }
  },
  methods: {
    renderHeader(h, { column }) {
      return h("span", {}, [
        h("span", {}, column.label.split("//")[0]),
        h("br"),
        h("span", {}, column.label.split("//")[1]),
      ])
    },
    handleCurrentChange(currentPage) {
      this.pageLoading=true;
      this.currentPage = currentPage; //每次点击分页按钮，当前页发生变化
      console.log("1111",this.currentPage);
      console.log("loading",this.pageLoading)
      const param = {
        modelBasicId: this.$attrs.modelBasicId,
        startDate: this.$attrs.startDate,
        endDate: this.$attrs.endDate,
        pageSize:100,
        pn:this.currentPage,
        wellTypeFlag:"prod"

      }
      console.log("params",param)
      this.pageLoading = true
      GetFactSchedule(param).then(res => {
        this.prodRealList = res.result.prodList
        this.pageLoading=false;
      })
    },
    //获取实际制度数据
    DownloadTable() {
      this.prodRealList=[]
      this.injRealList=[]
      this.prodTotal=undefined
      console.log("time",this.$attrs.startDate)
      const param = {
        modelBasicId: this.$attrs.modelBasicId,
        startDate: this.$attrs.startDate,
        endDate: this.$attrs.endDate,
        pageSize:100,
        pn:this.currentPage,
        wellTypeFlag:"prod"

      }
      this.pageLoading = true
      console.log("params",param)
      GetFactSchedule(param).then(res => {
        this.prodRealList = res.result.prodList
        this.prodTotal=res.result.prodTotal
        console.log(res)
        this.pageLoading = false
      })
    },
    // 获取选中行的这一条数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑
    edit(row, index) {
      row.edit = true;
      console.log(row.edit)
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalstatus = row.status;
      row.originalwellName = row.wellName;
      row.originaldate = row.date;
      row.originalgasProdDaily = row.gasProdDaily;
      row.originaloilProdDaily = row.oilProdDaily;
      row.originalwaterProdDaily = row.waterProdDaily;
    },
    //保存数据
    save(row, index) {
      row.edit = false;
    },
    //取消编辑
    cancel(row, index) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.status = row.originalstatus;
      row.wellName = row.originalwellName;
      row.date = row.originaldate;
      row.gasProdDaily = row.originalgasProdDaily;
      row.oilProdDaily = row.originaloilProdDaily;
      row.waterProdDaily = row.waterProdDaily;
      row.edit = false;
    },
    // 切换选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 点击编辑
    handleEdit(index, row) {
      console.log("index", index)
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalmaxProd = row.maxProd;
      row.originalstatus = row.status;
      row.originalwellName = row.wellName;
      // console.log(row.originalctrlMode)
      this.$refs.multipleTable.toggleRowSelection(row);
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
    },
    //传参
    transData() {
      this.editOilData = this.$attrs.prodRealList
    },
    // 取消编辑
    handleCancel(index, row) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.maxProd = row.originalmaxProd;
      row.status = row.originalstatus;
      row.wellName = row.originalwellName;
      this.$refs.multipleTable.toggleRowSelection(row);
      this.showEdit[index] = false;
      this.showBtn[index] = false;
      this.$set(this.showEdit, row, false);
      this.$set(this.showBtn, row, false);
    },
    // 从选中的行中取出修改的参数和值
    handleQuery(row) {
      this.tableWaterList = this.$attrs.prodRealList
      this.multipleSelection.map((i, index) => {
        console.log("pt", this.multipleSelection)
        i.show = false;
        Vue.set(this.multipleSelection, index, i);
        this.submitData.push({
          rowNumber: this.multipleSelection[index].rowNumber,
          ctrlMode: this.multipleSelection[index].ctrlMode,
          defaultValue: this.multipleSelection[index].defaultValue,
          maxProd: this.multipleSelection[index].maxProd,
          status: this.multipleSelection[index].status,
          wellName: this.multipleSelection[index].wellName,
        });
      });
      // 取出所有选中修改的参数后还原表格所有操作按钮的状态
      this.tableWaterList.map((i, index) => {
        i.show = false;
        this.showEdit[index] = false;
        this.showBtn[index] = false;
        this.$set(this.showEdit, row, false);
        this.$set(this.showBtn, row, false);
      });
    },
    // 提交修改参数
    submitWater() {
      this.handleQuery();
      // 清除所有选中
      this.$refs.multipleTable.clearSelection();
      //}
    },
  }
}
</script>

<style lang="scss" scoped>

</style>