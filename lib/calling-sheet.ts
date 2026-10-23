import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";

export type CallRecord = {
  srNo: string;
  campaign: string;
  course: string;
  stream: string;
  leadSource: string;
  leadType: string;
  name: string;
  phone: string;
  counselorL1: string;
  dateL1: string;
  remarkL1: string;
  detailedRemarkL1: string;
  dateL2: string;
  counselorL2: string;
  remarkL2: string;
};

function getAuth() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
    : JSON.parse(readFileSync(path.join(process.cwd(), process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE!), "utf8"));
  return new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

export async function fetchCallRecords(): Promise<CallRecord[]> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });
  const tab = process.env.GOOGLE_SHEET_TAB!;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: `'${tab}'!A2:O`,
  });
  const rows = res.data.values || [];
  return rows
    .filter((r) => r[6] || r[7])
    .map((r) => ({
      srNo: r[0] || "",
      campaign: (r[1] || "").trim(),
      course: (r[2] || "").trim(),
      stream: (r[3] || "").trim(),
      leadSource: (r[4] || "").trim(),
      leadType: (r[5] || "").trim(),
      name: (r[6] || "").trim(),
      phone: (r[7] || "").trim(),
      counselorL1: (r[8] || "").trim(),
      dateL1: (r[9] || "").trim(),
      remarkL1: (r[10] || "").trim(),
      detailedRemarkL1: (r[11] || "").trim(),
      dateL2: (r[12] || "").trim(),
      counselorL2: (r[13] || "").trim(),
      remarkL2: (r[14] || "").trim(),
    }));
}
