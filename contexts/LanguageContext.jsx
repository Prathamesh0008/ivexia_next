"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const loadLanguage = useCallback(async (langCode) => {
    setLoading(true);

    try {
      const module = await import(`@/data1/languages/${langCode}.js`);

      setTranslations(module.default);
      setLanguage(langCode);

      localStorage.setItem("ivexia-lang", langCode);
      document.documentElement.lang = langCode;
    } catch (error) {
      console.error("Language load failed", error);

      const enModule = await import(`@/data1/languages/en.js`);
      setTranslations(enModule.default);
      setLanguage("en");
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