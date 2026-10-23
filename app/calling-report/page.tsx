"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { RefreshCw, Lock, Search, PhoneCall, PhoneMissed, CheckCircle2, Clock } from "lucide-react";

type CallRecord = {
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

const CONNECTED = ["Intrested", "Not Intrested", "Follow Up", "Call Back"];
const INVALID = ["Invalid Number", "Invalid Number ", "Invalid No", "Wrong No"];

function statusOf(remark: string): "connected" | "not_connected" | "invalid" | "pending" {
  if (!remark) return "pending";
  if (CONNECTED.includes(remark)) return "connected";
  if (INVALID.includes(remark)) return "invalid";
  return "not_connected";
}

function parseDMY(d: string): number {
  const [dd, mm, yyyy] = d.split("/").map(Number);
  if (!dd || !mm || !yyyy) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

export default function CallingReportPage() {
  const [authed, setAuthed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [records, setRecords] = useState<CallRecord[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [counselorFilter, setCounselorFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/calling-report/data", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRecords(data.records);
      setFetchedAt(data.fetchedAt);
      setAuthed(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/calling-report/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      loadData();
    } else {
      setAuthError("Incorrect password");
    }
  }

  const counselors = useMemo(
    () => Array.from(new Set(records.map((r) => r.counselorL1).filter(Boolean))).sort(),
    [records]
  );
  const sources = useMemo(
    () => Array.from(new Set(records.map((r) => r.leadSource).filter(Boolean))).sort(),
    [records]
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (search) {
        const q = search.toLowerCase();
        if (!r.name.toLowerCase().includes(q) && !r.phone.includes(q)) return false;
      }
      if (counselorFilter !== "All" && r.counselorL1 !== counselorFilter) return false;
      if (sourceFilter !== "All" && r.leadSource !== sourceFilter) return false;
      if (statusFilter !== "All" && statusOf(r.remarkL1) !== statusFilter) return false;
      if (fromDate || toDate) {
        const t = parseDMY(r.dateL1);
        if (fromDate && t < new Date(fromDate).getTime()) return false;
        if (toDate && t > new Date(toDate).getTime() + 86400000) return false;
      }
      return true;
    });
  }, [records, search, counselorFilter, sourceFilter, statusFilter, fromDate, toDate]);

  const stats = useMemo(() => {
    const total = filtered.length;
    let connected = 0,
      notConnected = 0,
      invalid = 0,
      pending = 0,
      followUp = 0,
      interested = 0;
    filtered.forEach((r) => {
      const s = statusOf(r.remarkL1);
      if (s === "connected") connected++;
      if (s === "not_connected") notConnected++;
      if (s === "invalid") invalid++;
      if (s === "pending") pending++;
      if (r.remarkL1 === "Follow Up") followUp++;
      if (r.remarkL1 === "Intrested") interested++;
    });
    const l2Done = filtered.filter((r) => r.dateL2).length;
    return { total, connected, notConnected, invalid, pending, followUp, interested, l2Done };
  }, [filtered]);

  const byCounselor = useMemo(() => {
    const map = new Map<string, { total: number; connected: number; interested: number; followUp: number }>();
    filtered.forEach((r) => {
      const key = r.counselorL1 || "Unassigned";
      if (!map.has(key)) map.set(key, { total: 0, connected: 0, interested: 0, followUp: 0 });
      const e = map.get(key)!;
      e.total++;
      const s = statusOf(r.remarkL1);
      if (s === "connected") e.connected++;
      if (r.remarkL1 === "Intrested") e.interested++;
      if (r.remarkL1 === "Follow Up") e.followUp++;
    });
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.total - a.total);
  }, [filtered]);

  const byDate = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((r) => {
      if (!r.dateL1) return;
      map.set(r.dateL1, (map.get(r.dateL1) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => parseDMY(a[0]) - parseDMY(b[0]))
      .slice(-14);
  }, [filtered]);

  const maxByDate = Math.max(1, ...byDate.map(([, c]) => c));

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [search, counselorFilter, sourceFilter, statusFilter, fromDate, toDate]);

  if (checkingAuth && !authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1F5C] px-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1F5C] px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0B1F5C]">
              <Image src="/pes-logo.jpg" alt="PES Logo" width={64} height={64} className="object-cover w-full h-full" />
            </div>
          </div>
          <h1 className="text-center text-lg font-bold text-[#0B1F5C] mb-1">Calling Report Dashboard</h1>
          <p className="text-center text-xs text-gray-500 mb-6">Enter password to continue</p>
          <form onSubmit={submitPassword} className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1F5C]"
                placeholder="Password"
                autoFocus
              />
            </div>
            {authError && <p className="text-xs text-red-500">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0B1F5C] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#132a73] transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0B1F5C] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/30">
              <Image src="/pes-logo.jpg" alt="PES Logo" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Calling Report Dashboard</h1>
              <p className="text-[11px] text-white/60 leading-tight">AI Digital Marketing Course 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {fetchedAt && (
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-white/60">
                <Clock className="w-3 h-3" />
                Updated {new Date(fetchedAt).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">{error}</div>}

        {/* KPI tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<PhoneCall className="w-5 h-5" />} label="Total Leads Called" value={stats.total} color="bg-[#0B1F5C]" />
          <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Connected" value={stats.connected} color="bg-green-600" sub={`${pct(stats.connected, stats.total)}%`} />
          <StatCard icon={<PhoneMissed className="w-5 h-5" />} label="Not Connected" value={stats.notConnected} color="bg-orange-500" sub={`${pct(stats.notConnected, stats.total)}%`} />
          <StatCard icon={<Clock className="w-5 h-5" />} label="Follow-ups Pending" value={stats.followUp} color="bg-yellow-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Interested" value={stats.interested} color="bg-emerald-600" />
          <StatCard icon={<PhoneMissed className="w-5 h-5" />} label="Invalid Numbers" value={stats.invalid} color="bg-gray-500" />
          <StatCard icon={<Clock className="w-5 h-5" />} label="L2 Calls Done" value={stats.l2Done} color="bg-indigo-600" />
          <StatCard icon={<PhoneCall className="w-5 h-5" />} label="Yet To Call" value={stats.pending} color="bg-rose-500" />
        </div>

        {/* Calls over time */}
        <section className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-bold text-[#0B1F5C] mb-3">Calls Made — Last 14 Active Days (Time Window)</h2>
          <div className="flex items-end gap-2 h-32">
            {byDate.map(([date, count]) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500">{count}</span>
                <div
                  className="w-full bg-[#0B1F5C] rounded-t"
                  style={{ height: `${Math.max(4, (count / maxByDate) * 90)}px` }}
                />
                <span className="text-[9px] text-gray-400 rotate-0">{date.slice(0, 5)}</span>
              </div>
            ))}
            {byDate.length === 0 && <p className="text-xs text-gray-400">No data in current filter</p>}
          </div>
        </section>

        {/* Counselor performance */}
        <section className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <h2 className="text-sm font-bold text-[#0B1F5C] mb-3">Counselor Performance</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#0B1F5C] text-white">
                <th className="px-3 py-2 text-left rounded-l-lg">Counselor</th>
                <th className="px-3 py-2 text-center">Calls Made</th>
                <th className="px-3 py-2 text-center">Connected</th>
                <th className="px-3 py-2 text-center">Interested</th>
                <th className="px-3 py-2 text-center">Follow Up</th>
                <th className="px-3 py-2 text-center rounded-r-lg">Connect %</th>
              </tr>
            </thead>
            <tbody>
              {byCounselor.map((c) => (
                <tr key={c.name} className="border-b border-gray-100 last:border-0">
                  <td className="px-3 py-2 font-semibold text-[#0B1F5C]">{c.name}</td>
                  <td className="px-3 py-2 text-center">{c.total}</td>
                  <td className="px-3 py-2 text-center text-green-600 font-semibold">{c.connected}</td>
                  <td className="px-3 py-2 text-center">{c.interested}</td>
                  <td className="px-3 py-2 text-center">{c.followUp}</td>
                  <td className="px-3 py-2 text-center">{pct(c.connected, c.total)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Filters */}
        <section className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-bold text-[#0B1F5C] mb-3">Call Records</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
            <div className="relative col-span-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name/phone"
                className="w-full pl-8 pr-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1F5C]"
              />
            </div>
            <select value={counselorFilter} onChange={(e) => setCounselorFilter(e.target.value)} className="border border-gray-200 rounded-lg text-xs px-2 py-2">
              <option>All</option>
              {counselors.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="border border-gray-200 rounded-lg text-xs px-2 py-2">
              <option>All</option>
              {sources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg text-xs px-2 py-2">
              <option value="All">All Status</option>
              <option value="connected">Connected</option>
              <option value="not_connected">Not Connected</option>
              <option value="invalid">Invalid</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex gap-1">
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border border-gray-200 rounded-lg text-xs px-1 py-2" />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border border-gray-200 rounded-lg text-xs px-1 py-2" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="px-2 py-2 text-left">Name</th>
                  <th className="px-2 py-2 text-left">Phone</th>
                  <th className="px-2 py-2 text-left">Source</th>
                  <th className="px-2 py-2 text-left">Counselor</th>
                  <th className="px-2 py-2 text-left">L1 Date</th>
                  <th className="px-2 py-2 text-left">Remark</th>
                  <th className="px-2 py-2 text-left">L2 Date</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-2 py-2 font-medium">{r.name || "—"}</td>
                    <td className="px-2 py-2 text-gray-500">{r.phone}</td>
                    <td className="px-2 py-2">{r.leadSource}</td>
                    <td className="px-2 py-2">{r.counselorL1}</td>
                    <td className="px-2 py-2">{r.dateL1}</td>
                    <td className="px-2 py-2">
                      <Badge remark={r.remarkL1} />
                    </td>
                    <td className="px-2 py-2">{r.dateL2 || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>
              {filtered.length} records — page {page} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function pct(n: number, total: number) {
  if (!total) return 0;
  return Math.round((n / total) * 100);
}

function StatCard({ icon, label, value, color, sub }: { icon: React.ReactNode; label: string; value: number; color: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
      <div className={`${color} text-white rounded-xl p-2.5 flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-lg font-bold text-[#0B1F5C] leading-tight">
          {value}
          {sub && <span className="text-xs text-gray-400 font-normal ml-1">({sub})</span>}
        </p>
        <p className="text-[11px] text-gray-500 leading-tight">{label}</p>
      </div>
    </div>
  );
}

function Badge({ remark }: { remark: string }) {
  if (!remark) return <span className="text-gray-400">Pending</span>;
  const s = statusOf(remark);
  const colorMap: Record<string, string> = {
    connected: "bg-green-100 text-green-700",
    not_connected: "bg-orange-100 text-orange-700",
    invalid: "bg-gray-100 text-gray-600",
    pending: "bg-gray-100 text-gray-400",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${colorMap[s]}`}>{remark}</span>;
}
