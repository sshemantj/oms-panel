import MainLayout from "@/layout/MainLayout";
import DashboardModule from "@/modules/dashboardModule";
import { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <DashboardModule />
      </MainLayout>
    </>
  );
};

export default Dashboard;
