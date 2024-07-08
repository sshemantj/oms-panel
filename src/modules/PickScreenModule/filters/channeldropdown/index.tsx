import CustomSelect from "@/component/atoms/customSelect";
import { useAppDispatch } from "@/store/hooks";
import { setChannel } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";

const data = [
  { label: "channel1", value: "channel1" },
  { label: "channel2", value: "channel2" },
  { label: "channel3", value: "channel3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

interface Channel {
  channelId: number;
  channelName: string;
}

interface ChannelDropdownProps {
  channelFilters: Channel[];
  selectedChannel: Channel;
  setSelectedChannel: (channel: Channel) => void;
}

const ChannelDropDown = ({
  channelFilters,
  selectedChannel,
  setSelectedChannel,
}: ChannelDropdownProps) => {
  const dispatch = useAppDispatch();
  // const [selectedChannel, setSelectedChannel] = useState<string>("");

  // const selectedChannel = useAppSelector((state) => state.filters?.channel);
  const channelFiltersForDropdown = channelFilters?.map((channel: any) => ({
    label: channel.channelName,
    value: channel.channelId,
  }));
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setSelectedChannel(e.target.value);
    // dispatch(setChannel(e.target.value));
    const selectedOption = channelFiltersForDropdown.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      setSelectedChannel({
        channelId: selectedOption.value,
        channelName: selectedOption.label,
      });
      dispatch(setChannel(e.target.value));
    }
  };

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>Channel</Typography>
      <CustomSelect
        {...{
          data: channelFiltersForDropdown,
          value: selectedChannel.channelId,
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

export default ChannelDropDown;
