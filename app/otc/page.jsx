"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OTC() {
  const router = useRouter();

  const sidebarItems = [
    { label: "Products", link: "/products" },
    { label: "Overview", link: "/offerings-overview" },
    { label: "API", link: "/products/ingredient" },
    { label: "OTC", link: "/otc" },
    { label: "Private Label / OEM", link: "/private-label-manufacturing-oem" },
  ];

  const otcCategories = [
    { title: "Pain Relief", desc: "Fast acting OTC pain management solutions." },
    { title: "Allergy Care", desc: "Reliable relief from seasonal and chronic allergies." },
    { title: "Digestive Health", desc: "Effective digestive support formulations." },
    { title: "Cold & Flu", desc: "Complete symptom relief products." },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="relative w-full h-[32vh] md:h-[60vh] overflow-hidden">
        <img src="/images/otchero.jpg" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Over The Counter (OTC)</h1>
            <p className="mt-4 text-base md:text-lg opacity-90 max-w-3xl mx-auto">
              Safe, effective and accessible healthcare solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">

        <div>
          <p className="text-gray-700 mb-6">
            Our OTC portfolio focuses on safety, quality, and accessibility.
          </p>
          <p className="text-gray-700 mb-10">
            We develop consumer healthcare products trusted globally.
          </p>

          {/* Feature Boxes */}
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0d2d47] mb-3">Scientific Formulation</h3>
              <p className="text-gray-600 text-sm">Evidence-based OTC development.</p>
            </div>

            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0d2d47] mb-3">Quality Standards</h3>
              <p className="text-gray-600 text-sm">Manufactured under strict compliance.</p>
            </div>

            <div className="bg-white border rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0d2d47] mb-3">Wellness Focus</h3>
              <p className="text-gray-600 text-sm">Designed for everyday healthcare needs.</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
            OTC Categories
          </h2>

          <div className="grid gap-10 sm:grid-cols-2">
            {otcCategories.map((cat, index) => (
              <div key={index} className="relative rounded-2xl h-64 overflow-hidden shadow-md">
                <div
                  className="absolute inset-0 bg-cover bg-center blur-[2px] brightness-75"
                  style={{ backgroundImage: `url(/images/otcimage.jpg)` }}
                />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="font-semibold text-xl">{cat.title}</h3>
                  <p className="text-sm opacity-95 mt-1">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="relative">
          <div className="sticky top-24">

            <h3 className="text-xl font-semibold text-[#0d2d47] mb-3">
              Explore
            </h3>

            <div className="flex flex-col gap-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.link)}
                  className="text-left w-full px-4 py-3 rounded-md bg-[#0097b8] text-white hover:bg-[#0d2d47]"
                >
                  {item.label}
                </button>
              ))}
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
