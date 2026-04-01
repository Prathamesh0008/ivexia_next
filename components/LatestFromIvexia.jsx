"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import newsPosts from "@/data/news";

export default function LatestFromIvexia() {
  const router = useRouter();

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47] mb-3">
          Latest From Ivexia
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Updates from our research, manufacturing, and key therapeutic focus areas.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {newsPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="bg-white shadow-md hover:shadow-2xl rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-2 transition-all"
          >
            {/* Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs uppercase text-[#19a6b5] font-medium mb-2">
                {post.category}
              </p>

              <h3 className="text-lg font-semibold text-[#0d2d47] mb-3">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-5">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  <span>{post.date}</span>
                </div>

                <button
                  onClick={() => router.push(`/news/${post.slug}`)}
                  className="text-[#E2004F] cursor-pointer font-medium flex items-center gap-1 hover:gap-2 transition"
                >
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}