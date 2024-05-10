import {
  initialAllTableIdsList,
  initialAllTableState,
} from "@/constants/tableConstant";

export enum ITabList {
  FULFILMENTS = "fulfilments",
  STANDARD_FULFILMENTS = "standardFulfilments",
  EXPRESS_FULFILMENTS = "expressFulfilments",
  EXCHANGES_FULFILMENTS = "exchangesFulfilments",
  CLICK_AND_COLLECT = "clickandcollect",
}

export type IAllTableState = typeof initialAllTableState;
export type IAllTableIdsList = typeof initialAllTableIdsList;
