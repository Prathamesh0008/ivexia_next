"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EN from "@/data/finishedProducts";

const fallbackImage = "/images/medicineproduct.jpg";
const capsuleIcon = "/images/capsule.svg";

/* ================= ACCORDION ================= */
function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-medium text-[#0d2d47]">{title}</span>
        <span className={`text-2xl text-[#19a6b5] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FinishedProductDetail() {
  const { slug } = useParams();
  const product = EN.find((p) => p.slug === slug);

  const [activeTab, setActiveTab] = useState("introduction");
  const [openImportant, setOpenImportant] = useState(null);
  const [openPrecaution, setOpenPrecaution] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-medium text-[#0d2d47] mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-[#0d2d47] text-white text-sm rounded-md hover:bg-[#0d2d47]/90 transition-colors"
          >
            Back to Products
          </Link>
        </motion.div>
      </div>
    );
  }

  const imgSrc = product.image || fallbackImage;

  const importantInfo = [
    {
      title: "Storage Instructions",
      content:
        "Store below 25°C in a cool and dry place away from direct sunlight. Keep out of reach of children.",
    },
    {
      title: "Dosage Guidance",
      content:
        "Use strictly as prescribed by a healthcare professional. Do not exceed recommended dosage.",
    },
  ];

  const precautions = [
    {
      title: "Possible Side Effects",
      content:
        "Mild headache, nausea or dizziness may occur in some patients. Consult your doctor if symptoms persist.",
    },
    {
      title: "Medical Advice",
      content:
        "Consult your physician before starting this medication if you have pre-existing conditions or are taking other medications.",
    },
  ];

  const pharmacies = [
    "Apollo Pharmacy",
    "MedPlus",
    "Guardian Pharmacy",
    "NetMeds",
    "1mg",
    "PharmEasy",
  ];

  const tabs = [
    { id: "introduction", label: "Introduction" },
    { id: "indications", label: "Indications" },
    { id: "maintenance", label: "Maintenance" },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb with overlay style */}
      <div className="relative bg-[#0d2d47] py-3">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/20 to-[#E2004F]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/products" className="text-white/70 hover:text-white transition-colors">Products</Link>
            <span className="text-white/30">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with gradient background */}
      <section className="relative bg-gradient-to-br from-[#0d2d47] to-[#1a3a5a] py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 to-[#E2004F]/10" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="bg-white rounded-2xl p-8 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full max-w-[350px] h-[350px]"
                >
                  <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="inline-block text-white/80 text-sm font-medium tracking-[0.2em] uppercase mb-4 border-l-4 border-[#FF7A00] pl-4">
                    {product.category}
                  </span>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {product.name}
                  </h1>

                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#19a6b5] text-white text-xs rounded-full">
                      {product.dosage}
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">
                      Prescription Required
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-white/20 mb-6">
                    <div className="flex gap-6">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`pb-3 text-sm font-medium transition-colors relative ${
                            activeTab === tab.id
                              ? "text-white"
                              : "text-white/60 hover:text-white/80"
                          }`}
                        >
                          {tab.label}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#E2004F]"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="text-white/80 leading-relaxed min-h-[100px]">
                    {activeTab === "introduction" && (
                      <p>{product.description || "Product introduction coming soon."}</p>
                    )}
                    {activeTab === "indications" && (
                      <p>
                        This medicine is indicated for the treatment of conditions as prescribed by 
                        healthcare professionals under medical supervision.
                      </p>
                    )}
                    {activeTab === "maintenance" && (
                      <p>
                        Follow the prescribed maintenance dosage for long-term therapeutic effectiveness 
                        and optimal health outcomes.
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white px-8 py-4 rounded-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Request Quote
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information Grid with overlay style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#E2004F] font-semibold text-sm tracking-[0.2em] uppercase mb-3 block">
              Product Information
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#0d2d47]">
              Important Details
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Important Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-[#0d2d47] mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#FF7A00] to-[#E2004F] rounded-full" />
                Important Information
              </h3>
              <div className="space-y-4">
                {importantInfo.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    title={item.title}
                    content={item.content}
                    isOpen={openImportant === idx}
                    onToggle={() =>
                      setOpenImportant(openImportant === idx ? null : idx)
                    }
                  />
                ))}
              </div>
            </motion.div>

            {/* Precautions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-[#0d2d47] mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#FF7A00] to-[#E2004F] rounded-full" />
                Precautions & Side Effects
              </h3>
              <div className="space-y-4">
                {precautions.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    title={item.title}
                    content={item.content}
                    isOpen={openPrecaution === idx}
                    onToggle={() =>
                      setOpenPrecaution(openPrecaution === idx ? null : idx)
                    }
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pharmacies Section with gradient cards */}
      <section className="py-16 bg-gradient-to-br from-[#0d2d47] to-[#1a3a5a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/5 to-[#E2004F]/5" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Availability
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
              Available at Leading Pharmacies
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Find our products at these trusted pharmacy partners nationwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pharmacies.map((ph, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#FF7A00]/20 to-[#E2004F]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={capsuleIcon}
                    alt="Capsule"
                    width={24}
                    height={24}
                    className="opacity-80 group-hover:opacity-100 brightness-0 invert transition-all duration-300"
                  />
                </div>
                <p className="font-medium text-white text-sm mb-2">
                  {ph}
                </p>
                <button className="text-xs text-white/60 hover:text-white transition-colors">
                  Visit Store →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Suggestion with gradient line */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-sm text-gray-400">
                Need assistance? <Link href="/contact" className="text-[#19a6b5] hover:underline">Contact our team</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


// "use client";

// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import EN from "@/data/finishedProducts";

// const fallbackImage = "/images/medicineproduct.jpg";
// const capsuleIcon = "/images/capsule.svg";

// /* ================= ACCORDION ================= */
// function AccordionItem({ title, content, isOpen, onToggle }) {
//   return (
//     <div className="border bg-[#edf4ff] rounded-md overflow-hidden">
//       <button
//         onClick={onToggle}
//         className="w-full flex justify-between px-5 py-3 font-semibold text-[#0d2d47] hover:bg-[#0d2d47] hover:text-white transition"
//       >
//         {title}
//         <span>{isOpen ? "−" : "+"}</span>
//       </button>

//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           isOpen ? "max-h-40 p-4 bg-white" : "max-h-0"
//         }`}
//       >
//         <p className="text-sm text-gray-700">{content}</p>
//       </div>
//     </div>
//   );
// }

// export default function FinishedProductDetail() {
//   const { slug } = useParams();
//   const product = EN.find((p) => p.slug === slug);

//   const [activeTab, setActiveTab] = useState("introduction");
//   const [openImportant, setOpenImportant] = useState(null);
//   const [openPrecaution, setOpenPrecaution] = useState(null);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [slug]);

//   if (!product) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-2xl font-bold text-[#0d2d47]">
//             Product Not Found
//           </h1>
//           <Link
//             href="/products"
//             className="mt-4 inline-block px-5 py-2 bg-[#0d2d47] text-white rounded-full"
//           >
//             Back to Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const imgSrc = product.image || fallbackImage;

//   /* ================= STATIC CONTENT ================= */

//   const importantInfo = [
//     {
//       title: "Storage Instructions",
//       content:
//         "Store below 25°C in a cool and dry place away from direct sunlight.",
//     },
//     {
//       title: "Dosage Guidance",
//       content:
//         "Use strictly as prescribed by a healthcare professional.",
//     },
//   ];

//   const precautions = [
//     {
//       title: "Possible Side Effects",
//       content:
//         "Mild headache, nausea or dizziness may occur in some patients.",
//     },
//     {
//       title: "Medical Advice",
//       content:
//         "Consult your physician before starting this medication if you have pre-existing conditions.",
//     },
//   ];

//   const pharmacies = [
//     "Apollo Pharmacy",
//     "MedPlus",
//     "Guardian Pharmacy",
//     "NetMeds",
//     "1mg",
//     "PharmEasy",
//   ];

//   return (
//     <>
//       {/* ================= HERO SECTION ================= */}
//       <section className="bg-[#FFF8F5] py-14">
//         <div className="max-w-7xl mx-auto px-6 md:px-16">
//           <div className="bg-white shadow-sm p-10 grid lg:grid-cols-2 gap-10">

//             {/* IMAGE */}
//             <div className="flex justify-center">
//               <Image
//                 src={imgSrc}
//                 alt={product.name}
//                 width={400}
//                 height={400}
//                 className="object-contain"
//               />
//             </div>

//             {/* PRODUCT INFO */}
//             <div>
//               <h1 className="text-3xl font-bold text-[#0d2d47]">
//                 {product.name}
//               </h1>

//               <div className="mt-4 flex gap-3">
//                 <span className="bg-[#0d2d47] text-white px-3 py-1 text-xs rounded-full">
//                   {product.category}
//                 </span>
//                 <span className="bg-[#19a6b5]/20 px-3 py-1 text-xs rounded-full">
//                   {product.dosage}
//                 </span>
//               </div>

//               {/* TABS */}
//               <div className="mt-6 border-b flex gap-6">
//                 {["introduction", "indications", "maintenance"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`pb-2 border-b-2 capitalize ${
//                       activeTab === tab
//                         ? "border-[#19a6b5] font-semibold"
//                         : "border-transparent"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               <div className="mt-4 text-gray-700">
//                 {activeTab === "introduction" && (
//                   <p>{product.description || "Product introduction coming soon."}</p>
//                 )}
//                 {activeTab === "indications" && (
//                   <p>
//                     This medicine is used for therapeutic treatment under medical supervision.
//                   </p>
//                 )}
//                 {activeTab === "maintenance" && (
//                   <p>
//                     Follow the prescribed maintenance dosage for long-term effectiveness.
//                   </p>
//                 )}
//               </div>

//               <div className="mt-6">
//                 <Link
//                   href="/contact"
//                   className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white rounded-full"
//                 >
//                   Request Quote
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= IMPORTANT INFO ================= */}
//       <section className="bg-[#FFF8F5] py-14">
//         <div className="max-w-7xl mx-auto px-6 md:px-16">
//           <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
//             Important Information
//           </h2>

