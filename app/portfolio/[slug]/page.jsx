//ivexia\app\portfolio\[slug]\page.jsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const fallbackImg = "/images/capsuleimage.jpg";
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
          API Update
        </p>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
          Ingredient Details Coming Soon
        </h1>

        {/* TEXT */}
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          We are currently updating this API page with complete technical
          specifications, manufacturing insights, and regulatory data .
          Please check back shortly or contact us for immediate details.
        </p>

        {/* LINE */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#E2004F] rounded-full mb-6" />

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-3 justify-center">
          
          <Link
            href="/products/ingredient"
            className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
          >
            Back to APIs
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
export default function IngredientDetail() {
  const { slug } = useParams();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const UNDER_MAINTENANCE = true; // toggle here
  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;
  useEffect(() => {
    if (!slug) {
      return;
    }

    fetch(`/api/ingredients/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setAllIngredients(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setAllIngredients([]);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <>
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#0d2d47]">
                Home
              </Link>
              <span>/</span>
              <Link href="/products/ingredient" className="hover:text-[#0d2d47]">
                APIs
              </Link>
              <span>/</span>
              <span className="font-medium text-[#0d2d47]">Not Found</span>
            </nav>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-2xl font-bold text-[#0d2d47]">
            Ingredient Not Found
          </h1>

          <Link
            href="/products/ingredient"
            className="mt-6 inline-block rounded-lg border border-[#0d2d47] px-4 py-2 text-[#0d2d47] transition hover:bg-[#0d2d47] hover:text-white"
          >
            Back to APIs
          </Link>
        </section>
      </>
    );
  }

  const imgSrc = product.image || fallbackImg;
  const suggested = allIngredients
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#0d2d47] transition">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products/ingredient"
              className="hover:text-[#0d2d47] transition"
            >
              APIs
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0d2d47]">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="flex justify-center rounded-xl border bg-[#FFF8F5] p-8">
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full max-h-[320px] object-contain"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-[#0d2d47]">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#0d2d47] px-4 py-1 text-xs text-white">
                  {product.category}
                </span>

                {product.cas && (
                  <span className="rounded-full bg-gray-200 px-4 py-1 text-xs text-gray-800">
                    CAS: {product.cas}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="mb-3 text-lg font-semibold text-[#0d2d47]">
                  Product Overview
                </h2>

                <p className="leading-relaxed text-gray-700">
                  {product.name} is a high-quality Active Pharmaceutical
                  Ingredient (API) manufactured in compliance with
                  international regulatory standards.
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(true)}
                  className="rounded-lg bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 font-semibold text-white"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {suggested.length > 0 && (
        <section className="bg-[#FFF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-10 text-center text-2xl font-bold text-[#0d2d47]">
              Explore More APIs
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {suggested.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="rounded-xl border bg-white p-6 text-center transition hover:shadow-lg"
                >
                  <img
                    src={item.image || fallbackImg}
                    alt={item.name}
                    className="mx-auto h-24 w-24 object-contain"
                  />
                  <p className="mt-4 font-semibold text-[#0d2d47]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-8">
            <h3 className="mb-4 text-lg font-bold">
              Request Quote for {product.name}
            </h3>

            <button
              type="button"
              onClick={() => setShowQuoteModal(false)}
              className="mt-4 rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
