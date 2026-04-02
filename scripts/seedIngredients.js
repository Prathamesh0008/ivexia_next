//ivexia\scripts\seedIngredients.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import INGREDIENTS from "../data/ingredients.js";

const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: Ingredient } = await import("../models/Ingredient.js");

console.log("🚀 Starting ingredient seed...");

await dbConnect();

await Ingredient.deleteMany();
await Ingredient.insertMany(INGREDIENTS);

console.log("✅ Ingredients inserted");
process.exit();

