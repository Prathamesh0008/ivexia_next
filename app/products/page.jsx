//ivexia\app\products\page.jsx
import ProductsPageClient from "@/components/ProductsPageClient";
import { getProductMetaMap } from "@/lib/productContent";

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

