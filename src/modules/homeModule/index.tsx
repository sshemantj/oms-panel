import { Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import cloudSvg from "@/images/cloud.svg";

const HomeModule = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid sm={12} md={12} item width="100%">
        <Image
          style={{
            margin: "3.5rem 0 0 0",
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
          src={cloudSvg}
          alt="cloud"
        />
      </Grid>
    </Grid>
  );
};

export default HomeModule;
