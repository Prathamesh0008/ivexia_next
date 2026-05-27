"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import INGREDIENTS from "@/data/ingredients";
import { en } from "@/data4/languages/en";
import { ar } from "@/data4/languages/ar";
import { de } from "@/data4/languages/de";
import {fr } from "@/data4/languages/fr";
import {nl} from "@/data4/languages/nl";
import {es} from "@/data4/languages/es";
import {zh} from "@/data4/languages/zh";
import {ja} from "@/data4/languages/ja";
import {pt } from "@/data4/languages/pt";


const fallbackImg = "/images/capsuleimage.jpg";
const languageFiles = {
  en,
  ar,
  de,
  fr,
  nl,
  es,
  zh,
  ja,
  pt,
};

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
    productInfo: "Product Information",
    completeDetails: "Complete Product Details",
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
    productInfo: "معلومات المنتج",
    completeDetails: "تفاصيل المنتج الكاملة",
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
  productInfo: "Produktinformationen",
  completeDetails: "Vollständige Produktdetails",
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
  productInfo: "Informations sur le produit",
  completeDetails: "Détails complets du produit",
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
  productInfo: "Productinformatie",
  completeDetails: "Volledige productdetails",
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
  productInfo: "Información del producto",
  completeDetails: "Detalles completos del producto",
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
  productInfo: "产品信息",
  completeDetails: "完整产品详情",
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
  productInfo: "Informações do produto",
  completeDetails: "Detalhes completos do produto",
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
  productInfo: "製品情報",
  completeDetails: "製品詳細",
  exploreMore: "さらにAPIを探す",
  sendEnquiry: "問い合わせを送信",
  goToContact: "お問い合わせへ",
  close: "閉じる",
},
};

function normalizeLang(value) {
  return String(value || "en").toLowerCase().split("-")[0];
}

