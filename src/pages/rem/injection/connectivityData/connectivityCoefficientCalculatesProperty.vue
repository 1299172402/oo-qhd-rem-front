<template>
  <el-container class="layout">
    <el-header height="auto" class="case">
      <div class="case1">
        <div class="case2">
          <div>
            <span>油田：</span>
            <el-select v-model="Select.ogf" class="f2" disabled>
              <el-option :value="Select.ogf" :label="Select.ogfName"></el-option>
            </el-select>
          </div>
          <div>
            <span>区块：</span>
            <el-select v-model="Select.block" class="f2" disabled @change="changeBlock">
              <el-option :label="Select.blockName" :value="Select.block"></el-option>
            </el-select>
          </div>
          <div class="f3">
            <span>时间：</span>
            <el-date-picker
              v-model="Select.dateTime"
              type="month"
              style="width: 117px;"
              value-format="yyyy-M"
              disabled
            ></el-date-picker>
            <el-button type="primary" size="mini" class="confirmBut">确认</el-button>
          </div>
        </div>
        <el-button type="primary" @click="returnBut" class="confirmBut">返回</el-button>
      </div>
    </el-header>
    <el-main class="Table">
      <pagePanel headerTitle="井组参数配置" style="height: 450px; width: 100%" class="g-w100">
          <div style="display: flex;justify-content: space-between;align-items: center;">
          <div>
            <span>井组名称：</span>
            <el-select v-model="selectBlock" placeholder="请选择" @change="changeBlock">
              <el-option
                v-for="item in blanks"
                :key="item.wellGroupId"
                :label="item.wellGroupName"
                :value="item.wellGroupId"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              style="margin-left: 50px; width: 70px"
              class="confirmBut"
              :disabled="disabledComp || !form.tableWater.length"
              @click="modify = !modify"
            >更改</el-button>
            <el-button
              type="primary"
              size="mini"
              :loading="saveLoad"
              icon="el-icon-bank-card"
              style="width: 70px"
              class="confirmBut"
              :disabled="disabledComp || !form.tableWater.length"
              @click="preserve('form')"
            >保存</el-button>
            <el-button
              type="primary"
              size="mini"
              class="confirmBut"
              icon="el-icon-download"
              @click="downloadTable"
            >下载</el-button>
          </div>
        </div>
        <div>
          <el-form ref="form" :rules="rules" label-width="100px" :model="form">
            <el-table
              id="indexscv"
              :data="form.tableWater"
              highlight
              style="margin-top: 10px"
              height="600"
              :span-method="mergeTable"
            >
              <el-table-column
                prop="wellGroupName"
                show-overflow-tooltip
                label="井组名称"
                align="center"
              ></el-table-column>
              <el-table-column prop="injWellNo" show-overflow-tooltip label="水井井号" align="center"></el-table-column>
              <el-table-column prop="layerName" show-overflow-tooltip label="层位名称" align="center"></el-table-column>
              <el-table-column prop="proWellNo" label="油井井号" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column
                prop="wellSpacing"
                min-width="40px"
                label="注采井距?(m)"
                :render-header="renderheader"
                show-overflow-tooltip
                align="center"
                class="align-middle"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableWater.'+scope.$index+'.wellSpacing'"
                    :rules="rules.wellSpacing"
                    v-if="modify"
                  >
                    <el-input type="number" v-model="scope.row.wellSpacing" @blur="viteBut" />
                  </el-form-item>
                  <span v-else>{{ scope.row.wellSpacing }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="aroundWellNum"
                label="周围注采井数(口)"
                style="color: aquamarine;height: 200px;"
                :render-header="renderHeader"
                min-width="40px"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableWater.'+scope.$index+'.aroundWellNum'"
                    :rules="rules.aroundWellNum"
                    v-if="modify"
                  >
                    <el-input type="number" v-model="scope.row.aroundWellNum" @blur="viteBut" />
                  </el-form-item>
                  <span v-else>{{ scope.row.aroundWellNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="井控面积?(m²/口)"
                prop="wellControlArea"
                :render-header="renderheader"
                min-width="40px"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'tableWater.'+scope.$index+'.wellControlArea'" v-if="modify">
                    <el-input type="number" v-model="scope.row.wellControlArea" @blur="viteBut" />
                  </el-form-item>
                  <span v-else>{{ scope.row.wellControlArea }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="airPermeability"
                min-width="50px"
                label="渗透率?(mD)"
                :render-header="renderheader"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'tableWater.'+scope.$index+'.airPermeability'" v-if="modify">
                    <el-input type="number" v-model="scope.row.airPermeability" @blur="viteBut" />
                  </el-form-item>
                  <span v-else>{{ scope.row.airPermeability }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="thicknessEffe"
                min-width="40px"
                label="有效厚度?(m)"
                :render-header="renderheader"
                show-overflow-tooltip
                align="center"
              ></el-table-column>
              <el-table-column
                prop="shaleContent"
                min-width="40px"
                label="泥质含量?(%)"
                :render-header="renderheader"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'tableWater.'+scope.$index+'.shaleContent'" v-if="modify">
                    <el-input type="number" v-model="scope.row.shaleContent" @blur="viteBut" />
                  </el-form-item>
                  <span v-else>{{scope.row.shaleContent }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </pagePanel>
    </el-main>
  </el-container>
</template>
<script>


import { exportExcel } from "@/lib/exportExcel";
import {
  postCoefficientconnectivity,
  postWellgroupRevise,
  getselectWellGroup //井组下拉
} from "@/api/rem/r-wellConnectEvaluate.js";


export default {
  components: {

  },
  data () {
    return {
      blanks: [],
      selectBlock: 0,
      modify: false,
      form: {
        tableWater: [],
      },
      Select: {
        block: undefined,
        blockName: '',
        ogf: undefined,
        ogfName: '',
        dateTime: ''
        
      },
      rules: {
        aroundWellNum: [
          { required: true, pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/, message: '输入不正确', }
        ],
        wellSpacing: [
          { required: true, pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/, message: '输入不正确', }
        ],
        wellControlArea: [
          { required: true, pattern: /^((^[0-9]{0,4})$)/, message: '输入不正确', }
        ],
        airPermeability: [
          { required: true, pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/, message: '输入不正确', }
        ],
        shaleContent: [
          { required: true, pattern: /^((^[0-9]{1,4})$)|^((^[0-9]{1,4})\.([0-9]{1,4})$)/, message: '输入不正确', }
        ]
      },
      mergeArr: ['wellGroupName'],
      mergeObj: {},
      saveLoad: false,
      disabledComp: false,
    };
  },
  mounted () {
    //获取井组下拉数据
    const params = JSON.parse(localStorage.getItem('CONNECTIVITY_DATA'))
    if(params && params.blockId){
      this.Select.block = params.blockId
      this.Select.blockName = params.blockName
      this.Select.ogf = params.ogfId
      this.Select.ogfName = params.ogfName
      this.Select.dateTime = params.dateTime
    }

    this.selectData();
    this.changeBlock(0)
  },
  methods: {
    mergeTable ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.mergeObj['wellGroupName'][rowIndex]) {
          return [this.mergeObj['wellGroupName'][rowIndex], 1]
        } else {
          return [0, 0]
        }
      }

      if (columnIndex === 1) {
        if (this.mergeObj['wellGroupName'][rowIndex]) {
          return [this.mergeObj['wellGroupName'][rowIndex], 1]
        } else {
          return [0, 0]
        }
      }

      if (columnIndex === 2) {
        if (this.mergeObj['wellGroupName'][rowIndex]) {
          return [this.mergeObj['wellGroupName'][rowIndex], 1]
        } else {
          return [0, 0]
        }
      }
    },
    getSpanArr (data) {
      this.mergeArr.forEach((key, index1) => {
        let count = 0;
        this.mergeObj[key] = []
        data.forEach((item, index) => {
          if (index === 0) {
            this.mergeObj[key].push(1)
          } else {
            if (item[key] === data[index - 1][key]) {
              this.mergeObj[key][count] += 1;
              this.mergeObj[key].push(0)
            } else {
              count = index
              this.mergeObj[key].push(1)
            }
          }
        })
      })
    },
    returnBut () {
      this.$router.go(-1)
    },
    // 表格下载
    downloadTable () {
      exportExcel("#indexscv", this.Select.blockName + "井组参数配置");
    },
    // 获取井组下拉数据
    selectData () {
      let params = {
        ogfId: this.Select.ogf,
        blockId: this.Select.block,
        dateTime: this.Select.dateTime,
      };
      getselectWellGroup(params).then((res) => {
        this.blanks = res;
        this.blanks.unshift({
          wellGroupId: 0,
          wellGroupName: '全部'
        })
      });
    },
    viteBut () {
      if (this.$refs['form'])
        this.$refs['form'].validate()
    },
    // 井组点击事件
    changeBlock (e) {
      let params = {}
      if (e == 0) {
        params = {
          wellGroupId: '',
          ogfId: this.Select.ogf,
          blockId: this.Select.block,
          dateTime: this.Select.dateTime,
          apifoxApild: "48248204"
        };
      } else {
        params = {
          wellGroupId: this.selectBlock,
          ogfId: this.Select.ogf,
          blockId: this.Select.block,
          dateTime: this.Select.dateTime,
          apifoxApild: "48248204"
        };
      }
      postCoefficientconnectivity(params).then((res) => {
        if(Array.isArray(res) && res.length){
          this.disabledComp = this.Select.dateTime !== (new Date(res[0].updateYearMonth)).format("yyyy-MM")
        }
        res.forEach(item => {
          item.wellSpacing = item.wellSpacing ? item.wellSpacing : ''
          item.aroundWellNum = item.aroundWellNum ? item.aroundWellNum : ''
          item.wellControlArea = item.wellControlArea ? item.wellControlArea : ''
          item.airPermeability = item.airPermeability ? Math.round(item.airPermeability) : ''
          item.thicknessEffe = item.thicknessEffe ? item.thicknessEffe : ''
          item.shaleContent = item.shaleContent ? Number(item.shaleContent).toFixed(1) : ''
        });
        this.form.tableWater = res
        this.getSpanArr(res)
      });
    },
    // 保存
    preserve (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = [];
          for(const item of this.form.tableWater){
            params.push({
              wellGroupId: item.wellGroupId,
              injWellId: item.injWellId,
              oilWellId: item.oilWellId,
              wellGroupDataId: item.wellGroupdataId,
              wellSpacing: item.wellSpacing,
              aroundWellNum: item.aroundWellNum,
              wellControlArea: item.wellControlArea,
              airPermeability: item.airPermeability,
              thicknessEffe: item.thicknessEffe,
              shaleContent: item.shaleContent,
              layerId: item.layerId,
              proWellId: item.proWellId,
              updateYearMonth: item.updateYearMonth,
            });
          }
          postWellgroupRevise(params).then((res) => {
            if (res.status == 200) {
              this.$message({ type: "success", message: "保存成功!" });
            } else {
              this.$message({ type: "error", message: "保存失败!" });
            }
          });
          this.modify = false;
        } else {
          return false;
        }
      });
    },
    renderheader (h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('?')[0]),
        h('br'),
        h('span', {}, column.label.split('?')[1])
      ]);
    },
    renderHeader (h, { column }) {
      // 悬浮提示的文字内容
      const info = '以油井为中心，周围注水井和采油井的井数之和'
      return h(
        'div',
        [
          h('span', column.label),
          // placement指定悬浮显示方向
          h('el-tooltip', { props: { placement: 'top', effect: 'light' } },
            [
              // style 调文字颜色样式
              h('div', { slot: 'content', style: { whiteSpace: 'normal', color: 'blue' } }, info),
              // el-icon-warning是element图标, style 调图标颜色 样式
              h('i', { class: 'el-icon-warning', style: 'color: #409EFF; margin-left: 5px;' })
            ]
          )
        ]
      )
    }
  },
};
</script>

<style lang="scss" scoped>
.case {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  .case1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.fl {
  margin-left: 10px;
}

.f2 {
  width: 140px;
  height: 40px;
  line-height: 40px;
}

.countBut {
  background-image: linear-gradient(to left, red, white);
  height: 40px;
}

.confirmBut {
  background: rgba(0, 0, 0, 0);
  border: 1px solid #66ffff;
}

.f3 {
  background: rgb(23, 45, 65);
  margin-left: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  //   line-height: 40px;
  //   text-align: center;
  width: 250px;
}

.case2 {
  display: flex;
}

.normalCard {
  margin-top: 15px;
}

.title {
  text-align: center;
}
.lian {
  color: #66ffff;
}

::v-deep .el-form-item__content {
  margin-left: 10% !important;
  width: 80%;
}

// ::v-deep .cell {
//   margin-top: 20px !important;
// }

::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

::v-deep input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}

::v-deep input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .el-table__row {
  height: 65px;
}
</style>
