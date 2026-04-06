// //ivexia\components\IngredientHero.jsx
// "use client";
// import { useLanguage } from "@/contexts/LanguageContext";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";

// const highlights = ["GMP Ready", "COA Available", "Flexible Supply"];
// const metrics = [
//   { value: "Global", label: "Supply Support" },
//   { value: "QA", label: "Documentation" },
//   { value: "API", label: "Portfolio Access" },
// ];

// export default function IngredientHero() {
//   const reduceMotion = useReducedMotion();

//   const sectionVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.12,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#FFF8F5] pb-20 pt-12 md:pb-24 md:pt-10">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <motion.div
//           aria-hidden="true"
//           className="absolute left-[-8%] top-10 h-44 w-44 rounded-full bg-[#19a6b5]/12 blur-3xl"
//           animate={
//             reduceMotion
//               ? undefined
//               : { x: [0, 36, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }
//           }
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           aria-hidden="true"
//           className="absolute right-[-6%] top-20 h-56 w-56 rounded-full bg-[#FF7A00]/12 blur-3xl"
//           animate={
//             reduceMotion
//               ? undefined
//               : { x: [0, -28, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }
//           }
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           aria-hidden="true"
//           className="absolute bottom-10 left-1/3 h-28 w-28 rounded-full border border-[#0d2d47]/10"
//           animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       <motion.div
//         initial="hidden"
//         animate="show"
//         variants={sectionVariants}
//         className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-16 lg:grid-cols-[1.18fr_1fr]"
//       >
//         <div className="relative z-10">
//           <motion.p
//             variants={itemVariants}
//             className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#0d2d47]/70"
//           >
//             API Portfolio
//           </motion.p>

//           <motion.h1
//             variants={itemVariants}
//             className="max-w-3xl text-4xl font-bold leading-[1.02] text-[#0d2d47] md:text-5xl lg:text-6xl"
//           >
//             Active Pharmaceutical
//             <span className="mt-1 block bg-gradient-to-r from-[#0d2d47] via-[#19a6b5] to-[#FF7A00] bg-clip-text text-transparent">
//               Ingredients
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={itemVariants}
//             className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 md:text-base"
//           >
//             Explore Ivexia&apos;s API range developed with quality systems,
//             documentation support, and flexible supply options for global
//             partners.
//           </motion.p>

//           <motion.div
//             variants={itemVariants}
//             className="mt-7 flex flex-wrap gap-3 text-xs md:text-sm"
//           >
//             {highlights.map((label, index) => (
//               <motion.span
//                 key={label}
//                 className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 font-medium text-[#0d2d47] shadow-sm"
//                 style={{
//                   borderColor:
//                     index === 0
//                       ? "rgba(13,45,71,0.10)"
//                       : index === 1
//                         ? "rgba(25,166,181,0.20)"
//                         : "rgba(255,122,0,0.25)",
//                 }}
//                 whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
//               >
//                 {label}
//               </motion.span>
//             ))}
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="mt-8 flex flex-wrap items-center gap-4"
//           >
//             <Link
//               href="/contact"
//               className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
//             >
//               Contact Sales Team
//             </Link>

//             <Link
//               href="#ingredient-catalog"
//               className="inline-flex items-center justify-center rounded-full border border-[#0d2d47]/15 bg-white/80 px-5 py-3 text-sm font-semibold text-[#0d2d47] shadow-sm transition hover:bg-white"
//             >
//               Browse API Catalog
//             </Link>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
//           >
//             {metrics.map((item, index) => (
//               <motion.div
//                 key={item.label}
//                 className="rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-[0_12px_30px_rgba(13,45,71,0.08)] backdrop-blur"
//                 initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
//                 animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
//                 transition={{ delay: 0.35 + index * 0.1, duration: 0.7 }}
//               >
//                 <div className="text-xl font-bold text-[#0d2d47]">
//                   {item.value}
//                 </div>
//                 <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#0d2d47]/65">
//                   {item.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         <motion.div variants={itemVariants} className="relative">
//           <motion.div
//             aria-hidden="true"
//             className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#19a6b5]/14 via-[#FF7A00]/10 to-transparent blur-2xl"
//             animate={reduceMotion ? undefined : { rotate: [0, 3, 0], scale: [1, 1.03, 1] }}
//             transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//           />

