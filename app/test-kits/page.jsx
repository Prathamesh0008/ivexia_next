//ivexia\app\test-kits\page.jsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import { TEST_KITS } from "@/data/testKits";

export default function TestKitsPage() {
  const testKits = useMemo(
    () =>
      TEST_KITS.flat(Infinity).filter(
        (item) => item && typeof item === "object" && !Array.isArray(item)
      ),
    []
  );

  const categoryOptions = useMemo(
    () => [...new Set(testKits.map((item) => item.category).filter(Boolean))],
    [testKits]
  );

  const methodOptions = useMemo(
    () => [...new Set(testKits.map((item) => item.method).filter(Boolean))],
    [testKits]
  );

  const specimenOptions = useMemo(
    () => [...new Set(testKits.map((item) => item.specimen).filter(Boolean))],
    [testKits]
  );

  const [category, setCategory] = useState(categoryOptions[0] || "");
  const [method, setMethod] = useState("");
  const [specimen, setSpecimen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return testKits
      .filter((item) => {
        const matchCategory = !category || item.category === category;
        const matchMethod = !method || item.method === method;
        const matchSpecimen = !specimen || item.specimen === specimen;
        const matchSearch =
          !query ||
          item.product?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          item.specimen?.toLowerCase().includes(query);

        return (
          matchCategory && matchMethod && matchSpecimen && matchSearch
        );
      })
      .sort((a, b) => a.product.localeCompare(b.product));
  }, [category, method, specimen, searchTerm, testKits]);

  return (
    <div className="pt-16 bg-[#FFF8F5] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-40">
        <header className="text-center mt-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d2d47]">
            Test Kits
          </h1>
          <p className="text-gray-700 mt-2">
            Explore our diagnostic rapid test kits portfolio.
          </p>
        </header>

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

        <div className="flex flex-wrap justify-center gap-3 mb-6 ">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full cursor-pointer border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
            <option value="">Category</option>
            {categoryOptions.map((item) => (
              <option className="cursor-pointer" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-full cursor-pointer border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
            <option value="">Method</option>
            {methodOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={specimen}
            onChange={(e) => setSpecimen(e.target.value)}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
            <option value="">Specimen</option>
            {specimenOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="flex justify-end mb-4">
          <a
            href="/testkits.json"
            download="Ivexia_Test_Kits.json"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Download Test Kit List
          </a>
        </div> */}

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
              {filtered.map((item, index) => (
                <tr
                  key={`${item.id}-${index}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-semibold">{item.product}</td>
                  <td className="px-4 py-3">{item.description || "-"}</td>
                  <td className="px-4 py-3">{item.category || "-"}</td>
                  <td className="px-4 py-3">{item.method || "-"}</td>
                  <td className="px-4 py-3">{item.specimen || "-"}</td>
                  <td className="px-4 py-3">{item.cut_off || "-"}</td>
                  <td className="px-4 py-3">{item.certificate || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
