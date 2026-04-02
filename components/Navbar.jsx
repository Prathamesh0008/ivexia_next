"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaBars, FaGlobe, FaSearch, FaTimes } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import INGREDIENTS from "@/data/ingredients";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [magOpen, setMagOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const magCategory = searchParams.get("category");

  const productsRef = useRef(null);
  const magRef = useRef(null);
  const langRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "nl", label: "Dutch" },
    { code: "es", label: "Spanish" },
    { code: "de", label: "German" },
    { code: "pt", label: "Portuguese" },
    { code: "fr", label: "French" },
    { code: "zh", label: "Chinese" },
    { code: "ja", label: "Japanese" },
    { code: "ar", label: "Arabic" },
  ];

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
    "cursor-pointer px-3 py-1.5 rounded-full transition-all duration-300 ease-out hover:bg-[#f3f8fb] hover:text-[#0d2d47]";
  const activeDropdownItemClass = "bg-[#e8f6fb] text-[#0d2d47] font-semibold";
  const dropdownItemClass =
    "px-4 py-2 text-sm cursor-pointer rounded-md transition-colors duration-200";

  const mobileSubItemClass = (isActive) =>
    `px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-[#e8f6fb] text-[#0d2d47] font-semibold"
        : "hover:text-[#0d2d47]"
    }`;

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

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
        if (!searchTerm) {
          setShowSearch(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm]);

  const goTo = (path) => {
    router.push(path);
    setMenuOpen(false);
    setProductsOpen(false);
    setMagOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectLanguage = (_langCode, label) => {
    setLanguage(label);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(`/products/${product.slug}`);
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    const ingredient = INGREDIENTS.find(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query)
    );

    if (ingredient) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(`/ingredients/${ingredient.slug}`);
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    alert("No product or ingredient found!");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[88px] bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="flex justify-between items-center px-4 md:px-8 h-full">
        <div
          className="h-full flex items-center cursor-pointer"
          onClick={() => goTo("/")}
        >
          <Image
            src="/images/navlogo.png"
            alt="Ivexia Logo"
            width={320}
            height={100}
            className="h-12 md:h-12 w-auto object-contain block"
            priority
          />
        </div>

        <ul className="hidden lg:flex h-full gap-8 text-lg md:text-lg text-gray-800 items-center">
          <li
            onClick={() => goTo("/")}
            className={`${topLinkClass} ${
              pathname === "/" ? activeTopLinkClass : ""
            }`}
          >
            Home
          </li>

          <li
            ref={productsRef}
            className={`relative ${topLinkClass} ${
              isOfferingsActive ? activeTopLinkClass : ""
            }`}
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            <span className="inline-flex items-center gap-2">
              <span>Our Offerings</span>
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </span>

            {productsOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-64 font-normal z-40">
                <li
                  onClick={() => goTo("/offerings-overview")}
                  className={`${dropdownItemClass} ${
                    pathname === "/offerings-overview"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Overview
                </li>
                <li
                  onClick={() => goTo("/products/ingredient")}
                  className={`${dropdownItemClass} ${
                    isIngredientPath
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  API / Ingredients
                </li>
                <li
                  onClick={() => goTo("/products")}
                  className={`${dropdownItemClass} ${
                    isFinishedProductsPath
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Finished Products
                </li>
                <li
                  onClick={() => goTo("/otc")}
                  className={`${dropdownItemClass} ${
                    pathname === "/otc"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  OTC
                </li>
                <li
                  onClick={() => goTo("/private-label-manufacturing-oem")}
                  className={`${dropdownItemClass} ${
                    pathname === "/private-label-manufacturing-oem"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Private Label Manufacturing / OEM
                </li>
                <li
                  onClick={() => goTo("/test-kits")}
                  className={`${dropdownItemClass} ${
                    pathname === "/test-kits"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Test Kits
                </li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsOpen(false);
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  type="button"
                >
                  <FaTimes />
                </button>
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/about")}
            className={`${topLinkClass} ${
              pathname === "/about" ? activeTopLinkClass : ""
            }`}
          >
            About
          </li>

          <li
            ref={magRef}
            className={`relative ${topLinkClass} ${
              isMagazineActive ? activeTopLinkClass : ""
            }`}
            onClick={() => setMagOpen((prev) => !prev)}
          >
            <span className="inline-flex items-center gap-2">
              <span>Ivexia Magazine</span>
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${
                  magOpen ? "rotate-180" : ""
                }`}
              />
            </span>

            {magOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-64 font-normal z-40">
                <li
                  onClick={() => goTo("/ivexia-mag?category=news")}
                  className={`${dropdownItemClass} ${
                    pathname === "/ivexia-mag" && magCategory === "news"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  News
                </li>
                <li
                  onClick={() => goTo("/ivexia-mag?category=health")}
                  className={`${dropdownItemClass} ${
                    pathname === "/ivexia-mag" && magCategory === "health"
                      ? activeDropdownItemClass
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Health
                </li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMagOpen(false);
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  type="button"
                >
                  <FaTimes />
                </button>
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/contact")}
            className={`${topLinkClass} ${
              pathname === "/contact" ? activeTopLinkClass : ""
            }`}
          >
            Contact
          </li>
        </ul>

        <div className="h-full flex items-center gap-4 relative">
          <FaSearch
            className="cursor-pointer search-icon text-gray-600 hover:text-[#0d2d47]"
            onClick={() => setShowSearch((prev) => !prev)}
          />

          <div ref={langRef} className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0d2d47]"
              onClick={() => setShowLanguages((prev) => !prev)}
            >
              <FaGlobe />
              <span className="text-sm">{language}</span>
            </div>

            {showLanguages && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md text-sm font-medium z-50">
                {languages.map((lng) => (
                  <li
                    key={lng.code}
                    onClick={() => selectLanguage(lng.code, lng.label)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <span className="inline-flex min-w-8 justify-center rounded bg-[#f3f8fb] px-2 py-0.5 text-[11px] font-semibold uppercase text-[#0d2d47]">
                      {lng.code}
                    </span>
                    <span>{lng.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:hidden">
            {menuOpen ? (
              <FaTimes
                className="text-gray-700 text-xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="text-gray-700 text-xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div
          ref={searchRef}
          className="relative px-4 md:px-8 py-2 bg-gray-50 border-t border-gray-200"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center relative">
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
                    .filter((item) =>
                      item.name?.toLowerCase().includes(query)
                    )
                    .slice(0, 5)
                    .map((item) => ({
                      type: "product",
                      name: item.name,
                      slug: item.slug,
                    }));

                  const ingredientMatches = INGREDIENTS.filter(
                    (item) =>
                      item.slug.toLowerCase().includes(query) ||
                      item.id.toLowerCase().includes(query)
                  )
                    .slice(0, 5)
                    .map((item) => ({
                      type: "ingredient",
                      name: item.slug,
                      slug: item.slug,
                    }));

                  setSuggestions([...productMatches, ...ingredientMatches]);
                }}
                placeholder="Search products or ingredients..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-[#0d2d47]"
              />

              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="absolute right-3 text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
          </form>

          {suggestions.length > 0 && (
            <div className="absolute left-4 right-4 bg-white shadow-lg border border-gray-200 mt-2 rounded-md z-50 max-h-60 overflow-y-auto">
              {suggestions.map((item, index) => (
                <div
                  key={`${item.slug}-${index}`}
                  onClick={() => {
                    if (item.type === "product") {
                      router.push(`/products/${item.slug}`);
                    } else {
                      router.push(`/ingredients/${item.slug}`);
                    }
                    setSearchTerm("");
                    setSuggestions([]);
                    setShowSearch(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <ul className="lg:hidden flex flex-col gap-4 bg-white shadow-md border-t border-gray-100 px-6 py-4 font-medium text-gray-800">
          <li
            onClick={() => goTo("/")}
            className={`${topLinkClass} ${
              pathname === "/" ? activeTopLinkClass : ""
            }`}
          >
            Home
          </li>

          <li className="cursor-pointer">
            <details className="group">
              <summary className="flex justify-between items-center py-2 text-[#0d2d47] cursor-pointer">
                <span
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${
                    isOfferingsActive ? activeTopLinkClass : ""
                  }`}
                >
                  Our Offerings
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>

              <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
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
            About
          </li>

          <li className="cursor-pointer">
            <details className="group">
              <summary className="flex justify-between items-center py-2 text-[#0d2d47]">
                <span
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${
                    isMagazineActive ? activeTopLinkClass : ""
                  }`}
                >
                  Ivexia Mag
                </span>
              </summary>

              <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
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
            Contact
          </li>

          <li className="cursor-pointer">
            <details>
              <summary className="py-2 text-[#0d2d47] flex items-center gap-2">
                <FaGlobe />
                <span>{language}</span>
              </summary>
              <div className="ml-4 mt-2 flex flex-col gap-2 text-gray-700 text-sm">
                {languages.map((lng) => (
                  <span
                    key={lng.code}
                    onClick={() => selectLanguage(lng.code, lng.label)}
                    className="flex items-center gap-2 hover:text-[#0d2d47] cursor-pointer"
                  >
                    <span className="inline-flex min-w-8 justify-center rounded bg-[#f3f8fb] px-2 py-0.5 text-[11px] font-semibold uppercase text-[#0d2d47]">
                      {lng.code}
                    </span>
                    <span>{lng.label}</span>
                  </span>
                ))}
              </div>
            </details>
          </li>
        </ul>
      )}
    </nav>
  );
}









// //ivexia\components\Navbar.jsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { FaSearch, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
// import Image from "next/image";
// import { FINISHED_PRODUCTS } from "@/data/finishedProducts";
// import INGREDIENTS from "@/data/ingredients";

// export default function Navbar() {
//   const [showSearch, setShowSearch] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isTopBarVisible, setIsTopBarVisible] = useState(true);
//   const [topBarHeight, setTopBarHeight] = useState(0);
//   const [showLanguages, setShowLanguages] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [productsOpen, setProductsOpen] = useState(false);
//   const [magOpen, setMagOpen] = useState(false);

//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const magCategory = searchParams.get("category");
//   const [language, setLanguage] = useState("English");

//   const productsRef = useRef(null);
//   const magRef = useRef(null);
//   const langRef = useRef(null);
//   const searchRef = useRef(null);

//   const languages = [
//     { code: "en", label: "English", flag: "🇬🇧" },
//     { code: "nl", label: "Dutch", flag: "🇳🇱" },
//     { code: "es", label: "Spanish", flag: "🇪🇸" },
//     { code: "de", label: "German", flag: "🇩🇪" },
//     { code: "pt", label: "Portuguese", flag: "🇵🇹" },
//     { code: "fr", label: "French", flag: "🇫🇷" },
//     { code: "zh", label: "Chinese", flag: "🇨🇳" },
//     { code: "ja", label: "Japanese", flag: "🇯🇵" },
//     { code: "ar", label: "Arabic", flag: "🇸🇦" },
//   ];

//   const isIngredientPath =
//     pathname === "/products/ingredient" ||
//     pathname.startsWith("/products/ingredient/");

//   const isFinishedProductsPath =
//     pathname === "/products" ||
//     pathname.startsWith("/products/category/") ||
//     (pathname.startsWith("/products/") && !isIngredientPath);

//   const isOfferingsActive =
//     pathname === "/offerings-overview" ||
//     pathname === "/otc" ||
//     pathname === "/test-kits" ||
//     pathname === "/private-label-manufacturing-oem" ||
//     isIngredientPath ||
//     isFinishedProductsPath;

//   const isMagazineActive =
//     pathname === "/ivexia-mag" || pathname.startsWith("/ivexia-mag/");



//   const activeTopLinkClass =
//     "bg-[#e8f6fb] text-[#FF7A00] font-semibold shadow-sm";
//   const topLinkClass =
//     "cursor-pointer px-3 py-1.5 rounded-full transition-all duration-300 ease-out hover:bg-[#f3f8fb] hover:text-[#0d2d47]";

//   const activeDropdownItemClass = "bg-[#e8f6fb] text-[#0d2d47] font-semibold";
//   const dropdownItemClass =
//     "px-4 py-2 text-sm cursor-pointer rounded-md transition-colors duration-200";

//   const mobileSubItemClass = (isActive) =>
//     `px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
//       isActive
//         ? "bg-[#e8f6fb] text-[#0d2d47] font-semibold"
//         : "hover:text-[#0d2d47]"
//     }`;

//   // Detect TopBar height (if you later add topbar)
//   useEffect(() => {
//     const topBar = document.getElementById("topbar");
//     if (topBar) {
//       const updateHeight = () => setTopBarHeight(topBar.offsetHeight);
//       updateHeight();
//       window.addEventListener("resize", updateHeight);
//       return () => window.removeEventListener("resize", updateHeight);
//     }
//   }, []);

//   // Header animation on scroll
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       if (window.scrollY > 100 && window.scrollY > lastScrollY) {
//         setIsTopBarVisible(false);
//       } else if (window.scrollY < lastScrollY) {
//         setIsTopBarVisible(true);
//       }
//       lastScrollY = window.scrollY;
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close dropdown/search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (productsRef.current && !productsRef.current.contains(event.target)) {
//         setProductsOpen(false);
//       }
//       if (magRef.current && !magRef.current.contains(event.target)) {
//         setMagOpen(false);
//       }
//       if (langRef.current && !langRef.current.contains(event.target)) {
//         setShowLanguages(false);
//       }

//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target) &&
//         !event.target.closest(".search-icon")
//       ) {
//         if (!searchTerm) setShowSearch(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [searchTerm]);

//   const goTo = (path) => {
//     router.push(path);
//     setMenuOpen(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Language dropdown (UI only for now)
//   const selectLanguage = (_langCode, label) => {
//     // no translation right now
//     setLanguage(label);
//     setShowLanguages(false);
//   };

//   // SEARCH — redirect to product/ingredient
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const q = searchTerm.trim().toLowerCase();
//     if (!q) return;

//     const product = FINISHED_PRODUCTS.find((p) =>
//       p.name.toLowerCase().includes(q)
//     );

//     if (product) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       router.push(`/products/${product.slug}`);
//       setSearchTerm("");
//       setShowSearch(false);
//       return;
//     }

//     const ingredient = INGREDIENTS.find(
//       (i) => i.id.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q)
//     );

//     if (ingredient) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       router.push(`/ingredients/${ingredient.slug}`); // only works if you create this route
//       setSearchTerm("");
//       setShowSearch(false);
//       return;
//     }

//     alert("No product or ingredient found!");
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 h-[88px] bg-white/95 backdrop-blur-md shadow-md z-50">
//       <div className="flex justify-between items-center px-4 md:px-8 h-full">
        
//         {/* LOGO */}
//         <div className="h-full flex items-center cursor-pointer" onClick={() => goTo("/")}>
//         <Image
//   src="/images/navlogo.png"
//   alt="Ivexia Logo"
//   width={320}
//   height={100}
//   className="h-12 md:h-12 w-auto object-contain block"
//   priority
// />
//         </div>

//         {/* DESKTOP MENU */}
//         <ul className="hidden lg:flex h-full gap-8 text-lg md:text-lg text-gray-800 items-center">
//           <li
//             onClick={() => goTo("/")}
//             className={`${topLinkClass} ${
//               pathname === "/" ? activeTopLinkClass : ""
//             }`}
//           >
//             Home
//           </li>

//           {/* OUR OFFERINGS DROPDOWN */}
//           <li
//             ref={productsRef}
//             className={`relative ${topLinkClass} ${
//               isOfferingsActive ? activeTopLinkClass : ""
//             }`}
//             onClick={() => setProductsOpen((prev) => !prev)}
//           >
//             <span className="inline-flex items-center gap-1">Our Offerings ▾</span>

//             {productsOpen && (
//               <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-64 font-normal z-40">
//                 <li
//                   onClick={() => goTo("/offerings-overview")}
//                   className={`${dropdownItemClass} ${
//                     pathname === "/offerings-overview"
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   Overview
//                 </li>

//                 <li
//                   onClick={() => goTo("/products/ingredient")}
//                   className={`${dropdownItemClass} ${
//                     isIngredientPath
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   API / Ingredients
//                 </li>

//                 <li
//                   onClick={() => goTo("/products")}
//                   className={`${dropdownItemClass} ${
//                     isFinishedProductsPath
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   Finished Products
//                 </li>

//                 <li
//                   onClick={() => goTo("/otc")}
//                   className={`${dropdownItemClass} ${
//                     pathname === "/otc"
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   OTC
//                 </li>
//                 <li
//                   onClick={() => goTo("/private-label-manufacturing-oem")}
//                   className={`${dropdownItemClass} ${
//                     pathname === "/private-label-manufacturing-oem"
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   Private Label Manufacturing / OEM
//                 </li>
//                 <li
//                   onClick={() => goTo("/test-kits")}
//                   className={`${dropdownItemClass} ${
//                     pathname === "/test-kits"
//                       ? activeDropdownItemClass
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   Test Kits
//                 </li>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setProductsOpen(false);
//                   }}
//                   className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                   type="button"
//                 >
//                   <FaTimes />
//                 </button>
//               </ul>
//             )}
//           </li>

//           <li
//             onClick={() => goTo("/about")}
//             className={`${topLinkClass} ${
//               pathname === "/about" ? activeTopLinkClass : ""
//             }`}
//           >
//             About
//           </li>

//          {/* MAGAZINE DROPDOWN */}
// <li
//   ref={magRef}
//   className={`relative ${topLinkClass} ${
//     isMagazineActive ? activeTopLinkClass : ""
//   }`}
//   onClick={() => setMagOpen((prev) => !prev)}
// >
//   <span className="inline-flex items-center gap-1">
//     Ivexia Magazine ▾
//   </span>

//   {magOpen && (
//     <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-64 font-normal z-40">
      
//       <li
//         onClick={() => goTo("/ivexia-mag?category=news")}
//         className={`${dropdownItemClass} ${
//           pathname === "/ivexia-mag" && magCategory === "news"
//             ? activeDropdownItemClass
//             : "hover:bg-gray-100 text-gray-700"
//         }`}
//       >
//         News
//       </li>

//       <li
//         onClick={() => goTo("/ivexia-mag?category=health")}
//         className={`${dropdownItemClass} ${
//           pathname === "/ivexia-mag" && magCategory === "health"
//             ? activeDropdownItemClass
//             : "hover:bg-gray-100 text-gray-700"
//         }`}
//       >
//         Health
//       </li>

//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setMagOpen(false);
//         }}
//         className="absolute top-2 right-2 text-gray-500 hover:text-black"
//         type="button"
//       >
//         <FaTimes />
//       </button>

//     </ul>
//   )}
// </li>

//           <li
//             onClick={() => goTo("/contact")}
//             className={`${topLinkClass} ${
//               pathname === "/contact" ? activeTopLinkClass : ""
//             }`}
//           >
//             Contact
//           </li>
//         </ul>

//         {/* RIGHT SIDE ICONS */}
//         <div className="h-full flex items-center gap-4 relative">
//           {/* SEARCH ICON */}
//           <FaSearch
//             className="cursor-pointer search-icon text-gray-600 hover:text-[#0d2d47]"
//             onClick={() => setShowSearch((s) => !s)}
//           />

//           {/* LANGUAGE BUTTON */}
//           <div ref={langRef} className="relative">
//             <div
//               className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0d2d47]"
//               onClick={() => setShowLanguages(!showLanguages)}
//             >
//               <FaGlobe />
//               <span className="text-sm">{language}</span>
//             </div>

//             {showLanguages && (
//               <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md text-sm font-medium z-50">
//                 {languages.map((lng) => (
//                   <li
//                     key={lng.code}
//                     onClick={() => selectLanguage(lng.code, lng.label)}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                   >
//                     <span>{lng.flag}</span>
//                     <span>{lng.label}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* MOBILE MENU TOGGLE */}
//           <div className="lg:hidden">
//             {menuOpen ? (
//               <FaTimes
//                 className="text-gray-700 text-xl cursor-pointer"
//                 onClick={() => setMenuOpen(false)}
//               />
//             ) : (
//               <FaBars
//                 className="text-gray-700 text-xl cursor-pointer"
//                 onClick={() => setMenuOpen(true)}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* SEARCH BAR */}
//       {showSearch && (
//         <div
//           ref={searchRef}
//           className="relative px-4 md:px-8 py-2 bg-gray-50 border-t border-gray-200"
//         >
//           <form onSubmit={handleSearchSubmit}>
//             <div className="flex items-center relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchTerm(value);

//                   if (!value.trim()) {
//                     setSuggestions([]);
//                     return;
//                   }

//                   const q = value.toLowerCase();

//                   const productMatches = FINISHED_PRODUCTS.filter((p) =>
//                     p.name.toLowerCase().includes(q)
//                   )
//                     .slice(0, 5)
//                     .map((p) => ({
//                       type: "product",
//                       name: p.name,
//                       slug: p.slug,
//                     }));

//                   const ingredientMatches = INGREDIENTS.filter(
//                     (i) =>
//                       i.slug.toLowerCase().includes(q) ||
//                       i.id.toLowerCase().includes(q)
//                   )
//                     .slice(0, 5)
//                     .map((i) => ({
//                       type: "ingredient",
//                       name: i.slug,
//                       slug: i.slug,
//                     }));

//                   setSuggestions([...productMatches, ...ingredientMatches]);
//                 }}
//                 placeholder="Search products or ingredients..."
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-[#0d2d47]"
//               />

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowSearch(false);
//                   setSearchTerm("");
//                   setSuggestions([]);
//                 }}
//                 className="absolute right-3 text-gray-500 hover:text-black"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           </form>

//           {suggestions.length > 0 && (
//             <div className="absolute left-4 right-4 bg-white shadow-lg border border-gray-200 mt-2 rounded-md z-50 max-h-60 overflow-y-auto">
//               {suggestions.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     if (item.type === "product") {
//                       router.push(`/products/${item.slug}`);
//                     } else {
//                       router.push(`/ingredients/${item.slug}`);
//                     }
//                     setSearchTerm("");
//                     setSuggestions([]);
//                     setShowSearch(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                 >
//                   {item.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <ul className="lg:hidden flex flex-col gap-4 bg-white shadow-md border-t border-gray-100 px-6 py-4 font-medium text-gray-800">
//           <li
//             onClick={() => goTo("/")}
//             className={`${topLinkClass} ${
//               pathname === "/" ? activeTopLinkClass : ""
//             }`}
//           >
//             Home
//           </li>

//           <li className="cursor-pointer">
//             <details className="group">
//               <summary className="flex justify-between items-center py-2 text-[#0d2d47] cursor-pointer">
//                 <span
//                   className={`px-3 py-1 rounded-full transition-all duration-300 ${
//                     isOfferingsActive ? activeTopLinkClass : ""
//                   }`}
//                 >
//                   Our Offerings
//                 </span>
//                 <span className="transition-transform group-open:rotate-180">▾</span>
//               </summary>

//               <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
//                 <span
//                   onClick={() => goTo("/offerings-overview")}
//                   className={mobileSubItemClass(pathname === "/offerings-overview")}
//                 >
//                   Overview
//                 </span>
//                 <span
//                   onClick={() => goTo("/products/ingredient")}
//                   className={mobileSubItemClass(isIngredientPath)}
//                 >
//                   API / Ingredients
//                 </span>
//                 <span
//                   onClick={() => goTo("/products")}
//                   className={mobileSubItemClass(isFinishedProductsPath)}
//                 >
//                   Finished Products
//                 </span>
//                 <span
//                   onClick={() => goTo("/otc")}
//                   className={mobileSubItemClass(pathname === "/otc")}
//                 >
//                   OTC
//                 </span>
//                 <span
//                   onClick={() => goTo("/test-kits")}
//                   className={mobileSubItemClass(pathname === "/test-kits")}
//                 >
//                   Test Kits
//                 </span>
//                 <span
//                   onClick={() => goTo("/private-label-manufacturing-oem")}
//                   className={mobileSubItemClass(
//                     pathname === "/private-label-manufacturing-oem"
//                   )}
//                 >
//                   Private Label Manufacturing / OEM
//                 </span>
//               </div>
//             </details>
//           </li>

//           <li
//             onClick={() => goTo("/about")}
//             className={`${topLinkClass} ${
//               pathname === "/about" ? activeTopLinkClass : ""
//             }`}
//           >
//             About
//           </li>

//           <li className="cursor-pointer">
//             <details className="group">
//               <summary className="flex justify-between items-center py-2 text-[#0d2d47]">
//                 <span
//                   className={`px-3 py-1 rounded-full transition-all duration-300 ${
//                     isMagazineActive ? activeTopLinkClass : ""
//                   }`}
//                 >
//                   Ivexia Mag
//                 </span>
//               </summary>

//               <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
//                 <span
//                   onClick={() => goTo("/ivexia-mag?category=news")}
//                   className={mobileSubItemClass(
//                     pathname === "/ivexia-mag" && magCategory === "news"
//                   )}
//                 >
//                   News
//                 </span>
//                 <span
//                   onClick={() => goTo("/ivexia-mag?category=health")}
//                   className={mobileSubItemClass(
//                     pathname === "/ivexia-mag" && magCategory === "health"
//                   )}
//                 >
//                   Health
//                 </span>
//               </div>
//             </details>
//           </li>

//           <li
//             onClick={() => goTo("/contact")}
//             className={`${topLinkClass} ${
//               pathname === "/contact" ? activeTopLinkClass : ""
//             }`}
//           >
//             Contact
//           </li>

//           <li className="cursor-pointer">
//             <details>
//               <summary className="py-2 text-[#0d2d47]">🌍 {language}</summary>
//               <div className="ml-4 mt-2 flex flex-col gap-2 text-gray-700 text-sm">
//                 {languages.map((lng) => (
//                   <span
//                     key={lng.code}
//                     onClick={() => selectLanguage(lng.code, lng.label)}
//                     className="flex items-center gap-2 hover:text-[#0d2d47] cursor-pointer"
//                   >
//                     {lng.flag} {lng.label}
//                   </span>
//                 ))}
//               </div>
//             </details>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// }


