import MenuIconWrapper from "@/component/atoms/menuIcon";
import { INavListArr, navListArr } from "@/constants/navlistArr";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "./navlist.module.scss";

interface IProps {
  isNavOpen: boolean;
  handleTypeClick: (value: any, path?: any) => void;
  setisNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: string | null;
}

const NavList = (props: IProps) => {
  const { isNavOpen, handleTypeClick, setisNavOpen, role } = props;

  const searchParams = useSearchParams();
  const isMobile = useMobileCheck();
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
    isMobile || setisNavOpen(isEntered);
  };

  const handleIconClick = (isOpen: boolean) => {
    setisNavOpen(isOpen);
  };
  // Filter navigation items based on the user's role
  const roleBaseNavListArr = navListArr.filter((item) =>
    item.roles.includes(role || "")
  );

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
        {isMobile || <MenuIconWrapper {...{ handleIconClick, isNavOpen }} />}
        <div className={styles.navlist_container}>
          {roleBaseNavListArr.map((listItem: INavListArr, index: number) => {
            const { topHeading, icon: IconComponent, iconType } = listItem;
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
                  {iconType === "svg" ? (
                    <span>
                      <IconComponent
                        color="inherit"
                        className={styles.iconStyle}
                      />
                    </span>
                  ) : (
                    <span>{IconComponent}</span>
                  )}

                  {isNavOpen && topHeading}
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
