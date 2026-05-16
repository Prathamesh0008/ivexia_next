"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function BootLoader() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/navlogo.png"
          alt="Ivexia"
          width={220}
          height={72}
          priority
          className="h-14 w-auto object-contain"
        />
        <div className="mt-8 h-12 w-12 rounded-full border-4 border-[#E2004F]/20 border-t-[#E2004F] animate-spin" />
        <p className="mt-5 text-sm font-medium tracking-[0.18em] uppercase text-[#0d2d47]">
          Loading
        </p>
      </div>
    </div>
  );
}

export default function AppBootLayout({ children }) {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsBooting(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (isBooting) {
    return <BootLoader />;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="pt-[72px] min-h-screen text-[#0d2d47]">{children}</main>
      <Footer />
    </>
  );
}
