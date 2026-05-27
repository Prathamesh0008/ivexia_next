// contexts\LanguageContext.jsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import enSiteTranslations from "@/data1/languages/en";
import * as enTestKitModule from "@/data3/languages/en";

const LanguageContext = createContext(null);

function getModuleData(module, langCode) {
  return module?.default || module?.[langCode] || {};
}

function mergeTranslations(siteTranslations = {}, testKitTranslations = {}) {
  return {
    ...siteTranslations,
    ...testKitTranslations,

    testKits: {
      ...(siteTranslations.testKits || {}),
      ...(testKitTranslations.testKits || {}),
    },

    testKitDetailPage: {
      ...(siteTranslations.testKitDetailPage || {}),
      ...(testKitTranslations.testKitDetailPage || {}),
    },
  };
}

const enTestKitTranslations = getModuleData(enTestKitModule, "en");

const fallbackTranslations = mergeTranslations(
  enSiteTranslations,
  enTestKitTranslations
);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(fallbackTranslations);
  const [loading, setLoading] = useState(false);

  const loadLanguage = useCallback(async (langCode) => {
    setLoading(true);

    try {
      const siteModule = await import(`@/data1/languages/${langCode}.js`);

      let testKitModule = null;

      try {
        testKitModule = await import(`@/data3/languages/${langCode}.js`);
      } catch (testKitError) {
        console.warn(
          `No test kit language file found for ${langCode}, using English test kit data.`
        );

        testKitModule = enTestKitModule;
      }

      const siteTranslations = getModuleData(siteModule, langCode);
      const testKitTranslations = getModuleData(testKitModule, langCode);

      const mergedTranslations = mergeTranslations(
        siteTranslations,
        testKitTranslations
      );

      setTranslations(mergedTranslations);
      setLanguage(langCode);

      localStorage.setItem("ivexia-lang", langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = mergedTranslations?.dir || "ltr";
    } catch (error) {
      console.error("Language load failed", error);

      setTranslations(fallbackTranslations);
      setLanguage("en");

      localStorage.setItem("ivexia-lang", "en");
      document.documentElement.lang = "en";
      document.documentElement.dir = fallbackTranslations?.dir || "ltr";
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedLang =
      typeof window !== "undefined"
        ? localStorage.getItem("ivexia-lang")
        : null;

    loadLanguage(savedLang || "en");
  }, [loadLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        translations,
        language,
        loadLanguage,
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}