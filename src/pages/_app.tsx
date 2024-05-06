import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LoginComponent from "@/component/molecules/LoginModal";
import Loader from "@/component/atoms/loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <>
        <Component {...pageProps} />
        <LoginComponent />
        <Loader />
      </>
    </Providers>
  );
}
