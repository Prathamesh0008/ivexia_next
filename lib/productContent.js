import "server-only";

import { getDetailContent } from "@/lib/detailContent";
import dbConnect from "@/lib/dbConnect";
import Translation from "@/models/Translation";

export async function getProductContent(slug, language = "en") {
  return getDetailContent({
    group: "data2",
    collectionKey: "products",
    slug,
    language,
  });
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
  } catch (error) {}

  return {};
}
