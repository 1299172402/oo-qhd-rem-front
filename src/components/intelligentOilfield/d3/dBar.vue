<template>
  <div class="d3Chart signStyle" />
</template>
<script>
import * as d3 from "d3";

export default {
  props: {
    id: String,
    labelList: Array,
    dataList: Array,
    width: Number,
    height: Number
  },
  mounted() {
    // 数据——x轴的标签——城市
    const labelList = this.labelList;
    // 数据——对应y轴的值——城市人口（万）
    const dataList = this.dataList;
    // 画布的参数
    const mapWidth = this.width ? this.width : 500;
    const mapHeight = this.height ? this.height : 300;
    const mapPadding = 30;
    // 定义画布—— 宽 300 高 300 外边距 10px
    const map = d3.select(".d3Chart").append("svg").attr("width", mapWidth).attr("height", mapHeight).style("margin", "10px");
    // 定义x轴比例尺（序数段比例尺）
    const scaleX = d3.scaleBand().domain(labelList).range([0, mapWidth - mapPadding * 2]);
    // 定义Y轴比例尺（线性比例尺）——最大值为画布高度-2*画布内边距,最小值为0（0放在第二位，因为y轴正方向是反的）
    const scaleY = d3.scaleLinear().domain([0, d3.max(dataList)]).range([mapHeight - 2 * mapPadding, 0]);
    // 定义x y 轴
    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);
    // 绘制x y 轴
    map.append("g").attr("transform", `translate(${mapPadding},${mapHeight - mapPadding})`).call(axisX);
    map.append("g").attr("transform", `translate(${mapPadding},${mapPadding})`).call(axisY);
    // 矩形间的空白
    const rectMargin = scaleX.bandwidth() / 3;
    // 添加矩形元素
    map.selectAll(".MyRect")
      .data(dataList)
      .enter()
      .append("rect")
      .attr("class", "MyRect")
      .attr("transform", `translate(${mapPadding},${mapPadding})`)
      .attr("x", (d, i) => i * scaleX.bandwidth() + rectMargin / 2)
      // 起始状态是在 y 轴等于 0 的位置（但要注意，不能在起始状态直接返回 0，要应用比例尺计算画布中的位置）
      .attr("y", () => {
        var min = scaleY.domain()[0];
        // 值域的最小值
        return scaleY(min);
      })
      .transition()
      .delay((d, i) => i * 200)
      .duration(2000)
      // 终止状态是目标值
      .attr("y", data => scaleY(data))
      .attr("width", scaleX.bandwidth() - rectMargin)
      .attr("height", data => mapHeight - mapPadding * 2 - scaleY(data))
      // 矩形填充颜色_填充颜色不要写在CSS里
      .attr("fill", "var(--chart1)");
    // 添加文字元素
    map.selectAll(".MyText")
      .data(dataList)
      .enter()
      .append("text")
      .attr("class", "MyText")
      .attr("transform", `translate(${mapPadding},${mapPadding})`)
      .attr("x", (d, i) => i * scaleX.bandwidth() + scaleX.bandwidth() / 2)
      .attr("y", () => {
        var min = scaleY.domain()[0];
        // 值域的最小值
        return scaleY(min);
      })
      .transition()
      .delay((d, i) => i * 200)
      .duration(2000)
      .attr("y", data => scaleY(data))
      // 沿y轴方向偏移量
      .attr("dy", () => -6)
      // 文本对齐方式（相对于文本原点）  start、middle、end或inherit
      .attr("text-anchor", "middle")
      // 文本字体大小
      .attr("font-size", "12px")
      // 文本颜色
      .attr("fill", "var(--chart1)")
      .text(d => d);
  }
};
</script>
 <style scoped>
.signStyle {
  background-image: var(--logo-bg) !important;
  background-size: 100% 100% !important;
}
 </style>