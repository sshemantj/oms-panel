import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import ChannelSelectDropDown from "@/component/molecules/channelSelectDropdown";
import HomeTabs from "./homeTabs";
import SearchComponent from "@/component/molecules/searchComponent";
import HomeTable from "./homeTable";
import {
  IAllTableIdsList,
  IAllTableState,
  ITabList,
} from "@/interfaces/home.interface";
import { IStoreListRoutes } from "@/constants/allRoutes";
import {
  initialAllTableIdsList,
  initialAllTableState,
} from "@/constants/tableConstant";
import { useMobileCheck } from "@/hooks/useMobileCheck";

const cardsList: IBaseCardProps[] = [
  {
    text: "order awaiting pick",
    count: 10,
    color: "red",
    path: IStoreListRoutes.AWAITING_PICK,
  },
  {
    text: "waves in progress",
    count: 10,
    color: "warning",
    path: IStoreListRoutes.WAVES_IN_PROGRESS,
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
  const isMobile = useMobileCheck();

  const [allSelectedRowList, setAllSelectedRowList] =
    useState<IAllTableIdsList>(
      JSON.parse(JSON.stringify(initialAllTableIdsList))
    );

  const [tableState, setTableState] = useState<IAllTableState>(
    JSON.parse(JSON.stringify(initialAllTableState))
  );

  const [currTabValue, setCurrTabValue] = useState<ITabList>(
    ITabList.FULFILMENTS
  );

  return (
    <Grid container padding={"0 0rem"}>
      <Grid
        sm={12}
        md={12}
        item
        sx={{
          padding: "0 1rem",
          marginTop: "24px",
          "@media(max-width: 768px)": {
            margin: 0,
          },
        }}
      >
        <Grid container spacing={2} mt={1}>
          {cardsList.map((item, index) => {
            return (
              <Grid
                key={index}
                {...{
                  sx: { width: "100%" },
                  item: true,
                  xs: 12,
                  sm: 4,
                  md: 4,
                }}
              >
                <Cards {...item} variant="sm" />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {!isMobile ? (
        <Grid sm={12} md={12} mt={3} item sx={{ padding: "0 1rem" }}>
          <Grid container spacing={2} mt={1}>
            <Grid sm={12} md={10} item>
              <HomeTabs {...{ currTabValue, setCurrTabValue }} />
            </Grid>
            <Grid sm={12} md={2} item textAlign="right">
              {currTabValue !== ITabList.FULFILMENTS &&
              allSelectedRowList[currTabValue].length ? (
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
              <HomeTable
                {...{
                  currTabValue,
                  tableState,
                  setTableState,
                  allSelectedRowList,
                  setAllSelectedRowList,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default HomeModule;
