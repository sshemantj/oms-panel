import {
  fetchProductDetails,
  submitFormData,
} from "@/services/thunks/pickApis";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetState,
  selectFormError,
  selectFormLoading,
  selectFormSuccess,
} from "@/store/slices/formSlice";
import { ProductDetails } from "@/types/productdetails";
import { ToastError } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  orderNumber: yup.string().required("Order number is required"),
  consignmentNumber: yup.string().required("Consignment number is required"),
  sku: yup.string().required("SKU is required"),
  ean: yup.string().required("EAN is required"),
  size: yup.string().required("Size is required"),
  colour: yup.string().required("Colour is required"),
  caNumber: yup.string().required("CA number is required"),
  soQuantity: yup
    .number()
    .required("SO quantity is required")
    .min(0, "Must be greater than or equal to 0"),
  quantityToBePicked: yup
    .number()
    .required("Quantity to be picked is required")
    .min(0, "Must be greater than or equal to 0"),
  quantityPicked: yup
    .number()
    .required("Quantity picked is required")
    .min(0, "Must be greater than or equal to 0"),
  additionalDamage: yup
    .string()

    .min(0, "Must be greater than or equal to 0"),
  pickFailReasons: yup.array().of(yup.string().required()).required(),
});

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// const data = [
//   { label: "reason1", value: "reason1" },
//   { label: "reason2", value: "reason2" },
//   { label: "reason3", value: "reason3" },
// ];

