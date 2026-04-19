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
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterComponent;
