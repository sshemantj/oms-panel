import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { pickScreenColumns, pickScreenRows } from "@/constants/tableConstant";
import { Box, Button, Grid, Typography } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import SearchComponent from "@/component/molecules/searchComponent";
import CustomSelect from "@/component/atoms/customSelect";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const data = [
  { label: "SHIPDELIGHT", value: "SHIPDELIGHT" },
  { label: "ECOM EXPRESS", value: "ECOM EXPRESS" },
  { label: "BLOWHORN", value: "BLOWHORN" },
  { label: "BLUEDART", value: "BLUEDART" },
  { label: "DELHIVERY", value: "DELHIVERY" },
  { label: "DUNZO", value: "DUNZO" },
  { label: "XPRESSBEES", value: "XPRESSBEES" },
  { label: "DEFAULT CARRIER", value: "DEFAULT CARRIER" },
];

const CarrierCollectionModule = () => {
  const [tableState, setTableState] = useState({
    columns: pickScreenColumns,
    rows: pickScreenRows,
  });
  const [value, setValue] = useState<number | null>(0);

  const cardsList: IBaseCardProps[] = [
    {
      text: "PENDING PICKUP",
      count: 10,
      color: "warning",
      path: "",
    },
  ];

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  return (
    <Box sx={{ width: "100%", marginTop: "1rem", padding: "0" }}>
      <Box sx={{ ...flex, justifyContent: "space-between" }}>
        <Box sx={{ ...flex, width: "100%", justifyContent: "space-between" }}>
          <Box sx={{ ...flex, gap: "0.5rem" }}>
            <Typography fontWeight={600}>Carrier Collections</Typography>
          </Box>
        </Box>
      </Box>
      <Grid container mt={2}>
        {cardsList.map((item, index) => {
          return (
            <Grid key={index} item md={4}>
              <Cards {...item} variant="sm" />
            </Grid>
          );
        })}
      </Grid>
      <Grid container mt={2}>
        <Grid item sx={{ marginRight: "auto" }} md={3}>
          <SearchComponent label="Order Ref..." />
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }} md={2}>
          <CustomSelect
            {...{
              data,
              handleOnChange,
              label: "Filter",
              selectWrapperStyle: {
                marginLeft: "auto",
              },
              selectSx: {
                width: "210px",
                "& .MuiSelect-outlined": {
                  padding: "6px",
                },
                "& .MuiInputLabel-shrink": {
                  top: "0px",
                },
                "& label": {
                  top: "-10px",
                },
                "& .Mui-focused": {
                  top: "0",
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained">GENERATE MANIFEST</Button>
      </Box>
      <Box mt={2}>
        <FeaturedTable
          {...{ rows: tableState.rows, columns: tableState.columns }}
        />
      </Box>
    </Box>
  );
};

export default CarrierCollectionModule;
