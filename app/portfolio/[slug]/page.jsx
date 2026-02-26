"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import INGREDIENTS from "@/data/ingredients";

const capsuleImg = "/images/capsuleimage.jpg";

export default function ProductDetail() {
  const { slug } = useParams();

  const product = INGREDIENTS.find((p) => p.slug === slug);

  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-[#0d2d47]">
          Product Not Found
        </h1>

        <p className="mt-2 text-gray-600">
          This API product does not exist.
        </p>

        <Link
          href="/products/ingredient"
          className="mt-6 inline-block px-4 py-2 rounded-lg border border-[#0d2d47] text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition"
        >
          Back to APIs
        </Link>
      </section>
    );
  }

  const imgSrc = product.image || capsuleImg;

  // Suggested products
  const others = INGREDIENTS.filter((p) => p.slug !== product.slug);
  const diffCategory = others.filter(
    (p) => p.categoryKey !== product.categoryKey
  );

  let suggested = diffCategory.slice(0, 4);

  if (suggested.length < 4) {
    const remaining = others.filter(
      (p) => !suggested.some((sug) => sug.slug === p.slug)
    );
    suggested = [...suggested, ...remaining].slice(0, 4);
  }

  return (
    <>
      {/* MAIN PRODUCT */}
      <section className="bg-white pt-12">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-[#FFF8F5] shadow-sm border px-6 py-8">
            <div className="grid gap-10 lg:grid-cols-2">

              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={imgSrc}
                  alt={product.slug}
                  className="w-full max-h-[260px] object-contain"
                />
              </div>

              {/* INFO */}
              <div>
                <h1 className="text-3xl font-bold text-[#0d2d47]">
                  {product.slug.replace(/-/g, " ")}
                </h1>

                {product.cas && (
                  <p className="mt-2 text-sm text-gray-500">
                    CAS: {product.cas}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-[#0d2d47] text-white">
                    {product.categoryKey}
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#FF7A00] to-[#E2004F]"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUGGESTED */}
      {suggested.length > 0 && (
        <section className="bg-[#FFF8F5] mt-10">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="text-xl font-bold text-center mb-8">
              Explore More APIs
            </h2>

            <div className="flex flex-wrap justify-center gap-5">
              {suggested.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="w-[220px] bg-white border rounded-xl p-5 text-center hover:shadow-md transition"
                >
                  <img
                    src={p.image || capsuleImg}
                    alt={p.slug}
                    className="w-32 h-32 mx-auto object-contain"
                  />
                  <p className="mt-3 font-semibold text-[#0d2d47]">
                    {p.slug.replace(/-/g, " ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Request Quote for {product.slug}
            </h3>

            <button
              onClick={() => setShowQuoteModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}