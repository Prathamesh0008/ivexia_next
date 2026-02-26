"use client";

export default function TherapyGroups() {
  const therapies = [
    {
      icon: "💓",
      title: "Cardiology",
      desc: "Comprehensive cardiovascular solutions focused on improving heart health and patient outcomes.",
    },
    {
      icon: "🧬",
      title: "Oncology",
      desc: "Advanced oncology formulations supporting innovative cancer treatment therapies.",
    },
    {
      icon: "🧠",
      title: "Neurology",
      desc: "Specialized neurological products addressing complex central nervous system conditions.",
    },
    {
      icon: "🩺",
      title: "Endocrinology",
      desc: "Effective treatments designed to manage hormonal and metabolic disorders.",
    },
    {
      icon: "🧴",
      title: "Dermatology",
      desc: "High-quality dermatological solutions for skin care and therapeutic treatments.",
    },
  ];

  return (
    <section className="relative bg-[#FFF8F5] py-20 md:py-24">
      
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />

      {/* Title Section */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-3">
          Our Therapy Areas
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-[#E2004F]">
            Focused Innovation.
          </span>{" "}
          Delivering specialized pharmaceutical solutions across key therapeutic segments.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-6 px-6 md:px-20 
                      lg:flex lg:flex-wrap lg:justify-center lg:items-stretch lg:gap-8">
        {therapies.map((item, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-2xl w-full lg:w-[300px] xl:w-[320px] p-8 text-center shadow-md hover:shadow-xl border border-gray-100 hover:border-transparent transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/10 to-[#E2004F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center justify-between h-full">
              
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#222] mb-2 group-hover:text-[#E2004F] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />
    </section>
  );
}