import * as React from "react";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";
import { SxProps } from "@mui/material";

interface ClearableDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  sx?: SxProps;
  [key: string]: any;
}

const ClearableDatePicker: React.FC<ClearableDatePickerProps> = ({
  label,
  value,
  onChange,
  sx,
  ...rest
}) => {
  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          ...sx,
        }}
      >
        <DesktopDatePicker
          label={label}
          sx={{ width: "100%" }}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => setCleared(true),
            },
          }}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          {...rest}
        />

        {cleared && (
          <Alert
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            severity="success"
          >
            Field cleared!
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default ClearableDatePicker;
