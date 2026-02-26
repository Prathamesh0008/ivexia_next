"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicroscope, FaIndustry } from "react-icons/fa6";
import Link from "next/link";

export default function ResearchManufacturingSection() {
  const [activeTab, setActiveTab] = useState("research");

  const tabs = [
    { key: "research", label: "Research" },
    { key: "manufacturing", label: "Manufacturing" },
  ];

  const content = {
    research: {
      title: "Research & Development",
      desc: "Our R&D team focuses on innovative formulations, process optimization, and quality-driven development to meet global healthcare needs.",
      icon: <FaMicroscope size={60} className="text-[#19a6b5]" />,
      img: "https://i.pinimg.com/1200x/e1/a3/ee/e1a3eefa00b4ff2f95c00165d9e6e644.jpg",
    },
    manufacturing: {
      title: "Manufacturing Excellence",
      desc: "Modern facilities and robust compliance systems enable consistent quality, scalable production, and reliable supply for international markets.",
      icon: <FaIndustry size={60} className="text-[#19a6b5]" />,
      img: "https://i.pinimg.com/1200x/c0/c3/02/c0c30253274fe9fd73b9c633d2a56902.jpg",
    },
  };

  const active = content[activeTab];

  return (
    <section className="py-20 px-6 md:px-16 bg-white relative overflow-hidden">
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-100 rounded-full shadow-inner overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 md:px-8 py-3 text-sm md:text-base font-medium transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white"
                    : "text-gray-600 hover:text-[#0d2d47]"
                }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Info */}
          <div>
            <div className="mb-6">{active.icon}</div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#0d2d47] mb-4">
              {active.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {active.desc}
            </p>

            <Link
              href="/about"
              className="bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition inline-block"
            >
              Explore
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={active.img}
              alt={active.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />
    </section>
  );
}