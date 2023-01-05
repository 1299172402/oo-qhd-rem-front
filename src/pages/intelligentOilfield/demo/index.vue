<template>
  <div>
    <div>点击“成功”按钮将出现警告提示</div>
    <el-button type="primary" @click="open2">成功</el-button>
    <div>点击“重置”按钮将出现Dialog提示</div>
    <el-button class="commonBtn" @click="open1">重置</el-button>
    <el-button class="cancelBtn">取消</el-button>
    <el-select v-model="value" placeholder="请选择" style="margin: 0 20px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-date-picker
      v-model="value1"
      type="daterange"
      style="width: 400px"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <irregularityBox style="margin: 20px 20px 20px 0"></irregularityBox>
    <el-table
      :row-style="{ height: '0px' }"
      :header-cell-style="{ 'text-align': 'center', padding: '6px 0' }"
      :data="tableData"
      header-cell-class-name="table_header"
      :cell-style="{ padding: '6px', 'text-align': 'center' }"
      style="width: 700px; margin: 20px 0"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-radio-group style="margin: 20px 0" v-model="activeTabIndex">
      <el-radio :label="0">力导布局</el-radio>
      <el-radio :label="1">树形布局</el-radio>
    </el-radio-group>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
    <chartsComponents
      :chart-data-options="dataOption"
      echartsType="pie1"
      style="width: 400px; height: 400px"
    ></chartsComponents>
    <chartsComponents
      :chart-data-options="dataOptionLine"
      echartsType="line1"
      style="width: 600px; height: 400px"
    ></chartsComponents>
    <chartsComponents
      :chart-data-options="dataZhuzhuang"
      echartsType="bar1"
      style="width: 600px; height: 400px"
    ></chartsComponents>
    <div id="lineContainer" ref="lineContainer" style="width: 50%; height: 410px"></div>
    <el-input v-model="input" style="width: 300px; margin: 20px 0" placeholder="请输入角色名称"></el-input>
    <el-pagination background layout="prev, pager, next,total" :total="1000" class="paginationDiv"> </el-pagination>
    <div style="margin-top: 20px">点击“点击打开Modal”按钮将出现Modal对话框</div>
    <el-button type="text" @click="dialogVisible = true">点击打开Modal</el-button>
    <div class="eldialog">
      <el-dialog title="标题" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
        <span>何时使用：需要用户处理事务，又不希望跳转</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>点击“删除”按钮将出现Modal对话框</div>
    <el-button class="commonBtn" @click="onShowModal">删除</el-button>
    <myModal
      :title="title"
      :content="content"
      cancelText="取消"
      okText="确认"
      mode="confirm"
      type="confirm"
      :center="center"
      :loading="loading"
      @cancel="onCancel"
      @ok="onConfirm"
      v-show="showModal"
    />
    <div style="margin-top: 20px">
      <el-alert
        title="成功提示的文案"
        type="success"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </el-alert>
      <el-alert
        title="消息提示的文案"
        type="info"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </el-alert>
      <el-alert
        title="警告提示的文案"
        type="warning"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </el-alert>
      <el-alert
        title="错误提示的文案"
        type="error"
        description="文字说明文字说明文字说明文字说明文字说明文字说明"
        show-icon
      >
      </el-alert>
    </div>

    <div style="margin-top: 20px">
      <el-button :plain="true" @click="opensuccess" class="commonBtn">成功消息提示</el-button>
      <el-button :plain="true" @click="openwarn" class="commonBtn">警告消息提示</el-button>
      <el-button :plain="true" @click="openinfo" class="commonBtn">消息消息提示</el-button>
      <el-button :plain="true" @click="openerror" class="commonBtn">失败消息提示</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button class="errorBtn">危险按钮</el-button>
      <el-button class="errorBtnplain">危险按钮</el-button>
      <el-button class="disableBtn">失效按钮</el-button>
    </div>
    <div style="margin-top: 20px" class="dropdown">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div style="margin-top: 20px">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div style="margin-top: 20px; width: 50%" class="stepsrow">
      <el-steps :active="activerow" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px" @click="next" class="commonBtn">下一步（横）</el-button>
      <el-button style="margin-top: 12px" @click="next1" class="commonBtn">下一步(竖)</el-button>
    </div>
    <div style="margin-top: 20px; height: 300px" class="stepscolumn">
      <el-steps :active="activecolumn" finish-status="success" direction="vertical">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div class="block">
      <el-slider v-model="value2"></el-slider>
    </div>
  </div>
