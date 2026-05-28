//ivexia\app\products\page.jsx
import ProductsPageClient from "@/components/ProductsPageClient";
import { getFallbackProducts, getFallbackTestKits } from "@/lib/catalogFallback";
import { getProductMetaMap } from "@/lib/productContent";

export default async function ProductsPage() {
  const productMetaMap = await getProductMetaMap("en");

  return (
    <ProductsPageClient
      initialProducts={getFallbackProducts()}
      initialTestKits={getFallbackTestKits()}
      initialProductMetaMap={productMetaMap}
    />
  );
}

