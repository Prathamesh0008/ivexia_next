// ivexia\data\translatedArticles.js
"use client";
import { useLanguage } from "@/contexts/LanguageContext";

// Base article data (non-translatable fields - only slugs, dates, images)
const BASE_ARTICLES = [
  {
    slug: "gene-therapy-emerging-science",
    date: "May 13, 2024",
    image: "/images/article/gene-therapy.jpg",
    tag: "health"
  },
  {
    slug: "power-of-ai-medical-industry",
    date: "May 11, 2024",
    image: "/images/article/ai-medicine.jpg",
    tag: "health"
  },
  {
    slug: "what-is-obesity-how-to-overcome-it",
    date: "March 9, 2024",
    image: "/images/article/obesity.jpg",
    tag: "health"
  },
  {
    slug: "personalized-medicine-basics",
    date: "March 3, 2024",
    image: "/images/article/personalized-medicine.jpg",
    tag: "health"
  },
  {
    slug: "international-womens-day-healthcare",
    date: "February 21, 2024",
    image: "/images/article/womens-day.jpg",
    tag: "news"
  },
  {
    slug: "diabetes-kidney-disease-6",
    date: "December 4, 2023",
    image: "/images/article/diabetes-kidney-1.jpg",
    tag: "health"
  }
];

// Hook to get translated articles for listing page
export function useTranslatedArticles() {
  const { translations } = useLanguage();
  const magazine = translations?.magazine || {};
  
  return BASE_ARTICLES.map(baseArticle => {
    const translatedData = magazine.articles?.[baseArticle.slug] || {};
    const category = magazine.categories?.[baseArticle.tag] || baseArticle.tag;
    
    return {
      ...baseArticle,
      title: translatedData.title || "",
      excerpt: translatedData.excerpt || "",
      category: category,
      tag: baseArticle.tag
    };
  });
}

// Hook to get translated article details for detail page
export function useTranslatedArticleDetails(slug) {
  const { translations } = useLanguage();
  const magazine = translations?.magazine || {};
  const translatedData = magazine.articles?.[slug] || {};

  const baseArticle = BASE_ARTICLES.find(a => a.slug === slug);

  if (!baseArticle) return null;

  return {
    title: translatedData.title || "",
    date: baseArticle.date,
    category: magazine.categories?.[baseArticle.tag] || baseArticle.tag,
    readTime: translatedData.readTime || "",
    heroCaption: translatedData.heroCaption || "",
    sections: translatedData.sections || []
  };
}

// For static params generation (server-side)
export function getAllArticleSlugs() {
  return BASE_ARTICLES.map(article => ({
    slug: article.slug
  }));
}