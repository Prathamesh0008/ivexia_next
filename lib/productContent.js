import "server-only";

import { getDetailContent } from "@/lib/detailContent";

const productLanguageLoaders = {
  ar: () => import("@/data2/languages/ar"),
  de: () => import("@/data2/languages/de"),
  en: () => import("@/data2/languages/en"),
  es: () => import("@/data2/languages/es"),
  fr: () => import("@/data2/languages/fr"),
  ja: () => import("@/data2/languages/ja"),
  nl: () => import("@/data2/languages/nl"),
  pt: () => import("@/data2/languages/pt"),
  zh: () => import("@/data2/languages/zh"),
};

function normalizeLanguage(language) {
  return String(language || "en").toLowerCase().split("-")[0];
}

function getModuleData(module, language) {
  return module?.default || module?.[language] || module?.en || {};
}

export async function getProductContent(slug, language = "en") {
  return getDetailContent({
    group: "data2",
    collectionKey: "products",
    slug,
    language,
  });
}

export async function getProductMetaMap(language = "en") {
  const normalizedLanguage = normalizeLanguage(language);
  const loader =
    productLanguageLoaders[normalizedLanguage] || productLanguageLoaders.en;

  try {
    const module = await loader();
    const products = getModuleData(module, normalizedLanguage)?.products;

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
