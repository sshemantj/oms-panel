import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import styles from "./searchNav.module.scss";

interface SearchComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onSearchSubmit?: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  label,
  value,
  onChange,
  onKeyDown,
  onSearchSubmit,
}) => {
  return (
    <div className={`${styles.searchValueContainer} `}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
        onKeyDown={onKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearchSubmit}>
                <SearchIcon color="inherit" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchComponent;
