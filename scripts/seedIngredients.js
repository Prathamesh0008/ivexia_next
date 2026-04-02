//ivexia\scripts\seedIngredients.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../lib/dbConnect.js";
import Ingredient from "../models/Ingredient.js";
import INGREDIENTS from "../data/ingredients.js";

console.log("🚀 Starting ingredient seed...");

await dbConnect();

await Ingredient.deleteMany();
await Ingredient.insertMany(INGREDIENTS);

console.log("✅ Ingredients inserted");
process.exit();

