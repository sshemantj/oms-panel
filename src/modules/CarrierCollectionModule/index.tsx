import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import {
  carrierBookingColumns,
  carrierBookingRows,
  carrierCollectionsColumns,
  carrierCollectionsRows,
  pickScreenColumns,
  pickScreenRows,
} from "@/constants/tableConstant";
import { Box, Button, Grid, Typography } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import SearchComponent from "@/component/molecules/searchComponent";
import CustomSelect from "@/component/atoms/customSelect";
import ManifestModal from "./manifestModal";
import styles from "./carrierCollection.module.scss";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const flexNoJustify = {
  display: "flex",
  alignContent: "center",
  gap: "4px",
};

const data = [
  { label: "SHIPDELIGHT", value: "SHIPDELIGHT" },
  { label: "ECOM EXPRESS", value: "ECOM EXPRESS" },
  { label: "BLOWHORN", value: "BLOWHORN" },
  { label: "BLUEDART", value: "BLUEDART" },
  { label: "DELHIVERY", value: "DELHIVERY" },
  { label: "DUNZO", value: "DUNZO" },
  { label: "XPRESSBEES", value: "XPRESSBEES" },
  { label: "DEFAULT CARRIER", value: "DEFAULT CARRIER" },
];

const CarrierCollectionModule = () => {
  const [tableState, setTableState] = useState({
    columns: carrierCollectionsColumns,
    rows: carrierCollectionsRows,
  });
  const [value, setValue] = useState<number | null>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardsList: IBaseCardProps[] = [
    {
      text: "PENDING PICKUP",
      count: 10,
      color: "warning",
      path: "",
    },
  ];

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const handleGenerateManifest = () => {
    setOpenModal(true);
  };

  return (
    <Box className={styles.carrierCollectionWrapper}>
      <Box
        sx={{
          width: "100%",
          marginTop: "1rem",
          padding: "0 1rem 1rem 1rem",
          background: "#fff",
        }}
      >
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
        <Grid container mt={2}>
          <Grid item sx={{ marginRight: "auto" }} md={3}>
            <SearchComponent label="Order Ref..." />
          </Grid>
          <Grid item sx={{ marginLeft: "auto" }} md={2}>
            <CustomSelect
              {...{
                data,
                handleOnChange,
                label: "Filter",
                selectWrapperStyle: {
                  marginLeft: "auto",
                },
                selectSx: {
                  width: "210px",
                  "& .MuiSelect-outlined": {
                    padding: "6px",
                  },
                  "& .MuiInputLabel-shrink": {
                    top: "0px",
                  },
                  "& label": {
                    top: "-10px",
                  },
                  "& .Mui-focused": {
                    top: "0",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button onClick={() => handleGenerateManifest()} variant="contained">
            GENERATE MANIFEST
          </Button>
        </Box>
        <Box mt={2}>
          <FeaturedTable
            {...{
              rows: tableState.rows,
              columns: tableState.columns,
              checkboxSelection: true,
            }}
          />
        </Box>
        <ManifestModal {...{ openModal, setOpenModal }} />
      </Box>
      <Box sx={{ marginTop: "1rem", padding: "1rem", background: "#fff" }}>
        <Box>
          <Typography fontWeight={600} mb={3} variant="h5">
            Proof Of Delivery
          </Typography>
          <Box
            sx={{
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              padding: "1rem 0",
              ...flexNoJustify,
              gap: "2rem",
            }}
          >
            <Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Carrier:
                </Typography>
                <Typography variant="subtitle1">XPRESSBEES</Typography>
              </Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Vehical Number:
                </Typography>
                <Typography variant="subtitle1">MH-04-BZ-123</Typography>
              </Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Transport Associate:
                </Typography>
                <Typography variant="subtitle1">
                  Sachin (Mobile - 9866878668)
                </Typography>
              </Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Packages:
                </Typography>
                <Typography variant="subtitle1">2</Typography>
              </Box>
            </Box>
            <Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Date:
                </Typography>
                <Typography variant="subtitle1">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Handover Stage:
                </Typography>
                <Typography variant="subtitle1">FORWARD</Typography>
              </Box>
              <Box sx={flexNoJustify}>
                <Typography fontWeight={600} variant="subtitle1">
                  Report Id:
                </Typography>
                <Typography variant="subtitle1">{483748378437}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarrierCollectionModule;
