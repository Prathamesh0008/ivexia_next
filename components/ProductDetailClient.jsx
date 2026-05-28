// // ivexia/components/ProductDetailClient.jsx
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { Building2 } from "lucide-react";

// const fallbackImage = "/images/medicineproduct.jpg";

// function formatLabel(key = "") {
//   return key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/[_-]/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }
// function RenderContent({ value }) {
//   if (!value) return <p>-</p>;

//   if (Array.isArray(value)) {
//     return (
//       <ul className="space-y-2">
//         {value.map((item, i) => (
//           <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
//             <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19a6b5]" />
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   if (typeof value === "object") {
//     return (
//       <div className="space-y-5">
//         {Object.entries(value).map(([key, val]) => (
//           <div key={key}>
//             <h4 className="mb-3 text-sm font-bold text-[#0d2d47]">
//               {formatLabel(key)}
//             </h4>
//             <RenderContent value={val} />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
//       {String(value)}
//     </p>
//   );
// }

// function AccordionItem({ title, content, isOpen, onToggle }) {
//   return (
//     <div className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-all">
//       <button
//         onClick={onToggle}
//         className="w-full flex justify-between items-start gap-4 px-4 sm:px-5 py-4 font-semibold text-[#0d2d47] hover:bg-[#0d2d47]/5 transition cursor-pointer text-left"
//       >
//         <span className="text-sm md:text-base">{title}</span>
//         <span
//           className={`text-sm md:text-base transition-transform ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         >
//           ▼
//         </span>
//       </button>

//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           isOpen ? "max-h-[1600px] p-4 md:p-5 bg-gray-50" : "max-h-0"
//         }`}
//       >
//         <RenderContent value={content} />
//       </div>
//     </div>
//   );
// }

// function UnderMaintenancePage() {
//   return (
//     <section className="relative bg-[#FFF8F5] py-16 overflow-hidden">
//       <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#19a6b5]/10 blur-3xl rounded-full" />

//       <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
//         <div className="flex justify-center mb-6 w-full">
//           <img
//             src="/images/undermaintenance7.png"
//             alt="Under Maintenance"
//             className="mx-auto block w-full max-w-[320px] md:max-w-[380px] object-contain drop-shadow-md"
//           />
//         </div>

//         <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
//           Product Information in Progress
//         </h1>

//         <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
//           This product page is being updated with detailed pharmaceutical data.
//           Please check back shortly.
//         </p>

//         <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E2004F] rounded-full mb-6" />

//         <Link
//           href="/products"
//           className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
//         >
//           Back to Products
//         </Link>
//       </div>
//     </section>
//   );
// }

// export default function ProductDetailClient({ initialProduct, initialProductData }) {
//   const [product, setProduct] = useState(initialProduct);
//   const [productData, setProductData] = useState(initialProductData || {});
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [activeTab, setActiveTab] = useState("introduction");
//   const [openImportantLeft, setOpenImportantLeft] = useState(null);
//   const [openImportantRight, setOpenImportantRight] = useState(null);
//   const [openPrecaution, setOpenPrecaution] = useState(null);
//   const [openFaq, setOpenFaq] = useState(null);
//   const [openExtra, setOpenExtra] = useState(null);

//   const { translations, language } = useLanguage();
//   const t = translations?.productDetail;

//   const UNDER_MAINTENANCE = false;

//   useEffect(() => {
//     let cancelled = false;
//     const selectedLanguage = language || "en";

//     async function loadProductContent() {
//       if (!initialProduct?.slug) return;

//       try {
//         const res = await fetch(
//           `/api/products/${initialProduct.slug}/content?language=${selectedLanguage}`
//         );

//         if (!res.ok) return;

//         const data = await res.json();

//         if (!cancelled) setProductData(data);
//       } catch (error) {
//         console.error("Product content load failed", error);
//       }
//     }

//     loadProductContent();

//     return () => {
//       cancelled = true;
//     };
//   }, [initialProduct?.slug, language]);

//   useEffect(() => {
//     if (!initialProduct?.slug) return;

//     let cancelled = false;

//     async function refreshProduct() {
//       setIsRefreshing(true);

//       try {
//         const res = await fetch(`/api/products/${initialProduct.slug}`);
//         const data = await res.json();

//         if (!cancelled && res.ok) setProduct(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         if (!cancelled) setIsRefreshing(false);
//       }
//     }

//     refreshProduct();

//     return () => {
//       cancelled = true;
//     };
//   }, [initialProduct]);

//   useEffect(() => {
//     if (!productData?.faqSchema) return;

//     const script = document.createElement("script");
//     script.type = "application/ld+json";
//     script.innerHTML = JSON.stringify(productData.faqSchema);

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [productData]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [initialProduct?.slug]);

