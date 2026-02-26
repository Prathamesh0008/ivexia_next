"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [magOpen, setMagOpen] = useState(false);

  const router = useRouter();
  const [language, setLanguage] = useState("English");

  const productsRef = useRef(null);
  const magRef = useRef(null);
  const langRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "nl", label: "Dutch", flag: "🇳🇱" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "de", label: "German", flag: "🇩🇪" },
    { code: "pt", label: "Portuguese", flag: "🇵🇹" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "zh", label: "Chinese", flag: "🇨🇳" },
    { code: "ja", label: "Japanese", flag: "🇯🇵" },
    { code: "ar", label: "Arabic", flag: "🇸🇦" },
  ];

  // Detect TopBar height (if you later add topbar)
  useEffect(() => {
    const topBar = document.getElementById("topbar");
    if (topBar) {
      const updateHeight = () => setTopBarHeight(topBar.offsetHeight);
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  // Header animation on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setIsTopBarVisible(false);
      } else if (window.scrollY < lastScrollY) {
        setIsTopBarVisible(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown/search when clicking outside
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
    router.push(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Language dropdown (UI only for now)
  const selectLanguage = (_langCode, label) => {
    // no translation right now
    setLanguage(label);
    setShowLanguages(false);
  };

  // SEARCH — redirect to product/ingredient
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchTerm.trim().toLowerCase();
    if (!q) return;

    const product = FINISHED_PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(q)
    );

    if (product) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(`/products/${product.slug}`);
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    const ingredient = INGREDIENTS.find(
      (i) => i.id.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q)
    );

    if (ingredient) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(`/ingredients/${ingredient.slug}`); // only works if you create this route
      setSearchTerm("");
      setShowSearch(false);
      return;
    }

    alert("No product or ingredient found!");
  };

  return (
    <nav
      className="fixed left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-30 transition-all duration-500 ease-in-out"
      style={{ top: isTopBarVisible ? `${topBarHeight}px` : "0px" }}
    >
      <div className="flex justify-between items-center px-4 md:px-8 h-16">
        {/* LOGO */}
        <div className="flex items-center cursor-pointer" onClick={() => goTo("/")}>
        <Image
  src="/images/Websiteivexia.png"
  alt="Ivexia Logo"
  width={220}
  height={80}
  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
  priority
/>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-8 font-bold text-gray-800 items-center">
          <li onClick={() => goTo("/")} className="hover:text-[#0d2d47] cursor-pointer">
            Home
          </li>

          {/* OUR OFFERINGS DROPDOWN */}
          <li
            ref={productsRef}
            className="relative cursor-pointer hover:text-[#0d2d47]"
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            <span className="inline-flex items-center gap-1">Our Offerings ▾</span>

            {productsOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-64 font-normal z-40">
                <li
                  onClick={() => goTo("/offerings-overview")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                >
                  Overview
                </li>

                <li
                  onClick={() => goTo("/products/ingredient")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                >
                  API / Ingredients
                </li>

                <li
                  onClick={() => goTo("/products")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                >
                  Finished Products
                </li>

                <li
                  onClick={() => goTo("/otc")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                >
                  OTC
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

          <li onClick={() => goTo("/about")} className="hover:text-[#0d2d47] cursor-pointer">
            About
          </li>

          {/* MAGAZINE DROPDOWN */}
          <li
            ref={magRef}
            className="relative cursor-pointer hover:text-[#0d2d47]"
            onClick={() => setMagOpen((prev) => !prev)}
          >
            <span className="inline-flex items-center gap-1">Ivexia Mag ▾</span>

            {magOpen && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-56 font-normal z-40 relative">
                <li
                  onClick={() => goTo("/ivexia-mag?category=news")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  News
                </li>
                <li
                  onClick={() => goTo("/ivexia-mag?category=health")}
                  className="px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Health
                </li>
              </ul>
            )}
          </li>

          <li onClick={() => goTo("/contact")} className="hover:text-[#0d2d47] cursor-pointer">
            Contact
          </li>
        </ul>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-4 relative">
          {/* SEARCH ICON */}
          <FaSearch
            className="cursor-pointer search-icon text-gray-600 hover:text-[#0d2d47]"
            onClick={() => setShowSearch((s) => !s)}
          />

          {/* LANGUAGE BUTTON */}
          <div ref={langRef} className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-[#0d2d47]"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <FaGlobe />
              <span className="text-sm">{language}</span>
            </div>

            {showLanguages && (
              <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-md text-sm font-medium z-50">
                {languages.map((lng) => (
                  <li
                    key={lng.code}
                    onClick={() => selectLanguage(lng.code, lng.label)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <span>{lng.flag}</span>
                    <span>{lng.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
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

      {/* SEARCH BAR */}
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

                  const q = value.toLowerCase();

                  const productMatches = FINISHED_PRODUCTS.filter((p) =>
                    p.name.toLowerCase().includes(q)
                  )
                    .slice(0, 5)
                    .map((p) => ({
                      type: "product",
                      name: p.name,
                      slug: p.slug,
                    }));

                  const ingredientMatches = INGREDIENTS.filter(
                    (i) =>
                      i.slug.toLowerCase().includes(q) ||
                      i.id.toLowerCase().includes(q)
                  )
                    .slice(0, 5)
                    .map((i) => ({
                      type: "ingredient",
                      name: i.slug,
                      slug: i.slug,
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
                  key={index}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <ul className="lg:hidden flex flex-col gap-4 bg-white shadow-md border-t border-gray-100 px-6 py-4 font-medium text-gray-800">
          <li onClick={() => goTo("/")} className="hover:text-[#0d2d47] cursor-pointer">
            Home
          </li>

          <li className="cursor-pointer">
            <details className="group">
              <summary className="flex justify-between items-center py-2 text-[#0d2d47] cursor-pointer">
                <span>Our Offerings</span>
                <span className="transition-transform group-open:rotate-180">▾</span>
              </summary>

              <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
                <span onClick={() => goTo("/offerings-overview")} className="hover:text-[#0d2d47] cursor-pointer">
                  Overview
                </span>
                <span onClick={() => goTo("/products/ingredient")} className="hover:text-[#0d2d47] cursor-pointer">
                  API / Ingredients
                </span>
                <span onClick={() => goTo("/products")} className="hover:text-[#0d2d47] cursor-pointer">
                  Finished Products
                </span>
                <span onClick={() => goTo("/otc")} className="hover:text-[#0d2d47] cursor-pointer">
                  OTC
                </span>
              </div>
            </details>
          </li>

          <li onClick={() => goTo("/about")} className="hover:text-[#0d2d47] cursor-pointer">
            About
          </li>

          <li className="cursor-pointer">
            <details className="group">
              <summary className="flex justify-between items-center py-2 text-[#0d2d47]">
                Ivexia Mag
              </summary>

              <div className="ml-4 mt-1 flex flex-col gap-2 text-gray-700 text-sm">
                <span onClick={() => goTo("/ivexia-mag?category=news")} className="hover:text-[#0d2d47] cursor-pointer">
                  News
                </span>
                <span onClick={() => goTo("/ivexia-mag?category=health")} className="hover:text-[#0d2d47] cursor-pointer">
                  Health
                </span>
              </div>
            </details>
          </li>

          <li onClick={() => goTo("/contact")} className="hover:text-[#0d2d47] cursor-pointer">
            Contact
          </li>

          <li className="cursor-pointer">
            <details>
              <summary className="py-2 text-[#0d2d47]">🌍 {language}</summary>
              <div className="ml-4 mt-2 flex flex-col gap-2 text-gray-700 text-sm">
                {languages.map((lng) => (
                  <span
                    key={lng.code}
                    onClick={() => selectLanguage(lng.code, lng.label)}
                    className="flex items-center gap-2 hover:text-[#0d2d47] cursor-pointer"
                  >
                    {lng.flag} {lng.label}
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