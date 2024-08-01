import HeaderLabel from "@/component/atoms/headerLabel";
import { IAllRoutes, IListRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LhsWrapper from "./LhsWrapper";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
import styles from "./newNavbar.module.scss";
import LoginComponent from "@/component/molecules/LoginModal";

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
      case IAllRoutes.DASHBOARD:
      case IAllRoutes.RETURNS:
      case IAllRoutes.PICK_SCREEN:
      case IAllRoutes.PACK_SCREEN:
      case IAllRoutes.CUSTOMER_COLLECTIONS:
      case IAllRoutes.CUSTOMER_SERVICE_PANEL:
        router.push(`${path}`);
        return;
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      <LoginComponent />

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
