import { IAllRoutes } from "@/constants/allRoutes";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import CustomerSupportIcon from "~/svg/customer-support.svg";
import DeliveryManIcon from "~/svg/delivery-man-icon.svg";
import PackIcon from "~/svg/packIcon.svg";

export interface INavListArr {
  topHeading: string;
  icon?: any;
  path?: string | any;
  iconType?: string;
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Dashboard",
    icon: <BarChartIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.DASHBOARD,
  },
  {
    topHeading: "Waves",
    icon: <StoreIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.STORE,
  },
  {
    topHeading: "Customer Collections",
    icon: DeliveryManIcon,
    iconType: "svg",
    path: IAllRoutes.CUSTOMER_COLLECTIONS,
  },
  {
    topHeading: "Carrier Collections",
    icon: <LocalShippingIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.CARRIER_COLLECTIONS,
  },
  {
    topHeading: "Uncollected Articles",
    icon: <AssignmentLateIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.STORE,
  },
  {
    topHeading: "Fulfillments",
    icon: <ArticleIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.FULFILLMENTS,
  },
  {
    topHeading: "Returns",
    icon: <AssignmentReturnIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.RETURNS,
  },
  {
    topHeading: "Pick Screen",
    icon: <ListIcon color="inherit" />,
    iconType: "mui",
    path: IAllRoutes.PICK_SCREEN,
  },
  {
    topHeading: "Pack Screen",
    icon: PackIcon,
    iconType: "svg",
    path: IAllRoutes.PACK_SCREEN,
  },
  {
    topHeading: "CP Panel",
    icon: CustomerSupportIcon,
    iconType: "svg",
    path: IAllRoutes.CUSTOMER_SERVICE_PANEL,
  },
];
