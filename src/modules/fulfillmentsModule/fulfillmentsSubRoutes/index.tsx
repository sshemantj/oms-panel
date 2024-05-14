import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { IFulfillmentsRoutes } from "@/constants/allRoutes";
import FulfillmentDetails from "./fulfillmentDetails";
import styles from "./fulfillments.module.scss";

const FulfillmentSubRoutesModule = () => {
  const router = useRouter();
  const subRoute = "/" + router.query.fulfillmentId;

  return (
    <Box className={styles.fulfillmentSubRoutes}>
      {subRoute === IFulfillmentsRoutes.FULFILLMENTS_DETAILS ? (
        <FulfillmentDetails />
      ) : null}
    </Box>
  );
};

export default FulfillmentSubRoutesModule;
