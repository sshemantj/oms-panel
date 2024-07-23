import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const useMobileCheck = (width = "468px") => {
  const theme = useTheme();
  const isMobileCheck = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMobile, setIsMobile] = useState(isMobileCheck);

  useEffect(() => {
    setIsMobile(isMobileCheck);
  }, [isMobileCheck]);

  return isMobile;
};
