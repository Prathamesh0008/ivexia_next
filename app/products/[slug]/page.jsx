//ivexia\app\products\[slug]\page.jsx
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductContent } from "@/lib/productContent";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

async function getProduct(slug) {
  if (!slug) {
    return null;
  }

  try {
    await dbConnect();
    return await Product.findOne({ slug }).lean();
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
