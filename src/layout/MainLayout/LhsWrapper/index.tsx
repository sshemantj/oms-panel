import React from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useRouter } from "next/router";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import styles from "./lhsWrapper.module.scss";
import MenuIconWrapper from "@/component/atoms/menuIcon";

interface IProps {
  isNavOpen: boolean;
  setisNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LhsWrapper = (props: IProps) => {
  const { isNavOpen, setisNavOpen } = props;
  const router = useRouter();
  const isMobile = useMobileCheck();

  const handleIconClick = (isOpen: boolean) => {
    setisNavOpen(isOpen);
  };

  return (
    <div className={styles.lhs_Wrapper}>
      {isMobile && <MenuIconWrapper {...{ handleIconClick, isNavOpen }} />}
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
