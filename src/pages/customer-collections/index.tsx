import MainLayout from "@/layout/MainLayout";
import { withRoleGuard } from "@/lib/WithRoleGuard";
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

export default withRoleGuard(CustomerCollection, {
  requiredRoles: ["packer", "storeTL", "globalTL"],
  fallbackUrl: "/404",
});
