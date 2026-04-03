"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import enTranslations from "@/data1/languages/en";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(enTranslations);
  const [loading, setLoading] = useState(false);

  const loadLanguage = useCallback(async (langCode) => {
    setLoading(true);

    try {
      const langModule = await import(`@/data1/languages/${langCode}.js`);

      setTranslations(langModule.default);
      setLanguage(langCode);

      localStorage.setItem("ivexia-lang", langCode);
      document.documentElement.lang = langCode;
    } catch (error) {
      console.error("Language load failed", error);
      setTranslations(enTranslations);
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
