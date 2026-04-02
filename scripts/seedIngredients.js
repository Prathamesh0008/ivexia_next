// ivexia/scripts/seedIngredients.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Setup path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load ENV FIRST (VERY IMPORTANT)
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// ✅ Debug
console.log("ENV CHECK:", process.env.MONGODB_URI);

// ⛔️ IMPORT AFTER dotenv
const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: Ingredient } = await import("../models/Ingredient.js");
const { default: INGREDIENTS } = await import("../data/ingredients.js");

console.log("🚀 Starting ingredient seed...");

await dbConnect();

await Ingredient.deleteMany();
await Ingredient.insertMany(INGREDIENTS);

console.log("✅ Ingredients inserted");
process.exit();