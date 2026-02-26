"use client";

import { motion } from "framer-motion";

export default function LeadershipSection() {
  const team = [
    {
      name: "Dr. Michael Carter",
      role: "Chief Scientific Officer",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Science and quality drive every decision we make.",
    },
    {
      name: "James Wilson",
      role: "Head of Operations",
      img: "https://randomuser.me/api/portraits/men/47.jpg",
      quote: "Operational excellence ensures reliable global supply.",
    },
    {
      name: "Sophia Bennett",
      role: "Director – Quality Assurance",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "Compliance and consistency are our strongest pillars.",
    },
    {
      name: "Daniel Hughes",
      role: "Manufacturing Lead",
      img: "https://randomuser.me/api/portraits/men/29.jpg",
      quote: "Precision manufacturing is the foundation of trust.",
    },
    {
      name: "Emily Parker",
      role: "Regulatory Affairs",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "We align with global standards to expand responsibly.",
    },
    {
      name: "Oliver Reed",
      role: "Supply Chain Manager",
      img: "https://randomuser.me/api/portraits/men/83.jpg",
      quote: "Strong logistics keep products moving without delays.",
    },
    {
      name: "Ava Collins",
      role: "R&D Program Manager",
      img: "https://randomuser.me/api/portraits/women/52.jpg",
      quote: "Innovation is a process — we improve every day.",
    },
    {
      name: "Ethan Brooks",
      role: "Business Development",
      img: "https://randomuser.me/api/portraits/men/53.jpg",
      quote: "Partnerships help us deliver impact in new markets.",
    },
    {
      name: "Mia Turner",
      role: "Clinical Strategy",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "Patient outcomes remain at the center of our mission.",
    },
    {
      name: "Henry Scott",
      role: "Finance & Planning",
      img: "https://randomuser.me/api/portraits/men/64.jpg",
      quote: "Sustainable growth supports long-term healthcare value.",
    },
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
          Leadership & Vision
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed"
        >
          Guided by experience and driven by innovation, our leadership team
          focuses on quality manufacturing, scientific excellence, and trusted
          global partnerships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <h3 className="text-2xl font-semibold text-[#FF7A00]">
            Mr. Avinaash Badal
          </h3>
          <p className="text-sm text-gray-400">Founder & CEO</p>
        </motion.div>
      </div>

      {/* Team Grid Section */}
      <div className="relative z-10 -mt-16 md:-mt-24 bg-[#0d2d47] bg-opacity-95 py-20 px-6 md:px-16 rounded-t-[40px] shadow-inner">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-white mb-2">
            Meet Our Team
          </h3>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            Dedicated professionals leading research, quality, operations and
            growth across global markets.
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
                src={member.img}
                alt={member.name}
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#19a6b5] mb-3"
              />

              <h4 className="text-base font-semibold text-white">
                {member.name}
              </h4>

              <p className="text-xs text-[#19a6b5] mb-2">{member.role}</p>

              <p className="text-[12px] text-gray-300 italic leading-snug">
                “{member.quote}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />
    </section>
  );
}