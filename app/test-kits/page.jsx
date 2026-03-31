import Link from "next/link";

export const metadata = {
  title: "Test Kits",
  description:
    "This section is currently under development. Please check back soon for updates.",
  alternates: {
    canonical: "/test-kits",
  },
};

export default function TestKitsPage() {
  return (
    <div className="min-h-[90vh] bg-[#f6f8fb] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl rounded-3xl border border-[#E2004F]/15 bg-white p-8 md:p-12 text-center shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E2004F]">
          Coming Soon
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#0d2d47]">
          We Are Working On Test Kits
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          This page is currently under development. Our team is preparing the
          Test Kits section and it will be available soon.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/offerings-overview"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white font-semibold hover:opacity-95 transition-opacity"
          >
            Back to Offerings
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-[#E2004F]/30 text-[#E2004F] font-semibold hover:bg-[#fff4f1] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
