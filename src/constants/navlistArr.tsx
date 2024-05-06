import { IAllRoutes, IChannelSubRoutes } from "@/constants/allRoutes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import HouseIcon from "@mui/icons-material/House";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ServiceIcon from "@mui/icons-material/HomeRepairService";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import QueueIcon from "@mui/icons-material/Queue";

export interface ISubHeaderList {
  title: string;
  icon?: string | StaticImport;
  iconJsx?: JSX.Element;
  value?: string;
  path?: string;
}

export interface INavListArr {
  topHeading: string;
  subHeaderList: ISubHeaderList[];
}

export const navListArr: INavListArr[] = [
  {
    topHeading: "Manage Channels",
    subHeaderList: [
      {
        title: "Add",
        icon: "",
        iconJsx: <OfflineBoltIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.ADD_CHANNEL,
      },
      {
        title: "Update",
        icon: "",
        iconJsx: <QueueIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.UPDATE_CHANNEL,
      },
      {
        title: "View All Channels",
        icon: "",
        iconJsx: <WalletIcon color="inherit" />,
        path: IAllRoutes.MANAGE_CHANNELS,
        value: IChannelSubRoutes.VIEW_ALL_CHANNEL,
      },
    ],
  },
];
