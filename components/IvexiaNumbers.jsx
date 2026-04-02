"use client";

import { useEffect, useState } from "react";

function Counter({ target, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        start = target;
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#E2004F]">
        {count}
        {suffix}
      </h2>
      <p className="text-gray-700 mt-2 font-medium">{label}</p>
    </div>
  );
}

export default function IvexiaNumbers() {
  const stats = [
    { target: 500, label: "Global Employees", suffix: "+" },
    { target: 120, label: "Finished Products", suffix: "+" },
    { target: 15, label: "Countries Served", suffix: "+" },
    { target: 8, label: "Manufacturing Facilities" },
    { target: 4, label: "R&D Centers" },
  ];

  return (
    <section className="bg-[#FFF8F5] py-16 md:py-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#333] mb-10">
        Ivexia in Numbers
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-8 md:px-20">
        {stats.map((item, i) => (
          <Counter
            key={i}
            target={item.target}
            label={item.label}
            suffix={item.suffix}
          />
        ))}
      </div>
    </section>
  );
}

// //ivexia\components\IvexiaNumbers.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";
// function Counter({ target, label, suffix = "" }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 2000;
//     const increment = target / (duration / 16);

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         clearInterval(timer);
//         start = target;
//       }
//       setCount(Math.floor(start));
//     }, 16);

//     return () => clearInterval(timer);
//   }, [target]);

//   return (
//     <div className="flex flex-col items-center text-center">
//       <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#E2004F]">
//         {count}
//         {suffix}
//       </h2>
//       <p className="text-gray-700 mt-2 font-medium">{label}</p>
//     </div>
//   );
// }

// export default function IvexiaNumbers() {
// const { translations } = useLanguage();

// const stats = [
//   { target: 500, label: translations?.ivexia_numbers?.employees, suffix: "+" },
//   { target: 120, label: translations?.ivexia_numbers?.products, suffix: "+" },
//   { target: 15, label: translations?.ivexia_numbers?.countries, suffix: "+" },
//   { target: 8, label: translations?.ivexia_numbers?.facilities },
//   { target: 4, label: translations?.ivexia_numbers?.rnd },
// ];

//   return (
//     <section className="bg-[#FFF8F5] py-16 md:py-20">
//       <h2 className="text-center text-3xl md:text-4xl font-bold text-[#333] mb-10">
//      {translations?.ivexia_numbers?.title}
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-8 md:px-20">
//         {stats.map((item, i) => (
//           <Counter
//             key={i}
//             target={item.target}
//             label={item.label}
//             suffix={item.suffix}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }