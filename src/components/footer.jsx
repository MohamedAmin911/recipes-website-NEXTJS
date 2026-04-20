import Link from "next/link";

function FooterComponent() {
  return (
    <footer className="m-4 rounded-base bg-slate-100 shadow-xs">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-3 p-4 text-sm text-slate-600 md:flex-row">
        <span className="text-center sm:text-left">
          Copyright 2026{" "}
          <Link href="/" className="font-semibold hover:underline">
            Mohamed Amin
          </Link>
          . All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center gap-4 font-medium">
          <li>
            <Link href="/aboutus" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <span className="text-slate-500">Privacy Policy</span>
          </li>
          <li>
            <span className="text-slate-500">Licensing</span>
          </li>
          <li>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterComponent;
