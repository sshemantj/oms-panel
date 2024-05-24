import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IProps {
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
  series?: ApexOptions["series"];
  width?: string | number;
  height?: string | number;
  options?: ApexOptions;
}
const Charts = (props: IProps) => {
  const { type, options, series, ...rest } = props;

  return (
    <Chart
      options={options}
      series={series}
      type={type}
      height={"100%"}
      {...rest}
    />
  );
};

export default Charts;
