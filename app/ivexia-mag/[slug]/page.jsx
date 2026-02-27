//ivexia\app\ivexia-mag\[slug]\page.jsx
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/data/articles";
import ArticleClient from "./ArticleClient";

/* =========================
   GENERATE STATIC PATHS
========================= */
export async function generateStaticParams() {
  const articles = getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

/* =========================
   PAGE
========================= */
export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const { article, details } = getArticleBySlug(slug);

  if (!article || !details) {
    notFound();
  }

  return <ArticleClient article={article} details={details} />;
}