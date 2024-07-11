import SelectDropdown from "@/component/atoms/selectDropdown";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import PackScreenTable from "./PackTable";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownState {
  brand: string;
  tray: string;
  deliveryMode: string;
  category: string;
}

type DropdownAction = { type: keyof DropdownState; value: string };

interface CustomCardProps {
  title: string;
  number: number;
}

const commonSelectSx = {
  width: "170px",
  "& .MuiInputBase-input": {
    padding: "5px",
  },
  "& fieldset legend": {
    display: "none",
  },
  "& label": {
    top: 0,
    display: "none",
  },
  "& .MuiInputLabel-shrink": {
    top: "15px",
  },
};

const initialDropdownState: DropdownState = {
  brand: "",
  tray: "",
  deliveryMode: "",
  category: "",
};
const dropdownReducer = (state: DropdownState, action: DropdownAction) => ({
  ...state,
  [action.type]: action.value,
});

const CustomCard = ({ title, number }: CustomCardProps) => (
  <Box justifyContent={"center"} padding="1rem">
    <Typography variant="h6" align="center" color="red">
      {title}
    </Typography>
    <Card style={{ maxWidth: "25%", margin: "0 auto", borderRadius: "10px" }}>
      <CardContent
        sx={{
          padding: "0.5rem",

          ":last-child": {
            paddingBottom: "0.5rem",
          },
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" align="center">
          {number}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);
const PackScreenStage = () => {
  const [state, dispatch] = useReducer(dropdownReducer, initialDropdownState);
  const { userChannelMappings } = useAppSelector((state) => state.dashboard);
  const channelMappingsArr =
    (Array.isArray(userChannelMappings) &&
      userChannelMappings?.map((item: any) => {
        return {
          label: item.channelName,
          value: item.channelId,
        };
      })) ||
    [];

  // useGetPickFiltersQuery

  const handleDropdownChange =
    (type: keyof DropdownState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type, value: event.target.value });
    };

  const handleSubmit = () => {
    const selectedValues = {
      brand: state.brand,
      tray: state.tray,
      deliveryMode: state.deliveryMode,
      category: state.category,
    };
    console.log("Selected Values:", selectedValues);
    // Add your logic to send these values to an API or handle them as needed
  };

  return (
    <>
      <Grid container spacing={3} padding={4}>
        {/* Left Grid with Dropdowns */}
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={2}
            paddingTop={0.5}
            justifyContent={"center"}
          >
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Brand"
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: state.brand ? 0 : "-12px",
                    display: state.brand ? "none" : "unset",
                  },
                }}
                value={state.brand}
                handleOnChange={handleDropdownChange("brand")}
                data={channelMappingsArr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Tray"
                value={state.tray}
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: state.tray ? 0 : "-12px",
                    display: state.tray ? "none" : "unset",
                  },
                }}
                handleOnChange={handleDropdownChange("tray")}
                data={channelMappingsArr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Delivery Mode"
                value={state.deliveryMode}
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: state.deliveryMode ? 0 : "-12px",
                    display: state.deliveryMode ? "none" : "unset",
                  },
                }}
                handleOnChange={handleDropdownChange("deliveryMode")}
                data={channelMappingsArr}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Category"
                value={state.category}
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: state.category ? 0 : "-12px",
                    display: state.category ? "none" : "unset",
                  },
                }}
                handleOnChange={handleDropdownChange("category")}
                data={channelMappingsArr}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              marginRight={"6rem"}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Grid with Cards */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4 px",
            }}
          >
            <Grid item xs={6} border={2} borderRadius={1} borderColor={"red"}>
              <CustomCard title="Pick in Progress" number={10} />
            </Grid>
            <Grid
              item
              xs={6}
              border={2}
              borderRadius={1}
              borderColor={"red"}
              ml={2}
            >
              <CustomCard title="Dropped" number={5} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <PackScreenTable />
      </Box>
    </>
  );
};
export default PackScreenStage;
