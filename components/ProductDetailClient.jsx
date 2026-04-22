// ivexia\components\ProductDetailClient.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
// import { en as productLang } from "@/data2/languages/en";
import { Building2, Package, Truck, Clock, Shield, CheckCircle, Award, Store, Pharmacy, Pill } from "lucide-react";
const fallbackImage = "/images/medicineproduct.jpg";
const capsuleIcon = "/images/capsule.svg";

function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 md:px-5 py-4 font-semibold text-[#0d2d47] hover:bg-[#0d2d47]/5 transition cursor-pointer text-left"
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
          isOpen ? "max-h-[1000px] p-4 md:p-5 bg-gray-50" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
          {content}
        </p>
      </div>
    </div>
  );
}

// Under Maintenance Component
function UnderMaintenancePage() {
  return (
    <section className="relative bg-[#FFF8F5] py-16 overflow-hidden">
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
        {/* <p className="text-[#19a6b5] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          System Update
        </p> */}

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
          Product Information in Progress
        </h1>

        {/* TEXT */}
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          This product page is being updated with detailed pharmaceutical data.
          Please check back shortly.
        </p>

        {/* LINE */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E2004F] rounded-full mb-6" />

        {/* BUTTON */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-package"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          Back to Products
        </Link>
      </div>
    </section>
  );
}

export default function ProductDetailClient({ initialProduct }) {
  const [product, setProduct] = useState(initialProduct);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("introduction");
  const [openImportantLeft, setOpenImportantLeft] = useState(null);
  const [openImportantRight, setOpenImportantRight] = useState(null);
  const [openPrecaution, setOpenPrecaution] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // const productData =
  //   productLang.products[product?.slug?.toLowerCase()] ||
  //   productLang.products["cefpodoxime-proxetil-50mg"] ||
  //   {};
  const productData = {};

  const { translations } = useLanguage();
  const t = translations?.productDetail;

  // UNDER MAINTENANCE FLAG - Set to true to show maintenance page
  const UNDER_MAINTENANCE = true; // Change to false to show normal product page or true

  useEffect(() => {
    if (!initialProduct?.slug) {
      return;
    }

    let cancelled = false;

    async function refreshProduct() {
      setIsRefreshing(true);

      try {
        const res = await fetch(`/api/products/${initialProduct.slug}`);
        const data = await res.json();

        if (!cancelled && res.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setIsRefreshing(false);
        }
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
      title: t?.important?.storage,
      content: (productData?.content?.storage || []).join(", "),
    },
    {
      title: t?.important?.dosage,
      content: (productData?.content?.dosage?.general || []).join(", "),
    },
  ];

  const importantInfoRight = [
    {
      title: t?.important?.shelf,
      content: (productData?.content?.shelfLife || []).join(", "),
    },
    {
      title: t?.important?.manufacturing,
      content: (productData?.content?.manufacturing || []).join(", "),
    },
  ];

  const precautions = [
    {
      title: t?.precautions?.sideEffects,
      content: (productData?.content?.sideEffects || []).join(", "),
    },
    {
      title: t?.precautions?.advice,
      content: (productData?.content?.precautions || []).join(", "),
    },
  ];

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
          <div className="bg-white shadow-md p-8 lg:p-10 grid lg:grid-cols-2 gap-10 rounded-lg">
            <div className="flex justify-center items-center bg-gray-50 p-6 rounded-lg">
              <img
                src={imgSrc}
                alt={product.name}
                className="object-contain w-[350px] h-[350px]"
                onError={() => setImageError(true)}
              />
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl font-bold text-[#0d2d47]">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0d2d47] text-white px-3 py-1 text-xs rounded-full">
                  {product.category}
                </span>
                <span className="bg-[#19a6b5]/10 text-[#0d2d47] px-3 py-1 text-xs rounded-full border border-[#19a6b5]/20">
                  {product.dosage}
                </span>
              </div>

              {isRefreshing && (
                <p className="text-sm font-medium text-[#19a6b5]">
                  {t?.updating || "Updating product details..."}
                </p>
              )}

              <div className="border-b border-gray-200">
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
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
                    {" "}
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

              <div>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {t?.requestQuote || "Request Quote"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
            {t?.important?.heading || "Important Information"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {importantInfoLeft.map((item, idx) => (
                <AccordionItem
                  key={`left-${idx}`}
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
                  key={`right-${idx}`}
                  title={item.title}
                  content={item.content}
                  isOpen={openImportantRight === idx}
                  onToggle={() =>
                    setOpenImportantRight(
                      openImportantRight === idx ? null : idx
                    )
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

      {productData?.content?.expertView?.length > 0 && (
        <section className="bg-[#FFF8F5] py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-[#0d2d47] mb-4">
                Expert Insight
              </h2>

              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                {productData.content.expertView.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
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
            {t?.cta?.heading}
          </h2>
          <p className="text-white/80 mb-6">{t?.cta?.desc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#0d2d47] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t?.cta?.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}