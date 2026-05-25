'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { ALL_CONTENT, FILTER_TABS, type ContentItem, type ContentCategory } from '@/lib/contentLibraryData';
import ContentCard from '@/components/content-library/ContentCard';
import CartBar from '@/components/content-library/CartBar';
import LeadModal from '@/components/content-library/LeadModal';

const COURSES = [
  { name: 'Practical B.Com', duration: '3 Years', eligibility: '12th Pass', highlight: 'OJT ₹8k–₹15k/mo · Dubai Placement', waMsg: 'Hi! 👋 Sharing info about Practical B.Com at PES — 3-year program with OJT stipend ₹8k–15k/mo and Dubai placement! 🌍\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'Practical BBA', duration: '3 Years', eligibility: '12th Pass', highlight: 'Dubai Placement · Management', waMsg: 'Hi! 👋 Sharing info about Practical BBA at PES — industry-focused management program with Dubai placement! 💼\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'Practical BBA – IB', duration: '3 Years', eligibility: '12th Pass', highlight: 'International Business · Dubai', waMsg: 'Hi! 👋 Sharing info about Practical BBA International Business (BBA-IB) at PES — global business career with Dubai placement! 🌐\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'Applied MBA', duration: '2 Years', eligibility: 'Graduate', highlight: 'Evening Batches · 5 Tracks', waMsg: 'Hi! 👋 Sharing info about Applied MBA at PES — evening batches, 5 specialization tracks, industry-led curriculum! 🎓\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'Bridge Course', duration: '6 Months', eligibility: 'B.Com/BBA', highlight: 'Add-on · OJT Placement', waMsg: 'Hi! 👋 Sharing info about PES Bridge Course — a 6-month add-on with OJT placement for B.Com/BBA graduates! 🚀\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'B.Sc. AI & Automation', duration: '3 Years', eligibility: '12th Pass', highlight: 'AI Tools · Automation · OJT', waMsg: 'Hi! 👋 Sharing info about B.Sc. AI & Business Automation at PES — future-ready degree with hands-on AI & OJT! 🤖\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'Bachelor Hospitality', duration: '3 Years', eligibility: '12th Pass', highlight: 'Hotel/Travel · OJT · PMS Training', waMsg: 'Hi! 👋 Sharing info about Bachelor in Hospitality & Tourism at PES — 3-year program with OJT & international exposure! 🏨✈️\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
  { name: 'CA Article Placement', duration: '1 Month', eligibility: 'CA Students', highlight: 'CA Firm Placement · Fast-Track', waMsg: 'Hi! 👋 Sharing info about PES CA Article Placement program — fast-track placement with CA firms in Pune! ⚖️\n👉 https://www.practicaleduskills.com\n📞 +91-98909-59990' },
];

type FilterKey = 'all' | ContentCategory;

export default function ContentLibraryPage() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [courseRefOpen, setCourseRefOpen] = useState(false);

  const filtered = useMemo(() => {
    let items: ContentItem[] = ALL_CONTENT;
    if (activeFilter !== 'all') {
      items = items.filter((i) => i.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          (i.sublabel?.toLowerCase().includes(q) ?? false) ||
          (i.tag?.toLowerCase().includes(q) ?? false)
      );
    }
    return items;
  }, [activeFilter, search]);

  const selectedItems = useMemo(
    () => ALL_CONTENT.filter((i) => selectedIds.has(i.id)),
    [selectedIds]
  );

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* ── Header ── */}
      <header className="bg-[#0B1F5C] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-5xl mx-auto px-3 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0 bg-white">
            <Image src="/pes-logo.jpg" alt="PES Logo" width={40} height={40} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-yellow-400 leading-none">Sales Content Library</h1>
            <p className="text-[10px] text-white/70 mt-0.5">Select → Enter Lead Details → Send on WhatsApp</p>
          </div>
          {selectedIds.size > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-xl min-h-[40px] hover:bg-green-600 transition-colors flex-shrink-0"
            >
              <FaWhatsapp className="w-4 h-4" />
              Send ({selectedIds.size})
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="border-t border-white/10">
          <div className="flex overflow-x-auto scrollbar-hide px-3 py-2 gap-1.5">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as FilterKey)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap
                  ${activeFilter === tab.key
                    ? 'bg-yellow-400 text-[#0B1F5C]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 pt-3">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brochures, videos, links..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          />
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' ? ` in ${FILTER_TABS.find(t => t.key === activeFilter)?.label}` : ''}
          </p>
          {selectedIds.size > 0 && (
            <button onClick={() => setSelectedIds(new Set())} className="text-xs text-red-500 hover:text-red-700 font-medium">
              Clear all ({selectedIds.size})
            </button>
          )}
        </div>

        {/* Content Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filtered.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggle={toggleItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No items found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}

        {/* ── Course Quick Reference ── */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setCourseRefOpen(!courseRefOpen)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <span className="text-sm font-bold text-[#0B1F5C]">Course Quick Reference (for Sales Team)</span>
            </div>
            {courseRefOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {courseRefOpen && (
            <div className="border-t border-gray-200">
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0B1F5C] text-white">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-semibold text-xs">Course</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-xs">Duration</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-xs">Eligibility</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-xs">Key Highlight</th>
                      <th className="px-3 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.map((c, i) => (
                      <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2.5 font-semibold text-[#0B1F5C] text-xs">{c.name}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{c.duration}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{c.eligibility}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{c.highlight}</td>
                        <td className="px-3 py-2.5">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(c.waMsg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-[#25D366] text-white text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
                          >
                            <FaWhatsapp className="w-3 h-3" />
                            Share
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-gray-100">
                {COURSES.map((c) => (
                  <div key={c.name} className="px-4 py-3 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0B1F5C]">{c.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{c.duration} · {c.eligibility}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">{c.highlight}</p>
                    </div>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(c.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-[#25D366] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      <FaWhatsapp className="w-3 h-3" />
                      Share
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer space */}
        <div className="h-8" />
      </main>

      {/* Cart Bar */}
      <CartBar
        selectedItems={selectedItems}
        onClear={() => setSelectedIds(new Set())}
        onSend={() => setModalOpen(true)}
      />

      {/* Lead Modal */}
      <LeadModal
        items={selectedItems}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
