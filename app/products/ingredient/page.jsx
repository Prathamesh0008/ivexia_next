import IngredientPageClient from "@/components/IngredientPageClient";
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export const dynamic = "force-dynamic";

async function getIngredients() {
  try {
    await dbConnect();
    return await Ingredient.find().lean();
  } catch (error) {
    return [];
  }
}

export default async function IngredientPage() {
  const ingredients = await getIngredients();

  return <IngredientPageClient initialIngredients={ingredients} />;
}
