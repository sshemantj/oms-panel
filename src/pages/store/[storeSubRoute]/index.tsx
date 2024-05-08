import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import SubRoutesModule from "@/modules/storeModule/subRoutesModule";

const StoreSubRoute: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout>
        <SubRoutesModule />
      </MainLayout>
    </>
  );
};

export default StoreSubRoute;
