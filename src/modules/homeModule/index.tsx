import React from "react";
import { Grid } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";

const cardsList: IBaseCardProps[] = [
  {
    text: "oreders awaiting pick",
    count: 10,
    color: "warning",
  },
  {
    text: "waves in progress",
    count: 10,
    color: "red",
  },
  {
    text: "completed waves",
    count: 10,
    color: "warning",
  },
];

const HomeModule = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid sm={12} md={12} item width="100%" style={{ padding: 0 }}>
        <Grid container spacing={2} p={2} mt={1} width="100%">
          {cardsList.map(({ text, count, color }) => {
            return (
              <Grid item md={4}>
                <Cards {...{ count, text, color }} variant="sm" />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {/* <h1>home</h1> */}
    </Grid>
  );
};

export default HomeModule;
