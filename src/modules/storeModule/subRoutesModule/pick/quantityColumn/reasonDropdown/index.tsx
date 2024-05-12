import CustomSelect from "@/component/atoms/customSelect";

const data = [
  { label: "Not as per image", value: "Not as per image" },
  { label: "Wrong Pricing", value: "Wrong Pricing" },
  { label: "Defective item", value: "Defective item" },
  { label: "Near to expiry/expired", value: "Near to expiry/expired" },
  { label: "Vendor/RTV Return", value: "Vendor/RTV Return" },
  {
    label: "Item booked by customer at a store",
    value: "Item booked by customer at a store",
  },
  { label: "Unavailable in rack", value: "Unavailable in rack" },
  { label: "Wrong Tag", value: "Wrong Tag" },
];

const ReasonDropdown = () => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  return (
    <CustomSelect
      {...{
        data,
        handleOnChange,
        label: "select reason",
        selectWrapperStyle: {
          marginTop: "12px",
        },
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
  );
};

export default ReasonDropdown;
