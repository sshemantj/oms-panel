import React, { useEffect, useState } from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useRouter } from "next/router";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import styles from "./lhsWrapper.module.scss";
import { Box, IconButton, Popover, Typography } from "@mui/material";

import MenuIconWrapper from "@/component/atoms/menuIcon";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { getStoreIdFromCookie } from "@/utils/cookies";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [storeId, setStoreId] = useState("");

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    deleteCookie("storeId");
    toast.success("Logout success!");
    router.reload();
  };

  useEffect(() => {
    const storeId = getStoreIdFromCookie();
    if (storeId) setStoreId(storeId);
  }, []);

  return (
    <div className={styles.lhs_Wrapper}>
      {isMobile && <MenuIconWrapper {...{ handleIconClick, isNavOpen }} />}
      <div
        onClick={() => router.replace("/", undefined, { shallow: true })}
        className={styles.logoText}
      >
        <p className={styles.first}>OMS</p>
        <p className={styles.second}>Panel</p>
        {storeId ? <p className={styles.second}> ({storeId})</p> : null}
        {isMobile || <div className={styles.divider} />}
        <div style={{ color: "#fff", marginLeft: isMobile ? "auto" : "unset" }}>
          <LocalGroceryStoreIcon color="inherit" />
        </div>
        {isMobile || <p className={styles.omsStore}>OMS store</p>}
      </div>
      <IconButton
        // disabled={!isAdmin}
        onClick={handlePopoverOpen}
        className={styles.profile_container}
      >
        <PermIdentityIcon color="inherit" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ cursor: "pointer", mb: 1 }}
            onClick={() => handleLogout()}
          >
            Logout
          </Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default LhsWrapper;
