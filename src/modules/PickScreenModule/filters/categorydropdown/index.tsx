import CustomSelect from "@/component/atoms/customSelect";
import { useAppDispatch } from "@/store/hooks";
import { setCategory } from "@/store/slices/filterSlice";
import { Box, Typography } from "@mui/material";

const data = [
  { label: "category1", value: "category1" },
  { label: "category2", value: "category2" },
  { label: "category3", value: "category3" },
];

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

interface Cateogory {
  categoryId: string;
  categoryName: string;
}

interface CateogryDropdownProps {
  categoryFilters: Cateogory[];
  selectedCategory: { categoryId: string; categoryName: string };
  setSelectedCategory: (category: {
    categoryId: string;
    categoryName: string;
  }) => void;
}

const CategoryDropDown = ({
  categoryFilters,
  selectedCategory,
  setSelectedCategory,
}: CateogryDropdownProps) => {
  const dispatch = useAppDispatch();
  // const [selectedCategory, setSelectedCategory] = useState<string>("");

  // const selectedCategory = useAppSelector((state) => state.filters?.category);
  const categoryFiltersForDropdown = categoryFilters.map((category: any) => ({
    label: category.categoryName,
    value: category.categoryId,
  }));
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setSelectedCategory(e.target.value);
    // dispatch(setCategory(e.target.value));
    const selectedOption = categoryFiltersForDropdown.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      setSelectedCategory({
        categoryId: selectedOption.value,
        categoryName: selectedOption.label,
      });
      dispatch(setCategory(e.target.value));
    }
  };

  return (
    <Box sx={{ ...flex, gap: "0.5rem", marginTop: "1rem" }}>
      <Typography fontWeight={600}>Category</Typography>
      <CustomSelect
        {...{
          data: categoryFiltersForDropdown,
          value: selectedCategory.categoryId,
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

export default CategoryDropDown;
