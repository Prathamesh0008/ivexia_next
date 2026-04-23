//ivexia\app\test-kits\[slug]\page.jsx
"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFallbackTestKits } from "@/lib/catalogFallback";

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

// Under Maintenance Component
function UnderMaintenancePage() {
  return (
    <section className="relative bg-[#FFF8F5] py-16 overflow-hidden min-h-screen flex items-center">
      
      {/* LIGHT GLOW */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#19a6b5]/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center">

        {/* IMAGE */}
        <div className="flex justify-center mb-6 w-full">
          <img
            src="/images/undermaintenance7.png"
            alt="Under Maintenance"
            className="mx-auto block w-full max-w-[320px] md:max-w-[380px] object-contain drop-shadow-md"
          />
        </div>

        {/* TAG */}
        <p className="text-[#19a6b5] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          Diagnostic Update
        </p>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
          Test Kit Details Coming Soon
        </h1>

        {/* TEXT */}
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          We are currently updating this diagnostic test kit page with detailed
          specifications, clinical accuracy data, and regulatory certifications.
          Please check back shortly or contact our team for immediate information.
        </p>

        {/* LINE */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E2004F] rounded-full mb-6" />

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-3 justify-center">
          
          <Link
            href="/test-kits"
            className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
          >
            Back to Test Kits
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 border border-[#0d2d47] text-[#0d2d47] rounded-full text-sm font-semibold hover:bg-[#0d2d47] hover:text-white transition"
          >
            Contact Us
          </Link>

        </div>

      </div>
    </section>
  );
}

export default function TestKitDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { translations } = useLanguage();
  const t = translations?.testKitDetailPage;

  const [testKit, setTestKit] = useState(null);
  const [loading, setLoading] = useState(true);

  // UNDER MAINTENANCE FLAG
  const UNDER_MAINTENANCE = true; // change to false when ready

  useEffect(() => {
    async function fetchTestKit() {
      const fallbackTestKit = getFallbackTestKits().find(
        (item) => item.slug === slug
      );

      if (fallbackTestKit) {
        setTestKit(fallbackTestKit);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/testkits`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const found = data.find((item) => item?.slug === slug);
            if (found) {
              setTestKit(found);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch test kit details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchTestKit();
    }
  }, [slug]);

  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F5] pt-[110px] flex items-center justify-center">
        <div className="text-[#0d2d47]">{t?.loading || "Loading..."}</div>
      </div>
    );
  }

  if (!testKit) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5] pt-[110px]">
      <section className="fixed top-[88px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-16 py-3">
          <nav className="flex items-center text-sm text-gray-500 gap-2">
            <Link href="/" className="hover:text-[#0d2d47] transition">
              {t?.home || "Home"}
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/test-kits" className="hover:text-[#0d2d47] transition">
              {t?.testKits || "Test Kits"}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-[#0d2d47] truncate max-w-[250px]">
              {testKit.product}
            </span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-[#19a6b5]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d2d47] shadow-sm">
              {t?.badge || "Diagnostic Test Kit"}
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0d2d47] md:text-5xl">
              {testKit.product}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700 md:text-lg">
              {testKit.description ||
                t?.defaultDescription ||
                "Detailed product information will be shared on request."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#0d2d47] px-4 py-2 text-sm font-semibold text-white">
                {testKit.category || t?.categoryPending || "Category Pending"}
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
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                {t?.requestInfo || "Request Information"}
              </Link>
              <Link
                href="/test-kits"
                className="inline-flex items-center justify-center rounded-xl border border-[#0d2d47]/15 bg-white px-6 py-3 font-semibold text-[#0d2d47] shadow-sm transition hover:bg-[#f8fbfd]"
              >
                {t?.backButton || "Back To Test Kits"}
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#0d2d47]/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d2d47]/55">
              {t?.productDetails || "Product Details"}
            </div>

            <div className="mt-6 grid gap-4">
              <DetailRow label={t?.method || "Method"} value={testKit.method} />
              <DetailRow
                label={t?.specimen || "Specimen"}
                value={testKit.specimen}
              />
              <DetailRow
                label={t?.cutOff || "Cut-Off"}
                value={testKit.cut_off}
              />
              <DetailRow
                label={t?.certificate || "Certificate"}
                value={testKit.certificate}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}







// //ivexia\app\test-kits\[slug]\page.jsx
// "use client";
// import Link from "next/link";
// import { notFound, useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { getFallbackTestKits } from "@/lib/catalogFallback";

// function DetailRow({ label, value }) {
//   return (
//     <div className="rounded-2xl border border-[#0d2d47]/10 bg-white px-5 py-4 shadow-sm">
//       <div className="text-xs uppercase tracking-[0.18em] text-[#0d2d47]/55">
//         {label}
//       </div>
//       <div className="mt-2 text-base font-semibold text-[#0d2d47]">
//         {value || "-"}
//       </div>
//     </div>
//   );
// }

// export default function TestKitDetailPage() {
//   const params = useParams();
//   const slug = params.slug;
//   const { translations } = useLanguage();
//   const t = translations?.testKitDetailPage;
  
//   const [testKit, setTestKit] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTestKit() {
//       const fallbackTestKit = getFallbackTestKits().find((item) => item.slug === slug);
      
//       if (fallbackTestKit) {
//         setTestKit(fallbackTestKit);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`/api/testkits`);
//         if (res.ok) {
//           const data = await res.json();
//           if (Array.isArray(data)) {
//             const found = data.find((item) => item?.slug === slug);
//             if (found) {
//               setTestKit(found);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch test kit details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (slug) {
//       fetchTestKit();
//     }
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF8F5] pt-[110px] flex items-center justify-center">
//         <div className="text-[#0d2d47]">{t?.loading || "Loading..."}</div>
//       </div>
//     );
//   }

//   if (!testKit) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-[#FFF8F5] pt-[110px]">
//       <section className="fixed top-[88px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
//         <div className="mx-auto max-w-7xl px-6 md:px-16 py-3">
//           <nav className="flex items-center text-sm text-gray-500 gap-2">
//             <Link href="/" className="hover:text-[#0d2d47] transition">
//               {t?.home || "Home"}
//             </Link>
//             <span className="text-gray-300">/</span>
//             <Link href="/test-kits" className="hover:text-[#0d2d47] transition">
//               {t?.testKits || "Test Kits"}
//             </Link>
//             <span className="text-gray-300">/</span>
//             <span className="font-semibold text-[#0d2d47] truncate max-w-[250px]">
//               {testKit.product}
//             </span>
//           </nav>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-20">
//         <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
//           <div>
//             <div className="inline-flex rounded-full border border-[#19a6b5]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d2d47] shadow-sm">
//               {t?.badge || "Diagnostic Test Kit"}
//             </div>

//             <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0d2d47] md:text-5xl">
//               {testKit.product}
//             </h1>

//             <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700 md:text-lg">
//               {testKit.description || t?.defaultDescription || "Detailed product information will be shared on request."}
//             </p>

//             <div className="mt-8 flex flex-wrap gap-3">
//               <span className="rounded-full bg-[#0d2d47] px-4 py-2 text-sm font-semibold text-white">
//                 {testKit.category || t?.categoryPending || "Category Pending"}
//               </span>
//               {testKit.certificate && (
//                 <span className="rounded-full border border-[#FF7A00]/35 bg-white px-4 py-2 text-sm font-semibold text-[#0d2d47]">
//                   {testKit.certificate}
//                 </span>
//               )}
//             </div>

//             <div className="mt-10 flex flex-wrap gap-4">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
//               >
//                 {t?.requestInfo || "Request Information"}
//               </Link>
//               <Link
//                 href="/test-kits"
//                 className="inline-flex items-center justify-center rounded-xl border border-[#0d2d47]/15 bg-white px-6 py-3 font-semibold text-[#0d2d47] shadow-sm transition hover:bg-[#f8fbfd]"
//               >
//                 {t?.backButton || "Back To Test Kits"}
//               </Link>
//             </div>
//           </div>

//           <div className="rounded-[28px] border border-[#0d2d47]/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
//             <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d2d47]/55">
//               {t?.productDetails || "Product Details"}
//             </div>

//             <div className="mt-6 grid gap-4">
//               <DetailRow label={t?.method || "Method"} value={testKit.method} />
//               <DetailRow label={t?.specimen || "Specimen"} value={testKit.specimen} />
//               <DetailRow label={t?.cutOff || "Cut-Off"} value={testKit.cut_off} />
//               <DetailRow label={t?.certificate || "Certificate"} value={testKit.certificate} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }