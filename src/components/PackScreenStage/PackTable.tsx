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
import styles from "./PackScreen.module.scss";

// Define interface for consignment item
interface PackColumnItem {
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

const PackScreenTable = ({ filters }: PackScreenTableProps) => {
  const columns: GridColDef[] = [
    { field: "slno", headerName: "SL No", width: 80 },

    { field: "trayId", headerName: "Tray ID", width: 80 },
    { field: "orderId", headerName: "Order ID", width: 120 },
    { field: "soId", headerName: "SO ID", width: 80 },
    { field: "poId", headerName: "PO ID", width: 80 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "awb", headerName: "AWB", width: 140 },
    { field: "courierPartner", headerName: "Courier Partner", width: 120 },

    {
      field: "consignmentId",
      headerName: "Consignment ID",
      width: 200,
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
          onClick={() => handleConsignmentClick(params.row.consignmentId)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "SL",
      headerName: "SL",
      width: 40,

      renderCell: (params) => (
        <>
          {params.row.status.toLowerCase() === "fulfilled" ? (
            <DownloadIcon
              color="primary"
              style={{
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleDownloadPDF(params.row.consignmentId, true)}
            >
              Download
            </DownloadIcon>
          ) : null}
        </>
      ),
    },
    {
      field: "Invoice",
      headerName: "Invoice",
      width: 80,

      renderCell: (params) => (
        <>
          {params.row.status.toLowerCase() === "fulfilled" ? (
            <DownloadIcon
              color="primary"
              style={{
                marginLeft: "1rem",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleDownloadPDF(params.row.consignmentId, false)}
            >
              Download
            </DownloadIcon>
          ) : null}
        </>
      ),
    },
  ];
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: PackColumnItem[];
  }>({
    columns: columns,
    rows: [],
  });

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const handleDownloadPDF = async (shipmentNo: string, shipping = false) => {
    const url = shipping ? "GetShippingLabel" : "GetInvoice";
    const config: any = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.API_BASE_URL}/PDF/${url}?shipmentno=${shipmentNo}`,
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
        const fileName = shipping ? "ShippingLabel" : "Invoice";
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const resultAction = await dispatch(
          getPackItemDetails({ offSet: 1, limit: 5, locationId: 115 })
        );
        const data = unwrapResult(resultAction);
        const rows: PackColumnItem[] = data.map((item: any, index: number) => ({
          slno: index + 1,
          id: item.consignments.consignmentId,
          trayId: item.trayCode,
          orderId: item.orderId,
          soId: item.soId,
          poId: item.poId,
          status: item.status,
          awb: item.awb,
          courierPartner: item.courierPartner,
          consignmentId: item.consignments.consignmentId,
        }));
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } catch (error) {
        console.error("Failed to fetch pack item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!filters) {
      fetchData();
    }
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { brand = "", tray = "", deliveryMode = "" } = filters;

        const packPayload: any = {
          offSet: 1,
          limit: 5,
          locationId: 115,
        };

        // Add existing filters if they exist
        if (brand !== "") {
          packPayload.brand = {
            brandName: brand,
          };
        }
        if (deliveryMode !== "") {
          packPayload.deliveryMode = deliveryMode;
        }
        if (tray !== "") {
          packPayload.tray = tray;
        }
        const resultAction = await dispatch(getPackItemDetails(packPayload));
        const data = unwrapResult(resultAction);
        const rows: PackColumnItem[] = data.map((item: any, index: 1) => ({
          slno: index + 1,
          id: item.consignments.consignmentId,
          trayId: item.trayCode,
          orderId: item.orderId,
          soId: item.soId,
          poId: item.poId,
          status: item.status,
          awb: item.awb,
          courierPartner: item.courierPartner,
          consignmentId: item.consignments.consignmentId,
        }));
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } catch (error) {
        console.error("Failed to fetch pack item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filters) {
      fetchData();
    }
  }, [dispatch, filters]);

  const handleConsignmentClick = (consignmentId: string) => {
    router.push(`/pack-screen/${consignmentId}`);
  };

  return (
    <>
      {loading ? <Loader size={50} color="primary" overlay={true} /> : null}

      <Box className={styles.packScreenWrapper}>
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
                  // onRowSelectionModelChange,
                }}
              />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h4">No Pack Items found</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PackScreenTable;
