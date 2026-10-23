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
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "failed to fetch sheet" }, { status: 500 });
  }
}
