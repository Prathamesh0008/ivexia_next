//ivexia\components\IngredientAccord.jsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
export default function IngredientAccord() {
  const [openIndex, setOpenIndex] = useState(null);

 

const { translations } = useLanguage();

const faqList = [
  {
    q: translations?.ingredientFAQ?.q1 || "Do you provide COA and supporting documents?",
    a: translations?.ingredientFAQ?.a1 || "Yes, we provide COA and key documents based on product requirements and availability.",
  },
  {
    q: translations?.ingredientFAQ?.q2 || "Can you support custom packaging or labeling?",
    a: translations?.ingredientFAQ?.a2 || "Yes, custom packaging and labeling can be supported depending on MOQ and regulatory needs.",
  },
  {
    q: translations?.ingredientFAQ?.q3 || "Do you ship internationally?",
    a: translations?.ingredientFAQ?.a3 || "Yes, we support export documentation and international shipping options.",
  },
  {
    q: translations?.ingredientFAQ?.q4 || "How do I request pricing and availability?",
    a: translations?.ingredientFAQ?.a4 || "You can contact our team via the contact page.",
  },
];

  const toggle = (idx) =>
    setOpenIndex((current) => (current === idx ? null : idx));

  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-8 text-center">
       {translations?.ingredientFAQ?.heading || "Frequently Asked Questions"}
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 overflow-hidden bg-[#FFF8F5]"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-[#0d2d47]">{item.q}</span>
                <span className="ml-4 text-[#0d2d47] text-xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className={`px-5 text-gray-700 overflow-hidden transition-[max-height,opacity,padding] duration-500 ease-in-out ${
                  isOpen ? "max-h-48 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                }`}
              >
                <p className="text-sm md:text-base">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}