//   useEffect(() => {
//     setProductData(initialProductData || {});
//   }, [initialProductData]);

//   if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

//   if (!product) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-2xl font-bold text-[#0d2d47] mb-4">
//             {t?.notFound || "Product Not Found"}
//           </h1>
//           <Link
//             href="/products"
//             className="inline-block px-6 py-3 bg-[#0d2d47] text-white rounded-md hover:bg-[#0d2d47]/90 transition-colors cursor-pointer"
//           >
//             {t?.back || "Back to Products"}
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const imgSrc = !imageError ? product.image || fallbackImage : fallbackImage;

//   const importantInfoLeft = [
//     {
//       title: t?.important?.storage || "Storage",
//       content: productData?.content?.storage,
//     },
//     {
//       title: t?.important?.dosage || "Dosage",
//       content: productData?.content?.dosage,
//     },
//   ];

//   const importantInfoRight = [
//     {
//       title: t?.important?.shelf || "Shelf Life",
//       content: productData?.content?.shelfLife,
//     },
//     {
//       title: t?.important?.manufacturing || "Manufacturing",
//       content: productData?.content?.manufacturing,
//     },
//   ];

//   const precautions = [
//     {
//       title: t?.precautions?.sideEffects || "Side Effects",
//       content: productData?.content?.sideEffects,
//     },
//     {
//       title: t?.precautions?.advice || "Precautions",
//       content: productData?.content?.precautions,
//     },
//   ];

//   const shownContentKeys = new Set([
//     "importantInformation",
//     "indications",
//     "maintenance",
//     "storage",
//     "shelfLife",
//     "dosage",
//     "manufacturing",
//     "precautions",
//     "sideEffects",
//   ]);

//   const extraContentItems = Object.entries(productData?.content || {}).filter(
//     ([key]) => !shownContentKeys.has(key)
//   );

//   const pharmacies = [
//     "Apollo Pharmacy",
//     "MedPlus",
//     "Guardian Pharmacy",
//     "NetMeds",
//     "1mg",
//     "PharmEasy",
//   ];

//   return (
//     <>
//       <section className="bg-[#FFF8F5] py-12">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
//          <div className="bg-white shadow-md p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-lg">
//            <div className="flex justify-center items-center bg-gray-50 p-4 sm:p-6 rounded-lg">
//   <img
//     src={imgSrc}
//     alt={product.name}
//     className="object-contain w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[350px] h-auto aspect-square"
//     onError={() => setImageError(true)}
//   />
// </div>

//             <div className="space-y-5">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d2d47] leading-tight">
//                 {productData?.hero?.title || product.name}
//               </h1>

//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-[#0d2d47] text-white px-3 py-1 text-xs rounded-full">
//                   {productData?.meta?.category || product.category}
//                 </span>
//                 <span className="bg-[#19a6b5]/10 text-[#0d2d47] px-3 py-1 text-xs rounded-full border border-[#19a6b5]/20">
//                   {productData?.meta?.form || product.dosage}
//                 </span>
//                 {productData?.meta?.strength && (
//                   <span className="bg-[#FFF8F5] text-[#0d2d47] px-3 py-1 text-xs rounded-full border border-gray-200">
//                     {productData.meta.strength}
//                   </span>
//                 )}
//               </div>

//               {isRefreshing && (
//                 <p className="text-sm font-medium text-[#19a6b5]">
//                   {t?.updating || "Updating product details..."}
//                 </p>
//               )}

