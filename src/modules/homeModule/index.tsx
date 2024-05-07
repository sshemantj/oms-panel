import React, { useState } from "react";
import { Grid } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import ChannelSelectDropDown from "@/component/molecules/channelSelectDropdown";
import HomeTabs from "./homeTabs";
import SearchComponent from "@/component/molecules/searchComponent";
import HomeTable from "./homeTable";

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
  const [currValue, setCurrValue] = useState<string>("");

  return (
    <Grid container spacing={2} padding={"0 1rem"}>
      <Grid sm={12} md={12} mt={3} item style={{ padding: 0 }}>
        <Grid container spacing={2} mt={1}>
          {cardsList.map(({ text, count, color }) => {
            return (
              <Grid item md={4}>
                <Cards {...{ count, text, color }} variant="sm" />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid sm={12} md={12} mt={3} item style={{ padding: 0 }}>
        <Grid container spacing={2} mt={1}>
          <Grid sm={12} md={12} item>
            <HomeTabs />
          </Grid>
          <Grid container mt={2}>
            <Grid sm={12} md={10} pl={"1rem"} item>
              <SearchComponent label="Fulfilment Ref..." />
            </Grid>
            <Grid
              style={{ marginLeft: "auto", padding: "0" }}
              item
              sm={12}
              md={2}
            >
              <ChannelSelectDropDown
                {...{
                  currValue,
                  setCurrValue,
                }}
              />
            </Grid>
          </Grid>
          <Grid sm={12} md={12} item>
            <HomeTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeModule;
