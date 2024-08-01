export const isProd = process.env.NODE_ENV === "production";
export const isLocal = process.env.NODE_ENV === "development";
export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const showLogger = isLocal
  ? true
  : (process.env.NEXT_PUBLIC_SHOW_LOGGER === "true" ?? false);

export const { NEXT_SECRET_COOKIE_PASSWORD } = process.env;
