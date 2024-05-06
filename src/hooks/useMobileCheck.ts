import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export const useMobileCheck = (width = "768px") => {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileCheck = useMediaQuery(`(min-width : ${width} )`);
  useEffect(() => {
    setIsMobile(!isMobileCheck);
  }, [isMobileCheck]);

  return isMobile;
};
