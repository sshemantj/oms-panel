import React from "react";
import { IListRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import AwaitingPick from "./awaitingPick";
import { Box } from "@mui/material";
import WavesInProgress from "./wavesInProgress";
import PickScreen from "./pick";
import PackScreen from "./pack";
import CarrierBooking from "./carrierBooking";

const SubRoutesModule = () => {
  const router = useRouter();
  const subRoute = "/" + router.query.storeSubRoute;

  return (
    <Box width={"100%"} mt={2}>
      {subRoute === IListRoutes.AWAITING_PICK ? <AwaitingPick /> : null}
      {subRoute === IListRoutes.WAVES_IN_PROGRESS ? <WavesInProgress /> : null}
      {subRoute === IListRoutes.PICK ? <PickScreen /> : null}
      {subRoute === IListRoutes.PACK ? <PackScreen /> : null}
      {subRoute === IListRoutes.CARRIER_BOOKING ? <CarrierBooking /> : null}
    </Box>
  );
};

export default SubRoutesModule;
