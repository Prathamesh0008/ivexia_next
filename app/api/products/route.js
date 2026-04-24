//
import dbConnect from "@/lib/dbConnect";
import { getFallbackProducts } from "@/lib/catalogFallback";
import Product from "@/models/Product";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const data = await Product.find().lean();

    if (data.length > 0) {
      return Response.json(data);
    }

    console.warn("Products collection is empty, serving fallback data.");
    return Response.json(getFallbackProducts());
  } catch (error) {
    console.error("Failed to load products:", error);
    return Response.json(getFallbackProducts());
  }
}
