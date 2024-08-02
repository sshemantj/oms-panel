import useUser from "@/hooks/useUser";
import MainLayout from "@/layout/MainLayout";
import { withRoleGuard } from "@/lib/WithRoleGuard";
import PickScreenModule from "@/modules/PickScreenModule";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const PickScreen: NextPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const router = useRouter();

  const handleFiltersSubmit = (filters: any) => {
    setSelectedFilters(filters);
    router.push({
      pathname: "/pick-screen/items-screen",
      query: { filters: JSON.stringify(filters) },
    });
  };
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <PickScreenModule />
      </MainLayout>
    </>
  );
};
export default withRoleGuard(PickScreen, {
  requiredRoles: ["picker", "storeTL", "globalTL"],
  fallbackUrl: "/404",
  redirectTo: "/login",
});
