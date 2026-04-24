//ivexia\scripts\seed.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { TEST_KITS } from "../data/testKits.js";
import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";
import INGREDIENTS from "../data/ingredients.js";
const { default: Ingredient } = await import("../models/Ingredient.js");
const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: TestKit } = await import("../models/TestKit.js");
const { default: Product } = await import("../models/Product.js");

function normalizeSeedProduct(product) {
  let casRaw =
    product.casId ||
    product["CAS-ID"] ||
    product["CAS_ID"] ||
    "";

  let casArray = [];

  // ✅ If CAS is OBJECT (your current format)
  if (typeof casRaw === "object" && !Array.isArray(casRaw)) {
    casArray = Object.entries(casRaw).map(
      ([name, cas]) => `${name}: ${cas}`
    );
  }

  // ✅ If CAS is ARRAY
  else if (Array.isArray(casRaw)) {
    casArray = casRaw;
  }

  // ✅ If CAS is STRING
  else if (typeof casRaw === "string") {
    casArray = casRaw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  }

  return {
    category: product.category || "",
    name: product.name || "",
    dosage: product.dosage || "",
    form: product.form || product["Column5"] || "",
    packSize: product.packSize || product["PACK SIZE"] || "",
    type: product.type || product["TYPE OF FORMLN"] || "",
    casId: casArray, // ✅ FIXED HERE
    slug: product.slug || "",
  };
}

console.log("🚀 Starting seed...");
console.log("ENV:", process.env.MONGODB_URI); // debug

await dbConnect();
console.log("✅ DB connected");

await TestKit.deleteMany();
await Product.deleteMany();

console.log("Inserting Test Kits:", TEST_KITS.length);
await TestKit.insertMany(TEST_KITS);

console.log("Inserting Products:", FINISHED_PRODUCTS.length);
await Product.insertMany(FINISHED_PRODUCTS.map(normalizeSeedProduct));

await Ingredient.deleteMany();

console.log("Inserting Ingredients:", INGREDIENTS.length);
await Ingredient.insertMany(INGREDIENTS);
console.log("✅ DONE");
process.exit();






// //ivexia\scripts\seed.js
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// import { TEST_KITS } from "../data/testKits.js";
// import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";

// const { default: dbConnect } = await import("../lib/dbConnect.js");
// const { default: TestKit } = await import("../models/TestKit.js");
// const { default: Product } = await import("../models/Product.js");

// function normalizeSeedProduct(product) {
//   return {
//     category: product.category || "",
//     name: product.name || "",
//     dosage: product.dosage || "",
//     form: product.form || "",
//     packSize: product.packSize || product["PACK SIZE"] || "",
//     type: product.type || product["TYPE OF FORMLN"] || "",
//     casId: (product.casId || product["CAS-ID"] || "").trim(),
//     slug: product.slug || "",
//   };
// }

// console.log("🚀 Starting seed...");
// console.log("ENV:", process.env.MONGODB_URI); // debug

// await dbConnect();
// console.log("✅ DB connected");

// await TestKit.deleteMany();
// await Product.deleteMany();

// console.log("Inserting Test Kits:", TEST_KITS.length);
// await TestKit.insertMany(TEST_KITS);

// console.log("Inserting Products:", FINISHED_PRODUCTS.length);
// await Product.insertMany(FINISHED_PRODUCTS.map(normalizeSeedProduct));

// console.log("✅ DONE");
// process.exit();
