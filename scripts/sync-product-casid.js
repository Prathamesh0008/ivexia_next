//ivexia\scripts\sync-product-casid.js
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
  };
}

console.log("Starting CAS-ID sync...");

await dbConnect();

const sourceProducts = FINISHED_PRODUCTS.map(normalizeSeedProduct).filter(
  (product) => product.slug
);

let updatedCount = 0;

for (const sourceProduct of sourceProducts) {
  const update = {};

  if (sourceProduct.casId) {
    update.casId = sourceProduct.casId;
  }

  if (sourceProduct.packSize) {
    update.packSize = sourceProduct.packSize;
  }

  if (sourceProduct.type) {
    update.type = sourceProduct.type;
  }

  if (Object.keys(update).length === 0) {
    continue;
  }

const result = await Product.updateOne(
  { slug: sourceProduct.slug },
  { $set: sourceProduct },
  { upsert: true }
);
  if (result.modifiedCount > 0) {
    updatedCount += 1;
  }
}

console.log(`CAS-ID sync complete. Updated ${updatedCount} products.`);
process.exit();
