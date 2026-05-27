// //app\test-kits\[slug]\page.jsx
// "use client";

// import Link from "next/link";
// import { notFound, useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
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

// function RenderSection({ section }) {
//   if (!section) return null;

//   return (
//     <div className="mb-10 rounded-2xl bg-white border border-[#0d2d47]/10 p-6 shadow-sm">
//       {section.title && (
//         <h2 className="text-2xl font-bold text-[#0d2d47] mb-4">
//           {section.title}
//         </h2>
//       )}

//       {section.description && (
//         <p className="text-gray-700 leading-relaxed mb-4">
//           {section.description}
//         </p>
//       )}

//       {section.content && (
//         <p className="text-gray-700 leading-relaxed mb-4">
//           {section.content}
//         </p>
//       )}

//       {Array.isArray(section.sections) && (
//         <div className="space-y-4 mb-4">
//           {section.sections.map((item, idx) => (
//             <p key={idx} className="text-gray-700 leading-relaxed">
//               {item}
//             </p>
//           ))}
//         </div>
//       )}

//       {Array.isArray(section.details) && (
//         <div className="overflow-hidden rounded-xl border border-[#0d2d47]/10 mt-4">
//           <table className="w-full text-sm">
//             <tbody>
//               {section.details.map((item, idx) => (
//                 <tr
//                   key={idx}
//                   className="border-b border-[#0d2d47]/10 last:border-0"
//                 >
//                   <td className="px-4 py-3 font-semibold text-[#0d2d47] w-1/3">
//                     {item.label}
//                   </td>
//                   <td className="px-4 py-3 text-gray-700">{item.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {Array.isArray(section.applications) && (
//         <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
//           {section.applications.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {Array.isArray(section.benefits) && (
//         <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
//           {section.benefits.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {Array.isArray(section.guidance) && (
//         <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
//           {section.guidance.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {Array.isArray(section.steps) && (
//         <ol className="list-decimal list-inside space-y-2 text-gray-700 mt-4">
//           {section.steps.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ol>
//       )}

//       {Array.isArray(section.instructions) && (
//         <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
//           {section.instructions.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {Array.isArray(section.advantages) && (
//         <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
//           {section.advantages.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {section.positive && (
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold text-green-600">Positive:</span>{" "}
//           {section.positive}
//         </p>
//       )}

//       {section.negative && (
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold text-blue-600">Negative:</span>{" "}
//           {section.negative}
//         </p>
//       )}

//       {section.invalid && (
//         <p className="text-gray-700 mb-2">
//           <span className="font-semibold text-red-600">Invalid:</span>{" "}
//           {section.invalid}
//         </p>
//       )}

//       {section.note && (
//         <p className="text-gray-600 text-sm italic mt-4">{section.note}</p>
//       )}
//     </div>
//   );
// }

// function FAQSection({ faqs }) {
//   const [openIndex, setOpenIndex] = useState(null);

//   if (!faqs || faqs.length === 0) return null;

//   return (
//     <div className="mt-12">
//       <h2 className="mb-6 text-2xl font-bold text-[#0d2d47]">
//         Frequently Asked Questions
//       </h2>

//       <div className="space-y-4">
//         {faqs.map((faq, idx) => {
//           const isOpen = openIndex === idx;

//           return (
//             <div
//               key={idx}
//               className="overflow-hidden rounded-xl border border-[#0d2d47]/10 bg-white shadow-sm"
//             >
//               <button
//                 type="button"
//                 onClick={() => setOpenIndex(isOpen ? null : idx)}
//                 className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-[#FFF8F5]"
//               >
//                 <span className="font-semibold text-[#0d2d47]">
//                   {faq.question}
//                 </span>

//                 <span
//                   className={`flex h-8 w-8 shrink-0 items-center justify-center cursor-pointer rounded-full bg-[#19a6b5]/10 text-xl text-[#19a6b5] transition-transform duration-300 ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                 >
//                   {isOpen ? "−" : "+"}
//                 </span>
//               </button>

//               <AnimatePresence initial={false}>
//                 {isOpen && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{
//                       duration: 0.28,
//                       ease: [0.22, 1, 0.36, 1],
//                     }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-6 pb-5 pt-1 text-gray-700 leading-relaxed">
//                       {faq.answer}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default function TestKitDetailPage() {
//   const params = useParams();
//   const slug = params.slug;

//   const { translations } = useLanguage();
//   const t = translations?.testKitDetailPage;
//   const testKitContent = translations?.testKits?.[slug];