//           <div className="grid md:grid-cols-2 gap-4">
//             {importantInfo.map((item, idx) => (
//               <AccordionItem
//                 key={idx}
//                 title={item.title}
//                 content={item.content}
//                 isOpen={openImportant === idx}
//                 onToggle={() =>
//                   setOpenImportant(openImportant === idx ? null : idx)
//                 }
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= PRECAUTIONS ================= */}
//       <section className="bg-white py-14">
//         <div className="max-w-7xl mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-10">

//           <div>
//             <h2 className="text-2xl font-bold text-[#0d2d47] mb-6">
//               Precautions & Side Effects
//             </h2>

//             {precautions.map((item, idx) => (
//               <AccordionItem
//                 key={idx}
//                 title={item.title}
//                 content={item.content}
//                 isOpen={openPrecaution === idx}
//                 onToggle={() =>
//                   setOpenPrecaution(openPrecaution === idx ? null : idx)
//                 }
//               />
//             ))}
//           </div>

//           <div className="hidden lg:flex justify-center">
//             <Image
//               src={imgSrc}
//               alt={product.name}
//               width={300}
//               height={300}
//               className="object-contain"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= PHARMACIES ================= */}
//       <section className="bg-[#FFF8F5] py-16">
//         <div className="max-w-7xl mx-auto px-6 md:px-16">
//           <h2 className="text-2xl font-bold text-center text-[#0d2d47] mb-10">
//             List of Pharmacies
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pharmacies.map((ph, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-6 text-center shadow-sm border"
//               >
//                 <Image
//                   src={capsuleIcon}
//                   alt="Capsule"
//                   width={40}
//                   height={40}
//                   className="mx-auto mb-3"
//                 />

//                 <p className="font-semibold text-[#0d2d47] mb-3">
//                   {ph}
//                 </p>

//                 <button className="px-4 py-2 text-sm border border-[#19a6b5] text-[#19a6b5] rounded-full hover:bg-[#19a6b5] hover:text-white transition">
//                   Online Shopping
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }