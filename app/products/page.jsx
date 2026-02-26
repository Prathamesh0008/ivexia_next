"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import PRODUCTS from "@/data/finishedProducts"; // use default English for now

export default function Products() {
  const router = useRouter();

  const categoryOptions = useMemo(
    () => ["", ...new Set(PRODUCTS.map((p) => p.category))].filter(Boolean),
    []
  );

  const formOptions = useMemo(
    () => ["", ...new Set(PRODUCTS.map((p) => p.form))].filter(Boolean),
    []
  );

  const dosageOptions = useMemo(
    () => ["", ...new Set(PRODUCTS.map((p) => p.dosage))].filter(Boolean),
    []
  );

  const [category, setCategory] = useState("");
  const [form, setForm] = useState("");
  const [dosage, setDosage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const matchCategory = !category || p.category === category;
      const matchForm = !form || p.form === form;
      const matchDosage = !dosage || p.dosage === dosage;

      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.form?.toLowerCase().includes(q) ||
        p.dosage?.toLowerCase().includes(q) ||
        String(p["CAS-ID"] || "").toLowerCase().includes(q);

      return matchCategory && matchForm && matchDosage && matchSearch;
    });
  }, [category, form, dosage, searchTerm]);

  return (
    <div className="pt-16 bg-[#FFF8F5] min-h-screen">
     <section className="max-w-7xl mx-auto px-6 md:px-16 pb-40">

        <header className="text-center mt-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d2d47]">
            Finished Products
          </h1>
          <p className="text-gray-700 mt-2">
            Explore our pharmaceutical product range.
          </p>
        </header>

        {/* SEARCH */}
        <div className="relative max-w-4xl mx-auto mb-6">
          
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product..."
            className="w-full rounded-full border px-6 py-3 pr-16 text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <FaSearch />
          </div>
        </div>

        {/* FILTERS */}
    <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-30">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Category</option>
            {categoryOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select value={form} onChange={(e) => setForm(e.target.value)}>
            <option value="">Form</option>
            {formOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>

          <select value={dosage} onChange={(e) => setDosage(e.target.value)}>
            <option value="">Dosage</option>
            {dosageOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
<div className="flex justify-end mb-4">
 <a
  href="/LarksoisPharmaproduct.json"
  download="Ivexia_Product_List.json"
  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white text-sm font-semibold hover:opacity-90 transition"
>
  Download Product List
</a>
</div>
        {/* TABLE */}
        <div className="overflow-x-auto bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#0d2d47] text-white">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Form</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Dosage</th>
                <th className="px-4 py-3">CAS-ID</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  onClick={() => router.push(`/products/${p.slug}`)}
                  className={`cursor-pointer ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.form}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.dosage}</td>
                  <td className="px-4 py-3">{p["CAS-ID"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}