//   const [testKit, setTestKit] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTestKit() {
//       const fallbackTestKit = getFallbackTestKits().find(
//         (item) => item.slug?.trim() === slug
//       );

//       if (fallbackTestKit) {
//         setTestKit(fallbackTestKit);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("/api/testkits");

//         if (res.ok) {
//           const data = await res.json();

//           if (Array.isArray(data)) {
//             const found = data.find((item) => item?.slug?.trim() === slug);

//             if (found) {
//               setTestKit(found);
//               setLoading(false);
//               return;
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch test kit details:", error);
//       }

//       setLoading(false);
//     }

//     if (slug) fetchTestKit();
//   }, [slug]);

//   useEffect(() => {
//     if (testKitContent?.meta) {
//       document.title = testKitContent.meta.title;

//       const metaDescription = document.querySelector(
//         'meta[name="description"]'
//       );

//       if (metaDescription) {
//         metaDescription.setAttribute(
//           "content",
//           testKitContent.meta.description
//         );
//       }
//     }
//   }, [testKitContent]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FFF8F5] pt-[110px] flex items-center justify-center">
//         <div className="text-[#0d2d47]">{t?.loading || "Loading..."}</div>
//       </div>
//     );
//   }

//   if (!testKit && !testKitContent) {
//     notFound();
//   }

//   const productTitle =
//     testKitContent?.hero?.title || testKit?.product || "Test Kit";

//   const productDescription =
//     testKitContent?.hero?.description ||
//     testKit?.description ||
//     "Detailed product information will be shared on request.";

//   return (
//     <div className="min-h-screen bg-[#FFF8F5] pt-[110px]">
//       <section className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
//         <div className="mx-auto max-w-7xl px-6 md:px-16 py-3">
//           <nav className="flex items-center text-sm text-gray-500 gap-2 flex-wrap">
//             <Link href="/" className="hover:text-[#0d2d47] transition">
//               {t?.home || "Home"}
//             </Link>

//             <span className="text-gray-300">/</span>

//             <Link href="/test-kits" className="hover:text-[#0d2d47] transition">
//               {t?.testKits || "Test Kits"}
//             </Link>

//             <span className="text-gray-300">/</span>

//             <span className="font-semibold text-[#0d2d47] truncate max-w-[250px]">
//               {productTitle}
//             </span>
//           </nav>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-20">
//         <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] mb-12">
//           <div>
//             <div className="inline-flex rounded-full border border-[#19a6b5]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d2d47] shadow-sm">
//               {testKitContent?.hero?.badge || t?.badge || "Diagnostic Test Kit"}
//             </div>

//             <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0d2d47] md:text-5xl">
//               {productTitle}
//             </h1>

//             {Array.isArray(productDescription) ? (
//               <div className="mt-5 space-y-4">
//                 {productDescription.map((para, idx) => (
//                   <p
//                     key={idx}
//                     className="text-base leading-8 text-gray-700 md:text-lg"
//                   >
//                     {para}
//                   </p>
//                 ))}
//               </div>
//             ) : (
//               <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700 md:text-lg">
//                 {productDescription}
//               </p>
//             )}

//             <div className="mt-8 flex flex-wrap gap-3">
//               <span className="rounded-full bg-[#0d2d47] px-4 py-2 text-sm font-semibold text-white">
//                 {testKit?.category ||
//                   testKitContent?.content?.productOverview?.details?.find(
//                     (x) => x.label === "Category"
//                   )?.value ||
//                   "Category Pending"}
//               </span>

//               {(testKit?.certificate || testKitContent?.certificate) && (
//                 <span className="rounded-full border border-[#FF7A00]/35 bg-white px-4 py-2 text-sm font-semibold text-[#0d2d47]">
//                   {testKit?.certificate || testKitContent?.certificate}
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
//               <DetailRow
//                 label={t?.method || "Method"}
//                 value={
//                   testKit?.method ||
//                   testKitContent?.content?.productOverview?.details?.find(
//                     (x) => x.label === "Method"
//                   )?.value
//                 }
//               />

//               <DetailRow
//                 label={t?.specimen || "Specimen"}
//                 value={
//                   testKit?.specimen ||
//                   testKitContent?.content?.productOverview?.details?.find(
//                     (x) => x.label === "Specimen"
//                   )?.value
//                 }
//               />

