import dbConnect from "@/lib/dbConnect";
import { getMongoErrorPayload } from "@/lib/mongoErrorPayload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await dbConnect();

    return Response.json(
      {
        ok: true,
        readyState: conn.connection.readyState,
        database: conn.connection.name,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return Response.json(getMongoErrorPayload(error), {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
