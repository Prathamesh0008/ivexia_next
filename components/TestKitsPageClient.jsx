//ivexia\components\TestKitsPageClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
export default function TestKitsPageClient({ initialTestKits = [] }) {
  const router = useRouter();
  const [testKits, setTestKits] = useState(initialTestKits);
  const [loading, setLoading] = useState(initialTestKits.length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
const { translations } = useLanguage();
const t = translations?.testKitsPage;
  const [category, setCategory] = useState(initialTestKits[0]?.category || "");
  const [method, setMethod] = useState("");
  const [specimen, setSpecimen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function openTestKitPath(event, path) {
    if (event.ctrlKey || event.metaKey) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(path);
  }

  function getTestKitPath(item) {
    return `/test-kits/${item.slug?.trim() || ""}`;
  }

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (initialTestKits.length > 0) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const res = await fetch("/api/testkits");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load test kits");
        }

        const cleanData = Array.isArray(data)
          ? data.filter(
              (item) =>
                item && typeof item === "object" && !Array.isArray(item)
            )
          : [];

        if (cancelled) {
          return;
        }

        setTestKits(cleanData);

        setCategory((currentCategory) => currentCategory || cleanData[0]?.category || "");
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(err);
      setError(t?.error || "Test kits are temporarily unavailable...");
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [initialTestKits]);

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

        return matchCategory && matchMethod && matchSpecimen && matchSearch;
      })
      .filter((item) => item.product)
      .sort((a, b) => a.product.localeCompare(b.product));
  }, [category, method, specimen, searchTerm, testKits]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#FFF8F5] pt-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 h-10 w-56 rounded bg-[#0d2d47]/10" />
            <div className="mx-auto mb-8 h-5 w-96 max-w-full rounded bg-gray-200" />
            <div className="mx-auto mb-6 h-12 max-w-4xl rounded-full bg-white" />
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <div className="h-10 w-32 rounded-full bg-white" />
              <div className="h-10 w-32 rounded-full bg-white" />
              <div className="h-10 w-32 rounded-full bg-white" />
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="h-12 bg-[#0d2d47]" />
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 border-b border-gray-100 bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-[#FFF8F5] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-40">
        <header className="text-center mt-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d2d47]">
            {t?.heading || "Test Kits"}
          </h1>
          <p className="text-gray-700 mt-2">
           {t?.subheading || "Explore our diagnostic rapid test kits portfolio."}
          </p>
        {isRefreshing && (
  <p className="mt-3 text-sm font-medium text-[#19a6b5]">
    {t?.updating || "Updating catalog..."}
  </p>
)}
          {error && (
            <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
          )}
        </header>

        <div className="relative max-w-4xl mx-auto mb-6">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           placeholder={t?.search || "Search test kits..."}
            className="w-full rounded-full border px-6 py-3 pr-16 text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <FaSearch />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full cursor-pointer border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
            <option value=""> {t?.category || "Category"}</option>
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
            <option value="">{t?.method || "Method"}</option>
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
            <option value="">{t?.specimen || "Specimen"}</option>
            {specimenOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#0d2d47] text-white">
             <th>{t?.table?.product || "Product"}</th>
               <th>{t?.table?.description || "Description"}</th>
                <th>{t?.table?.category || "Category"}</th>
                <th>{t?.table?.method || "Method"}</th>
               <th>{t?.table?.specimen || "Specimen"}</th>
           <th>{t?.table?.cutoff || "Cut-Off"}</th>
                <th>{t?.table?.certificate || "Certificate"}</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={`${item._id}-${index}`}
                  onClick={(event) =>
                    openTestKitPath(event, getTestKitPath(item))
                  }
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
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
