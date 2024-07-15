import { IAllRoutes } from "@/constants/allRoutes";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import BackpackIcon from "@mui/icons-material/Backpack";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import StoreIcon from "@mui/icons-material/Store";

export interface INavListArr {
  topHeading: string;
  icon?: any;
  path?: string;
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Dashboard",
    icon: <BarChartIcon color="inherit" />,
    path: IAllRoutes.DASHBOARD,
  },
  {
    topHeading: "Waves",
    icon: <StoreIcon color="inherit" />,
    path: IAllRoutes.STORE,
  },
  {
    topHeading: "Customer Collections",
    icon: <PersonIcon color="inherit" />,
    path: IAllRoutes.CUSTOMER_COLLECTIONS,
  },
  {
    topHeading: "Carrier Collections",
    icon: <LocalShippingIcon color="inherit" />,
    path: IAllRoutes.CARRIER_COLLECTIONS,
  },
  {
    topHeading: "Uncollected Articles",
    icon: <AssignmentLateIcon color="inherit" />,
    path: IAllRoutes.STORE,
  },
  {
    topHeading: "Fulfillments",
    icon: <ArticleIcon color="inherit" />,
    path: IAllRoutes.FULFILLMENTS,
  },
  {
    topHeading: "Returns",
    icon: <AssignmentReturnIcon color="inherit" />,
    path: IAllRoutes.RETURNS,
  },
  {
    topHeading: "Pick Screen",
    icon: <PrecisionManufacturingIcon color="inherit" />,
    path: IAllRoutes.PICK_SCREEN,
  },
  {
    topHeading: "Pack Screen",
    icon: <BackpackIcon color="inherit" />,
    path: IAllRoutes.PACK_SCREEN,
  },
];
