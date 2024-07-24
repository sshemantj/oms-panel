import Loader from "@/component/molecules/Loader";
import { getPackItemDetails } from "@/services/thunks/packApis";
import { useAppDispatch } from "@/store/hooks";
import FeaturedTable from "@/tables/featuredTable";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getStoreIdFromCookie } from "@/utils/cookies";
import styles from "./CustomerService.module.scss";
import { getCSOrderList } from "@/services/thunks/customerServicePanelApis";

interface OrderList {
  slno: number;
  trayId: number;
  // trayCode: string;
  orderId: string;
  soId: string;
  poId: string;
  status: string;
  awb: string;
  courierPartner: string;
  consignmentId: string;
}

interface PackScreenTableProps {
  filters: any;
}
interface Filters {
  [key: string]: string;
}

const CustomerServiceTable = ({ filters }: PackScreenTableProps) => {
  const columns: GridColDef[] = [
    { field: "slno", headerName: "SL No", width: 80 },

    {
      field: "orderId",
      headerName: "Order ID",
      width: 120,
      renderCell: (params) => (
        <div className={styles.orderIdContainer}>
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
            onClick={() => handleOrderIdClick(params.row.orderId)}
          >
            {params.value}
          </Typography>
          <span className={styles.orderIdFull}>{params.value}</span>
        </div>
      ),
    },
    { field: "elcaorderid", headerName: "ELCA Order ID", width: 120 },
    { field: "orderDate", headerName: "Order Date", width: 80 },
    { field: "channel", headerName: "Channel", width: 80 },
    { field: "fulfillmentStore", headerName: "Fulfillment Store", width: 120 },
    {
      field: "consignmentId",
      headerName: "Consignment ID",
      width: 200,
    },
    { field: "items", headerName: "Items", width: 140 },
    { field: "courierPartner", headerName: "Courier Partner", width: 120 },

    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 40,
    },
    {
      field: "customerName",
      headerName: "Custmomer Mobile",
      width: 80,
    },
    {
      field: "customerEmail",
      headerName: "Custmomer Email",
      width: 80,
    },
  ];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: OrderList[];
  }>({
    columns: columns,
    rows: [],
  });

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const locationId = getStoreIdFromCookie();

  const fetchData = async (filters: Filters = {}) => {
    try {
      setLoading(true);
      if (locationId) filters.locationId = locationId.toString();

      const { channel = "", status = "", dateOfOrder = "" } = filters;

      const orderListPayload: any = {
        offSet: 1,
        limit: 100,
        locationId: locationId,
      };

      // Add existing filters if they exist
      if (channel !== "") {
        orderListPayload.ChannelName = channel;
      }
      if (status !== "") {
        orderListPayload.status = status;
      }
      if (dateOfOrder !== "") {
        orderListPayload.OrderDate = dateOfOrder;
      }

      const resultAction = await dispatch(getCSOrderList(orderListPayload));
      const data = unwrapResult(resultAction);
      const rows: OrderList[] = data.map((item: any, index: number) => ({
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
      }));
      setTableState((prevTableState) => ({ ...prevTableState, rows }));
    } catch (error) {
      console.error("Failed to fetch order list:", error);
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

  const handleOrderIdClick = (consignmentId: string) => {
    router.push(`/pack-screen/${consignmentId}`);
  };

  return (
    <>
      {loading ? (
        <Loader size={50} color="primary" overlay={true} />
      ) : (
        <Box className={styles.customerScreenWrapper}>
          <Box
            sx={{
              width: "100%",
              marginTop: "1rem",
              padding: "0 1rem 1rem 1rem",
              background: "#fff",
            }}
          >
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
        </Box>
      )}
    </>
  );
};

export default CustomerServiceTable;
