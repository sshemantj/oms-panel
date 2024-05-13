import MainLayout from "@/layout/MainLayout";
import CarrierBooking from "@/modules/storeModule/subRoutesModule/carrierBooking";
import { NextPage } from "next";
import Head from "next/head";

const Demo: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout>
        <CarrierBooking />
      </MainLayout>
    </>
  );
};

export default Demo;
