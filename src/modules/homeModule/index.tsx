import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import ChannelSelectDropDown from "@/component/molecules/channelSelectDropdown";
import HomeTabs from "./homeTabs";
import SearchComponent from "@/component/molecules/searchComponent";
import HomeTable from "./homeTable";
import { ITabList } from "@/interfaces/home.interface";
import { IStoreListRoutes } from "@/constants/allRoutes";

const cardsList: IBaseCardProps[] = [
  {
    text: "oreders awaiting pick",
    count: 10,
    color: "red",
    path: IStoreListRoutes.AWAITING_PICK,
  },
  {
    text: "waves in progress",
    count: 10,
    color: "warning",
    path: "/",
  },
  {
    text: "completed waves",
    count: 10,
    color: "success",
    path: "/",
  },
];

const HomeModule = () => {
  const [currValue, setCurrValue] = useState<string>("");
  const [currTabValue, setCurrTabValue] = useState<ITabList>(
    ITabList.FULFILMENTS
  );

  return (
    <Grid container spacing={2} padding={"0 1rem"}>
      <Grid sm={12} md={12} mt={3} item style={{ padding: 0 }}>
        <Grid container spacing={2} mt={1}>
          {cardsList.map((item, index) => {
            return (
              <Grid key={index} item md={4}>
                <Cards {...item} variant="sm" />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid sm={12} md={12} mt={3} item style={{ padding: 0 }}>
        <Grid container spacing={2} mt={1}>
          <Grid sm={12} md={10} item>
            <HomeTabs {...{ currTabValue, setCurrTabValue }} />
          </Grid>
          <Grid sm={12} md={2} item textAlign="right">
            {currTabValue !== ITabList.FULFILMENTS ? (
              <Button variant="contained">Create Wave</Button>
            ) : null}
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
            <HomeTable {...{ currTabValue }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeModule;