//               {productData?.meta && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {Object.entries(productData.meta).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="bg-[#FFF8F5] border border-gray-200 rounded-lg px-4 py-3"
//                     >
//                       <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-1">
//                         {formatLabel(key)}
//                       </p>
//                       <p className="text-sm font-semibold text-[#0d2d47]">
//                      {String(value || "-")}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="border-b border-gray-200">
//                <div className="flex gap-5 overflow-x-auto no-scrollbar whitespace-nowrap">
//                   {["introduction", "indications", "maintenance"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`pb-2 capitalize cursor-pointer ${
//                         activeTab === tab
//                           ? "text-[#19a6b5] border-b-2 border-[#19a6b5]"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {t?.tabs?.[tab] || tab}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="text-gray-600 leading-relaxed min-h-[100px]">
//                 {activeTab === "introduction" && (
//                   <p>
//                     {(productData?.hero?.description || []).join(" ") ||
//                       t?.fallback?.intro}
//                   </p>
//                 )}

//                 {activeTab === "indications" && (
//                   <p>
//                     {(productData?.content?.indications || []).join(" ") ||
//                       t?.fallback?.indications}
//                   </p>
//                 )}

//                 {activeTab === "maintenance" && (
//                   <p>
//                     {(productData?.content?.maintenance || []).join(" ") ||
//                       t?.fallback?.maintenance}
//                   </p>
//                 )}
//               </div>

//               <Link
//                 href="/contact"
//                 className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
//               >
//                 {t?.requestQuote || "Request Quote"}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="bg-white py-10 sm:py-12 lg:py-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
//           <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
//             {t?.important?.heading || "Important Information"}
//           </h2>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="space-y-4">
//               {importantInfoLeft.map((item, idx) => (
//                 <AccordionItem
//                   key={idx}
//                   title={item.title}
//                   content={item.content}
//                   isOpen={openImportantLeft === idx}
//                   onToggle={() =>
//                     setOpenImportantLeft(openImportantLeft === idx ? null : idx)
//                   }
//                 />
//               ))}
//             </div>

