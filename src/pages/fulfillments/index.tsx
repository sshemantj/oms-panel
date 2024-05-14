import { NextPage } from "next";
import Head from "next/head";
import MainLayout from "@/layout/MainLayout";
import FulfillmentsModule from "@/modules/fulfillmentsModule";

const Fulfillments: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <FulfillmentsModule />
      </MainLayout>
    </>
  );
};

export default Fulfillments;
