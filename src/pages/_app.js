import "Xprompt/styles/globals.css";
import { useEffect } from "react";
import NavbarComponent from "Xprompt/components/header";
import FooterComponent from "Xprompt/components/footer";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("tailwindcss");
  }, []);

  return (
    <>
      <NavbarComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}
