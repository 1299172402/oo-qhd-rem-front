<!-- 指标中心-iframe指标嵌入代码片段 -->
<template>
  <div style="font-size: 14px;padding: 10px;color: rgba(144,144,144,1)" class="g-w100 g-h100">
    <!-- eslint-disable vue/no-v-html -->
    <div ref="htmlDiv" class="g-w100 g-h100" v-html="templateHtml" />
  </div>
</template>
<script>

export default {
  name: "BarChartCom",
  props: {
    templateHtml: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      timer: null,
      // 代码片段示例
      exampleHtml: ` <script src='https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.min.js'><\/script>
            <script src="http://libs.baidu.com/jquery/1.7.2/jquery.min.js"><\/script>
            <body>
                 <div id="mainTest" style="height: 100%; width: 100%;"></div>
                 <script>
                     // 接口调用
                     $.ajax({
                        type:'get',
                        url:'https://127.0.0.1/analytics/attend?wsId=15112319',
                        headers: {
                            "authorization": "Basic MTUxMTIzMTk6MzQ2NTE1YmU4MTkwZDdiNDA2NWJlODMwMzRiY2Q5NDQ=",
                        },
                        success:function(response) {
                            console.log(response);
                        },
                        error:function (xhr){
                                console.log(xhr)
                        }
                    });

                    // echarts图表渲染
                    var chartDom = document.getElementById('mainTest');
                    var myChart = echarts.init(chartDom);
                    var option;
                   
                    option = {
                        backgroundColor: '#2c343c',

                        title: {
                            text: 'Customized Pie',
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#ccc'
                            }
                        },

                        tooltip: {
                            trigger: 'item'
                        },

                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: [
                                    {value: 335, name: '直接访问'},
                                    {value: 310, name: '邮件营销'},
                                    {value: 274, name: '联盟广告'},
                                    {value: 235, name: '视频广告'},
                                    {value: 400, name: '搜索引擎'}
                                ].sort(function (a, b) { return a.value - b.value; }),
                                roseType: 'radius',
                                label: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                labelLine: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                },
                                itemStyle: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },

                                animationType: 'scale',
                                animationEasing: 'elasticOut',
                                animationDelay: function (idx) {
                                    return Math.random() * 200;
                                }
                            }
                        ]
                    };
                    option && myChart.setOption(option);
                <\/script>
            </body>`
    };
  },
  mounted() {
    this.getList();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    getList() {
      // 获取script标签内的内容
      const reg = /<script[^>]*>([^<]|<(?!\/script))*<\/script>/gmi;
      const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/;
      const res = this.templateHtml.match(reg);

      // 如果具有script标签
      if (res != null) {
        res.forEach(ele => {
          if (ele.match(srcReg)) { // 脚本标签
            const script = document.createElement("script");
            script.src = ele.match(srcReg)[1];
            this.$refs.htmlDiv.append(script);
          } else {
            const startIndex = ele.indexOf(">");
            const endIndex = ele.lastIndexOf("<");
            ele = ele.slice(startIndex + 1, endIndex);
            this.timer = setTimeout(() => {
              const script = document.createElement("script");
              script.innerHTML = ele;
              this.$refs.htmlDiv.append(script);
            }, 1000);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.numStyle {
  font-size: 22px;
  font-weight: 700;
  margin: 5px 0 10px;
}
</style>