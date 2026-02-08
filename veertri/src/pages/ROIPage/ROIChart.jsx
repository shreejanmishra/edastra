import { useEffect, useRef, useCallback, memo } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";

/**
 * D3-based bar chart component for ROI data visualization
 */
const ROIChart = memo(({ graphData }) => {
  const d3Container = useRef(null);

  const drawChart = useCallback(() => {
    if (!d3Container.current || graphData.length === 0) return;

    // Clear previous chart
    select(d3Container.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 80, left: 40 };

    // Calculate width based on data points
    const minWidthPerPoint = 100;
    const calculatedWidth = Math.max(
      d3Container.current.clientWidth,
      graphData.length * minWidthPerPoint + margin.left + margin.right,
    );

    const width = calculatedWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    const x0 = scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(graphData.map((d) => d.date));

    const x1 = scaleBand()
      .padding(0.4)
      .domain(["users"])
      .rangeRound([0, x0.bandwidth()]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x0))
      .selectAll("text")
      .style("fill", "#888")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y Axis
    const y = scaleLinear()
      .domain([0, max(graphData, (d) => d.users) * 1.1])
      .nice()
      .rangeRound([height, 0]);

    svg
      .append("g")
      .call(axisLeft(y).ticks(null, "s"))
      .selectAll("text")
      .style("fill", "#888");

    // Grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .call(axisLeft(y).tickSize(-width).tickFormat(""))
      .style("stroke-opacity", 0.1)
      .style("stroke", "#fff");

    const color = scaleOrdinal().range(["#FAD502", "#82ca9d"]);

    // Bars
    svg
      .append("g")
      .selectAll("g")
      .data(graphData)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.date)},0)`)
      .selectAll("rect")
      .data((d) => [{ key: "users", value: d.users, date: d.date }])
      .join("rect")
      .attr("x", (d) => x1(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key))
      .append("title")
      .text(
        (d) => `${d.key === "users" ? "New Users" : "Feedback"}: ${d.value}`,
      );

    // Week Labels
    svg
      .append("g")
      .selectAll("text")
      .data(graphData)
      .join("text")
      .attr("x", (d) => x0(d.date) + x0.bandwidth() / 2)
      .attr("y", (d) => y(d.users) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#ccc")
      .text((d, i) => `Week ${i + 1}`);

    // Legend
    const legend = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(["New Users"])
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend
      .append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", (d, i) => ["#FAD502", "#82ca9d"][i]);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("fill", "#ccc")
      .text((d) => d);
  }, [graphData]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  return (
    <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-sm mb-10">
      <h2 className="text-xl font-semibold mb-6">
        User Activity & Feedback Trends
      </h2>
      <div className="w-full overflow-x-auto" ref={d3Container}></div>
    </div>
  );
});

export default ROIChart;
