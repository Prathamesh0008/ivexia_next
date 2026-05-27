import dbConnect from "@/lib/dbConnect";
import { getFallbackTestKits, normalizeTestKit } from "@/lib/catalogFallback";
import TestKit from "@/models/TestKit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mergeWithFallbackTestKits(data) {
  const normalizedData = data.map((testKit, index) =>
    normalizeTestKit(testKit, index)
  );
  const existingSlugs = new Set(normalizedData.map((testKit) => testKit.slug));
  const missingFallbacks = getFallbackTestKits().filter(
    (testKit) => testKit.slug && !existingSlugs.has(testKit.slug)
  );

  return [...normalizedData, ...missingFallbacks];
}

export async function GET() {
  try {
    await dbConnect();
    const data = await TestKit.find().lean();

    if (data.length > 0) {
      return Response.json(mergeWithFallbackTestKits(data));
    }

    console.warn("Test kits collection is empty, serving fallback data.");
    return Response.json(getFallbackTestKits());
  } catch (error) {
    console.error("Failed to load test kits:", error);
    return Response.json(getFallbackTestKits());
  }
}
