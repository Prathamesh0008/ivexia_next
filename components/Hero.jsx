"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";

const baseBanners = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/38/d4/10/38d4101d5771836ae8624e463696b4c9.jpg",
    color: "from-[#FF7A00]/85 via-[#E2004F]/78 to-[#0d2d47]/80",
    accent: "#FF7A00",
    gradient: "bg-gradient-to-r",
    eyebrow: "Global Reach",
    title: "Reliable pharmaceutical supply for international partners",
    text: "From sourcing support to dossier-led execution, we help importers, distributors, and brand owners move with confidence.",
    cta: "Talk To Our Team",
    secondaryCta: "Explore Offerings",
    stats: [
      { value: "GMP", label: "Quality Systems" },
      { value: "Global", label: "Market Focus" },
      { value: "Docs", label: "Regulatory Support" },
    ],
    spotlight: "Export-ready production and partner-first execution.",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/9e/30/12/9e30127d086fd974c7e1b06832d4bb90.jpg",
    color: "from-[#0d2d47]/88 via-[#16496d]/80 to-[#19a6b5]/70",
    accent: "#19a6b5",
    gradient: "bg-gradient-to-r",
    eyebrow: "Research To Scale",
    title: "Manufacturing discipline backed by technical depth",
    text: "We combine process rigor, documentation support, and category breadth to help healthcare businesses scale reliably.",
    cta: "Start A Conversation",
    secondaryCta: "See Product Range",
    stats: [
      { value: "API", label: "Ingredient Access" },
      { value: "OEM", label: "Private Label" },
      { value: "QA", label: "Compliance Focus" },
    ],
    spotlight: "Structured supply for complex international requirements.",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/2d/2d/85/2d2d85fb196588c54f7a60285511dec6.jpg",
    color: "from-[#E2004F]/84 via-[#C84157]/78 to-[#FF7A00]/72",
    accent: "#FFFFFF",
    gradient: "bg-gradient-to-r",
    eyebrow: "Commercial Ready",
    title: "Portfolio support across formulations, OTC, APIs, and test kits",
    text: "A broader healthcare offering with the commercial, regulatory, and manufacturing coordination needed for real market entry.",
    cta: "Request A Callback",
    secondaryCta: "View Test Kits",
    stats: [
      { value: "OTC", label: "Retail Lines" },
      { value: "Rx", label: "Finished Products" },
      { value: "Fast", label: "Response Cycle" },
    ],
    spotlight: "Commercially aligned product access for growth markets.",
  },
];

const floatingNotes = [
  { label: "Quality", tone: "bg-white/14 text-white border-white/20" },
  { label: "Compliance", tone: "bg-[#19a6b5]/20 text-white border-white/10" },
  { label: "Export", tone: "bg-[#FF7A00]/18 text-white border-white/10" },
];

