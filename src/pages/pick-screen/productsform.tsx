import MainLayout from "@/layout/MainLayout";
import ProductForm from "@/modules/PickScreenModule/ProductForm";
import { Box } from "@mui/material";

const ProductsForm = () => {
  return (
    <MainLayout mainStyle={{ padding: 0 }}>
      <Box sx={{ padding: 2 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
        Product Form
      </Typography> */}
        <ProductForm />
      </Box>
    </MainLayout>
  );
};
export default ProductsForm;
