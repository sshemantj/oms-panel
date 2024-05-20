import MainLayout from "@/layout/MainLayout";
import ReturnsModule from "@/modules/returnsModule";
import { NextPage } from "next";
import Head from "next/head";

const Returns: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <ReturnsModule />
      </MainLayout>
    </>
  );
};

export default Returns;
