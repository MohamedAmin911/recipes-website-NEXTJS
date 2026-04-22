import "Xprompt/styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import NavbarComponent from "Xprompt/components/header";
import FooterComponent from "Xprompt/components/footer";
import { CartProvider } from "Xprompt/context/CartContext";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    import("tailwindcss");
  }, []);

  const hideLayout = Component.hideLayout === true;

  return (
    <SessionProvider session={session}>
      <CartProvider>
        {!hideLayout ? <NavbarComponent /> : null}
        <Component {...pageProps} />
        {!hideLayout ? <FooterComponent /> : null}
      </CartProvider>
    </SessionProvider>
  );
}
