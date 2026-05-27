// ivexia/components/Navbar.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Navbar() {
  const [ingredients, setIngredients] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [magOpen, setMagOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const { translations, loadLanguage, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const magCategory = searchParams.get("category");

  const productsRef = useRef(null);
  const magRef = useRef(null);
  const langRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "gb" },
    { code: "nl", label: "Dutch", flag: "nl" },
    { code: "es", label: "Spanish", flag: "es" },
    { code: "de", label: "German", flag: "de" },
    { code: "pt", label: "Portuguese", flag: "pt" },
    { code: "fr", label: "French", flag: "fr" },
    { code: "zh", label: "Chinese", flag: "cn" },
    { code: "ja", label: "Japanese", flag: "jp" },
    { code: "ar", label: "Arabic", flag: "sa" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => setIngredients(Array.isArray(data) ? data : []))
      .catch(() => setIngredients([]));
  }, []);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const isIngredientPath =
    pathname === "/products/ingredient" ||
    pathname.startsWith("/products/ingredient/");

  const isFinishedProductsPath =
    pathname === "/products" ||
    pathname.startsWith("/products/category/") ||
    (pathname.startsWith("/products/") && !isIngredientPath);

  const isOfferingsActive =
    pathname === "/offerings-overview" ||
    pathname === "/otc" ||
    pathname === "/test-kits" ||
    pathname === "/private-label-manufacturing-oem" ||
    isIngredientPath ||
    isFinishedProductsPath;

  const isMagazineActive =
    pathname === "/ivexia-mag" || pathname.startsWith("/ivexia-mag/");

  const activeTopLinkClass =
    "bg-[#e8f6fb] text-[#FF7A00] font-semibold shadow-sm";

  const topLinkClass =
    "cursor-pointer px-3 py-2 rounded-full transition-all duration-300 hover:bg-[#f3f8fb] hover:text-[#0d2d47]";

  const dropdownItemClass =
    "px-4 py-2.5 text-sm cursor-pointer rounded-md transition-colors duration-200";

  const activeDropdownItemClass = "bg-[#e8f6fb] text-[#0d2d47] font-semibold";

  const mobileSubItemClass = (isActive) =>
    `px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-[#e8f6fb] text-[#0d2d47] font-semibold"
        : "hover:bg-gray-50 hover:text-[#0d2d47]"
    }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
      if (magRef.current && !magRef.current.contains(event.target)) {
        setMagOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".search-icon")
      ) {
        if (!searchTerm) setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm]);

  const goTo = (path) => {
    setMenuOpen(false);
    setProductsOpen(false);
    setMagOpen(false);
    setShowLanguages(false);

    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectLanguage = (langCode) => {
    loadLanguage(langCode);
    setShowLanguages(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const product = products.find((item) =>
      item.name?.toLowerCase().includes(query)
    );

    if (product) {
      goTo(`/products/${product.slug}`);
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    const ingredient = ingredients.find(
      (item) =>
        item.id?.toLowerCase().includes(query) ||
        item.slug?.toLowerCase().includes(query)
    );

    if (ingredient) {
      goTo(`/products/ingredient/${ingredient.slug}`);
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    alert("No product or ingredient found!");
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-md backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:h-[70px] sm:px-6 xl:px-10 2xl:px-0">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/Ivexia.svg"
            alt="Ivexia Logo"
            width={220}
            height={70}
            priority
            unoptimized
            className="h-auto w-[115px] sm:w-[135px] lg:w-[150px] xl:w-[165px]"
          />
        </Link>

        <ul className="hidden items-center gap-2 text-[15px] font-medium text-gray-800 lg:flex xl:gap-4 xl:text-base">
          <li
            onClick={() => goTo("/")}
            className={`${topLinkClass} ${
              pathname === "/" ? activeTopLinkClass : ""
            }`}
          >
            {translations?.nav?.home || "Home"}
          </li>

          <li
            ref={productsRef}
            onClick={() => setProductsOpen((prev) => !prev)}
            className={`relative ${topLinkClass} ${
              isOfferingsActive ? activeTopLinkClass : ""
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {translations?.nav?.offerings || "Offerings"}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </span>

            {productsOpen && (
              <ul className="absolute left-0 top-full z-40 mt-3 w-72 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                {[
                  ["/offerings-overview", translations?.nav?.overview || "Overview", pathname === "/offerings-overview"],
                  ["/products/ingredient", translations?.nav?.api || "API / Ingredients", isIngredientPath],
                  ["/products", translations?.nav?.products || "Finished Products", isFinishedProductsPath],
                  ["/otc", translations?.nav?.otc || "OTC", pathname === "/otc"],
                  ["/private-label-manufacturing-oem", "Private Label Manufacturing / OEM", pathname === "/private-label-manufacturing-oem"],
                  ["/test-kits", "Test Kits", pathname === "/test-kits"],
                ].map(([href, label, active]) => (
                  <li
                    key={href}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(href);
                    }}
                    className={`${dropdownItemClass} ${
                      active
                        ? activeDropdownItemClass
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/about")}
            className={`${topLinkClass} ${
              pathname === "/about" ? activeTopLinkClass : ""
            }`}
          >
            {translations?.nav?.about || "About"}
          </li>

          <li
            ref={magRef}
            onClick={() => setMagOpen((prev) => !prev)}
            className={`relative ${topLinkClass} ${
              isMagazineActive ? activeTopLinkClass : ""
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {translations?.nav?.mag || "Ivexia Mag"}
              <ChevronDown
                size={16}
                className={`transition-transform ${magOpen ? "rotate-180" : ""}`}
              />
            </span>

            {magOpen && (
              <ul className="absolute left-0 top-full z-40 mt-3 w-56 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/ivexia-mag?category=news");
                  }}
                  className={`${dropdownItemClass} ${
                    pathname === "/ivexia-mag" && magCategory === "news"
                      ? activeDropdownItemClass
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {translations?.nav?.mag_news || "News"}
                </li>

                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo("/ivexia-mag?category=health");
                  }}
                  className={`${dropdownItemClass} ${
                    pathname === "/ivexia-mag" && magCategory === "health"
                      ? activeDropdownItemClass
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {translations?.nav?.mag_health || "Health"}
                </li>
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/contact")}
            className={`${topLinkClass} ${
              pathname === "/contact" ? activeTopLinkClass : ""
            }`}
          >
            {translations?.nav?.contact || "Contact"}
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <FaSearch
            className="search-icon cursor-pointer text-gray-600 hover:text-[#0d2d47]"
            onClick={() => setShowSearch((prev) => !prev)}
          />

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => {
  setShowLanguages((prev) => !prev);
  setMenuOpen(false);
}}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600 hover:text-[#0d2d47]"
            >
              <img
                src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
                alt={currentLang.label}
                className="h-4 w-5 rounded-sm"
              />
              <span className="hidden sm:inline">{currentLang.label}</span>
            </button>

            {showLanguages && (
            <ul className="absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-gray-100 bg-white/95 p-2 text-sm font-medium shadow-2xl backdrop-blur-md
animate-[dropdownFade_0.22s_ease-out] max-h-[320px] overflow-y-auto lg:max-h-none lg:overflow-visible">
                {languages.map((lng) => (
                  <li
                    key={lng.code}
                    onClick={() => selectLanguage(lng.code)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lng.flag}.png`}
                      alt={lng.label}
                      className="h-4 w-5 rounded-sm"
                    />
                    <span>{lng.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <FaTimes className="text-xl text-gray-700" />
            ) : (
              <FaBars className="text-xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {showSearch && (
        <div
          ref={searchRef}
          className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 lg:px-10"
        >
          <form onSubmit={handleSearchSubmit} className="mx-auto max-w-7xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);

                  if (!value.trim()) {
                    setSuggestions([]);
                    return;
                  }

                  const query = value.toLowerCase();

                  const productMatches = products
                    .filter((item) => item.name?.toLowerCase().includes(query))
                    .slice(0, 5)
                    .map((item) => ({
                      type: "product",
                      name: item.name,
                      slug: item.slug,
                    }));

                  const ingredientMatches = ingredients
                    .filter(
                      (item) =>
                        item.slug?.toLowerCase().includes(query) ||
                        item.id?.toLowerCase().includes(query)
                    )
                    .slice(0, 5)
                    .map((item) => ({
                      type: "ingredient",
                      name: item.name || item.slug,
                      slug: item.slug,
                    }));

                  setSuggestions([...productMatches, ...ingredientMatches]);
                }}
                placeholder="Search products or ingredients..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#0d2d47]"
              />

              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
          </form>

          {suggestions.length > 0 && (
            <div className="mx-auto mt-2 max-h-60 max-w-7xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {suggestions.map((item, index) => (
                <div
                  key={`${item.slug}-${index}`}
                  onClick={() => {
                    goTo(
                      item.type === "product"
                        ? `/products/${item.slug}`
                        : `/products/ingredient/${item.slug}`
                    );
                    setSearchTerm("");
                    setSuggestions([]);
                    setShowSearch(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
      <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-gray-100 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-md lg:hidden animate-[mobileMenuSlide_0.28s_ease-out]">
          <ul className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-medium text-gray-800">
            <li
              onClick={() => goTo("/")}
              className={`${topLinkClass} ${
                pathname === "/" ? activeTopLinkClass : ""
              }`}
            >
              {translations?.nav?.home || "Home"}
            </li>

            <li>
              <details className="group rounded-xl bg-gray-50 p-2">
                <summary className="flex cursor-pointer items-center justify-between px-2 py-2 text-[#0d2d47]">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      isOfferingsActive ? activeTopLinkClass : ""
                    }`}
                  >
                    {translations?.nav?.offerings || "Our Products"}
                  </span>
                  <ChevronDown
                    size={16}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>

                <div className="mt-2 flex flex-col gap-1 pl-2">
                  <span
                    onClick={() => goTo("/offerings-overview")}
                    className={mobileSubItemClass(pathname === "/offerings-overview")}
                  >
                    Overview
                  </span>
                  <span
                    onClick={() => goTo("/products/ingredient")}
                    className={mobileSubItemClass(isIngredientPath)}
                  >
                    API / Ingredients
                  </span>
                  <span
                    onClick={() => goTo("/products")}
                    className={mobileSubItemClass(isFinishedProductsPath)}
                  >
                    Finished Products
                  </span>
                  <span
                    onClick={() => goTo("/otc")}
                    className={mobileSubItemClass(pathname === "/otc")}
                  >
                    OTC
                  </span>
                  <span
                    onClick={() => goTo("/test-kits")}
                    className={mobileSubItemClass(pathname === "/test-kits")}
                  >
                    Test Kits
                  </span>
                  <span
                    onClick={() => goTo("/private-label-manufacturing-oem")}
                    className={mobileSubItemClass(
                      pathname === "/private-label-manufacturing-oem"
                    )}
                  >
                    Private Label Manufacturing / OEM
                  </span>
                </div>
              </details>
            </li>

            <li
              onClick={() => goTo("/about")}
              className={`${topLinkClass} ${
                pathname === "/about" ? activeTopLinkClass : ""
              }`}
            >
              {translations?.nav?.about || "About"}
            </li>

            <li>
              <details className="group rounded-xl bg-gray-50 p-2">
                <summary className="flex cursor-pointer items-center justify-between px-2 py-2 text-[#0d2d47]">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      isMagazineActive ? activeTopLinkClass : ""
                    }`}
                  >
                    {translations?.nav?.mag || "Ivexia Mag"}
                  </span>
                  <ChevronDown
                    size={16}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>

                <div className="mt-2 flex flex-col gap-1 pl-2">
                  <span
                    onClick={() => goTo("/ivexia-mag?category=news")}
                    className={mobileSubItemClass(
                      pathname === "/ivexia-mag" && magCategory === "news"
                    )}
                  >
                    News
                  </span>
                  <span
                    onClick={() => goTo("/ivexia-mag?category=health")}
                    className={mobileSubItemClass(
                      pathname === "/ivexia-mag" && magCategory === "health"
                    )}
                  >
                    Health
                  </span>
                </div>
              </details>
            </li>

            <li
              onClick={() => goTo("/contact")}
              className={`${topLinkClass} ${
                pathname === "/contact" ? activeTopLinkClass : ""
              }`}
            >
              {translations?.nav?.contact || "Contact"}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}