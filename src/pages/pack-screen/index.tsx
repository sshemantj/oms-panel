import PackScreenStage from "@/components/PackScreenStage";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";

const PackScreen = () => {
  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        {/* <PickScreenModule /> */}
        <PackScreenStage />
      </MainLayout>
    </>
  );
};
export default PackScreen;
