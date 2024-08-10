import CustomerService from "@/components/CustomerService";
import useUser from "@/hooks/useUser";
import MainLayout from "@/layout/MainLayout";
import { withRoleGuard } from "@/lib/WithRoleGuard";

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

export default withRoleGuard(CustomerServicePanel, {
  requiredRoles: ["customerService"],
  fallbackUrl: "/404",
  redirectTo: "/login",
});
