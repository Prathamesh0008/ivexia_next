"use client";

import { useEffect, useRef, useState } from "react";

function useOnScreen(ref) {
  const [v, setV] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => setV(e.isIntersecting), {
      rootMargin: "-20%",
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);

  return v;
}

function Counter({ target, label, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const vis = useOnScreen(ref);

  useEffect(() => {
    if (!vis) return;
    const start = performance.now();
    const dur = 1200;

    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [vis, target]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center min-h-[90px]"
    >
      <h3 className="min-w-[5ch] text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#E2004F]">
        {val}
        {suffix}
      </h3>
      <p className="text-gray-700 mt-1 text-xs md:text-sm font-medium max-w-[9rem]">
        {label}
      </p>
    </div>
  );
}

export default function IngredientStats() {
  const stats = [
    { target: 120, label: "Products", suffix: "+" },
    { target: 15, label: "Therapy Areas", suffix: "+" },
    { target: 30, label: "Countries Served", suffix: "+" },
    { target: 100, label: "Documents Available", suffix: "+" },
    { target: 8, label: "Facilities" },
  ];

  return (
    <section className="bg-[#FFF8F5] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#333] mb-8">
          Ivexia in Numbers
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 place-items-center">
          {stats.map((s, i) => (
            <Counter key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}