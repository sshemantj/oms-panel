export enum IAllRoutes {
  HOME = "/",
  STORE = "/store",
  DASHBOARD = "/",
  LOGIN = "/",
  MANAGE_CHANNELS = "/",
  USER_PROFILE = "/",
  FILE_MANAGEMENT = "/",
  CHANNEL_MAPPINGS = "/",
}

export enum IListRoutes {
  AWAITING_PICK = "/awaiting-pick",
  WAVES_IN_PROGRESS = "/in-progress",
  PICK = "/pick",
}
export enum IStoreListRoutes {
  AWAITING_PICK = IAllRoutes.STORE + IListRoutes.AWAITING_PICK,
  WAVES_IN_PROGRESS = IAllRoutes.STORE + IListRoutes.WAVES_IN_PROGRESS,
  PICK = IAllRoutes.STORE + IListRoutes.PICK,
}
