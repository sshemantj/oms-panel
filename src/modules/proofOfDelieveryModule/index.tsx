import { Box, Typography } from "@mui/material";

const flexNoJustify = {
  display: "flex",
  alignContent: "center",
  gap: "4px",
};

const ProofOfDelieveryModule = () => {
  return (
    <Box
      id="proofOfDelivery"
      sx={{ marginTop: "1rem", padding: "1rem", background: "#fff" }}
    >
      <Box>
        <Typography fontWeight={600} mb={3} variant="h5">
          Proof Of Delivery
        </Typography>
        <Box
          sx={{
            borderTop: "1px solid #000",
            borderBottom: "1px solid #000",
            padding: "1rem 0",
            ...flexNoJustify,
            gap: "2rem",
          }}
        >
          <Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Carrier:
              </Typography>
              <Typography variant="subtitle1">XPRESSBEES</Typography>
            </Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Vehical Number:
              </Typography>
              <Typography variant="subtitle1">MH-04-BZ-123</Typography>
            </Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Transport Associate:
              </Typography>
              <Typography variant="subtitle1">
                Sachin (Mobile - 9866878668)
              </Typography>
            </Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Packages:
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Date:
              </Typography>
              <Typography variant="subtitle1">
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Handover Stage:
              </Typography>
              <Typography variant="subtitle1">FORWARD</Typography>
            </Box>
            <Box sx={flexNoJustify}>
              <Typography fontWeight={600} variant="subtitle1">
                Report Id:
              </Typography>
              <Typography variant="subtitle1">{483748378437}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "1rem",
            "& table, & td, & td": {
              border: "1px solid black",
              "border-collapse": "collapse",
            },
            "& table tr": {
              padding: "1rem",
            },
          }}
        >
          <table>
            <tr>
              <th>S No.</th>
              <th>Tracking No.</th>
            </tr>
            <tr>
              <td>1</td>
              <td>787777988889</td>
            </tr>
            <tr>
              <td>2</td>
              <td>732323232989</td>
            </tr>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default ProofOfDelieveryModule;
