"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      label,
      path,
      isLast: index === segments.length - 1,
    };
  });

  return (
 <div className="bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 md:py-3">
        <nav className="flex items-center flex-wrap gap-1.5 text-[11px] md:text-sm">
          <Link href="/" className="font-medium text-[#0d2d47] hover:text-[#19a6b5]">
            Home
          </Link>

          {crumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              <span className="text-gray-400">/</span>

              {crumb.isLast ? (
                <span className="text-[#0d2d47] font-semibold">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-[#0d2d47] hover:text-[#19a6b5]"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}