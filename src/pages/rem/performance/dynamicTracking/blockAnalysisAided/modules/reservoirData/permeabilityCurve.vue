<!--相渗透率曲线-->
<template>
  <div class="mt-2">
    <el-row>
      <el-select v-model="selectPosition" style="width: 220px;" placeholder="请选择" filterable  clearable >
        <el-option
            v-for="(item,index) in position"
            :key="index"
            :label="item.layerName"
            :value="item.fieldLayerId"
        >
        </el-option>
      </el-select>
    </el-row>
    <el-row class="mt-2">
      <el-col span="12" style="overflow: auto;">
        <el-image  :src="image">
          <div slot="error">
          </div>
        </el-image>
      </el-col>
      <el-col span="8">
        <el-table highlight :data='tableData'>
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column :render-header="renderHeader" label="含水饱和度 (%)" prop="" align="center"></el-table-column>
          <el-table-column label="相对渗透率Kro" prop="" align="center"></el-table-column>
          <el-table-column label="相对渗透率Krw" prop="" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {fieldOilLayers} from "@/api/oilDeposit/rem-02/primaryinfo.js";
import {reservoirDataPhasePermeabilityCurve} from "@/api/oilDeposit/rem-01/fielddynamicanalysis.js";
export default {
  props: {
    oilFieldId: {},
    blockId: {}
  },
  data() {
    return {
      radio: 1,
      src: '../../static/img/blockAnalysisAided/reservoirData/reservoirProfile.png',
      option: {
        grid: [
          {x: '5%', y: '12%', width: '70%', height: '70%'},
        ],
        legend: {
          left: 0,
          textStyle: {
            color: "#24DEFF",
          },
          data: ["H-rq", "H-rw"],
        },
        xAxis: {
          //type: 'category',
          min: 0, max: 100,
          splitNumber: 10,
          boundaryGap: false,
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          name: "Sw含水饱和度 和度/(%)",
          nameLocation: "center",
          nameTextStyle: {color: "#8FA4CC"},
          nameGap: 25,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(151,151,151,.16)",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        yAxis: {
          min: 0, max: 100,
          splitNumber: 5,
          name: "相渗透度/(%)",
          nameLocation: "center",
          nameTextStyle: {color: "#8FA4CC"},
          nameGap: 25,
          type: "value",
          axisLabel: {
            color: "#8FA4CC",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //color: '#979797'
              color: "rgba(255,255,255,.16)",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.16)",
            },
          },
        },
        series: [
          {
            data: [
              [30, 100],
              [33, 83],
              [37, 71],
              [40, 60],
              [42, 50],
              [45, 40],
              [47, 32],
              [50, 22],
              [52, 18],
              [55, 14],
              [58, 10],
              [60, 8],
              [62, 6],
              [65, 4],
              [68, 2],
              [70, 1],
              [75, 0],
            ],
            type: 'line',
            smooth: true,
            color: '#1E90FF',
            name: "H-rq",
            symbol: "roundRect",
            symbolSize: 10
          },
          {
            data: [
              [30, 0],
              [33, 1],
              [37, 2],
              [40, 3],
              [42, 4],
              [45, 5],
              [47, 8],
              [50, 9],
              [52, 10],
              [55, 12],
              [58, 14],
              [60, 17],
              [62, 18],
              [65, 21],
              [68, 24],
              [70, 25],
              [72, 30],
              [74, 34],
            ],
            type: 'line',
            smooth: true,
            color: '#7FFFD4	',
            name: "H-rw",
            symbol: "roundRect",
            symbolSize: 10
          },
        ]
      },
      //选中层位
      selectPosition: '',
      //层位所选择内容信息
      position: [],
      image: '',
    };
  },
  watch: {
    //监听层位信息，给其动态传值
    selectPosition(val) {
      this.$emit('childPara', this.selectPosition);
      this.OnChangeImage();
    }
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    async doSearch() {
      //this.$emit('childPara', '');
      //初始化获取层段关系
      await fieldOilLayers({
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        wellId: '',
      }).then((res) => {
        if(res.data.code==0){
          //层段数据
          if(res.data.data) {
            this.position = res.data.data.fieldLayers;
            if (!this.selectPosition && this.position[0]){
              if(this.blockId == '6CD7342CA6DD418183A4B3BC38584F7C'||this.blockId=='B440B47EE4D64C6CB56100AFE868DCA3'){
                if (this.position.find((item)=>{
                  return item.fieldLayerId == '263518079CED49AE8B6C9FE5CEBDD26A'
                })){
                  this.selectPosition = '263518079CED49AE8B6C9FE5CEBDD26A';
                }
                else{
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              }
              else if(this.blockId == 'F35E226D47CE4B09B497B852D774D122'){
                if (this.position.find((item)=>{
                  return item.fieldLayerId == '87795A3E6BBC4469BC9AC5AE0BBE759C'
                })){
                  this.selectPosition = '87795A3E6BBC4469BC9AC5AE0BBE759C';
                }
                else if(this.position.find((item)=>{
                  return item.fieldLayerId == '02398139A19A4F62BEFAC658E870D487'
                })){
                  this.selectPosition = '02398139A19A4F62BEFAC658E870D487';
                }
                else{
                  this.selectPosition = this.position[0].fieldLayerId;
                }
              }
              else{
                this.selectPosition = this.position[0].fieldLayerId;
              }
              this.$emit('childPara',this.selectPosition);
            }
          } else{
            this.position = [];
          }
        }
      });
      /**
       *  hwh
       *  获取参数油田id 平台id 井id
       * @type {{ogfId: *, platformId: *, wellId: *}}
       */
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      /**
       * hwh
       * 获取图片组信息
       */
      await reservoirDataPhasePermeabilityCurve(request).then((res) => {
        if (res.data.code == 0) {
          let imageData = res.data.data.layerPics[0];
          this.image = 'data:;base64,' + imageData.data;
        }
      });
    },
    /**
     * hwh
     * 切换图片
     * @constructor
     */
    OnChangeImage() {
      this.image = '';
      let request = {
        oilFieldId: this.oilFieldId,
        fieldId: this.blockId,
        layerId: this.selectPosition,
      }
      reservoirDataPhasePermeabilityCurve(request).then((res) => {
        if (res.data.code == 0) {
          let imageData = res.data.data.layerPics[0];
          this.image = 'data:;base64,' + imageData.data;
        }
      });
    },
    /**
     * hwh
     * 单选按钮选中改变事件
     */
    changeRadio() {
      this.$emit('childPara', this.selectPosition);
      this.OnChangeImage();
    },
    /**
     * hwh el table 表格头 标题单位样式
     * @param h
     * @param column
     * @returns {*[]}
     */
    renderHeader (h, {column}) {
      let header = column.label.split(' ');
      return [h('p', [
        h('p', {}, header[0]),
        h('span', {}, header[1])
      ])];
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table .cell:empty::before{
  content: '-';
}
</style>