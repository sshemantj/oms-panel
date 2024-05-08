import React from "react";
import { IListRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import AwaitingPick from "./awaitingPick";
import { Box } from "@mui/material";

const SubRoutesModule = () => {
  const router = useRouter();
  const subRoute = "/" + router.query.storeSubRoute;

  return (
    <Box width={"100%"} mt={2}>
      {subRoute === IListRoutes.AWAITING_PICK ? <AwaitingPick /> : null}
    </Box>
  );
};

export default SubRoutesModule;
