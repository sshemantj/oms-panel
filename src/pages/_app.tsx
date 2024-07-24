import Loader from "@/component/atoms/loader";
import LoginComponent from "@/component/molecules/LoginModal";
import { RootState, store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { Providers } from "@/store/provider";
import { openLoginModal } from "@/store/slices/loginSlice";
import "@/styles/globals.css";
import { getStoreIdFromCookie } from "@/utils/cookies";
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif", // Use 'Poppins' as the primary font
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    function setViewportHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    }

    setViewportHeight(); // Initial call to set the initial --vh variable
    window.addEventListener("resize", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);

  useEffect(() => {
    const storeId = getStoreIdFromCookie();
    if (!storeId) {
      store.dispatch(openLoginModal());
    }
  }, []);

  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />

        <Loader />
        <Toaster position={isMobile ? "bottom-center" : "top-right"} />
      </ThemeProvider>
    </Providers>
  );
}
