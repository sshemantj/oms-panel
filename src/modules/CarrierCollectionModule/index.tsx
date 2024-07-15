import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import CustomSelect from "@/component/atoms/customSelect";
import Loader from "@/component/molecules/Loader";
import SearchComponent from "@/component/molecules/searchComponent/SearchComponent";
import { carrierCollectionsColumns } from "@/constants/tableConstant";
import {
  fetchManifestDetails,
  getChannels,
} from "@/services/thunks/carrierCollectionsApis";
import { fetchCourierData } from "@/services/thunks/packApis";
import { useAppDispatch } from "@/store/hooks";
import FeaturedTable from "@/tables/featuredTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./carrierCollection.module.scss";
import ManifestModal from "./manifestModal";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

interface ManifestColumnItem {
  orderId: string;
  orderNumber: string;
  customer: string;
  awb: string;
  po: string;
  courier: string;
  consignmentStatus: string;
  orderType: string;
  deliveryType: string | null;
  carrier: string;
  id: number;
  shipmentNumber: string;
  // orderRef: string;
}

const CarrierCollectionModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const [courierPartnerDropDown, setCourierPartnerDropDown] = useState<any>([]);
  const [channelsDropDown, setChannelsDropDown] = useState<any>([]);

  const dispatch = useAppDispatch();

  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: ManifestColumnItem[];
  }>({
    columns: carrierCollectionsColumns,
    rows: [],
  });
  const [selectedTableRows, setSelectedTableRows] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardsList: IBaseCardProps[] = [
    {
      text: "PENDING PICKUP",
      count: 10,
      color: "warning",
      path: "",
    },
  ];

  useEffect(() => {
    const fetchCourierForDropDown = async () => {
      const locationId = 1;
      if (locationId) {
        setLoading(true);
        try {
          const resultAction = await dispatch(fetchCourierData());
          const data = unwrapResult(resultAction);
          setCourierPartnerDropDown(data);
        } catch (error) {
          console.error("Failed to fetch status counts: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    const fetchChannelsForDropDown = async () => {
      const locationId = 1;
      if (locationId) {
        setLoading(true);
        try {
          const resultAction = await dispatch(getChannels());
          const data = unwrapResult(resultAction);
          setChannelsDropDown(data);
        } catch (error) {
          console.error("Failed to fetch status counts: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourierForDropDown();
    fetchChannelsForDropDown();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const locationId = 902;
        const filters: { [key: string]: string } = {};

        if (locationId) filters.locationId = locationId.toString();

        const resultAction = await dispatch(fetchManifestDetails({ filters }));

        const data = unwrapResult(resultAction);
        const rows: ManifestColumnItem[] = data.map(
          (item: any, index: number) => ({
            id: index + 1,
            orderId: item.orderId,
            orderNumber: item.orderNumber,
            customer: item.customer,
            awb: item.awb,
            po: item.po,
            courier: item.courier,
            consignmentStatus: item.consignmentStatus,
            orderType: item.orderType,
            deliveryType: item.deliveryType,
            carrier: item.carrier,
            shipmentNumber: item.shipmentNumber,
          })
        );
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } catch (error) {
        console.error("Failed to fetch pack item details:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataWithFilters = async () => {
      try {
        setLoading(true);

        const filters: { [key: string]: string } = {};

        if (selectedChannel) filters.channel = selectedChannel;
        if (selectedCourier) filters.courier = selectedCourier;

        const locationId = 902;
        if (locationId) filters.locationId = locationId.toString();

        const resultAction = await dispatch(fetchManifestDetails({ filters }));
        const data = unwrapResult(resultAction);
        const rows: ManifestColumnItem[] = data.map(
          (item: any, index: number) => ({
            id: index + 1,
            orderId: item.orderId,
            orderNumber: item.orderNumber,
            customer: item.customer,
            awb: item.awb,
            po: item.po,
            courier: item.courier,
            consignmentStatus: item.consignmentStatus,
            orderType: item.orderType,
            deliveryType: item.deliveryType,
            carrier: item.carrier,
            shipmentNumber: item.shipmentNumber,
          })
        );
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } catch (error) {
        console.error("Failed to fetch pack item details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedChannel || selectedCourier) fetchDataWithFilters();
    if (!searchTerm) fetchData();

    // if (!filters) {
    //   fetchData();
    // }
  }, [dispatch, selectedChannel, selectedCourier, searchTerm]);

  const handleCourierOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedCourier(e.target.value as string);
  };
  const handleChannelOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedChannel(e.target.value as string);
  };

  const handleGenerateManifest = () => {
    setOpenModal(true);
  };

  const onRowSelectionModelChange = (selectedRows: GridRowId[]) => {
    const selectedRowDetails = selectedRows
      .map((rowId) => {
        const row = tableState.rows.find((r) => r.id === rowId);
        return row
          ? {
              orderId: row.orderId,

              shipmentNumber: row.shipmentNumber,
              courier: row.courier,
              orderNumber: row.orderNumber,
              customer: row.customer,
              awb: row.awb,
            }
          : null;
      })
      .filter(Boolean);
    setSelectedTableRows(selectedRowDetails);
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) {
      toast.error("Order, Invoice, AWB number is required");
      return;
    }
    setLoading(true);
    try {
      const locationId = 902;
      const filters: { [key: string]: string } = {};

      if (locationId) filters.locationId = locationId.toString();
      const resultAction = await dispatch(
        fetchManifestDetails({ searchTerm: searchTerm, filters })
      );
      const data = unwrapResult(resultAction);
      if (data && data.length) {
        const rows: ManifestColumnItem[] = data.map(
          (item: any, index: number) => ({
            id: index + 1,
            orderId: item.orderId,
            orderNumber: item.orderNumber,
            customer: item.customer,
            awb: item.awb,
            po: item.po,
            courier: item.courier,
            consignmentStatus: item.consignmentStatus,
            orderType: item.orderType,
            deliveryType: item.deliveryType,
            carrier: item.carrier,
            shipmentNumber: item.shipmentNumber,
          })
        );
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } else {
        toast.error("No data found for the provided Consignment ID");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch consignment item details:");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: any) => {
    if (value) setSearchTerm(value);
    else setSearchTerm("");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const courierDropDownData = courierPartnerDropDown?.map((courier: any) => {
    return {
      label: courier.courierName,
      value: courier.courierName,
    };
  });
  const channelDropDownData = channelsDropDown?.map((courier: any) => {
    return {
      label: courier.channelName,
      value: courier.channelName,
    };
  });

  return (
    <>
      {loading ? <Loader size={50} color="primary" overlay={true} /> : null}
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
            <Box
              sx={{ ...flex, width: "100%", justifyContent: "space-between" }}
            >
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
            <Grid item sx={{ marginRight: "auto" }} md={6}>
              <Box display="flex" gap="1rem">
                <SearchComponent
                  label="search by order , awb, invoice "
                  value={searchTerm}
                  onKeyDown={handleKeyPress}
                  onChange={handleSearch}
                  onSearchSubmit={handleSearchSubmit}
                />
                <Button
                  sx={{
                    visibility: selectedTableRows.length ? "visible" : "hidden",
                  }}
                  onClick={() => handleGenerateManifest()}
                  variant="contained"
                >
                  GENERATE MANIFEST
                </Button>
              </Box>
            </Grid>
            <Grid item sx={{ marginLeft: "auto" }} md={2.5}>
              <CustomSelect
                {...{
                  data: courierDropDownData,
                  handleOnChange: handleCourierOnChange,
                  value: selectedCourier,
                  label: "Courier",
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
            <Grid md={2.2}>
              {" "}
              <CustomSelect
                {...{
                  data: channelDropDownData,
                  handleOnChange: handleChannelOnChange,
                  value: selectedChannel,

                  label: "Channel",
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
            <FeaturedTable
              {...{
                rows: tableState.rows,
                columns: tableState.columns,
                checkboxSelection: true,
                onRowSelectionModelChange,
              }}
            />
          </Box>
          {openModal ? (
            <ManifestModal
              {...{ openModal, setOpenModal }}
              selectedManifestRows={selectedTableRows}
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default CarrierCollectionModule;
