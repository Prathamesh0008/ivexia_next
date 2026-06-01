import "server-only";

import dbConnect from "@/lib/dbConnect";
import Translation from "@/models/Translation";

const languageLoaders = {
  data2: {
    ar: () => import("@/data2/languages/ar"),
    de: () => import("@/data2/languages/de"),
    en: () => import("@/data2/languages/en"),
    es: () => import("@/data2/languages/es"),
    fr: () => import("@/data2/languages/fr"),
    ja: () => import("@/data2/languages/ja"),
    nl: () => import("@/data2/languages/nl"),
    pt: () => import("@/data2/languages/pt"),
    zh: () => import("@/data2/languages/zh"),
  },
  data3: {
    ar: () => import("@/data3/languages/ar"),
    de: () => import("@/data3/languages/de"),
    en: () => import("@/data3/languages/en"),
    es: () => import("@/data3/languages/es"),
    fr: () => import("@/data3/languages/fr"),
    ja: () => import("@/data3/languages/ja"),
    nl: () => import("@/data3/languages/nl"),
    pt: () => import("@/data3/languages/pt"),
    zh: () => import("@/data3/languages/zh"),
  },
  data4: {
    ar: () => import("@/data4/languages/ar"),
    de: () => import("@/data4/languages/de"),
    en: () => import("@/data4/languages/en"),
    es: () => import("@/data4/languages/es"),
    fr: () => import("@/data4/languages/fr"),
    ja: () => import("@/data4/languages/ja"),
    nl: () => import("@/data4/languages/nl"),
    pt: () => import("@/data4/languages/pt"),
    zh: () => import("@/data4/languages/zh"),
  },
};

function normalizeLanguage(language) {
  return String(language || "en").toLowerCase().split("-")[0];
}

function getModuleData(module, language) {
  return module?.default || module?.[language] || module?.en || {};
}

async function getLocalDetailContent({ group, collectionKey, slug, language }) {
  const normalizedLanguage = normalizeLanguage(language);
  const normalizedSlug = slug?.toLowerCase();
  const groupLoaders = languageLoaders[group];
  const loader = groupLoaders?.[normalizedLanguage] || groupLoaders?.en;

  if (!loader || !normalizedSlug) {
    return null;
  }

  try {
    const module = await loader();
    const data = getModuleData(module, normalizedLanguage);

    return data?.[collectionKey]?.[normalizedSlug] || null;
  } catch (error) {
    return null;
  }
}

export async function getDetailContent({
  group,
  collectionKey,
  slug,
  language = "en",
}) {
  const normalizedSlug = slug?.toLowerCase();
  const normalizedLanguage = normalizeLanguage(language);

  if (!group || !collectionKey || !normalizedSlug) {
    return null;
  }

  try {
    await dbConnect();

    const translation = await Translation.findOne({
      group,
      language: normalizedLanguage,
    }).lean();

    const mongoContent = translation?.data?.[collectionKey]?.[normalizedSlug];

    if (mongoContent) {
      return mongoContent;
    }
  } catch (error) {
  }

  return getLocalDetailContent({
    group,
    collectionKey,
    slug: normalizedSlug,
    language: normalizedLanguage,
  });
}
