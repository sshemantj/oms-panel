import { useRouter } from "next/router";
import React from "react";

const SubRoutesModule = () => {
  const router = useRouter();
  const subRoute = router.query.storeSubRoute;
  return (
    <div>
      <div>StoreSubRoute : {subRoute}</div>
    </div>
  );
};

export default SubRoutesModule;
