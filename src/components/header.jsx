import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "../context/CartContext";

function NavbarComponent() {
  const { data: session } = useSession();
  const { itemCount } = useCart();

  if (!session) {
    return (
      <nav className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="https://template.canva.com/EAFaFUz4aKo/3/0/1200w-Sd94vjjru0s.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH7DHWAQDT%2F20260418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260418T213817Z&X-Amz-Expires=87319&X-Amz-Signature=200b5d439ac8bc0645884cd37c7af0ef43a3ef806acd35017c9d441074336e64&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Sun%2C%2019%20Apr%202026%2021%3A53%3A36%20GMT"
              alt="Logo"
              width={90}
              height={90}
              unoptimized
            />
          </Link>

          <div className="hidden w-full md:block md:w-auto">
            <ul className="mt-4 flex flex-row flex-wrap items-center rounded-base border border-slate-200 bg-slate-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0">
              <li>
                <Link
                  href="/"
                  className="block rounded px-3 py-2 text-slate-600 hover:text-slate-950 md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="block rounded px-3 py-2 text-slate-600 hover:text-slate-950 md:p-0 md:hover:bg-transparent"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signIn()}
                  className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://template.canva.com/EAFaFUz4aKo/3/0/1200w-Sd94vjjru0s.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH7DHWAQDT%2F20260418%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260418T213817Z&X-Amz-Expires=87319&X-Amz-Signature=200b5d439ac8bc0645884cd37c7af0ef43a3ef806acd35017c9d441074336e64&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Sun%2C%2019%20Apr%202026%2021%3A53%3A36%20GMT"
            alt="Logo"
            width={90}
            height={90}
            unoptimized
          />
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-base p-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-row flex-wrap items-center rounded-base border border-slate-200 bg-slate-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0">
            <li>
              <Link
                href="/"
                className="block rounded px-3 py-2 text-slate-600 hover:text-slate-950 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/aboutus"
                className="block rounded px-3 py-2 text-slate-600 hover:text-slate-950 md:p-0 md:hover:bg-transparent"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Cart
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">
                  {itemCount}
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
