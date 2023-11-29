<template>
  <div>
      <el-table ref="multipleTable" :data="injRealList" height="650" 
                v-loading="pageLoading" element-loading-text="加载中" element-loading-background="rgba(0, 40, 80, 0.7)">
      <el-table-column type="index" label="序号" min-width="10" align="center" :index=" (this.currentPage-1)*this.pageSize+1"  />
      <el-table-column prop="name" label="井名" align="center" min-width="110">
        <template slot-scope="scope">
          <span >{{scope.row.wellName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开关井//状态" :render-header="renderHeader" min-width="50" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.status" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctrlMode" label="控制//模式" :render-header="renderHeader" min-width="45" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.ctrlMode" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.ctrlMode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultValue" label="默认//参数" :render-header="renderHeader" min-width="40" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.defaultValue" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.defaultValue}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="injType" label="注入类型" min-width="60" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.injType" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.injType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="injDaily" label="日注入量" min-width="60" align="center">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.injDaily" v-show="scope.row.edit" />
          <span v-show="!scope.row.edit">{{scope.row.injDaily}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100"  align="center">
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

    <div class="page">
      <el-pagination
        background
        small
        layout="prev, pager, next"
        :total="prodTotal"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="100"
        style="float: right;margin-top: 10px">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { GetFactSchedule} from "@/api/rem/dispenseModel";
export default {
  name: "realTableWater",

  data() {
    return {
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageSize:100,
      multipleSelection: [],
      showEdit: [], // 显示编辑框
      showBtn: [], // 显示操作按钮
      submitData: [],
      tableList: [],
      pageLoading: false,
      props: ["injRealList","schDownLoading","startDate","endDate","modelBasicId"],
      editWaterData: [],
      prodRealList:[],
      injRealList:[],
      prodTotal:undefined
    }
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
      const param = {
        modelBasicId: this.$attrs.modelBasicId,
        startDate: this.$attrs.startDate,
        endDate: this.$attrs.endDate,
        pageSize:100,
        pn:this.currentPage,
        wellTypeFlag:"inj"

      }
      console.log("params",param)
      GetFactSchedule(param).then(res => {
        this.injRealList = res.result.injList
        console.log(res)
        this.pageLoading=false;

        //this.schDownLoading = false
      })
      console.log(this.currentPage);
    },
    DownloadINjTable() {
      this.prodRealList=[]
      this.injRealList=[]
      this.prodTotal=undefined
      this.pageLoading=true;

      const param = {
        modelBasicId: this.$attrs.modelBasicId,
        startDate: this.$attrs.startDate,
        endDate: this.$attrs.endDate,
        pageSize:100,
        pn:this.currentPage,
        wellTypeFlag:"inj"

      }
      console.log("params",param)
      GetFactSchedule(param).then(res => {
        this.injRealList = res.result.injList
        this.prodTotal=res.result.injTotal
        console.log(res)
        this.pageLoading=false;

        //this.schDownLoading = false
      })
    },
      
    // 获取选中行的这一条数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log("val", this.multipleSelection)
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
    //表格编辑
    edit(row, index) {
      row.edit = true;
      console.log(row.edit)
      row.originalctrlMode = row.ctrlMode;
      row.originaldefaultValue = row.defaultValue;
      row.originalinjType = row.injType;
      row.originalwellName = row.wellName;
      row.originalstatus = row.status;
      row.originalinjDaily = row.injDaily;
      row.originalstatus = row.status;
    },
    //保存数据
    save(row, index) {
      row.edit = false;
    },
    //取消编辑
    cancel(row, index) {
      row.ctrlMode = row.originalctrlMode;
      row.defaultValue = row.originaldefaultValue;
      row.injType = row.originalinjType;
      row.wellName = row.originalwellName;
      row.status = row.originalstatus;
      row.injDaily = row.originalinjDaily;
      row.injType = row.originalinjType;
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
    //传参
    transData() {
      this.editWaterData = this.$attrs.injRealList
      // console.log("全部2", this.editWaterData)
    },
    // save(index,row){
    //   console.log("save",row)
    //   row.ctrlMode = row.ctrlMode;
    //   row.defaultValue = row.defaultValue;
    //   row.maxProd = row.maxProd;
    //   row.status = row.status;
    //   row.wellName = row.wellName;
    //   this.$refs.multipleTable.toggleRowSelection(row);
    //   this.showEdit[index] = false;
    //   this.showBtn[index] = false;
    //   this.$set(this.showEdit, row, false);
    //   this.$set(this.showBtn, row, false);
    //   // this.editWaterData=this.$attrs.injRealList
    //   // console.log("全部2", this.editWaterData)
    // },
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
      this.tableList = this.$attrs.injRealList
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
    submit() {
      // if (this.multipleSelection.length < 1) {
      //   this.$message({
      //     message: "请至少选择一条数据！",
      //     type: "warning",
      //     duration: 3 * 1000,
      //   });
      // } else {
      this.handleQuery();
      console.log("pt", this.submitData)
      // updateValue(this.submitData)
      //     .then((res) => {
      //       if (res.date.code === 0) {
      //         this.$message({
      //           message: "数据修改成功",
      //           type: "success",
      //           duration: 5 * 1000,
      //         });
      //         this.submitData = [];
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // 清除所有选中
      this.$refs.multipleTable.clearSelection();
      // }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>