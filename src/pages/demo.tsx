import MainLayout from "@/layout/MainLayout";
import DemoModule from "@/modules/demoModule";
import { NextPage } from "next";
import Head from "next/head";

const DemoPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout>
        <DemoModule />
      </MainLayout>
    </>
  );
};

export default DemoPage;
