import { NextRequest, NextResponse } from "next/server";
import { fetchCallRecords } from "@/lib/calling-sheet";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("cr_auth")?.value;
  if (cookie !== process.env.CALLING_REPORT_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const records = await fetchCallRecords();
    return NextResponse.json({ records, fetchedAt: new Date().toISOString() });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed to fetch sheet";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
