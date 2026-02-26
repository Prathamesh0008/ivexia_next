"use client";

import Image from "next/image";

const customers = [
  { name: "Actoverco", logo: "/images/customers/actoverco.png" },
  { name: "Abidi", logo: "/images/customers/abidi.png" },
  { name: "Kharazmi", logo: "/images/customers/Kharazmi1.png" },
  { name: "Varian", logo: "/images/customers/Varian1.png" },
];

export default function CustomerStrip() {
  return (
    <section className="bg-[#FFF8F5] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47] text-center mb-12">
          Trusted by Customers
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {customers.map((c) => (
            <div
              key={c.name}
              className="relative h-24 md:h-28 w-[180px] md:w-[220px]"
            >
              <Image
                src={c.logo}
                alt={c.name}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}