//ivexia\scripts\seed.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../lib/dbConnect.js";
import TestKit from "../models/TestKit.js";
import Product from "../models/Product.js";

import { TEST_KITS } from "../data/testKits.js";
import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";

console.log("🚀 Starting seed...");
console.log("ENV:", process.env.MONGODB_URI); // debug

await dbConnect();
console.log("✅ DB connected");

await TestKit.deleteMany();
await Product.deleteMany();

console.log("Inserting Test Kits:", TEST_KITS.length);
await TestKit.insertMany(TEST_KITS);

console.log("Inserting Products:", FINISHED_PRODUCTS.length);
await Product.insertMany(FINISHED_PRODUCTS);

console.log("✅ DONE");
process.exit();