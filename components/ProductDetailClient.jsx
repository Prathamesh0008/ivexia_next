// ivexia\components\ProductDetailClient.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackImage = "/images/medicineproduct.jpg";
const capsuleIcon = "/images/capsule.svg";


function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 bg-white rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-5 py-4 font-semibold text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-40 p-5 bg-gray-50" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
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
const { translations } = useLanguage();
const t = translations?.productDetail;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialProduct?.slug]);

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
    content: t?.important?.storageDesc,
  },
  {
    title: t?.important?.dosage,
    content: t?.important?.dosageDesc,
  },
];

const importantInfoRight = [
  {
    title: t?.important?.shelf,
    content: t?.important?.shelfDesc,
  },
  {
    title: t?.important?.manufacturing,
    content: t?.important?.manufacturingDesc,
  },
];

const precautions = [
  {
    title: t?.precautions?.sideEffects,
    content: t?.precautions?.sideEffectsDesc,
  },
  {
    title: t?.precautions?.advice,
    content: t?.precautions?.adviceDesc,
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
                <div className="flex gap-6">
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

              <div className="text-gray-600   leading-relaxed min-h-[100px]">
                {activeTab === "introduction" && (
  <p>{product.description || t?.fallback?.intro}</p>
)}
               {activeTab === "indications" && (
  <p>{t?.fallback?.indications}</p>
)}
               {activeTab === "maintenance" && (
  <p>{t?.fallback?.maintenance}</p>
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
                    setOpenImportantRight(openImportantRight === idx ? null : idx)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
                <Image
                  src={imgSrc}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <Image
                    src={capsuleIcon}
                    alt="Capsule"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
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
          <p className="text-white/80 mb-6">
        {t?.cta?.desc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#0d2d47] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
             {t?.cta?.contact}
            </Link>
            <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-[#0d2d47] transition-colors cursor-pointer">
            {t?.cta?.contact}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
