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

const LanguageContext = createContext(null);

function getModuleData(module, langCode) {
  return module?.default || module?.[langCode] || {};
}

const fallbackTranslations = enSiteTranslations;

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(fallbackTranslations);
  const [loading, setLoading] = useState(false);

  const loadLanguage = useCallback(async (langCode) => {
    setLoading(true);

    try {
      const siteModule = await import(`@/data1/languages/${langCode}.js`);
      const siteTranslations = getModuleData(siteModule, langCode);

      setTranslations(siteTranslations);
      setLanguage(langCode);

      localStorage.setItem("ivexia-lang", langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = siteTranslations?.dir || "ltr";
    } catch (error) {
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
