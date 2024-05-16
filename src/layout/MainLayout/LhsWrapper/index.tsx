import React from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useRouter } from "next/router";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import styles from "./lhsWrapper.module.scss";

const LhsWrapper = () => {
  const router = useRouter();
  const isMobile = useMobileCheck();

  return (
    <div className={styles.lhs_Wrapper}>
      <div
        onClick={() => router.replace("/", undefined, { shallow: true })}
        className={styles.logoText}
      >
        <p className={styles.first}>OMS</p>
        <p className={styles.second}>Panel</p>
        {isMobile || <div className={styles.divider} />}
        <div style={{ color: "#fff", marginLeft: isMobile ? "auto" : "unset" }}>
          <LocalGroceryStoreIcon color="inherit" />
        </div>
        {isMobile || <p className={styles.omsStore}>OMS store</p>}
      </div>
    </div>
  );
};

export default LhsWrapper;
