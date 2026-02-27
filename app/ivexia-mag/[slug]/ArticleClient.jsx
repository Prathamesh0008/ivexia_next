//ivexia\app\ivexia-mag\[slug]\ArticleClient.jsx
"use client";

import Image from "next/image";

export default function ArticleClient({ article, details }) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-[#0d2d47] mb-4">
        {details.title}
      </h1>

      {/* META */}
      <p className="text-sm text-gray-500 mb-6">
        {details.date} • {details.readTime}
      </p>

      {/* HERO IMAGE */}
      <Image
        src={article.image}
        width={1000}
        height={500}
        alt={details.title}
        className="rounded-xl my-10"
      />

      {/* HERO CAPTION */}
      <p className="text-gray-600 italic mb-10">
        {details.heroCaption}
      </p>

      {/* SECTIONS */}
      {details.sections.map((section, index) => (
        <div key={index} className="mb-10">

          {/* Heading */}
          {section.heading && (
            <h2 className="text-2xl font-semibold text-[#0d2d47] mb-4">
              {section.heading}
            </h2>
          )}

          {/* Subheading */}
          {section.subheading && (
            <h3 className="text-xl font-semibold text-[#E2004F] mb-4">
              {section.subheading}
            </h3>
          )}

          {/* Paragraphs */}
          {section.paragraphs &&
            section.paragraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}

          {/* List Items */}
          {section.items && (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

    </div>
  );
}