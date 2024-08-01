import MainLayout from "@/layout/MainLayout";
import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Head from "next/head";
import useUser from "@/hooks/useUser";

const NewPanel: NextPage = () => {
  const { user } = useUser({
    redirectTo: "/login",
  });

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