//               <DetailRow
//                 label={t?.cutOff || "Cut-Off"}
//                 value={
//                   testKit?.cut_off ||
//                   testKitContent?.content?.productOverview?.details?.find(
//                     (x) => x.label === "Cut-off"
//                   )?.value ||
//                   testKitContent?.content?.productOverview?.details?.find(
//                     (x) => x.label === "Cut-Off"
//                   )?.value
//                 }
//               />

//               <DetailRow
//                 label={t?.certificate || "Certificate"}
//                 value={testKit?.certificate}
//               />
//             </div>
//           </div>
//         </div>

//         {testKitContent?.content && (
//           <div className="mt-12 border-t border-[#0d2d47]/10 pt-12">
//             {Object.entries(testKitContent.content).map(([key, section]) => (
//               <RenderSection key={key} section={section} />
//             ))}
//           </div>
//         )}

//         {testKitContent?.faqs && <FAQSection faqs={testKitContent.faqs} />}
//       </section>

//       {testKitContent?.faqSchema && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(testKitContent.faqSchema),
//           }}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFallbackTestKits } from "@/lib/catalogFallback";

function RenderSection({ section }) {
  if (!section) return null;

  const listKeys = [
    "applications",
    "benefits",
    "guidance",
    "instructions",
    "advantages",
    "steps",
  ];

  return (
    <section className="border-b border-[#0d2d47]/10 py-10 last:border-b-0">
      {section.title && (
        <h2 className="mb-5 text-3xl font-bold uppercase leading-tight text-[#0d2d47]">
          {section.title}
        </h2>
      )}

      {section.description && (
        <p className="mb-4 text-base leading-8 text-[#0d2d47]/72">
          {section.description}
        </p>
      )}

      {section.content && (
        <p className="mb-4 text-base leading-8 text-[#0d2d47]/72">
          {section.content}
        </p>
      )}

      {Array.isArray(section.sections) && (
        <div className="space-y-4">
          {section.sections.map((item, idx) => (
            <p key={idx} className="text-base leading-8 text-[#0d2d47]/72">
              {item}
            </p>
          ))}
        </div>
      )}

      {Array.isArray(section.details) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {section.details.map((item, idx) => (
            <div key={idx} className="border-l-2 border-[#19a6b5] pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d2d47]/45">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0d2d47]/80">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {listKeys.map((key) =>
        Array.isArray(section[key]) ? (
          <ul key={key} className="mt-6 space-y-3">
            {section[key].map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-base leading-7 text-[#0d2d47]/72"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#19a6b5]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null
      )}

      {section.positive && (
        <p className="mt-5 text-[#0d2d47]/75">
          <span className="font-semibold text-green-600">Positive:</span>{" "}
          {section.positive}
        </p>
      )}

      {section.negative && (
        <p className="mt-5 text-[#0d2d47]/75">
          <span className="font-semibold text-blue-600">Negative:</span>{" "}
          {section.negative}
        </p>
      )}

      {section.invalid && (
        <p className="mt-5 text-[#0d2d47]/75">
          <span className="font-semibold text-red-600">Invalid:</span>{" "}
          {section.invalid}
        </p>
      )}

      {section.note && (
        <p className="mt-6 border-l-2 border-[#FF7A00] pl-4 text-sm italic text-[#0d2d47]/60">
          {section.note}
        </p>
      )}
    </section>
  );
}

function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <p className="mb-4 inline-flex rounded-full bg-[#0d2d47] px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
          FAQ
        </p>

        <h2 className="text-3xl font-bold uppercase leading-tight text-[#0d2d47] md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="border-b border-[#0d2d47]/10 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-lg font-semibold text-[#0d2d47]">
                  {faq.question}
                </span>

                <span
                  className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-xl font-semibold transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-[#19a6b5] text-white"
                      : "bg-[#19a6b5]/10 text-[#19a6b5]"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 text-base leading-8 text-[#0d2d47]/72">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function TestKitDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const { translations } = useLanguage();
  const t = translations?.testKitDetailPage;
  const testKitContent = translations?.testKits?.[slug];

  const [testKit, setTestKit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestKit() {
      const fallbackTestKit = getFallbackTestKits().find(
        (item) => item.slug?.trim() === slug
      );

      if (fallbackTestKit) {
        setTestKit(fallbackTestKit);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/testkits");

        if (res.ok) {
          const data = await res.json();

          if (Array.isArray(data)) {
            const found = data.find((item) => item?.slug?.trim() === slug);

            if (found) {
              setTestKit(found);
              setLoading(false);
              return;
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch test kit details:", error);
      }

      setLoading(false);
    }

    if (slug) fetchTestKit();
  }, [slug]);

  useEffect(() => {
    if (testKitContent?.meta) {
      document.title = testKitContent.meta.title;

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );

      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          testKitContent.meta.description
        );
      }
    }
  }, [testKitContent]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F5] pt-[110px]">
        <div className="text-[#0d2d47]">{t?.loading || "Loading..."}</div>
      </div>
    );
  }

  if (!testKit && !testKitContent) {
    notFound();
  }

  const productTitle =
    testKitContent?.hero?.title || testKit?.product || "Test Kit";

  const productDescription =
    testKitContent?.hero?.description ||
    testKit?.description ||
    "Detailed product information will be shared on request.";

  const category =
    testKit?.category ||
    testKitContent?.content?.productOverview?.details?.find(
      (x) => x.label === "Category"
    )?.value ||
    "Category Pending";

  const method =
    testKit?.method ||
    testKitContent?.content?.productOverview?.details?.find(
      (x) => x.label === "Method"
    )?.value;

  const specimen =
    testKit?.specimen ||
    testKitContent?.content?.productOverview?.details?.find(
      (x) => x.label === "Specimen"
    )?.value;

  const cutOff =
    testKit?.cut_off ||
    testKitContent?.content?.productOverview?.details?.find(
      (x) => x.label === "Cut-off"
    )?.value ||
    testKitContent?.content?.productOverview?.details?.find(
      (x) => x.label === "Cut-Off"
    )?.value;

  const certificate = testKit?.certificate || testKitContent?.certificate;

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8F5] text-[#0d2d47]">
      <section className="fixed left-0 right-0 top-[72px] z-40 border-b border-[#0d2d47]/10 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 md:px-16">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#0d2d47]/55">
            <Link href="/" className="cursor-pointer transition hover:text-[#0d2d47]">
              {t?.home || "Home"}
            </Link>

            <span className="text-[#0d2d47]/25">/</span>

            <Link
              href="/test-kits"
              className="cursor-pointer transition hover:text-[#0d2d47]"
            >
              {t?.testKits || "Test Kits"}
            </Link>

            <span className="text-[#0d2d47]/25">/</span>

            <span className="max-w-[240px] truncate font-semibold text-[#0d2d47]">
              {productTitle}
            </span>
          </nav>
        </div>
      </section>

      <section
        className="relative px-4 pb-14 pt-[150px] sm:px-6 md:px-16 md:pb-20"
        style={{
          background:
            "linear-gradient(135deg, #FFF8F5 0%, #EAEBDB 35%, #C4CFE3 72%, #8EA5F1 100%)",
        }}
      >
        <div className="pointer-events-none absolute left-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-[#19a6b5]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[360px] w-[360px] rounded-full bg-[#FF7A00]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 inline-flex rounded-full border border-[#0d2d47]/10 bg-white/35 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
            {testKitContent?.hero?.badge || t?.badge || "Diagnostic Test Kit"}
          </p>

          <h1 className="max-w-5xl text-[38px] font-bold uppercase leading-[0.95] tracking-tight text-[#0d2d47] sm:text-5xl md:text-[72px]">
            {productTitle}
          </h1>

          {Array.isArray(productDescription) ? (
            <div className="mt-6 max-w-4xl space-y-4">
              {productDescription.map((para, idx) => (
                <p
                  key={idx}
                  className="text-base leading-8 text-[#0d2d47]/72 md:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-4xl text-base leading-8 text-[#0d2d47]/72 md:text-lg">
              {productDescription}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {[category, method, specimen, cutOff, certificate]
              .filter(Boolean)
              .map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0d2d47]/10 bg-white/35 px-4 py-2 text-sm font-semibold text-[#0d2d47] backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              {t?.requestInfo || "Request Information"}
            </Link>

            <Link
              href="/test-kits"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#0d2d47]/15 bg-white/35 px-7 py-3 text-sm font-semibold text-[#0d2d47] backdrop-blur-md transition hover:bg-white/60"
            >
              {t?.backButton || "Back To Test Kits"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:px-10 md:py-16">
        {testKitContent?.content && (
          <div>
            {Object.entries(testKitContent.content).map(([key, section]) => (
              <RenderSection key={key} section={section} />
            ))}
          </div>
        )}

        {testKitContent?.faqs && <FAQSection faqs={testKitContent.faqs} />}
      </section>

      {testKitContent?.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(testKitContent.faqSchema),
          }}
        />
      )}
    </main>
  );
}















