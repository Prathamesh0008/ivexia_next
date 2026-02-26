"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* =========================
   STATIC ARTICLES DATA
========================= */
const ARTICLES = [
  {
    slug: "gene-therapy-emerging-science",
    title: "Gene Therapy: The Emerging Science",
    tag: "news",
    image: "/images/article/gene-therapy.jpg",
    excerpt:
      "Gene therapy is revolutionizing modern medicine by targeting diseases at the genetic level.",
  },
  {
    slug: "power-of-ai-medical-industry",
    title: "Power of AI in Medical Industry",
    tag: "news",
    image: "/images/article/ai-medicine.jpg",
    excerpt:
      "Artificial Intelligence is transforming diagnostics, research, and patient care.",
  },
  {
    slug: "what-is-obesity-how-to-overcome-it",
    title: "What Is Obesity & How to Overcome It",
    tag: "health",
    image: "/images/article/obesity.jpg",
    excerpt:
      "Understanding obesity and adopting healthier lifestyle strategies.",
  },
  {
    slug: "personalized-medicine-basics",
    title: "Personalized Medicine Basics",
    tag: "health",
    image: "/images/article/personalized-medicine.jpg",
    excerpt:
      "Personalized medicine tailors treatment based on genetic and lifestyle data.",
  },
  {
    slug: "international-womens-day-healthcare",
    title: "International Women’s Day in Healthcare",
    tag: "news",
    image: "/images/article/womens-day.jpg",
    excerpt:
      "Celebrating women leaders transforming global healthcare.",
  },
  {
    slug: "diabetes-kidney-disease-6",
    title: "Diabetes & Kidney Disease",
    tag: "health",
    image: "/images/article/diabetes-kidney-1.jpg",
    excerpt:
      "How diabetes impacts kidney health and preventive strategies.",
  },
];

export default function IvexiaMagPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const articlesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [recentArticles, setRecentArticles] = useState([]);

  /* =========================
     FILTER ARTICLES
  ========================= */
  const visibleArticles = useMemo(() => {
    if (!categoryFilter) return ARTICLES;
    return ARTICLES.filter((a) => a.tag === categoryFilter);
  }, [categoryFilter]);

  const totalPages =
    Math.ceil(visibleArticles.length / articlesPerPage) || 1;

  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = visibleArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  /* =========================
     RESET PAGE ON CATEGORY CHANGE
  ========================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  /* =========================
     LOAD RECENT ARTICLES
  ========================= */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ivexiaRecentArticles");
      if (!raw) return;

      const slugs = JSON.parse(raw);
      if (!Array.isArray(slugs)) return;

      const mapped = slugs
        .map((slug) => ARTICLES.find((a) => a.slug === slug))
        .filter(Boolean)
        .slice(0, 3);

      setRecentArticles(mapped);
    } catch {
      setRecentArticles([]);
    }
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

return (
  <div className="bg-[#f8fafc] min-h-screen py-20">

    <div className="max-w-7xl mx-auto px-6">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-[#0d2d47]">
          Ivexia Magazine
        </h1>
        <div className="w-24 h-1 bg-[#E2004F] mx-auto mt-6 rounded-full" />
        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
          Insights, research updates, and global healthcare innovation stories.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-12">

        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-xl text-[#0d2d47] mb-6">
              Recent Articles
            </h3>

            {recentArticles.length === 0 && (
              <p className="text-gray-500 text-sm">
                No recent articles yet.
              </p>
            )}

            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/ivexia-mag/${article.slug}`}
                className="flex gap-4 items-center mb-6 group"
              >
                <Image
                  src={article.image}
                  width={70}
                  height={70}
                  alt={article.title}
                  className="rounded-lg object-cover group-hover:scale-105 transition duration-300"
                />
                <p className="text-sm font-medium text-[#0d2d47] group-hover:text-[#E2004F] transition">
                  {article.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ARTICLES LIST */}
        <div className="md:col-span-3">

          {paginatedArticles.map((article) => (
            <div
              key={article.slug}
              className="bg-white shadow-md rounded-2xl overflow-hidden mb-10 border border-gray-100 hover:shadow-2xl transition duration-300"
            >
              <Image
                src={article.image}
                width={1000}
                height={500}
                alt={article.title}
                className="object-cover w-full h-[300px] hover:scale-105 transition duration-500"
              />

              <div className="p-8">
                <span className="text-xs uppercase tracking-wider text-[#E2004F] font-semibold">
                  {article.tag}
                </span>

                <h2 className="text-2xl font-bold text-[#0d2d47] mt-3">
                  {article.title}
                </h2>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <Link
                  href={`/ivexia-mag/${article.slug}`}
                  className="inline-block mt-6 text-[#E2004F] font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-16">

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-6 py-2 rounded-full border border-gray-300 hover:bg-[#0d2d47] hover:text-white transition"
            >
              Previous
            </button>

            <span className="text-[#0d2d47] font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-6 py-2 rounded-full border border-gray-300 hover:bg-[#0d2d47] hover:text-white transition"
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  </div>
);
}