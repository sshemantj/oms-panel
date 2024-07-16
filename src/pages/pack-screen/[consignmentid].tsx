import Loader from "@/component/molecules/Loader";
import ModalComponent from "@/component/molecules/ModalComponent";
import MainLayout from "@/layout/MainLayout";
import {
  getConsignmentsItem,
  updatePackEntry,
  updateWeight,
} from "@/services/thunks/packApis";
import { useAppDispatch } from "@/store/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface Consignment {
  consignmentId: string;
  productName: string;
  brand: string;
  omsId: string;
  orderId: string;
  packWeight: string;
  weightError: string;
  status: string;
}

const dataForconsignment = [
  {
    consignmentId: "SHIP-001",
    orderId: "12345",
    omsId: 130,
    sku: "14054LAVENDER003",
    productName: "Solid Collared Cotton Womens Dress",
    brand: "HANCOCK",
    ean: "14054LAVENDER003",
    quantity: 1,
    size: "LARGE",
    weight: "0",
    color: "LAVENDER",
    imageUrl:
      "https://sslimages.shoppersstop.com/sys-master/images/hbc/h75/29537292910622/A21DO21DEN0903W_WHITE_alt4.jpg_2000Wx3000H",
  },
  {
    consignmentId: "SHIP-001",
    orderId: "12345",
    omsId: 130,
    sku: "14054LAVENDER003",
    productName: "Solid Collared Cotton Womens Dress",
    brand: "HANCOCK",
    ean: "14054LAVENDER003",
    quantity: 1,
    size: "LARGE",
    weight: "0",
    color: "LAVENDER",
    imageUrl:
      "https://sslimages.shoppersstop.com/sys-master/images/hbc/h75/29537292910622/A21DO21DEN0903W_WHITE_alt4.jpg_2000Wx3000H",
  },
];

interface IParcelTypeWeights {
  small: { min: number; max: number };
  medium: { min: number; max: number };
  large: { min: number; max: number };
}

const ParcelTypeWeights: IParcelTypeWeights = {
  small: { min: 0.1, max: 4 },
  medium: { min: 5, max: 9.9 },
  large: { min: 10, max: 20 },
};

