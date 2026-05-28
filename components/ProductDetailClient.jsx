// ivexia/components/ProductDetailClient.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2 } from "lucide-react";

const fallbackImage = "/images/medicineproduct.jpg";

function formatLabel(key = "") {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
function RenderContent({ value }) {
  if (!value) return <p>-</p>;

  if (Array.isArray(value)) {
    return (
      <ul className="space-y-2">
        {value.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19a6b5]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="space-y-5">
        {Object.entries(value).map(([key, val]) => (
          <div key={key}>
            <h4 className="mb-3 text-sm font-bold text-[#0d2d47]">
              {formatLabel(key)}
            </h4>
            <RenderContent value={val} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
      {String(value)}
    </p>
  );
}

function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-start gap-4 px-4 sm:px-5 py-4 font-semibold text-[#0d2d47] hover:bg-[#0d2d47]/5 transition cursor-pointer text-left"
      >
        <span className="text-sm md:text-base">{title}</span>
        <span
          className={`text-sm md:text-base transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[1600px] p-4 md:p-5 bg-gray-50" : "max-h-0"
        }`}
      >
        <RenderContent value={content} />
      </div>
    </div>
  );
}

function UnderMaintenancePage() {
  return (
    <section className="relative bg-[#FFF8F5] py-16 overflow-hidden">
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#19a6b5]/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        <div className="flex justify-center mb-6 w-full">
          <img
            src="/images/undermaintenance7.png"
            alt="Under Maintenance"
            className="mx-auto block w-full max-w-[320px] md:max-w-[380px] object-contain drop-shadow-md"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
          Product Information in Progress
        </h1>

        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          This product page is being updated with detailed pharmaceutical data.
          Please check back shortly.
        </p>

        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E2004F] rounded-full mb-6" />

        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
        >
          Back to Products
        </Link>
      </div>
    </section>
  );
}

export default function ProductDetailClient({ initialProduct, initialProductData }) {
  const [product, setProduct] = useState(initialProduct);
  const [productData, setProductData] = useState(initialProductData || {});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("introduction");
  const [openImportantLeft, setOpenImportantLeft] = useState(null);
  const [openImportantRight, setOpenImportantRight] = useState(null);
  const [openPrecaution, setOpenPrecaution] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [openExtra, setOpenExtra] = useState(null);

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
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2d47] mb-4">
            {t?.notFound || "Product Not Found"}
          </h1>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-[#0d2d47] text-white rounded-md hover:bg-[#0d2d47]/90 transition-colors cursor-pointer"
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

  const pharmacies = [
    "Apollo Pharmacy",
    "MedPlus",
    "Guardian Pharmacy",
    "NetMeds",
    "1mg",
    "PharmEasy",
  ];

  return (
    <>
      <section className="bg-[#FFF8F5] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
         <div className="bg-white shadow-md p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 rounded-lg">
           <div className="flex justify-center items-center bg-gray-50 p-4 sm:p-6 rounded-lg">
  <img
    src={imgSrc}
    alt={product.name}
    className="object-contain w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[350px] h-auto aspect-square"
    onError={() => setImageError(true)}
  />
</div>

            <div className="space-y-5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d2d47] leading-tight">
                {productData?.hero?.title || product.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0d2d47] text-white px-3 py-1 text-xs rounded-full">
                  {productData?.meta?.category || product.category}
                </span>
                <span className="bg-[#19a6b5]/10 text-[#0d2d47] px-3 py-1 text-xs rounded-full border border-[#19a6b5]/20">
                  {productData?.meta?.form || product.dosage}
                </span>
                {productData?.meta?.strength && (
                  <span className="bg-[#FFF8F5] text-[#0d2d47] px-3 py-1 text-xs rounded-full border border-gray-200">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(productData.meta).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-[#FFF8F5] border border-gray-200 rounded-lg px-4 py-3"
                    >
                      <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-1">
                        {formatLabel(key)}
                      </p>
                      <p className="text-sm font-semibold text-[#0d2d47]">
                     {String(value || "-")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-b border-gray-200">
               <div className="flex gap-5 overflow-x-auto no-scrollbar whitespace-nowrap">
                  {["introduction", "indications", "maintenance"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 capitalize cursor-pointer ${
                        activeTab === tab
                          ? "text-[#19a6b5] border-b-2 border-[#19a6b5]"
                          : "text-gray-500"
                      }`}
                    >
                      {t?.tabs?.[tab] || tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-gray-600 leading-relaxed min-h-[100px]">
                {activeTab === "introduction" && (
                  <p>
                    {(productData?.hero?.description || []).join(" ") ||
                      t?.fallback?.intro}
                  </p>
                )}

                {activeTab === "indications" && (
                  <p>
                    {(productData?.content?.indications || []).join(" ") ||
                      t?.fallback?.indications}
                  </p>
                )}

                {activeTab === "maintenance" && (
                  <p>
                    {(productData?.content?.maintenance || []).join(" ") ||
                      t?.fallback?.maintenance}
                  </p>
                )}
              </div>

              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t?.requestQuote || "Request Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
            {t?.important?.heading || "Important Information"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {importantInfoLeft.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  title={item.title}
                  content={item.content}
                  isOpen={openImportantLeft === idx}
                  onToggle={() =>
                    setOpenImportantLeft(openImportantLeft === idx ? null : idx)
                  }
                />
              ))}
            </div>

            <div className="space-y-4">
              {importantInfoRight.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  title={item.title}
                  content={item.content}
                  isOpen={openImportantRight === idx}
                  onToggle={() =>
                    setOpenImportantRight(openImportantRight === idx ? null : idx)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {productData?.content?.importantInformation?.length > 0 && (
        <section className="bg-white py-10">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="bg-[#FFF8F5] p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-[#0d2d47] mb-4">
                Key Highlights
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 text-gray-600 text-sm">
                {productData.content.importantInformation.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#FFF8F5] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
                {t?.precautions?.heading || "Precautions & Side Effects"}
              </h2>

              <div className="space-y-4">
                {precautions.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    title={item.title}
                    content={item.content}
                    isOpen={openPrecaution === idx}
                    onToggle={() =>
                      setOpenPrecaution(openPrecaution === idx ? null : idx)
                    }
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="object-contain w-[250px] h-[250px]"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {extraContentItems.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
              Additional Product Details
            </h2>

            <div className="space-y-4">
              {extraContentItems.map(([key, value], idx) => (
                <AccordionItem
                  key={key}
                  title={formatLabel(key)}
                  content={value}
                  isOpen={openExtra === idx}
                  onToggle={() => setOpenExtra(openExtra === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {productData?.faqs?.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#0d2d47] mb-6 md:mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3 md:space-y-4">
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

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-center text-[#0d2d47] mb-10">
            {t?.pharmacy?.heading || "Available at Leading Pharmacies"}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies.map((ph, idx) => (
              <div
                key={idx}
                className="bg-[#FFF8F5] p-6 text-center rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="bg-white w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center border border-gray-200">
                  <Building2 className="w-6 h-6 text-[#19a6b5]" />
                </div>

                <p className="font-semibold text-[#0d2d47] mb-4">{ph}</p>

                <button className="px-4 py-2 text-sm border border-[#19a6b5] text-[#19a6b5] rounded-md hover:bg-[#19a6b5] hover:text-white transition-colors cursor-pointer">
                  {t?.pharmacy?.check || "Check Availability"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d2d47] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t?.cta?.heading || "Need More Product Information?"}
          </h2>
          <p className="text-white/80 mb-6">
            {t?.cta?.desc ||
              "Contact our team for product availability, export support, and documentation."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#0d2d47] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t?.cta?.contact || "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
