import IngredientPageClient from "@/components/IngredientPageClient";
import { getIngredients } from "@/lib/catalogData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pharmaceutical API Ingredients | Ivexia Pharma",
  description:
    "Explore Ivexia Pharma's pharmaceutical API ingredient portfolio, including active ingredients for global healthcare and pharmaceutical supply.",
  alternates: {
    canonical: "https://www.ivexiapharma.com/products/ingredient",
  },
};

export default async function IngredientPage() {
  const ingredients = await getIngredients();

  return <IngredientPageClient initialIngredients={ingredients} />;
}
