import MainLayout from "@/layout/MainLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Head from "next/head";
import { useEffect, useState } from "react";

import ChipList from "@/modules/PickScreenModule/ChipList";
import SwipeableCard from "@/modules/PickScreenModule/SwipeableCard";
import TabNavigation from "@/modules/PickScreenModule/TabNavigation";
import { fetchPickItemDetails } from "@/services/thunks/pickApis";
import { deleteFilterItem } from "@/store/slices/filterSlice";
import { ToastError } from "@/utils/toast";
import { Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const statuses = [
  "Order Awaited",
  "Awaiting Pick",
  "Pick in Progress",
  "Picked",
  "Dropped",
  "Pick Fail",
];

const tabColors = [
  "#FFC9C9", // Order Awaited
  "#E8590C", // Awaiting Pick
  "#FFEC99", // Pick in Progress
  "#A5D8FF", // Picked
  "#B2F2BB", // Dropped
  "#C2255C", // Pick Fail
];

const ItemList = () => {
  const dispatch = useAppDispatch();

  const selectedPickFilters: any = useAppSelector(
    (state) => state.filters?.selectedPickFilters
  );

  console.log("selectedFilters", selectedPickFilters);

  const {
    brand: { brandName = "" } = {},
    // category: { categoryId = "0", categoryName = "" } = {},
    channel: { channelName = "" } = {},
    deliveryMode: { deliveryModeName = "" } = {},
    estimatedShip = new Date(),
    orderNumber = "",
    status: { statusId = 0, statusDescription = "" } = {},
    locationId = "1",
  } = selectedPickFilters || {};

  const [chipData, setChipData] = useState(
    [
      { key: 0, label: brandName, filterKey: "brand" },
      // { key: 1, label: categoryName, filterKey: "category" },
      { key: 1, label: channelName, filterKey: "channel" },
      { key: 2, label: deliveryModeName, filterKey: "deliveryMode" },
      // { key: 4, label: statusDescription, filterKey: "status" },
    ].filter((chip) => chip.label)
  );

  const [value, setValue] = useState(Math.max(statusId - 1, 0));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = (chipToDelete: any) => () => {
    console.log("chipToDelete", chipToDelete);
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    dispatch(deleteFilterItem(chipToDelete.filterKey));
  };

  const { items, status, offset, limit, error } = useAppSelector(
    (state) => state.pickItemDetails
  );
  console.log("items check", items);
  // const observer = useRef();

  // const lastOrderElementRef = useCallback(
  //   (node) => {
  //     if (status === "loading") return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         dispatch(incrementOffset());
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [status, dispatch]
  // );
  useEffect(() => {
    // const filters = {
    //   brand: { brandId: "string", brandName: "string" },
    //   channel: { channelId: 0, name: "string" },
    //   category: "string",
    //   deliveryMode: "string",
    //   etd: "2024-07-01",

    //   orderNumber: "string",
    //   status: { statusCode: "string", statusDescription: "Pick In Progress" },
    //   locationId: "100",
    // };
    const parsedEstimatedShip = dayjs(estimatedShip).isValid()
      ? dayjs(estimatedShip).format("YYYY-MM-DD")
      : "";

    const filters: any = {};
    if (brandName) filters.brand = { brandName };
    // if (categoryId && categoryName) filters.category = { categoryId, categoryName };
    if (channelName) filters.channel = { channelName };
    if (deliveryModeName) filters.deliveryMode = deliveryModeName;
    if (parsedEstimatedShip) filters.etd = parsedEstimatedShip;
    // if (estimatedShip) filters.etd = estimatedShip.toISOString().split("T")[0];
    if (orderNumber) filters.orderNumber = orderNumber;
    console.log("value", value);
    console.log("statuses[value]", statuses[value]);

    if (statuses[value])
      filters.status = {
        // statusCode: `${value}`,
        statusDescription: `${statuses[value]}`,
      };
    if (locationId) filters.locationId = locationId;
    console.log({ offset, limit, filters });

    dispatch(fetchPickItemDetails({ offset: 0, limit: 10, filters }));
  }, [dispatch, selectedPickFilters, value]);

  if (status === "failed") {
    ToastError(error || "Failed to fetch data");
  }
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <div>
          {chipData.length ? (
            <ChipList chipData={chipData} handleDelete={handleDelete} />
          ) : null}
          <TabNavigation
            value={value}
            onChange={handleChange}
            statuses={statuses}
            tabColors={tabColors}
          />
          <Box
            className="h-screen"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "12px",
              gap: 1.5,
            }}
          >
            {status === "loading" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <CircularProgress />
              </Box>
            ) : items.length ? (
              items.map((order, index) => {
                if (items.length === index + 1) {
                  return (
                    // <div ref={lastOrderElementRef} key={index}>
                    <div key={index}>
                      <SwipeableCard order={order} />
                    </div>
                  );
                } else {
                  return <SwipeableCard key={index} order={order} />;
                }
              })
            ) : (
              <p>No Products Found</p>
            )}
          </Box>
        </div>
      </MainLayout>
    </>
  );
};
export default ItemList;
