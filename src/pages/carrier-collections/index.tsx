import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import CarrierCollectionModule from "@/modules/CarrierCollectionModule";

const CarrierCollection: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <CarrierCollectionModule />
      </MainLayout>
    </>
  );
};

export default CarrierCollection;
