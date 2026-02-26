"use client";

export default function IngredientQualityStrip() {
  const items = [
    {
      title: "Quality-First Manufacturing",
      desc: "GMP-aligned processes with strong quality systems and traceability.",
    },
    {
      title: "Documentation Support",
      desc: "COA, MSDS and supporting docs available as per product requirements.",
    },
    {
      title: "Reliable Global Supply",
      desc: "Flexible quantities and export support for long-term partnerships.",
    },
  ];

  return (
    <section className="bg-[#FFF8F5] py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid gap-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="
                relative bg-white
                border border-[#0d2d47]
                shadow-[0_4px_18px_rgba(0,0,0,0.08)]
                hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                transition rounded-none
                h-[220px]
                max-w-[280px]
                mx-auto
                flex flex-col items-center justify-center
                px-6 py-8 text-center
              "
            >
              <div className="h-[2px] w-12 bg-[#FF7A00] mb-6 self-start ml-2" />

              <h3 className="text-[#0d2d47] font-bold text-lg leading-tight">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-[#0d2d47]/80 max-w-sm">
                {item.desc}
              </p>

              <div className="h-[2px] w-12 bg-[#FF7A00] mt-6 self-end mr-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}