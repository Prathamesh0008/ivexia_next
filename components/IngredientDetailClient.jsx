"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackImg = "/images/capsuleimage.jpg";

const uiText = {
  en: {
    faq: "FAQ",
    faqTitle: "Frequently Asked Questions",
    loading: "Loading...",
    notFound: "Ingredient Not Found",
    home: "Home",
    apis: "APIs",
    pharmaceuticalApi: "Pharmaceutical API",
    requestQuote: "Request Quote",
    backToApis: "Back to APIs",
    keyInfo: "Key Information",
    technicalInfo: "Technical Information",
    exploreMore: "Explore More APIs",
    sendEnquiry: "Send enquiry for",
    goToContact: "Go to Contact",
    close: "Close",
  },
  ar: {
    faq: "الأسئلة الشائعة",
    faqTitle: "الأسئلة الشائعة",
    loading: "جاري التحميل...",
    notFound: "لم يتم العثور على المنتج",
    home: "الرئيسية",
    apis: "المواد الفعالة",
    pharmaceuticalApi: "مادة فعالة صيدلانية",
    requestQuote: "طلب عرض سعر",
    backToApis: "العودة إلى المواد الفعالة",
    keyInfo: "المعلومات الرئيسية",
    technicalInfo: "المعلومات الفنية",
    exploreMore: "استكشف المزيد من المواد الفعالة",
    sendEnquiry: "إرسال استفسار عن",
    goToContact: "الذهاب إلى التواصل",
    close: "إغلاق",
  },
  de: {
    faq: "FAQ",
    faqTitle: "Häufig gestellte Fragen",
    loading: "Wird geladen...",
    notFound: "Inhaltsstoff nicht gefunden",
    home: "Startseite",
    apis: "APIs",
    pharmaceuticalApi: "Pharmazeutischer Wirkstoff",
    requestQuote: "Angebot anfordern",
    backToApis: "Zurück zu APIs",
    keyInfo: "Wichtige Informationen",
    technicalInfo: "Technische Informationen",
    exploreMore: "Weitere APIs entdecken",
    sendEnquiry: "Anfrage senden für",
    goToContact: "Zur Kontaktseite",
    close: "Schließen",
  },
  fr: {
    faq: "FAQ",
    faqTitle: "Questions fréquemment posées",
    loading: "Chargement...",
    notFound: "Ingrédient introuvable",
    home: "Accueil",
    apis: "API",
    pharmaceuticalApi: "Ingrédient pharmaceutique actif",
    requestQuote: "Demander un devis",
    backToApis: "Retour aux API",
    keyInfo: "Informations clés",
    technicalInfo: "Informations techniques",
    exploreMore: "Découvrir plus d’API",
    sendEnquiry: "Envoyer une demande pour",
    goToContact: "Aller au contact",
    close: "Fermer",
  },
  nl: {
    faq: "FAQ",
    faqTitle: "Veelgestelde vragen",
    loading: "Laden...",
    notFound: "Ingrediënt niet gevonden",
    home: "Home",
    apis: "API's",
    pharmaceuticalApi: "Farmaceutische API",
    requestQuote: "Offerte aanvragen",
    backToApis: "Terug naar API's",
    keyInfo: "Belangrijke informatie",
    technicalInfo: "Technische informatie",
    exploreMore: "Meer API's ontdekken",
    sendEnquiry: "Aanvraag verzenden voor",
    goToContact: "Ga naar contact",
    close: "Sluiten",
  },
  es: {
    faq: "FAQ",
    faqTitle: "Preguntas frecuentes",
    loading: "Cargando...",
    notFound: "Ingrediente no encontrado",
    home: "Inicio",
    apis: "APIs",
    pharmaceuticalApi: "Ingrediente farmacéutico activo",
    requestQuote: "Solicitar cotización",
    backToApis: "Volver a APIs",
    keyInfo: "Información clave",
    technicalInfo: "Información técnica",
    exploreMore: "Explorar más APIs",
    sendEnquiry: "Enviar consulta para",
    goToContact: "Ir a contacto",
    close: "Cerrar",
  },
  zh: {
    faq: "常见问题",
    faqTitle: "常见问题",
    loading: "加载中...",
    notFound: "未找到成分",
    home: "首页",
    apis: "原料药",
    pharmaceuticalApi: "药用活性成分",
    requestQuote: "请求报价",
    backToApis: "返回原料药",
    keyInfo: "关键信息",
    technicalInfo: "技术信息",
    exploreMore: "探索更多原料药",
    sendEnquiry: "发送询价",
    goToContact: "前往联系页面",
    close: "关闭",
  },
  pt: {
    faq: "FAQ",
    faqTitle: "Perguntas frequentes",
    loading: "Carregando...",
    notFound: "Ingrediente não encontrado",
    home: "Início",
    apis: "APIs",
    pharmaceuticalApi: "Ingrediente farmacêutico ativo",
    requestQuote: "Solicitar cotação",
    backToApis: "Voltar para APIs",
    keyInfo: "Informações principais",
    technicalInfo: "Informações técnicas",
    exploreMore: "Explorar mais APIs",
    sendEnquiry: "Enviar consulta para",
    goToContact: "Ir para contato",
    close: "Fechar",
  },
  ja: {
    faq: "FAQ",
    faqTitle: "よくある質問",
    loading: "読み込み中...",
    notFound: "成分が見つかりません",
    home: "ホーム",
    apis: "API",
    pharmaceuticalApi: "医薬品有効成分",
    requestQuote: "見積もりを依頼",
    backToApis: "APIに戻る",
    keyInfo: "主要情報",
    technicalInfo: "技術情報",
    exploreMore: "さらにAPIを探す",
    sendEnquiry: "問い合わせを送信",
    goToContact: "お問い合わせへ",
    close: "閉じる",
  },
};

