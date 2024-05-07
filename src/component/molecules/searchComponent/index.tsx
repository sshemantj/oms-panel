import React, { useCallback, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import styles from "./searchNav.module.scss";

interface ISearchProps {
  label?: string;
  isSearchActive?: boolean;
  setIsSearchActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent = (props: ISearchProps) => {
  const { isSearchActive, setIsSearchActive, label } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  // const { pdType, subPdType, selectedChannel } = useAppSelector(
  //   (state) => state.gateway
  // );
  const isMobile = useMobileCheck();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  useEffect(() => {
    setSearchValue("");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearchClick = (value: string) => {
    if (searchValue) {
    }
  };

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;
      switch (pressedKey) {
        case "Enter":
          handleSearchClick(searchValue);
          break;
      }
    },
    [searchValue]
  );

  return (
    <div
      className={`${styles.searchValueContainer} ${
        isSearchActive ? styles.isActive : null
      }`}
    >
      <TextField
        style={{ width: "unset" }}
        placeholder={label || "search..."}
        className={styles.searchInput}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
        sx={{
          "& fieldset": { border: "none" },
        }}
      />
      {/* {isMobile ? (
        <CloseIcon
          // onClick={() => setIsSearchActive((prev) => !prev)}
          style={{ margin: "0 1rem 0 0", cursor: "pointer" }}
        />
      ) : ( */}
      <div
        onClick={() => handleSearchClick(searchValue)}
        className={styles.searchIcon}
      >
        <SearchIcon color="inherit" />
      </div>
      {/* )} */}
    </div>
  );
};

export default SearchComponent;
