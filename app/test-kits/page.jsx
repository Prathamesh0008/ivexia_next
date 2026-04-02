import TestKitsPageClient from "@/components/TestKitsPageClient";
import { getFallbackTestKits } from "@/lib/catalogFallback";

export default function TestKitsPage() {
  return <TestKitsPageClient initialTestKits={getFallbackTestKits()} />;
}
