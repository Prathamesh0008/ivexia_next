"use client";

import Image from "next/image";

const logoVersion = "20260401-1242";

const brandPartners = [
  {
    name: "ASB Logistics B.V.",
    logo: `/brandlogos/ASBlogo.png?v=${logoVersion}`,
    href: "https://www.asblogi.com/",
  },
  {
    name: "Biopeptide",
    logo: `/brandlogos/biopeptides.png?v=${logoVersion}`,
    href: "https://www.bio-peptides.com/",
  },
  {
    name: "ED Pharma",
    logo: `/brandlogos/Ed_5.png?v=${logoVersion}`,
    href: "https://edpharma.co/",
  },
  {
    name: "EMA",
    logo: `/brandlogos/EMA.png?v=${logoVersion}`,
    href: null,
  },
  {
    name: "Invictus Logistics",
    logo: `/brandlogos/invictuss.png?v=${logoVersion}`,
    href: "https://www.invictuslogi.com/",
  },
  {
    name: "KVA Logistics",
    logo: `/brandlogos/kva.png?v=${logoVersion}`,
    href: "https://www.kvalogistics.nl/",
  },
  {
    name: "Larksois Pharma",
    logo: `/brandlogos/larko.png?v=${logoVersion}`,
    href: "https://larksoispharma.com/",
  },
  {
    name: "Nova Techsciences",
    logo: `/brandlogos/Nova.png?v=${logoVersion}`,
    href: "https://www.novatechsciences.com/",
  },
];

export default function CustomerStrip() {
  const marqueePartners = [...brandPartners, ...brandPartners];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-[#E2004F]">
            Global Network
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0d2d47]">
            Brands We Partner With
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-600">
            Ivexia supports pharmaceutical companies and distributors with
            dependable manufacturing, documentation, and export partnership.
          </p>
        </div>

        <div className="partner-marquee-shell mt-12">
          <div className="partner-marquee-track">
            {marqueePartners.map((partner, index) => (
              <a
                key={`${partner.name}-${index}`}
                // href={partner.href || undefined}
                target={partner.href ? "_blank" : undefined}
                rel={partner.href ? "noopener noreferrer" : undefined}
                aria-label={
                  partner.href ? `Visit ${partner.name} website` : partner.name
                }
                className={`group partner-marquee-card rounded-[28px] border border-[#E2004F]/10 bg-[#fff8f4] px-2 shadow-sm ${
                  partner.href
                    ? "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    : "cursor-default"
                }`}
              >
                <div className="relative h-24 md:h-25 lg:h-38 w-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(max-width: 767px) 240px, (max-width: 1279px) 320px, 380px"
                    className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
