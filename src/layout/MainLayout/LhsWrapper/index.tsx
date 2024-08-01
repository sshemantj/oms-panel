import React, { useEffect, useState } from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useRouter } from "next/router";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import styles from "./lhsWrapper.module.scss";
import {
  Box,
  IconButton,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";

import MenuIconWrapper from "@/component/atoms/menuIcon";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { getStoreIdFromCookie } from "@/utils/cookies";
import { logOut } from "@/services/thunks/authApis";
import { useAppDispatch } from "@/store/hooks";

interface IProps {
  isNavOpen: boolean;
  setisNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  storeId: string;
}

const LhsWrapper = (props: IProps) => {
  const { isNavOpen, setisNavOpen, storeId } = props;
  const router = useRouter();
  const isMobile = useMobileCheck();
  const dispatch = useAppDispatch();

  const handleIconClick = (isOpen: boolean) => {
    setisNavOpen(isOpen);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

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

  const handleLogout = async () => {
    deleteCookie("storeId");
    await dispatch(logOut());

    toast.success("Logout success!");
    await router.reload();
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
        {storeId && isMobile ? (
          <p className={styles.second}> ({storeId})</p>
        ) : null}
        {isMobile ? (
          <>
            <div className={styles.divider} />
            <div
              style={{ color: "#fff", marginLeft: isMobile ? "auto" : "unset" }}
            >
              <LocalGroceryStoreIcon color="inherit" />
            </div>
            {/* <p className={styles.omsStore}>OMS store</p> */}
          </>
        ) : null}
      </div>
      {isMobile ? (
        <>
          <IconButton
            // disabled={!isAdmin}
            onClick={handlePopoverOpen}
            className={styles.profile_container}
          >
            <PermIdentityIcon color="inherit" />
          </IconButton>
          <Popover
            open={open && Boolean(storeId)}
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
            {storeId ? (
              <Box sx={{ p: 2 }}>
                <Typography
                  sx={{ cursor: "pointer", mb: 1 }}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Typography>
              </Box>
            ) : null}
          </Popover>
        </>
      ) : null}
    </div>
  );
};

export default LhsWrapper;
