//ivexia\app\about\page.jsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaIndustry,
  FaGlobeEurope,
  FaFlask,
  FaLeaf,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

function AutoScrollLabs({ t }) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const labImages = [
    "/images/lab1.jpg",
    "/images/lab2.jpg",
    "/images/lab3.jpg",
    "/images/lab4.jpg",
    "/images/lab5.jpg",
  ];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        container.scrollLeft += 1;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }, 15);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0"
    >
      {labImages.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="min-w-[280px] sm:min-w-[300px] rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
            <Image
              src={img}
              fill
              alt="Lab Facility"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="font-semibold text-[#0d2d47] text-base sm:text-lg">
              {t?.labs?.title} {i + 1}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {t?.labs?.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedNumber({ value, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatsCounter({ t }) {
  const stats = [
    { value: 15, suffix: "+", label: t?.stats?.years, icon: <FaChartLine /> },
    { value: 50, suffix: "+", label: t?.stats?.markets, icon: <FaGlobeEurope /> },
    { value: 200, suffix: "+", label: t?.stats?.products, icon: <FaFlask /> },
    { value: 1000, suffix: "+", label: t?.stats?.employees, icon: <FaUsers /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          viewport={{ once: true }}
          className="relative text-center px-4"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d2d47]/10 text-[#0d2d47] text-2xl">
            {stat.icon}
          </div>

          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0d2d47] tracking-tight">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>

          <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            {stat.label}
          </p>

          <div className="mx-auto mt-4 h-[2px] w-10 bg-[#E2004F]" />
        </motion.div>
      ))}
    </div>
  );
}

function ParallaxSection({ children, bgImage }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-[#0d2d47]/70" />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  const { translations } = useLanguage();
  const t = translations?.aboutPage || {};

  const faqs = t?.faqs || [];
  const detailedSections = t?.detailedInfo?.sections || [];
  const valuePoints = t?.valuesInfo?.points || [];
  const timelineList = t?.timelineList || [];
  const awardsList = t?.awardsList || [];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const expertiseList = t?.expertiseList || [];

  const leadershipImages = [
    "/images/leader6.jpg",
    "/images/leader2.jpg",
    "/images/leader5.jpg",
  ];

  const leadershipList = (t?.leadershipList || []).map((member, i) => ({
    ...member,
    img: leadershipImages[i],
  }));

  return (
    <div className="bg-white overflow-hidden">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* HERO */}
      <section className="relative w-full min-h-[600px] sm:h-screen sm:max-h-[900px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/abouthero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2d47]/85 via-[#0d2d47]/75 to-[#0d2d47]/60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="text-white text-sm font-semibold tracking-wider">
                {t?.hero?.badge || "INNOVATION FOR LIFE"}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t?.hero?.title}
            </h1>

            <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              {t?.hero?.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* STATS */}
      <section className="py-16 sm:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StatsCounter t={t} />
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#E2004F]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#19a6b5]/10 rounded-full blur-2xl" />

              <Image
                src="/images/ivexia-factory1.jpg"
                width={700}
                height={600}
                alt="Factory"
                className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover relative z-10 w-full h-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block inline-block px-3 py-1 bg-[#E2004F]/10 rounded-full">
              {t?.story?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-6 leading-tight">
              {t?.story?.title}
            </h2>

            <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
              {t?.story?.p1}
            </p>

            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              {t?.story?.p2}
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {t?.story?.p3}
            </p>

            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E2004F] rounded-full" />
                <span className="text-sm text-gray-500">Quality First</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#19a6b5] rounded-full" />
                <span className="text-sm text-gray-500">Innovation Driven</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXTRA INFO */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[t?.whoWeAre, t?.qualityInfo, t?.exportInfo]
              .filter(Boolean)
              .map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-[#E2004F] font-semibold tracking-wider text-xs uppercase mb-3 block">
                    {item?.badge}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0d2d47] mb-4">
                    {item?.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item?.desc}
                  </p>

                  {item?.points && (
                    <ul className="mt-5 space-y-3">
                      {item.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm text-gray-700"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#19a6b5] flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      {/* DETAILED ABOUT INFO */}
{detailedSections.length > 0 && (
  <section className="py-20 sm:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
        <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
          {t?.detailedInfo?.badge}
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
          {t?.detailedInfo?.title}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {detailedSections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0d2d47] text-white flex items-center justify-center font-bold mb-5">
              {String(i + 1).padStart(2, "0")}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0d2d47] mb-4">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* VISION + MISSION */}
      <section className="py-20 sm:py-28 md:py-36 bg-[#0d2d47] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t?.purpose?.title}
            </h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              {t?.purpose?.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative backdrop-blur-sm bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[#19a6b5]/20 rounded-xl flex items-center justify-center mb-6">
                <FaGlobeEurope className="w-8 h-8 text-[#19a6b5]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#19a6b5] mb-4">
                {t?.purpose?.visionTitle}
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {t?.purpose?.visionDesc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative backdrop-blur-sm bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[#19a6b5]/20 rounded-xl flex items-center justify-center mb-6">
                <FaIndustry className="w-8 h-8 text-[#19a6b5]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#19a6b5] mb-4">
                {t?.purpose?.missionTitle}
              </h3>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {t?.purpose?.missionDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
{valuePoints.length > 0 && (
  <section className="py-20 sm:py-28 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
        <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
          {t?.valuesInfo?.badge}
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
          {t?.valuesInfo?.title}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {valuePoints.map((value, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-[#19a6b5]/10 text-[#19a6b5] flex items-center justify-center font-bold mb-4">
              ✓
            </div>

            <h3 className="text-xl font-bold text-[#0d2d47]">
              {value}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* GLOBAL OPERATIONS */}
      <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
              {t?.global?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.global?.title}
            </h2>

            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t?.global?.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t?.globalLocations?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0d2d47] to-[#1a3a5a] rounded-xl flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-white">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#0d2d47] mb-3">
                    {item.loc}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
              {t?.expertise?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.expertise?.title}
            </h2>

            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t?.expertise?.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {expertiseList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d47] via-[#0d2d47]/40 to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-3 block">
              {t?.leadership?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.leadership?.title}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              {t?.leadership?.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {leadershipList.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group"
              >
                <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative h-[300px] sm:h-[340px] bg-[#eef3f7] overflow-hidden">
                    <Image
                      src={member.img}
                      fill
                      alt={member.name}
                      className="object-contain p-4 sm:p-5 group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
                  </div>

                  <div className="px-6 pb-7 pt-2 text-center">
                    <h4 className="font-bold text-[#0d2d47] text-lg sm:text-xl mb-1">
                      {member.name}
                    </h4>

                    <p className="text-[#E2004F] font-semibold text-sm mb-4">
                      {member.title}
                    </p>

                    <div className="w-12 h-[2px] bg-[#19a6b5] mx-auto mb-4" />

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
              {t?.certifications?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.certifications?.title}
            </h2>

            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t?.certifications?.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "EU-GMP", img: "/images/EU-GMP.jpg" },
              { name: "WHO-GMP", img: "/images/WHO-GMP.jpg" },
              { name: "ISO 9001", img: "/images/IS09001.jpg" },
              { name: "ISO 14001", img: "/images/ISO14001.jpg" },
              { name: "HACCP", img: "/images/HACCP.png" },
              { name: "PIC/S", img: "/images/PIclogo.jpg" },
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#E2004F]/20"
              >
                <div className="relative w-full h-20 sm:h-24 mb-4">
                  <Image
                    src={cert.img}
                    fill
                    alt={cert.name}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <p className="font-bold text-[#0d2d47] text-sm sm:text-base">
                  {cert.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <ParallaxSection bgImage="https://images.unsplash.com/photo-1581093502863-50b395c221e5?auto=format&fit=crop&q=80">
        <div className="py-24 sm:py-32 md:py-48 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t?.statement?.title}
            </h2>

            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
              {t?.statement?.subtitle}
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* SUSTAINABILITY */}
      <section className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block inline-block px-3 py-1 bg-[#E2004F]/10 rounded-full">
              {t?.sustainability?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-6 leading-tight">
              {t?.sustainability?.title}
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              {t?.sustainability?.desc}
            </p>

            <div className="space-y-4">
              {t?.sustainability?.points?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-[#19a6b5]/10 rounded-full flex items-center justify-center">
                    <FaLeaf className="w-4 h-4 text-[#19a6b5]" />
                  </div>

                  <p className="text-gray-700 text-sm md:text-base">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image
              src="/images/sustainability.jpg"
              width={600}
              height={400}
              alt="Sustainability"
              className="rounded-2xl shadow-2xl object-cover relative z-10 w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* R&D LABS */}
      <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
              {t?.rnd?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.rnd?.title}
            </h2>

            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t?.rnd?.subtitle}
            </p>
          </motion.div>

          <AutoScrollLabs t={t} />
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="py-20 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
            <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
              {t?.presence?.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
              {t?.presence?.title}
            </h2>

            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t?.presence?.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/worldmap.png"
              width={1200}
              height={600}
              alt="World Map"
              className="w-full h-auto"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 md:py-36 bg-gradient-to-r from-[#0d2d47] to-[#1a3a5a]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t?.cta?.title}
            </h2>

            <p className="text-white/80 text-base md:text-lg mb-8">
              {t?.cta?.subtitle}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0d2d47] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 text-base shadow-lg"
            >
              {t?.cta?.button}

              <svg
                className="w-5 h-5"
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
          </motion.div>
        </div>
      </section>


      {/* FAQ */}
{faqs.length > 0 && (
  <section className="py-20 sm:py-28 bg-gray-50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
        <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
          FAQ
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="space-y-5">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#0d2d47] mb-3">
              {faq.question}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}
    </div>
  );
}




// //ivexia\app\about\page.jsx

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import {
//   FaIndustry,
//   FaGlobeEurope,
//   FaFlask,
//   FaLeaf,
//   FaChartLine,
//   FaUsers,
// } from "react-icons/fa";

// function AutoScrollLabs({ t }) {
//   const scrollRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);

//   const labImages = [
//     "/images/lab1.jpg",
//     "/images/lab2.jpg",
//     "/images/lab3.jpg",
//     "/images/lab4.jpg",
//     "/images/lab5.jpg",
//   ];

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     let interval;
//     if (!isHovered) {
//       interval = setInterval(() => {
//         container.scrollLeft += 1;
//         if (
//           container.scrollLeft + container.clientWidth >=
//           container.scrollWidth
//         ) {
//           container.scrollLeft = 0;
//         }
//       }, 15);
//     }

//     return () => clearInterval(interval);
//   }, [isHovered]);

//   return (
//     <div
//       ref={scrollRef}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0"
//     >
//       {labImages.map((img, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, x: 20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: i * 0.1 }}
//           className="min-w-[280px] sm:min-w-[300px] rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
//         >
//           <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
//             <Image
//               src={img}
//               fill
//               alt="Lab Facility"
//               className="object-cover hover:scale-105 transition-transform duration-700"
//             />
//           </div>

//           <div className="p-4 sm:p-6">
//             <h3 className="font-semibold text-[#0d2d47] text-base sm:text-lg">
//               {t?.labs?.title} {i + 1}
//             </h3>
//             <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
//               {t?.labs?.desc}
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// function AnimatedNumber({ value, suffix = "", duration = 1600 }) {
//   const ref = useRef(null);
//   const [count, setCount] = useState(0);
//   const [started, setStarted] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started) {
//           setStarted(true);
//         }
//       },
//       { threshold: 0.4 }
//     );

//     observer.observe(el);

//     return () => observer.disconnect();
//   }, [started]);

//   useEffect(() => {
//     if (!started) return;

//     let startTime = null;

//     const animate = (time) => {
//       if (!startTime) startTime = time;

//       const progress = Math.min((time - startTime) / duration, 1);
//       const easedProgress = 1 - Math.pow(1 - progress, 3);
//       const current = Math.floor(easedProgress * value);

//       setCount(current);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [started, value, duration]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// }

// function StatsCounter({ t }) {
//   const stats = [
//     { value: 15, suffix: "+", label: t?.stats?.years, icon: <FaChartLine /> },
//     { value: 50, suffix: "+", label: t?.stats?.markets, icon: <FaGlobeEurope /> },
//     { value: 200, suffix: "+", label: t?.stats?.products, icon: <FaFlask /> },
//     { value: 1000, suffix: "+", label: t?.stats?.employees, icon: <FaUsers /> },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12">
//       {stats.map((stat, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 18 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45, delay: i * 0.08 }}
//           viewport={{ once: true }}
//           className="relative text-center px-4"
//         >
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d2d47]/10 text-[#0d2d47] text-2xl">
//             {stat.icon}
//           </div>

//           <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0d2d47] tracking-tight">
//             <AnimatedNumber value={stat.value} suffix={stat.suffix} />
//           </div>

//           <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
//             {stat.label}
//           </p>

//           <div className="mx-auto mt-4 h-[2px] w-10 bg-[#E2004F]" />
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// function ParallaxSection({ children, bgImage }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

//   return (
//     <section ref={ref} className="relative overflow-hidden">
//       <motion.div style={{ y }} className="absolute inset-0 z-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${bgImage})` }}
//         />
//         <div className="absolute inset-0 bg-[#0d2d47]/70" />
//       </motion.div>

//       <div className="relative z-10">{children}</div>
//     </section>
//   );
// }

// export default function AboutPage() {
//   const { translations } = useLanguage();
//   const t = translations?.aboutPage;

//   const fadeInUp = {
//     initial: { opacity: 0, y: 30 },
//     whileInView: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   const faqSchema = t?.faqs?.length
//     ? {
//         "@context": "https://schema.org",
//         "@type": "FAQPage",
//         mainEntity: t.faqs.map((faq) => ({
//           "@type": "Question",
//           name: faq.question,
//           acceptedAnswer: {
//             "@type": "Answer",
//             text: faq.answer,
//           },
//         })),
//       }
//     : null;

//   const expertiseList = t?.expertiseList || [];

//   const leadershipImages = [
//     "/images/leader6.jpg",
//     "/images/leader2.jpg",
//     "/images/leader5.jpg",
//   ];

//   const leadershipList = (t?.leadershipList || []).map((member, i) => ({
//     ...member,
//     img: leadershipImages[i],
//   }));

//   return (
//     <div className="bg-white overflow-hidden">
//       {faqSchema && (
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//         />
//       )}

//       {/* HERO */}
//       <section className="relative w-full min-h-[600px] sm:h-screen sm:max-h-[900px] overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/abouthero.jpg')" }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0d2d47]/85 via-[#0d2d47]/75 to-[#0d2d47]/60" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6"
//         >
//           <div className="text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
//               className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
//             >
//               <span className="text-white text-sm font-semibold tracking-wider">
//                 {t?.hero?.badge || "INNOVATION FOR LIFE"}
//               </span>
//             </motion.div>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
//               {t?.hero?.title}
//             </h1>

//             <p className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
//               {t?.hero?.subtitle}
//             </p>
//           </div>
//         </motion.div>

//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
//       </section>

//       {/* STATS */}
//       <section className="py-16 sm:py-20 bg-white relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <StatsCounter t={t} />
//         </div>
//       </section>

//       {/* BRAND STORY */}
//       <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="relative order-2 md:order-1"
//           >
//             <div className="relative">
//               <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#E2004F]/10 rounded-full blur-2xl" />
//               <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#19a6b5]/10 rounded-full blur-2xl" />

//               <Image
//                 src="/images/ivexia-factory1.jpg"
//                 width={700}
//                 height={600}
//                 alt="Factory"
//                 className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover relative z-10 w-full h-auto"
//               />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="order-1 md:order-2"
//           >
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block inline-block px-3 py-1 bg-[#E2004F]/10 rounded-full">
//               {t?.story?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-6 leading-tight">
//               {t?.story?.title}
//             </h2>

//             <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
//               {t?.story?.p1}
//             </p>

//             <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
//               {t?.story?.p2}
//             </p>

//             <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//               {t?.story?.p3}
//             </p>

//             <div className="mt-8 flex gap-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-[#E2004F] rounded-full" />
//                 <span className="text-sm text-gray-500">Quality First</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-[#19a6b5] rounded-full" />
//                 <span className="text-sm text-gray-500">Innovation Driven</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* EXTRA INFO */}
//       <section className="py-16 sm:py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//             {[t?.whoWeAre, t?.qualityInfo, t?.exportInfo]
//               .filter(Boolean)
//               .map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 24 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: i * 0.08 }}
//                   viewport={{ once: true }}
//                   className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
//                 >
//                   <span className="text-[#E2004F] font-semibold tracking-wider text-xs uppercase mb-3 block">
//                     {item?.badge}
//                   </span>

//                   <h3 className="text-xl sm:text-2xl font-bold text-[#0d2d47] mb-4">
//                     {item?.title}
//                   </h3>

//                   <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                     {item?.desc}
//                   </p>

//                   {item?.points && (
//                     <ul className="mt-5 space-y-3">
//                       {item.points.map((point, index) => (
//                         <li
//                           key={index}
//                           className="flex gap-3 text-sm text-gray-700"
//                         >
//                           <span className="mt-1 h-2 w-2 rounded-full bg-[#19a6b5] flex-shrink-0" />
//                           {point}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </motion.div>
//               ))}
//           </div>
//         </div>
//       </section>

//       {/* VISION + MISSION */}
//       <section className="py-20 sm:py-28 md:py-36 bg-[#0d2d47] text-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               {t?.purpose?.title}
//             </h2>
//             <p className="text-gray-300 text-base max-w-2xl mx-auto">
//               {t?.purpose?.subtitle}
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="group relative backdrop-blur-sm bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
//             >
//               <div className="w-16 h-16 bg-[#19a6b5]/20 rounded-xl flex items-center justify-center mb-6">
//                 <FaGlobeEurope className="w-8 h-8 text-[#19a6b5]" />
//               </div>

//               <h3 className="text-2xl md:text-3xl font-bold text-[#19a6b5] mb-4">
//                 {t?.purpose?.visionTitle}
//               </h3>

//               <p className="text-gray-300 text-base md:text-lg leading-relaxed">
//                 {t?.purpose?.visionDesc}
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="group relative backdrop-blur-sm bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
//             >
//               <div className="w-16 h-16 bg-[#19a6b5]/20 rounded-xl flex items-center justify-center mb-6">
//                 <FaIndustry className="w-8 h-8 text-[#19a6b5]" />
//               </div>

//               <h3 className="text-2xl md:text-3xl font-bold text-[#19a6b5] mb-4">
//                 {t?.purpose?.missionTitle}
//               </h3>

//               <p className="text-gray-300 text-base md:text-lg leading-relaxed">
//                 {t?.purpose?.missionDesc}
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* GLOBAL OPERATIONS */}
//       <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
//               {t?.global?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.global?.title}
//             </h2>

//             <p className="text-gray-600 text-base max-w-2xl mx-auto">
//               {t?.global?.subtitle}
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {t?.globalLocations?.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="p-8">
//                   <div className="w-14 h-14 bg-gradient-to-br from-[#0d2d47] to-[#1a3a5a] rounded-xl flex items-center justify-center mb-6">
//                     <span className="text-xl font-bold text-white">
//                       {i + 1}
//                     </span>
//                   </div>

//                   <h3 className="text-xl md:text-2xl font-bold text-[#0d2d47] mb-3">
//                     {item.loc}
//                   </h3>

//                   <p className="text-gray-600 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* EXPERTISE */}
//       <section className="py-20 sm:py-28 md:py-36 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
//               {t?.expertise?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.expertise?.title}
//             </h2>

//             <p className="text-gray-600 text-base max-w-2xl mx-auto">
//               {t?.expertise?.subtitle}
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {expertiseList.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
//               >
//                 <div className="relative h-80 overflow-hidden">
//                   <Image
//                     src={item.img}
//                     fill
//                     alt={item.title}
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d47] via-[#0d2d47]/40 to-transparent opacity-80" />
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-xl md:text-2xl font-bold mb-2">
//                     {item.title}
//                   </h3>

//                   <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
//                     {item.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* LEADERSHIP */}
//       <section className="py-16 sm:py-24 md:py-32 bg-[#f8fafc]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-3 block">
//               {t?.leadership?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.leadership?.title}
//             </h2>

//             <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
//               {t?.leadership?.subtitle}
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {leadershipList.map((member, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.55, delay: i * 0.08 }}
//                 className="group"
//               >
//                 <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500">
//                   <div className="relative h-[300px] sm:h-[340px] bg-[#eef3f7] overflow-hidden">
//                     <Image
//                       src={member.img}
//                       fill
//                       alt={member.name}
//                       className="object-contain p-4 sm:p-5 group-hover:scale-105 transition-transform duration-700"
//                     />

//                     <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
//                   </div>

//                   <div className="px-6 pb-7 pt-2 text-center">
//                     <h4 className="font-bold text-[#0d2d47] text-lg sm:text-xl mb-1">
//                       {member.name}
//                     </h4>

//                     <p className="text-[#E2004F] font-semibold text-sm mb-4">
//                       {member.title}
//                     </p>

//                     <div className="w-12 h-[2px] bg-[#19a6b5] mx-auto mb-4" />

//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {member.desc}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CERTIFICATIONS */}
//       <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
//               {t?.certifications?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.certifications?.title}
//             </h2>

//             <p className="text-gray-600 text-base max-w-2xl mx-auto">
//               {t?.certifications?.subtitle}
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//             {[
//               { name: "EU-GMP", img: "/images/EU-GMP.jpg" },
//               { name: "WHO-GMP", img: "/images/WHO-GMP.jpg" },
//               { name: "ISO 9001", img: "/images/IS09001.jpg" },
//               { name: "ISO 14001", img: "/images/ISO14001.jpg" },
//               { name: "HACCP", img: "/images/HACCP.png" },
//               { name: "PIC/S", img: "/images/PIclogo.jpg" },
//             ].map((cert, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: i * 0.05 }}
//                 className="group bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#E2004F]/20"
//               >
//                 <div className="relative w-full h-20 sm:h-24 mb-4">
//                   <Image
//                     src={cert.img}
//                     fill
//                     alt={cert.name}
//                     className="object-contain group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>

//                 <p className="font-bold text-[#0d2d47] text-sm sm:text-base">
//                   {cert.name}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* STATEMENT */}
//       <ParallaxSection bgImage="https://images.unsplash.com/photo-1581093502863-50b395c221e5?auto=format&fit=crop&q=80">
//         <div className="py-24 sm:py-32 md:py-48 text-center text-white">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto px-4"
//           >
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//               {t?.statement?.title}
//             </h2>

//             <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
//               {t?.statement?.subtitle}
//             </p>
//           </motion.div>
//         </div>
//       </ParallaxSection>

//       {/* SUSTAINABILITY */}
//       <section className="py-20 sm:py-28 md:py-36 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block inline-block px-3 py-1 bg-[#E2004F]/10 rounded-full">
//               {t?.sustainability?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-6 leading-tight">
//               {t?.sustainability?.title}
//             </h2>

//             <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
//               {t?.sustainability?.desc}
//             </p>

//             <div className="space-y-4">
//               {t?.sustainability?.points?.map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
//                 >
//                   <div className="w-8 h-8 bg-[#19a6b5]/10 rounded-full flex items-center justify-center">
//                     <FaLeaf className="w-4 h-4 text-[#19a6b5]" />
//                   </div>

//                   <p className="text-gray-700 text-sm md:text-base">
//                     {item}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="relative"
//           >
//             <Image
//               src="/images/sustainability.jpg"
//               width={600}
//               height={400}
//               alt="Sustainability"
//               className="rounded-2xl shadow-2xl object-cover relative z-10 w-full h-auto"
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* R&D LABS */}
//       <section className="py-20 sm:py-28 md:py-36 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
//               {t?.rnd?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.rnd?.title}
//             </h2>

//             <p className="text-gray-600 text-base max-w-2xl mx-auto">
//               {t?.rnd?.subtitle}
//             </p>
//           </motion.div>

//           <AutoScrollLabs t={t} />
//         </div>
//       </section>

//       {/* GLOBAL PRESENCE */}
//       <section className="py-20 sm:py-28 md:py-36 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-20">
//             <span className="text-[#E2004F] font-semibold tracking-wider text-sm uppercase mb-4 block">
//               {t?.presence?.badge}
//             </span>

//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
//               {t?.presence?.title}
//             </h2>

//             <p className="text-gray-600 text-base max-w-2xl mx-auto">
//               {t?.presence?.subtitle}
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="relative rounded-2xl overflow-hidden shadow-2xl"
//           >
//             <Image
//               src="/images/worldmap.png"
//               width={1200}
//               height={600}
//               alt="World Map"
//               className="w-full h-auto"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 sm:py-28 md:py-36 bg-gradient-to-r from-[#0d2d47] to-[#1a3a5a]">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               {t?.cta?.title}
//             </h2>

//             <p className="text-white/80 text-base md:text-lg mb-8">
//               {t?.cta?.subtitle}
//             </p>

//             <Link
//               href="/contact"
//               className="inline-flex items-center gap-2 bg-white text-[#0d2d47] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 text-base shadow-lg"
//             >
//               {t?.cta?.button}

//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }