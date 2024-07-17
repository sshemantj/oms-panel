import CustomModal from "@/component/molecules/CustomModal";
import Loader from "@/component/molecules/Loader";
import { generateManifestOrder } from "@/services/thunks/carrierCollectionsApis";
import { useAppDispatch } from "@/store/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, TextField, Typography } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedManifestRows: GridRowSelectionModel;
  onSuccess?: () => void;
}

const ManifestModal = (props: IProps) => {
  const { openModal, setOpenModal, selectedManifestRows, onSuccess } = props;

  const [associateName, setAssociateName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDownloadPDF = async (reportId: string) => {
    const config: any = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/PDF/GetManifest?ReportId=${reportId}`,
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
        a.download = `Manifest_${reportId}.pdf`;
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

  const handleGenerateClick = async (e: any) => {
    e.preventDefault();
    if (!vehicleNumber) {
      toast.error("Vehicle Number is required ");
      return;
    }
    if (!associateName) {
      toast.error("Associate Name is required ");
      return;
    }
    if (selectedManifestRows.length) {
      const manifestDetailSelected: any = selectedManifestRows;
      const manifestDetails = manifestDetailSelected.map((manifest: any) => ({
        ...manifest,
        vehicle: vehicleNumber,
        associateName: associateName,
      }));
      try {
        setLoading(true);

        const resultAction = await dispatch(
          generateManifestOrder({ manifestDetails })
        );
        const generatedData = resultAction.payload;
        if (generatedData.result) {
          handleClose();
          if (onSuccess) await onSuccess();

          toast.success("Manifest generated successfully");

          const reportId = generatedData.reportId;
          await handleDownloadPDF(reportId);
        } else {
          toast.error(generatedData.message);
        }
      } catch (error) {
        console.error(
          "Failed to generate manifest order or download PDF:",
          error
        );
        toast.error("Failed to generate manifest order or download PDF");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAssociateNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Regex to allow only text characters (letters and spaces)
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(value) || value === "") {
      setAssociateName(value);
    }
  };

  const handleClear = (e: any) => {
    e.preventDefault();
    setAssociateName("");
    setVehicleNumber("");
  };

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
              Update Transport Associate Details
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
                  placeholder="Associate Name"
                  value={associateName}
                  onChange={handleAssociateNameChange}
                />
                <TextField
                  sx={{
                    width: "400px",
                    "& input": {
                      padding: "8px",
                    },
                  }}
                  required
                  placeholder="Vehicle Number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
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
                  onClick={(e) => handleGenerateClick(e)}
                  variant="contained"
                  color="info"
                >
                  GENERATE
                </Button>
                <Button onClick={handleClear} variant="contained" color="info">
                  CLEAR
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

export default ManifestModal;
