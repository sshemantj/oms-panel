import CustomSelect from "@/component/atoms/customSelect";
import { useAppDispatch } from "@/store/hooks";
import { setStatus } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";

const data = [
  { label: "status1", value: "status1" },
  { label: "status2", value: "status2" },
  { label: "status3", value: "status3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export interface PickStatus {
  statusId: number;
  statusDescription: string;
}

interface StatusDropdownProps {
  pickStatusFilters: PickStatus[];
  selectedPickStatus: PickStatus;
  setSelectedPickStatus: (status: PickStatus) => void;
  showRequiredError: string;
  setError: (error: string) => void;
}

const StatusDropdown = ({
  pickStatusFilters,
  selectedPickStatus,
  setSelectedPickStatus,
  showRequiredError,
  setError,
}: StatusDropdownProps) => {
  const dispatch = useAppDispatch();
  // const [selectedPickStatus, setSelectedPickStatus] = useState<string>("");

  // const selectedstatus = useAppSelector((state) => state.filters?.status);
  const pickStatusFiltersForDropdown = pickStatusFilters?.map(
    (pickStatus: any) => ({
      label: pickStatus.statusDescription,
      value: pickStatus.statusId,
    })
  );
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setSelectedPickStatus(e.target.value);
    // dispatch(setStatus(e.target.value));
    const selectedOption = pickStatusFiltersForDropdown.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      setSelectedPickStatus({
        statusId: selectedOption.value,
        statusDescription: selectedOption.label,
      });
      dispatch(setStatus(e.target.value));
      setError("");
    }
  };
  console.log("selectedPickStatus", selectedPickStatus);

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>Status</Typography>
      <Box>
        <CustomSelect
          {...{
            data: pickStatusFiltersForDropdown,
            value: selectedPickStatus.statusId,
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

        {showRequiredError && (
          <Typography color="error" sx={{ marginTop: "0.5rem" }}>
            {showRequiredError}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StatusDropdown;
