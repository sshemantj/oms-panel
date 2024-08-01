import CustomSelect from "@/component/atoms/customSelect";
import Loader from "@/component/molecules/Loader";
import MainLayout from "@/layout/MainLayout";
import {
  createRMAEntry,
  getCancelReasons,
  getCsOrderItems,
  getRmaReasons,
} from "@/services/thunks/customerServicePanelApis";
import { useAppDispatch } from "@/store/hooks";
import FeaturedTable from "@/tables/featuredTable";
import { getStoreIdFromCookie } from "@/utils/cookies";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

const itemConditions = [
  {
    text: "Unopened",
  },
  {
    text: "Damaged",
  },
  {
    text: "Opened",
  },
];

const RmaScren = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [selectedReasonForReturn, setSelectedReasonForReturn] = useState("");
  const [selectedItemCondition, setSelectedItemCondition] = useState("");
  const [order, setOrder] = useState<any>(null);

  const router = useRouter();

  const { rmaid } = router.query;

  console.log("router.query", router.query);

  const dispatch = useAppDispatch();

  const openLightBox = (imageUrl: any) => {
    const imageSrc = imageUrl;
    setImages([{ src: imageSrc }]);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchReturnReasons = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getRmaReasons());
        const data = unwrapResult(resultAction);

        console.log("data check", data);
        if (data.length) {
          const returnReasonDropDown = data?.map((reason: any) => {
            return {
              label: reason.text,
              value: reason.text,
            };
          });
          const columns = [
            {
              field: "image",
              headerName: "Product Image",
              width: 130,
              renderCell: (params: any) => (
                <Image
                  src={params.value || "https://via.placeholder.com/90"}
                  alt="Item Image"
                  width={50}
                  height={50}
                  onClick={() => openLightBox(params.value)}
                  style={{ cursor: "pointer" }}
                />
              ),
            },
            {
              field: "name",
              headerName: "Product Name",
              width: 130,
              // renderCell: (params) => (
              //   <Typography sx={{ marginTop: "10px" }} color="primary">
              //     {params.value}
              //   </Typography>
              // ),
            },
            { field: "sku", headerName: "SKU", width: 100 },
            { field: "isSample", headerName: "Is Sample", width: 120 },
            { field: "orderId", headerName: "Order ID", width: 120 },
            { field: "price", headerName: "Price", width: 80 },
            { field: "qtyOrdered", headerName: "Qty Ordered", width: 120 },
            { field: "qtyAvailable", headerName: "Qty Available", width: 150 },
            { field: "stockQty", headerName: "Stock Quantity", width: 150 },
            {
              field: "returnQty",
              headerName: "Return Qty",
              width: 150,
              renderCell: (params: any) => (
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  sx={{ marginTop: "5px" }}
                  value={params.value}
                  onChange={(event) =>
                    handleQuantityChange(
                      event,
                      params.row.id,
                      params.row.qtyAvailable
                    )
                  }
                />
              ),
            },
            {
              field: "returnReason",
              headerName: "Return Reason",
              width: 180,
              renderCell: (params: any) => (
                <CustomSelect
                  {...{
                    data: returnReasonDropDown,
                    handleOnChange: (event) =>
                      handleDropdownChange(event, params.row.id),
                    value: params.value || "",

                    label: "Select",
                    selectWrapperStyle: {
                      marginLeft: "auto",
                      paddingTop: "8px",
                      background: "inherit",
                    },
                    selectSx: {
                      width: "110px",
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
              ),
            },
            {
              field: "itemCondition",
              headerName: "Item Condition",
              width: 180,
              renderCell: (params: any) => (
                <div style={{ paddingTop: 1 }}>
                  <CustomSelect
                    {...{
                      data: itemConditionDropDown,
                      handleOnChange: (event) =>
                        handleDropdownChangeFOrItemCondition(
                          event,
                          params.row.id
                        ),
                      value: params.value || "",

                      label: "Select",
                      selectWrapperStyle: {
                        paddingTop: "8px",
                        background: "inherit",

                        marginLeft: "auto",
                      },
                      selectSx: {
                        width: "110px",
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
                </div>
              ),
            },
            {
              field: "resolution",
              headerName: "Resolution",
              width: 180,
            },
          ];
          setTableState((prevState: any) => ({
            ...prevState,
            columns: columns,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch cancellation reasons: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnReasons();
  }, [dispatch]);

  const itemConditionDropDown = itemConditions?.map((condition: any) => {
    return {
      label: condition.text,
      value: condition.text,
    };
  });

  console.log("itemConditionDropDown", itemConditionDropDown);

  const handleQuantityChange = (event: any, rowId: any, maxQuantity: any) => {
    const newValue = event.target.value;

    const numericRegex = /^[0-9]*\.?[0-9]*$/;

    if (numericRegex.test(newValue)) {
      const numericValue = parseFloat(newValue);

      if (numericValue > maxQuantity) {
        toast.error(
          `Cancel quantity cannot be greater than Qty Available ${maxQuantity}`
        );
        return;
      }
      setTableState((prevState: any) => {
        const newRows = prevState.rows.map((row: any) =>
          row.id === rowId ? { ...row, returnQty: newValue } : row
        );
        return { ...prevState, rows: newRows };
      });
    }
  };

  const handleDropdownChange = (event: any, rowId: any) => {
    const newValue = event.target.value;
    setTableState((prevState: any) => {
      const newRows = prevState.rows.map((row: any) =>
        row.id === rowId ? { ...row, returnReason: newValue } : row
      );
      return { ...prevState, rows: newRows };
    });
  };

  const handleDropdownChangeFOrItemCondition = (event: any, rowId: any) => {
    const newValue = event.target.value;
    setTableState((prevState: any) => {
      const newRows = prevState.rows.map((row: any) =>
        row.id === rowId ? { ...row, itemCondition: newValue } : row
      );
      return { ...prevState, rows: newRows };
    });
  };

  const [loading, setLoading] = useState(true);
  const [csOrderloading, setCsOrderLoading] = useState(true);

  const [tableState, setTableState] = useState<any>({
    columns: [],
    rows: [],
  });

  const locationId = getStoreIdFromCookie();
  useEffect(() => {
    const fetchOrder = async () => {
      setCsOrderLoading(true);
      try {
        if (locationId && rmaid) {
          const resultAction = await dispatch(
            getCsOrderItems({
              locationId: locationId,
              orderId: rmaid as string,
            })
          );
          const data = unwrapResult(resultAction);
          console.log("data", data);
          if (Object.keys(data).length) {
            setOrder(data);
            const productInfo =
              data && data.consignments && data.consignments[0].csOrderProducts;

            console.log("productInfo", productInfo);
            const rows: [] = productInfo.map((item: any, index: number) => ({
              id: item.sku,
              slno: index + 1,
              image: item.imageUrl,
              name: item.productName,
              sku: item.sku,
              isSample: item.isSample,
              orderId: data.orderInformation.orderId,
              price: item.price,
              qtyOrdered: item.quantity.orderQuantity,
              qtyAvailable: item.quantity.orderQuantity,
              stockQty: item.stockQty,
              // returnQty: item.returnQty,
              // returnReason: item.returnReason,
              // itemCondition: item.itemCondition,
              resolution: "Refund",
            }));
            console.log("rows", rows);
            setTableState((prevTableState: any) => ({
              ...prevTableState,
              rows,
            }));
          } else {
            toast.error("No data found for cs panel");
          }
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to fetch order items:");
      } finally {
        setCsOrderLoading(false);
      }
    };

    fetchOrder();
  }, [dispatch, rmaid]);
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);
  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  const handleRmaSubmit = async () => {
    const selectedRowsToUpdate = tableState.rows.filter((row: any) =>
      selectedTableRows.includes(row.id)
    );

    console.log("selectedRowsToUpdate", selectedRowsToUpdate);

    let isValid = true;
    for (const row of selectedRowsToUpdate) {
      if (!row.returnQty) {
        toast.error(`Return Quantity is required for row ${row.id}`);
        isValid = false;
        break;
      } else if (!row.itemCondition) {
        toast.error(`Item Condition is required for row ${row.id}`);
        isValid = false;
        break;
      } else if (!row.returnReason) {
        toast.error(`Return Reason is required for row ${row.id}`);
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      return;
    }

    const shipmentNumber =
      order && order.consignments && order.consignments[0].shipmentNo;
    const omsOrderID = order?.orderInformation?.omsOrderId;
    const dataToSubmit = selectedRowsToUpdate.map((row: any) => ({
      shipmentNo: shipmentNumber,
      omsOrderId: omsOrderID,
      sku: row.sku,
      returnQuantity: row.returnQty,
      orderLineNo: 2,
      itemCondition: row.itemCondition,
      returnReasons: row.returnReason,
    }));

    console.log("dataToSubmit", dataToSubmit);
    try {
      const rmaEntryResponseAction = await dispatch(
        createRMAEntry(dataToSubmit)
      );
      const data = unwrapResult(rmaEntryResponseAction);
      console.log("data", data);
      if (data.status === 200) {
        toast.success(
          data.data.message || "Something went wrong while creating RMA"
        );
        return;
      } else {
        toast.error(
          data.data.message || "Something went wrong while creating RMA"
        );
        return;
      }
    } catch (error) {
      console.error("Failed to create RMA entry: ", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <>
          {loading || csOrderloading ? (
            <Loader size={50} color="primary" overlay={true} />
          ) : null}

          <Grid container spacing={2} p={4}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography>
                        Order ID: {order?.orderInformation?.omsOrderId}
                      </Typography>
                      <Typography>RMA Raised By: {"CURRENT USER "}</Typography>
                      <Typography>RMA ID: {"JKDSJSF911"}</Typography>
                      <Typography>
                        Status: {order?.orderInformation?.orderStatus}
                      </Typography>
                      <Typography>
                        Payment Method:{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.pgPaymentMethod
                        }
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <Typography>
                        Status: {order?.orderInformation?.orderStatus}
                      </Typography>
                      <Typography>
                        Payment Method:{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.pgPaymentMethod
                        }
                      </Typography>
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Customer Information
                  </Typography>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography>
                        Customer Name: {order?.accountInformation?.customerName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Customer Number: {order?.accountInformation?.contactNo}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Customer Email:{" "}
                        {order?.accountInformation?.customerEmail}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container p={4} mt={2}>
            <Box>
              <Typography variant="h5" mb={2}>
                Items in Order 123456
              </Typography>
              <Box mt={2}>
                {tableState.rows && tableState.rows.length ? (
                  <FeaturedTable
                    {...{
                      rows: tableState.rows,
                      columns: tableState.columns,
                      checkboxSelection: true,
                      onRowSelectionModelChange,
                    }}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h4">No detailss found</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedTableRows.length}
                onClick={handleRmaSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          {isOpen && (
            <Lightbox
              plugins={[Captions, Fullscreen, Zoom]}
              open={isOpen}
              close={() => setIsOpen(false)}
              slides={images}
            />
          )}
        </>
      </MainLayout>
    </>
  );
};
export default RmaScren;
