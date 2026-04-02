//ivexia\app\products\page.jsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Products() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [testKits, setTestKits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [form, setForm] = useState("");
  const [dosage, setDosage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ FETCH DATA FROM API
  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((res) => res.json()),
      fetch("/api/testkits").then((res) => res.json()),
    ]).then(([p, t]) => {
      setProducts(p);
      setTestKits(t);
      setLoading(false);
    });
  }, []);

  // ✅ SAME LOGIC (just changed source)
  const flatTestKits = useMemo(
    () =>
      testKits.filter(
        (item) => item && typeof item === "object" && !Array.isArray(item)
      ),
    [testKits]
  );

  const categoryOptions = useMemo(
    () => [
      ...new Set([...products.map((p) => p.category), "TEST KITS"]),
    ],
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

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    // 👉 TEST KITS
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

    // 👉 PRODUCTS
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

  // ✅ LOADING
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
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
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
            <option value="">Category</option>
            {categoryOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#19a6b5]"
          >
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

        {/* TABLE */}
        <div className="overflow-x-auto bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#0d2d47] text-white">
                {category === "TEST KITS" ? (
                  <>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Specimen</th>
                    <th className="px-4 py-3">Cut-Off</th>
                    <th className="px-4 py-3">Certificate</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Form</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Dosage</th>
                    <th className="px-4 py-3">CAS-ID</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {category === "TEST KITS"
                ? filtered.map((item, index) => (
                    <tr
                      key={`${item._id}-${index}`}
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
                  ))
                : filtered.map((p, i) => (
                    <tr
                      key={p._id}
                      onClick={() => router.push(`/products/${p.slug}`)}
                      className={`cursor-pointer ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3">{p.name}</td>
                      <td className="px-4 py-3">{p.form}</td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">{p.dosage}</td>
                      <td className="px-4 py-3">{p.casId}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}




