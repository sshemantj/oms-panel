import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import StoreModule from "@/modules/storeModule";

const Store: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout>
        <StoreModule />
      </MainLayout>
    </>
  );
};

export default Store;
