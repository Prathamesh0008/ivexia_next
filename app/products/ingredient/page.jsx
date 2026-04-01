"use client";

import { useMemo, useState, useEffect, useRef } from "react";

import IngredientHero from "@/components/IngredientHero";
import IngredientStats from "@/components/IngredientStats";
import IngredientFilters from "@/components/IngredientFilters";
import IngredientGrid from "@/components/IngredientGrid";
import IngredientAccord from "@/components/IngredientAccord";
import IngredientQualityStrip from "@/components/IngredientQualityStrip";
import INGREDIENTS from "@/data/ingredients";


export default function IngredientPage() {
  const [query, setQuery] = useState("");
  const formatKey = (key) => {
  if (!key) return "";
  const parts = key.split(".");
  const last = parts[parts.length - 2] || parts[parts.length - 1];
  return last.replace(/-/g, " ");
};
  const [category, setCategory] = useState("All");
  const [dosage, setDosage] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);
const gridRef = useRef(null);
  // Responsive sizing
  const [pageSize, setPageSize] = useState(12);

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

  /* ---------------------------
     2️⃣ Scroll On Page Change
  ---------------------------- */
  useEffect(() => {
    if (!gridRef.current) return;

    const y =
      gridRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      80; // adjust for navbar height

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, [page]);

  // Categories (raw keys)
  const categories = useMemo(() => {
    const unique = new Set();
    INGREDIENTS.forEach((i) => {
      if (i.categoryKey) unique.add(i.categoryKey);
      else if (i.category) unique.add(i.category);
    });
    return ["All", ...Array.from(unique)];
  }, []);

  // Dosage forms (raw keys)
  const dosages = useMemo(() => {
    const unique = new Set();
    INGREDIENTS.forEach((i) => {
      if (Array.isArray(i.dosageKeys)) i.dosageKeys.forEach((d) => unique.add(d));
      else if (Array.isArray(i.dosage)) i.dosage.forEach((d) => unique.add(d));
      else if (i.dosage) unique.add(i.dosage);
    });
    return ["All", ...Array.from(unique)];
  }, []);

  // Filtering
const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  let list = INGREDIENTS.filter((i) => {
    const name = formatKey(i.nameKey).toLowerCase();
    const desc = formatKey(i.descKey).toLowerCase();
    const slug = (i.slug || "").toLowerCase();
    const id = (i.id || "").toLowerCase();

    const matchQuery =
      !q ||
      name.includes(q) ||
      desc.includes(q) ||
      slug.includes(q) ||
      id.includes(q) ||
      (i.cas && i.cas.toLowerCase().includes(q));

    const catValue = i.categoryKey || i.category || "Uncategorized";
    const dosageList = i.dosageKeys || i.dosage || [];

    const matchCategory =
      category === "All" || catValue === category;

    const matchDosage =
      dosage === "All" ||
      (Array.isArray(dosageList)
        ? dosageList.includes(dosage)
        : String(dosageList) === dosage);

    return matchQuery && matchCategory && matchDosage;
  });

  // 🔥 FIXED SORTING
  switch (sortBy) {
    case "name-asc":
      list.sort((a, b) =>
        formatKey(a.nameKey).localeCompare(
          formatKey(b.nameKey)
        )
      );
      break;

    case "name-desc":
      list.sort((a, b) =>
        formatKey(b.nameKey).localeCompare(
          formatKey(a.nameKey)
        )
      );
      break;

    case "category":
      list.sort((a, b) =>
        (a.categoryKey || "").localeCompare(b.categoryKey || "")
      );
      break;
  }

  return list;
}, [query, category, dosage, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <IngredientHero />
      <IngredientStats />
      <IngredientQualityStrip />

      {/* Filters */}
      <section className="bg-[#FFF8F5] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0d2d47] mb-6">
            Active Pharmaceutical Ingredients (API)
          </h2>

          <IngredientFilters
            query={query}
            setQuery={(v) => {
              setQuery(v);
              setPage(1);
            }}
            categories={categories}
            category={category}
            setCategory={(v) => {
              setCategory(v);
              setPage(1);
            }}
            dosages={dosages}
            dosage={dosage}
            setDosage={(v) => {
              setDosage(v);
              setPage(1);
            }}
            sortBy={sortBy}
            setSortBy={(v) => {
              setSortBy(v);
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

      {/* Grid */}
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
