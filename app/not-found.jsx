import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-[linear-gradient(180deg,#fff8f5_0%,#f6f8fb_100%)] px-6 pt-28 pb-16">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/70 bg-white/90 p-10 text-center shadow-[0_30px_80px_rgba(13,45,71,0.08)] backdrop-blur md:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#19a6b5]">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0d2d47] md:text-6xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          The page you are looking for may have moved, been removed, or the link
          may be incorrect.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          <Link
            href="/"
            className="rounded-2xl border border-[#0d2d47]/10 bg-[#0d2d47] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#123b5d]"
          >
            Go To Home
          </Link>
          <Link
            href="/products"
            className="rounded-2xl border border-[#19a6b5]/20 bg-[#19a6b5]/8 px-6 py-4 font-semibold text-[#0d2d47] transition-colors hover:bg-[#19a6b5]/16"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-[#e2004f]/15 bg-[#fff3f7] px-6 py-4 font-semibold text-[#0d2d47] transition-colors hover:bg-[#ffe5ef]"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
          {[
            {
              title: "Finished Products",
              text: "Explore the current pharmaceutical product portfolio.",
              href: "/products",
            },
            {
              title: "API / Ingredients",
              text: "Search ingredient categories and dosage forms.",
              href: "/products/ingredient",
            },
            {
              title: "Test Kits",
              text: "View the diagnostic rapid test kit catalog.",
              href: "/test-kits",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-gray-100 bg-[#f9fbfc] p-6 transition-transform hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <p className="text-lg font-bold text-[#0d2d47]">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
