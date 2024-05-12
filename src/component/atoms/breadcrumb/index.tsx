import React from "react";
import Typography from "@mui/material/Typography";
import BreadcrumbsMui from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { IListRoutes } from "@/constants/allRoutes";
import styles from "./breadcrumb.module.scss";

const LAST_PATHS = {
  [IListRoutes.AWAITING_PICK]: "Orders Awaiting Picks",
  [IListRoutes.WAVES_IN_PROGRESS]: "In Progress",
  [IListRoutes.CARRIER_BOOKING]: "Carrier Booking",
};

const Breadcrumbs = () => {
  const paths = usePathname();
  const router = useRouter();

  const handlePathNames = () => {
    const path = paths?.split("/")?.filter((path) => path) as unknown as string;
    return path;
  };

  const pathNames = handlePathNames();

  const handleRouteClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pathStr: string,
    index?: number,
    isLastPath?: boolean
  ) => {
    event.preventDefault();
    if (pathStr === "/") {
      return router.replace("/", undefined, { shallow: true });
    }
    if (!isLastPath) {
      router.replace("/" + pathStr, undefined, { shallow: true });
    }
  };

  const handleLastPath = (lastpath: IListRoutes) => {
    const updatedLastPath = "/" + lastpath;
    // @ts-ignore
    return LAST_PATHS[updatedLastPath] || lastpath;
  };

  return (
    <div className={styles.breadCrumbWrapper}>
      <div role="presentation">
        <BreadcrumbsMui aria-label="breadcrumb">
          <Link
            onClick={(e) => handleRouteClick(e, "/")}
            style={{ color: "blue" }}
            underline="always"
            href="/"
          >
            Home
          </Link>
          {Array.isArray(pathNames) &&
            pathNames.map((pathStr, index) => {
              const isLastPath = index === pathNames?.length - 1;

              return !isLastPath ? (
                <Link
                  onClick={(e) =>
                    handleRouteClick(e, pathStr, index, isLastPath)
                  }
                  style={{ color: "blue" }}
                  underline="always"
                  href="/"
                >
                  {pathStr}
                </Link>
              ) : (
                <Typography key={index} color="black">
                  {handleLastPath(pathStr)}
                </Typography>
              );
            })}
        </BreadcrumbsMui>
      </div>
    </div>
  );
};

export default Breadcrumbs;
