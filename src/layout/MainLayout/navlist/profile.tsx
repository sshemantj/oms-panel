import Image from "next/image";
import profileImg from "@/images/profile.png";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useState } from "react";
import LogoutModal from "@/component/molecules/LogoutModal";
import { useAppSelector } from "@/store/hooks";

interface IProfile {
  isNavOpen: boolean;
}

const Profile = (props: IProfile) => {
  const { isNavOpen } = props;
  const userName =
    useAppSelector((state) => state.login.userDetails?.userName) || "";

  const navClosedStyle: React.CSSProperties = {
    margin: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        ...{ ...(!isNavOpen ? navClosedStyle : {}) },
      }}
    >
      <Image src={profileImg} alt="profile" width={30} height={30} />
      <h4 style={{ display: isNavOpen ? "flex" : "none", fontWeight: 500 }}>
        {userName}
      </h4>
    </div>
  );
};

const ProfileList = (props: IProfile) => {
  const { isNavOpen } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const commonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "6px",
    color: "gray",
  };

  const fontStyles: React.CSSProperties = {
    fontWeight: 500,
    fontSize: 14,
    color: "#535763",
  };

  const profileList = [
    {
      title: "Setting",
      icon: <SettingsIcon color="inherit" />,
    },
    {
      title: "Logout",
      icon: <LogoutIcon color="inherit" />,
    },
  ];

  const handleClick = (title: string) => {
    switch (title) {
      case "Logout":
        setOpenModal(true);
        break;
    }
  };

  return (
    <>
      <div
        style={{
          display: isNavOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {profileList.map((item) => {
          return (
            <div
              key={item.title}
              style={commonStyle}
              onClick={() => handleClick(item.title)}
            >
              {item.icon}
              <h6 style={fontStyles}>{item.title}</h6>
            </div>
          );
        })}
      </div>
      <LogoutModal {...{ openModal, setOpenModal }} />
    </>
  );
};

export { Profile, ProfileList };
