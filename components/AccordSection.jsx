// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import { useRef, useState, useEffect, useMemo } from "react";
// import * as THREE from "three";
// import Link from "next/link";
// import { useLanguage } from "@/contexts/LanguageContext";

// /* =========================
//    GLOBE COMPONENT WITH PROCEDURAL CONTINENTS
// ========================= */
// function Globe({ targetRotation }) {
//   const globeRef = useRef();

//   // Procedural Earth-like texture
//   const texture = useMemo(() => {
//     const canvas = document.createElement("canvas");
//     canvas.width = 2048;
//     canvas.height = 1024;
//     const ctx = canvas.getContext("2d");

//     // Ocean
//     const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//     gradient.addColorStop(0, "#0d2d47");
//     gradient.addColorStop(1, "#081520");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Continents color
//     ctx.fillStyle = "#2e7d32";

//     // === SIMPLE CONTINENTS ===

//     // North America
//     ctx.beginPath();
//     ctx.moveTo(200, 200);
//     ctx.bezierCurveTo(350, 100, 450, 200, 420, 300);
//     ctx.lineTo(300, 320);
//     ctx.lineTo(200, 260);
//     ctx.fill();

//     // South America
//     ctx.beginPath();
//     ctx.moveTo(350, 350);
//     ctx.lineTo(380, 500);
//     ctx.lineTo(320, 600);
//     ctx.lineTo(300, 450);
//     ctx.fill();

//     // Europe
//     ctx.beginPath();
//     ctx.moveTo(900, 200);
//     ctx.lineTo(950, 180);
//     ctx.lineTo(1000, 200);
//     ctx.lineTo(950, 240);
//     ctx.fill();

//     // Africa
//     ctx.beginPath();
//     ctx.moveTo(900, 260);
//     ctx.lineTo(1000, 260);
//     ctx.lineTo(1050, 400);
//     ctx.lineTo(950, 450);
//     ctx.lineTo(880, 350);
//     ctx.fill();

//     // Asia
//     ctx.beginPath();
//     ctx.moveTo(1050, 180);
//     ctx.lineTo(1400, 200);
//     ctx.lineTo(1450, 350);
//     ctx.lineTo(1200, 380);
//     ctx.lineTo(1050, 300);
//     ctx.fill();

//     // Australia
//     ctx.beginPath();
//     ctx.moveTo(1400, 600);
//     ctx.lineTo(1500, 620);
//     ctx.lineTo(1450, 680);
//     ctx.lineTo(1380, 650);
//     ctx.fill();

//     // Borders (light)
//     ctx.strokeStyle = "rgba(255,255,255,0.2)";
//     ctx.lineWidth = 1;
//     ctx.stroke();

//     const tex = new THREE.CanvasTexture(canvas);
//     tex.wrapS = THREE.RepeatWrapping;
//     tex.wrapT = THREE.ClampToEdgeWrapping;
//     return tex;
//   }, []);

//   useFrame(() => {
//     if (globeRef.current) {
//       globeRef.current.rotation.y +=
//         (targetRotation.current - globeRef.current.rotation.y) * 0.08;
//     }
//   });

//   return (
//     <mesh ref={globeRef}>
//       <sphereGeometry args={[2.2, 128, 128]} />
//       <meshStandardMaterial
//         map={texture}
//         roughness={0.6}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// }

// /* =========================
//    MAIN SECTION
// ========================= */
// export default function AccordSection() {
//   const { translations } = useLanguage();
//   const t = translations?.about?.video;
  
//   const targetRotation = useRef(0);
//   const [selectedContinent, setSelectedContinent] = useState("Asia");
//   const [hoveredContinent, setHoveredContinent] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Continent configuration with accurate rotation angles
//   const continents = [
//     { 
//       name: "Asia", 
//       rotation: 0,
//       description: "Serving 17 markets across East Asian, ASEAN and South Asian regions. Expanding footprint with focus on improving healthcare access.",
//       color: "#FF7A00",
//       stats: "50+ Products | 200+ Partners"
//     },
//     { 
//       name: "Europe", 
//       rotation: -1.2,
//       description: "Strong demand in Eastern European markets drives growth. Providing a new paradigm for affordable healthcare across the continent.",
//       color: "#E2004F",
//       stats: "30+ Products | 80+ Partners"
//     },
//     { 
//       name: "Africa", 
//       rotation: -1.8,
//       description: "Fastest growing pharmaceutical company on the continent. Strong network across West, North, East and South African markets.",
//       color: "#FF7A00",
//       stats: "40+ Products | 150+ Partners"
//     },
//     { 
//       name: "North America", 
//       rotation: 2.2,
//       description: "Large and small markets with specific needs. Unique capability for adaptation and innovation in healthcare delivery.",
//       color: "#E2004F",
//       stats: "60+ Products | 120+ Partners"
//     },
//     { 
//       name: "South America", 
//       rotation: 1.4,
//       description: "Growing focus on enhanced healthcare services. Timely delivery of pharmaceutical products fostering promising future.",
//       color: "#FF7A00",
//       stats: "25+ Products | 60+ Partners"
//     },
//     { 
//       name: "Australia", 
//       rotation: 3.0,
//       description: "Expanding presence in Oceania with quality healthcare solutions and innovative medical products.",
//       color: "#E2004F",
//       stats: "15+ Products | 40+ Partners"
//     },
//   ];

