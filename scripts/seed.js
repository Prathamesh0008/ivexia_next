//ivexia\scripts\seed.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { TEST_KITS } from "../data/testKits.js";
import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";

const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: TestKit } = await import("../models/TestKit.js");
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

console.log("✅ DONE");
process.exit();
