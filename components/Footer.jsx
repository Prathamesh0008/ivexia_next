"use client";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const contact = {
    address: "Global Pharmaceutical Headquarters",
    email: "info@ivexia.com",
    phone: "+1 234 567 890",
    social: ["#", "#", "#", "#"],
  };

  return (
    <footer className="relative bg-[#0d2d47] text-white overflow-hidden">
      
      {/* Top Accent Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center md:text-left items-start">

          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Image
              
  src="/images/Websiteivexia1.png"
              alt="Ivexia Logo"
              width={220}
              height={220}
              className="w-[12vh] md:w-[22vh] h-auto object-contain mx-auto md:mx-0"
            />

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
              <span className="font-semibold text-white">Ivexia Pharmaceuticals</span>
              <br />
              Advancing Global Healthcare
              <br />
              Delivering innovation, quality and trust worldwide.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              {[FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href={contact.social[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2.5 rounded-full hover:bg-gradient-to-r hover:from-[#19a6b5] hover:to-[#E2004F] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#19a6b5] via-[#E2004F] to-[#FF7A00] rounded-full mt-3" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#FF7A00] uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {quickLinks.map((q) => (
                <li
                  key={q.label}
                  onClick={() => router.push(q.path)}
                  className="hover:text-white transform transition-all duration-300 cursor-pointer"
                >
                  {q.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#19a6b5] uppercase tracking-wide">
              Contact
            </h3>
            <ul className="text-gray-300 text-sm leading-relaxed space-y-2">
              <li>{contact.address}</li>
              <li>
                <span className="font-semibold text-white">Email:</span> info@ivexiapharma.com
              </li>
              {/* <li>
                <span className="font-semibold text-white">Phone:</span> {contact.phone}
              </li> */}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#0b2338] py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">Ivexia Pharmaceuticals</span> | All Rights Reserved
      </div>
    </footer>
  );
}