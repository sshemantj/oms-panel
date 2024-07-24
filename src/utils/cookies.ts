import { getCookie, setCookie } from "cookies-next";

export function getStoreIdFromCookie(): string | null {
  const storeId = getCookie("storeId");
  return storeId ? String(storeId) : null;
}
