//ivexia\app\portfolio\[slug]\page.jsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";


const fallbackImg = "/images/capsuleimage.jpg";


export default function IngredientDetail() {
  const { slug } = useParams();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
const [allIngredients, setAllIngredients] = useState([]);
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!slug) return;

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
      setAllIngredients(data);
    });
}, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // =========================
  // IF NOT FOUND
  // =========================
if (loading) {
  return <div className="p-10 text-center">Loading...</div>;
}
    return (
      <>
        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
            <nav className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#0d2d47]">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products/ingredient"
                className="hover:text-[#0d2d47]"
              >
                APIs
              </Link>
              <span>/</span>
              <span className="text-[#0d2d47] font-medium">
                Not Found
              </span>
            </nav>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-2xl font-bold text-[#0d2d47]">
            Ingredient Not Found
          </h1>

          <Link
            href="/products/ingredient"
            className="mt-6 inline-block px-4 py-2 rounded-lg border border-[#0d2d47] text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition"
          >
            Back to APIs
          </Link>
        </section>
      </>
    );
  }

  const imgSrc = product.image || fallbackImg;

 const suggested = allIngredients
  .filter((p) => p.slug !== product.slug)
  .slice(0, 4);
if (!product) {
  return (
    <>
      {/* =========================
          BREADCRUMBS
      ========================= */}
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

            <span className="text-[#0d2d47] font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* =========================
          MAIN SECTION
      ========================= */}
      <section className="bg-white pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* IMAGE */}
            <div className="bg-[#FFF8F5] border p-8 rounded-xl flex justify-center">
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full max-h-[320px] object-contain"
              />
            </div>

            {/* DETAILS */}
            <div>
              <h1 className="text-4xl font-bold text-[#0d2d47]">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="px-4 py-1 text-xs rounded-full bg-[#0d2d47] text-white">
                  {product.category}
                </span>

                {product.cas && (
                  <span className="px-4 py-1 text-xs rounded-full bg-gray-200 text-gray-800">
                    CAS: {product.cas}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#0d2d47] mb-3">
                  Product Overview
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  {product.name} is a high-quality Active Pharmaceutical
                  Ingredient (API) manufactured in compliance with
                  international regulatory standards.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#FF7A00] to-[#E2004F]"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SUGGESTED SECTION
      ========================= */}
      {suggested.length > 0 && (
        <section className="bg-[#FFF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-[#0d2d47] mb-10">
              Explore More APIs
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {suggested.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="bg-white border rounded-xl p-6 text-center hover:shadow-lg transition"
                >
                  <img
                    src={p.image || fallbackImg}
                    alt={p.name}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                  <p className="mt-4 font-semibold text-[#0d2d47]">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {p.category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          MODAL
      ========================= */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Request Quote for {product.name}
            </h3>

            <button
              onClick={() => setShowQuoteModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}