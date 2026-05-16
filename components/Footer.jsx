"use client";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const router = useRouter();
  const { translations } = useLanguage();

  const t = translations?.footer || {};

  const quickLinks = [
    { label: t.links?.home || "Home", path: "/" },
    { label: t.links?.about || "About", path: "/about" },
    { label: t.links?.products || "Products", path: "/products" },
    { label: t.links?.contact || "Contact", path: "/contact" },
  ];

  const contact = {
    address: t.address || "Global Pharmaceutical Headquarters",
    email: "info@ivexia.com",
    phone: "+1 234 567 890",
    social: ["#", "#", "#", "#"],
  };

  return (
    <footer className="relative bg-[#0d2d47] text-white overflow-hidden">
      
      <div className="w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-left items-start">

          {/* Column 1 */}
       <div className="flex flex-col items-start space-y-4 w-full">
            <Image
              src="/images/Websiteivexia1.png"
              alt="Ivexia Logo"
              width={400}
              height={240}
             className="w-[170px] sm:w-[185px] md:w-[200px] lg:w-[220px] block -ml-2 sm:-ml-1 md:ml-0"
            />

           <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
  <span className="font-semibold text-white">
    {t.company || "Ivexia Pharmaceuticals"}
  </span>
  <br />
  {t.description
    ? t.description.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))
    : (
      <>
        Advancing Global Healthcare
        <br />
        Delivering innovation, quality and trust worldwide.
      </>
    )}
</p>

            {/* <div className="flex gap-4">
              {[FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/10 p-2.5 rounded-full hover:bg-gradient-to-r hover:from-[#19a6b5] hover:to-[#E2004F]">
                  <Icon size={15} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF7A00] uppercase">
              {t.quickLinks || "Quick Links"}
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {quickLinks.map((q) => (
                <li key={q.label} onClick={() => router.push(q.path)} className="cursor-pointer hover:text-white">
                  {q.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#19a6b5] uppercase">
           {t.contact || "Contact"}
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>{contact.address}</li>
              <li>
                <span className="font-semibold text-white">
                  {t.email || "Email"}:
                </span>{" "}
                info@ivexiapharma.com
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 bg-[#0b2338] py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">
          {t.company || "Ivexia Pharmaceuticals"}
        </span>{" "}
        | {t.rights || "All Rights Reserved"}
      </div>
    </footer>
  );
}










