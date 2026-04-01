//ivexia\app\test-kits\page.jsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { TEST_KITS } from "@/data/testKits";

export default function TestKits() {
  const router = useRouter();

  /* ================= FILTER OPTIONS ================= */
  const categoryOptions = useMemo(
    () => ["", ...new Set(TEST_KITS.map((p) => p.category))].filter(Boolean),
    []
  );

  const methodOptions = useMemo(
    () => ["", ...new Set(TEST_KITS.map((p) => p.method))].filter(Boolean),
    []
  );

  const specimenOptions = useMemo(
    () => ["", ...new Set(TEST_KITS.map((p) => p.specimen))].filter(Boolean),
    []
  );

  /* ================= STATES ================= */
const [category, setCategory] = useState(categoryOptions[0] || "");
  const [method, setMethod] = useState("");
  const [specimen, setSpecimen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FILTER LOGIC ================= */
 const filtered = useMemo(() => {
  const q = searchTerm.trim().toLowerCase();;

   return TEST_KITS
    .filter((p) => {
      const matchCategory = p.category === category;
      const matchMethod = !method || p.method === method;
      const matchSpecimen = !specimen || p.specimen === specimen;

      const matchSearch =
        !q ||
        p.product?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.specimen?.toLowerCase().includes(q);

      return matchCategory && matchMethod && matchSpecimen && matchSearch;
    })
    .sort((a, b) => a.product.localeCompare(b.product)); // ✅ THIS LINE
}, [category, method, specimen, searchTerm]);

  return (
    <div className="pt-16 bg-[#FFF8F5] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-40">

        {/* HEADER */}
        <header className="text-center mt-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d2d47]">
            Test Kits
          </h1>
          <p className="text-gray-700 mt-2">
            Explore our diagnostic rapid test kits portfolio.
          </p>
        </header>

        {/* SEARCH */}
        <div className="relative max-w-4xl mx-auto mb-6">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search test kits..."
            className="w-full rounded-full border px-6 py-3 pr-16 text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <FaSearch />
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">

  {/* CATEGORY */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
  >
    {categoryOptions.map((c) => (
      <option key={c}>{c}</option>
    ))}
  </select>

  {/* METHOD */}
  <select
    value={method}
    onChange={(e) => setMethod(e.target.value)}
    className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
  >
    <option value="">Method</option>
    {methodOptions.map((m) => (
      <option key={m}>{m}</option>
    ))}
  </select>

  {/* SPECIMEN */}
  <select
    value={specimen}
    onChange={(e) => setSpecimen(e.target.value)}
    className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
  >
    <option value="">Specimen</option>
    {specimenOptions.map((s) => (
      <option key={s}>{s}</option>
    ))}
  </select>

</div>

        {/* DOWNLOAD */}
        <div className="flex justify-end mb-4">
          <a
            href="/testkits.json"
            download="Ivexia_Test_Kits.json"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Download Test Kit List
          </a>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#0d2d47] text-white">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Specimen</th>
                <th className="px-4 py-3">Cut-Off</th>
                <th className="px-4 py-3">Certificate</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  onClick={() => router.push(`/test-kits/${p.slug}`)}
                  className={`cursor-pointer ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-[#f1f5f9] transition`}
                >
                  <td className="px-4 py-3 font-semibold">{p.product}</td>
                  <td className="px-4 py-3">{p.description || "-"}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.method}</td>
                  <td className="px-4 py-3">{p.specimen}</td>
                  <td className="px-4 py-3">{p.cut_off || "-"}</td>
                  <td className="px-4 py-3">{p.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}