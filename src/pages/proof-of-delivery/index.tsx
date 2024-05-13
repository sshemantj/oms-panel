import MainLayout from "@/layout/MainLayout";
import HomeModule from "@/modules/homeModule";
import ProofOfDelieveryModule from "@/modules/proofOfDelieveryModule";
import { NextPage } from "next";
import Head from "next/head";

const ProofOfDelievery: NextPage = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout>
        <ProofOfDelieveryModule />
      </MainLayout>
    </>
  );
};

export default ProofOfDelievery;
