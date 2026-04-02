import dbConnect from "@/lib/dbConnect";
import TestKit from "@/models/TestKit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const data = await TestKit.find().lean();
    return Response.json(data);
  } catch (error) {
    console.error("Failed to load test kits:", error);

    return Response.json(
      { error: "Failed to load test kits" },
      { status: 500 }
    );
  }
}
