"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OfferingsOverviewPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Active Pharmaceutical Ingredients (API)",
      desc: "Explore our API portfolio built with quality, consistency, and global compliance in mind.",
      img: "/overview-api.jpg",
      btn: "Explore API",
      link: "/products/ingredient",
    },
    {
      title: "Finished Pharmaceutical Products",
      desc: "Discover our finished dosage portfolio including key therapeutic categories for global markets.",
      img: "/overview-products.jpg",
      btn: "View Products",
      link: "/products",
    },
    {
      title: "OTC & Consumer Healthcare",
      desc: "Browse OTC and consumer healthcare offerings designed for daily wellness and accessibility.",
      img: "/overview-otc.jpg",
      btn: "Explore OTC",
      link: "/otc",
    },
    {
      title: "Ivexia Magazine",
      desc: "Read updates, insights, and articles from Ivexia covering health, news, and innovation.",
      img: "/overview-mag.jpg",
      btn: "Read Magazine",
      link: "/ivexia-mag",
    },
    {
      title: "About Ivexia",
      desc: "Learn more about our mission, capabilities, leadership, and global presence.",
      img: "/overview-company.jpg",
      btn: "About Company",
      link: "/about",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative w-full h-[28vh] md:h-[55vh] overflow-hidden">
        <Image
          src="/overview-hero.jpg"
          alt="Offerings Overview"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg">
            Our Offerings
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <p className="text-gray-700 text-lg md:text-xl text-center max-w-3xl mx-auto mb-16">
          Explore Ivexia’s complete range — from APIs and finished formulations to OTC solutions,
          company information, and our magazine updates.
        </p>

        <div className="grid gap-16">
          {sections.map((s, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-10 items-center">
              {/* IMAGE */}
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg relative h-72 md:h-80">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0d2d47]">
                  {s.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg">{s.desc}</p>

                <button
                  onClick={() => router.push(s.link)}
                  className="mt-3 inline-block px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#FF7A00] to-[#E2004F] shadow-md cursor-pointer"
                  type="button"
                >
                  {s.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}