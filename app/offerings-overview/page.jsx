import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function OfferingsOverviewPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF7A00] to-[#E2004F]";
  const brandTextGradient =
    "bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent";

  const offerings = [
    {
      id: "01",
      title: "Active Pharmaceutical Ingredients (API)",
      subtitle: "Raw-Material Portfolio",
      desc: "API solutions developed for quality consistency, regulatory compatibility, and long-term supply planning.",
      image: "/images/overview-api.jpg",
      link: "/products/ingredient",
      cta: "Explore API",
      useCases: ["Distributors", "Formulation manufacturers", "B2B sourcing teams"],
    },
    {
      id: "02",
      title: "Finished Pharmaceutical Products",
      subtitle: "Ready-to-Market Formulations",
      desc: "Finished dosage portfolio across therapeutic categories with market-ready documentation and commercialization support.",
      image: "/images/overview-products.jpg",
      link: "/products",
      cta: "View Products",
      useCases: ["Importers", "Hospital procurement", "National tenders"],
    },
    {
      id: "03",
      title: "OTC & Consumer Healthcare",
      subtitle: "Retail Healthcare Segment",
      desc: "Accessible OTC products structured for daily healthcare demand and broad market distribution channels.",
      image: "/images/overview-otc.jpg",
      link: "/otc",
      cta: "Explore OTC",
      useCases: ["Retail chains", "Pharmacy networks", "Health stores"],
    },
    {
      id: "04",
      title: "Private Label Manufacturing / OEM",
      subtitle: "Brand-Building Partnerships",
      desc: "End-to-end private label support including product planning, manufacturing, documentation, and launch execution.",
      image: "/images/Manufacturing.jpg",
      link: "/private-label-manufacturing-oem",
      cta: "Explore OEM",
      useCases: ["Brand owners", "Market entrants", "Regional healthcare businesses"],
    },
  ];

  const partnerTracks = [
    {
      title: "For Distributors & Importers",
      points: [
        "Portfolio alignment by market demand",
        "Support for repeat supply cycles",
        "Documentation readiness for trade",
      ],
    },
    {
      title: "For Private Label Brands",
      points: [
        "OEM pathway from concept to launch",
        "Packaging and compliance coordination",
        "Scale-up planning for growth markets",
      ],
    },
    {
      title: "For Strategic Partners",
      points: [
        "Multi-category healthcare alignment",
        "Long-term category development support",
        "Collaborative expansion model",
      ],
    },
  ];

  const executionModel = [
    {
      step: "Portfolio Scoping",
      detail: "Define category fit, target market, and supply priorities.",
    },
    {
      step: "Technical & Regulatory Setup",
      detail: "Prepare product files, quality documentation, and compliance pathway.",
    },
    {
      step: "Manufacturing & Release",
      detail: "Execute validated production with in-process quality controls.",
    },
    {
      step: "Supply & Market Continuity",
      detail: "Enable dispatch planning and repeat-order consistency.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#0d2d47]">
      <section className="relative overflow-hidden border-b border-[#0d2d47]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20 grid lg:grid-cols-[1fr_460px] gap-10 items-center">
          <div>
            <p className={`text-xs md:text-sm uppercase tracking-[0.22em] font-semibold ${brandTextGradient}`}>
              Ivexia Offerings Overview
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Practical Healthcare Offerings for Real Market Execution
            </h1>
            <p className="mt-5 text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
              This portfolio is structured for distributors, importers, and
              healthcare brands that need consistency in supply, quality systems,
              and long-term business reliability.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 rounded-full text-white px-6 py-3 font-semibold shadow-md hover:opacity-95 transition-opacity ${brandGradient}`}
              >
                Browse Portfolio
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#E2004F]/30 text-[#E2004F] px-6 py-3 font-semibold hover:bg-[#fff4f1] transition-colors"
              >
                Contact Team
              </Link>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/overview-hero.jpg"
              alt="Ivexia offerings"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E2004F]/65 via-[#FF7A00]/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ffd6c1]">
                Enterprise Focus
              </p>
              <p className="mt-2 font-semibold text-lg">
                Designed for operational clarity, not just presentation.
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
                    <span className="text-sm text-gray-500">Track {item.id}</span>
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
                Operating Framework
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
                How We Structure Execution
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
                We follow a structured model to reduce ambiguity and improve
                predictability across product planning, compliance, and supply.
              </p>
            </div>

            <div className="space-y-4">
              {executionModel.map((item, idx) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#E2004F]/15 bg-[#fff8f4] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#E2004F] font-semibold">
                    Step {idx + 1}
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
              Build the Right Offering Mix for Your Market
            </h2>
            <p className="mt-4 text-gray-200 text-center max-w-3xl mx-auto">
              If you share your market type, target categories, and expected
              volume, we can propose the most practical combination across API,
              finished products, OTC, and OEM.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white text-[#E2004F] px-6 py-3 font-semibold hover:bg-[#fff3ef] transition-colors"
              >
                Start Discussion
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                Learn About Ivexia
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
