import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { pickScreenColumns, pickScreenRows } from "@/constants/tableConstant";
import { Box, Button, Grid, Typography } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CarrierCollectionModule = () => {
  const [tableState, setTableState] = useState({
    columns: pickScreenColumns,
    rows: pickScreenRows,
  });

  const cardsList: IBaseCardProps[] = [
    {
      text: "PENDING PICKUP",
      count: 10,
      color: "warning",
      path: "",
    },
  ];

  return (
    <Box sx={{ width: "100%", marginTop: "1rem", padding: "0 1rem" }}>
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
      {/* <Box mt={2}>
        <FeaturedTable
          {...{ rows: tableState.rows, columns: tableState.columns }}
        />
      </Box> */}
    </Box>
  );
};

export default CarrierCollectionModule;
