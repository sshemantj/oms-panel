import CustomModal from "@/component/molecules/CustomModal";
import Loader from "@/component/molecules/Loader";
import { sendOtp, validateOTP } from "@/services/thunks/customerCollectionApis";
import { useAppDispatch } from "@/store/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, TextField, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConsigmentId: string;
  selectedOmsOrderId: string;
  onSuccess?: () => void;
}

const GenerateOtpModal = (props: IProps) => {
  const {
    openModal,
    setOpenModal,
    selectedConsigmentId,
    onSuccess,
    selectedOmsOrderId,
  } = props;

  const [mobileNumber, setMobileNumber] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDownloadPDF = async (shipmentNo: string) => {
    const config: any = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_PREPROD_API_BASE_URL}/PDF/GetInvoice?shipmentno=${shipmentNo}`,
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...",
      },
      responseType: "blob",
    };

    axios(config)
      .then((response: any) => {
        console.log("response pdf", response);

        const blob = new Blob([response.data], { type: "application/pdf" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice_${shipmentNo}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
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
      });
  };
  console.log("selectedConsigmentId", selectedConsigmentId);

  const handleValidateOtp = async (e: any) => {
    e.preventDefault();
    if (!generatedOtp) {
      toast.error("Otp is required ");
      return;
    }
    if (!mobileNumber) {
      toast.error("Mobile Number is required ");
      return;
    }
    if (selectedConsigmentId) {
      const otpDetail = {
        shipmentNo: selectedConsigmentId,

        otp: generatedOtp,
        mobileNo: mobileNumber,
      };
      try {
        setLoading(true);

        const resultAction = await dispatch(validateOTP(otpDetail));
        const generatedData = resultAction.payload;
        console.log("generatedData", generatedData);
        if (generatedData.result) {
          toast.success("OTP Validated Successfully");

          await handleDownloadPDF(selectedConsigmentId);
          handleClose();
          if (onSuccess) await onSuccess();
        } else if (!generatedData.result) {
          toast.error(generatedData.message);
        }
      } catch (error) {
        console.error("Failed to Validate Otp:", error);
        toast.error("Failed to Validate Otp");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex to match exactly 10 digits
    const regex = /^[0-9]{0,10}$/;

    if (regex.test(value) || value === "") {
      setMobileNumber(value);
    }
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex to match exactly 4 digits
    const regex = /^[0-9]{0,4}$/;

    if (regex.test(value) || value === "") {
      setGeneratedOtp(value);
    }
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setGeneratedOtp("");
    setMobileNumber("");
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    if (!mobileNumber) {
      toast.error("Mobile Number is required ");
      return;
    }
    try {
      if (selectedConsigmentId && selectedOmsOrderId) {
        const resultAction = await dispatch(
          sendOtp({
            mobileNo: mobileNumber,
            omsOrderId: selectedOmsOrderId,
            shipmentNo: selectedConsigmentId,
          })
        );
        const response = unwrapResult(resultAction);
        console.log("response", response);
        setIsTimerActive(true);
        setTimer(60);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  return (
    <>
      <CustomModal open={openModal} setOpen={setOpenModal} showClose={false}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {loading ? <Loader size={50} color="primary" overlay={true} /> : null}
          <div
            style={{
              padding: "0 1rem",
              width: "600px",
              height: "300px",
              background: "#fff",
              position: "relative",
            }}
          >
            <Typography sx={{ marginTop: "2rem" }} color={"grey"} variant="h5">
              Validate OTP
            </Typography>
            <div
              style={{
                margin: "0 0 0 2rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  margin: "1rem 0 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "2rem",
                  flexDirection: "column",
                }}
              >
                <TextField
                  sx={{
                    width: "400px",
                    "& input": {
                      padding: "8px",
                    },
                  }}
                  type="text"
                  required
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
                <TextField
                  sx={{
                    width: "400px",
                    "& input": {
                      padding: "8px",
                    },
                  }}
                  type="text"
                  required
                  placeholder="Otp"
                  value={generatedOtp}
                  onChange={handleOtpChange}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "1rem",
                }}
              >
                <Button
                  onClick={(e) => handleValidateOtp(e)}
                  variant="contained"
                  color="info"
                >
                  VALIDATE OTP
                </Button>
                <Button onClick={handleClear} variant="contained" color="info">
                  CLEAR
                </Button>
                <Button
                  onClick={handleSendOtp}
                  variant="contained"
                  color="info"
                  disabled={isTimerActive}
                >
                  RESEND OTP {isTimerActive && `(${timer})`}
                </Button>
              </Box>
            </div>
            <CloseIcon
              onClick={() => handleClose()}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.5rem",
                opacity: 0.5,
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default GenerateOtpModal;