</template>
<script>
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { mapState } from 'vuex';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { getFolderLineDataSet } from './index';
import { Message } from 'element-ui';

// import * as echarts from "echarts";
import chartsComponents from '@/components/echarts-com/index.vue';
import irregularityBox from '@/components/irregularity-box/index.vue';
import myModal from '@/components/modal/index.vue';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, CanvasRenderer]);
const labelName = ['总值', '合格值'];

const getRate = 70;

const color = [
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'rgba(242, 164, 64, 1)', // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'rgba(255, 213, 65, 1)', // 100% 处的颜色
      },
    ],
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'rgba(29, 130, 255, 1)', // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'rgba(0, 255, 246, 1)', // 100% 处的颜色
      },
    ],
  },
];
export default {
  components: {
    irregularityBox,
    chartsComponents,
    myModal,
  },
  data() {
    return {
      input: '',
      checkList: ['复选框 A'],
      activeTabIndex: 0,
      checkBoxInput: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      dataOption: {
        polar: {
          center: ['50%', '50%'],
          radius: ['38%', '76%'],
        },
        angleAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 100,
          boundaryGap: ['0', '100'],
          startAngle: 90,
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: labelName,
          z: 10,
        },
        series: [
          {
            name: '',
            hoverAnimation: false,
            silent: true,
            type: 'pie',
            data: [{ name: '合格值', value: 100 }],
            z: 1,
            center: ['50%', '50%'],
            radius: ['27%', '68%'],
            label: {
              show: true,
              position: 'center',

              formatter: `{total|${getRate}%}\n\n{lname|合格值}`,
              rich: {
                total: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#0DDBFF',
                },
                lname: {
                  fontSize: 12,
                  color: '#FFF',
                },
              },
            },
            itemStyle: {
              color: 'rgba(62, 109, 255, 0.2)',
            },
          },
          {
            // hoverAnimation:false,
            name: labelName[0],
            barGap: '-100%',
            // silent:true,
            type: 'bar',
            data: [100],
            coordinateSystem: 'polar',
            z: 2,
            label: {
              show: false,
            },
            itemStyle: {
              color: color[0],
            },
          },
          {
            // hoverAnimation:false,
            roundCap: true,
            // silent:true,
            name: labelName[1],
            type: 'bar',
            coordinateSystem: 'polar',
            barGap: '-100%',
            data: [getRate],
            z: 3,
            label: {
              show: false,
            },
            itemStyle: {
              color: color[1],
            },
          },
        ],
      },
      dataOptionLine: {
        // 你的代码
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        legend: {
          x: '46%',
          top: '0%',
          textStyle: {
            color: 'gray',
            fontSize: 12,
          },
          data: ['历史价格'],
        },

        grid: {
          top: '25%',
          left: '12%',
          right: '3%',
          bottom: '10%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: false,
              color: '#A582EA',
            },

            axisLabel: {
              color: 'gray',
              width: 100,
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: [
              '11/12',
              '11/13',
              '11/14',
              '11/15',
              '11/16',
              '11/17',
              '11/18',
              '11/19',
              '11/20',
              '11/21',
              '11/22',
              '11/23',
              '11/24',
              '11/25',
              '11/26',
              '11/27',
              '11/28',
              '11/29',
              '11/30',
              '12/01',
              '12/02',
              '12/03',
              '12/04',
              '12/05',
              '12/06',
              '12/07',
              '12/08',
              '12/09',
              '12/10',
              '12/11',
            ], // this.$moment(data.times).format("HH-mm") ,
          },
        ],

        yAxis: [
          {
            name: '单位：元',
            nameTextStyle: {
              color: 'gray',
              fontSize: 12,
            },
            type: 'value',
            min: 0,
            splitNumber: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'gray',
                opacity: 0.23,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 15,
              textStyle: {
                color: 'gray',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '历史价格',
            type: 'line',
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                color: '#2CABE3',
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#2CABE3',
                fontSize: 10,
              },
            },
            itemStyle: {
              color: '#2CABE3',
              borderColor: '#2CABE3',
              borderWidth: 0,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(81,150,164,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(81,150,164,0)',
                    },
                  ],
                  false,
                ),
              },
            },
            data: [
              100.08, 136.97, 142.37, 135.04, 159.28, 157.08, 66.14, 149.27, 186.26, 0, 0, 170.3, 111.31, 54.86, 119.06,
              109.57, 105.31, 34.87, 129.04, 35.33, 0, 31.51, 127.09, 136.76, 188.59, 142.03, 126.7, 133.33, 124.09,
              67.43,
            ], // data.values
          },
        ],
      },
      dataZhuzhuang: {
        backgroundColor: 'transparent',
        title: {
          show: true,
          text: '',
          textStyle: {
            align: 'rigth',
            color: 'gray',
            fontSize: 20,
          },
          top: '3%',
          left: '5%',
        },
        grid: {
          top: '28%',
          right: '10%',
          bottom: '18%', // 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(17,95,182,0.5)',
          textStyle: {
            color: '#fff',
          },
          // axisPointer: {
          //     type: "line",
          //     label: {
          //         show: false,
          //     }
          // },
          formatter: (pa) => {
            const oneDotHtml =
              '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#1480C2"></span>';
            const twoDotHtml =
              '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:#8957A1"></span>';
            // return pa[0].name + pa[0].value
            return `${pa[0].name}<br/>${oneDotHtml}${pa[1].seriesName}：${pa[1].value}<br>${twoDotHtml}${pa[0].seriesName}：${pa[0].value}`;
          },
        },
        dataZoom: [
          {
            show: false,
            xAxisIndex: 0,
            type: 'slider',
            startValue: 0,
            endValue: this.end,
          },
        ],
        legend: {
          top: '20%',
          left: '40%',
          // icon: 'rect',
          textStyle: {
            padding: [0, 0, 0, 10],
            color: 'gray',
            fontSize: 14,
            lineHeight: 16,
          },
          itemGap: 50,
          itemHeight: 10,
          data: ['肥料', '农药'],
        },
        xAxis: {
          data: ['草堂镇', '白帝镇', '朱衣镇', '康乐镇', '永乐镇', '安坪镇'],
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: 'gray',
            },
          },
          axisTick: {
            show: false, // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              padding: [5, 0, 0, 0],
              color: 'gray', // X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '吨',
            nameTextStyle: {
              color: 'gray',
              fontSize: 14,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(33,35,98,1)',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'gray',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: 'gray',
              },
            },
          },
          {
            type: 'value',
            // name: "同比",
            // nameTextStyle: {
            //     show: false,
            //     color: "#ebf8ac"
            // },
            position: 'right',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: 'gray',
              },
            },
          },
          // {
          //     type: "value",
          //     // gridIndex: 1,
          //     min: 50,
          //     max: 100,
          //     splitNumber: 8,
          //     splitLine: {
          //         show: false
          //     },
          //     axisLine: {
          //         show: false
          //     },
          //     axisTick: {
          //         show: false
          //     },
          //     axisLabel: {
          //         show: false
          //     },
          //     splitArea: {
          //         show: true,
          //         areaStyle: {
          //             color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
          //         }
          //     }
          // }
        ],
        series: [
          {
            name: '农药',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'emptyCircle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            itemStyle: {
              // 折线拐点标志的样式
              color: '#8957A1',
            },
            lineStyle: {
              color: '#8957A1',
            },
            // areaStyle:{
            //     color: 'transparent'
            //     // color: "rgba(5,140,255, 0.2)"
            // },
            data: [5, 5, 5, 5, 5, 5],
          },
          {
            name: '肥料',
            type: 'bar',
            barWidth: '30%',
            showBackground: false,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'red',
                  },
                  {
                    offset: 0,
                    color: '#1F0D5E',
                  },
                  {
                    offset: 1,
                    color: '#1480C2',
                  },
                ]),
              },
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: 'gray',
                },
              },
            },
            data: [14, 16, 20, 7, 15, 11],
          },
        ],
      },
      lineContainer: '',
      lineChart: '',
      dialogVisible: false,
      showModal: false,
      title: '确认要删除这条信息吗？',
      content: '',
      loading: false,
      center: true,
      activerow: 0, // steps步骤条
      activecolumn: 0,
      value2: 10, // slider滑块
    };
  },
  computed: {
    ...mapState('setting', ['brandTheme', 'mode']),
  },
  watch: {
    brandTheme() {
      //   changeChartsTheme([this.lineChart])
    },
    mode() {
      this.renderCharts();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainer();
    });
    this.renderCharts();
  },
  methods: {
    open1() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log('tanchuang');
      });
    },
    open2() {
      this.$notify('info', {
        title: '标题名称',
        content: '用户表示操作引起一定后果的消息通知',
      }); // t-designer
    },
    // 调用Modal弹出对话框
    onShowModal() {
      this.content = '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。';
      this.showModal = true;
    },
    // Modal“取消”按钮回调
    onCancel() {
      this.showModal = false;
    },
    // Modal “确定”按钮回调
    onConfirm() {
      // this.loading = true // 开启加载状态
      this.showModal = false;
    },
    // message弹出框（四种）
    openwarn() {
      Message({
        type: 'warning',
        message: '这是一条提示消息，会主动消失',
      });
    },
    opensuccess() {
      Message({
        type: 'success',
        message: '这是一条成功消息，会主动消失',
      });
    },
    openinfo() {
      Message({
        message: '这是一条提示消息，会主动消失',
      });
    },
    openerror() {
      Message({
        type: 'error',
        message: '这是一条异常消息，会主动消失',
      });
    },
    next() {
      this.activerow+=1
      if (this.activerow === 2) this.activerow = 0;
    },
    next1() {
      this.activecolumn+=1
      if (this.activecolumn === 2) this.activecolumn = 0;
    },
    /** 采购商品申请趋势选择 */
    onMaterialChange(value) {
      const { chartColors } = this.$store.state.setting;

      this.lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors }));
    },
    updateContainer() {
      this.lineChart.resize?.({
        width: this.lineContainer.clientWidth,
        height: this.lineContainer.clientHeight,
      });
    },
    renderCharts() {
      const { chartColors } = this.$store.state.setting;

      if (!this.lineContainer) {
        this.lineContainer = document.getElementById('lineContainer');
      }
      this.lineChart = echarts.init(this.lineContainer);
      this.lineChart.setOption(getFolderLineDataSet({ ...chartColors }));

      window.addEventListener('resize', this.updateContainer, false);
    },
  },
};
</script>

<style scoped>
.qiejiao {
  background: red;
  width: 50px;
  height: 50px;
  clip-path: polygon(0 30px, 100% 0, 100% 100%, 0 100%);
}
.topBox {
  display: flex;
}
.topRight {
  background: green;
  width: 200px;
  height: 50px;
}
.centerBox {
  width: 200px;
}
.eldialog ::v-deep.el-dialog {
  background: linear-gradient(to bottom, rgba(0, 162, 218, 0.3), rgba(0, 162, 218, 0.6));
}
</style>
