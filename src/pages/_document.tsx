import { logo } from "@/images/AllDataIcons";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={logo} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
