import MainLayout from "@/layout/MainLayout";
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

export default PickScreen;
