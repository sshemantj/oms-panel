import { useRouter } from "next/router";
import React from "react";

const ListsRoutes = () => {
  const router = useRouter();
  const subRoute = router.query.lists;

  return <div>ListsRoutes : {subRoute}</div>;
};

export default ListsRoutes;