export default function Hero() {
  const bannerDurationMs = 10000;
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const reduceMotion = useReducedMotion();
  const { translations } = useLanguage();

  const banners = baseBanners.map((item, index) => ({
    ...item,
    ...(Array.isArray(translations?.hero) &&
    translations.hero[index] &&
    typeof translations.hero[index] === "object"
      ? translations.hero[index]
      : {}),
    stats:
      Array.isArray(translations?.hero?.[index]?.stats) &&
      translations.hero[index].stats.length > 0
        ? translations.hero[index].stats
        : item.stats,
  }));

  useEffect(() => {
    if (isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, bannerDurationMs);

    return () => clearInterval(interval);
  }, [isHovered, banners.length, bannerDurationMs]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }

    if (touchEndX.current - touchStartX.current > 50) {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  const activeSlide = banners[currentIndex];
  const secondaryHref =
    currentIndex === 0
      ? "/offerings-overview"
      : currentIndex === 1
        ? "/products"
        : "/test-kits";

  return (
    <section
      className="relative h-[88vh] w-full overflow-hidden bg-[linear-gradient(135deg,#FF7A00_0%,#E2004F_58%,#FF9B3D_100%)] md:h-[84vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-12 h-60 w-60 rounded-full bg-[#19a6b5]/18 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 45, 0], y: [0, 26, 0], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-8%] top-20 h-72 w-72 rounded-full bg-[#FF7A00]/18 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -36, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-8%] left-1/3 h-64 w-64 rounded-full bg-[#E2004F]/14 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -28, 0], x: [0, 20, 0], scale: [1, 1.06, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.12]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.01 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeSlide.image})` }}
            animate={
              reduceMotion
                ? undefined
                : { scale: isHovered ? 1.05 : 1.12, x: [0, -12, 0], y: [0, 8, 0] }
            }
            transition={{
              scale: { duration: 8, ease: "easeOut" },
              x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <div
            className={`absolute inset-0 ${activeSlide.gradient} ${activeSlide.color} mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(5,18,31,0.74)_18%,rgba(5,18,31,0.42)_54%,rgba(5,18,31,0.16)_100%)]" />
          <div className="absolute inset-0 bg-black/18" />

          <div className="relative z-20 flex h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 sm:px-10 md:px-16 lg:grid-cols-[minmax(0,1.15fr)_360px]">
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className="max-w-3xl"
              >
                <motion.div
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.28 }}
                  className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm md:text-sm"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeSlide.accent }} />
                  {activeSlide.subtitle || activeSlide.eyebrow}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.34 }}
                  className="max-w-4xl text-4xl font-bold leading-[1.02] text-white sm:text-5xl md:text-6xl"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.44 }}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-gray-100 sm:text-lg md:text-xl"
                >
                  {activeSlide.text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.56 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {floatingNotes.map((item, index) => (
                    <motion.span
                      key={item.label}
                      className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm md:text-[11px] ${item.tone}`}
                      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.35,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.64 }}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-8 py-4 font-semibold text-[#0d2d47] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                  >
                    <span>{activeSlide.cta}</span>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>

                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center gap-3 rounded-xl border border-white/18 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/16"
                  >
                    <span>{activeSlide.secondaryCta}</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.78 }}
                  className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {(activeSlide.stats || []).map((stat, index) => (
                    <motion.div
                      key={`${stat.label}-${index}`}
                      className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-md"
                      whileHover={reduceMotion ? undefined : { y: -3, backgroundColor: "rgba(255,255,255,0.16)" }}
                    >
                      <div className="text-2xl font-bold text-white md:text-3xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/72">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: reduceMotion ? 0 : 30, y: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.85, delay: 0.45 }}
                className="relative hidden lg:block"
              >
                <motion.div
                  className="absolute -right-8 top-8 h-24 w-24 rounded-full border border-white/12"
                  animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -left-6 bottom-10 h-14 w-14 rounded-full bg-[#19a6b5]/24 blur-md"
                  animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/10 p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/65">
                    <span>Ivexia Focus</span>
                    <span>{String(currentIndex + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="mt-6 text-2xl font-semibold leading-snug">
                    {activeSlide.spotlight}
                  </div>

                  <div className="mt-8 space-y-4">
                    {(activeSlide.stats || []).map((stat, index) => (
                      <motion.div
                        key={`${stat.value}-${index}`}
                        className="rounded-2xl border border-white/10 bg-black/12 px-4 py-4"
                        animate={reduceMotion ? undefined : { x: [0, index % 2 === 0 ? 6 : -6, 0] }}
                        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-sm uppercase tracking-[0.18em] text-white/55">
                              {stat.label}
                            </div>
                            <div className="mt-2 text-xl font-bold text-white">
                              {stat.value}
                            </div>
                          </div>
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: activeSlide.accent }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/15">
        <div
          key={currentIndex}
          className="h-full origin-left animate-[hero-progress_linear_forwards]"
          style={{
            animationDuration: `${bannerDurationMs}ms`,
            animationPlayState: isHovered ? "paused" : "running",
            backgroundColor: activeSlide.accent,
          }}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Slide ${index + 1}`}
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-12 bg-white"
                  : "w-4 bg-white/38 group-hover:w-6 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="absolute right-6 top-6 z-30 hidden rounded-full border border-white/12 bg-black/16 px-4 py-2 text-sm font-medium text-white/92 backdrop-blur-sm md:block">
        {String(currentIndex + 1).padStart(2, "0")} /{" "}
        {String(banners.length).padStart(2, "0")}
      </div>

      <button
        onClick={prevSlide}
        className="group absolute left-6 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18 md:flex"
        aria-label="Previous slide"
      >
        <span className="text-3xl leading-none">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="group absolute right-6 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18 md:flex"
        aria-label="Next slide"
      >
        <span className="text-3xl leading-none">›</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-30 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.24em] text-white/65">
          <span>SCROLL</span>
          <motion.div
            className="w-px bg-gradient-to-b from-white/70 to-transparent"
            animate={reduceMotion ? undefined : { height: [34, 52, 34] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
