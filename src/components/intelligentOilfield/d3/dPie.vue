<template>
  <div class="column signStyle" />
</template>
<script>
import * as d3 from "d3";

export default {
  name: "Dpie",
  props: {
    id: String,
    dataset: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      line: ""
    };
  },
  mounted() {
    this.getScales();
  },
  methods: {
    getScales() {
      const width = this.width ? this.width : 500;
      const height = this.width ? this.width : 500;
      // 处理数据
      const dataset = this.dataset;
      const pie = d3.pie();
      const piedata = pie(dataset);
      const svg = d3.select(".column")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      // 外半径
      const outerRadius = 150;
      // 内半径，为0则中间没有空白
      const innerRadius = 30;
      const arc = d3.arc() // 弧生成器
        .innerRadius(innerRadius) // 设置内半径
        .outerRadius(outerRadius); // 设置外半径
      // 颜色比例尺
      const color = ["var(--chart1)", "var(--chart2)", "var(--chart3)", "var(--chart4)", "var(--chart5)", "var(--chart6)", "var(--chart7)", "var(--chart8)", "var(--chart9)", "var(--chart10)"];
      const arcs = svg.selectAll("g")
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);
      arcs.append("path")
        .attr("fill", (d, i) => color[i] ? color[i] : "#FFFFFF")
        .attr("d", d => arc(d));
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data);
    }
  }
};
</script>
<style scoped>
.signStyle {
  background-image: var(--logo-bg) !important;
  background-size: unset !important;
  background-repeat: no-repeat !important;
  background-position: right top !important;
}
</style>