/* eslint-disable consistent-return */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Router from "next/router";

const getBaseQuery = () => {
  const baseQuery = fetchBaseQuery({ baseUrl: "/", mode: "cors" });
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      await baseQuery(
        {
          url: "/api",
          method: "POST",
        },
        api,
        extraOptions
      );
      result = await baseQuery(args, api, extraOptions);
    }

    if (result.error && result.error.status === 307) {
      Router.push("/login");
    }
    return result;
  };
  return baseQueryWithReauth;
};

const clientApi = createApi({
  reducerPath: "clientApi",
  // tagTypes: [
  //   'Orders',

  // ],
  baseQuery: getBaseQuery(),
  endpoints: () => ({}),
});

export default clientApi;
