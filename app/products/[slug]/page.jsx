//ivexia\app\products\[slug]\page.jsx
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/ProductDetailClient";
import { getFallbackProducts } from "@/lib/catalogFallback";

async function getProduct(slug) {
  const fallbackProduct = getFallbackProducts().find((item) => item.slug === slug);

  if (fallbackProduct) {
    return fallbackProduct;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return null;
  }
}

export default async function FinishedProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient initialProduct={product} />;
}
