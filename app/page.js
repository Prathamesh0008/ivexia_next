//ivexia\app\page.js
"use client";

import Hero from "@/components/Hero";
import IvexiaNumbers from "@/components/IvexiaNumbers";
import AboutVideo from "@/components/AboutVideo";
import TherapyGroups from "@/components/TherapyGroups";
import AccordSection from "@/components/AccordSection";
import LeadershipSection from "@/components/LeadershipSection";
import ResearchManufacturingSection from "@/components/ResearchManufacturingSection";
import LatestFromIvexia from "@/components/LatestFromIvexia";
import CustomerStrip from "@/components/CustomerStrip";

export default function Page() {
  return (
    <div >
      <Hero />
      <IvexiaNumbers />
      <CustomerStrip/>
      <AboutVideo />
      <TherapyGroups />
      <AccordSection />
      <LeadershipSection />
      <ResearchManufacturingSection />
      <LatestFromIvexia />
    </div>
  );
}