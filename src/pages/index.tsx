import MainLayout from "@/layout/MainLayout";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Head from "next/head";

const NewPanel: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <HomeModule />
      </MainLayout>
    </>
  );
};

export default NewPanel;
