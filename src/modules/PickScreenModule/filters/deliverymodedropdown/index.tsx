import CustomSelect from "@/component/atoms/customSelect";
import { useAppDispatch } from "@/store/hooks";
import { setDeliveryMode } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";

const data = [
  { label: "deliverymode1", value: "deliverymode1" },
  { label: "deliverymode2", value: "deliverymode2" },
  { label: "deliverymode3", value: "deliverymode3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export interface DeliveryMode {
  // deliveryModeId: string;
  deliveryModeName: string;
}

interface DeliveryModeDropdownProps {
  deliveryModeFilters: DeliveryMode[];
  selectedDeliveryMode: DeliveryMode;
  setSelectedDeliveryMode: (deliveryMode: DeliveryMode) => void;
}

const DeliveryModeDropDown = ({
  deliveryModeFilters,
  selectedDeliveryMode,
  setSelectedDeliveryMode,
}: DeliveryModeDropdownProps) => {
  const dispatch = useAppDispatch();
  // const [selectedDeliveryMode, setSelectedDeliveryMode] = useState<string>("");

  // const selectedDeliveryMode = useAppSelector(
  //   (state) => state.filters?.deliveryMode
  // );
  const deliveryModeFiltersForDropdown = deliveryModeFilters?.map(
    (deliveryMode: any) => ({
      label: deliveryMode.deliveryModeName,
      value: deliveryMode.deliveryModeName,
    })
  );
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setSelectedDeliveryMode(e.target.value as string);
    // dispatch(setDeliveryMode(e.target.value));
    const selectedOption = deliveryModeFiltersForDropdown.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      setSelectedDeliveryMode({
        // deliveryModeId: selectedOption.value,
        deliveryModeName: selectedOption.label,
      });
      dispatch(setDeliveryMode(e.target.value));
    }
  };

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>Delivery Mode</Typography>
      <CustomSelect
        {...{
          data: deliveryModeFiltersForDropdown,
          value: selectedDeliveryMode.deliveryModeName,
          handleOnChange,
          label: "Select",
          selectSx: {
            width: "170px",
            "& .MuiSelect-outlined": {
              padding: "6px",
            },
            "& .MuiInputLabel-shrink": {
              top: "0px",
            },
            "& label": {
              top: "-10px",
            },
            "& .Mui-focused": {
              top: "0",
            },
          },
        }}
      />
    </Box>
  );
};

export default DeliveryModeDropDown;
