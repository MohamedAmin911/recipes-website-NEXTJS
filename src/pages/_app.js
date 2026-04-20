import "Xprompt/styles/globals.css";
import { useEffect } from "react";
import NavbarComponent from "Xprompt/components/header";
import FooterComponent from "Xprompt/components/footer";
import { CartProvider } from "Xprompt/context/CartContext";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("tailwindcss");
  }, []);

  const hideLayout = Component.hideLayout === true;

  return (
    <CartProvider>
      {!hideLayout ? <NavbarComponent /> : null}
      <Component {...pageProps} />
      {!hideLayout ? <FooterComponent /> : null}
    </CartProvider>
  );
}
