import React, { useEffect, useState } from "react";
import Charts from "@/component/molecules/charts";
import { Grid, Typography } from "@mui/material";
import ToggleButtons from "@/component/atoms/ToggleButton";
import { getPreviousMonths } from "@/utils/getPreviousMonthsNames";

interface ISeries {
  name: string;
  data: number[];
}

const options: ApexCharts.ApexOptions = {
  chart: {
    stackOnlyBar: true,
  },
  xaxis: {
    categories: ["April", "May"],
  },
  plotOptions: {
    bar: {
      columnWidth: "100px",
    },
  },
};
const series: ISeries[] = [
  {
    name: "series-1",
    data: [30, 40],
  },
];

const btnList = [
  {
    element: (
      <Typography fontSize={12} fontWeight={600} variant="subtitle2">
        Two Months
      </Typography>
    ),
    value: "twoMonths",
  },
  {
    element: (
      <Typography fontSize={12} fontWeight={600} variant="subtitle2">
        Three Months
      </Typography>
    ),
    value: "threeMonths",
  },
];

const ChartDashboard = () => {
  const [currValue, setCurrValue] = useState<string>("twoMonths");
  const [customChartProps, setCustomChartsProps] = useState<{
    options: ApexCharts.ApexOptions;
    series: ISeries[];
  }>({
    options: JSON.parse(JSON.stringify(options)),
    series: JSON.parse(JSON.stringify(series)),
  });

  useEffect(() => {
    const prevMonthObj = {
      twoMonths: 2,
      threeMonths: 3,
    };
    //@ts-ignore
    const prevMonthNum = prevMonthObj[currValue];
    const prevMonthList = getPreviousMonths(prevMonthNum);

    const newOptions: ApexCharts.ApexOptions = {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: prevMonthList,
      },
    };

    const data = new Array(prevMonthNum)
      .fill(null)
      .map(() => Math.floor(Math.random() * 100));

    const newSeries: ISeries[] = [
      {
        name: "series-1",
        data: data,
      },
    ];

    setCustomChartsProps({
      options: newOptions,
      series: newSeries,
    });
  }, [currValue]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={8}>
        <Charts
          height={400}
          width={500}
          options={customChartProps.options}
          series={customChartProps.series}
          type="bar"
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <ToggleButtons {...{ currValue, setCurrValue, btnList }} />
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
