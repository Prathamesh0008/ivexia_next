//ivexia\components\ProductsPageClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

function normalizeProductValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeProductValue).join("|");
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${normalizeProductValue(key)}:${normalizeProductValue(val)}`)
      .join("|");
  }

  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeStrengthValue(value) {
  return normalizeProductValue(value)
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s*\+\s*/g, "+")
    .replace(/\s+(mg|gm|g|ml)\b/g, "$1")
    .replace(/\b(\d+(?:\.\d+)?)(mg|gm|g|ml)\b/g, "$1$2");
}

function getCategoryFilterKey(value) {
  return normalizeProductValue(value);
}

function shouldPreferCategoryLabel(currentLabel, nextLabel) {
  return (
    currentLabel === currentLabel.toUpperCase() &&
    nextLabel !== nextLabel.toUpperCase()
  );
}

function getProductForm(product) {
  return product.form || product.Column5 || product.PACK_SIZE || "";
}

function getProductCas(product) {
  return (
    product.casId ||
    product["CAS-ID"] ||
    product.CAS_ID ||
    product["API-CAS"] ||
    ""
  );
}

function getProductDuplicateKey(product) {
  return [
    product.name,
    product.category,
    getProductForm(product),
    normalizeStrengthValue(product.dosage),
    getProductCas(product),
  ]
    .map((value) =>
      typeof value === "string" ? normalizeProductValue(value) : value
    )
    .map(normalizeProductValue)
    .join("||");
}

function removeDuplicateProducts(products) {
  const seen = new Set();

  return products.filter((product) => {
    const key = getProductDuplicateKey(product);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export default function ProductsPageClient({
  initialProducts = [],
  initialTestKits = [],
  initialProductMetaMap = {},
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [testKits, setTestKits] = useState(initialTestKits);
  const [loading, setLoading] = useState(
    initialProducts.length === 0 && initialTestKits.length === 0
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [productMetaMap, setProductMetaMap] = useState(initialProductMetaMap);
const { translations, language } = useLanguage();
const t = translations?.productsPage;
const testKitsLabel = t?.testKitsLabel || "TEST KITS";
  const [category, setCategory] = useState("");
  const [form, setForm] = useState("");
  const [dosage, setDosage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function openProductPath(event, path) {
    if (event.ctrlKey || event.metaKey) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(path);
  }

  useEffect(() => {
    let cancelled = false;
    const selectedLanguage = language || "en";

    async function loadProductMetadata() {
      try {
        const res = await fetch(
          `/api/products/content?language=${selectedLanguage}`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) {
          setProductMetaMap(data);
        }
      } catch (error) {
        console.error("Product metadata load failed", error);
      }
    }

    loadProductMetadata();

    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    setProductMetaMap(initialProductMetaMap);
  }, [initialProductMetaMap]);

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
     setError(
  t?.error || "Products are temporarily unavailable. Please try again shortly."
);
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
     setError(
  t?.error || "Products are temporarily unavailable. Please try again shortly."
);
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

  const uniqueProducts = useMemo(
    () => removeDuplicateProducts(products),
    [products]
  );

  const localizedProducts = useMemo(
    () =>
      uniqueProducts.map((product) => {
        const meta = productMetaMap?.[product.slug?.toLowerCase()] || {};

        return {
          ...product,
          displayName: meta.productName || product.name,
          displayForm: meta.form || product.form,
          displayCategory: meta.category || product.category,
          displayDosage: meta.strength || product.dosage,
          displayCasId: meta.cas || product.casId,
        };
      }),
    [uniqueProducts, productMetaMap]
  );

const categoryOptions = useMemo(() => {
  const categoriesByKey = new Map();

  localizedProducts
    .map((p) => p.displayCategory)
    .filter(Boolean)
    .forEach((categoryLabel) => {
      const key = getCategoryFilterKey(categoryLabel);
      const currentLabel = categoriesByKey.get(key);

      if (!currentLabel || shouldPreferCategoryLabel(currentLabel, categoryLabel)) {
        categoriesByKey.set(key, categoryLabel);
      }
    });

  return [...categoriesByKey.values(), testKitsLabel].sort((a, b) =>
    a.localeCompare(b)
  );
}, [localizedProducts, testKitsLabel]);

// const formOptions = useMemo(
//   () =>
//     [...new Set(localizedProducts.map((p) => p.displayForm).filter(Boolean))]
//       .sort((a, b) => a.localeCompare(b)),
//   [localizedProducts]
// );

const dosageOptions = useMemo(
  () =>
    [...new Set(localizedProducts.map((p) => p.displayDosage).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b)),
  [localizedProducts]
);

  const formOptions = useMemo(
    () => ["", ...new Set(localizedProducts.map((p) => p.displayForm))].filter(Boolean),
    [localizedProducts]
  );

  // const dosageOptions = useMemo(
  //   () => ["", ...new Set(localizedProducts.map((p) => p.displayDosage))].filter(Boolean),
  //   [localizedProducts]
  // );

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
  const sortAlphabetically = (items, key) => {
  return [...items].sort((a, b) =>
    String(a?.[key] || "")
      .toLowerCase()
      .localeCompare(String(b?.[key] || "").toLowerCase())
  );
};

const filtered = useMemo(() => {
  const q = searchTerm.trim().toLowerCase();

  if (category === testKitsLabel) {
    const result = flatTestKits.filter((item) => {
      return (
        !q ||
        item.product?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.specimen?.toLowerCase().includes(q)
      );
    });

    return sortAlphabetically(result, "product");
  }

  const result = localizedProducts.filter((p) => {
    const matchCategory =
      !category ||
      getCategoryFilterKey(p.displayCategory) === getCategoryFilterKey(category);
    const matchForm = !form || p.displayForm === form;
    const matchDosage = !dosage || p.displayDosage === dosage;

    const matchSearch =
      !q ||
      p.displayName?.toLowerCase().includes(q) ||
      p.displayCategory?.toLowerCase().includes(q) ||
      p.displayForm?.toLowerCase().includes(q) ||
      p.displayDosage?.toLowerCase().includes(q) ||
      String(p.displayCasId || "").toLowerCase().includes(q) ||
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.form?.toLowerCase().includes(q) ||
      p.dosage?.toLowerCase().includes(q) ||
      String(p.casId || "").toLowerCase().includes(q);

    return matchCategory && matchForm && matchDosage && matchSearch;
  });

  return sortAlphabetically(result, "displayName");
}, [
  category,
  form,
  dosage,
  searchTerm,
  flatTestKits,
  localizedProducts,
  testKitsLabel,
]);

  const isTestKitsCategory = category === testKitsLabel;
  const tableClasses =
    isTestKitsCategory
      ? "min-w-[980px] w-full text-sm"
      : "w-full min-w-[720px] md:min-w-0 md:table-fixed text-sm";
  const tableHeaderClass = "px-4 py-3 text-left align-top";
  const wrappingCellClass =
    "px-4 py-3 align-top whitespace-normal break-words [overflow-wrap:anywhere]";
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
  {t?.heading || "Our Products"}
</h1>

<p className="text-gray-700 mt-2">
  {t?.subheading || "Explore our pharmaceutical product range."}
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
           placeholder={t?.search || "Search product..."}
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
            <option value=""> {t?.category || "Category"}</option>
            {categoryOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className={filterSelectClass}
          >
            <option value="">{t?.form || "Form"}</option>
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
            <option value="">{t?.dosage || "Dosage"}</option>
            {dosageOptions.map((d) => (
              <option key={d} value={d}>
                {getDosageOptionLabel(d)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full max-w-full overflow-x-auto bg-white shadow-sm">
          <table className={tableClasses}>
            {!isTestKitsCategory && (
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
                {isTestKitsCategory ? (
                  <>
                    <th className={tableHeaderClass}>{t?.testKits?.product || "Product"}</th>
<th className={tableHeaderClass}>{t?.testKits?.description || "Description"}</th>
<th className={tableHeaderClass}>{t?.testKits?.category || "Category"}</th>
<th className={tableHeaderClass}>{t?.testKits?.method || "Method"}</th>
<th className={tableHeaderClass}>{t?.testKits?.specimen || "Specimen"}</th>
<th className={tableHeaderClass}>{t?.testKits?.cutoff || "Cut-Off"}</th>
<th className={tableHeaderClass}>{t?.testKits?.certificate || "Certificate"}</th>
                  </>
                ) : (
                  <>
                    <th className={tableHeaderClass}>{t?.table?.name || "Name"}</th>
<th className={tableHeaderClass}>{t?.table?.form || "Form"}</th>
<th className={tableHeaderClass}>{t?.table?.category || "Category"}</th>
<th className={tableHeaderClass}>{t?.table?.dosage || "Dosage"}</th>
<th className={tableHeaderClass}>{t?.table?.cas || "CAS-ID"}</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {isTestKitsCategory
                ? filtered.map((item, index) => (
                    <tr
                      key={`${item._id}-${index}`}
                      onClick={(event) =>
                        openProductPath(event, `/test-kits/${item.slug}`)
                      }
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className={`${wrappingCellClass} font-semibold`}>{item.product}</td>
                      <td className={wrappingCellClass}>{item.description || "-"}</td>
                      <td className={wrappingCellClass}>{item.category || "-"}</td>
                      <td className={wrappingCellClass}>{item.method || "-"}</td>
                      <td className={wrappingCellClass}>{item.specimen || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.cut_off || "-"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.certificate || "-"}</td>
                    </tr>
                  ))
                : filtered.map((p, i) => (
                    <tr
                      key={p._id}
                      onClick={(event) =>
                        openProductPath(event, `/products/${p.slug}`)
                      }
                      className={`cursor-pointer ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className={wrappingCellClass}>{p.displayName}</td>
                      <td className={wrappingCellClass}>{p.displayForm}</td>
                      <td className={wrappingCellClass}>{p.displayCategory}</td>
                      <td
                        className={wrappingCellClass}
                        title={p.displayDosage || "-"}
                      >
                        {p.displayDosage || "-"}
                      </td>
                 <td className={wrappingCellClass}>
  {p.displayCasId && typeof p.displayCasId === "object"
    ? Object.entries(p.displayCasId)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ")
    : p.displayCasId || "-"}
</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
