/* eslint-disable consistent-return */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    prepareHeaders: (headers) => {
      // headers.set('Authorization', 'UnVEVWZwNnJKL1o2ZlIrWHBUMDlYdz09');
      // headers.set('SourceId', '2');
      headers.set("Accept-Encoding", "gzip,deflate,compress");
      // headers.set(
      //   'token',
      //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjIxMiwiaWF0IjoxNTc0NjY2OTMxLCJleHAiOjE2MDYyMDI5MzF9.fDfZvn6dhuDzG3iHKOkjZYlLVSawlS_mg8J7Bd-CBE4'
      // );
      return headers;
    },
    credentials: "same-origin",
    mode: "cors",
  }),
  endpoints: () => ({}),
});

export default serverApi;
