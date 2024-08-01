import CustomSelect from "@/component/atoms/customSelect";
import ClearableDatePicker from "@/component/molecules/DesktopDatePicker";
import SearchComponent from "@/component/molecules/searchComponent/SearchComponent";
import { getChannels } from "@/services/thunks/carrierCollectionsApis";
import { useAppDispatch } from "@/store/hooks";
import { Box, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCsFilters,
  getCSOrderList,
} from "@/services/thunks/customerServicePanelApis";
import { getStoreIdFromCookie } from "@/utils/cookies";
import FeaturedTable from "@/tables/featuredTable";
import { useRouter } from "next/router";
import Loader from "@/component/molecules/Loader";

interface OrderList {
  orderId: string;
  elcaOrderId: string;
  channel: string;
  fulfillmentStore: string;
  consignmentId: string;
  items: string;
  price: string;
  orderStatus: string | null;
  orderDate: string | null;
  modifiedDate: string;
  modifiedBy: string;

  customerName: string;
  customerMobile: number;
  customerEmail: string;
}

interface Filters {
  [key: string]: string;
}
// const data: OrderList[] = [
//   {
//     slno: "1",
//     orderId: "ORD001",
//     elcaOrderId: "ELCA001",
//     channel: "Online",
//     fulfillmentStore: "Store001",
//     consignmentId: "CONS001",
//     items: "Item001, Item002",
//     price: "1500",
//     orderStatus: "Shipped",
//     customerName: "Rajesh Kumar",
//     customerMobile: 9876543210,
//     customerEmail: "rajesh.kumar@example.com",
//   },
//   {
//     slno: "2",
//     orderId: "ORD002",
//     elcaOrderId: "ELCA002",
//     channel: "Retail",
//     fulfillmentStore: "Store002",
//     consignmentId: "CONS002",
//     items: "Item003, Item004",
//     price: "2500",
//     orderStatus: "Delivered",
//     customerName: "Anjali Sharma",
//     customerMobile: 9123456780,
//     customerEmail: "anjali.sharma@example.com",
//   },
//   {
//     slno: "3",
//     orderId: "ORD003",
//     elcaOrderId: "ELCA003",
//     channel: "Wholesale",
//     fulfillmentStore: "Store003",
//     consignmentId: "CONS003",
//     items: "Item005, Item006",
//     price: "3500",
//     orderStatus: "Processing",
//     customerName: "Vikram Singh",
//     customerMobile: 9988776655,
//     customerEmail: "vikram.singh@example.com",
//   },
// ];

