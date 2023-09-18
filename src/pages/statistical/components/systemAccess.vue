<!-- 系统访问示例组件 -->
<template>
  <div style="font-size: 14px;" class="g-w100 g-h100">
    <info-window
      info-width="100%"
      info-height="100%"
      header-title="系统访问情况"
      :is-show-max-btn="true"
    >
      <div class="g-w100 g-h100" style="padding: 10px 20px;">
        <div class="textDesc">
          截至本周，系统有效注册用户 {{ currentInfo?.usersValidRegistrations }} 人，近一个月活跃用户 {{ currentInfo?.userMonthlyActivityStatistics }} 人，用户月活跃度为
          {{ currentInfo?.userMonthlyActivityPercentage }}%，已上线各单位用户月活跃度如下图所示:
        </div>
        <!-- 搜索栏 -->
        <div class="g-row-flex-V" style="justify-content: flex-end;margin: 10px 0 5px;">
          <el-select
            v-model="currentNum"
            placeholder="请选择条数"
            style="width: 135px; margin-right: 10px;"
            @change="changeNum"
          >
            <el-option
              v-for="(item, index) in listOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="date1"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            style="width: 135px;"
            :clearable="false"
            @change="changeNum"
          />
        </div>
        <div class="g-w100 g-h100" style="height: calc(100% - 95px); overflow: hidden;">
          <charts-components ref="char6Com" :chart-data-options="char6" />
        </div>
      </div>
    </info-window>
  </div>
</template>
<script>
import chartsComponents from "@/components/intelligentOilfield/echarts-com/index.vue";
import { systemNum } from "@/api/intelligentOilfield/system/layout";
import dayjs from "dayjs";

export default {
  components: {
    chartsComponents
  },
  // eslint-disable-next-line
  props: ["currentResizeList"],
  data() {
    return {
      date1: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      currentInfo: null,
      currentNum: 0,
      listOptions: [
        { label: "全部", value: 0 },
        { label: "5条", value: 5 },
        { label: "10条", value: 10 }
      ],
      char6: {
        backgroundColor: "transparent",
        "color": [
          "#1c9a4c"
        ],
        "grid": {
          top: "5%",
          left: "17%",
          right: "13%",
          bottom: "22%"
        },
        legend: {
          x: "center", // 可设定图例在左、右、居中
          y: "bottom", // 可设定图例在上、下、居中
          padding: [2, 0, 10, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--text1"),
            fontSize: 14
          }
        },
        "yAxis": {
          "data": [],
          "axisTick": {
            "show": false
          },
          axisLabel: {
            color: "#8FA4CC",
            fontSize: 14
          }
        },
        "xAxis": [
          {
            max: 100,
            min: 0,
            "axisTick": {
              "show": false
            },
            splitLine: {
              show: false
            },
            "type": "value",
            "splitNumber": 5,
            "axisLabel": {
              "formatter": "{value}%",
              color: "#8FA4CC",
              fontSize: 14
            }
          }
        ],
        "series": [
          {
            "name": "用户月活跃度",
            "type": "bar",
            "barWidth": "55%",
            "label": {
              "normal": {
                "show": true,
                "position": "right",
                "formatter": "{c}%",
                "textStyle": {
                  "color": "#8FA4CC"
                }
              }
            },
            color: {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0, color: "#0F65EA"    // 0% 处的颜色
              }, {
                offset: 1, color: "#00D9EA"   // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false

            },
            "data": []
          }
        ]
      }
    };
  },
  watch: {
    "$store.state.setting.mode": {
      handler() {
        this.char6.legend.textStyle.color = getComputedStyle(document.documentElement).getPropertyValue(
          "--text1"
        );
        this.$refs?.char6Com?.refresh();
      },
      deep: true,
      immediate: true
    },
    currentResizeList: {
      handler() {
        this.$refs.char6Com?.refresh();
      },
      deep: true
    },
    // 监听最大最小化变更
    "$store.state.user.isMax": {
      handler() {
        this.$refs.char6Com?.refresh();
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.changeNum(0);
    this.$bus.$on("cancelPanel", () => {
      // eslint-disable-next-line vue/no-mutating-props
      this.currentResizeList = null;
    });
  },
  beforeDestroy() {
    this.$bus.$off("cancelPanel");
  },
  methods: {
    changeNum() {
      const res = {
        num: this.currentNum,
        date: this.date1
      };
      systemNum(res).then(response => {
        this.currentInfo = response.data.data;
        this.char6.yAxis.data = this.currentInfo.deptNames.reverse();
        this.char6.series[0].data = this.currentInfo.deptPercentages.sort((a, b) => a - b);
      });
    }
  }
};
</script>

<style scoped>
.textDesc {
  font-size: 14px;
  text-indent: 2em;
}
</style>