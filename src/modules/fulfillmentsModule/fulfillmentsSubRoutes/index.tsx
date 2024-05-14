import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { IFulfillmentsRoutes } from "@/constants/allRoutes";
import FulfillmentDetails from "./fulfillmentDetails";

const FulfillmentSubRoutesModule = () => {
  const router = useRouter();
  const subRoute = "/" + router.query.fulfillmentId;

  return (
    <Box width={"100%"} mt={2}>
      {subRoute === IFulfillmentsRoutes.FULFILLMENTS_DETAILS ? (
        <FulfillmentDetails />
      ) : null}
    </Box>
  );
};

export default FulfillmentSubRoutesModule;
