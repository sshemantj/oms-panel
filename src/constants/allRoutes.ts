export enum IAllRoutes {
  HOME = "/",
  STORE = "/store",
}

export enum IListRoutes {
  AWAITING_PICK = "/awaiting-pick",
}
export enum IStoreListRoutes {
  AWAITING_PICK = IAllRoutes.STORE + IListRoutes.AWAITING_PICK,
}
