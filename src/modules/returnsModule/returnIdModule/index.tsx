import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./return.module.scss";
import ReturnIdSection from "./returnIdSection";
import FeaturedTable from "@/tables/featuredTable";
import {
  returnIdColumn,
  returnIdFirstTableColumn,
  returnIdFirstTableRows,
  returnIdRows,
} from "@/constants/tableConstant";

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

  const [returnOrderFirstTable, setReturnOrderFirstTable] = useState({
    columns: returnIdFirstTableColumn,
    rows: returnIdFirstTableRows,
  });
  const [returnOrderState, setReturnOrderState] = useState({
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
      <Box mt={2} bgcolor="#fff">
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
              rows: returnOrderFirstTable.rows,
              columns: returnOrderFirstTable.columns,
              hideFooter: true,
              tableStyleWrapper: {
                height: "auto",
              },
            }}
          />
        </Box>
      </Box>
      <Box minHeight={400} mt={2} mb={5} bgcolor="#fff">
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
              rows: returnOrderState.rows,
              columns: returnOrderState.columns,
            }}
          />
        </Box>
        <Box textAlign="end">
          <Button
            sx={{ marginRight: "3rem", padding: "4px 10px" }}
            variant="contained"
          >
            Create RMA
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnIdModule;
