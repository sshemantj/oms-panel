import React from "react";
import Charts from "@/component/molecules/charts";
import { Box } from "@mui/material";

interface IProps {}

const options: ApexCharts.ApexOptions = {
  chart: {
    stackOnlyBar: true,
  },
  xaxis: {
    categories: ["April", "May"],
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40],
  },
];

const ChartDashboard = (props: IProps) => {
  const {} = props;
  return <Charts options={options} series={series} type="bar" />;
};

export default ChartDashboard;