//   const handleContinentClick = (continent) => {
//     if (isAnimating) return;
    
//     setIsAnimating(true);
//     setSelectedContinent(continent.name);
//     targetRotation.current = continent.rotation;
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 800);
//   };

//   const selectedContinentData = continents.find(c => c.name === selectedContinent);

//   return (
//     <section className="bg-gradient-to-b from-[#0d2d47] to-[#0a1a2e] py-12 md:py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Section Header */}
//         <div className="text-center mb-10 md:mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
//             {t?.title || "Global Presence Across Continents"}
//           </h2>
//           <h3 className="text-xl md:text-2xl font-semibold mb-4 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent">
//             {t?.subtitle || "Explore Our Worldwide Healthcare Network"}
//           </h3>
//           <div className="w-24 h-1 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] mx-auto rounded-full"></div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
//           {/* LEFT SIDE - Continent Info & Controls */}
//           <div className="order-2 lg:order-1">
//             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
//               <h3 className="text-2xl font-bold text-white mb-4">Select a Continent</h3>
              
//               {/* Continent Buttons Grid */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
//                 {continents.map((continent, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleContinentClick(continent)}
//                     onMouseEnter={() => setHoveredContinent(continent)}
//                     onMouseLeave={() => setHoveredContinent(null)}
//                     className={`
//                       px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 text-sm md:text-base relative overflow-hidden group
//                       ${selectedContinent === continent.name
//                         ? 'bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white shadow-lg transform scale-105'
//                         : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
//                       }
//                     `}
//                   >
//                     <span className="relative z-10">{continent.name}</span>
//                     {selectedContinent === continent.name && (
//                       <span className="absolute inset-0 bg-white/20 animate-pulse" />
//                     )}
//                   </button>
//                 ))}
//               </div>
              
//               {/* Selected Continent Details */}
//               {selectedContinentData && (
//                 <div className="border-t cursor-pointer border-white/10 pt-6 animate-in slide-in-from-bottom-4 duration-500">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className={`
//                       w-4 h-4 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F]
//                       ${isAnimating ? 'animate-ping' : ''}
//                     `} />
//                     <h4 className="text-xl font-semibold text-white">
//                       {selectedContinentData.name}
//                     </h4>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
//                     {selectedContinentData.description}
//                   </p>
                  
//                   <div className="mb-6 p-4 bg-white/5 rounded-lg">
//                     <p className="text-[#FF7A00] text-sm font-semibold mb-1">Key Statistics</p>
//                     <p className="text-white text-sm">{selectedContinentData.stats}</p>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-3">
//                     <Link
//                       href={`/contact?region=${selectedContinentData.name.toLowerCase()}`}
//                       className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105 text-sm shadow-lg"
//                     >
//                       Partner in {selectedContinentData.name}
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT SIDE - 3D GLOBE WITH CONTINENTS */}
//           <div className="order-1 lg:order-2 h-[400px] md:h-[550px] relative">
//             <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
//               {/* Enhanced Lighting */}
//               <ambientLight intensity={0.5} />
//               <directionalLight position={[5, 5, 5]} intensity={1.2} />
//               <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#FF7A00" />
//               <pointLight position={[0, 2, 0]} intensity={0.3} />
              
//               {/* Main Globe */}
//               <Globe 
//                 targetRotation={targetRotation}
//                 selectedContinent={selectedContinent}
//                 hoveredContinent={hoveredContinent}
//               />
              
//               {/* Controls */}
//               <OrbitControls 
//                 enableZoom={true}
//                 enablePan={false}
//                 autoRotate={false}
//                 rotateSpeed={0.8}
//                 zoomSpeed={0.5}
//                 minDistance={4}
//                 maxDistance={9}
//                 enableDamping={true}
//                 dampingFactor={0.05}
//               />
//             </Canvas>
            
//             {/* Instruction Overlay */}
           
//           </div>
          
//         </div>
        
//         {/* Bottom CTA */}
//         <div className="text-center mt-12 md:mt-16">
//           <Link
//             href="/about"
//             className="inline-block cursor-pointer bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 transform shadow-lg"
//           >
//             {t?.cta || "Explore Ivexia's Global Impact"}
//           </Link>
//         </div>
        
//       </div>
//     </section>
//   );
// }






"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccordSection() {
  const { translations } = useLanguage();
  const t = translations?.about?.video;

  return (
    <section className="bg-[#0d2d47] p-5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">

        {/* LEFT TEXT */}
        <div className="text-center md:text-left">
          
          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
            {t?.title || "Shaping the Future of Global Healthcare"}
          </h2>

          {/* SUBTITLE (GRADIENT LINE) */}
          <h3 className="text-lg md:text-xl font-semibold mb-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent">
            {t?.subtitle || "Driven by Science. Powered by Innovation."}
          </h3>

          {/* PARAGRAPH */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto md:mx-0">
            {t?.paragraph ||
              "At Ivexia Pharmaceuticals, we are committed to advancing healthcare through innovation and global excellence."}
          </p>

          {/* CTA */}
          <Link
            href="/about"
            className="inline-block bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition"
          >
            {t?.cta || "Explore Ivexia"}
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/images/Globe New 2.png"
            alt="Ivexia Globe"
            width={460}
            height={460}
            className="w-[280px] sm:w-[350px] md:w-[460px] lg:w-[420px]"
            priority
          />
        </div>

      </div>
    </section>
  );
}



