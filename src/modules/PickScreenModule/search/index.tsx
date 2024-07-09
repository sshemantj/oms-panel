import SearchComponent from "@/component/molecules/searchComponent";
import { Box, Grid } from "@mui/material";

const Search = () => {
  return (
    <div>
      <Grid container mt={2}>
        <Grid item sx={{ marginRight: "auto" }} md={6}>
          <Box display="flex" gap="1rem">
            <SearchComponent label="Search..." />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Search;
