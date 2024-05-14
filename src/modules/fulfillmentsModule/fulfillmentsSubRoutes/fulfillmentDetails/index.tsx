import { Box, Grid } from "@mui/material";
import React from "react";
import FulfillmentSection from "./fulfillmentSection";
import FulfillmentTable from "./fulfillmentsTable";

const fullfillmentObj = {
  id: 545341,
  ref: "977778-778h-898_mjvg",
  "Fulfillment status": "AWAITING_WAVE",
  "Order Status": "PICK_PACK",
  deliveryType: "STANDARD",
  "createdOn local date": "13/5/2024",
  "expiryTime local date": "26/5/2024",
  type: "HD_PFS",
  DeliveryStatus: "-",
  InvoiceNumber: "-",
  SoNumber: "-",
};

const fromLocationObj = {
  street: "GSYED AMIR ALI AVENUE KOLKATA EAST",
  city: "KOLKATA",
  state: "West Bangal",
  postcode: "700017",
  country: "India",
};
const toLocationObj = {
  street: "Flat101, signature apartment, behind shine hospital, Sri hari nagar",
  city: "Nellore",
  state: "AP",
  postcode: "524002",
  country: "India",
};

const FulfillmentDetails = () => {
  return (
    <Grid container spacing={2}>
      <Grid sm={12} item>
        <FulfillmentSection
          {...{
            title: "FULFILLMENT DETAILS",
            listObj: fullfillmentObj,
            keyColumn: 3,
            valueColumn: 3,
          }}
        />
      </Grid>
      <Grid sm={12} item>
        <Grid container spacing={2}>
          <Grid sm={6} item>
            <FulfillmentSection
              {...{
                title: "FROM LOCATION",
                listObj: fromLocationObj,
                keyColumn: 4,
                valueColumn: 8,
              }}
            />
          </Grid>
          <Grid sm={6} item>
            <FulfillmentSection
              {...{
                title: "TO LOCATION",
                listObj: toLocationObj,
                keyColumn: 4,
                valueColumn: 8,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} item>
        <FulfillmentTable />
      </Grid>
    </Grid>
  );
};

export default FulfillmentDetails;
