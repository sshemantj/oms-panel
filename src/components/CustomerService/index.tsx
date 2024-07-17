import CustomSelect from "@/component/atoms/customSelect";
import SearchComponent from "@/component/molecules/searchComponent";
import { getChannels } from "@/services/thunks/carrierCollectionsApis";
import { useAppDispatch } from "@/store/hooks";
import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OrderDetailsColumnItem {
  slno: string;
  orderId: string;
  elcaOrderId: string;
  channel: string;
  fulfillmentStore: string;
  consignmentId: string;
  items: string;
  price: string;
  orderStatus: string | null;
  customerName: string;
  customerMobile: number;
  customerEmail: string;
}

interface Filters {
  [key: string]: string;
}
const data: OrderDetailsColumnItem[] = [
  {
    slno: "1",
    orderId: "ORD001",
    elcaOrderId: "ELCA001",
    channel: "Online",
    fulfillmentStore: "Store001",
    consignmentId: "CONS001",
    items: "Item001, Item002",
    price: "1500",
    orderStatus: "Shipped",
    customerName: "Rajesh Kumar",
    customerMobile: 9876543210,
    customerEmail: "rajesh.kumar@example.com",
  },
  {
    slno: "2",
    orderId: "ORD002",
    elcaOrderId: "ELCA002",
    channel: "Retail",
    fulfillmentStore: "Store002",
    consignmentId: "CONS002",
    items: "Item003, Item004",
    price: "2500",
    orderStatus: "Delivered",
    customerName: "Anjali Sharma",
    customerMobile: 9123456780,
    customerEmail: "anjali.sharma@example.com",
  },
  {
    slno: "3",
    orderId: "ORD003",
    elcaOrderId: "ELCA003",
    channel: "Wholesale",
    fulfillmentStore: "Store003",
    consignmentId: "CONS003",
    items: "Item005, Item006",
    price: "3500",
    orderStatus: "Processing",
    customerName: "Vikram Singh",
    customerMobile: 9988776655,
    customerEmail: "vikram.singh@example.com",
  },
];

const CustomerService = () => {
  const orderDetailsColumns: GridColDef[] = [
    { field: "slno", headerName: "Sl no", width: 80, align: "left" },
    {
      field: "orderId",
      headerName: "Order ID",
      width: 110,
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
          // onClick={() => handleOrder(params.row.orderId)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "elcaOrderId",
      headerName: "ELCA Order ID",
      width: 110,
      align: "left",
    },
    {
      field: "channel",
      headerName: "Channel",
      width: 160,
      align: "left",
    },
    {
      field: "fulfillmentStore",
      headerName: "Fulfillment Store",
      width: 100,
      align: "left",
    },
    {
      field: "consigmentId",
      headerName: "Consignment ID",
      width: 110,
      align: "left",
    },
    {
      field: "items",
      headerName: "Items",
      width: 130,
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      width: 220,
      align: "left",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 130,
      align: "left",
    },
    {
      field: "customerMobile",
      headerName: "Customer Mobile",
      width: 130,
      align: "left",
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 130,
      align: "left",
    },
  ];

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [statusDropDown, setStatusDropDown] = useState<any>([]);
  const [channelsDropDown, setChannelsDropDown] = useState<any>([]);

  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: OrderDetailsColumnItem[];
  }>({
    columns: orderDetailsColumns,
    rows: [],
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
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
    fetchChannelsForDropDown();
  }, [dispatch]);

  const fetchData = async (filters: Filters = {}) => {
    try {
      setLoading(true);
      const locationId = 902;
      // if (locationId) filters.locationId = locationId.toString();

      // const resultAction = await dispatch(fetchManifestDetails({ filters }));
      // const data = unwrapResult(resultAction);
      const rows: OrderDetailsColumnItem[] = data.map(
        (item: any, index: number) => ({
          slno: index + 1,
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
      if (selectedCourier) filters.courier = selectedCourier;
      await fetchData(filters);
    };
    if (selectedChannel || selectedCourier) {
      fetchDataWithFilters();
    } else if (!searchTerm) {
      fetchData();
    }
  }, [dispatch, selectedChannel, selectedCourier, searchTerm]);

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedStatus(e.target.value as string);
  };
  const handleChannelOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedChannel(e.target.value as string);
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
            reportid: item.reportId,
          })
        );
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } else {
        toast.error("No data found for the provided Order ID");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch order details:");
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

  const statusDropDownData = statusDropDown?.map((status: any) => {
    return {
      label: status.courierName,
      value: status.courierName,
    };
  });
  const channelDropDownData = channelsDropDown?.map((channel: any) => {
    return {
      label: channel.channelName,
      value: channel.channelName,
    };
  });
  return (
    <div>
      <Grid container mt={2}>
        <Grid item sx={{ marginLeft: "auto" }} md={2.5}>
          <CustomSelect
            {...{
              data: statusDropDownData,
              handleOnChange: handleStatusChange,
              value: selectedStatus,
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
        <Grid item sx={{ marginRight: "auto" }} md={6}>
          <Box display="flex" gap="1rem">
            <SearchComponent
              label="search by order ID "
              value={searchTerm}
              onKeyDown={handleKeyPress}
              onChange={handleSearch}
              onSearchSubmit={handleSearchSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default CustomerService;
