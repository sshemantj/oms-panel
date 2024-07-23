import SelectDropdown from "@/component/atoms/selectDropdown";
import Loader from "@/component/molecules/Loader";
import ModalComponent from "@/component/molecules/ModalComponent";
import {
  fetchCourierData,
  getConsignmentCourierItems,
  getPackStatusCount,
  packFilters,
  updateCourierPartner,
} from "@/services/thunks/packApis";
import { useAppDispatch } from "@/store/hooks";
import {
  CustomCardProps,
  DropdownAction,
  DropdownState,
} from "@/types/Consignments";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import PackScreenTable from "./PackTable";
import { getStoreIdFromCookie } from "@/utils/cookies";

export const commonSelectSx = {
  width: "170px",
  "& .MuiInputBase-input": {
    padding: "5px",
  },
  "& fieldset legend": {
    display: "none",
  },
  "& label": {
    top: 0,
    display: "none",
  },
  "& .MuiInputLabel-shrink": {
    top: "15px",
  },
};

const initialDropdownState: DropdownState = {
  brands: [],
  trays: [],
  deliveryMode: [],
};
const dropdownReducer = (
  state: DropdownState,
  action: DropdownAction
): DropdownState => {
  switch (action.type) {
    case "brands":
    case "trays":
    case "deliveryMode":
    case "selectedBrand":
    case "selectedTray":
    case "selectedDeliveryMode":
      return {
        ...state,
        [action.type]: action.value,
      };
    default:
      return state;
  }
};
const CustomCard = ({ title, number }: CustomCardProps) => (
  <Box justifyContent={"center"} padding="1rem">
    <Typography variant="h6" align="center" color="red">
      {title}
    </Typography>
    <Card
      style={{
        maxWidth: "25%",
        margin: "0 auto",
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
      }}
    >
      <CardContent
        sx={{
          padding: "0.5rem",

          ":last-child": {
            paddingBottom: "0.5rem",
          },
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" align="center">
          {number}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

interface DropdownOption {
  label: string;
  value: string | number;
}

function getDropdownValues<T>(
  items: T[],
  labelKey: keyof T,
  valueKey: keyof T
): DropdownOption[] {
  return items.map((item) => ({
    label: item[labelKey] as unknown as string,
    value: item[valueKey] as unknown as string | number,
  }));
}

const PackScreenStage = () => {
  const [dropdownState, dropdownDispatch] = useReducer(
    dropdownReducer,
    initialDropdownState
  );
  const reduxDispatch = useAppDispatch();
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [submittedFilters, setSubmittedFilters] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAssignCourierModal, setShowAssignCourierModal] = useState(false);

  const [consignmentId, setConsignmentId] = useState("");
  const [consignmentData, setConsignmentData] = useState<any>(null);
  const [selectedCourierPartner, setSelectedCourierPartner] =
    useState<any>(null);

  const [statusCounts, setStatusCounts] = useState([]);
  const [courierPartnerDropDown, setCourierPartnerDropDown] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const locationId = getStoreIdFromCookie();

  useEffect(() => {
    setLoading(true);

    if (locationId)
      reduxDispatch(packFilters(locationId))
        .unwrap()
        .then((response) => {
          dropdownDispatch({ type: "brands", value: response.brands });
          dropdownDispatch({ type: "trays", value: response.trays });
          dropdownDispatch({
            type: "deliveryMode",
            value: response.deliveryMode,
          });
        })
        .catch((err) => {
          console.log("error", err);
        });

    const fetchStatusCounts = async () => {
      if (locationId) {
        setLoading(true);
        try {
          const resultAction = await reduxDispatch(
            getPackStatusCount(locationId)
          );
          const data = unwrapResult(resultAction);
          setStatusCounts(data);
        } catch (error) {
          console.error("Failed to fetch status counts: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    const fetchCourierForDropDown = async () => {
      if (locationId) {
        setLoading(true);
        try {
          const resultAction = await reduxDispatch(fetchCourierData());
          const data = unwrapResult(resultAction);
          setCourierPartnerDropDown(data);
        } catch (error) {
          console.error("Failed to fetch status counts: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    setLoading(false);

    fetchStatusCounts();
    fetchCourierForDropDown();
  }, [reduxDispatch]);

  // useGetPickFiltersQuery

  const handleDropdownChange =
    (type: "selectedBrand" | "selectedTray" | "selectedDeliveryMode") =>
    (event: React.ChangeEvent<{ value: unknown }>) => {
      dropdownDispatch({ type, value: event.target.value as string });
    };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const selectedValues = {
      brand: dropdownState.selectedBrand,
      tray: dropdownState.selectedTray,
      deliveryMode: dropdownState.selectedDeliveryMode,
    };
    const values = Object.values(selectedValues);
    const isValid = values.some(
      (value) => value !== null && value !== undefined && value !== ""
    );
    if (!isValid) {
      toast.error("At least one filter value must be selected.");
      return;
    } else {
      setIsFilterSelected(true);
      setSubmittedFilters({ ...selectedValues });
    }
  };

  const brandDropdownValues = getDropdownValues(
    dropdownState.brands,
    "brandName",
    "brandName"
  );
  const trayDropdownValues = getDropdownValues(
    dropdownState.trays,
    "trayCode",
    "id"
  );
  const deliveryModeDropdownValues = getDropdownValues(
    dropdownState.deliveryMode,
    "deliveryModeName",
    "deliveryModeName"
  );

  const getStatusCount = (status: any) => {
    const statusObj: any = statusCounts.find(
      (item: any) => item.packStatus === status
    );
    return statusObj ? statusObj.totalCount : 0;
  };
  const handleSearchSubmit = async () => {
    if (!consignmentId) {
      toast.error("Consignment ID is required");
      return;
    }
    setLoading(true);

    try {
      const resultAction = await reduxDispatch(
        getConsignmentCourierItems({ locationId: locationId, consignmentId })
      );
      const data = unwrapResult(resultAction);
      if (data && data.consignmentItems.length) {
        setConsignmentData(data);
        setModalOpen(true);
      } else {
        toast.error("No data found for the provided Consignment ID");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch consignment item details:");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleAssignCourier = () => {
    setShowAssignCourierModal(true);
  };

  const courierDropDownData = courierPartnerDropDown?.map((courier: any) => {
    return {
      label: courier.courierName,
      value: courier.courierName,
    };
  });

  const handleCourierDropdownChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedCourierPartner(e.target.value);
  };

  const handleSubmittedCourierPartner = async (e: any) => {
    e.preventDefault();
    if (!selectedCourierPartner) {
      toast.error("Courier partner is required");
      return;
    }
    if (consignmentData.length === 0) {
      toast.error("Consigments not reads");
      return;
    }

    const payload = consignmentData.consignmentItems.map((item: any) => ({
      omsId: String(item.omsId),
      omsOrderId: item.omsOrderId,
      consignmentId: String(item.consignmentId),
      courier: selectedCourierPartner,
      locationId: locationId,
    }));

    try {
      const updateWeightResponse = await reduxDispatch(
        updateCourierPartner(payload)
      );
      const response = unwrapResult(updateWeightResponse);
      if (response.statusCode === 200) {
        toast.success(
          response.message ||
            "Something went wrong while updating courier partner"
        );
        setShowAssignCourierModal(false);
      } else {
        toast.error(
          response.message ||
            "Something went wrong while updating courier partner"
        );
      }
    } catch (error) {
      console.error("Error updating weights:", error);
    }
  };

  return (
    <>
      {loading ? <Loader size={50} color="primary" overlay={true} /> : null}

      <Grid container spacing={3} padding={4}>
        {/* Left Grid with Dropdowns */}
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={2}
            paddingTop={0.5}
            justifyContent={"center"}
          >
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Brand"
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: dropdownState.selectedBrand ? 0 : "-12px",
                    display: dropdownState.selectedBrand ? "none" : "unset",
                  },
                }}
                value={dropdownState.selectedBrand}
                handleOnChange={handleDropdownChange("selectedBrand")}
                data={brandDropdownValues}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectDropdown
                label="Tray"
                value={dropdownState.selectedTray}
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: dropdownState.selectedTray ? 0 : "-12px",
                    display: dropdownState.selectedTray ? "none" : "unset",
                  },
                }}
                handleOnChange={handleDropdownChange("selectedTray")}
                data={trayDropdownValues}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <SelectDropdown
                label="Delivery Mode"
                value={dropdownState.selectedDeliveryMode}
                selectSx={{
                  ...commonSelectSx,
                  "& label": {
                    top: dropdownState.selectedDeliveryMode ? 0 : "-12px",
                    display: dropdownState.selectedDeliveryMode
                      ? "none"
                      : "unset",
                  },
                }}
                handleOnChange={handleDropdownChange("selectedDeliveryMode")}
                data={deliveryModeDropdownValues}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              marginRight={"6rem"}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Grid with Cards */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4 px",
            }}
          >
            <Grid
              item
              xs={6}
              borderRadius={2}
              style={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)" }}
            >
              <CustomCard
                title="Pick in Progress"
                number={getStatusCount("Pick In Progress")}
              />
            </Grid>
            <Grid
              item
              xs={6}
              borderRadius={2}
              style={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)" }}
              ml={2}
            >
              <CustomCard title="Dropped" number={getStatusCount("Dropped")} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            marginRight: 2,
          }}
        >
          <TextField
            label="Search by Consignment ID"
            value={consignmentId}
            onChange={(e) => setConsignmentId(e.target.value)}
            variant="outlined"
            size="small"
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchSubmit}>
                    <GridSearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title=""
          maxWidth="lg"
        >
          <Grid
            sx={{
              padding: 2,
              backgroundColor: "white",

              display: "flex",

              flexDirection: "column",
            }}
          >
            {consignmentData && consignmentData.consignmentItems.length
              ? consignmentData.consignmentItems.map(
                  (item: any, index: number) => (
                    <>
                      <Grid
                        container
                        spacing={2}
                        key={item.consignmentId}
                        marginTop={0.1}
                      >
                        <Grid item xs={12}>
                          <Grid container width={"100%"}>
                            <Grid item xs={12} md={12} my={0.5}>
                              <TableContainer
                                component={Card}
                                style={{
                                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                                  transition: "transform 0.3s ease-in-out",
                                }}
                              >
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Product Name</TableCell>
                                      <TableCell>Brand</TableCell>
                                      <TableCell>Sku</TableCell>
                                      <TableCell>EAN</TableCell>
                                      <TableCell>Price</TableCell>
                                      <TableCell>CA Number</TableCell>
                                      <TableCell>Quantity to Pack</TableCell>
                                      <TableCell>Size</TableCell>
                                      <TableCell>Colour</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {/* {itemsInConsignment.map((item: any, index) => ( */}
                                    <TableRow key={index}>
                                      <TableCell>{item.productName}</TableCell>
                                      <TableCell>{item.brand}</TableCell>
                                      <TableCell>{item.sku}</TableCell>
                                      <TableCell>{item.ean}</TableCell>
                                      <TableCell>{item.price}</TableCell>
                                      <TableCell>{item.caNumber}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{item.size}</TableCell>
                                      <TableCell>{item.color}</TableCell>
                                    </TableRow>
                                    {/* // ))} */}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )
                )
              : null}
            <Grid
              container
              xs={12}
              sx={{
                paddingY: 2,
                backgroundColor: "white",

                display: "flex",
                marginTop: 3,

                gap: 4,
              }}
            >
              <Grid
                xs={3}
                component={Card}
                padding={2}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                {consignmentData && consignmentData.customerDetails ? (
                  <Box
                    sx={{
                      display: "flex",

                      gap: 0.5,
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6">Customer Information</Typography>
                    <Typography variant="subtitle2">
                      {consignmentData.customerDetails.name}
                    </Typography>{" "}
                    <Typography variant="subtitle2">
                      {consignmentData.customerDetails.address}
                    </Typography>{" "}
                    <Typography variant="subtitle2">
                      {consignmentData.customerDetails.contactNo}
                    </Typography>
                  </Box>
                ) : null}
              </Grid>
              <Grid
                xs={3}
                component={Card}
                padding={2}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                {consignmentData && consignmentData.shipmentDetails ? (
                  <Box
                    sx={{
                      display: "flex",

                      gap: 0.5,
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6">Shipment Information</Typography>
                    <Typography variant="subtitle2">
                      {consignmentData.shipmentDetails.storeName}
                    </Typography>
                    <Typography variant="subtitle2">
                      {consignmentData.shipmentDetails.address}
                    </Typography>
                  </Box>
                ) : null}
              </Grid>
              <Grid
                xs={3}
                component={Card}
                padding={2}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                {consignmentData && consignmentData.courierDetails ? (
                  <Box
                    sx={{
                      display: "flex",

                      gap: 0.5,
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6">Courier Information</Typography>
                    <Typography variant="subtitle2">
                      {consignmentData.courierDetails.courierName}
                    </Typography>
                  </Box>
                ) : null}
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAssignCourier}
                sx={{ marginTop: "1rem" }}
                // disabled={assigncourierdisabled}
              >
                Assign Courier
              </Button>
            </Box>

            {showAssignCourierModal ? (
              <ModalComponent
                open={showAssignCourierModal}
                onClose={() => setShowAssignCourierModal(false)}
                title=""
                maxWidth="sm"
              >
                {/* <div style={{ height: "100%" }}> */}
                <Box
                  sx={{
                    padding: 4,
                    // height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // maxWidth: 400,
                    // margin: "auto",
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        // sx={{ zIndex: 1300, position: "relative" }}
                      >
                        <SelectDropdown
                          label="select courier partner"
                          selectSx={{
                            ...commonSelectSx,
                            width: "220px",
                            // overflow: "visible",
                            "& label": {
                              top: selectedCourierPartner ? 0 : "-12px",
                              display: selectedCourierPartner
                                ? "none"
                                : "unset",
                            },
                          }}
                          value={selectedCourierPartner}
                          handleOnChange={handleCourierDropdownChange}
                          data={courierDropDownData}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          type="submit"
                          onClick={handleSubmittedCourierPartner}
                          variant="contained"
                          color="primary"
                        >
                          Assign
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
                {/* </div> */}
              </ModalComponent>
            ) : null}
          </Grid>
        </ModalComponent>
      </div>
      <Box>
        <PackScreenTable filters={submittedFilters} />
      </Box>
    </>
  );
};
export default PackScreenStage;
