"use client";

import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
const USER_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;

    const formData = {
      email: form.email.value,
      name: form.name.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      // 1️⃣ Send to Admin
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      // 2️⃣ Send confirmation to User
      await emailjs.send(
        SERVICE_ID,
        USER_TEMPLATE_ID,
        {
          to_name: formData.name,
          to_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
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
            Reach out to Ivexia Pharmaceuticals for inquiries and partnerships.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-stretch">

          {/* FORM */}
          <div className="bg-white shadow-sm border border-gray-100 p-8 flex flex-col">
            <h2 className="text-xl font-semibold text-[#0d2d47] mb-1">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border px-4 py-3"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border px-4 py-3"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                className="w-full rounded-xl border px-4 py-3"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0d2d47] to-[#19a6b5] text-white font-semibold"
              >
                {loading ? "Sending..." : "Submit"}
              </button>

              {success && (
                <p className="text-green-600 mt-3">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>

          {/* IMAGE */}
          <div className="relative overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/ivexia-factory1.jpg"
              alt="Ivexia Facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}