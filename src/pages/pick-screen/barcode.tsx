import BarcodeScannerComponent from "@/modules/PickScreenModule/BarCodeScanner";
import {
  submitFormData,
  updateDropManualStatus,
} from "@/services/thunks/pickApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedFiltersForLoadPick } from "@/store/slices/filterSlice";
import {
  resetDropStatusState,
  selecDropStatusError,
  selecDropStatusSuccess,
  selectDropStatusLoading,
} from "@/store/slices/formSlice";
import { ToastError } from "@/utils/toast";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfoIcon from "@mui/icons-material/Info";
import { blue } from "@mui/material/colors";
import ToastMessage from "@/component/molecules/ToastInfoMessage";
import { SubmitFormData } from "@/types/productdetails";

const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BarcodeScanner = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const statusDropStatusLoading = useAppSelector(selectDropStatusLoading);
  const statusDropStatusError = useAppSelector(selecDropStatusError);
  const statusDropSuccess = useAppSelector(selecDropStatusSuccess);

  const {
    omsId,
    pickStatus,
    quantity,
    ean,
    trayName,
    locationId,
    productName,
    color,
    skuSize,
  } = router.query;
  console.log("router.query", router.query);
  const scanQuantity = parseInt(quantity as string, 10);

  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [pickFailed, setPickFailed] = useState(false);

  const [currentScan, setCurrentScan] = useState<number>(0);
  const [stopStream, setStopStream] = useState(false);
  const [barcode, setBarcode] = useState<string>("");
  const [manualBarcode, setManualBarcode] = useState<string>("");
  const [manualQuantityPicked, setManualQuantityPicked] = useState<string>("");

  const [manualBarcodeError, showManualCodeError] = useState<string>("");

  const [data, setData] = useState("Not Found");
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    if (scannedCodes.length >= scanQuantity) {
      setStopStream(true);
    }
  }, [scannedCodes, scanQuantity]);

  const handleNext = () => {
    if (barcode) {
      const eanForPickedStatus = `${locationId}${trayName}`;
      const checkBarcodeCondition =
        pickStatus === "Picked"
          ? barcode === eanForPickedStatus
          : barcode === ean;
      if (checkBarcodeCondition) {
        setScannedCodes((prev) => [...prev, barcode]);
        setBarcode("");
        setCurrentScan((prev) => prev + 1);
        setStopStream(false);
      } else {
        toast.error("Barcode EAN doesn't match");
      }
    } else {
      toast.error("Scan the barcode to continue");
    }
  };

  const handleScan = (err: any, result: any) => {
    if (result) {
      const scannedBarcode = result.getText();
      setBarcode(scannedBarcode);
      // setStopStream(false);
      if (scannedBarcode) {
        const isStatusPicked = pickStatus === "Picked";

        const eanForPickedStatus = `${locationId}${trayName}`;
        if (isStatusPicked && scannedBarcode === eanForPickedStatus) {
          showManualCodeError("");
          handleDropMarkManual();
        } else if (scannedBarcode === ean && !isStatusPicked) {
          setScannedCodes((prev) => [...prev, scannedBarcode]);
          setBarcode("");
          // setCurrentScan((prev) => prev + 1);
          setCurrentScan((prev) => {
            const newScanCount = prev + 1;

            if (newScanCount < scanQuantity) {
              ToastMessage({
                message: `Scanned ${newScanCount}/${scanQuantity} quantity`,
              });
            }

            if (newScanCount >= scanQuantity) {
              toast.success("All items have been scanned successfully!");
            }
            return newScanCount;
          });
          setStopStream(false);
        } else {
          toast.error("Barcode EAN doesn't match");
        }
      } else {
        toast.error("Scan the barcode to continue");
      }
    }
  };

  const handlePickFailed = () => {
    if (omsId) {
      const barcodeArray = [ean];

      setPickFailed(true);
      router.push({
        pathname: "/pick-screen/productsform",
        query: {
          omsId,
          pickStatus,
          quantityToBePicked: 0,
          scannedCodes: JSON.stringify(barcodeArray),
        },
      });
    }
  };

  const handleDropMarkManual = async () => {
    if (omsId) {
      const formData = {
        omsId: Number(omsId),

        status: "Dropped",
      };

      const resultAction = await dispatch(updateDropManualStatus(formData));
      const response = unwrapResult(resultAction);
      console.log("response", response);
      if (response.statusCode === 200) {
        toast.success(
          response.message ||
            "Something went wrong while updating status on barcode"
        );
        const state = {
          estimatedShip: "",
          status: {
            statusId: 4,
            statusDescription: "Dropped",
          },
        };
        dispatch(setSelectedFiltersForLoadPick(state));
        dispatch(resetDropStatusState());

        router.push({
          pathname: "/pick-screen/itemlist",
        });
      } else {
        toast.error(
          response.message ||
            "Something went wrong while updating status on barcode"
        );
      }
    }
  };

  const handleSubmitFormData = async (formData: SubmitFormData) => {
    console.log("formData", formData);
    const statusToBeUpdatedCount = 3;

    try {
      const resultAction = await dispatch(submitFormData(formData));
      const response = unwrapResult(resultAction);

      if (response.statusCode === 200) {
        const state = {
          estimatedShip: "",
          status: {
            statusId: statusToBeUpdatedCount,
            statusDescription: formData.status,
          },
        };
        dispatch(setSelectedFiltersForLoadPick(state));
        toast.success(response.message || "Form submitted successfully!");
        dispatch(resetDropStatusState());
        router.push({
          pathname: "/pick-screen/itemlist",
        });
      } else {
        toast.error(
          response.message || "Something went wrong while submitting form"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred while submitting the form.");
    }
  };

  const handleSubmit = async () => {
    const isStatusPicked = pickStatus === "Picked";
    const scannedBarcode = scannedCodes[0];

    if (scannedBarcode === ean && !isStatusPicked) {
      const statusToBeUpdated = "Picked";
      const qcFlagToBeUpdated = "QC Pass";
      const formData = {
        omsId: Number(omsId),
        status: statusToBeUpdated || "",
        additionalDamage: 0,
        quantityToBePicked: Number(scanQuantity) || 0,
        qcFlag: qcFlagToBeUpdated,
        quantityPicked: Number(scanQuantity) || 0,
      };
      await handleSubmitFormData(formData);
    }
  };

  const handleManualSubmit = async () => {
    if (manualBarcode && manualQuantityPicked) {
      const eanForPickedStatus = `${locationId}${trayName}`;
      const isStatusPicked = pickStatus === "Picked";

      if (isStatusPicked && manualBarcode === eanForPickedStatus) {
        showManualCodeError("");
        handleDropMarkManual();
      } else if (manualBarcode === ean && !isStatusPicked) {
        if (
          Number(manualQuantityPicked) < scanQuantity ||
          Number(manualQuantityPicked) > scanQuantity
        ) {
          toast.error(
            "Please enter correct quanity or select pick fail status"
          );
          return;
        } else {
          showManualCodeError("");
          const barcodeArray = [manualBarcode];

          const statusToBeUpdated = "Picked";
          const qcFlagToBeUpdated = "QC Pass";
          const formData = {
            omsId: Number(omsId),
            status: statusToBeUpdated || "",
            additionalDamage: 0,
            quantityToBePicked: Number(scanQuantity) || 0,
            qcFlag: qcFlagToBeUpdated,
            quantityPicked: Number(manualQuantityPicked) || 0,
          };
          console.log("formData", formData);
          await handleSubmitFormData(formData);
        }
      } else {
        toast.error("Barcode EAN doesn't match");
      }
    } else {
      showManualCodeError("Please fill in all the fields");
    }
  };
  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setManualBarcode(value);
    showManualCodeError("");
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value", value);
    if (/^\d*$/.test(value)) {
      setManualQuantityPicked(value);
      showManualCodeError("");
    }
  };

  if (statusDropStatusError) {
    ToastError(statusDropStatusError || "Something went wrong");
  }

  console.log("statusDropStatusLoading", statusDropStatusLoading);
  console.log(
    "!statusDropStatusLoading && scannedCodes.length >= scanQuantity ",
    !statusDropStatusLoading && scannedCodes.length >= scanQuantity
  );

  return (
    <>
      <div>
        <Head>
          <title>OMS Panel</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          {statusDropStatusLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            currentScan < scanQuantity && (
              <Box>
                {!stopStream ? (
                  <BarcodeScannerComponent
                    onUpdate={handleScan}
                    stopStream={stopStream}
                  />
                ) : null}
              </Box>
            )
          )}

          {!statusDropStatusLoading && scannedCodes.length < scanQuantity ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              {!stopStream ? (
                <Button
                  sx={{ textDecoration: "underline", padding: 0 }}
                  onClick={() => setStopStream(true)}
                >
                  Not Able to Scan?
                </Button>
              ) : (
                <Button
                  sx={{
                    textDecoration: "underline",
                    padding: 0,
                    marginBottom: "1rem",
                  }}
                  onClick={() => setStopStream(false)}
                >
                  Able to Scan ?
                </Button>
              )}
              {/* {pickStatus === "Picked" && !stopStream && (
                <Box sx={{ ...flex }}>
                  <Button
                    onClick={handleDropMarkManual}
                    variant="contained"
                    color="primary"
                  >
                    {" "}
                    Mark as Dropped Manually
                  </Button>
                </Box>
              )} */}
              {!stopStream && pickStatus !== "Picked" && (
                <Box sx={{ ...flex }}>
                  <Checkbox checked={pickFailed} onChange={handlePickFailed} />
                  <Typography variant="h6" color="error">
                    Mark as Pick Failed
                  </Typography>
                </Box>
              )}
              {stopStream && (
                <Box
                  sx={{
                    display: "flex",

                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    label="Enter Barcode"
                    value={manualBarcode}
                    onChange={handleBarcodeChange}
                    variant="outlined"
                  />
                  <TextField
                    label="Enter Picked Quantity"
                    value={manualQuantityPicked}
                    onChange={handleQuantityChange}
                    variant="outlined"
                  />
                  {manualBarcodeError && (
                    <Typography color="error" sx={{ marginTop: "0.5rem" }}>
                      {manualBarcodeError}
                    </Typography>
                  )}
                  <Button
                    onClick={handleManualSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          ) : null}

          {/* <button onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </button> */}
          {scannedCodes.length >= scanQuantity && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Typography variant="h6">Scanned Barcodes</Typography>
              {scannedCodes.map((code, index) => (
                <Typography key={index} variant="body2">
                  {scannedCodes.length > 1 ? `${index + 1}. ${code}` : code}
                </Typography>
              ))}

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};
export default BarcodeScanner;
