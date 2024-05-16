import React, { useState } from "react";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
import { useRouter } from "next/router";
import { IAllRoutes, IListRoutes } from "@/constants/allRoutes";
import HeaderLabel from "@/component/atoms/headerLabel";
import LhsWrapper from "./LhsWrapper";
import styles from "./newNavbar.module.scss";

interface IProps {
  children: JSX.Element;
  mainStyle?: React.CSSProperties;
}

const MainLayout = (props: IProps) => {
  const { children, mainStyle = {} } = props;
  const router = useRouter();

  const [isNavOpen, setisNavOpen] = useState<boolean>(false);

  const handleTypeClick = (value: any, path: IAllRoutes | IListRoutes) => {
    switch (path) {
      case IAllRoutes.CARRIER_COLLECTIONS:
      case IAllRoutes.FULFILLMENTS:
        router.push(`${path}`);
        return;
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      <nav className={styles.navContainer}>
        <LhsWrapper {...{ isNavOpen, setisNavOpen }} />
        <RhsWrapper />
      </nav>
      <HeaderLabel />
      <div className={styles.mainBodyWrapper}>
        <div className={styles.navListWrapper}>
          <NavList {...{ handleTypeClick, isNavOpen, setisNavOpen }} />
        </div>
        <main style={mainStyle} className={styles.mainWrapper}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
