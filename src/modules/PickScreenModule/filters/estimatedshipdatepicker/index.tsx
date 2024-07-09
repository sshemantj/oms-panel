import { useAppDispatch } from "@/store/hooks";
import { setEstimatedShip } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Dayjs } from "dayjs";

const data = [
  { label: "date1", value: "date1" },
  { label: "date2", value: "date2" },
  { label: "date3", value: "date3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// interface EsimatedShipDate {
//   etd: string;
// }

interface EstimatedShipDatePickerProps {
  // deliveryModeFilters: EsimatedShipDate;
  selectedEstimatedDate: Dayjs | null;
  setSelectedEstimatedDate: (date: Dayjs | null) => void;
}

const EstimatedShipDatePicker = ({
  selectedEstimatedDate,
  setSelectedEstimatedDate,
}: EstimatedShipDatePickerProps) => {
  // const [etd, setEtd] = useState(dayjs("2022-04-17"));
  const dispatch = useAppDispatch();

  const handleOnChange = (date: any) => {
    setSelectedEstimatedDate(date);
    dispatch(setEstimatedShip(date));
  };

  console.log("selectedEstimatedDate", selectedEstimatedDate);

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>ETD</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={selectedEstimatedDate}
          onChange={handleOnChange}
          // minDate={dayjs()}
          // defaultValue={dayjs("2022-04-17")}
          sx={{
            width: "55%",
            ".MuiInputBase-input": { padding: 1 },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default EstimatedShipDatePicker;
