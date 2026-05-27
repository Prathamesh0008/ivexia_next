import { FINISHED_PRODUCTS } from "../data/finishedProducts.js";

const LANGUAGE_CODES = ["en", "ar", "de", "es", "fr", "ja", "nl", "pt", "zh"];

console.log("Total products in data/finishedProducts.js:", FINISHED_PRODUCTS.length);
console.log("Languages loaded:", LANGUAGE_CODES.join(", "));
console.log("Total languages:", LANGUAGE_CODES.length);

console.log("\n==============================");
console.log("Checking missing product translations");
console.log("==============================");

for (const langCode of LANGUAGE_CODES) {
  const languageModule = await import(`../data2/languages/${langCode}.js`);
  const languageData = languageModule[langCode] || languageModule.default || {};

  const missing = FINISHED_PRODUCTS.filter(
    (product) => !languageData.products?.[product.slug]
  ).map((product) => ({
    slug: product.slug,
    name: product.name,
  }));

  console.log(`\n${langCode}: missing ${missing.length} / ${FINISHED_PRODUCTS.length}`);

  if (missing.length > 0) {
    console.table(missing);
  }
}

console.log("\nTranslation check completed.");
