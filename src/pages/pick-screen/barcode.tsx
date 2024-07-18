import BarcodeScannerComponent from "@/modules/PickScreenModule/BarCodeScanner";
import { updateDropManualStatus } from "@/services/thunks/pickApis";
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

  const { omsId, pickStatus, quantity, ean, trayName, locationId } =
    router.query;
  const scanQuantity = parseInt(quantity as string, 10);

  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [manuallyDropped, setManuallyDropped] = useState(false);
  const [currentScan, setCurrentScan] = useState<number>(0);
  const [stopStream, setStopStream] = useState(false);
  const [barcode, setBarcode] = useState<string>("");
  const [manualBarcode, setManualBarcode] = useState<string>("");
  const [manualBarcodeError, showManualCodeError] = useState<string>("");

  const [data, setData] = useState("Not Found");
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    if (scannedCodes.length >= scanQuantity) {
      setStopStream(true);
    }
  }, [scannedCodes, scanQuantity]);

  const handleScan = (err: any, result: any) => {
    if (result) {
      setBarcode(result.getText());
      setStopStream(false);
    }
  };

  const handleDropMarkManual = async () => {
    if (omsId) {
      const formData = {
        omsId: Number(omsId),

        status: "Dropped",
      };
      setManuallyDropped(true);

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
            statusId: 5,
            statusDescription: "Dropped",
          },
        };
        dispatch(setSelectedFiltersForLoadPick(state));
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

  const updateStatusManually = async () => {
    if (pickStatus === "Awaiting Pick") {
      const formData = {
        omsId: Number(omsId),

        status: "Pick in Progress",
      };
      dispatch(updateDropManualStatus(formData));
      const resultAction = await dispatch(updateDropManualStatus(formData));
      const response = unwrapResult(resultAction);
      if (response.statusCode === 200) {
        toast.success(
          response.message ||
            "Something went wrong pick in progress update status"
        );
      } else {
        toast.error(
          response.message ||
            "Something went wrong pick in progress update status"
        );
      }
    }
  };
  useEffect(() => {
    updateStatusManually();
  }, []);

  const handleSubmit = () => {
    const eanForPickedStatus = `${locationId}${trayName}`;
    const isStatusPicked = pickStatus === "Picked";
    const scannedBarcode = scannedCodes[0];

    if (isStatusPicked && scannedBarcode === eanForPickedStatus) {
      showManualCodeError("");
      handleDropMarkManual();
    } else if (scannedBarcode === ean && !isStatusPicked) {
      router.push({
        pathname: "/pick-screen/productsform",
        query: {
          omsId,
          pickStatus,
          quantityToBePicked: scanQuantity,
          scannedCodes: JSON.stringify(scannedCodes),
        },
      });
    }
  };

  const handleManualSubmit = () => {
    if (manualBarcode) {
      const eanForPickedStatus = `${locationId}${trayName}`;
      const isStatusPicked = pickStatus === "Picked";

      if (isStatusPicked && manualBarcode === eanForPickedStatus) {
        showManualCodeError("");
        handleDropMarkManual();
      } else if (manualBarcode === ean && !isStatusPicked) {
        showManualCodeError("");
        const barcodeArray = [manualBarcode];
        router.push({
          pathname: "/pick-screen/productsform",
          query: {
            omsId,
            pickStatus,
            quantityToBePicked: scanQuantity,
            scannedCodes: JSON.stringify(barcodeArray),
          },
        });
      } else {
        toast.error("Barcode EAN doesn't match");
      }
    } else {
      showManualCodeError("Barcode is required");
    }
  };

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

  if (statusDropStatusError) {
    ToastError(statusDropStatusError || "Something went wrong");
  }

  return (
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
          currentScan < scanQuantity &&
          !manuallyDropped && (
            <Box>
              {!stopStream ? (
                <BarcodeScannerComponent
                  onUpdate={handleScan}
                  stopStream={stopStream}
                />
              ) : null}
              {!stopStream ? (
                <Box
                  sx={{
                    ...flex,
                    flexDirection: "column",
                    marginY: "8px",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    Scanned Barcode
                  </Typography>
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    {barcode}
                  </Typography>
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                  >
                    Next {""}
                    {currentScan + 1}/{scanQuantity}
                  </Button>
                </Box>
              ) : null}
            </Box>
          )
        )}

        {scannedCodes.length < scanQuantity ? (
          <Box
            sx={{
              alignSelf: "flex-center",

              mt: 2,
              ml: 2,
            }}
          >
            {pickStatus === "Picked" && !stopStream && (
              <Box sx={{ ...flex }}>
                <Checkbox
                  checked={manuallyDropped}
                  onChange={handleDropMarkManual}
                />
                <Typography variant="body2">
                  Mark as Dropped Manually
                </Typography>
              </Box>
            )}
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
                  onChange={(e) => setManualBarcode(e.target.value)}
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

        {scannedCodes.length >= scanQuantity && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6">Scanned Barcodes</Typography>
            {scannedCodes.map((code, index) => (
              <Typography key={index} variant="body2">
                {code}
              </Typography>
            ))}

            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        )}

        {/* <button onClick={() => setTorchOn(!torchOn)}>
            Switch Torch {torchOn ? "Off" : "On"}
          </button> */}
      </div>
    </div>
  );
};
export default BarcodeScanner;
