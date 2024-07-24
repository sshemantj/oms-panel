import CustomSelect from "@/component/atoms/customSelect";
import { useAppDispatch } from "@/store/hooks";
import { setBrand } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";

const data = [
  { label: "brand1", value: "brand1" },
  { label: "brand2", value: "brand2" },
  { label: "brand3", value: "brand3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export interface Brand {
  // brandId: string;
  brandName: string;
}

interface BrandDropdownProps {
  brandFilters: Brand[];
  selectedBrand: { brandName: string };
  setSelectedBrand: (brand: { brandName: string }) => void;
}

const BrandDropDown = ({
  brandFilters,
  selectedBrand,
  setSelectedBrand,
}: BrandDropdownProps) => {
  const dispatch = useAppDispatch();
  console.log("brandFilters", brandFilters);
  // const [selectedBrand, setSelectedBrand] = useState<string>("");
  // const selectedBrand = useAppSelector((state) => state.filters?.brand);
  const brandFiltersForDropdown = brandFilters?.map((brand: any) => ({
    label: brand.brandName,
    value: brand.brandName,
  }));
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log("e.target", e.target);
    // setSelectedBrand(e.target.value);
    // dispatch(setBrand(e.target.value));
    const selectedOption = brandFiltersForDropdown.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      setSelectedBrand({
        // brandId: selectedOption.value,
        brandName: selectedOption.label,
      });
      dispatch(setBrand(e.target.value));
    }
  };

  console.log("brandFiltersForDropdown", brandFiltersForDropdown);

  return (
    <Box sx={{ ...flex, gap: "0.5rem" }}>
      <Typography fontWeight={600}>Brand</Typography>
      <CustomSelect
        {...{
          data: brandFiltersForDropdown,
          value: selectedBrand.brandName,
          handleOnChange,
          label: "Select",
          selectSx: {
            width: "170px",
            "& .MuiSelect-outlined": {
              padding: "6px",
            },
            "& .MuiInputLabel-shrink": {
              top: "0px",
            },
            "& label": {
              top: "-10px",
            },
            "& .Mui-focused": {
              top: "0",
            },
          },
        }}
      />
    </Box>
  );
};

export default BrandDropDown;
