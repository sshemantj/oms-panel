import ModalComponent from "@/component/molecules/ModalComponent";

import { useAppSelector } from "@/store/hooks";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, IconButton, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./rhsWrapper.module.scss";
import Logout from "@/components/PackScreenStage/Logout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";

const RhsWrapper = () => {
  // const isAdmin = userRole === "admin";
  const router = useRouter();

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

  const handleModalOpen = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
    handlePopoverClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalTitle("");
    setModalContent(null);
  };
  useEffect(() => {
    if (getCookie("storeId")) {
      const storeId = getCookie("storeId");
      if (storeId) setStoreId(storeId);
    }
  }, []);

  const handleLogout = () => {
    deleteCookie("storeId");
    toast.success("Logout success!");
    router.reload();
  };
  const open = Boolean(anchorEl);
  return (
    <div className={styles.rhs_Wrapper}>
      {storeId ? (
        <p>Location: SHOPPERS STOP LTD BHIWANDI {`(${storeId})`}</p>
      ) : null}
      <IconButton
        // onClick={handlePopoverOpen}
        className={styles.notificatin_container}
      >
        <NotificationsNoneIcon color="inherit" />
      </IconButton>

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
      <ModalComponent
        open={modalOpen}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalContent}
      </ModalComponent>
    </div>
  );
};

export default RhsWrapper;
