import React from "react";
import MainLayout from "@/layout/MainLayout";
import { NextPage } from "next";
import Head from "next/head";
import FulfillmentSubRoutesModule from "@/modules/fulfillmentsModule/fulfillmentsSubRoutes";

const FulfillmentsIds: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <FulfillmentSubRoutesModule />
      </MainLayout>
    </>
  );
};
export default FulfillmentsIds;
