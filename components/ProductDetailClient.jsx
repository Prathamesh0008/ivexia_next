// ivexia/components/ProductDetailClient.jsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
            {typeof item === "object" ? (
              <RenderContent value={item} />
            ) : (
              String(item)
            )}
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
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(initialProduct || null);
  const [productData, setProductData] = useState(initialProductData || {});
  const [loading, setLoading] = useState(!initialProduct);
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
    if (!slug) return;

    let cancelled = false;

    async function loadProductContent() {
      try {
        const res = await fetch(
          `/api/products/${slug}/content?language=${language}`
        );

        if (!res.ok) {
          if (!cancelled) setProductData({});
          return;
        }

        const data = await res.json();
        if (!cancelled) setProductData(data || {});
      } catch (error) {
        if (!cancelled) setProductData({});
      }
    }

    loadProductContent();

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function refreshProduct() {
      if (product) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (!cancelled && res.ok && data && !data.error) {
          setProduct(data);
        }
      } catch (error) {
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    refreshProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (initialProductData) {
      setProductData(initialProductData);
    }
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FFF8F5] px-4 text-center">
        <p className="text-sm font-semibold text-[#0d2d47]">
          {t?.loading || "Loading product..."}
        </p>
      </div>
    );
  }

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
    hero.description || product.description || content.introduction;

  const topInfo = [
    ["Product Name", productTitle],
    ["Category", meta.category || product.category],
    ["Form", meta.form || product.form],
    ["Strength", meta.strength || product.dosage],
    ["CAS-ID", meta.cas || product.casId],
  ].filter(([, value]) => value);


const navSections = [
  { id: "key-information", title: "Key Information" },
  ...allBlocks.map((block) => ({
    id: block.id,
    title: block.title,
  })),
  ...(faqs.length > 0 ? [{ id: "faq", title: "FAQ" }] : []),
];

return (
  <main
    id="page-top"
    className="w-full overflow-x-hidden bg-white pb-16 pt-10 text-[#0d2d47]"
  >
    <div className="mx-auto w-full max-w-7xl bg-[#FFF8F5] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6c7b8d]">
        <Link href="/" className="hover:text-[#19a6b5]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#19a6b5]">
          Products
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#0d2d47]">{productTitle}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#19a6b5]">
            Ivexia Product
          </p>

          <h1 className="mt-4 max-w-5xl break-words text-3xl font-extrabold leading-tight text-[#0d2d47] sm:text-5xl">
            {productTitle}
          </h1>

          <div className="mt-5 max-w-4xl border-l-4 border-[#19a6b5] pl-5">
            <RenderContent value={productDescription} />
          </div>

          {isRefreshing && (
            <p className="mt-4 text-sm font-semibold text-[#19a6b5]">
              {t?.updating || "Updating product details..."}
            </p>
          )}

          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-full bg-[#0d2d47] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0d2d47]/20 transition hover:-translate-y-0.5 hover:bg-[#19a6b5]"
          >
            {t?.requestQuote || "Request Quote"}
          </Link>
        </div>

        {topInfo.length > 0 && (
          <div className="rounded-[24px] border border-[#f2d8cd] bg-[#FFF8F5] p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#0d2d47]">
              Key Details
            </h2>

            <div className="space-y-3">
              {topInfo.slice(0, 5).map(([label, value], idx) => (
                <InfoCard key={`${label}-${idx}`} label={label} value={value} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>

    <section className="mx-auto mt-10 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
      <aside className="h-fit rounded-[22px] border border-[#f2d8cd] bg-[#FFF8F5] p-4 lg:sticky lg:top-24">
        <SectionNav sections={navSections} />
      </aside>

      <div className="min-w-0">
        {topInfo.length > 0 && (
          <section id="key-information" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-[#0d2d47]">
              Key Information
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topInfo.map(([label, value], idx) => (
                <InfoCard key={`${label}-${idx}`} label={label} value={value} />
              ))}
            </div>
          </section>
        )}

        {allBlocks.map((block, index) => (
          <section
            id={block.id}
            key={`${block.id}-${index}`}
            className="mt-8 scroll-mt-24 border-t border-[#f2d8cd] pt-7"
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
            className="mt-8 scroll-mt-24 border-t border-[#f2d8cd] pt-7"
          >
            <h3 className="break-words text-xl font-bold text-[#0d2d47]">
              Frequently Asked Questions
            </h3>

            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-[#f2d8cd] bg-[#FFF8F5] p-4 transition hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#0d2d47]">
                    <span className="break-words">{faq.question}</span>
                    <span className="text-lg text-[#19a6b5] group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-lg text-[#19a6b5] group-open:block">
                      -
                    </span>
                  </summary>

                  <div className="mt-3 border-t border-[#f2d8cd] pt-3">
                    <RenderContent value={faq.answer} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
    </div>
  </main>
);

}
