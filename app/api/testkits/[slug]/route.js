import dbConnect from "@/lib/dbConnect";
import TestKit from "@/models/TestKit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    const testKit = await TestKit.findOne({ slug }).lean();

    if (!testKit) {
      return Response.json({ error: "Test kit not found" }, { status: 404 });
    }

    return Response.json(testKit, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to load test kit" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
