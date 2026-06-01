// scripts/sync-product-casid.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";

const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: Product } = await import("../models/Product.js");

function normalizeSeedProduct(product) {
  return {
    category: product.category || "",
    name: product.name || "",
    dosage: product.dosage || "",
    form: product.form || "",
    packSize: product.packSize || product["PACK SIZE"] || "",
    type: product.type || product["TYPE OF FORMLN"] || "",
    casId: (product.casId || product["CAS-ID"] || "").trim(),
    slug: product.slug || "",
    image: product.image || "/images/medicineproduct.jpg",
    description: product.description || "",
  };
}

console.log("Starting PRODUCT sync...");

await dbConnect();

const sourceProducts = FINISHED_PRODUCTS.map(normalizeSeedProduct).filter(
  (product) => product.slug
);

console.log("Source products:", sourceProducts.length);
console.log("First product:", sourceProducts[0]);

let insertedCount = 0;
let updatedCount = 0;
let matchedCount = 0;

for (const sourceProduct of sourceProducts) {
  const result = await Product.updateOne(
    { slug: sourceProduct.slug },
    { $set: sourceProduct },
    { upsert: true }
  );

  matchedCount += result.matchedCount || 0;
  updatedCount += result.modifiedCount || 0;
  insertedCount += result.upsertedCount || 0;
}

console.log("Matched:", matchedCount);
console.log("Updated:", updatedCount);
console.log("Inserted:", insertedCount);
console.log("Total in Mongo:", await Product.countDocuments());

process.exit();