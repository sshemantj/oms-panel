import { pickFilters } from "@/services/thunks/pickApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { filterReducer, initialFilterState } from "@/utils/filterReducer";

import { setSelectedFiltersForLoadPick } from "@/store/slices/filterSlice";
import { Box, Button, Paper, Typography, styled } from "@mui/material";
import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import BrandDropDown, { Brand } from "./filters/branddropdown";
import ChannelDropDown from "./filters/channeldropdown";
import DeliveryModeDropDown, {
  DeliveryMode,
} from "./filters/deliverymodedropdown";
import EstimatedShipDatePicker from "./filters/estimatedshipdatepicker";
import OrderNumberTextInput from "./filters/ordernumbertextfield";
import StatusDropdown, { PickStatus } from "./filters/statusdropdown";
import styles from "./pickScreen.module.scss";
import { getStoreIdFromCookie } from "@/utils/cookies";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PickScreenModule() {
  const router = useRouter();

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [state, stateDispatch] = useReducer(filterReducer, initialFilterState);
  const filters = useAppSelector((state) => state.filters.pickFilters);

  useEffect(() => {
    const locationId = getStoreIdFromCookie();
    if (locationId) dispatch(pickFilters(locationId));
  }, []);

  const handleSubmit = () => {
    if (state.status.statusDescription) {
      setError("");

      dispatch(setSelectedFiltersForLoadPick(state));
      router.push("/pick-screen/itemlist");
    } else {
      setError("Status is required");
    }
  };
  return (
    <Box className={`${styles.pickScreenWrapper} `}>
      <Box
        className="h-screen"
        sx={{
          width: "100%",
          marginTop: "1rem",
          padding: "0 1rem 1rem 1rem",
          background: "#fff",
        }}
      >
        <Box sx={{ ...flex, justifyContent: "space-between" }}>
          <Box sx={{ ...flex, width: "100%", justifyContent: "space-between" }}>
            <Box sx={{ ...flex, gap: "0.5rem" }}>
              <Typography fontWeight={600}>
                Choose your filters to populate pick list{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          {/* <Filters filters={filters} />
           */}
          <BrandDropDown
            brandFilters={filters?.brands as Brand[]}
            selectedBrand={state.brand}
            setSelectedBrand={(brand: { brandName: string }) =>
              stateDispatch({ type: "SET_SELECTED_BRAND", payload: brand })
            }
          />
          {/* <CategoryDropDown
            categoryFilters={filters?.categories}
            selectedCategory={state.category}
            setSelectedCategory={(category: {
              categoryId: string;
              categoryName: string;
            }) =>
              stateDispatch({
                type: "SET_SELECTED_CATEGORY",
                payload: category,
              })
            }
          /> */}
          <ChannelDropDown
            channelFilters={filters?.channels}
            selectedChannel={state.channel}
            setSelectedChannel={(channel: {
              channelId: number;
              channelName: string;
            }) =>
              stateDispatch({ type: "SET_SELECTED_CHANNEL", payload: channel })
            }
          />
          <DeliveryModeDropDown
            deliveryModeFilters={filters?.deliveryMode as DeliveryMode[]}
            selectedDeliveryMode={state.deliveryMode}
            setSelectedDeliveryMode={(deliveryMode: {
              deliveryModeName: string;
            }) =>
              stateDispatch({
                type: "SET_SELECTED_DELIVERY_MODE",
                payload: deliveryMode,
              })
            }
          />
          <EstimatedShipDatePicker
            selectedEstimatedDate={state.estimatedShip}
            setSelectedEstimatedDate={(date: Dayjs | null) =>
              stateDispatch({
                type: "SET_SELECTED_ESTIMATED_SHIP",
                payload: date as any,
              })
            }
          />
          <OrderNumberTextInput
            orderNumber={state.orderNumber}
            setUserEnteredOrderNumber={(orderNumber: string) =>
              stateDispatch({ type: "SET_ORDER_NUMBER", payload: orderNumber })
            }
          />
          <StatusDropdown
            pickStatusFilters={filters?.pickStatus as PickStatus[]}
            selectedPickStatus={state.status}
            showRequiredError={error}
            setError={setError}
            setSelectedPickStatus={(status: {
              statusId: number;
              statusDescription: string;
            }) => stateDispatch({ type: "SET_PICK_STATUS", payload: status })}
          />
        </Box>
        <Box sx={{ ...flex }}>
          <Button
            onClick={handleSubmit}
            sx={{ width: "50%", margin: "1rem 0" }}
            variant="contained"
          >
            Load Pick Items
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default PickScreenModule;
