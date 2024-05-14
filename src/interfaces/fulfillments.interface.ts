import {
  initialAllFulfillmentTableIdsList,
  initialAllFulfillmentTableState,
} from "@/constants/tableConstant";

export enum IFulFillmentsTabsList {
  FULFILMENTS = "fulfilments",
  EXPRESS_FULFILMENTS = "expressFulfilments",
  STANDARD_FULFILMENTS = "standardFulfilments",
  CLICK_AND_COLLECT = "clickandcollect",
}

export type IAllFulfillmentTableState = typeof initialAllFulfillmentTableState;
export type IAllFulfillmentTableIdsList =
  typeof initialAllFulfillmentTableIdsList;
