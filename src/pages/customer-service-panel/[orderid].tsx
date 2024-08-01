import MainLayout from "@/layout/MainLayout";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import GetAppIcon from "@mui/icons-material/GetApp";
import { ChangeEvent, useEffect, useState } from "react";
import ModalComponent from "@/component/molecules/ModalComponent";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import {
  cancelOrder,
  getCancelReasons,
  getCsOrderItems,
} from "@/services/thunks/customerServicePanelApis";
import { getStoreIdFromCookie } from "@/utils/cookies";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import SelectDropdown from "@/component/atoms/selectDropdown";
import CustomSelect from "@/component/atoms/customSelect";
import axios from "axios";
import Loader from "@/component/molecules/Loader";

interface cancelQtyState {
  [key: number]: {
    [key: string]: string;
  };
}

const OrderDetails = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { orderid } = router.query;

  console.log("router.query", router.query);

  const [showCancellationModal, setShowCancellationModal] = useState(false);

  const [cancellationType, setCancellationType] = useState("");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [csOrderloading, setCsOrderLoading] = useState(true);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [
    selectedReasonForFullCancellation,
    setSelectedReasonForFullCancellation,
  ] = useState("");

  const [cancelQtyPartial, setCancelQtyPartial] = useState<cancelQtyState>({});

  const [
    selectedReasonsForPartialCancellation,
    setSelectedReasonsForPartialCancellation,
  ] = useState<Record<number, string>>({});
  const [cancellationReasons, setCancellationReasons] = useState<any>([]);

  const handleSelectRow = (index: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(index)) {
        newSelectedRows.delete(index);
      } else {
        newSelectedRows.add(index);
      }
      return newSelectedRows;
    });
  };

  const isSubmitEnabled = selectedRows.size > 0;

  const handleOpen = (type: any) => {
    setCancellationType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowCancellationModal(false);
    if (cancellationType === "Full" || !cancellationType) {
      setSelectedReasonForFullCancellation("");
    } else {
      setSelectedRows(new Set());
      setSelectedReasonsForPartialCancellation({});
      setCancelQtyPartial({});
    }
    setCancellationType("");
  };

  const handleSubmitFullCancellation = async () => {
    console.log(
      "selectedReasonForFullCancellation",
      selectedReasonForFullCancellation
    );
    if (!selectedReasonForFullCancellation) {
      toast.error("Cancellation Reason is required");
      return;
    }

    const fullCancellationData = [
      {
        orderId: orderid,
        omsOrderId: order.orderInformation.omsOrderId,
        sku: "",
        fulfilmentRef: "",
        cancelQty: 0,
        cancelReason: selectedReasonForFullCancellation,
        cancelType: "Full",
      },
    ];
    const resultAction = await dispatch(cancelOrder(fullCancellationData));
    const response = unwrapResult(resultAction);
    if (response.status === 200) {
      handleClose();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const validateSelectedRows = () => {
    let isValid = true;
    const invalidIndices: number[] = [];

    Array.from(selectedRows).forEach((index) => {
      const row = productInfo[index];
      const cancelQty = cancelQtyPartial[index]?.cancelQty || "";
      const cancelReason = selectedReasonsForPartialCancellation[index] || "";

      if (!cancelQty || !cancelReason) {
        isValid = false;
        toast.error(
          `Please enter quantity and select reason for row ${index + 1}`
        );
      } else if (Number(cancelQty) <= 0) {
        isValid = false;
        invalidIndices.push(index);
        toast.error(
          `Cancel Quantity must be greater than zero for row ${index + 1}`
        );
      }
    });

    return isValid;
  };

  const handleSubmitPartialCancellation = async () => {
    if (validateSelectedRows()) {
      const dataForSubmit = Array.from(selectedRows).map((index) => {
        const row = productInfo[index];
        console.log("row", row);
        return {
          orderId: orderid,
          omsOrderId: row.omsOrderId,
          sku: row.sku,
          fulfilmentRef: row.shipmentNo,
          cancelQty: cancelQtyPartial[index]?.cancelQty || 0,
          cancelReason: selectedReasonsForPartialCancellation[index] || "",
          cancelType: "Partial",
        };
      });
      console.log("dataForSubmit", dataForSubmit);
      const resultAction = await dispatch(cancelOrder(dataForSubmit));
      const response = unwrapResult(resultAction);
      if (response.status === 200) {
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const handleCancelInRmaModal = () => {
    setShowCancellationModal(true);
  };
  const handleCancellationModal = () => {
    setShowCancellationModal(false);
  };
  const dispatch = useAppDispatch();

  const locationId = getStoreIdFromCookie();

  useEffect(() => {
    const fetchOrder = async () => {
      setCsOrderLoading(true);
      try {
        if (locationId && orderid) {
          const resultAction = await dispatch(
            getCsOrderItems({
              locationId: locationId,
              orderId: orderid as string,
            })
          );
          const data = unwrapResult(resultAction);
          console.log("data", data);
          if (Object.keys(data).length) {
            setOrder(data);
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
  }, [dispatch, orderid]);

  useEffect(() => {
    const fetchCancellationReasons = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getCancelReasons());
        const data = unwrapResult(resultAction);
        setCancellationReasons(data);
      } catch (error) {
        console.error("Failed to fetch cancellation reasons: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCancellationReasons();
  }, [dispatch]);

  const handleCreateRma = () => {
    router.push(`/customer-service-panel/rma/${orderid}`);
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedReasonForFullCancellation(e.target.value as string);
  };

  const handleDropdownChangeForPartialDropDown = (
    event: React.ChangeEvent<{ value: unknown }>,
    index: number
  ) => {
    const selectedType = event.target.value;
    setSelectedReasonsForPartialCancellation((prev: any) => ({
      ...prev,
      [index]: selectedType,
    }));

    // console.log("items", consigments);
    // const updatedItems = [...consigments];
    // updatedItems[index].packWeight = "";
    // updatedItems[index].weightError = "";
    // setConsignments(updatedItems);
  };

  const handleCanelQtyForPartialCancellation = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxQuantity: any
  ) => {
    const { name, value } = event.target;

    const numericRegex = /^[0-9]*\.?[0-9]*$/;
    if (numericRegex.test(value)) {
      const numericValue = parseFloat(value);

      if (numericValue > maxQuantity) {
        toast.error(
          `Cancel quantity cannot be greater than Max Qty ${maxQuantity}`
        );
        return;
      }
      setCancelQtyPartial((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [name]: value,
        },
      }));
    }
  };

  const handleDownloadPDF = async (shipmentNo: string, shipping = false) => {
    const url = shipping ? "GetShippingLabel" : "GetInvoice";
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

  const productInfo =
    order && order.consignments.length && order.consignments[0].csOrderProducts;
  const shipmentNumber =
    order && order.consignments.length && order.consignments[0].shipmentNo;
  const cancellationDropDown = cancellationReasons?.map((courier: any) => {
    return {
      label: courier.text,
      value: courier.text,
    };
  });

  console.log(
    "selectedReasonsForPartialCancellation",
    selectedReasonsForPartialCancellation
  );

  console.log("cancelQtyPartial", cancelQtyPartial);
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

          <Grid container p={4}>
            <Grid item xs={8}>
              <Typography variant="h6">Items Ordered</Typography>
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Qty</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order &&
                      order.consignments.length &&
                      productInfo?.map((item: any) => (
                        <TableRow key={item.sku}>
                          <TableCell>
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              width={200}
                              height={200}
                            />
                            <Typography color="primary">
                              {item.productName}
                            </Typography>
                            <Typography>SKU: {item.sku}</Typography>
                            <Typography>HSN Code: {item.hsnCode}</Typography>
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {item.price}
                          </TableCell>
                          <TableCell
                            sx={{
                              verticalAlign: "top",
                              paddingBottom: "auto",
                              width: "15%",
                            }}
                          >
                            <Typography fontSize={14}>
                              Ordered {item?.quantity?.orderQuantity}
                            </Typography>
                            <Typography fontSize={14}>
                              Invoiced {item?.quantity?.invoicedQuantity}
                            </Typography>
                            <Typography fontSize={14}>
                              Shipped {item?.quantity?.shippedQuantity}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {item.subTotal}
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {item.discount}
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {item.rowTotal}
                          </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={3.5} ml={3}>
              <Grid container direction="column" spacing={1} mt={1}>
                <Typography variant="h6">Order Totals</Typography>
                <Divider />
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ backgroundColor: "grey.200", p: 1 }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>{order?.csOrderTotal?.subTotal}</Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ p: 1 }}
                >
                  <Typography>Discount:</Typography>
                  <Typography>{order?.csOrderTotal?.orderDiscount}</Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ backgroundColor: "grey.200", p: 1 }}
                >
                  <Typography>Shipping & Handling:</Typography>
                  <Typography>
                    {order?.csOrderTotal?.shippingHandling}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ p: 1, fontWeight: "bold" }}
                >
                  <Typography>Grand Total:</Typography>
                  <Typography>{order?.csOrderTotal?.grandTotal}</Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ p: 1, fontWeight: "bold" }}
                >
                  <Typography>Total Paid:</Typography>
                  <Typography>{order?.csOrderTotal?.totalPaid}</Typography>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  sx={{ p: 1, fontWeight: "bold" }}
                >
                  <Typography>Total Due:</Typography>
                  <Typography>{order?.csOrderTotal?.totalDue}</Typography>
                </Grid>
                <Grid item container spacing={2} mt={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadPDF(shipmentNumber, false)}
                    >
                      Invoice
                      <IconButton aria-label="download" color="inherit">
                        <GetAppIcon />
                      </IconButton>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadPDF(shipmentNumber, true)}
                    >
                      Shipping Label
                      <IconButton aria-label="download" color="inherit">
                        <GetAppIcon />
                      </IconButton>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%", my: 4 }} />
            <Grid item xs={12}>
              <Typography variant="h6">Order & Account Information</Typography>
              <Divider sx={{ width: "100%", mb: 2 }} />
              <Grid container>
                <Grid item xs={5.5}>
                  <Grid container direction="column">
                    <Grid item container sx={{ width: "50%", mb: 2 }}>
                      <Typography>
                        Order ID #{order?.orderInformation?.omsOrderId}(The
                        order confirmation email is not sent)
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ backgroundColor: "grey.200", p: 1 }}
                    >
                      <Typography>Order Date</Typography>
                      <Typography>
                        {order?.orderInformation?.orderDate}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ p: 1 }}
                    >
                      <Typography>Order Status</Typography>
                      <Typography>
                        {order?.orderInformation?.orderStatus}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ p: 1 }}
                    >
                      <Typography>Purchased From</Typography>
                      <Typography>
                        {order?.orderInformation?.purchaseFrom}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5.5} ml={2}>
                  <Grid container direction="column">
                    <Grid item container sx={{ width: "50%", mb: 4.5 }}>
                      <Typography variant="subtitle1">
                        Account Information
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ backgroundColor: "grey.200", p: 1 }}
                    >
                      <Typography>Customer Name</Typography>
                      <Typography>
                        {order?.accountInformation?.customerName}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ p: 1 }}
                    >
                      <Typography>Email</Typography>
                      <Typography color="primary">
                        {order?.accountInformation?.customerEmail}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      sx={{ backgroundColor: "grey.200", p: 1 }}
                    >
                      <Typography>Customer Group</Typography>
                      <Typography>
                        {order?.accountInformation?.customerGroup}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%", my: 4 }} />
            <Typography variant="h6">Order Dispatch Information</Typography>
            <Divider sx={{ width: "100%", mb: 2 }} />
            <Grid container>
              <Grid item xs={7.5}>
                <Grid container direction="column">
                  <Grid
                    item
                    container
                    sx={{ backgroundColor: "grey.200", p: 1 }}
                  >
                    <Grid item xs={3}>
                      <Typography>Store Name</Typography>
                    </Grid>
                    <Typography>
                      {order?.orderDespatchInformation?.storeName}
                    </Typography>
                  </Grid>
                  <Grid item container sx={{ p: 1 }}>
                    <Grid item xs={3}>
                      <Typography>Postcode</Typography>
                    </Grid>
                    <Typography>
                      {order?.orderDespatchInformation?.postCode}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    sx={{ backgroundColor: "grey.200", p: 1 }}
                  >
                    <Grid item xs={3}>
                      <Typography>Address </Typography>
                    </Grid>
                    <Divider sx={{ my: 0.5 }} />
                    <Grid item container>
                      <Grid item xs={3}>
                        <Typography>Region</Typography>
                      </Grid>
                      <Typography>
                        {order?.orderDespatchInformation?.storeAddress?.region}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={3}>
                        <Typography>City</Typography>
                      </Grid>
                      <Typography>
                        {order?.orderDespatchInformation?.storeAddress?.city}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={3}>
                        <Typography>Street</Typography>
                      </Grid>
                      <Typography>
                        {order?.orderDespatchInformation?.storeAddress?.street}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={3}>
                        <Typography>Region Code</Typography>
                      </Grid>
                      <Typography>
                        {
                          order?.orderDespatchInformation?.storeAddress
                            ?.regionCode
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={6}>
              <Grid item xs={12}>
                <Typography variant="h6">Address Information</Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h5">Billing Address</Typography>
                  <Grid container direction="column" spacing={1} mt={2}>
                    <Grid item>
                      <Typography>
                        {" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.billingAddress?.customerName
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.billingAddress?.address
                        }
                      </Typography>
                      {/* <Typography>Suite 4B</Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography>
                        M:{" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.billingAddress?.mobile
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">Shipping Address</Typography>
                  <Grid container direction="column" spacing={1} mt={2}>
                    <Grid item>
                      <Typography>
                        {" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.shippingAddress?.customerName
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.shippingAddress?.address
                        }
                      </Typography>
                      {/* <Typography>Apt 12A</Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography>
                        M:{" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.shippingAddress?.mobile
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Buyer GST Number: </strong>{" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.shippingAddress?.buyerGSTNumber
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Store Code:</strong>{" "}
                        {
                          order?.orderDespatchInformation?.customerAddress
                            ?.shippingAddress?.storeCode
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={6}>
              <Grid item xs={12}>
                <Typography variant="h6">Payment & Shipping Method</Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
              </Grid>
              <Grid container item xs={12} spacing={2}>
                {/* Payment Information Column */}
                <Grid item xs={6}>
                  <Typography variant="h5">Payment Information</Typography>
                  <Grid container direction="column" spacing={1}>
                    <Grid item mt={2}>
                      <Typography>
                        <strong>Mode of Payment:</strong>{" "}
                        {order?.paymentInformation?.modeOfPayment}
                      </Typography>
                    </Grid>
                    <Grid item mt={2}>
                      <Typography>
                        <strong>Payment Gateway Details</strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Transaction ID:</strong>{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.transactionId
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>PG Transaction ID:</strong>{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.pgTransactionId
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Paid Date:</strong>{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.paidDate
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>PG:</strong>{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.paymentGateway
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Payment Method:</strong>{" "}
                        {
                          order?.paymentInformation?.paymentGatewayDetails
                            ?.pgPaymentMethod
                        }
                      </Typography>
                    </Grid>
                    <Grid item sx={{ mb: 2 }}>
                      <Typography>The order was placed using INR</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Shipping & Handling Information Column */}
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Shipping & Handling Information
                  </Typography>
                  <Grid container direction="column" spacing={1} mt={2}>
                    <Grid item>
                      <Typography>
                        <strong>Mode of Delivery:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.modeOfDelivery
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Shipping Date:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.shippingDate
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Shipping Name:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.shippingName
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>AWB Number:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.awbNumber
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Store Code:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.storeCode
                        }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <strong>Delivery Charges:</strong>{" "}
                        {
                          order?.paymentInformation?.shippingHandlingInformation
                            ?.deliveryCharges
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={6}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Order Fulfillment Information
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
              </Grid>
              <Grid container item xs={12} mt={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Payment Information
                  </Typography>
                  <Typography>The order was placed using INR</Typography>
                  <Typography sx={{ mb: 4, fontWeight: "bold" }}>
                    Payumoney
                  </Typography>
                  <Typography variant="h6">
                    Information for Order Fulfillment
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Increment Id
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>SKU</TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Fulfillment Id
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Fulfillment Ref
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Requested Quantity
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Rejected Quantity
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Status
                          </TableCell>
                          <TableCell sx={{ color: "#d580ff" }}>
                            Created Time
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order &&
                          order?.orderFulfilment?.map((row: any) => (
                            <TableRow key={row.incrementId}>
                              <TableCell>{row.incrementId}</TableCell>
                              <TableCell>{row.sku}</TableCell>
                              <TableCell>{row.fulfilmentId}</TableCell>
                              <TableCell>{row.fulfilmentRef}</TableCell>
                              <TableCell>{row.requestedQuantity}</TableCell>
                              <TableCell>{row.rejectedQuantity}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>{row.createdTime}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid item container mt={4} xs={4} marginLeft="auto">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    marginLeft: "auto",
                  }}
                  onClick={handleCreateRma}
                >
                  Return/Create Rma
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mt: 2,
                    marginLeft: "auto",
                  }}
                  onClick={handleCancelInRmaModal}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid>
              {showCancellationModal ? (
                <ModalComponent
                  open={showCancellationModal}
                  onClose={handleCancellationModal}
                  title=""
                  maxWidth={
                    cancellationType === "Full" || !cancellationType
                      ? "sm"
                      : "xl"
                  }
                >
                  <Grid item xs={12}>
                    <Grid container alignItems="center" p={2}>
                      <Grid item mr={2}>
                        <Typography>Partial or Full Cancellation?</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          row
                          value={cancellationType}
                          onChange={(e) => handleOpen(e.target.value)}
                        >
                          <FormControlLabel
                            value="Partial"
                            control={<Radio />}
                            label="Partial"
                          />
                          <FormControlLabel
                            value="Full"
                            control={<Radio />}
                            label="Full"
                          />
                        </RadioGroup>
                      </Grid>
                      {open && cancellationType === "Full" ? (
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="h5">Cancel Order</Typography>
                          </Grid>
                          <Grid item my={2}>
                            <CustomSelect
                              {...{
                                data: cancellationDropDown,
                                handleOnChange: handleDropdownChange,
                                value: selectedReasonForFullCancellation,

                                label: "Please select the Cancellation Reason",
                                selectWrapperStyle: {
                                  marginLeft: "auto",
                                },
                                selectSx: {
                                  width: "410px",
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
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSubmitFullCancellation}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      ) : open && cancellationType === "Partial" ? (
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <Checkbox
                                        checked={
                                          productInfo?.length ===
                                          selectedRows.size
                                        }
                                        onChange={() => {
                                          if (
                                            selectedRows.size ===
                                            productInfo?.length
                                          ) {
                                            setSelectedRows(new Set());
                                          } else {
                                            setSelectedRows(
                                              new Set(
                                                productInfo?.map(
                                                  (_: any, index: any) => index
                                                )
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell sx={{ color: "#d580ff" }}>
                                      Name
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#d580ff",
                                      }}
                                    >
                                      SKU
                                    </TableCell>
                                    <TableCell sx={{ color: "#d580ff" }}>
                                      Fulfillment Ref
                                    </TableCell>
                                    <TableCell sx={{ color: "#d580ff" }}>
                                      Max Qty
                                    </TableCell>
                                    <TableCell sx={{ color: "#d580ff" }}>
                                      Cancel Qty
                                    </TableCell>
                                    <TableCell sx={{ color: "#d580ff" }}>
                                      Cancel Reason
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order &&
                                    productInfo?.map((row: any, index: any) => (
                                      <TableRow key={index}>
                                        <TableCell>
                                          <Checkbox
                                            checked={selectedRows?.has(index)}
                                            onChange={() =>
                                              handleSelectRow(index)
                                            }
                                          />
                                        </TableCell>
                                        <TableCell sx={{ width: "10%" }}>
                                          {row.productName}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            width: "10%",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          {row.sku}
                                        </TableCell>
                                        <TableCell sx={{ width: "15%" }}>
                                          {row.shipmentNo}
                                        </TableCell>
                                        <TableCell sx={{ width: "10%" }}>
                                          {row.quantity?.orderQuantity}
                                        </TableCell>
                                        <TableCell sx={{ width: "20%" }}>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                              width: "fit-content",
                                            }}
                                          >
                                            <TextField
                                              type="text"
                                              variant="outlined"
                                              size="small"
                                              sx={{ width: "45%" }}
                                              name="cancelQty"
                                              value={
                                                cancelQtyPartial[index]
                                                  ?.cancelQty || ""
                                              }
                                              onChange={(e) =>
                                                handleCanelQtyForPartialCancellation(
                                                  index,
                                                  e,
                                                  row.quantity?.orderQuantity
                                                )
                                              }
                                            />

                                            <Typography>
                                              Available:{" "}
                                              {row.quantity?.orderQuantity}
                                            </Typography>
                                          </Box>
                                        </TableCell>
                                        <TableCell>
                                          <CustomSelect
                                            {...{
                                              data: cancellationDropDown,
                                              handleOnChange: (event) =>
                                                handleDropdownChangeForPartialDropDown(
                                                  event,
                                                  index
                                                ),
                                              value:
                                                selectedReasonsForPartialCancellation[
                                                  index
                                                ],

                                              label:
                                                "Please select the Cancellation Reason",
                                              selectWrapperStyle: {
                                                marginLeft: "auto",
                                              },
                                              selectSx: {
                                                width: "300px",
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
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            item
                            xs={11}
                            display="flex"
                            justifyContent="flex-end"
                            mt={2}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={!isSubmitEnabled}
                              onClick={handleSubmitPartialCancellation}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                </ModalComponent>
              ) : null}
            </Grid>
            {/* <Grid container mt={6}>
              <Grid item xs={12}>
                <Typography variant="h6">Cancellation</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography>Partial or Full Cancellation?</Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup
                      row
                      value={cancellationType}
                      onChange={(e) => handleOpen(e.target.value)}
                    >
                      <FormControlLabel
                        value="Partial"
                        control={<Radio />}
                        label="Partial"
                      />
                      <FormControlLabel
                        value="Full"
                        control={<Radio />}
                        label="Full"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <ModalComponent
                open={open && cancellationType === "Full"}
                onClose={handleClose}
                title="Cancel Order"
              >
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography variant="h6">
                      Please select the cancellation reason:
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="Reason1">Reason 1</MenuItem>
                      <MenuItem value="Reason2">Reason 2</MenuItem>
                      <MenuItem value="Reason3">Reason 3</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </ModalComponent>
              <ModalComponent
                open={open && cancellationType === "Partial"}
                onClose={handleClose}
                title="Partial Order Cancellation"
              >
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "yellow" }}>Name</TableCell>
                          <TableCell sx={{ color: "yellow" }}>SKU</TableCell>
                          <TableCell sx={{ color: "yellow" }}>
                            Fulfillment Ref
                          </TableCell>
                          <TableCell sx={{ color: "yellow" }}>
                            Max Qty
                          </TableCell>
                          <TableCell sx={{ color: "yellow" }}>
                            Cancel Qty
                          </TableCell>
                          <TableCell sx={{ color: "yellow" }}>
                            Available
                          </TableCell>
                          <TableCell sx={{ color: "yellow" }}>
                            Cancel Reason
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {partialCancellationData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.sku}</TableCell>
                            <TableCell>{row.fulfillmentRef}</TableCell>
                            <TableCell>{row.maxQty}</TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                variant="outlined"
                                size="small"
                                defaultValue={row.cancelQty}
                                InputProps={{
                                  endAdornment: (
                                    <Typography>
                                      Available: {row.availableQty}
                                    </Typography>
                                  ),
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                select
                                variant="outlined"
                                size="small"
                                defaultValue={row.cancelReason}
                              >
                                <MenuItem value="Damaged">Damaged</MenuItem>
                                <MenuItem value="Wrong Item">
                                  Wrong Item
                                </MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                              </TextField>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </ModalComponent>
             </Grid> */}
          </Grid>
        </>
      </MainLayout>
    </>
  );
};
export default OrderDetails;
