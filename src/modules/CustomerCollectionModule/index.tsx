import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import CustomSelect from "@/component/atoms/customSelect";
import Loader from "@/component/molecules/Loader";
import SearchComponent from "@/component/molecules/searchComponent/SearchComponent";
import {
  fetchManifestDetails,
  getChannels,
} from "@/services/thunks/carrierCollectionsApis";
import { fetchCourierData } from "@/services/thunks/packApis";
import { useAppDispatch } from "@/store/hooks";
import FeaturedTable from "@/tables/featuredTable";
import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./customerCollection.module.scss";
import GenerateOtpModal from "./otpGenerationModal";
import { getStoreIdFromCookie } from "@/utils/cookies";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
  reportid: string;
  // orderRef: string;
}
interface Filters {
  [key: string]: string;
}

const CustomerCollecionModule = () => {
  const customerCollectionsColumns: GridColDef[] = [
    { field: "orderId", headerName: "Order Id", width: 110, align: "left" },
    { field: "customer", headerName: "Customer", width: 110, align: "left" },
    {
      field: "awb",
      headerName: "AWB Number",
      // type: "number",
      width: 140,
      align: "left",
    },
    {
      field: "consignmentStatus",
      headerName: "Consignment Status",
      // type: "number",
      width: 260,
      align: "left",
    },
    {
      field: "orderType",
      headerName: "Order Type",
      // type: "number",
      width: 100,
      align: "left",
    },
    {
      field: "deliveryType",
      headerName: "Delivery Type",
      // type: "number",
      width: 110,
      align: "left",
    },
    // {
    //   field: "carrier",
    //   headerName: "Carrier",
    //   // type: "number",
    //   width: 130,
    //   align: "left",
    // },
    {
      field: "shipmentNumber",
      headerName: "Consignment Id",
      // type: "number",
      width: 220,
      align: "left",
      renderCell: (params) => (
        <Typography
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
            // fontSize: "13px",
            alignSelf: "center",
            display: "inline-block",
            textAlign: "center",
          }}
          onClick={() => handleShipment(params.row.shipmentNumber)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "Invoice",
      headerName: "Invoice",
      width: 80,

      renderCell: (params) => (
        <>
          {params.row.awb.toLowerCase() !== "not generated" ? (
            <DownloadIcon
              color="primary"
              style={{
                marginLeft: "1rem",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleDownloadPDF(params.row.shipmentNumber)}
            >
              Download
            </DownloadIcon>
          ) : null}
        </>
      ),
    },
    // {
    //   field: "reportid",
    //   headerName: "Report Id",
    //   // type: "number",
    //   width: 130,
    //   align: "left",
    // },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // const [selectedCourier, setSelectedCourier] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [tableKey, setTableKey] = useState(0);

  // const [courierPartnerDropDown, setCourierPartnerDropDown] = useState<any>([]);
  const [channelsDropDown, setChannelsDropDown] = useState<any>([]);

  const dispatch = useAppDispatch();

  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: ManifestColumnItem[];
  }>({
    columns: customerCollectionsColumns,
    rows: [],
  });
  const [selectedConsigmentId, setSelectedConsigmentId] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const cardsList: IBaseCardProps[] = [
    {
      text: "PENDING PICKUP",
      count: 10,
      color: "warning",
      path: "",
    },
  ];
  const locationId = getStoreIdFromCookie();

  const handleDownloadPDF = async (shipmentNo: string) => {
    const url = "GetInvoice";
    const config: any = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/PDF/${url}?shipmentno=${shipmentNo}`,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...",
      },
      responseType: "blob",
    };
    setLoading(true);

    axios(config)
      .then((response: any) => {
        console.log("response pdf", response);

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const fileName = "Invoice";
        a.download = `${fileName}_${shipmentNo}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log("response error pdf", error);

        if (error.response?.status === 400) {
          if (error.response.data instanceof Blob) {
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const errorMessage = JSON.parse(
                    reader.result as string
                  ).message;
                  resolve(Promise.reject(error));
                  toast.error(`Failed to fetch PDF: ${errorMessage}`);
                } catch (error) {
                  toast.error("Failed to fetch PDF: Unknown error");
                }
              };
              reader.readAsText(error.response.data);
            })
              .then((err) => {
                console.log("err", err);
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        } else {
          toast.error(`Failed to fetch PDF:`);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    // const fetchCourierForDropDown = async () => {
    //   if (locationId) {
    //     setLoading(true);
    //     try {
    //       const resultAction = await dispatch(fetchCourierData());
    //       const data = unwrapResult(resultAction);
    //       setCourierPartnerDropDown(data);
    //     } catch (error) {
    //       console.error("Failed to fetch status counts: ", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    // };
    const fetchChannelsForDropDown = async () => {
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

    // fetchCourierForDropDown();
    fetchChannelsForDropDown();
  }, [dispatch]);
  const fetchData = async (filters: Filters = {}) => {
    try {
      const isPayPickUp = "1";
      setLoading(true);
      if (locationId) filters.locationId = locationId.toString();
      if (isPayPickUp) filters.isPayPickup = isPayPickUp;

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
          reportid: item.reportId,
        })
      );
      setTableState((prevTableState) => ({ ...prevTableState, rows }));
    } catch (error) {
      console.error("Failed to fetch manifest details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchDataWithFilters = async () => {
      const filters: { [key: string]: string } = {};

      if (selectedChannel) filters.channel = selectedChannel;
      // if (selectedCourier) filters.courier = selectedCourier;
      await fetchData(filters);
    };
    if (selectedChannel) {
      fetchDataWithFilters();
    } else if (!searchTerm) {
      fetchData();
    }
  }, [dispatch, selectedChannel, searchTerm]);

  // const handleCourierOnChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setSelectedCourier(e.target.value as string);
  // };
  const handleChannelOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedChannel(e.target.value as string);
  };

  const handleShipment = (shipmentId: any) => {
    console.log("shipmentId", shipmentId);
    setSelectedConsigmentId(shipmentId);
    setOpenModal(true);
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) {
      toast.error("Order, Invoice, AWB number is required");
      return;
    }
    setLoading(true);
    try {
      const filters: { [key: string]: string } = {};
      const isPayPickUp = "1";

      if (locationId) filters.locationId = locationId.toString();
      if (isPayPickUp) filters.isPayPickup = isPayPickUp;

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
            reportid: item.reportId,
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

  const handleSuccess = async () => {
    await fetchData();

    setSelectedConsigmentId([]);
    setTableKey((prevKey) => prevKey + 1);
  };

  // const courierDropDownData = courierPartnerDropDown?.map((courier: any) => {
  //   return {
  //     label: courier.courierName,
  //     value: courier.courierName,
  //   };
  // });
  const channelDropDownData = channelsDropDown?.map((courier: any) => {
    return {
      label: courier.channelName,
      value: courier.channelName,
    };
  });

  return (
    <>
      {loading ? <Loader size={50} color="primary" overlay={true} /> : null}
      <Box className={styles.customerCollectionWrapper}>
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
                <Typography fontWeight={600}>Customer Collections</Typography>
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
              </Box>
            </Grid>
            {/* <Grid item sx={{ marginLeft: "auto" }} md={2.5}>
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
            </Grid> */}
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
                key: tableKey,
                rows: tableState.rows,
                columns: tableState.columns,
              }}
            />
          </Box>
          {openModal ? (
            <GenerateOtpModal
              {...{ openModal, setOpenModal }}
              selectedConsigmentId={selectedConsigmentId}
              onSuccess={handleSuccess}
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default CustomerCollecionModule;
