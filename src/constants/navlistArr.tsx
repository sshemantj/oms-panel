import { IAllRoutes } from "@/constants/allRoutes";
import BarChartIcon from "@mui/icons-material/BarChart";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ArticleIcon from "@mui/icons-material/Article";

export interface INavListArr {
  topHeading: string;
  icon?: any;
  path?: string;
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Dashboard",
    icon: <BarChartIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
  {
    topHeading: "Waves",
    icon: <StoreIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
  {
    topHeading: "Customer Collections",
    icon: <PersonIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
  {
    topHeading: "Carrier Collections",
    icon: <LocalShippingIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
  {
    topHeading: "Uncollected Articles",
    icon: <AssignmentLateIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
  {
    topHeading: "Fulfillments",
    icon: <ArticleIcon color="inherit" />,
    path: IAllRoutes.MANAGE_CHANNELS,
  },
];
