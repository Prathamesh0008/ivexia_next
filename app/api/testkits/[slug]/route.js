import { getTestKitBySlug } from "@/lib/catalogData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { slug } = await params;
  const testKit = getTestKitBySlug(slug);

  if (!testKit) {
    return Response.json({ error: "Test kit not found" }, { status: 404 });
  }

  return Response.json(testKit, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
