import useUser from "@/hooks/useUser";
import MainLayout from "@/layout/MainLayout";
import { withRoleGuard } from "@/lib/WithRoleGuard";
import DashboardModule from "@/modules/dashboardModule";
import { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
  const { user } = useUser({
    redirectTo: "/login",
  });
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

export default withRoleGuard(Dashboard, {
  requiredRoles: ["storeTL", "globalTL"],

  fallbackUrl: "/404",
});
