"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LeadershipSection() {
  const { translations } = useLanguage();

  const team = translations?.leadership?.team || [];

  // ✅ images defined once (best practice)
  const images = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/47.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/men/29.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/83.jpg",
    "https://randomuser.me/api/portraits/women/52.jpg",
    "https://randomuser.me/api/portraits/men/53.jpg",
    "https://randomuser.me/api/portraits/women/32.jpg",
    "https://randomuser.me/api/portraits/men/64.jpg",
  ];

  return (
    <section className="relative text-white overflow-hidden">
      
      {/* CEO Background Section */}
      <div
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-16 py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.8)), url('/images/ceo.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          {translations?.leadership?.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed"
        >
          {translations?.leadership?.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <h3 className="text-2xl font-semibold text-[#FF7A00]">
            {translations?.leadership?.ceo?.name}
          </h3>
          <p className="text-sm text-gray-400">
            {translations?.leadership?.ceo?.title}
          </p>
        </motion.div>
      </div>

      {/* Team Grid Section */}
      <div className="relative z-10 -mt-16 md:-mt-24 bg-[#0d2d47] bg-opacity-95 py-20 px-6 md:px-16 rounded-t-[40px] shadow-inner">
        
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-white mb-2">
            {translations?.leadership?.team_heading}
          </h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            {translations?.leadership?.team_sub}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all hover:bg-white/20"
            >
              <img
                src={images[i] || "/images/default-avatar.png"}
                alt={member.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#19a6b5] mb-3"
              />

              <h4 className="text-base font-semibold text-white">
                {member.name}
              </h4>

              <p className="text-xs text-[#19a6b5] mb-2">
                {member.role}
              </p>

              <p className="text-[12px] text-gray-300 italic leading-snug">
                “{member.quote}”
              </p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />
    
    </section>
  );
}