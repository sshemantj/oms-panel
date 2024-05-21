import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const ReturnIdModule = () => {
  const router = useRouter();

  const subRoute = "/" + router.query.returnId;

  return <Box padding={"1rem"}></Box>;
};

export default ReturnIdModule;
