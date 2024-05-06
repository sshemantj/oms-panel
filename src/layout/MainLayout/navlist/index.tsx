import React from "react";
import AccordionCustom from "@/component/atoms/accordionCustom";
import { Profile, ProfileList } from "./profile";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { INavListArr, navListArr } from "@/constants/navlistArr";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./navlist.module.scss";

interface IProps {
  isNavOpen: boolean;
  handleTypeClick: (value: any, path?: any) => void;
  setisNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavList = (props: IProps) => {
  const { isNavOpen, handleTypeClick, setisNavOpen } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const screen = searchParams.get("screen");

  const handleRouteClick = (route: any) => {
    if (route.value || route.path) {
      handleTypeClick(route.value, route.path);
    }
  };

  const activeCondition = (path: string | undefined) => {
    const isActive = screen === path;

    return isActive;
  };

  const handleMouseEnter = (isEntered: boolean) => {
    setisNavOpen(isEntered);
  };

  return (
    <div
      className={`${styles.navlist_wrapper} ${isNavOpen ? styles.open : null}`}
    >
      <div
        onMouseEnter={() => handleMouseEnter(true)}
        onMouseLeave={() => handleMouseEnter(false)}
        className={`${styles.navlist_inner} ${
          isNavOpen || styles.navClosedInner
        }`}
      >
        <div className={styles.menuIcon}>
          {isNavOpen ? (
            <CloseIcon fontSize={"medium"} />
          ) : (
            <MenuIcon fontSize={"medium"} />
          )}
        </div>
        <div className={styles.navlist_container}>
          {navListArr.map((listItem: INavListArr, index: number) => {
            const { topHeading, icon } = listItem;
            return (
              <div
                onClick={() => handleRouteClick(listItem)}
                className={`${styles.listWrapper}`}
                key={index}
              >
                <p
                  className={`${styles.topHeading} ${isNavOpen || styles.hide} 
                  ${activeCondition(listItem?.path) && styles.active}`}
                >
                  <span>{listItem.icon}</span> {isNavOpen && topHeading}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavList;
