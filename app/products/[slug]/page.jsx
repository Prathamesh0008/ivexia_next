//ivexia\app\products\[slug]\page.jsx
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/lib/catalogData";
import { getProductContent } from "@/lib/productContent";

const SITE_URL = "https://www.ivexiapharma.com";

async function getProduct(slug) {
  return getProductBySlug(slug);
}

function getProductTitle(product, productData) {
  return (
    productData?.seo?.title ||
    productData?.meta?.title ||
    productData?.hero?.title ||
    productData?.meta?.productName ||
    product?.name ||
    "Product"
  );
}

function getProductDescription(product, productData, title) {
  return (
    productData?.seo?.description ||
    productData?.meta?.description ||
    productData?.hero?.description?.[0] ||
    product?.description ||
    `${title} by Ivexia Pharma.`
  );
}

function getCanonicalUrl(slug, productData) {
  return (
    productData?.seo?.canonical ||
    productData?.seo?.canonicalUrl ||
    productData?.meta?.canonical ||
    productData?.meta?.canonicalUrl ||
    `${SITE_URL}/products/${slug}`
  );
}

function getJsonLdSchemas(productData) {
  return [
    productData?.schema,
    productData?.productSchema,
    productData?.faqSchema,
  ].filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const productData = await getProductContent(slug, "en");
  const title = getProductTitle(product, productData);
  const description = getProductDescription(product, productData, title);
  const canonical = getCanonicalUrl(slug, productData);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ivexia Pharma",
      type: "website",
    },
  };
}

export default async function FinishedProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productData = await getProductContent(slug, "en");
  const schemas = getJsonLdSchemas(productData);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`product-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ProductDetailClient
        initialProduct={product}
        initialProductData={productData}
      />
    </>
  );
}