const ConsignmentModal: React.FC = () => {
  const [selectedParcelType, setSelectedParcelType] =
    useState<keyof IParcelTypeWeights>("small");
  const [packWeight, setPackWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceIdError, setInvoiceIdError] = useState("");
  // const [itemsInConsignment, setItemsInConsignment] = useState([]);
  const [consigments, setConsignments] = useState<Consignment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [handoverEnabled, setHandoverEnabled] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("dataForconsignment", dataForconsignment);

  // const itemsInConsignment = dataForconsignment.map(
  //   (consignmentDetail: any) => ({
  //     ...consignmentDetail,
  //   })
  // );

  const handleParcelTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedParcelType(event.target.value as keyof IParcelTypeWeights);
    setPackWeight(""); // Reset pack weight on type change
    setWeightError("");
  };

  const handleInvoiceIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvoiceId(event.target.value);
    setInvoiceIdError("");
  };

  const updateButtonStates = (updatedConsignments: any) => {
    const allWeightsEntered = updatedConsignments.every(
      (item: any) => !item.weightError && item.packWeight !== ""
    );
    setHandoverEnabled(allWeightsEntered);
    setSubmitEnabled(allWeightsEntered);
  };

  const handlePackWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const weight = parseFloat(value);
    const min = ParcelTypeWeights[selectedParcelType]?.min;
    const max = ParcelTypeWeights[selectedParcelType]?.max;

    const updatedConsignments = [...consigments];
    console.log("updatedConsignments", updatedConsignments);
    updatedConsignments[index].packWeight = value;

    if (isNaN(weight)) {
      updatedConsignments[index].weightError = "Please enter a valid number";
    } else if (weight < min || weight > max) {
      updatedConsignments[
        index
      ].weightError = `Weight must be between ${min} and ${max} kg`;
    } else {
      updatedConsignments[index].weightError = "";
    }

    setConsignments(updatedConsignments);
    updateButtonStates(updatedConsignments);
  };

  const handleHandover = async () => {
    // Logic for handover button click
    console.log("Handover clicked");
    console.log("consigments", consigments);
    const payload = {
      locationId: "115",
      consignmentId: String(consigments[0].consignmentId),
      weight: 0,
      status: "Fulfilled",
    };
    console.log("payload", payload);
    try {
      setSubmitting(true);
      const updatePackEntryResponse = await dispatch(updatePackEntry(payload));
      const response = unwrapResult(updatePackEntryResponse);
      response && toast.success(response);
      router.push("/pack-screen");

      console.log("response", response);
    } catch (error) {
      console.error("Error updating handover:", error);
    }
  };
  const handleInvoice = () => {
    // Logic for handover button click
    console.log("invoice clicked");
    setShowInvoiceModal(true);
  };
  const handleShippingLabel = () => {
    // Logic for handover button click
    console.log("label clicked");
  };
  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };

  const handleSubmit = async () => {
    const validConsignments = consigments.filter(
      (item) => !item.weightError && item.packWeight
    );

    if (validConsignments.length === 0) {
      toast.error("Please fill in all pack weights correctly");
      return;
    }
    console.log("validConsignments", validConsignments);

    const payload = validConsignments.map((item) => ({
      omsId: String(item.omsId),
      omsOrderId: item.orderId,
      consignmentId: String(item.consignmentId),
      weight: parseFloat(item.packWeight),
    }));
    console.log("payload", payload);
    try {
      setSubmitting(true);
      const updateWeightResponse = await dispatch(updateWeight(payload));
      const response = unwrapResult(updateWeightResponse);
      response && toast.success(response);
      router.push("/pack-screen");
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating weights:", error);
    }
  };

  const handleSubmitInvoiceEntered = (event: any) => {
    // Logic for submit button click
    event.preventDefault();
    console.log("invoice entered ");
    console.log("invoiceId", invoiceId);
    if (invoiceId) {
      setInvoiceIdError("");
      //call api
    } else {
      setInvoiceIdError("Invoice Id is required");
    }
  };

  const router = useRouter();
  const { consignmentid } = router.query;
  const [consignment, setConsignment] = useState(null);

  const dispatch = useAppDispatch();
  console.log("router.query", router.query);
  console.log("id", consignmentid);

  useEffect(() => {
    if (consignmentid) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const resultAction = await dispatch(
            getConsignmentsItem({
              locationId: 115,
              consignmentId: consignmentid,
            })
          );
          const data = unwrapResult(resultAction);

          const items = data.map((consignmentDetail: any) => ({
            ...consignmentDetail,
            packWeight: "",
            weightError: "",
          }));
          setConsignments(items);
          updateButtonStates(items);
          // setItemsInConsignment(items);
          console.log(data, "data for consigment");
          // Handle the data as needed
        } catch (error) {
          console.error("Failed to fetch consignment item details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [consignmentid, dispatch]);

  const openLightBox = (imageUrl: any) => {
    const imageSrc =
      imageUrl ||
      "https://sslimages.shoppersstop.com/sys-master/images/hbc/h75/29537292910622/A21DO21DEN0903W_WHITE_alt4.jpg_2000Wx3000H";
    setImages([{ src: imageSrc }]);
    setIsOpen(true);
  };
  console.log("images", images);

  console.log("consigments", consigments);
  const isStatusFulfilled =
    (consigments &&
      consigments.length &&
      consigments[0]?.status?.toLowerCase() === "fulfilled") ||
    false;

  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <>
          {loading ? <Loader size={50} color="primary" overlay={true} /> : null}

          <div
            style={{
              display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                padding: "1rem",
                width: "100%",
                // height: "90vh",
                background: "#fff",
                borderRadius: "8px",
                position: "relative",
                overflow: "auto",
              }}
            >
              {consigments.length ? (
                consigments.map((item: any, index) => (
                  <>
                    <Grid container spacing={2} key={item.consignmentId}>
                      <Grid item xs={12}>
                        <Card>
                          <CardContent
                            sx={{
                              padding: "0.5rem",
                              ":last-child": { paddingBottom: "0.5rem" },
                            }}
                          >
                            <Grid container width={"100%"}>
                              <Grid item xs={1} md={1}>
                                <div aria-hidden>
                                  <Image
                                    src={
                                      item.imageUrl ||
                                      "https://via.placeholder.com/90"
                                    }
                                    alt="Item Image"
                                    width={90}
                                    height={90}
                                    onClick={() => openLightBox(item.imageUrl)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={11} md={11}>
                                <TableContainer component={Card}>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>Sku</TableCell>
                                        <TableCell>EAN</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>CA Number</TableCell>
                                        <TableCell>Quantity to Pack</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Colour</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {/* {itemsInConsignment.map((item: any, index) => ( */}
                                      <TableRow key={index}>
                                        <TableCell>
                                          {item.productName}
                                        </TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell>{item.ean}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.caNumber}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.color}</TableCell>
                                      </TableRow>
                                      {/* // ))} */}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                                <Grid item xs={12}>
                                  <Grid container spacing={2} marginTop={2}>
                                    <Grid item>
                                      <TextField
                                        select
                                        label="Parcel Type"
                                        value={selectedParcelType}
                                        onChange={handleParcelTypeChange}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          width: "170px",
                                          "& .MuiInputBase-input": {
                                            padding: "5px",
                                          },
                                          "& fieldset legend": {
                                            display: "none",
                                          },
                                          "& label": {
                                            top: 0,
                                            display: "none",
                                          },
                                          "& .MuiInputLabel-shrink": {
                                            top: "15px",
                                          },
                                        }}
                                      >
                                        {Object.keys(ParcelTypeWeights).map(
                                          (type) => (
                                            <MenuItem key={type} value={type}>
                                              {type}
                                            </MenuItem>
                                          )
                                        )}
                                      </TextField>
                                    </Grid>
                                    {selectedParcelType && (
                                      <Grid item>
                                        <TextField
                                          label="Pack Weight (kg)"
                                          value={item.packWeight}
                                          onChange={(event: any) =>
                                            handlePackWeightChange(event, index)
                                          }
                                          variant="outlined"
                                          size="small"
                                          type="number"
                                          error={Boolean(item.weightError)}
                                          helperText={item.weightError}
                                          FormHelperTextProps={{
                                            sx: {
                                              fontSize: "10px",
                                              color: "red",
                                            },
                                          }}
                                          sx={{
                                            width: "220px",
                                            "& .MuiInputBase-input": {
                                              padding: "5px",
                                            },
                                            "& fieldset legend": {
                                              display: "none",
                                            },
                                            "& label": {
                                              top: 0,
                                              display: "none",
                                            },
                                            "& .MuiInputLabel-shrink": {
                                              top: "15px",
                                            },
                                          }}
                                          inputProps={{
                                            step: "0.1",
                                            min: ParcelTypeWeights[
                                              selectedParcelType
                                            ]?.min,
                                            max: ParcelTypeWeights[
                                              selectedParcelType
                                            ]?.max,
                                          }}

                                          // inputProps={{
                                          //   step: "0.1",
                                          //   min: ParcelTypeWeights[
                                          //     selectedParcelType
                                          //   ].min,
                                          //   max: ParcelTypeWeights[
                                          //     selectedParcelType
                                          //   ].max,
                                          // }}
                                        />
                                      </Grid>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </>
                ))
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h4">No Consignments found</Typography>
                </Box>
              )}
              {!loading && consigments.length ? (
                <Grid
                  container
                  spacing={2}
                  marginTop={2}
                  alignItems="flex-end"
                  direction="column"
                >
                  {" "}
                  {!isStatusFulfilled ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleHandover}
                        disabled={handoverEnabled}
                      >
                        Handover
                      </Button>
                    </Grid>
                  ) : null}
                  {isStatusFulfilled ? (
                    <>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleInvoice}
                        >
                          Invoice
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleShippingLabel}
                        >
                          Shipping Label
                        </Button>
                      </Grid>
                    </>
                  ) : null}
                  {!isStatusFulfilled ? (
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!submitEnabled}
                      >
                        Submit
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              ) : null}
              {isOpen && (
                <Lightbox
                  plugins={[Captions, Fullscreen, Zoom]}
                  open={isOpen}
                  close={() => setIsOpen(false)}
                  slides={images}
                />
              )}
              {showInvoiceModal ? (
                <ModalComponent
                  open={showInvoiceModal}
                  onClose={handleCloseInvoiceModal}
                  title=""
                >
                  {/* <div style={{ height: "100%" }}> */}
                  <Box
                    sx={{
                      padding: 3,
                      // height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // maxWidth: 400,
                      // margin: "auto",
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Enter Invoice ID"
                            variant="outlined"
                            error={Boolean(invoiceIdError)}
                            helperText={invoiceIdError}
                            value={invoiceId}
                            onChange={handleInvoiceIdChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            fullWidth
                            type="submit"
                            onClick={handleSubmitInvoiceEntered}
                            variant="contained"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                  {/* </div> */}
                </ModalComponent>
              ) : null}
            </div>
          </div>
        </>
      </MainLayout>
    </>
  );
};

export default ConsignmentModal;
