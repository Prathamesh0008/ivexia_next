"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaRocket,
  FaIndustry,
  FaGlobeEurope,
  FaMicroscope,
  FaBullseye,
} from "react-icons/fa";

/* =========================
   AUTO SCROLL LABS
========================= */
function AutoScrollLabs() {
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
              Advanced R&D Facility {i + 1}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Equipped with cutting-edge research infrastructure and global GMP standards.
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================
   STATS COUNTER
========================= */
function StatsCounter() {
  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "50+", label: "Global Markets" },
    { number: "200+", label: "Products" },
    { number: "1000+", label: "Employees" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-5xl mx-auto px-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E2004F] mb-1 sm:mb-2">
            {stat.number}
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-600">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================
   MAIN ABOUT PAGE
========================= */
export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-white overflow-hidden">

      {/* 1️⃣ HERO - Responsive Version */}
      <section
        className="relative w-full min-h-[500px] sm:h-screen sm:max-h-[800px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,45,71,0.85), rgba(13,45,71,0.6)), url('/images/abouthero.jpg')",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-10 sm:bottom-20 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6"
        >
          <div className="bg-white/10 backdrop-blur-md px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 rounded-2xl sm:rounded-3xl text-center border border-white/20 max-w-[90%] sm:max-w-2xl md:max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              About Ivexia Pharmaceuticals
            </h1>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Innovating healthcare with global pharmaceutical excellence and unwavering commitment to quality.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter - New Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <StatsCounter />
      </section>

      {/* 2️⃣ BRAND STORY - Enhanced */}
      <motion.section 
        {...fadeInUp}
        className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center"
      >
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-4 -left-4 w-16 sm:w-24 h-16 sm:h-24"></div>
          <Image
            src="/images/ivexia-factory1.jpg"
            width={700}
            height={600}
            alt="Factory"
            className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover relative z-10 w-full h-auto"
          />
        </div>
        <div className="order-1 md:order-2">
          <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4 sm:mb-6 leading-tight">
            Committed to Pharmaceutical Excellence Since 2018
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
            Founded with a commitment to innovation, Ivexia Pharmaceuticals delivers world-class 
            pharmaceutical manufacturing aligned with global standards. Our journey began with a simple 
            vision: to make quality healthcare accessible worldwide.
          </p>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            We combine regulatory expertise, advanced research, and manufacturing precision to serve 
            international markets. Every product we manufacture undergoes rigorous quality control to 
            meet the highest safety standards.
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Today, Ivexia operates across multiple regions with strategic expansion into Europe and MENA, 
            serving millions of patients globally.
          </p>
        </div>
      </motion.section>

      {/* 3️⃣ VISION + MISSION - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-[#0d2d47] text-white px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Our Purpose
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Driven by innovation, guided by integrity
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF7A00]/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF7A00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FF7A00] mb-3 sm:mb-4">
                Our Vision
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                To become a globally trusted pharmaceutical partner delivering innovation and safety, 
                improving patient outcomes through excellence in everything we do.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#19a6b5]/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#19a6b5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm3 0H9v-2h2v2zm3 0h-2v-2h2v2zm3 0h-2v-2h2v2z"/>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#19a6b5] mb-3 sm:mb-4">
                Our Mission
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                To manufacture high-quality medicines through research excellence and compliance, 
                making healthcare accessible and affordable for communities worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4️⃣ GLOBAL OPERATIONS - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gray-50 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Global Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Worldwide Operations
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Strategically located to serve global markets efficiently
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { loc: "India", desc: "Strategic pharmaceutical presence with state-of-the-art manufacturing facilities and R&D centers." },
              { loc: "North Macedonia", desc: "European hub for manufacturing and distribution, serving EU markets with excellence." },
              { loc: "Qatar", desc: "MENA regional headquarters, expanding healthcare access across the Middle East." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white p-6 sm:p-8 shadow-lg hover:shadow-2xl rounded-xl sm:rounded-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0d2d47]/10 rounded-lg mb-4 sm:mb-6 flex items-center justify-center group-hover:bg-[#0d2d47] transition-colors duration-300">
                  <span className="text-lg sm:text-xl font-bold text-[#0d2d47] group-hover:text-white">{i + 1}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0d2d47] mb-2 sm:mb-3">{item.loc}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ EXPERTISE - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Areas of Expertise
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Specialized pharmaceutical solutions for complex healthcare needs
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: "Research & Development", img: "/images/R&D.jpg", desc: "Cutting-edge research facilities focused on innovative drug delivery systems." },
              { title: "Manufacturing", img: "/images/Manufacturing.jpg", desc: "WHO-GMP certified facilities with advanced manufacturing capabilities." },
              { title: "Oncology", img: "/images/Oncology.jpg", desc: "Specialized oncology portfolio with targeted therapies." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d47] via-[#0d2d47]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ LEADERSHIP - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gray-50 px-4 sm:px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Our Leaders
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Executive Leadership
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Experienced professionals driving pharmaceutical innovation
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {[
              {
                name: "Dr. Michael Carter",
                title: "Chief Executive Officer",
                img: "/images/leader1.jpg",
                desc: "30+ years in pharmaceutical leadership"
              },
              {
                name: "James Wilson",
                title: "Director of Operations",
                img: "/images/leader2.jpg",
                desc: "Expert in global supply chain"
              },
              {
                name: "Sophia Bennett",
                title: "Head of Operations",
                img: "/images/leader3.jpg",
                desc: "Specialist in manufacturing excellence"
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group w-full max-w-[280px] sm:max-w-none"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#19a6b5] to-[#0d2d47] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1"></div>
                    <Image
                      src={member.img}
                      width={120}
                      height={120}
                      alt={member.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                    />
                  </div>
                  <h4 className="font-bold text-[#0d2d47] text-lg sm:text-xl mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[#E2004F] font-medium text-xs sm:text-sm mb-2 sm:mb-3">
                    {member.title}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7️⃣ TIMELINE - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Milestones of Growth
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Key achievements in our path to pharmaceutical excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Hide timeline line on mobile, show on md and up */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#E2004F] via-[#19a6b5] to-[#0d2d47]"></div>
            
            {/* Mobile timeline (stacked) */}
            <div className="md:hidden space-y-6">
              {[
                {
                  year: "2018",
                  event: "Company founded with vision for global pharmaceutical excellence",
                  icon: <FaRocket />,
                },
                {
                  year: "2020",
                  event: "First WHO-GMP certified manufacturing facility established",
                  icon: <FaIndustry />,
                },
                {
                  year: "2023",
                  event: "Expanded operations to European markets",
                  icon: <FaGlobeEurope />,
                },
                {
                  year: "2025",
                  event: "Launched oncology division with 10+ products",
                  icon: <FaMicroscope />,
                },
                {
                  year: "2030",
                  event: "Vision to become top 50 global pharma company",
                  icon: <FaBullseye />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 p-6 rounded-2xl shadow-lg"
                >
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <h3 className="text-2xl font-bold text-[#E2004F] mb-2">{item.year}</h3>
                  <p className="text-gray-600">{item.event}</p>
                </motion.div>
              ))}
            </div>

            {/* Desktop timeline */}
            <div className="hidden md:block">
              {[
                {
                  year: "2018",
                  event: "Company founded with vision for global pharmaceutical excellence",
                  icon: <FaRocket />,
                },
                {
                  year: "2020",
                  event: "First WHO-GMP certified manufacturing facility established",
                  icon: <FaIndustry />,
                },
                {
                  year: "2023",
                  event: "Expanded operations to European markets",
                  icon: <FaGlobeEurope />,
                },
                {
                  year: "2025",
                  event: "Launched oncology division with 10+ products",
                  icon: <FaMicroscope />,
                },
                {
                  year: "2030",
                  event: "Vision to become top 50 global pharma company",
                  icon: <FaBullseye />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center mb-16 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <span className="text-4xl mb-2 block">{item.icon}</span>
                      <h3 className="text-3xl font-bold text-[#E2004F] mb-2">{item.year}</h3>
                      <p className="text-gray-600">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#19a6b5] rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ CERTIFICATIONS - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gray-50 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Global Certifications
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Meeting international quality standards across all operations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {["EU-GMP", "WHO-GMP", "ISO 9001", "ISO 14001", "HACCP", "PIC/S"].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 md:w-16 mx-auto mb-2 sm:mb-3 md:mb-4 bg-[#0d2d47]/5 rounded-full flex items-center justify-center group-hover:bg-[#0d2d47] transition-colors duration-300">
                  <svg className="w-5 h-5 sm:w-6 md:w-8 text-[#0d2d47] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="font-semibold text-[#0d2d47] text-xs sm:text-sm md:text-lg">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9️⃣ BIG STATEMENT - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-[#0d2d47] text-center text-white px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            “Driven by Innovation.<br />Powered by Quality.”
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Ivexia stands at the forefront of pharmaceutical advancement, committed to improving global health outcomes.
          </p>
        </motion.div>
      </section>

      {/* 🔟 FACILITIES PARALLAX - Enhanced */}
      <section className="relative py-24 sm:py-32 md:py-48 bg-fixed bg-center bg-cover text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581093502863-50b395c221e5?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#0d2d47]/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            State-of-the-Art Facilities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            Designed to meet and exceed global regulatory compliance standards, our facilities represent the pinnacle of pharmaceutical manufacturing excellence.
          </p>
        </motion.div>
      </section>

      {/* 11️⃣ R&D LABS - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Innovation Hub
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Research & Development
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Pushing boundaries in pharmaceutical research
            </p>
          </motion.div>
          <AutoScrollLabs />
        </div>
      </section>

      {/* 12️⃣ SUSTAINABILITY - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-[#f0f9f7] to-white px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Environment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4 sm:mb-6 leading-tight">
              Commitment to Sustainability
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              We prioritize eco-friendly manufacturing processes and responsible sourcing. Our facilities are designed to minimize environmental impact while maximizing efficiency.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#19a6b5] rounded-full"></div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">Zero-waste manufacturing initiatives</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#19a6b5] rounded-full"></div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">Solar-powered facilities</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#19a6b5] rounded-full"></div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">Sustainable packaging solutions</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative order-1 md:order-2"
          >
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-[#19a6b5]/10 rounded-full"></div>
            <Image
              src="/images/sustainability.jpg"
              width={600}
              height={400}
              alt="Sustainability"
              className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover relative z-10 w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* 13️⃣ GLOBAL PRESENCE - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 text-center px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Worldwide Reach
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Global Presence
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Serving patients in over 50 countries across 6 continents
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative px-4 sm:px-0"
          >
            <Image
              src="/images/worldmap.jpg"
              width={900}
              height={500}
              alt="World Map"
              className="mx-auto rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* 14️⃣ AWARDS - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gray-50 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10 sm:mb-16">
            <span className="text-[#E2004F] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-2 sm:mb-4 block">
              Recognition
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d2d47] mb-3 sm:mb-4">
              Awards & Recognition
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Celebrating excellence in pharmaceutical innovation
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { award: "Pharmaceutical Excellence Award 2023", org: "Global Health Council", year: "2023" },
              { award: "Innovation in Manufacturing", org: "Pharma Leaders Forum", year: "2022" },
              { award: "Best Emerging Pharma Company", org: "Healthcare Asia", year: "2024" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 md:w-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#E2004F] to-[#FF7A00] rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 md:w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0d2d47] text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{item.award}</h3>
                <p className="text-[#E2004F] font-medium text-xs sm:text-sm mb-1">{item.org}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{item.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 15️⃣ CTA - Enhanced */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-r from-[#0d2d47] to-[#1a3a5a] text-center text-white px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Partner With Us
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed px-4">
            Join us in delivering quality healthcare solutions worldwide. Together, we can make a difference in global health.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0d2d47] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Contact Us
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}