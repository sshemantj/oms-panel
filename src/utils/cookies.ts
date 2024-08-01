import useUser from "@/hooks/useUser";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

interface StoreInfo {
  storeId: string | null;
  role: string | null;
}

export function getStoreIdFromCookie(): string | null {
  const storeId = getCookie("storeId");

  return storeId ? String(storeId) : null;
}

export function useStoreInfo(): StoreInfo {
  const { user } = useUser();
  const storeIdCookie = getCookie("storeId");

  useEffect(() => {
    if (!storeIdCookie && user?.storecode) {
      setCookie("storeId", user.storecode, {
        secure: process.env.NODE_ENV !== "development",
        path: "/",
      });
    }
  }, [storeIdCookie, user?.storecode]);

  const storeId = storeIdCookie
    ? String(storeIdCookie)
    : user?.storecode || null;
  const role = user?.role || null;

  return { storeId, role };
}