//           <div className="relative overflow-hidden rounded-[30px] border border-[#0d2d47]/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
//             <div className="p-5 md:p-6">
//               <div className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F5FAFF] md:h-[300px]">
//                 <motion.div
//                   className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,166,181,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,122,0,0.16),transparent_34%)]"
//                   animate={reduceMotion ? undefined : { opacity: [0.55, 0.8, 0.55] }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 />
//                 <motion.div
//                   className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d2d47] backdrop-blur"
//                   animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
//                   transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   API Supply
//                 </motion.div>
//                 <motion.div
//                   className="absolute bottom-4 left-4 rounded-2xl border border-[#0d2d47]/10 bg-white/88 px-4 py-3 text-[#0d2d47] shadow-lg backdrop-blur"
//                   animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
//                   transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
//                 >
//                   <div className="text-[11px] uppercase tracking-[0.18em] text-[#0d2d47]/55">
//                     Partner Focus
//                   </div>
//                   <div className="mt-1 text-sm font-semibold">
//                     Quality-led sourcing support
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], y: [0, -6, 0] }}
//                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//                   className="relative z-10 h-full w-full"
//                 >
//                   <Image
//                     src="/images/ingredient-hero.jpg"
//                     alt="Ivexia API"
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                 </motion.div>
//               </div>

//               <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-600 md:text-xs">
//                 <span>Trusted by global partners</span>
//                 <div className="flex items-center gap-2">
//                   <span className="h-2.5 w-2.5 rounded-full bg-[#19a6b5]" />
//                   <span className="inline-flex items-center rounded-full border border-[#FF7A00]/40 bg-[#FFF8F5] px-2.5 py-1 font-semibold text-[#0d2d47]">
//                     Quality Assured
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function IngredientHero() {
  const reduceMotion = useReducedMotion();
  const { translations } = useLanguage();

  // ✅ shorthand (clean code)
  const t = translations?.ingredientHero;

  // ✅ FIXED (moved inside component)
  const highlights = [
    t?.badges?.gmp || "GMP Ready",
    t?.badges?.coa || "COA Available",
    t?.badges?.flexible || "Flexible Supply",
  ];

  const metrics = [
    {
      value: "Global",
      label: t?.metrics?.supply || "Supply Support",
    },
    {
      value: "QA",
      label: t?.metrics?.docs || "Documentation",
    },
    {
      value: "API",
      label: t?.metrics?.portfolio || "Portfolio Access",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF8F5] pb-20 pt-12 md:pb-24 md:pt-10">
      
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-8%] top-10 h-44 w-44 rounded-full bg-[#19a6b5]/12 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 36, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-16 lg:grid-cols-[1.18fr_1fr]"
      >

        {/* LEFT CONTENT */}
        <div>
          <motion.p variants={itemVariants} className="text-xs uppercase tracking-widest text-gray-500">
            {t?.subtitle || "API Portfolio"}
          </motion.p>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
            {t?.title?.part1 || "Active Pharmaceutical"}
            <span className="block text-[#19a6b5]">
              {t?.title?.part2 || "Ingredients"}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-4 text-gray-600">
            {t?.description || "Explore API portfolio"}
          </motion.p>

          {/* Highlights */}
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item, i) => (
              <span key={i} className="bg-white border px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Link href="/contact" className="bg-[#19a6b5] text-white px-5 py-2 rounded-full">
              {t?.cta || "Contact"}
            </Link>

            <Link href="#ingredient-catalog" className="border px-5 py-2 rounded-full">
              {t?.browse || "Browse"}
            </Link>
          </div>

          {/* Metrics */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white p-3 rounded-xl text-center">
                <div className="font-bold text-lg">{m.value}</div>
                <div className="text-xs text-gray-500">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div variants={itemVariants} className="relative h-[300px]">
          <Image
            src="/images/ingredient-hero.jpg"
            alt={t?.imageAlt || "API"}
            fill
            className="object-cover rounded-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}