function normalizeLang(value) {
  return String(value || "en").toLowerCase().split("-")[0];
}

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
  const { title, ...rest } = value;

  return (
    <div className="mt-3 space-y-3">
      {Object.entries(rest).map(([key, val]) => (
        <div key={key} className="min-w-0">
          <RenderContent value={val} />
        </div>
      ))}
    </div>
  );
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
          Ingredient Details Coming Soon
        </h1>

        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
          We are currently updating this API page with complete technical specifications.
        </p>

        <Link
          href="/products/ingredient"
          className="inline-flex rounded-full bg-[#0d2d47] px-6 py-3 text-sm font-semibold text-white hover:bg-[#19a6b5]"
        >
          Back to APIs
        </Link>
      </div>
    </section>
  );
}

export default function IngredientDetail() {
  const params = useParams();
  const languageContext = useLanguage();

  const {
    language,
    selectedLanguage,
    lang,
    currentLang,
    currentLanguage,
  } = languageContext;

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const activeLang = normalizeLang(
    language ||
      selectedLanguage ||
      lang ||
      currentLang ||
      currentLanguage ||
      params?.lang ||
      params?.locale ||
      "en"
  );

  const isArabic = activeLang === "ar";
  const labels = uiText[activeLang] || uiText.en;

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [product, setProduct] = useState(null);
  const [detailContent, setDetailContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const UNDER_MAINTENANCE = false;

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/ingredients/${slug}`)
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then((data) => setAllIngredients(Array.isArray(data) ? data : []))
      .catch(() => setAllIngredients([]));
  }, []);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function loadDetailContent() {
      try {
        const res = await fetch(
          `/api/ingredients/${slug}/content?language=${activeLang}`
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
  }, [slug, activeLang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const title = detailContent?.meta?.title || product?.name;

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
  }, [detailContent, product]);

  const hero = detailContent?.hero || product?.hero || {};
  const meta = detailContent?.meta || product?.meta || {};
  const content = detailContent?.content || product?.content || {};
  const faqs = Array.isArray(detailContent?.faqs)
    ? detailContent.faqs
    : Array.isArray(product?.faqs)
      ? product.faqs
      : [];

  const pageTitle = hero.title || product?.name || "API";

  const pageDescription =
    hero.description ||
    product?.description ||
    `${pageTitle} is a high-quality Active Pharmaceutical Ingredient manufactured in compliance with international regulatory standards.`;

  const imgSrc = product?.image || fallbackImg;

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

  const topInfo = [
    ["Product Name", pageTitle],
    ["Category", product?.category],
    ["CAS Number", product?.cas || product?.casNumber],
    ["Molecular Formula", product?.molecularFormula || meta?.molecularFormula],
    ["Molecular Weight", product?.molecularWeight || meta?.molecularWeight],
    ["Grade", product?.grade || meta?.grade],
  ].filter(([, value]) => value);

 

const navSections = [
  { id: "key-information", title: labels.keyInfo },
  ...allBlocks.map((block) => ({
    id: block.id,
    title: block.title,
  })),
  ...(faqs.length > 0 ? [{ id: "faq", title: labels.faq }] : []),
  { id: "explore-more", title: labels.exploreMore },
];

  const suggested = allIngredients
    .filter((item) => item.slug !== slug)
    .slice(0, 4);

  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FFF8F5] text-[#0d2d47]">
        {labels.loading}
      </div>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-bold text-[#0d2d47]">
          {labels.notFound}
        </h1>

        <Link
          href="/products/ingredient"
          className="mt-6 inline-block rounded-lg border border-[#0d2d47] px-4 py-2 text-[#0d2d47] transition hover:bg-[#0d2d47] hover:text-white"
        >
          {labels.backToApis}
        </Link>
      </section>
    );
  }

  return (
    <main
      id="page-top"
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full overflow-x-hidden bg-[#FFF8F5] pb-12 pt-8 text-[#0d2d47]"
    >
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#f2d8cd]">
          <div className="border-b border-[#f2d8cd] px-5 py-4 sm:px-8">
            <nav className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-[#6c7b8d]">
              <Link href="/" className="hover:text-[#19a6b5]">
                {labels.home}
              </Link>

              <span>/</span>

              <Link href="/products/ingredient" className="hover:text-[#19a6b5]">
                {labels.apis}
              </Link>

              <span>/</span>

              <span className="min-w-0 truncate font-semibold text-[#0d2d47]">
                {pageTitle}
              </span>
            </nav>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[360px_1fr]">
            <div className="flex min-h-[320px] min-w-0 items-center justify-center rounded-xl bg-[#FFF8F5] p-4 ring-1 ring-[#f2d8cd]">
              <img
                src={imgSrc}
                alt={pageTitle}
                className="h-auto w-full max-w-[330px] rounded-lg object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#19a6b5]">
                {labels.pharmaceuticalApi}
              </p>

              <h1 className="mt-3 break-words text-3xl font-bold leading-tight text-[#0d2d47] sm:text-4xl">
                {pageTitle}
              </h1>

              <RenderContent value={pageDescription} />

              {topInfo.length > 0 && (
                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
                  {topInfo.slice(0, 4).map(([label, value], idx) => (
                    <InfoCard key={`${label}-${idx}`} label={label} value={value} />
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(true)}
                  className="max-w-full rounded-full bg-[#0d2d47] px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#19a6b5]"
                >
                  {labels.requestQuote}
                </button>

                <Link
                  href="/products/ingredient"
                  className="max-w-full rounded-full border border-[#f2d8cd] bg-[#FFF8F5] px-7 py-3 text-center text-sm font-semibold text-[#0d2d47] transition hover:border-[#19a6b5] hover:text-[#19a6b5]"
                >
                  {labels.backToApis}
                </Link>
              </div>
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
                {labels.keyInfo}
              </h2>

              <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
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
                {labels.faqTitle}
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

          {suggested.length > 0 && (
            <section
              id="explore-more"
              className="mt-6 scroll-mt-24 border-t border-[#f2d8cd] pt-6"
            >
              <h3 className="text-xl font-bold text-[#0d2d47]">
                {labels.exploreMore}
              </h3>

              <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {suggested.map((item) => (
                  <Link
                    key={item.id || item.slug}
                    href={`/products/ingredient/${item.slug}`}
                    className="min-w-0 rounded-xl border border-[#f2d8cd] bg-[#FFF8F5] p-4 text-center transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <img
                      src={item.image || fallbackImg}
                      alt={item.name}
                      className="mx-auto h-20 w-20 object-contain"
                    />

                    <p className="mt-3 break-words text-sm font-bold text-[#0d2d47]">
                      {item.name}
                    </p>

                    {item.category && (
                      <p className="mt-1 break-words text-xs text-[#64748b]">
                        {item.category}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="mb-2 text-xl font-bold text-[#0d2d47]">
              {labels.requestQuote}
            </h3>

            <p className="mb-6 text-gray-600">
              {labels.sendEnquiry} <strong>{pageTitle}</strong>.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
              className="max-w-full rounded-full bg-[#0d2d47] px-5 py-2 text-center font-semibold text-white transition hover:bg-[#19a6b5]"
              >
                {labels.goToContact}
              </Link>

              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="rounded-full bg-gray-100 px-5 py-2 transition hover:bg-gray-200"
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
