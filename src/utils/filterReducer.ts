import { Dayjs } from "dayjs";

interface FilterState {
  brand: { brandName: string };
  category: { categoryId: string; categoryName: string };
  channel: { channelId: number; channelName: string };
  deliveryMode: { deliveryModeName: string };
  estimatedShip: Dayjs | null;
  orderNumber: string;
  status: { statusId: number; statusDescription: string };
}

type FilterAction =
  | {
      type: "SET_SELECTED_BRAND";
      payload: { brandName: string };
    }
  | {
      type: "SET_SELECTED_CATEGORY";
      payload: { categoryId: string; categoryName: string };
    }
  | {
      type: "SET_SELECTED_CHANNEL";
      payload: { channelId: number; channelName: string };
    }
  | {
      type: "SET_SELECTED_DELIVERY_MODE";
      payload: { deliveryModeName: string };
    }
  | { type: "SET_SELECTED_ESTIMATED_SHIP"; payload: Dayjs }
  | { type: "SET_ORDER_NUMBER"; payload: string }
  | {
      type: "SET_PICK_STATUS";
      payload: { statusId: number; statusDescription: string };
    };

export const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_SELECTED_BRAND":
      return { ...state, brand: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SELECTED_CHANNEL":
      return { ...state, channel: action.payload };
    case "SET_SELECTED_DELIVERY_MODE":
      return { ...state, deliveryMode: action.payload };
    case "SET_SELECTED_ESTIMATED_SHIP":
      return { ...state, estimatedShip: action.payload };
    case "SET_ORDER_NUMBER":
      return { ...state, orderNumber: action.payload };
    case "SET_PICK_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const initialFilterState: FilterState = {
  brand: { brandName: "" },
  category: { categoryId: "", categoryName: "" },
  channel: { channelId: 0, channelName: "" },
  deliveryMode: { deliveryModeName: "" },
  estimatedShip: null,
  orderNumber: "",
  status: { statusId: 0, statusDescription: "" },
};
