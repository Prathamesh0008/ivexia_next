// app/test-kits/[slug]/page.jsx
"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function formatLabel(key = "") {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
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
            <RenderContent value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    const { title, ...rest } = value;

    return (
      <div className="mt-3 space-y-3">
        {Object.entries(rest).map(([key, val]) => (
          <div key={key} className="min-w-0">
            {typeof val === "object" && !Array.isArray(val) ? (
              <div>
                <p className="text-sm font-bold text-[#0d2d47]">
                  {formatLabel(key)}
                </p>
                <RenderContent value={val} />
              </div>
            ) : (
              <RenderContent value={val} />
            )}
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

function FAQSection({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="mt-6 scroll-mt-24 border-t border-[#f2d8cd] pt-6">
      <h3 className="text-xl font-bold text-[#0d2d47]">
        Frequently Asked Questions
      </h3>

      <p className="mt-1 text-sm text-[#64748b]">
        Click any question to expand the answer.
      </p>

      <div className="mt-4 space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={`faq-${index}`}
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
  );
}

export default function TestKitDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const { translations, language } = useLanguage();
  const t = translations?.testKitDetailPage;

  const [testKit, setTestKit] = useState(null);
  const [detailContent, setDetailContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestKit() {
      try {
        const res = await fetch(`/api/testkits/${slug}`);

        if (res.ok) {
          const data = await res.json();

          if (data && !data.error) {
            setTestKit(data);
            setLoading(false);
            return;
          }
        }
      } catch (error) {}

      setLoading(false);
    }

    if (slug) fetchTestKit();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    const activeLanguage = language || "en";

    async function loadDetailContent() {
      try {
        const res = await fetch(
          `/api/testkits/${slug}/content?language=${activeLanguage}`
        );

        if (!res.ok) {
          if (!cancelled) setDetailContent({});
          return;
        }

        const data = await res.json();

        if (!cancelled) setDetailContent(data);
      } catch (error) {
        if (!cancelled) setDetailContent({});
      }
    }

    loadDetailContent();

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const title = detailContent?.meta?.title || testKit?.product;

    if (title) {
      document.title = title;
    }

    if (detailContent?.meta?.description) {
      let metaDescription = document.querySelector('meta[name="description"]');

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", detailContent.meta.description);
    }
  }, [detailContent, testKit]);

  const content = detailContent?.content || testKit?.content || {};
  const hero = detailContent?.hero || testKit?.hero || {};
  const meta = detailContent?.meta || testKit?.meta || {};
  const faqs = Array.isArray(detailContent?.faqs)
    ? detailContent.faqs
    : Array.isArray(testKit?.faqs)
      ? testKit.faqs
      : [];

  const productTitle = hero.title || testKit?.product || "Test Kit";

  const productDescription =
    hero.description ||
    testKit?.description ||
    "Detailed product information will be shared on request.";

  const getDetailValue = (label) =>
    content?.productOverview?.details?.find(
      (item) => item.label?.toLowerCase() === label.toLowerCase()
    )?.value;

  const category = testKit?.category || getDetailValue("Category");
  const method = testKit?.method || getDetailValue("Method");
  const specimen = testKit?.specimen || getDetailValue("Specimen");
  const cutOff =
    testKit?.cut_off || getDetailValue("Cut-off") || getDetailValue("Cut-Off");
  const certificate = testKit?.certificate || testKit?.Certificate;

  const topInfo = [
    ["Product Name", productTitle],
    ["Category", category],
    ["Method", method],
    ["Specimen", specimen],
    ["Cut-Off", cutOff],
    ["Certificate", certificate],
  ].filter(([, value]) => value);

const contentBlocks = useMemo(() => {
  const blocks = [];

  Object.entries(content)
    .filter(([, value]) => value)
    .forEach(([key, value]) => {
      blocks.push({
        id: key,
        title: value?.title || formatLabel(key),
        value,
      });
    });

  return blocks;
}, [content]);

const navSections = [
  { id: "key-information", title: "Key Information" },
  ...contentBlocks.map((block) => ({
    id: block.id,
    title: block.title,
  })),
  ...(faqs.length > 0 ? [{ id: "faq", title: "FAQ" }] : []),
];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8F5] pt-[110px]">
        <div className="text-[#0d2d47]">{t?.loading || "Loading..."}</div>
      </div>
    );
  }

  if (!testKit) {
    notFound();
  }

 return (
  <main
    id="page-top"
    className="w-full overflow-x-hidden bg-white pb-16 pt-10 text-[#0d2d47]"
  >
    <div className="mx-auto w-full max-w-7xl bg-[#FFF8F5] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section>
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6c7b8d]">
          <Link href="/" className="hover:text-[#19a6b5]">
            {t?.home || "Home"}
          </Link>
          <span>/</span>
          <Link href="/test-kits" className="hover:text-[#19a6b5]">
            {t?.testKits || "Test Kits"}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#0d2d47]">{productTitle}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#19a6b5]">
              {hero.badge || t?.badge || "Diagnostic Test Kit"}
            </p>

            <h1 className="mt-4 max-w-5xl break-words text-3xl font-extrabold leading-tight text-[#0d2d47] sm:text-5xl">
              {productTitle}
            </h1>

            <div className="mt-5 max-w-4xl border-l-4 border-[#19a6b5] pl-5">
              <RenderContent value={productDescription} />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-[#0d2d47] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0d2d47]/20 transition hover:-translate-y-0.5 hover:bg-[#19a6b5]"
              >
                {t?.requestInfo || "Request Information"}
              </Link>

              <Link
                href="/test-kits"
                className="inline-flex rounded-full border border-[#f2d8cd] bg-[#FFF8F5] px-7 py-3 text-sm font-semibold text-[#0d2d47] transition hover:border-[#19a6b5] hover:text-[#19a6b5]"
              >
                {t?.backButton || "Back To Test Kits"}
              </Link>
            </div>
          </div>

          {topInfo.length > 0 && (
            <div className="rounded-[24px] border border-[#f2d8cd] bg-[#FFF8F5] p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#0d2d47]">
                Key Details
              </h2>

              <div className="space-y-3">
                {topInfo.slice(0, 6).map(([label, value], idx) => (
                  <InfoCard
                    key={`${label}-${idx}`}
                    label={label}
                    value={value}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10 grid w-full gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
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
                  <InfoCard
                    key={`${label}-${idx}`}
                    label={label}
                    value={value}
                  />
                ))}
              </div>
            </section>
          )}

          {contentBlocks.map((block, index) => (
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

          <FAQSection faqs={faqs} />
        </div>
      </section>
    </div>
  </main>
);

}
