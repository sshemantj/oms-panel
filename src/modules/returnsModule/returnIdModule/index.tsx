import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./return.module.scss";
import ReturnIdSection from "./returnIdSection";
import FeaturedTable from "@/tables/featuredTable";
import { returnIdColumn, returnIdRows } from "@/constants/tableConstant";

const returnIdObj = {
  returnOrderType: "DEFAULT",
  returnOrderStatus: "RETURN_PROCESSING",
  "related Order": "MAC_1021322",
  "RMA Number": "323239289",
  createdOn: new Date().toLocaleDateString(),
  updatedOn: new Date().toLocaleDateString(),
};

const fromLocationObj = {
  lodgedLocation: 901,
  phone: "8998889922",
  Address:
    "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  latitude: "70.343230017",
  longitude: "78.323393439",
  TimeZone: "India/Mumbai",
};

const ReturnIdModule = () => {
  const router = useRouter();
  const subRoute = "/" + router.query.returnId;

  const [tableState, setTableState] = useState({
    columns: returnIdColumn,
    rows: returnIdRows,
  });

  return (
    <Box className={styles.returnWrapper}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ReturnIdSection
            {...{
              listObj: returnIdObj,
              keyColumn: 3,
              valueColumn: 4,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReturnIdSection
            {...{
              title: "ADDRESSES",
              listObj: fromLocationObj,
              keyColumn: 3,
              valueColumn: 9,
            }}
          />
        </Grid>
      </Grid>
      <Box minHeight={400} mt={2} bgcolor="#fff">
        <Box padding="16px" borderBottom="1px solid lightgrey">
          <Typography fontWeight={400} variant="h6">
            RETURN ORDER ITEMS
          </Typography>
        </Box>
        <Box
          sx={{
            [`& > div .MuiDataGrid-cell, & > div div`]: {
              border: "none",
            },
          }}
          padding="0 6px"
        >
          <FeaturedTable
            {...{
              rows: tableState.rows,
              columns: tableState.columns,
              showCellVerticalBorder: false,
              showColumnVerticalBorder: false,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnIdModule;
