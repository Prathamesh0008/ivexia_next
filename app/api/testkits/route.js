import dbConnect from "@/lib/dbConnect";
import { getFallbackTestKits } from "@/lib/catalogFallback";
import TestKit from "@/models/TestKit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const data = await TestKit.find().lean();

    if (data.length > 0) {
      return Response.json(data);
    }

    console.warn("Test kits collection is empty, serving fallback data.");
    return Response.json(getFallbackTestKits());
  } catch (error) {
    console.error("Failed to load test kits:", error);
    return Response.json(getFallbackTestKits());
  }
}
