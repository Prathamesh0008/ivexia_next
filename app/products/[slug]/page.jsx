"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import EN from "@/data/finishedProducts";

const fallbackImage = "/images/medicineproduct.jpg";
const capsuleIcon = "/images/capsule.svg";

/* ================= ACCORDION ================= */
function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 bg-white rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-5 py-4 font-semibold text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <span>{title}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
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

export default function FinishedProductDetail() {
  const { slug } = useParams();
  const product = EN.find((p) => p.slug === slug);

  const [activeTab, setActiveTab] = useState("introduction");
  const [openImportantLeft, setOpenImportantLeft] = useState(null);
  const [openImportantRight, setOpenImportantRight] = useState(null);
  const [openPrecaution, setOpenPrecaution] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2d47] mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-[#0d2d47] text-white rounded-md hover:bg-[#0d2d47]/90 transition-colors cursor-pointer"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = !imageError ? (product.image || fallbackImage) : fallbackImage;

  /* ================= STATIC CONTENT ================= */

  const importantInfoLeft = [
    {
      title: "Storage Instructions",
      content:
        "Store below 25°C in a cool and dry place away from direct sunlight. Keep out of reach of children.",
    },
    {
      title: "Dosage Guidance",
      content:
        "Use strictly as prescribed by a healthcare professional. Do not exceed recommended dosage.",
    },
  ];

  const importantInfoRight = [
    {
      title: "Shelf Life",
      content: "24 months from date of manufacture. Do not use after expiry date.",
    },
    {
      title: "Manufacturing Information",
      content: "Manufactured in WHO-GMP certified facilities. Batch numbers and manufacturing dates are printed on the package.",
    },
  ];

  const precautions = [
    {
      title: "Possible Side Effects",
      content:
        "Mild headache, nausea or dizziness may occur in some patients. Contact your doctor if symptoms persist.",
    },
    {
      title: "Medical Advice",
      content:
        "Consult your physician before starting this medication if you have pre-existing conditions or are taking other medications.",
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
      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#FFF8F5] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="bg-white shadow-md p-8 lg:p-10 grid lg:grid-cols-2 gap-10 rounded-lg">

            {/* IMAGE */}
            <div className="flex justify-center items-center bg-gray-50 p-6 rounded-lg">
              <Image
                src={imgSrc}
                alt={product.name}
                width={350}
                height={350}
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>

            {/* PRODUCT INFO */}
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

              {/* TABS */}
              <div className="border-b border-gray-200">
                <div className="flex gap-6">
                  {["introduction", "indications", "maintenance"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 capitalize font-medium cursor-pointer transition-colors relative ${
                        activeTab === tab
                          ? "text-[#19a6b5] border-b-2 border-[#19a6b5]"
                          : "text-gray-500 hover:text-[#0d2d47]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-gray-600 leading-relaxed min-h-[100px]">
                {activeTab === "introduction" && (
                  <p>{product.description || "Product introduction coming soon."}</p>
                )}
                {activeTab === "indications" && (
                  <p>
                    This medicine is used for therapeutic treatment under medical supervision. 
                    It is indicated for the management of various conditions as prescribed.
                  </p>
                )}
                {activeTab === "maintenance" && (
                  <p>
                    Follow the prescribed maintenance dosage for long-term effectiveness. 
                    Regular monitoring with your healthcare provider is recommended.
                  </p>
                )}
              </div>

              <div>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPORTANT INFO ================= */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
            Important Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column */}
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

            {/* Right Column */}
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

      {/* ================= PRECAUTIONS ================= */}
      <section className="bg-[#FFF8F5] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
                Precautions & Side Effects
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

      {/* ================= PHARMACIES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold text-center text-[#0d2d47] mb-10">
            Available at Leading Pharmacies
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

                <p className="font-semibold text-[#0d2d47] mb-4">
                  {ph}
                </p>

                <button className="px-4 py-2 text-sm border border-[#19a6b5] text-[#19a6b5] rounded-md hover:bg-[#19a6b5] hover:text-white transition-colors cursor-pointer">
                  Check Availability
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SIMPLE CTA ================= */}
      <section className="bg-[#0d2d47] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Professional Advice?
          </h2>
          <p className="text-white/80 mb-6">
            Our pharmaceutical experts are here to help you
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#0d2d47] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Contact Us
            </Link>
            <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-[#0d2d47] transition-colors cursor-pointer">
              Call Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}