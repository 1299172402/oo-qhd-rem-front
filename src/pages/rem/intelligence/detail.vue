<template>
  <div style="height: 100%">
    <header-search height="auto" style="padding: 10px">
      <div class="my-5 flex">
        <div class="flex-left">
          <span>油田：</span>
          <el-select
            v-model="queryData.ogfId"
            class="f2"
            filterable
            style="width:180px"
            @change="changeOil"
          >
            <el-option
              v-for="item in oilList"
              :key="item.ogfId"
              :label="item.ogfName"
              :value="item.ogfId"
            ></el-option>
          </el-select>
          <span style="margin-left: 20px">区块：</span>
          <el-select v-model="queryData.blockId">
            <el-option
              v-for="item in blockList"
              :key="item.reservoirAnalyseUnitId"
              :label="item.reservoirAnalyseUnitName"
              :value="item.reservoirAnalyseUnitId"
            ></el-option>
          </el-select>
          <span style="margin-left: 20px">时间：</span>
          <el-date-picker
            v-model="queryData.startTime"
            type="monthrange"
            range-separator="-"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="yyyy-MM"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <template v-if="queryData.timeStatus">
            <span style="margin-left: 20px">对比时间：</span>
            <el-date-picker
              v-if="queryData.timeStatus"
              v-model="queryData.endTime"
              type="monthrange"
              range-separator="-"
              start-placeholder="对比开始月份"
              end-placeholder="对比结束月份"
              value-format="yyyy-MM"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </template>
            <el-checkbox style="margin-left: 20px" v-model="queryData.timeStatus" @change="queryData.endTime = []" label="对比" border></el-checkbox>
          <el-button icon="el-icon-search" style="margin-left: 20px" class="confirmBut" type="primary" @click="queryBut">搜索</el-button>
            <el-button icon="el-icon-refresh" style="margin-left: 20px" class="commonBtn" @click="refresh">重置</el-button>
        </div>
        <div style="margin-top: auto;margin-bottom: auto">
          <el-button @click="returnBut" type="primary">返回</el-button>
        </div>
      </div>
    </header-search>
    <page-panel header-title="分层注采详情" style="height:calc(100% - 80px);">
        <el-button style="float: right;margin-top:-5px " @click="doExportFile" icon="el-icon-download" type="primary">下载</el-button>
          <el-table v-show="!isTableComp" id="export1" :data="tableData" style="width: 100%;" height="calc(100% - 30px)" highlight>
            <el-table-column prop="date" label="层位" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.productionIntervalNo !== null && scope.row.productionIntervalNo !== ''">{{scope.row.productionIntervalNo}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="配注量（10⁴m³）" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.injAlloc.first !== null && scope.row.injAlloc.first !== ''">{{scope.row.injAlloc.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="注水量（10⁴m³）" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.inj.first !== null && scope.row.inj.first !== ''">{{scope.row.inj.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="配注完成率（%）" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.overWaterInj.first !== null && scope.row.overWaterInj.first !== ''">{{scope.row.overWaterInj.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="产油量（10⁴m³）" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.oilData.first !== null && scope.row.oilData.first !== ''">{{scope.row.oilData.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="产液量（10⁴m³）" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.fluidProd.first !== null && scope.row.fluidProd.first !== ''">{{scope.row.fluidProd.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="注采比" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.layerRatio.first !== null && scope.row.layerRatio.first !== ''">{{scope.row.layerRatio.first}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
          </el-table>

         <!-- 对比 table -->
          <el-table v-show="isTableComp" id="exportCom" :data="tableData" style="width: 100%" height="calc(100% - 30px)" highlight>
            <el-table-column prop="date" label="层位" min-width="240" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.productionIntervalNo !== null && scope.row.productionIntervalNo !== ''">{{scope.row.productionIntervalNo}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="配注量（10⁴m³）" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.injAlloc[item.key] !== null && scope.row.injAlloc[item.key] !== ''">{{scope.row.injAlloc[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="注水量（10⁴m³）" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.inj[item.key] !== null && scope.row.inj[item.key] !== ''">{{scope.row.inj[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="配注完成率（%）" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.overWaterInj[item.key] !== null && scope.row.overWaterInj[item.key] !== ''">{{scope.row.overWaterInj[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="产油量（10⁴m³）" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.oilData[item.key] !== null && scope.row.oilData[item.key] !== ''">{{scope.row.oilData[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="产液量（10⁴m³）" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.fluidProd[item.key] !== null && scope.row.fluidProd[item.key] !== ''">{{scope.row.fluidProd[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="注采比" align="center">
              <!-- 对比标题 -->
              <el-table-column v-for="(item, index) of columnList" :key="index" :label="item.label" min-width="160" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.layerRatio[item.key] !== null && scope.row.layerRatio[item.key] !== ''">{{scope.row.layerRatio[item.key]}}</span>
                      <span v-else>-</span>
                  </template>
              </el-table-column>
            </el-table-column>
          </el-table>
</page-panel>
  </div>
</template>

<script>
import { getStratifiedInjectionDetailsComp } from '@/api/rem/r-intelligentIPA.js';
import { exportExcel } from '@/lib/exportExcel';
import {getuserListByUserNames,getFieldListsDetail,getblockData} from "@/api/basic/masterBycoderXu.js"
import queryConditionMixin from "@/mixins/queryConditionMixin.js";

export default {
  name:'intelligenceDetail',
  components: {
  },
  // mixins: [queryConditionMixin],
  data () {
    return {
      activeName: "月度",
      tableData: [],
      queryData: {
        //油田
        ogfId: '',
        //区块
        blockId: '',
        //选择时间
        startTime: [],
        endTime: [],
        timeStatus: false,
      },
      //油田下拉框
      oilList: [],
      //区块下拉
      blockList: [],
      columnList: [],
      // 日期时间范围在一个月以内
      pickerOptions: {
        disabledDate: (time) => {
          const dateObj = new Date()
          return time.getTime() > new Date(dateObj.getFullYear(),dateObj.getMonth() - 1).getTime()
        }
      },
    }
  },
  created () {
    const params = JSON.parse(localStorage.getItem('INTELLIGENCE'))
    if(params){
      this.queryData.ogfId = params.ogfId
      this.queryData.blockId = params.blockId
    }
    let timeNew = new Date((new Date()).getFullYear(),(new Date()).getMonth(), 0);
    this.queryData.startTime = [timeNew.format('YYYY-MM'), timeNew.format('YYYY-MM')]
  },
  computed:{
    isTableComp(){
      return this.columnList.length
    }
  },
  methods: {
    queryBlockFeild1 () {

      getblockData({ogfId:this.queryData.ogfId}).then((res) => {
        this.blockList = res.data.data;
        for(var i=0;i<this.blockList.length;i++){
          if(this.blockList[i].reservoirAnalyseUnitId==='83D33B89B0DAB7DFA440BD060746883A'){
            this.queryData.blockId=this.blockList[i].reservoirAnalyseUnitId
            this.queryStratifiedInjectionDetails()
          }
        }


        this.searchList()
        // this.queryData.blockId=this.blockList[0].blockId
      });
    },
    getuserListByUserNamesData(){
      let params = {
        searchKeys:[this.$store.getters["user/userDetail"].user.userName],
      }
      getuserListByUserNames(params).then((res)=>{
        this.queryData.orgId=res.data.data[0].currentTenantBindOrgId
        this.queryOilFeild1()
      })

    },
    queryOilFeild1() {
      getFieldListsDetail({operationZoneId:this.queryData.orgId}).then((res) => {
        this.oilList = res.data.data;
        var list =res.data.data;
        for(var i=0;i<list.length;i++){
          if(list[i].ogfId==='3FC9A818F5BC43B88270DB80BBB3018F'){
            this.queryData.ogfId=list[i].ogfId
          }
        }
        this.queryBlockFeild1()
      });

    },
    /**
     * 获取表格
     */
    returnBut () {
      this.$router.go(-1)
    },
    queryBut () {
        if(this.queryData.timeStatus == true){
            if(this.queryData.endTime.length<2) {
                this.$message.error('请选择对比时间！') }
            else{
                this.queryStratifiedInjectionDetails()  
            }
        }else{
            this.queryStratifiedInjectionDetails()
        }

    },
    // 重置按钮
    refresh(){
        this.queryData.blockId = 'YCFXDY8B643EDC9007F96F570600457D';
        let timeNew = new Date((new Date()).getFullYear(),(new Date()).getMonth(), 0);
        this.queryData.startTime = [timeNew.format('YYYY-MM'), timeNew.format('YYYY-MM')]
        this.queryData.timeStatus = false
        this.queryData.endTime = []
        this.queryStratifiedInjectionDetails()
      },
    queryStratifiedInjectionDetails () {
      if(!this.queryData.startTime){
        this.$message.error('请选择日期!')
      }
      if(this.queryData.timeStatus === true){
        if(!this.queryData.endTime){
        this.$message.error('请选择对比日期!')
        return
        }
        this.columnList = [
          { label: `${this.queryData.startTime[0]}~${this.queryData.startTime[1]}`, key: 'first' },
          { label: `${this.queryData.endTime[0]}~${this.queryData.endTime[1]}`, key: 'second' }
        ]
      } else {
        this.columnList = []
      }

      let params = {
        ogfId: this.queryData.ogfId,
        blockId: this.queryData.blockId,
        startTime: this.queryData.startTime,
        endTime: this.queryData.endTime,
        timeStatus: this.queryData.timeStatus ? 1 : 0 // 1:对比
      }
      
      getStratifiedInjectionDetailsComp(params).then((res) => {
        res.forEach(item => {
          if(item.injAlloc.first){
            if(item.injAlloc.first == 'Infinity'){
              item.injAlloc.first = '0.01'
            }else{
              item.injAlloc.first = Number(item.injAlloc.first).toFixed(2)
            }
          }
          
          if(item.injAlloc.second){ 
            if(item.injAlloc.second == 'Infinity'){
              item.injAlloc.second = '0.01'
            }else{
              item.injAlloc.second = Number(item.injAlloc.second).toFixed(2)
            }
          }
         
          if(item.inj.first){
            if(item.inj.first == 'Infinity'){
              item.inj.first = '0.01'
            }else{
              item.inj.first = Number(item.inj.first).toFixed(2)
            }
          }
          
          if(item.inj.second){ 
            if(item.inj.second == 'Infinity'){
              item.inj.second = '0.01'
            }else{
              item.inj.second = Number(item.inj.second).toFixed(2)
            }
          }

          if(item.overWaterInj.first){
            if(item.overWaterInj.first == 'Infinity'){
              item.overWaterInj.first = '0.01'
            }else{
              item.overWaterInj.first = Number(item.overWaterInj.first).toFixed(2)
            }
          }
          
          if(item.overWaterInj.second){ 
            if(item.overWaterInj.second == 'Infinity'){
              item.overWaterInj.second = '0.01'
            }else{
              item.overWaterInj.second = Number(item.overWaterInj.second).toFixed(2)
            }
          }

          if(item.oilData.first){
            if(item.oilData.first == 'Infinity'){
              item.oilData.first = '0.01'
            }else{
              item.oilData.first = Number(item.oilData.first).toFixed(2)
            }
          }
          
          if(item.oilData.second){ 
            if(item.oilData.second == 'Infinity'){
              item.oilData.second = '0.01'
            }else{
              item.oilData.second = Number(item.oilData.second).toFixed(2)
            }
          }

          if(item.fluidProd.first){
            if(item.fluidProd.first == 'Infinity'){
              item.fluidProd.first = '0.01'
            }else{
              item.fluidProd.first = Number(item.fluidProd.first).toFixed(2)
            }
          }
          
          if(item.fluidProd.second){ 
            if(item.fluidProd.second == 'Infinity'){
              item.fluidProd.second = '0.01'
            }else{
              item.fluidProd.second = Number(item.fluidProd.second).toFixed(2)
            }
          }
          
          if(item.layerRatio.first){
            if(item.layerRatio.first == 'Infinity'){
              item.layerRatio.first = '0.01'
            }else{
                item.layerRatio.first = Number(item.layerRatio.first).toFixed(2)
            }
          }
          
          if(item.layerRatio.second){ 
            if(item.layerRatio.second == 'Infinity'){
              item.layerRatio.second = '0.01'
            }else{
              item.layerRatio.second = Number(item.layerRatio.second).toFixed(2)
            }
          }

        });
        this.tableData = res
      }).catch(()=>{
        this.tableData = []
      })
    },
    /**
     * 改变月/年
     */
    changeActive () {
      this.queryStratifiedInjectionDetails()
    },
    /**
     * 下载
     */
    doExportFile () {
      if (this.queryData.blockId) {
        let blockName = this.blockList.find(
          (item) => item.blockId == this.queryData.blockId
        ).blockName;
        if(this.columnList.length){
          exportExcel('#exportCom', blockName + '分层注采量');
        } else {
          exportExcel('#export1',  '分层注采量');
        }
      } else {
        this.$message.error("请选择油田与区块")
      }
    },
  },
  mounted () {
    this.getuserListByUserNamesData()
    
  },
}
</script>
<style lang="scss" scoped>
.confirmBut {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #66ffff;
}

.el-checkbox.is-bordered {
  border: 1px solid #66ffff;
}

.flex {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-table thead.is-group th{
  background: #f5f7fa00;
}
::v-deep .el-table__fixed, ::v-deep .el-table__fixed-right{
  background-color: #183953;
  // background-image: linear-gradient(to bottom, rgba(64, 133, 181, 1), rgba(0, 86, 146, 1))
}
::v-deep .el-table__fixed-right::before, ::v-deep .el-table__fixed::before {
  background-color: transparent;
}
::v-deep .el-table thead{
  color: #fff;
}
::v-deep .el-table thead.is-group th{
  padding: 10px 0;
}
#export1 {
    
    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}
#export1 {

    ::v-deep .cell:empty {
        &::before {
            content: "-";
        }
    }
}
</style>