"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LeadershipSection() {
  const { translations } = useLanguage();

  const team = translations?.leadership?.team || [];

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
      <div className="relative min-h-[80vh] md:min-h-[150vh] flex flex-col justify-center items-center text-center px-2 md:px-16 py-4 md:py-20 overflow-hidden bg-white">
        {/* Banner Image - No Side Crop */}
        <img
          src="/images/ceo.jpeg"
          alt="Leadership Banner"
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
      </div>

      {/* Team Grid Section */}
      <div className="relative z-10 -mt-2 md:-mt-12 bg-[#0d2d47] bg-opacity-95 py-4 md:py-20 px-2 md:px-16 rounded-t-[15px] md:rounded-t-[40px] shadow-inner">
        <div className="text-center mb-4 md:mb-12">
          <h3 className="text-lg md:text-3xl font-semibold text-white mb-1 md:mb-2">
            {translations?.leadership?.team_heading}
          </h3>

          <p className="text-gray-300 text-[11px] md:text-sm max-w-2xl mx-auto px-1 md:px-0">
            {translations?.leadership?.team_sub}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6 max-w-7xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg p-2 md:p-5 rounded-lg md:rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all hover:bg-white/20"
            >
              <img
                src={images[i] || "/images/default-avatar.png"}
                alt={member.name}
                className="w-12 h-12 md:w-20 md:h-20 mx-auto rounded-full object-cover border-2 border-[#19a6b5] mb-1 md:mb-3"
              />

              <h4 className="text-[11px] md:text-base font-semibold text-white">
                {member.name}
              </h4>

              <p className="text-[9px] md:text-xs text-[#19a6b5] mb-0.5 md:mb-2">
                {member.role}
              </p>

              <p className="text-[9px] md:text-[12px] text-gray-300 italic leading-tight md:leading-snug line-clamp-2 md:line-clamp-none">
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