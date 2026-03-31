//ivexia\components\Hero.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const heroRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) setNavbarHeight(nav.offsetHeight);

    const resizeHandler = () => {
      const navNow = document.querySelector("nav");
      if (navNow) setNavbarHeight(navNow.offsetHeight);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Enhanced banner data with more professional content
  const banners = [
    {
      id: 1,
      image: "https://i.pinimg.com/1200x/38/d4/10/38d4101d5771836ae8624e463696b4c9.jpg",
      color: "from-[#FF7A00]/80 to-[#E2004F]/80",
      gradient: "bg-gradient-to-r",
      title: "Innovating Healthcare Worldwide",
      subtitle: "Global Pharmaceutical Excellence",
      text: "We deliver high-quality pharmaceutical solutions with global reach and trusted standards, serving millions of patients across six continents.",
      cta: "Discover Our Impact",
      stats: [
        { value: "50+", label: "Countries" },
        { value: "200+", label: "Products" }
      ]
    },
    {
      id: 2,
      image: "https://i.pinimg.com/1200x/9e/30/12/9e30127d086fd974c7e1b06832d4bb90.jpg",
      color: "from-[#0d2d47]/80 to-[#19a6b5]/80",
      gradient: "bg-gradient-to-r",
      title: "Research Driven. Patient Focused.",
      subtitle: "Advanced R&D Capabilities",
      text: "Our state-of-the-art R&D and stringent quality systems ensure safe, effective products for diverse healthcare needs across therapeutic categories.",
      cta: "Explore Our Research",
      stats: [
        { value: "100+", label: "Researchers" },
        { value: "15+", label: "Patents" }
      ]
    },
    {
      id: 3,
      image: "https://i.pinimg.com/1200x/2d/2d/85/2d2d85fb196588c54f7a60285511dec6.jpg",
      color: "from-[#E2004F]/80 to-[#FF7A00]/80",
      gradient: "bg-gradient-to-r",
      title: "Manufacturing Excellence at Scale",
      subtitle: "WHO-GMP Certified Facilities",
      text: "Modern manufacturing facilities and strict regulatory compliance support reliable global supply chains with consistent quality standards.",
      cta: "View Our Facilities",
      stats: [
        { value: "3", label: "Continents" },
        { value: "100%", label: "Compliance" }
      ]
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000); // Slightly longer for better readability
    return () => clearInterval(interval);
  }, [isHovered, banners.length]);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50)
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    if (touchEndX.current - touchStartX.current > 50)
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[85vh] md:h-[80vh] overflow-hidden bg-[#0d2d47] "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides with AnimatePresence for smoother transitions */}
      <AnimatePresence mode="wait">
        {banners.map((slide, index) => (
          index === currentIndex && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Background Image with Parallax Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 8s ease-out'
                }}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className={`absolute inset-0 ${slide.gradient} ${slide.color} mix-blend-multiply`} />
              
              {/* Additional overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Content Container */}
              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-6 sm:px-10 md:px-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-3xl"
                  >
                    {/* Subtitle */}
                    <span className="inline-block text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 border-l-4 border-white pl-4">
                      {slide.subtitle}
                    </span>
                    
                    {/* Main Title */}
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-gray-100 text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                      {slide.text}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex gap-8 mb-10">
                      {slide.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-[#0d2d47] px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <span>{slide.cta}</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-white"
          style={{ backgroundColor: banners[currentIndex]?.color.includes('FF7A00') ? '#FF7A00' : '#FFFFFF' }}
        />
      </div>

      {/* Enhanced Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group relative cursor-pointer"
            aria-label={`Slide ${i + 1}`}
          >
            <span 
              className= {`block h-2 rounded-full cursor-pointer transition-all duration-300  ${
                currentIndex === i 
                  ? "w-12 bg-white" 
                  : "w-4 bg-white/40 group-hover:bg-white/60 group-hover:w-6"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden cursor-pointer  md:flex absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 z-30 group"
        aria-label="Previous slide"
      >
        <span className="text-3xl pb-2  ">‹</span>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex cursor-pointer absolute right-8  top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 z-30 group"
        aria-label="Next slide"
      >
        <span className="text-3xl pb-2  ">›</span>
      </button>

      {/* Slide Counter */}
      {/* <div className="absolute top-8 right-8 z-30 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        <span className="text-white text-sm font-medium">
          {String(currentIndex + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
        </span>
      </div> */}

      {/* Scroll Indicator */}
      {/* <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 right-8 z-30 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest">
          <span>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div> */}
    </section>
  );
}