import React, { useEffect, useState } from "react";
import Charts from "@/component/molecules/charts";
import { Grid } from "@mui/material";
import { getPreviousMonths } from "@/utils/getPreviousMonthsNames";

interface ISeries {
  name: string;
  data: number[];
}
interface IProps {
  currValue: string;
  setCurrValue: React.Dispatch<React.SetStateAction<string>>;
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

const ChartDashboard = (props: IProps) => {
  const { currValue, setCurrValue } = props;
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
      <Grid item xs={12} md={12} order={{ xs: 2, md: 1 }}>
        <Charts
          height={400}
          options={customChartProps.options}
          series={customChartProps.series}
          type="bar"
        />
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
