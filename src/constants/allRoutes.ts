export enum IAllRoutes {
  HOME = "/",
  STORE = "/store",
  DASHBOARD = "/",
  LOGIN = "/",
  MANAGE_CHANNELS = "/",
  USER_PROFILE = "/",
  FILE_MANAGEMENT = "/",
  CHANNEL_MAPPINGS = "/",
  CARRIER_COLLECTIONS = "/carrier-collections",
  PROOF_OF_DELIEVERY = "proof-of-delivery",
  FULFILLMENTS = "/fulfillments",
  RETURNS = "/returns",
}

//Store sub routes
export enum IListRoutes {
  AWAITING_PICK = "/awaiting-pick",
  WAVES_IN_PROGRESS = "/in-progress",
  PICK = "/pick",
  PACK = "/pack",
  CARRIER_BOOKING = "/carrier-booking",
}
export enum IStoreListRoutes {
  AWAITING_PICK = IAllRoutes.STORE + IListRoutes.AWAITING_PICK,
  WAVES_IN_PROGRESS = IAllRoutes.STORE + IListRoutes.WAVES_IN_PROGRESS,
  PICK = IAllRoutes.STORE + IListRoutes.PICK,
  // CARRIER_BOOKING = IAllRoutes.STORE + IListRoutes.CARRIER_BOOKING,
  CARRIER_BOOKING = IListRoutes.CARRIER_BOOKING,
}

//Fulfillments sub routes
export enum IFulfillmentsRoutes {
  FULFILLMENTS_DETAILS = "/fulfillments-details",
}
export enum IStoreListRoutes {
  FULFILLMENTS_DETAILS = IAllRoutes.STORE +
    IFulfillmentsRoutes.FULFILLMENTS_DETAILS,
}
