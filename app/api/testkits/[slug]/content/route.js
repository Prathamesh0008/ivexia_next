import { getDetailContent } from "@/lib/detailContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "en";

  const content = await getDetailContent({
    group: "data3",
    collectionKey: "testKits",
    slug,
    language,
  });

  if (!content) {
    return Response.json(
      { error: "Test kit content not found" },
      { status: 404 }
    );
  }

  return Response.json(content, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
