import React, { useEffect, useMemo, useRef, useState } from "react";
// import HamIcon from "@/component/atoms/hamIcon";
import SearchIcon from "@mui/icons-material/Search";
import { useMobileCheck } from "@/hooks/useMobileCheck";
// import SearchComponent from "@/component/atoms/searchComponent";
import RhsWrapper from "./RhsWrapper";
import NavList from "./navlist";
// import Breadcrumbs from "@/component/atoms/breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IProducts } from "@/store/slices/dashboardSlice";
import { useRouter } from "next/router";
import { IAllRoutes } from "@/constants/allRoutes";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useSearchParams } from "next/navigation";
import { Cookies } from "react-cookie";
import HeaderLabel from "@/component/atoms/headerLabel";
import styles from "./newNavbar.module.scss";

const cookie = new Cookies();

interface IProps {
  children: JSX.Element;
  mainStyle?: React.CSSProperties;
}

const MainLayout = (props: IProps) => {
  const { children, mainStyle = {} } = props;
  const isMobile = useMobileCheck();
  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(
    window.innerWidth < 768
  );
  const [isNavOpen, setisNavOpen] = useState<boolean>(false);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [currValue, setCurrValue] = useState("");
  const [productType, setProductType] = useState<IProducts>();

  const { userChannelMappings, selectedChannel, pdType } = useAppSelector(
    (state) => state.dashboard
  );

  const isDashboard = useMemo(
    () => router.pathname === IAllRoutes.DASHBOARD,
    [router.pathname]
  );

  const channelMappingsArr =
    (Array.isArray(userChannelMappings) &&
      userChannelMappings?.map((item: any) => {
        return {
          label: item.channelName,
          value: item.channelId,
        };
      })) ||
    [];

  useEffect(() => {
    if (isDashboard) {
      // dispatch(getUserChannelMappings());
      screen && setProductType(screen as IProducts);
    }
  }, [router, screen]);

  // const isUnapprovedScreen = screen === IProductsTypes.UNAPPROVED;

  // useEffect(() => {
  //   if (screen && !isUnapprovedScreen) {
  //     if (cookie.get("token") && inputRef && !currValue && !selectedChannel) {
  //       openChannelDropdown();
  //     }
  //   } else if (isUnapprovedScreen) {
  //     getTableData({ type: IProductsTypes.UNAPPROVED });
  //     dispatch(changePdType(IProductsTypes.UNAPPROVED));
  //   }
  // }, [inputRef, currValue, isUnapprovedScreen, screen]);

  useEffect(() => {
    setCurrValue(selectedChannel);
  }, [selectedChannel]);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    // dispatch(setChannelMapping(value));
    setCurrValue(value);
    setOpenSelect(false);
    // dispatch(resetHomeTableData());
    // productType && dispatch(changePdType(productType as IProducts));
  };

  const handleHamClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setisNavOpen((prev) => !prev);
  };

  const openChannelDropdown = () => {
    inputRef && inputRef?.current?.focus?.();
    setOpenSelect(true);
  };

  const handleProductState = (value: any, path?: any) => {
    // dispatch(resetHomeTableData());
    // dispatch(changePdType(value));
    const url = `${IAllRoutes.DASHBOARD}?screen=${value}`;
    if (!isDashboard) {
      router.push(url);
    } else {
      router.push(url);
      // if (value === IProductsTypes.UNAPPROVED) {
      //   getTableData({});
      //   return;
      // }
      if (!selectedChannel) {
        openChannelDropdown();
      }
    }
  };

  const handleTypeClick = (value: any, path: IAllRoutes) => {
    setProductType(value);
    switch (value) {
      case "map_user_with_channels":
        router.push("/map-user-channels");
        return;
    }

    switch (path) {
      case IAllRoutes.DASHBOARD:
        handleProductState(value);
        return;
      case IAllRoutes.MANAGE_CHANNELS:
      case IAllRoutes.USER_PROFILE:
      case IAllRoutes.FILE_MANAGEMENT:
      case IAllRoutes.CHANNEL_MAPPINGS:
        router.push(`${path}?screen=${value}`);
        return;
    }
  };

  return (
    <div className={styles.newNavWrapper}>
      <nav className={styles.navContainer}>
        <div className={styles.lhs_Wrapper}>
          <div
            onClick={() => router.replace("/", undefined, { shallow: true })}
            className={styles.logoText}
          >
            <p className={styles.first}>OMS</p>
            <p className={styles.second}>Panel</p>
            <div className={styles.divider} />
            <div style={{ color: "#fff" }}>
              <LocalGroceryStoreIcon color="inherit" />
            </div>
            <p className={styles.omsStore}>OMS store</p>
          </div>
          <div
            onClick={(e) => handleHamClick(e)}
            className={styles.hamBurger}
          ></div>
        </div>
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
