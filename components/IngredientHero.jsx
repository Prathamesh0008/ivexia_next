"use client";

import Link from "next/link";
import Image from "next/image";

export default function IngredientHero() {
  return (
    <section className="relative w-full bg-[#FFF8F5] pt-12 pb-16 md:pt-10 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#0d2d47]/70 mb-3">
            API Portfolio
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0d2d47] leading-tight">
            Active Pharmaceutical
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0d2d47] via-[#19a6b5] to-[#FF7A00]">
              Ingredients
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-700 max-w-xl">
            Explore Ivexia’s API range developed with quality systems, documentation support,
            and flexible supply options for global partners.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#0d2d47]/10 text-[#0d2d47] font-medium">
              GMP Ready
            </span>

            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#19a6b5]/20 text-[#0d2d47] font-medium">
              COA Available
            </span>

            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#FF7A00]/25 text-[#0d2d47] font-medium">
              Flexible Supply
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                px-5 py-2.5 rounded-full text-sm font-semibold
                bg-gradient-to-r from-[#0d2d47] to-[#19a6b5]
                text-white shadow-md hover:opacity-90 transition
              "
            >
              Contact Sales Team
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-[#19a6b5]/14 via-[#FF7A00]/10 to-transparent rounded-[32px] blur-2xl pointer-events-none" />

          <div className="relative rounded-[28px] bg-white border border-[#0d2d47]/10 shadow-[0_18px_45px_rgba(15,23,42,0.12)] overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="rounded-2xl overflow-hidden bg-[#F5FAFF] flex items-center justify-center relative h-[220px] md:h-[260px]">
                <Image
                  src="/images/ingredient-hero.jpg"
                  alt="Ivexia API"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] md:text-xs text-gray-600">
                <span>Trusted by global partners</span>

                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFF8F5] text-[#0d2d47] border border-[#FF7A00]/40 font-semibold">
                  Quality Assured
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* END */}
      </div>
    </section>
  );
}