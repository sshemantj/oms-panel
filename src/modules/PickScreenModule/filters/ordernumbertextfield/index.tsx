import { useAppDispatch } from "@/store/hooks";
import { setOrderNumber } from "@/store/slices/filterSlice";
import { Box, TextField, Typography } from "@mui/material";

const data = [
  { label: "orderno1", value: "orderno1" },
  { label: "orderno2", value: "orderno2" },
  { label: "orderno3", value: "orderno3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

interface OrderNumberTextInputProps {
  // deliveryModeFilters: EsimatedShipDate;
  orderNumber: string;
  setUserEnteredOrderNumber: (deliveryMode: string) => void;
}

const OrderNumberTextInput = ({
  setUserEnteredOrderNumber,
  orderNumber,
}: OrderNumberTextInputProps) => {
  // const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>Order Number</Typography>
      <TextField
        id="outlined-basic"
        type="number"
        size="small"
        value={orderNumber}
        // onChange={(e) => handleNumberChange(1, "Id", e.target.value)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUserEnteredOrderNumber(event.target.value);
          dispatch(setOrderNumber(event.target.value));
        }}
        sx={{ width: "55%" }}
        label="Enter Order No"
        variant="outlined"
      />
    </Box>
  );
};

export default OrderNumberTextInput;
