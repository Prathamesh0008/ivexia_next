//ivexia\app\products\page.jsx
import ProductsPageClient from "@/components/ProductsPageClient";
import { getProductMetaMap } from "@/lib/productContent";

export const metadata = {
  title: "Pharmaceutical Products | Ivexia Pharma",
  description:
    "Explore Ivexia Pharma's pharmaceutical product range, including dosage forms, strengths, categories, and CAS information.",
  alternates: {
    canonical: "https://www.ivexiapharma.com/products",
  },
};

export default async function ProductsPage() {
  const productMetaMap = await getProductMetaMap("en");

  return (
    <ProductsPageClient
      initialProducts={[]}
      initialTestKits={[]}
      initialProductMetaMap={productMetaMap}
    />
  );
}