const ProductForm = () => {
  const {
    data = [],
    loading,
    error,
  } = useAppSelector((state: RootState) => state.productDetails);
  const dispatch = useAppDispatch();
  const submitFormLoading = useAppSelector(selectFormLoading);
  const submitFormError = useAppSelector(selectFormError);
  const submitFormSuccess = useAppSelector(selectFormSuccess);

  const router = useRouter();
  const {
    omsId: routerOmsId = "",
    scannedCodes = [],
    quantityToBePicked: routerQuantiyPicked = 0,
    pickStatus = "",
  } = router.query;
  console.log("router.query", router.query);

  const omsId = Number(routerOmsId);

  const [reasons, setReasons] = useState<string[]>([""]);
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    console.log("omsId here", omsId);
    let barcode: any;
    // scannedCodes ? JSON.parse(scannedCodes as any) : "";
    try {
      barcode = JSON.parse(scannedCodes as any);
      console.log("Parsed barcode:", barcode);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("barcode", barcode);

    // const ean = barcode && barcode.length ? barcode[0] : "";
    const ean = "14054LAVENDER003";
    dispatch(fetchProductDetails({ omsId, ean }));
  }, [dispatch, omsId]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      orderNumber: "",
      consignmentNumber: "",
      sku: "",
      ean: "",
      size: "",
      colour: "",
      caNumber: "",
      soQuantity: 0,
      quantityToBePicked: 0,
      quantityPicked: 0,
      additionalDamage: "",
      pickFailReasons: [],
    },
  });

  console.log("errors", errors);

  const onSubmit = (data: any) => {
    // Example data to submit (adjust as per your form fields)
    console.log("data", data);

    const formData = {
      omsId: omsId,
      status: (pickStatus as string) || "",
      additionalDamage: Number(data.additionalDamage),
      quantityToBePicked: data.quantityToBePicked || 0,
      quantityPicked: data.quantityPicked || 0,
      reasonForFail: "COLOR NOT MATCHED",
    };

    dispatch(submitFormData(formData));
  };

  useEffect(() => {
    console.log("submitFormSuccess", submitFormSuccess);
    if (submitFormSuccess) {
      // const state = {
      //   estimatedShip: "",
      //   status: {
      //     statusId: 5,
      //     statusDescription: "Dropped",
      //   },
      // };
      // dispatch(setSelectedFiltersForLoadPick(state));
      router.push({
        pathname: "/pick-screen/itemlist",
      });
      dispatch(resetState());
    }
  }, [submitFormSuccess]);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length) {
      // const productDetails = (data.length && (data[0] as any)) || "";
      const productDetails: ProductDetails = data[0] as ProductDetails;
      console.log("productDetails hceck", productDetails);
      console.log(" productDetails.orderNumber", productDetails.orderNumber);
      setValue("orderNumber", productDetails.orderNumber || "");
      setValue("consignmentNumber", productDetails.consignmentId || "");
      setValue("sku", productDetails.sku || "");
      setValue("ean", productDetails.ean || "");
      setValue("size", productDetails.skuSize || "");
      setValue("colour", productDetails.color || "");
      setValue("caNumber", productDetails.caNumber || "");
      setValue("quantityToBePicked", Number(productDetails.quantity) || 0);
      setValue("quantityPicked", Number(routerQuantiyPicked) || 0);
      setProductImageUrl(productDetails.imageUrl || "");
      setProductName(productDetails.productName || "");
      // setValue(
      //   "soQuantity",
      //   productDetails.quantity ? parseInt(productDetails.quantity) : 0
      // );
    }
  }, [data, setValue]);

  const handleReasonChange = (value: string, index: number) => {
    const reasons = [...watch("pickFailReasons")];
    reasons[index] = value;
    // setValue("pickFailReasons", reasons);
  };

  const quantityPicked = watch("quantityPicked");
  const quantityToBePicked = watch("quantityToBePicked");

  const reasonsCount = Math.max(quantityToBePicked - quantityPicked, 0);
  const reasonsArray = Array.from({ length: reasonsCount }, (_, i) => i);

  useEffect(() => {
    setValue("pickFailReasons", Array(reasonsCount).fill(""));
  }, [reasonsCount, setValue]);

  if (error) {
    ToastError(error || "Failed to fetch data");
  }

  return loading ? (
    <Box
      className="h-screen"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {productImageUrl ? (
        <Image
          src={productImageUrl}
          width={150}
          height={150}
          alt="product image"
        />
      ) : (
        <Image
          src="https://via.placeholder.com/150"
          width={150}
          height={150}
          alt="Product placeholder"
        />
      )}
      {productName ? <Typography>{productName}</Typography> : null}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <Typography>Order Number</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="orderNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.orderNumber}
                  helperText={errors.orderNumber?.message}
                  type="text"
                  size="small"
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>Consignment Number</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="consignmentNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.consignmentNumber}
                  helperText={errors.consignmentNumber?.message}
                  type="text"
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>SKU</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="sku"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.sku}
                  helperText={errors.sku?.message}
                  type="text"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>EAN</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="ean"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.ean}
                  helperText={errors.ean?.message}
                  type="text"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>Size</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.size}
                  helperText={errors.size?.message}
                  type="text"
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>Colour</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="colour"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.colour}
                  helperText={errors.colour?.message}
                  type="text"
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>CA Number</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="caNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.caNumber}
                  helperText={errors.caNumber?.message}
                  type="text"
                  size="small"
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>SO Quantity</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="soQuantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  error={!!errors.soQuantity}
                  helperText={errors.soQuantity?.message}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>Quantity to be Picked</Typography>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="quantityToBePicked"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  error={!!errors.quantityToBePicked}
                  helperText={errors.quantityToBePicked?.message}
                  size="small"
                  sx={{ width: "25%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={5}>
            <Typography>Quantity Picked</Typography>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <IconButton
              onClick={() =>
                setValue("quantityPicked", Math.max(quantityPicked - 1, 0))
              }
              disabled={quantityPicked <= 0}
            >
              <RemoveIcon />
            </IconButton>
            <Controller
              name="quantityPicked"
              control={control}
              rules={{
                required: "Quantity is required",
                validate: (value) =>
                  value >= 0 || "Quantity cannot be negative",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  error={!!errors.quantityPicked}
                  helperText={errors.quantityPicked?.message}
                  size="small"
                  sx={{ width: "25%" }}
                  inputProps={{
                    max: quantityToBePicked,
                  }}
                />
              )}
            />
            <IconButton
              onClick={() =>
                setValue("quantityPicked", (quantityPicked || 0) + 1)
              }
              disabled={quantityPicked >= quantityToBePicked}
            >
              <AddIcon />
            </IconButton>
          </Grid>

          <>
            <Grid item xs={5}>
              <Typography>Additional Damage</Typography>
            </Grid>
            <Grid item xs={7}>
              <Controller
                name="additionalDamage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={!!errors.additionalDamage}
                    helperText={errors.additionalDamage?.message}
                    size="small"
                    sx={{ width: "25%" }}
                  />
                )}
              />
            </Grid>
          </>

          {reasonsArray.map((reason, index) => (
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              key={index}
              sx={{ marginY: 1, paddingX: 2 }}
            >
              <Grid item xs={5}>
                <Typography>
                  <span>#</span> {index}
                </Typography>
              </Grid>
              <Grid
                item
                xs={7}
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FormControl
                  fullWidth
                  error={!!errors[`pickFailReason${index}`]}
                >
                  <Controller
                    name={`pickFailReason${index}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        size="medium"
                        {...field}
                        sx={{
                          width: "200px",
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
                        }}
                        label="Reason for Pick Fail"
                        value={reason}
                        onChange={(e) =>
                          handleReasonChange(e.target.value, index)
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="reason1">Reason 1</MenuItem>
                        <MenuItem value="reason2">Reason 2</MenuItem>
                        <MenuItem value="reason3">Reason 3</MenuItem>
                      </TextField>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
