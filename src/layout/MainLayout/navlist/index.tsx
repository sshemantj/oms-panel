import React from "react";
import AccordionCustom from "@/component/atoms/accordionCustom";
import { Profile, ProfileList } from "./profile";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import styles from "./navlist.module.scss";
import {
  INavListArr,
  ISubHeaderList,
  navListArr,
} from "@/constants/navlistArr";

interface IProps {
  isNavOpen: boolean;
  handleTypeClick: (value: any, path?: any) => void;
}

const NavList = (props: IProps) => {
  const { isNavOpen, handleTypeClick } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const screen = searchParams.get("screen");

  const handleRouteClick = (route: ISubHeaderList) => {
    if (route.value || route.path) {
      handleTypeClick(route.value, route.path);
    }
  };

  const activeCondition = (
    path: string | undefined,
    value: string | undefined
  ) => {
    const isActive = screen === value;

    return isActive;
  };

  return (
    <div
      className={`${styles.navlist_wrapper} ${isNavOpen ? styles.open : null}`}
    >
      {isNavOpen ? (
        <AccordionCustom
          summarySx={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            ".Mui-expanded": {
              margin: 0,
            },
          }}
          summaryJsx={<Profile isNavOpen={isNavOpen} />}
          detailsJsx={<ProfileList isNavOpen={isNavOpen} />}
        />
      ) : (
        <Profile isNavOpen={isNavOpen} />
      )}
      <div
        className={`${styles.navlist_inner} ${
          isNavOpen || styles.navClosedInner
        }`}
      >
        <div className={styles.navlist_container}>
          {navListArr.map((listItem: INavListArr, index: number) => {
            const { topHeading, subHeaderList } = listItem;
            return (
              <div className={`${styles.listWrapper}`} key={index}>
                <p
                  className={`${styles.topHeading} ${isNavOpen || styles.hide}`}
                >
                  {topHeading}
                </p>
                {subHeaderList.map((item, ind) => {
                  return (
                    <div
                      onClick={() => handleRouteClick(item)}
                      className={`${styles.subHeaderWrapper} ${
                        isNavOpen || styles.navClosed
                      }
                      ${item?.value || styles.disabled}
                    ${activeCondition(item?.path, item?.value) && styles.active}
                    `}
                      key={ind}
                    >
                      {item.iconJsx || (
                        <Image
                          src={item.icon || ""}
                          alt="icon"
                          width={50}
                          height={50}
                        />
                      )}
                      <p
                        className={`${styles.subTitle} ${
                          isNavOpen || styles.hide
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavList;
