//ivexia\app\products\[slug]\page.jsx
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductContent } from "@/lib/productContent";

async function getProduct(slug) {
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
    return null;
  }
}

export default async function FinishedProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productData = await getProductContent(slug, "en");

  return (
    <ProductDetailClient
      initialProduct={product}
      initialProductData={productData}
    />
  );
}
