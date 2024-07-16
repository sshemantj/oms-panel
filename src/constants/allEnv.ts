const API_BASE_URL = process.env.API_BASE_URL;
export const isLocal = process.env.NODE_ENV === "development";

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === "true" ?? false;

export { API_BASE_URL };
