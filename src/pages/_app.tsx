import Loader from "@/component/atoms/loader";
import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif", // Use 'Poppins' as the primary font
  },
});

export default function App({ Component, pageProps }: AppProps) {
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
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        {/* <LoginComponent /> */}
        <Loader />
        <Toaster />
      </ThemeProvider>
    </Providers>
  );
}
