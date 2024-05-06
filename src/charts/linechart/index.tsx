import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Linechart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      stackOnlyBar: true,
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
  ];

  return (
    <Chart options={options} series={series} type="area" height={"100%"} />
  );
};

export default Linechart;
