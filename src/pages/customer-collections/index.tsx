import MainLayout from "@/layout/MainLayout";
import CustomerCollecionModule from "@/modules/CustomerCollectionModule";
import { NextPage } from "next";
import Head from "next/head";

const CustomerCollection: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <CustomerCollecionModule />
      </MainLayout>
    </>
  );
};

export default CustomerCollection;
