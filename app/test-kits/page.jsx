import TestKitsPageClient from "@/components/TestKitsPageClient";

export const metadata = {
  title: "Diagnostic Test Kits | Ivexia Pharma",
  description:
    "Explore Ivexia Pharma's diagnostic test kits, including rapid tests, fertility tests, infectious disease tests, and drug-of-abuse screening products.",
  alternates: {
    canonical: "https://www.ivexiapharma.com/test-kits",
  },
};

export default function TestKitsPage() {
  return <TestKitsPageClient initialTestKits={[]} />;
}
