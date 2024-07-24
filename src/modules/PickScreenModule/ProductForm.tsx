import {
  fetchProductDetails,
  submitFormData,
} from "@/services/thunks/pickApis";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedFiltersForLoadPick } from "@/store/slices/filterSlice";
import {
  selectFormError,
  selectFormLoading,
  selectFormSuccess,
} from "@/store/slices/formSlice";
import { resetState } from "@/store/slices/pickItemDetailsSlice";
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
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface FormValues {
  additionalDamage?: string;
  size: string;
  orderNumber: string;
  ean: string;
  quantityToBePicked: number;
  sku: string;
  caNumber: string;
  consignmentNumber: string;
  colour: string;
  soQuantity: number;
  quantityPicked: number;
  pickFailReasons: string[];
  // pickFailReasons: string[];
}

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

  const omsId = Number(routerOmsId);

  const [reasons, setReasons] = useState<string[]>([""]);
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    let barcode: any;
    console.log("scannedCodes", scannedCodes);
    // scannedCodes ? JSON.parse(scannedCodes as any) : "";
    try {
      barcode = JSON.parse(scannedCodes as any);
      console.log("Parsed barcode:", barcode);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("barcode", barcode);

    const barcodeEan = barcode && barcode.length ? barcode[0] : "";
    console.log(barcodeEan, "ean here");
    const ean = barcodeEan;
    if (omsId) dispatch(fetchProductDetails({ omsId, ean }));
  }, [dispatch, omsId]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
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

  const formErrors: FieldErrors<FormValues> = errors;

  console.log("errors", errors);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const statusToBeUpdated = data.pickFailReasons.length
      ? "Pick Fail"
      : "Picked";
    const statusToBeUpdatedCount = data.pickFailReasons.length ? 5 : 3;
    const qcFlagToBeUpdated = data.pickFailReasons.length
      ? "QC Failed"
      : "QC Pass";
    const formData = {
      omsId: omsId,
      status: statusToBeUpdated || "",
      additionalDamage: Number(data.additionalDamage),
      quantityToBePicked: data.quantityToBePicked || 0,
      qcFlag: qcFlagToBeUpdated,
      quantityPicked: data.quantityPicked || 0,
      ...(data.pickFailReasons.length && {
        reasonForFail: data.pickFailReasons.join(" # "),
      }),
    };
    console.log("formData", formData);
    const resultAction = await dispatch(submitFormData(formData));
    const response = unwrapResult(resultAction);
    console.log("response", response);
    if (response.statusCode === 200) {
      const state = {
        estimatedShip: "",
        status: {
          statusId: statusToBeUpdatedCount,
          statusDescription: statusToBeUpdated,
        },
      };
      dispatch(setSelectedFiltersForLoadPick(state));
      toast.success(
        response.message || "Something went wrong while submitting form"
      );
      router.push({
        pathname: "/pick-screen/itemlist",
      });
      dispatch(resetState());
    } else {
      toast.error(
        response.message || "Something went wrong while submitting form"
      );
    }
  };

  useEffect(() => {
    console.log("data here", data);
    if (
      data &&
      Array.isArray(data.pickEntryItems) &&
      data?.pickEntryItems?.length
    ) {
      // const productDetails = (data.length && (data[0] as any)) || "";
      const productDetails: ProductDetails = data
        ?.pickEntryItems[0] as ProductDetails;
      console.log("productDetails hceck", productDetails);
      console.log(" productDetails.orderNumber", productDetails.orderNumber);
      setValue("orderNumber", productDetails.orderId || "");
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
    setValue("pickFailReasons", reasons);
  };

  const quantityPicked = watch("quantityPicked");
  const quantityToBePicked = watch("quantityToBePicked");
  const maxPickableQuantity = Math.max(quantityToBePicked - 1, 0);

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
                  InputProps={{
                    readOnly: true,
                  }}
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
                  disabled
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
              disabled={quantityPicked >= maxPickableQuantity}
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
          <>
            {" "}
            {data &&
            data.reasonForFail &&
            Array.isArray(data.reasonForFail) &&
            data.reasonForFail.length
              ? reasonsArray.map((reason, index) => (
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
                        error={
                          !!errors.pickFailReasons &&
                          !!errors.pickFailReasons[index]
                        }
                        // error={

                        //   !!errors[
                        //     `pickFailReason${index}` as keyof FieldErrors<FormValues>
                        //   ]
                        // }
                      >
                        <Controller
                          name={`pickFailReasons.${index}`}
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
                              // value={reason}
                              value={watch(`pickFailReasons.${index}`)}
                              onChange={(e) =>
                                handleReasonChange(e.target.value, index)
                              }
                            >
                              {data.reasonForFail.map((failReason: any) => (
                                <MenuItem
                                  key={failReason.id}
                                  value={failReason.reason}
                                >
                                  {failReason.reason}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                        {errors.pickFailReasons &&
                          errors.pickFailReasons[index] && (
                            <FormHelperText error>
                              {errors.pickFailReasons[index]?.message}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  </Grid>
                ))
              : null}
          </>
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
