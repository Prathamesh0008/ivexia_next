import "server-only";

import { en as enProductLang } from "@/data2/languages/en";
import dbConnect from "@/lib/dbConnect";
import Translation from "@/models/Translation";

export async function getProductContent(slug, language = "en") {
  const normalizedSlug = slug?.toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  try {
    await dbConnect();

    const translation = await Translation.findOne({
      group: "data2",
      language,
    }).lean();

    const productContent = translation?.data?.products?.[normalizedSlug];

    if (productContent) {
      return productContent;
    }
  } catch (error) {
    console.error("Failed to load product content from Mongo:", error);
  }

  return enProductLang.products?.[normalizedSlug] || null;
}

export async function getProductMetaMap(language = "en") {
  try {
    await dbConnect();

    const translation = await Translation.findOne({
      group: "data2",
      language,
    }).lean();

    const products = translation?.data?.products;

    if (products) {
      return Object.fromEntries(
        Object.entries(products).map(([slug, productContent]) => [
          slug,
          productContent?.meta || {},
        ])
      );
    }
  } catch (error) {
    console.error("Failed to load product metadata from Mongo:", error);
  }

  return Object.fromEntries(
    Object.entries(enProductLang.products || {}).map(([slug, productContent]) => [
      slug,
      productContent?.meta || {},
    ])
  );
}
