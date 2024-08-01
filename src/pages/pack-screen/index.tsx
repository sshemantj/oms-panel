import PackScreenStage from "@/components/PackScreenStage";
import useUser from "@/hooks/useUser";
import MainLayout from "@/layout/MainLayout";
import { withRoleGuard } from "@/lib/WithRoleGuard";
import Head from "next/head";

const PackScreen = () => {
  const { user } = useUser({
    redirectTo: "/login",
  });
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
export default withRoleGuard(PackScreen, {
  requiredRoles: ["packer", "storeTL", "globalTL"],
  fallbackUrl: "/404",
});
