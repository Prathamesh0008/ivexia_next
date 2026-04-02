import ProductsPageClient from "@/components/ProductsPageClient";
import { getFallbackProducts, getFallbackTestKits } from "@/lib/catalogFallback";

export default function ProductsPage() {
  return (
    <ProductsPageClient
      initialProducts={getFallbackProducts()}
      initialTestKits={getFallbackTestKits()}
    />
  );
}
