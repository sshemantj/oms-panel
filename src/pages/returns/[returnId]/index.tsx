import MainLayout from "@/layout/MainLayout";
import ReturnIdModule from "@/modules/returnsModule/returnIdModule";
import { NextPage } from "next";
import Head from "next/head";

const ReturnId: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <ReturnIdModule />
      </MainLayout>
    </>
  );
};

export default ReturnId;
