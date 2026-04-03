import Link from "next/link";
import { notFound } from "next/navigation";

import { getFallbackTestKits } from "@/lib/catalogFallback";

async function getTestKit(slug) {
  const fallbackTestKit = getFallbackTestKits().find((item) => item.slug === slug);

  if (fallbackTestKit) {
    return fallbackTestKit;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/testkits`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return null;
    }

    return data.find((item) => item?.slug === slug) || null;
  } catch (error) {
    console.error("Failed to fetch test kit details:", error);
    return null;
  }
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#0d2d47]/10 bg-white px-5 py-4 shadow-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-[#0d2d47]/55">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold text-[#0d2d47]">
        {value || "-"}
      </div>
    </div>
  );
}

export default async function TestKitDetailPage({ params }) {
  const { slug } = await params;
  const testKit = await getTestKit(slug);

  if (!testKit) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5] pt-20">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4 text-sm text-gray-600 md:px-16">
          <Link href="/" className="hover:text-[#0d2d47]">
            Home
          </Link>
          <span>/</span>
          <Link href="/test-kits" className="hover:text-[#0d2d47]">
            Test Kits
          </Link>
          <span>/</span>
          <span className="font-medium text-[#0d2d47]">{testKit.product}</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-[#19a6b5]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d2d47] shadow-sm">
              Diagnostic Test Kit
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0d2d47] md:text-5xl">
              {testKit.product}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700 md:text-lg">
              {testKit.description || "Detailed product information will be shared on request."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#0d2d47] px-4 py-2 text-sm font-semibold text-white">
                {testKit.category || "Category Pending"}
              </span>
              {testKit.certificate && (
                <span className="rounded-full border border-[#FF7A00]/35 bg-white px-4 py-2 text-sm font-semibold text-[#0d2d47]">
                  {testKit.certificate}
                </span>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 font-semibold text-[#0d2d47] shadow-lg transition hover:opacity-90"
              >
                Request Information
              </Link>
              <Link
                href="/test-kits"
                className="inline-flex items-center justify-center rounded-xl border border-[#0d2d47]/15 bg-white px-6 py-3 font-semibold text-[#0d2d47] shadow-sm transition hover:bg-[#f8fbfd]"
              >
                Back To Test Kits
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#0d2d47]/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d2d47]/55">
              Product Details
            </div>

            <div className="mt-6 grid gap-4">
              <DetailRow label="Method" value={testKit.method} />
              <DetailRow label="Specimen" value={testKit.specimen} />
              <DetailRow label="Cut-Off" value={testKit.cut_off} />
              <DetailRow label="Certificate" value={testKit.certificate} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
