//ivexia\components\IngredientPageClient.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import IngredientHero from "@/components/IngredientHero";
import IngredientStats from "@/components/IngredientStats";
import IngredientFilters from "@/components/IngredientFilters";
import IngredientGrid from "@/components/IngredientGrid";
import IngredientAccord from "@/components/IngredientAccord";
import IngredientQualityStrip from "@/components/IngredientQualityStrip";
import { GridPageSkeleton } from "@/components/RouteSkeletons";
import { useLanguage } from "@/contexts/LanguageContext";
export default function IngredientPageClient({ initialIngredients = [] }) {
  const ingredients = initialIngredients;
  const [loading] = useState(false);
  const [error, setError] = useState("");
const { translations } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [dosage, setDosage] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const gridRef = useRef(null);


  useEffect(() => {
    function updatePageSize() {
      const w = window.innerWidth;
      const nextPageSize = w < 640 ? 4 : w < 1024 ? 8 : 12;

      setPageSize((prevPageSize) => {
        if (prevPageSize !== nextPageSize) {
          setPage(1);
        }

        return nextPageSize;
      });
    }

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    if (!gridRef.current) {
      return;
    }

    const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [page]);

  const categories = useMemo(() => {
    const unique = new Set();

    ingredients.forEach((ingredient) => {
      if (ingredient.category) {
        unique.add(ingredient.category);
      }
    });

    return ["All", ...Array.from(unique)];
  }, [ingredients]);

  const dosages = ["All"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = ingredients.filter((ingredient) => {
      const name = (ingredient.name || "").toLowerCase();
      const slug = (ingredient.slug || "").toLowerCase();
      const id = (ingredient.id || "").toLowerCase();

      const matchQuery =
        !q ||
        name.includes(q) ||
        slug.includes(q) ||
        id.includes(q) ||
        (ingredient.cas && ingredient.cas.toLowerCase().includes(q));

      const matchCategory =
        category === "All" || ingredient.category === category;

      const matchDosage = dosage === "All" || ingredient.dosage === dosage;

      return matchQuery && matchCategory && matchDosage;
    });

    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "category":
        list.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
        break;
      default:
        break;
    }

    return list;
  }, [ingredients, query, category, dosage, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return <GridPageSkeleton />;
  }

  return (
    <div>
      <IngredientHero />
      <IngredientStats />
      <IngredientQualityStrip />

      <section id="ingredient-catalog" className="bg-[#FFF8F5] py-10">
        <div ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0d2d47] mb-6">
    {translations?.ingredient?.heading || "Active Pharmaceutical Ingredients (API)"}
          </h2>

          {error && (
            <p className="mb-4 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <IngredientFilters
            query={query}
            setQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
            categories={categories}
            category={category}
            setCategory={(value) => {
              setCategory(value);
              setPage(1);
            }}
            dosages={dosages}
            dosage={dosage}
            setDosage={(value) => {
              setDosage(value);
              setPage(1);
            }}
            sortBy={sortBy}
            setSortBy={(value) => {
              setSortBy(value);
              setPage(1);
            }}
            total={filtered.length}
            onReset={() => {
              setQuery("");
              setCategory("All");
              setDosage("All");
              setSortBy("name-asc");
              setPage(1);
            }}
          />
        </div>
      </section>

      <section className="bg-[#FFF8F5] pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <IngredientGrid
            items={current}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </section>

      <IngredientAccord />
    </div>
  );
}