//             <div className="space-y-4">
//               {importantInfoRight.map((item, idx) => (
//                 <AccordionItem
//                   key={idx}
//                   title={item.title}
//                   content={item.content}
//                   isOpen={openImportantRight === idx}
//                   onToggle={() =>
//                     setOpenImportantRight(openImportantRight === idx ? null : idx)
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {productData?.content?.importantInformation?.length > 0 && (
//         <section className="bg-white py-10">
//           <div className="max-w-5xl mx-auto px-4 md:px-8">
//             <div className="bg-[#FFF8F5] p-6 rounded-lg border border-gray-200">
//               <h3 className="text-xl font-semibold text-[#0d2d47] mb-4">
//                 Key Highlights
//               </h3>

//               <div className="grid sm:grid-cols-2 gap-3 text-gray-600 text-sm">
//                 {productData.content.importantInformation.map((item, i) => (
//                   <p key={i}>• {item}</p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       <section className="bg-[#FFF8F5] py-12">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
//           <div className="grid lg:grid-cols-2 gap-10 items-start">
//             <div>
//               <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
//                 {t?.precautions?.heading || "Precautions & Side Effects"}
//               </h2>

//               <div className="space-y-4">
//                 {precautions.map((item, idx) => (
//                   <AccordionItem
//                     key={idx}
//                     title={item.title}
//                     content={item.content}
//                     isOpen={openPrecaution === idx}
//                     onToggle={() =>
//                       setOpenPrecaution(openPrecaution === idx ? null : idx)
//                     }
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="hidden lg:flex justify-center">
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <img
//                   src={imgSrc}
//                   alt={product.name}
//                   className="object-contain w-[250px] h-[250px]"
//                   onError={() => setImageError(true)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {extraContentItems.length > 0 && (
//         <section className="bg-white py-12">
//           <div className="max-w-5xl mx-auto px-4 md:px-8">
//             <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
//               Additional Product Details
//             </h2>

//             <div className="space-y-4">
//               {extraContentItems.map(([key, value], idx) => (
//                 <AccordionItem
//                   key={key}
//                   title={formatLabel(key)}
//                   content={value}
//                   isOpen={openExtra === idx}
//                   onToggle={() => setOpenExtra(openExtra === idx ? null : idx)}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {productData?.faqs?.length > 0 && (
//         <section className="bg-white py-12 md:py-16">
//           <div className="max-w-5xl mx-auto px-4 md:px-8">
//             <h2 className="text-xl md:text-2xl font-bold text-[#0d2d47] mb-6 md:mb-8 text-center">
//               Frequently Asked Questions
//             </h2>

//             <div className="space-y-3 md:space-y-4">
//               {productData.faqs.map((faq, i) => (
//                 <AccordionItem
//                   key={i}
//                   title={faq.question}
//                   content={faq.answer}
//                   isOpen={openFaq === i}
//                   onToggle={() => setOpenFaq(openFaq === i ? null : i)}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
//           <h2 className="text-2xl font-bold text-center text-[#0d2d47] mb-10">
//             {t?.pharmacy?.heading || "Available at Leading Pharmacies"}
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pharmacies.map((ph, idx) => (
//               <div
//                 key={idx}
//                 className="bg-[#FFF8F5] p-6 text-center rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
//               >
//                 <div className="bg-white w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center border border-gray-200">
//                   <Building2 className="w-6 h-6 text-[#19a6b5]" />
//                 </div>

//                 <p className="font-semibold text-[#0d2d47] mb-4">{ph}</p>

//                 <button className="px-4 py-2 text-sm border border-[#19a6b5] text-[#19a6b5] rounded-md hover:bg-[#19a6b5] hover:text-white transition-colors cursor-pointer">
//                   {t?.pharmacy?.check || "Check Availability"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* <section className="bg-[#0d2d47] py-12">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">
//             {t?.cta?.heading || "Need More Product Information?"}
//           </h2>
//           <p className="text-white/80 mb-6">
//             {t?.cta?.desc ||
//               "Contact our team for product availability, export support, and documentation."}
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <Link
//               href="/contact"
//               className="px-6 py-3 bg-white text-[#0d2d47] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
//             >
//               {t?.cta?.contact || "Contact Us"}
//             </Link>
//           </div>
//         </div>
//       </section> */}
//     </>
//   );
// }



// ivexia/components/ProductDetailClient.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackImage = "/images/medicineproduct.jpg";

function formatLabel(key = "") {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function RenderContent({ value }) {
  if (!value) return <p className="text-sm text-gray-600">-</p>;

  if (Array.isArray(value)) {
    return (
      <ul className="grid gap-2.5 text-gray-700">
        {value.map((item, i) => (
          <li key={i} className="flex gap-3 leading-relaxed">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#19a6b5]" />

            {typeof item === "object" ? (
              <div className="min-w-0 flex-1">
                <RenderContent value={item} />
              </div>
            ) : (
              <span className="min-w-0 break-words text-sm sm:text-base">
                {String(item)}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="grid gap-4">
        {Object.entries(value).map(([key, val]) => (
          <div
            key={key}
            className="rounded-2xl border border-[#0d2d47]/10 bg-[#FFF8F5] p-4"
          >
            <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0d2d47]">
              {formatLabel(key)}
            </h4>

            <RenderContent value={val} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
      {String(value)}
    </p>
  );
}

function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#0d2d47]/10 bg-[#FFF8F5]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold leading-relaxed text-[#0d2d47] sm:text-base">
          {title}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0d2d47]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          <RenderContent value={content} />
        </div>
      )}
    </div>
  );
}

function ContentSection({ title, description, children }) {
  return (
    <div className="rounded-3xl border border-[#0d2d47]/10 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 md:p-8">
      <div className="mb-5">
        <p className="mb-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />

        <h2 className="text-xl font-bold text-[#0d2d47] sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function InfoTile({ title, content, accent = "teal" }) {
  const dotColor =
    accent === "orange"
      ? "bg-[#FF7A00]"
      : accent === "pink"
      ? "bg-[#E2004F]"
      : "bg-[#19a6b5]";

  return (
    <div className="rounded-3xl border border-[#0d2d47]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${dotColor}`} />
        <h3 className="text-base font-bold text-[#0d2d47] sm:text-lg">
          {title}
        </h3>
      </div>

      <RenderContent value={content} />
    </div>
  );
}

function UnderMaintenancePage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFF8F5] py-16">
      <div className="absolute left-1/2 top-[-80px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#19a6b5]/10 blur-3xl sm:h-[450px] sm:w-[450px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <img
          src="/images/undermaintenance7.png"
          alt="Under Maintenance"
          className="mx-auto mb-6 block w-full max-w-[300px] object-contain drop-shadow-md md:max-w-[380px]"
        />

        <h1 className="mb-3 text-2xl font-bold text-[#0d2d47] md:text-3xl">
          Product Information in Progress
        </h1>

        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
          This product page is being updated with detailed pharmaceutical data.
          Please check back shortly.
        </p>

        <div className="mb-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
          Back to Products
        </Link>
      </div>
    </section>
  );
}

export default function ProductDetailClient({
  initialProduct,
  initialProductData,
}) {
  const [product, setProduct] = useState(initialProduct);
  const [productData, setProductData] = useState(initialProductData || {});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("introduction");
  const [openFaq, setOpenFaq] = useState(null);

  const { translations, language } = useLanguage();
  const t = translations?.productDetail;

  const UNDER_MAINTENANCE = false;

  useEffect(() => {
    let cancelled = false;
    const selectedLanguage = language || "en";

    async function loadProductContent() {
      if (!initialProduct?.slug) return;

      try {
        const res = await fetch(
          `/api/products/${initialProduct.slug}/content?language=${selectedLanguage}`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) setProductData(data);
      } catch (error) {
        console.error("Product content load failed", error);
      }
    }

    loadProductContent();

    return () => {
      cancelled = true;
    };
  }, [initialProduct?.slug, language]);

  useEffect(() => {
    if (!initialProduct?.slug) return;

    let cancelled = false;

    async function refreshProduct() {
      setIsRefreshing(true);

      try {
        const res = await fetch(`/api/products/${initialProduct.slug}`);
        const data = await res.json();

        if (!cancelled && res.ok) setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setIsRefreshing(false);
      }
    }

    refreshProduct();

    return () => {
      cancelled = true;
    };
  }, [initialProduct]);

  useEffect(() => {
    if (!productData?.faqSchema) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(productData.faqSchema);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [productData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialProduct?.slug]);

  useEffect(() => {
    setProductData(initialProductData || {});
  }, [initialProductData]);

  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <div>
          <h1 className="mb-4 text-2xl font-bold text-[#0d2d47]">
            {t?.notFound || "Product Not Found"}
          </h1>

          <Link
            href="/products"
            className="inline-block cursor-pointer rounded-md bg-[#0d2d47] px-6 py-3 text-white transition-colors hover:bg-[#0d2d47]/90"
          >
            {t?.back || "Back to Products"}
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = !imageError ? product.image || fallbackImage : fallbackImage;

  const importantInfoLeft = [
    {
      title: t?.important?.storage || "Storage",
      content: productData?.content?.storage,
    },
    {
      title: t?.important?.dosage || "Dosage",
      content: productData?.content?.dosage,
    },
  ];

  const importantInfoRight = [
    {
      title: t?.important?.shelf || "Shelf Life",
      content: productData?.content?.shelfLife,
    },
    {
      title: t?.important?.manufacturing || "Manufacturing",
      content: productData?.content?.manufacturing,
    },
  ];

  const precautions = [
    {
      title: t?.precautions?.sideEffects || "Side Effects",
      content: productData?.content?.sideEffects,
    },
    {
      title: t?.precautions?.advice || "Precautions",
      content: productData?.content?.precautions,
    },
  ];

  const shownContentKeys = new Set([
    "importantInformation",
    "introduction",
    "indications",
    "maintenance",
    "storage",
    "shelfLife",
    "dosage",
    "manufacturing",
    "precautions",
    "sideEffects",
  ]);

  const extraContentItems = Object.entries(productData?.content || {}).filter(
    ([key]) => !shownContentKeys.has(key)
  );

  const tabContent = {
    introduction:
      productData?.content?.introduction || productData?.hero?.description,
    indications: productData?.content?.indications,
    maintenance: productData?.content?.maintenance,
  };

  return (
    <>
      {/* HERO SAME */}
      <section className="bg-[#FFF8F5] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-6 rounded-lg bg-white p-4 shadow-md sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-10">
            <div className="flex min-h-[240px] items-center justify-center rounded-lg bg-gray-50 p-4 sm:min-h-[320px] sm:p-6 lg:min-h-[390px]">
              <img
                src={imgSrc}
                alt={product.name}
                className="aspect-square h-auto w-full max-w-[240px] object-contain sm:max-w-[320px] lg:max-w-[350px]"
                onError={() => setImageError(true)}
              />
            </div>

            <div className="min-w-0 space-y-5">
              <h1 className="text-2xl font-bold leading-tight text-[#0d2d47] sm:text-3xl lg:text-4xl">
                {productData?.hero?.title || product.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#0d2d47] px-3 py-1 text-xs text-white">
                  {productData?.meta?.category || product.category}
                </span>

                <span className="rounded-full border border-[#19a6b5]/20 bg-[#19a6b5]/10 px-3 py-1 text-xs text-[#0d2d47]">
                  {productData?.meta?.form || product.dosage}
                </span>

                {productData?.meta?.strength && (
                  <span className="rounded-full border border-gray-200 bg-[#FFF8F5] px-3 py-1 text-xs text-[#0d2d47]">
                    {productData.meta.strength}
                  </span>
                )}
              </div>

              {isRefreshing && (
                <p className="text-sm font-medium text-[#19a6b5]">
                  {t?.updating || "Updating product details..."}
                </p>
              )}

              {productData?.meta && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Object.entries(productData.meta).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-lg border border-gray-200 bg-[#FFF8F5] px-4 py-3"
                    >
                      <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-gray-500">
                        {formatLabel(key)}
                      </p>

                      <p className="break-words text-sm font-semibold text-[#0d2d47]">
                        {String(value || "-")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-b border-gray-200">
                <div className="no-scrollbar flex gap-5 overflow-x-auto whitespace-nowrap">
                  {["introduction", "indications", "maintenance"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer pb-2 text-sm font-semibold capitalize ${
                        activeTab === tab
                          ? "border-b-2 border-[#19a6b5] text-[#19a6b5]"
                          : "text-gray-500 hover:text-[#0d2d47]"
                      }`}
                    >
                      {t?.tabs?.[tab] || tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-[100px] rounded-2xl bg-[#FFF8F5] p-4">
                <RenderContent
                  value={
                    tabContent[activeTab] ||
                    t?.fallback?.[activeTab] ||
                    t?.fallback?.intro
                  }
                />
              </div>

              <Link
                href="/contact"
                className="inline-flex w-full cursor-pointer justify-center rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:w-fit"
              >
                {t?.requestQuote || "Request Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENT PAGE STYLE CONTENT */}
      <section className="bg-[#FFF8F5] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#19a6b5]">
              Product Information
            </p>

            <h2 className="text-2xl font-bold text-[#0d2d47] sm:text-3xl">
              Complete Product Details
            </h2>
          </div>

          <div className="grid gap-5 md:gap-6">
            <ContentSection
              title={t?.important?.heading || "Important Information"}
              description="Essential handling, dosage, shelf-life, and manufacturing details for procurement and clinical review."
            >
              <div className="grid gap-5 md:grid-cols-2">
                {[...importantInfoLeft, ...importantInfoRight].map(
                  (item, index) => (
                    <InfoTile
                      key={item.title}
                      title={item.title}
                      content={item.content}
                      accent={index === 1 ? "orange" : index === 3 ? "pink" : "teal"}
                    />
                  )
                )}
              </div>
            </ContentSection>

            {productData?.content?.importantInformation?.length > 0 && (
              <ContentSection
                title="Key Highlights"
                description="A quick view of the product qualities and clinical positioning."
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {productData.content.importantInformation.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-2xl border border-[#0d2d47]/10 bg-[#FFF8F5] p-4"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#19a6b5]" />
                      <p className="text-sm leading-relaxed text-gray-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentSection>
            )}

            <ContentSection
              title={t?.precautions?.heading || "Precautions & Side Effects"}
              description="Safety notes and tolerability information should be reviewed by qualified healthcare professionals."
            >
              <div className="grid gap-5 md:grid-cols-2">
                {precautions.map((item, index) => (
                  <InfoTile
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    accent={index === 0 ? "pink" : "orange"}
                  />
                ))}
              </div>
            </ContentSection>

            {extraContentItems.length > 0 && (
              <ContentSection
                title="Additional Product Details"
                description="Supplementary product sections from the technical content record."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {extraContentItems.map(([key, value], index) => (
                    <InfoTile
                      key={key}
                      title={formatLabel(key)}
                      content={value}
                      accent={
                        index % 3 === 0
                          ? "teal"
                          : index % 3 === 1
                          ? "orange"
                          : "pink"
                      }
                    />
                  ))}
                </div>
              </ContentSection>
            )}
          </div>
        </div>
      </section>

      {/* FAQ ONLY DROPDOWN */}
      {productData?.faqs?.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#19a6b5]">
                FAQ
              </p>

              <h2 className="text-2xl font-bold text-[#0d2d47] sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {productData.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  title={faq.question}
                  content={faq.answer}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}