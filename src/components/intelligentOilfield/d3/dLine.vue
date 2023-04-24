<template>
  <div :id="id" class="d3line signStyle" />
</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3line",
  props: {
    id: String,
    width: Number,
    height: Number,
    dataset: Array
  },
  watch: {
    dataset() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      d3.select(`#svg${this.id}`).remove();
      const width = this.width ? this.width : 600;
      const height = this.height ? this.height : 600;
      const padding = {
        left: 80,
        right: 50,
        top: 50,
        bottom: 50
      };
      const colorList = ["var(--chart1)", "var(--chart2)", "var(--chart3)", "var(--chart4)", "var(--chart5)", "var(--chart6)", "var(--chart7)", "var(--chart8)", "var(--chart9)", "var(--chart10)"];
      const colorZ = d3.scaleOrdinal(colorList);
      const parseTime = d3.timeParse("%Y-%m-%d");
      const xScale = d3.scaleTime().range([0, width - padding.left - padding.right]);
      const dates = this.dataset.flatMap(d => d.value.map(v => parseTime(v.key)));
      xScale.domain([d3.min(dates), d3.max(dates)]);
      const yScale = d3.scaleLinear().range([height - padding.top - padding.bottom, 0]);
      yScale.domain([0, d3.max(this.dataset.flatMap(d => d.value.map(v => v.value))) + 2]);
      const xAxis = d3.axisBottom(xScale).tickFormat(d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
      const yAxis = d3.axisLeft(yScale);
      const svg = d3.select(`#${this.id}`).append("svg").attr("width", width).attr("height", height).attr("id", `svg${this.id}`);
      svg.append("g")
        .attr("transform", `translate(${padding.left},${height - padding.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("dx", -20)
        .attr("dy", 10)
        .attr("transform", "rotate(-20)")
        .style("font-weight", "bold");
      svg.append("g")
        .attr("transform", `translate(${padding.left},${padding.top})`)
        .call(yAxis)
        .selectAll("text")
        .style("font-weight", "bold");
      const line = d3.line().x(d => xScale(parseTime(d.key))).y(d => yScale(d.value));
      this.dataset.forEach((v, vi) => {
        let tpX = 0;
        let tpY = 0;
        svg.append("path")
          .attr("d", line(v.value))
          .attr("transform", `translate(${padding.left},${padding.top})`)
          .attr("fill", "none")
          .attr("stroke", () => colorZ(vi))
          .attr("stroke-width", 2)
          .transition()
          .duration(2000)
          .ease(d3.easePolyOut)
          .delay((d, i) => i * 200)
          .style("stroke-dashoffset", 0);
        svg.selectAll("circle1")
          .data(v.value)
          .enter()
          .append("circle")
          .attr("cx", (d, i) => {
            const x = xScale(parseTime(d.key));
            if (i === v.value.length - 1) tpX = x - 40;
            return x;
          })
          .attr("cy", (d, i) => {
            const y = yScale(d.value);
            if (i === v.value.length - 1) tpY = y - 10;
            return y;
          })
          .attr("r", 2)
          .attr("transform", `translate(${padding.left},${padding.top})`)
          .style("fill", () => colorZ(vi))
          .on("mouseover", d => {
            const g = svg.append("g")
              .attr("id", `hoverg${vi}${d.key}${d.value}`)
              .attr("transform", `translate(${xScale(parseTime(d.key)) - 20},${yScale(d.value) + 30})`);
            g.append("rect")
              .attr("width", 110)
              .attr("height", 25)
              .style("fill", "#fffbf0");
            g.append("text")
              .text(`${d.key}:${d.value}`)
              .style("fill", colorZ(vi));
          })
          .on("mouseout", d => d3.select(`#hoverg${vi}${d.key}${d.value}`).remove())
          .transition()
          .duration(1500)
          .ease(d3.easePolyIn)
          .delay((d, i) => i * 200)
          .attr("r", 5);
        svg.append("text")
          .attr("dx", tpX)
          .attr("dy", tpY)
          .attr("transform", `translate(${padding.left},${padding.top})`)
          .text(v.name)
          .style("fill", colorZ(vi))
          .style("font-weight", "bold");
      });
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