// ivexia/scripts/seedIngredients.js

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // ✅ THIS IS REQUIRED

import INGREDIENTS from "../data/ingredients.js";

const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: Ingredient } = await import("../models/Ingredient.js");

console.log("🚀 Starting ingredient seed...");
console.log("ENV:", process.env.MONGODB_URI); // debug

await dbConnect();
console.log("✅ DB connected");

await Ingredient.deleteMany();
await Ingredient.insertMany(INGREDIENTS);

console.log("✅ Ingredients inserted");
process.exit();