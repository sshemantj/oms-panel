export enum IAllRoutes {
  HOME = "/",
  STORE = "/store",
}

export enum IListRoutes {
  AWAITING_PICK = "/awaiting-pick",
  WAVES_IN_PROGRESS = "/in-progress",
}
export enum IStoreListRoutes {
  AWAITING_PICK = IAllRoutes.STORE + IListRoutes.AWAITING_PICK,
  WAVES_IN_PROGRESS = IAllRoutes.STORE + IListRoutes.WAVES_IN_PROGRESS,
}
