//ivexia\components\ProductsPageClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function ProductsPageClient({
  initialProducts = [],
  initialTestKits = [],
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [testKits, setTestKits] = useState(initialTestKits);
  const [loading, setLoading] = useState(
    initialProducts.length === 0 && initialTestKits.length === 0
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [form, setForm] = useState("");
  const [dosage, setDosage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const hasInitialData =
        initialProducts.length > 0 || initialTestKits.length > 0;

      if (hasInitialData) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [productsResult, testKitsResult] = await Promise.allSettled([
        fetch("/api/products").then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.error || "Failed to load products");
          }

          return Array.isArray(data) ? data : [];
        }),
        fetch("/api/testkits").then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.error || "Failed to load test kits");
          }

          return Array.isArray(data) ? data : [];
        }),
      ]);

      if (cancelled) {
        return;
      }

      if (productsResult.status === "fulfilled") {
        setProducts(productsResult.value);
      } else {
        console.error(productsResult.reason);
        setError("Products are temporarily unavailable. Please try again shortly.");
      }

      if (testKitsResult.status === "fulfilled") {
        setTestKits(testKitsResult.value);
      } else {
        console.error(testKitsResult.reason);
      }

      setLoading(false);
      setIsRefreshing(false);
    }

    loadData().catch((err) => {
      if (cancelled) {
        return;
      }

      console.error(err);
      setError("Products are temporarily unavailable. Please try again shortly.");
      setLoading(false);
      setIsRefreshing(false);
    });

    return () => {
      cancelled = true;
    };
  }, [initialProducts, initialTestKits]);

  const flatTestKits = useMemo(
    () =>
      testKits.filter(
        (item) => item && typeof item === "object" && !Array.isArray(item)
      ),
    [testKits]
  );

  const categoryOptions = useMemo(
    () => [...new Set([...products.map((p) => p.category), "TEST KITS"])],
    [products]
  );

  const formOptions = useMemo(
    () => ["", ...new Set(products.map((p) => p.form))].filter(Boolean),
    [products]
  );

  const dosageOptions = useMemo(
    () => ["", ...new Set(products.map((p) => p.dosage))].filter(Boolean),
    [products]
  );

  function getDosageOptionLabel(value) {
    if (!value) {
      return "Dosage";
    }

    const normalized = String(value).replace(/\s+/g, " ").trim();

    if (normalized.length <= 26) {
      return normalized;
    }

    const firstPart = normalized.split(",")[0]?.trim();

    if (firstPart && firstPart.length <= 22) {
      return `${firstPart}...`;
    }

    return `${normalized.slice(0, 23)}...`;
  }

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (category === "TEST KITS") {
      return flatTestKits.filter((item) => {
        return (
          !q ||
          item.product?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.specimen?.toLowerCase().includes(q)
        );
      });
    }

    return products.filter((p) => {
      const matchCategory = !category || p.category === category;
      const matchForm = !form || p.form === form;
      const matchDosage = !dosage || p.dosage === dosage;

      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.form?.toLowerCase().includes(q) ||
        p.dosage?.toLowerCase().includes(q) ||
        String(p.casId || "").toLowerCase().includes(q);

      return matchCategory && matchForm && matchDosage && matchSearch;
    });
  }, [category, form, dosage, searchTerm, flatTestKits, products]);

  const tableClasses =
    category === "TEST KITS"
      ? "min-w-[980px] w-full text-sm"
      : "w-full min-w-[720px] md:min-w-0 md:table-fixed text-sm";
  const filterSelectClass =
    "w-full sm:w-56 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#19a6b5]";

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#FFF8F5] pt-24">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 h-10 w-72 rounded bg-[#0d2d47]/10" />
            <div className="mx-auto mb-8 h-5 w-96 max-w-full rounded bg-gray-200" />
            <div className="mx-auto mb-6 h-12 max-w-4xl rounded-full bg-white" />
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <div className="h-10 w-32 rounded-full bg-white" />
              <div className="h-10 w-32 rounded-full bg-white" />
              <div className="h-10 w-32 rounded-full bg-white" />
            </div>
            <div className="overflow-hidden rounded bg-white shadow-sm">
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
            Finished Products
          </h1>
          <p className="text-gray-700 mt-2">
            Explore our pharmaceutical product range.
          </p>
          {isRefreshing && (
            <p className="mt-3 text-sm font-medium text-[#19a6b5]">
              Updating catalog...
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
            placeholder="Search product..."
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
            className={filterSelectClass}
          >
            <option value="">Category</option>
            {categoryOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className={filterSelectClass}
          >
            <option value="">Form</option>
            {formOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>

          <select
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className={filterSelectClass}
            title={dosage || "Dosage"}
          >
            <option value="">Dosage</option>
            {dosageOptions.map((d) => (
              <option key={d} value={d}>
                {getDosageOptionLabel(d)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full max-w-full overflow-x-auto bg-white shadow-sm">
          <table className={tableClasses}>
            {category !== "TEST KITS" && (
              <colgroup>
                <col className="w-[32%]" />
                <col className="w-[13%]" />
                <col className="w-[18%]" />
                <col className="w-[18%]" />
                <col className="w-[19%]" />
              </colgroup>
            )}
            <thead>
              <tr className="bg-[#0d2d47] text-white">
                {category === "TEST KITS" ? (
                  <>
                    <th className="px-4 py-3 min-w-[140px]">Product</th>
                    <th className="px-4 py-3 min-w-[260px]">Description</th>
                    <th className="px-4 py-3 min-w-[140px]">Category</th>
                    <th className="px-4 py-3 min-w-[120px]">Method</th>
                    <th className="px-4 py-3 min-w-[140px]">Specimen</th>
                    <th className="px-4 py-3 min-w-[110px]">Cut-Off</th>
                    <th className="px-4 py-3 min-w-[120px]">Certificate</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Form</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Dosage</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">CAS-ID</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {category === "TEST KITS"
                ? filtered.map((item, index) => (
                    <tr
                      key={`${item._id}-${index}`}
                      onClick={() => router.push(`/test-kits/${item.slug}`)}
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold">{item.product}</td>
                      <td className="px-4 py-3">{item.description || "-"}</td>
                      <td className="px-4 py-3">{item.category || "-"}</td>
                      <td className="px-4 py-3">{item.method || "-"}</td>
                      <td className="px-4 py-3">{item.specimen || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.cut_off || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.certificate || "-"}</td>
                    </tr>
                  ))
                : filtered.map((p, i) => (
                    <tr
                      key={p._id}
                      onClick={() => router.push(`/products/${p.slug}`)}
                      className={`cursor-pointer ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 align-top break-words">{p.name}</td>
                      <td className="px-4 py-3 align-top whitespace-nowrap">{p.form}</td>
                      <td className="px-4 py-3 align-top whitespace-nowrap">{p.category}</td>
                      <td
                        className="px-4 py-3 align-top overflow-hidden text-ellipsis whitespace-nowrap"
                        title={p.dosage || "-"}
                      >
                        {p.dosage || "-"}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap">{p.casId || "-"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
