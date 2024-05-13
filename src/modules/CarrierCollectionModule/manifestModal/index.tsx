import CustomModal from "@/component/molecules/CustomModal";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManifestModal = (props: IProps) => {
  const { openModal, setOpenModal } = props;
  const router = useRouter();

  const handleClose = () => {
    setOpenModal(false);
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
                  required
                  placeholder="Associate Name"
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
                  // onClick={() => handleLogin()}
                  variant="contained"
                  color="info"
                >
                  GENERATE
                </Button>
                <Button
                  //   onClick={() => setOpenModal(false)}
                  variant="contained"
                  color="info"
                >
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
