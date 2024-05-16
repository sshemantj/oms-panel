import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./menuIcon.module.scss";

interface IProps {
  isNavOpen: boolean;
  handleIconClick: (_: boolean) => void;
}

const MenuIconWrapper = (props: IProps) => {
  const { isNavOpen, handleIconClick } = props;
  return (
    <div className={styles.menuIcon}>
      {isNavOpen ? (
        <CloseIcon onClick={() => handleIconClick(false)} fontSize={"medium"} />
      ) : (
        <MenuIcon onClick={() => handleIconClick(true)} fontSize={"medium"} />
      )}
    </div>
  );
};

export default MenuIconWrapper;
