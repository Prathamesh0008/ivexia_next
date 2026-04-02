//ivexia\app\products\ingredient\page.jsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";

import IngredientHero from "@/components/IngredientHero";
import IngredientStats from "@/components/IngredientStats";
import IngredientFilters from "@/components/IngredientFilters";
import IngredientGrid from "@/components/IngredientGrid";
import IngredientAccord from "@/components/IngredientAccord";
import IngredientQualityStrip from "@/components/IngredientQualityStrip";



export default function IngredientPage() {
  const [ingredients, setIngredients] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
 fetch("/api/ingredients")
  .then(async (res) => {
    if (!res.ok) throw new Error("API failed");
    return res.json();
  })
  .then((data) => {
    setIngredients(data);
    setLoading(false);
  })
  .catch((err) => {
    console.error(err);
    setLoading(false);
  });
}, []);
  const [query, setQuery] = useState("");

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

  ingredients.forEach((i) => {
    if (i.category) unique.add(i.category);
  });

  return ["All", ...Array.from(unique)];
}, [ingredients]); 

  // Dosage forms (raw keys)
 const dosages = ["All"];

  // Filtering
const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  let list = ingredients.filter((i) => {
    const name = (i.name || "").toLowerCase();
    const slug = (i.slug || "").toLowerCase();
    const id = (i.id || "").toLowerCase();

    const matchQuery =
      !q ||
      name.includes(q) ||
      slug.includes(q) ||
      id.includes(q) ||
      (i.cas && i.cas.toLowerCase().includes(q));

    const matchCategory =
  category === "All" || i.category === category;

const matchDosage =
  dosage === "All" || i.dosage === dosage;

return matchQuery && matchCategory && matchDosage;
  });

  // SORTING
  switch (sortBy) {
    case "name-asc":
      list.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
      break;

    case "name-desc":
      list.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
      break;

    case "category":
      list.sort((a, b) =>
        (a.category || "").localeCompare(b.category || "")
      );
      break;
  }

  return list;
}, [ingredients, query, category,dosage, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
if (loading) {
  return <div className="p-10 text-center">Loading...</div>;
}
  return (
    <div>
      <IngredientHero />
      <IngredientStats />
      <IngredientQualityStrip />

      {/* Filters */}
      <section className="bg-[#FFF8F5] py-10">
       <div ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-16">
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
