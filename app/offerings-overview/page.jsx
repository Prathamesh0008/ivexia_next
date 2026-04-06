//ivexia\app\offerings-overview\page.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
export default function OfferingsOverviewPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF7A00] to-[#E2004F]";
  const brandTextGradient =
    "bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent";
const { translations } = useLanguage();
 const offerings = [
  {
    id: "01",
    title: translations?.offeringsOverview?.offerings?.api?.title || "Active Pharmaceutical Ingredients (API)",
    subtitle: translations?.offeringsOverview?.offerings?.api?.subtitle || "Raw-Material Portfolio",
    desc: translations?.offeringsOverview?.offerings?.api?.desc || "API solutions...",
    image: "/images/overview-api.jpg",
    link: "/products/ingredient",
    cta: translations?.offeringsOverview?.offerings?.api?.cta || "Explore API",
    useCases: [
      translations?.offeringsOverview?.offerings?.api?.use1 || "Distributors",
      translations?.offeringsOverview?.offerings?.api?.use2 || "Formulation manufacturers",
      translations?.offeringsOverview?.offerings?.api?.use3 || "B2B sourcing teams",
    ],
  },

  {
    id: "02",
    title: translations?.offeringsOverview?.offerings?.finished?.title || "Finished Pharmaceutical Products",
    subtitle: translations?.offeringsOverview?.offerings?.finished?.subtitle || "Ready-to-Market Formulations",
    desc: translations?.offeringsOverview?.offerings?.finished?.desc || "Finished dosage portfolio...",
    image: "/images/overview-products.jpg",
    link: "/products",
    cta: translations?.offeringsOverview?.offerings?.finished?.cta || "View Products",
    useCases: [
      translations?.offeringsOverview?.offerings?.finished?.use1 || "Importers",
      translations?.offeringsOverview?.offerings?.finished?.use2 || "Hospital procurement",
      translations?.offeringsOverview?.offerings?.finished?.use3 || "National tenders",
    ],
  },

  {
    id: "03",
    title: translations?.offeringsOverview?.offerings?.otc?.title || "OTC & Consumer Healthcare",
    subtitle: translations?.offeringsOverview?.offerings?.otc?.subtitle || "Retail Healthcare Segment",
    desc: translations?.offeringsOverview?.offerings?.otc?.desc || "Accessible OTC products...",
    image: "/images/overview-otc.jpg",
    link: "/otc",
    cta: translations?.offeringsOverview?.offerings?.otc?.cta || "Explore OTC",
    useCases: [
      translations?.offeringsOverview?.offerings?.otc?.use1 || "Retail chains",
      translations?.offeringsOverview?.offerings?.otc?.use2 || "Pharmacy networks",
      translations?.offeringsOverview?.offerings?.otc?.use3 || "Health stores",
    ],
  },

  {
    id: "04",
    title: translations?.offeringsOverview?.offerings?.oem?.title || "Private Label Manufacturing / OEM",
    subtitle: translations?.offeringsOverview?.offerings?.oem?.subtitle || "Brand-Building Partnerships",
    desc: translations?.offeringsOverview?.offerings?.oem?.desc || "End-to-end private label support...",
    image: "/images/Manufacturing.jpg",
    link: "/private-label-manufacturing-oem",
    cta: translations?.offeringsOverview?.offerings?.oem?.cta || "Explore OEM",
    useCases: [
      translations?.offeringsOverview?.offerings?.oem?.use1 || "Brand owners",
      translations?.offeringsOverview?.offerings?.oem?.use2 || "Market entrants",
      translations?.offeringsOverview?.offerings?.oem?.use3 || "Regional healthcare businesses",
    ],
  },
];

  const partnerTracks = [
    {
    title: translations?.offeringsOverview?.partnerTracks?.distributors || "For Distributors & Importers",
      points: [
  translations?.offeringsOverview?.partnerPoints?.p1 || "...",
  translations?.offeringsOverview?.partnerPoints?.p2 || "...",
  translations?.offeringsOverview?.partnerPoints?.p3 || "...",
]
    },
    {
      title: translations?.offeringsOverview?.partnerTracks?.privateLabel || "For Private Label Brands",
      points: [
        "OEM pathway from concept to launch",
        "Packaging and compliance coordination",
        "Scale-up planning for growth markets",
      ],
    },
    {
      title: translations?.offeringsOverview?.partnerTracks?.strategic || "For Strategic Partners",
      points: [
        "Multi-category healthcare alignment",
        "Long-term category development support",
        "Collaborative expansion model",
      ],
    },
  ];

  const executionModel = [
    {
      step: translations?.offeringsOverview?.steps?.step1 || "Portfolio Scoping",
     detail: translations?.offeringsOverview?.steps?.detail1 || "Define category fit...",
    },
    {
      step: translations?.offeringsOverview?.steps?.step2 || "Technical & Regulatory Setup",
      detail: translations?.offeringsOverview?.steps?.detail2 || "Prepare product files, quality documentation, and compliance pathway.",
    },
    {
      step: translations?.offeringsOverview?.steps?.step3 || "Manufacturing & Release",
      detail: translations?.offeringsOverview?.steps?.detail3 || "Execute validated production with in-process quality controls.",
    },
    {
      step: translations?.offeringsOverview?.steps?.step4 || "Supply & Market Continuity",
      detail: translations?.offeringsOverview?.steps?.detail4 || "Enable dispatch planning and repeat-order consistency.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#0d2d47]">
      <section className="relative overflow-hidden border-b border-[#0d2d47]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20 grid lg:grid-cols-[1fr_460px] gap-10 items-center">
          <div>
            <p className={`text-xs md:text-sm uppercase tracking-[0.22em] font-semibold ${brandTextGradient}`}>
              {translations?.offeringsOverview?.badge || "Ivexia Offerings Overview"}
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
             {translations?.offeringsOverview?.title || "Practical Healthcare Offerings..."}
            </h1>
            <p className="mt-5 text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
              {translations?.offeringsOverview?.subtitle || "This portfolio is structured..."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 rounded-full text-white px-6 py-3 font-semibold shadow-md hover:opacity-95 transition-opacity ${brandGradient}`}
              >
                {translations?.offeringsOverview?.browse || "Browse Portfolio"}
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#E2004F]/30 text-[#E2004F] px-6 py-3 font-semibold hover:bg-[#fff4f1] transition-colors"
              >
                {translations?.offeringsOverview?.contact || "Contact Team"}
              </Link>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/overview-hero.jpg"
              alt={translations?.offeringsOverview?.imageAlt || "Ivexia offerings"}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E2004F]/65 via-[#FF7A00]/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ffd6c1]">
                {translations?.offeringsOverview?.enterprise || "Enterprise Focus"}
              </p>
              <p className="mt-2 font-semibold text-lg">
               {translations?.offeringsOverview?.enterpriseText || "Designed for operational clarity"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-18">
        <div className="grid md:grid-cols-3 gap-5">
          {partnerTracks.map((track) => (
            <article
              key={track.title}
              className="rounded-2xl border border-[#E2004F]/15 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{track.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {track.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <FaCheckCircle className="mt-0.5 text-[#E2004F] flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-16">
        <div className="space-y-5">
          {offerings.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[#E2004F]/15 bg-white p-5 md:p-7 shadow-sm"
            >
              <div className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-8 items-start">
                <div className="relative h-52 md:h-full min-h-[190px] rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${brandTextGradient}`}>
                      {item.subtitle}
                    </span>
                    <span className="text-sm text-gray-400">/</span>
                    <span className="text-sm text-gray-500">{translations?.offeringsOverview?.track || "Track"} {item.id}</span>
                  </div>

                  <h3 className="mt-2 text-2xl md:text-3xl font-bold leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{item.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="text-xs rounded-full bg-[#fff3ee] text-[#b73340] border border-[#E2004F]/15 px-3 py-1.5"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#E2004F] hover:text-[#FF7A00] transition-colors"
                    >
                      {item.cta}
                      <FaArrowRight className="text-xs" />
                    </Link>

                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#0d2d47]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.2em] font-semibold ${brandTextGradient}`}>
                {translations?.offeringsOverview?.execution?.badge || "Operating Framework"}
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
              {translations?.offeringsOverview?.execution?.title || "How We Structure Execution"}
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                {translations?.offeringsOverview?.execution?.subtitle || "We follow a structured model..."}
              </p>
            </div>

            <div className="space-y-4">
              {executionModel.map((item, idx) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#E2004F]/15 bg-[#fff8f4] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#E2004F] font-semibold">
                    {translations?.offeringsOverview?.step || "Step"} {idx + 1}
                  </p>
                  <h3 className="mt-1 font-semibold text-lg">{item.step}</h3>
                  <p className="text-sm text-gray-600 mt-1.5">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className={`rounded-3xl border border-[#E2004F]/20 text-white p-10 md:p-12 ${brandGradient}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
           {translations?.offeringsOverview?.ctaTitle || "Build the Right Offering Mix"}
            </h2>
            <p className="mt-4 text-gray-200 text-center max-w-3xl mx-auto">
              {translations?.offeringsOverview?.ctaDesc || "If you share your market..."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white text-[#E2004F] px-6 py-3 font-semibold hover:bg-[#fff3ef] transition-colors"
              >
                {translations?.offeringsOverview?.start || "Start Discussion"}
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                {translations?.offeringsOverview?.learn || "Learn About Ivexia"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