function UnderMaintenancePage() {
  return (
    <section className="relative bg-[#FFF8F5] py-16 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#19a6b5]/10 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        <img
          src="/images/undermaintenance7.png"
          alt="Under Maintenance"
          className="mx-auto mb-6 block w-full max-w-[320px] md:max-w-[380px] object-contain drop-shadow-md"
        />

        <p className="text-[#19a6b5] uppercase tracking-[0.25em] text-xs mb-3 font-semibold">
          API Update
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-[#0d2d47] mb-3">
          Ingredient Details Coming Soon
        </h1>

        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          We are currently updating this API page with complete technical
          specifications, manufacturing insights, and regulatory data.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/products/ingredient"
            className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
          >
            Back to APIs
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 border border-[#0d2d47] text-[#0d2d47] rounded-full text-sm font-semibold hover:bg-[#0d2d47] hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ section }) {
  if (!section) return null;

  return (
    <div className="rounded-3xl bg-white border border-[#0d2d47]/10 p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition">
      {section.title && (
        <h2 className="text-xl sm:text-2xl font-bold text-[#0d2d47] mb-4">
          {section.title}
        </h2>
      )}

      {section.description && (
        <p className="text-gray-700 leading-relaxed mb-4">
          {section.description}
        </p>
      )}

      {section.content && (
        <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
      )}

      {Array.isArray(section.sections) && (
        <div className="space-y-4">
          {section.sections.map((item, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      )}

      {Array.isArray(section.points) && (
        <ul className="grid gap-2 text-gray-700">
          {section.points.map((item, index) => (
            <li key={index} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#19a6b5]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(section.instructions) && (
        <ul className="grid gap-2 text-gray-700">
          {section.instructions.map((item, index) => (
            <li key={index} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF7A00]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(section.advantages) && (
        <ul className="grid gap-2 text-gray-700">
          {section.advantages.map((item, index) => (
            <li key={index} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E2004F]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(section.details) && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <tbody>
              {section.details.map((row, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="px-4 py-3 font-semibold text-[#0d2d47] bg-[#FFF8F5] w-1/3">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FAQSection({ faqs, labels }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[#19a6b5] uppercase tracking-[0.2em] text-xs font-semibold mb-2">
           {labels.faq}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d47]">
            {labels.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-[#0d2d47]/10 bg-[#FFF8F5] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full cursor-pointer px-5 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-[#0d2d47]">
                    {faq.question}
                  </span>

                  <span className="h-8 w-8 shrink-0 rounded-full bg-white flex items-center justify-center text-[#0d2d47] font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function IngredientDetail() {
  const params = useParams();
  const { language, selectedLanguage, lang, currentLang, currentLanguage } =
    useLanguage();

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
  const selectedLanguageFile = languageFiles[activeLang] || en;
  const labels = uiText[activeLang] || uiText.en;

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const UNDER_MAINTENANCE = false;
const ingredientContent =
  selectedLanguageFile?.ingredients?.[slug] || en?.ingredients?.[slug];
  const localIngredient = INGREDIENTS.find((item) => item.slug === slug);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/ingredients/${slug}`)
      .then((res) => res.json())
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (ingredientContent?.meta?.title) {
      document.title = ingredientContent.meta.title;
    }

    if (ingredientContent?.meta?.description) {
      let metaDescription = document.querySelector('meta[name="description"]');

      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", ingredientContent.meta.description);
    }
  }, [ingredientContent]);

  if (UNDER_MAINTENANCE) return <UnderMaintenancePage />;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[#0d2d47]">
      {labels.loading}
      </div>
    );
  }

  if (!product && !ingredientContent) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
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

  const pageTitle = ingredientContent?.hero?.title || product?.name || "API";
  const pageDescription =
    ingredientContent?.hero?.description ||
    `${product?.name} is a high-quality Active Pharmaceutical Ingredient (API) manufactured in compliance with international regulatory standards.`;

  const imgSrc = localIngredient?.image || product?.image || fallbackImg;

  const suggestedSource = allIngredients.length > 0 ? allIngredients : INGREDIENTS;
  const suggested = suggestedSource
    .filter((item) => item.slug !== slug)
    .slice(0, 4);

  return (
  <main dir={isArabic ? "rtl" : "ltr"}>
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-sm text-gray-600">
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#0d2d47] transition">
       {labels.home}
            </Link>
            <span>/</span>
            <Link
              href="/products/ingredient"
              className="hover:text-[#0d2d47] transition"
            >
             {labels.apis}
            </Link>
            <span>/</span>
            <span className="font-medium text-[#0d2d47]">{pageTitle}</span>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFF8F5] to-[#EAFBFC] pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="absolute top-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-[#19a6b5]/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] h-[300px] w-[300px] rounded-full bg-[#FF7A00]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex justify-center lg:justify-start">
              <img
                src={imgSrc}
                alt={pageTitle}
                className="mx-auto w-full max-h-[280px] sm:max-h-[340px] object-contain"
              />
            </div>

            <div>
              <p className="inline-flex rounded-full bg-white border border-[#0d2d47]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#19a6b5]">
                {labels.pharmaceuticalApi}
              </p>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0d2d47]">
                {pageTitle}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                {product?.category && (
                  <span className="rounded-full bg-[#0d2d47] px-4 py-2 text-xs text-white">
                    {product.category}
                  </span>
                )}

                {product?.cas && (
                  <span className="rounded-full bg-white px-4 py-2 text-xs text-gray-800 border">
                    CAS: {product.cas}
                  </span>
                )}
              </div>

              <p className="mt-6 leading-8 text-gray-700 max-w-3xl">
                {pageDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => setShowQuoteModal(true)}
    className="cursor-pointer rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-7 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition"
  >
    {labels.requestQuote}
  </button>

  <Link
    href="/products/ingredient"
    className="rounded-full border border-[#0d2d47]/20 bg-white px-7 py-3 font-semibold text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition"
  >
    {labels.backToApis}
  </Link>
</div>
            </div>
          </div>
        </div>
      </section>

      {ingredientContent?.content && (
        <section className="bg-[#FFF8F5] py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8 text-center">
              <p className="text-[#19a6b5] uppercase tracking-[0.2em] text-xs font-semibold mb-2">
                {labels.productInfo}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d47]">
                {labels.completeDetails}
              </h2>
            </div>

            <div className="grid gap-5 md:gap-6">
              {Object.entries(ingredientContent.content).map(([key, section]) => (
                <ContentSection key={key} section={section} />
              ))}
            </div>
          </div>
        </section>
      )}

   <FAQSection faqs={ingredientContent?.faqs} labels={labels} />

      {suggested.length > 0 && (
        <section className="bg-[#FFF8F5] py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl sm:text-3xl font-bold text-[#0d2d47]">
              {labels.exploreMore}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {suggested.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/ingredient/${item.slug}`}
                  className="rounded-3xl border border-gray-100 bg-white p-6 text-center transition hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={item.image || fallbackImg}
                    alt={item.name}
                    className="mx-auto h-24 w-24 object-contain"
                  />

                  <p className="mt-4 font-semibold text-[#0d2d47]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-[#0d2d47]">
              Request Quote
            </h3>

            <p className="text-gray-600 mb-6">
              {labels.sendEnquiry} <strong>{pageTitle}</strong>.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-block cursor-pointer rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-5 py-2 font-semibold text-white"
              >
            {labels.goToContact}
              </Link>

              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="cursor-pointer rounded-full bg-gray-100 px-5 py-2 transition hover:bg-gray-200"
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
