"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Fake submit simulation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      e.target.reset();
    }, 1000);
  };

  return (
    <div className="bg-[#FFF8F5] min-h-screen pt-20">
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
            Contact Us
          </h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            Reach out to Ivexia Pharmaceuticals for inquiries, partnerships,
            and global distribution opportunities.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-stretch">

          {/* LEFT: FORM */}
          <div className="bg-white shadow-sm border border-gray-100 p-8 flex flex-col">
            <h2 className="text-xl font-semibold text-[#0d2d47] mb-1">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Our team will respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-[#0d2d47] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#19a6b5] outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* NAME + PHONE */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#0d2d47] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#19a6b5] outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0d2d47] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#19a6b5] outline-none"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-sm font-medium text-[#0d2d47] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#19a6b5] outline-none"
                  placeholder="Subject"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-[#0d2d47] mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#19a6b5] outline-none resize-y"
                  placeholder="Write your message..."
                />
              </div>

              {/* BUTTON */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>

                {success && (
                  <p className="text-green-600 mt-3">
                    Message sent successfully!
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT: HERO IMAGE */}
          <div className="relative overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/contact-hero.jpg"
              alt="Ivexia Facility"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d47]/80 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="uppercase tracking-widest text-xs mb-2 opacity-80">
                Ivexia Pharmaceuticals
              </p>
              <h2 className="text-2xl font-semibold mb-2">
                Global Healthcare Partner
              </h2>
              <p className="text-sm max-w-sm opacity-90">
                Manufacturing excellence with international standards.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {/* CONTACT DETAILS */}
          <div className="bg-white border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0d2d47] mb-4">
              Contact Information
            </h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#0d2d47]" />
                <span>+91 9998887770</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#0d2d47]" />
                <span>info@ivexiapharma.com</span>
              </div>

              <div>
                <p className="font-semibold text-[#0d2d47] mb-2">Follow Us</p>
                <div className="flex gap-3">
                  <FaInstagram className="cursor-pointer" />
                  <FaWhatsapp className="cursor-pointer" />
                  <FaTelegramPlane className="cursor-pointer" />
                  <FaLinkedinIn className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0d2d47] mb-4">
              Office Address
            </h2>

            <div className="flex items-start gap-3 text-gray-700">
              <FaMapMarkerAlt className="mt-1 text-[#0d2d47]" />
              <p>
                14, P Box 3351 Chand Manzi,<br />
                14 Old Bandil Poora, Mandvi<br />
                Mumbai – 400003
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}