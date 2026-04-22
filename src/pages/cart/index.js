import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import QuoteToast from "Xprompt/components/QuoteToast";
import { useCart } from "Xprompt/context/CartContext";

function CartPage({ initialQuote }) {
  const { data: session } = useSession();
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [quote, setQuote] = useState(initialQuote);

  useEffect(() => {
    const intervalId = window.setInterval(async () => {
      try {
        const response = await fetch("/api/quotes/random");
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setQuote(data);
      } catch {
        // Keep the last successful quote visible if polling fails.
      }
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#ffffff_100%)] px-4 pb-16 pt-14 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Cart page
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                Review your selected products.
              </h1>
            </div>

            {cartItems.length ? (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear cart
              </button>
            ) : null}
          </div>

          {cartItems.length === 0 ? (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 px-6 py-10 text-center text-slate-500">
              Your cart is empty. Buy a product from the home page to see it
              here.
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-950">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="rounded-full px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="px-3 text-sm font-semibold text-slate-950">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="rounded-full px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Order summary
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-slate-600">Items</span>
                  <span className="font-semibold text-slate-950">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-lg font-semibold text-slate-950">
                    Total price
                  </span>
                  <span className="text-2xl font-semibold text-slate-950">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      {session && <QuoteToast quote={quote} />}
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const initialQuote = await response.json();

    return {
      props: {
        initialQuote,
      },
    };
  } catch {
    return {
      props: {
        initialQuote: null,
      },
    };
  }
}

export default CartPage;
