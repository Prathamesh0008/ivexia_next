// ivexia/components/ProductDetailClient.jsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackImage = "/images/medicineproduct.jpg";

function formatLabel(key = "") {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function safeId(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function RenderPlain({ value }) {
  if (!value) return "-";

  if (Array.isArray(value)) {
    return value.map((item) => RenderPlain({ value: item })).join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, val]) => `${formatLabel(key)}: ${RenderPlain({ value: val })}`)
      .join(", ");
  }

  return String(value);
}

function RenderContent({ value }) {
  if (!value) return <p className="break-words text-sm text-[#475569]">-</p>;

  if (Array.isArray(value)) {
    return (
      <ul className="mt-3 list-disc space-y-1.5 break-words pl-5 text-sm leading-relaxed text-[#475569] marker:text-[#19a6b5]">
        {value.map((item, index) => (
          <li key={index}>
            {typeof item === "object" ? <RenderContent value={item} /> : String(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
        {Object.entries(value).map(([key, val]) => (
          <div
            key={key}
            className="min-w-0 rounded-lg bg-[#FFF8F5] p-3 ring-1 ring-[#f2d8cd]"
          >
            <p className="break-words text-xs font-bold uppercase tracking-wider text-[#0d2d47]">
              {formatLabel(key)}
            </p>
            <div className="mt-1 min-w-0">
              <RenderContent value={val} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="mt-3 break-words text-sm leading-relaxed text-[#475569] sm:text-base">
      {String(value)}
    </p>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg bg-[#FFF8F5] p-3 ring-1 ring-[#f2d8cd]">
      <p className="break-words text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c7390]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-[#0d2d47]">
        <RenderPlain value={value} />
      </p>
    </div>
  );
}

function SectionNav({ sections }) {
  return (
    <nav className="min-w-0 space-y-1">
      {sections.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#FFF8F5] hover:text-[#19a6b5] break-words"
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}

function UnderMaintenancePage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFF8F5] py-16">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <img
          src="/images/undermaintenance7.png"
          alt="Under Maintenance"
          className="mx-auto mb-6 block w-full max-w-[300px] object-contain md:max-w-[380px]"
        />

        <h1 className="mb-3 text-2xl font-bold text-[#0d2d47] md:text-3xl">
          Product Information in Progress
        </h1>

        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
          This product page is being updated with detailed pharmaceutical data.
          Please check back shortly.
        </p>

        <Link
          href="/products"
          className="inline-flex rounded-full bg-[#0d2d47] px-6 py-3 text-sm font-semibold text-white hover:bg-[#19a6b5]"
        >
          Back to Products
        </Link>
      </div>
    </section>
  );
}

export default function ProductDetailClient({
  initialProduct,
  initialProductData,
}) {
  const [product, setProduct] = useState(initialProduct);
  const [productData, setProductData] = useState(initialProductData || {});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const languageContext = useLanguage();
  const { translations } = languageContext;
  const language =
    languageContext.language ||
    languageContext.currentLanguage?.toLowerCase?.() ||
    "en";

  const t = translations?.productDetail;
  const UNDER_MAINTENANCE = false;

  useEffect(() => {
    let cancelled = false;

    async function loadProductContent() {
      if (!initialProduct?.slug) return;

      try {
        const res = await fetch(
          `/api/products/${initialProduct.slug}/content?language=${language}`
        );

        if (!res.ok) {
          if (!cancelled) setProductData({});
          return;
        }

        const data = await res.json();
        if (!cancelled) setProductData(data);
      } catch (error) {}
    }

    loadProductContent();

    return () => {
      cancelled = true;
    };
  }, [initialProduct?.slug, language]);

  useEffect(() => {
    if (!initialProduct?.slug) return;

    let cancelled = false;

    async function refreshProduct() {
      setIsRefreshing(true);

      try {
        const res = await fetch(`/api/products/${initialProduct.slug}`);
        const data = await res.json();

        if (!cancelled && res.ok) setProduct(data);
      } catch (error) {
      } finally {
        if (!cancelled) setIsRefreshing(false);
      }
    }

    refreshProduct();

    return () => {
      cancelled = true;
    };
  }, [initialProduct]);

  useEffect(() => {
    const faqSchema = productData?.faqSchema || product?.faqSchema;

    if (!faqSchema) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [productData, product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialProduct?.slug]);

  useEffect(() => {
    setProductData(initialProductData || {});
  }, [initialProductData]);

  const hero = productData?.hero || product?.hero || {};
  const meta = productData?.meta || product?.meta || {};
  const content = productData?.content || product?.content || {};
  const faqs = Array.isArray(productData?.faqs)
    ? productData.faqs
    : Array.isArray(product?.faqs)
      ? product.faqs
      : [];

  const allBlocks = useMemo(() => {
    const blocks = [];

    Object.entries(content || {}).forEach(([key, value]) => {
      if (!value) return;

      blocks.push({
        id: safeId(key),
        title: value?.title || formatLabel(key),
        value,
      });
    });

    return blocks;
  }, [content]);

  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <div>
          <h1 className="mb-4 text-2xl font-bold text-[#0d2d47]">
            {t?.notFound || "Product Not Found"}
          </h1>

          <Link
            href="/products"
            className="inline-block rounded-md bg-[#0d2d47] px-6 py-3 text-white hover:bg-[#19a6b5]"
          >
            {t?.back || "Back to Products"}
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = !imageError ? product.image || fallbackImage : fallbackImage;
  const productTitle = hero.title || product.name;
  const productDescription =
    hero.description ||
    product.description ||
    content.introduction;

  const topInfo = [
    ["Product Name", productTitle],
    ["Category", meta.category || product.category],
    ["Form", meta.form || product.form],
    ["Strength", meta.strength || product.dosage],
    ["CAS-ID", meta.cas || product.casId],
  ].filter(([, value]) => value);

  const technicalInfo = [
    ...Object.entries(product || {}).map(([key, value]) => [formatLabel(key), value]),
    ...Object.entries(meta || {}).map(([key, value]) => [formatLabel(key), value]),
  ].filter(([label, value]) => {
    if (!value) return false;
    return !["_id", "__v", "Hero", "Meta", "Content", "Faqs", "Faq Schema"].includes(label);
  });

  const navSections = [
    { id: "key-information", title: "Key Information" },
    { id: "technical-information", title: "Technical Information" },
    ...allBlocks.map((block) => ({
      id: block.id,
      title: block.title,
    })),
    ...(faqs.length > 0 ? [{ id: "faq", title: "FAQ" }] : []),
  ];

  return (
    <main id="page-top" className="w-full overflow-x-hidden bg-[#FFF8F5] pb-12 pt-8 text-[#0d2d47]">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#f2d8cd]">
          <div className="border-b border-[#f2d8cd] px-5 py-4 sm:px-8">
            <nav className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-[#6c7b8d]">
              <Link href="/" className="hover:text-[#19a6b5]">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#19a6b5]">
                Products
              </Link>
              <span>/</span>
              <span className="min-w-0 truncate font-semibold text-[#0d2d47]">
                {productTitle}
              </span>
            </nav>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[360px_1fr]">
            <div className="flex min-h-[320px] min-w-0 items-center justify-center rounded-xl bg-[#FFF8F5] p-4 ring-1 ring-[#f2d8cd]">
              <img
                src={imgSrc}
                alt={product.name}
                className="h-auto w-full max-w-[330px] rounded-lg object-contain"
                onError={() => setImageError(true)}
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#19a6b5]">
                Ivexia Product
              </p>

              <h1 className="mt-3 break-words text-3xl font-bold leading-tight text-[#0d2d47] sm:text-4xl">
                {productTitle}
              </h1>

              <RenderContent value={productDescription} />

              {isRefreshing && (
                <p className="mt-3 text-sm font-semibold text-[#19a6b5]">
                  {t?.updating || "Updating product details..."}
                </p>
              )}

              {topInfo.length > 0 && (
                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
                  {topInfo.slice(0, 4).map(([label, value], idx) => (
                    <InfoCard key={`${label}-${idx}`} label={label} value={value} />
                  ))}
                </div>
              )}

              <Link
                href="/contact"
                className="mt-6 inline-flex max-w-full justify-center rounded-full bg-[#0d2d47] px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#19a6b5]"
              >
                {t?.requestQuote || "Request Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="min-w-0 h-fit rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#f2d8cd] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <SectionNav sections={navSections} />
        </aside>

        <div className="min-w-0 rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#f2d8cd] sm:p-6">
          {topInfo.length > 0 && (
            <section id="key-information" className="scroll-mt-24">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-[#0d2d47]">
                Key Information
              </h2>

              <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
                {topInfo.map(([label, value], idx) => (
                  <InfoCard key={`${label}-${idx}`} label={label} value={value} />
                ))}
              </div>
            </section>
          )}

          {technicalInfo.length > 0 && (
            <section
              id="technical-information"
              className="mt-6 scroll-mt-24 border-t border-[#f2d8cd] pt-6"
            >
              <div className="break-words border-b border-[#f2d8cd] bg-[#FFF8F5] px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#0d2d47]">
                Technical Information
              </div>

              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-fixed divide-y divide-[#f2d8cd]">
                  <tbody className="divide-y divide-[#f2d8cd]">
                    {technicalInfo.map(([label, value], idx) => (
                      <tr key={`${label}-${idx}`} className="bg-white odd:bg-[#fffdfc]">
                        <td className="w-28 break-words px-3 py-3 text-sm font-semibold text-[#0d2d47] sm:w-56 sm:px-5">
                          {label}
                        </td>
                        <td className="break-words px-3 py-3 text-sm text-[#334155] sm:px-5">
                          <RenderPlain value={value} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {allBlocks.map((block, index) => (
            <section
              id={block.id}
              key={`${block.id}-${index}`}
              className="mt-6 scroll-mt-24 border-t border-[#f2d8cd] pt-6"
            >
              <h3 className="break-words text-xl font-bold text-[#0d2d47]">
                {block.title}
              </h3>

              <RenderContent value={block.value} />
            </section>
          ))}

          {faqs.length > 0 && (
            <section
              id="faq"
              className="mt-6 scroll-mt-24 border-t border-[#f2d8cd] pt-6"
            >
              <h3 className="break-words text-xl font-bold text-[#0d2d47]">
                Frequently Asked Questions
              </h3>

              <div className="mt-4 space-y-3">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-lg bg-[#FFF8F5] p-4 ring-1 ring-[#f2d8cd]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#0d2d47]">
                      <span className="min-w-0 break-words">{faq.question}</span>
                      <span className="text-[#19a6b5] group-open:hidden">+</span>
                      <span className="hidden text-[#19a6b5] group-open:block">-</span>
                    </summary>

                    <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="mt-3 border-t border-[#f2d8cd] pt-3">
                          <RenderContent value={faq.answer} />
                        </div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
