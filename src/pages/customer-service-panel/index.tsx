import CustomerService from "@/components/CustomerService";
import MainLayout from "@/layout/MainLayout";

import { NextPage } from "next";
import Head from "next/head";

const CustomerServicePanel: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <CustomerService />
      </MainLayout>
    </>
  );
};

export default CustomerServicePanel;
