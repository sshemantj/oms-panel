import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IProps {
  options: ApexCharts.ApexOptions;
  series: {
    name: string;
    data: number[];
  }[];
  type?:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}

const Charts = (props: IProps) => {
  const { type, options, series } = props;

  return (
    <Chart options={options} series={series} type={type} height={"100%"} />
  );
};

export default Charts;
