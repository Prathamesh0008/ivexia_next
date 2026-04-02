// //ivexia\app\products\ingredient\page.jsx
// import IngredientPageClient from "@/components/IngredientPageClient";
// import dbConnect from "@/lib/dbConnect";
// import Ingredient from "@/models/Ingredient";

// export const dynamic = "force-dynamic";

// async function getIngredients() {
//   try {
//     await dbConnect();
//     return await Ingredient.find().lean();
//   } catch (error) {
//     console.error("Failed to load ingredients from database:", error);
//     return [];
//   }
// }

// export default async function IngredientPage() {
//   const ingredients = await getIngredients();

//   return <IngredientPageClient initialIngredients={ingredients} />;
// }


//ivexia\app\products\ingredient\page.jsx
import INGREDIENTS from "@/data/ingredients";
import IngredientPageClient from "@/components/IngredientPageClient";

export default function IngredientPage() {
  return <IngredientPageClient initialIngredients={INGREDIENTS} />;
}