const CustomerService = () => {
  const handleOrder = (orderId: string) => {
    router.push(`/customer-service-panel/${orderId}`);
  };
  const orderListColumn: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 120,
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
          onClick={() => handleOrder(params.row.orderId)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "elcaOrderId",
      headerName: "ELCA Order ID",
      width: 160,
      align: "left",
    },
    {
      field: "channel",
      headerName: "Channel",
      width: 80,
      align: "left",
    },
    {
      field: "fulfillmentStore",
      headerName: "Store",
      width: 70,
      align: "left",
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 200,
      align: "left",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 110,
      align: "left",
    },
    {
      field: "modifiedDate",
      headerName: "Modified Date",
      width: 110,
      align: "left",
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 110,
      align: "left",
    },
    {
      field: "consignmentId",
      headerName: "Consignment ID",
      width: 200,
      align: "left",
    },
    {
      field: "items",
      headerName: "Items",
      width: 60,
      align: "left",
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
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
      width: 150,
      align: "left",
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 130,
      align: "left",
    },
  ];

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [csOrderListLoading, setCsOrderListLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [orderDate, setOrderDate] = useState<Dayjs | null>(null);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [statusDropDown, setStatusDropDown] = useState<any>([]);
  const [channelsDropDown, setChannelsDropDown] = useState<any>([]);

  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: OrderList[];
  }>({
    columns: orderListColumn,
    rows: [],
  });

  const dispatch = useAppDispatch();
  const locationId = getStoreIdFromCookie();

  useEffect(() => {
    const fetchCsFilters = async () => {
      if (locationId) {
        setLoading(true);
        try {
          const resultAction = await dispatch(getCsFilters(locationId));
          const data = unwrapResult(resultAction);
          console.log("data check", data);
          if (Object.keys(data).length) {
            const defaultChannel = data.channels.find(
              (channel: any) => channel.channelName === "ELCA"
            );
            if (defaultChannel) {
              setSelectedChannel(defaultChannel.channelName);
            }
            setChannelsDropDown(data.channels);
            setStatusDropDown(data.orderStatus);
          }
        } catch (error) {
          console.error("Failed to fetch status counts: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCsFilters();
  }, [dispatch]);

  const fetchData = async (filters: Filters = {}) => {
    try {
      setCsOrderListLoading(true);
      if (locationId) filters.locationId = locationId.toString();

      console.log("filters", filters);

      const { channel = "", status = "", OrderDate = "" } = filters;

      const orderListPayload: any = {
        // offSet: 1,
        // limit: 100,
        locationId: locationId,
      };

      if (channel !== "") {
        orderListPayload.ChannelName = channel;
      }
      if (status !== "") {
        orderListPayload.status = status;
      }
      if (OrderDate !== "") {
        orderListPayload.OrderDate = OrderDate;
      }
      console.log("orderListPayload", orderListPayload);

      const resultAction = await dispatch(
        getCSOrderList({ filters: orderListPayload })
      );
      const data = unwrapResult(resultAction);
      console.log("data", data);
      if (data.length) {
        const rows: OrderList[] = data.map((item: any, index: number) => ({
          id: item.orderId,
          orderId: item.orderId,
          elcaOrderId: item.elcaOrderId,
          channel: item.channelName,
          fulfillmentStore: item.fulfillmentStore,
          consignmentId: item.consignmentId,
          items: item.items,
          price: item.price,
          orderStatus: item.orderStatus,
          orderDate: item.orderDate,
          modifiedDate: item.modifiedDate,
          modifiedBy: item.modifiedBy,

          customerName: item.customerName,
          customerMobile: item.customerMobile,
          customerEmail: item.customerEmail,
        }));
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } else {
        toast.error(data.message || "No data found for cs panel");
      }
    } catch (error) {
      console.error("Failed to fetch order list:", error);
    } finally {
      setCsOrderListLoading(false);
    }
  };
  useEffect(() => {
    const fetchDataWithFilters = async () => {
      const filters: { [key: string]: any } = {};

      if (selectedChannel) filters.channel = selectedChannel;
      if (selectedStatus) filters.status = selectedStatus;

      const parsedOrderDate = dayjs(orderDate).isValid()
        ? dayjs(orderDate).format("YYYY-MM-DD")
        : "";

      if (parsedOrderDate) filters.OrderDate = parsedOrderDate;

      await fetchData(filters);
    };
    console.log("selectedChannel", selectedChannel);
    if ((selectedChannel || selectedStatus || orderDate) && !searchTerm) {
      fetchDataWithFilters();
    }
  }, [dispatch, selectedChannel, orderDate, selectedStatus, searchTerm]);

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
      toast.error("Order Id is required");
      return;
    }
    setLoading(true);
    try {
      const orderListPayload: any = {
        // offSet: 1,
        // limit: 100,
        locationId: locationId,
      };

      if (searchTerm !== "") {
        orderListPayload.OrderId = searchTerm;
      }
      if (selectedChannel) orderListPayload.ChannelName = selectedChannel;

      console.log("orderListPayload", orderListPayload);

      const resultAction = await dispatch(
        getCSOrderList({ filters: orderListPayload })
      );
      const data = unwrapResult(resultAction);
      if (data && data.length) {
        const rows: OrderList[] = data.map((item: any, index: number) => ({
          id: item.orderId,
          orderId: item.orderId,
          elcaOrderId: item.elcaOrderId,
          channel: item.channelName,
          fulfillmentStore: item.fulfillmentStore,
          consignmentId: item.consignmentId,
          items: item.items,
          price: item.price,
          orderDate: item.orderDate,
          orderStatus: item.orderStatus,
          modifiedDate: item.modifiedDate,
          modifiedBy: item.modifiedBy,
          customerName: item.customerName,
          customerMobile: item.customerMobile,
          customerEmail: item.customerEmail,
        }));
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

  console.log("statusDropDown", statusDropDown);

  const statusDropDownData = statusDropDown?.map((status: any) => {
    return {
      label: status.status,
      value: status.status,
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
      {loading || csOrderListLoading ? (
        <Loader size={50} color="primary" overlay={true} />
      ) : (
        <>
          <Grid container mt={2}>
            <Grid item sx={{ marginLeft: "auto" }} md={2.5}>
              <CustomSelect
                {...{
                  data: channelDropDownData,
                  handleOnChange: handleChannelOnChange,
                  value: selectedChannel,

                  label: "Channels",
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
                      top: "-7px",
                    },
                    "& .MuiInputBase-root": {
                      height: "40px",
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
                  data: statusDropDownData,
                  handleOnChange: handleStatusChange,
                  value: selectedStatus,
                  label: "Status",
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
                    "& .MuiInputBase-root": {
                      height: "40px",
                    },
                    "& label": {
                      top: "-7px",
                    },
                    "& .Mui-focused": {
                      top: "0",
                    },
                  },
                }}
              />
            </Grid>
            <Grid ml={2} md={2.2}>
              <Box display="flex" gap="1rem">
                <SearchComponent
                  label="Order ID "
                  value={searchTerm}
                  onKeyDown={handleKeyPress}
                  onChange={handleSearch}
                  onSearchSubmit={handleSearchSubmit}
                  sx={{
                    width: "210px",
                    "& .MuiSelect-outlined": {
                      padding: "6px",
                    },

                    "& .MuiInputBase-root": {
                      height: "40px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0px",
                    },
                    "& label": {
                      top: "-7px",
                    },
                    "& .Mui-focused": {
                      top: "0",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: "auto" }} ml={2} md={2.2}>
              <ClearableDatePicker
                label="Order Date"
                value={orderDate}
                onChange={setOrderDate}
                slotProps={{ textField: { size: "small" } }}
              />
            </Grid>
          </Grid>
          <Box>
            {" "}
            <Box mt={2}>
              {tableState.rows && tableState.rows.length ? (
                <FeaturedTable
                  {...{
                    rows: tableState.rows,
                    columns: tableState.columns,
                    checkboxSelection: false,
                  }}
                />
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h4">No detailss found</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};
export default CustomerService;
