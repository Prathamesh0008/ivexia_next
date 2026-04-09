// ivexia\app\ivexia-mag\page.jsx
"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedArticles } from "../../data/translatedArticles";

function IvexiaMagContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const { translations } = useLanguage();
  const t = translations?.magazine || {};
  
  const ARTICLES = useTranslatedArticles();

  const articlesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [recentArticles, setRecentArticles] = useState([]);

  const visibleArticles = ARTICLES.filter((article) => {
    if (!categoryFilter) return true;
    return article.tag === categoryFilter;
  });

  const totalPages = Math.ceil(visibleArticles.length / articlesPerPage) || 1;
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = visibleArticles.slice(startIndex, startIndex + articlesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

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
  }, [ARTICLES]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#0d2d47]">{t.title || "Ivexia Magazine"}</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-xl text-[#0d2d47] mb-6">{t.recentArticles || "Recent Articles"}</h3>
              {recentArticles.length === 0 && <p className="text-gray-500 text-sm">{t.noRecentArticles || "No recent articles yet."}</p>}
              {recentArticles.map((article) => (
                <Link key={article.slug} href={`/ivexia-mag/${article.slug}`} className="flex gap-4 items-center mb-6">
                  <Image src={article.image} width={70} height={70} alt={article.title} className="rounded-lg object-cover" />
                  <p className="text-sm font-medium text-[#0d2d47]">{article.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            {paginatedArticles.map((article) => (
              <div key={article.slug} className="bg-white shadow-md rounded-2xl overflow-hidden mb-10">
                <Image src={article.image} width={1000} height={500} alt={article.title} className="object-cover w-full h-[300px]" />
                <div className="p-8">
                  <span className="text-xs uppercase text-[#E2004F] font-semibold">{article.category}</span>
                  <h2 className="text-2xl font-bold text-[#0d2d47] mt-3">{article.title}</h2>
                  <p className="text-gray-600 mt-4">{article.excerpt}</p>
                  <Link href={`/ivexia-mag/${article.slug}`} className="inline-block mt-6 text-[#E2004F] font-semibold">
                    {t.readMore || "Read More →"}
                  </Link>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center gap-6 mt-16">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-6 py-2 rounded-full border border-gray-300">
                {t.previous || "Previous"}
              </button>
              <span className="font-semibold">{t.page || "Page"} {currentPage} {t.of || "of"} {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-6 py-2 rounded-full border border-gray-300">
                {t.next || "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IvexiaMagPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
      <IvexiaMagContent />
    </Suspense>
  );
}