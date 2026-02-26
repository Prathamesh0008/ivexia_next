"use client";

import { useMemo, useState, useEffect } from "react";

import IngredientHero from "@/components/IngredientHero";
import IngredientStats from "@/components/IngredientStats";
import IngredientFilters from "@/components/IngredientFilters";
import IngredientGrid from "@/components/IngredientGrid";
import IngredientAccord from "@/components/IngredientAccord";
import IngredientQualityStrip from "@/components/IngredientQualityStrip";
import CustomerStrip from "@/components/CustomerStrip";
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

  // Responsive sizing
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    function updatePageSize() {
      const w = window.innerWidth;
      if (w < 640) setPageSize(4);
      else if (w < 1024) setPageSize(8);
      else setPageSize(12);
    }

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => setPage(1), [pageSize]);

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
      // prefer plain text fields if exist, otherwise fallback
     const formatKey = (key) => {
  if (!key) return "";
  const parts = key.split(".");
  const last = parts[parts.length - 2] || parts[parts.length - 1];
  return last.replace(/-/g, " ");
};

const name = formatKey(i.nameKey).toLowerCase();
const desc = formatKey(i.descKey).toLowerCase();

      const matchQuery =
        !q ||
        name.includes(q) ||
        desc.includes(q) ||
        (i.cas && i.cas.toLowerCase().includes(q));

      const catValue = i.categoryKey || i.category || "Uncategorized";
      const dosageList = i.dosageKeys || i.dosage || [];

      const matchCategory = category === "All" || catValue === category;

      const matchDosage =
        dosage === "All" ||
        (Array.isArray(dosageList)
          ? dosageList.includes(dosage)
          : String(dosageList) === dosage);

      return matchQuery && matchCategory && matchDosage;
    });

    // Sorting
    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) =>
         formatKey(a.nameKey).localeCompare(
            b.name || b.title || b.nameKey || ""
          )
        );
        break;

      case "name-desc":
        list.sort((a, b) =>
          (b.name || b.title || b.nameKey || "").localeCompare(
            a.name || a.title || a.nameKey || ""
          )
        );
        break;

      case "category":
        list.sort((a, b) => {
          const ca = a.categoryKey || a.category || "";
          const cb = b.categoryKey || b.category || "";
          return (
            ca.localeCompare(cb) ||
            (a.name || a.title || a.nameKey || "").localeCompare(
              b.name || b.title || b.nameKey || ""
            )
          );
        });
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
      <CustomerStrip />
    </div>
  );
}