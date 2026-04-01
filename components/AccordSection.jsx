"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccordSection() {
  return (
<section className="bg-[#0d2d47] p-5 ">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">

        {/* LEFT TEXT */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
            Building Global Partnerships
            <br />
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#E2004F] bg-clip-text text-transparent">
              Through Quality & Trust
            </span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto md:mx-0">
            Ivexia collaborates with healthcare partners worldwide to deliver
            reliable pharmaceutical solutions backed by innovation,
            compliance, and manufacturing excellence.
          </p>

          <Link
            href="/about"
            className="inline-block bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition"
          >
            Learn More
          </Link>
        </div>

        {/* RIGHT GLOBE IMAGE */}
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