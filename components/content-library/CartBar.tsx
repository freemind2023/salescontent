'use client';

import { MessageCircle, Trash2 } from 'lucide-react';
import type { ContentItem } from '@/lib/contentLibraryData';

interface Props {
  selectedItems: ContentItem[];
  onClear: () => void;
  onSend: () => void;
}

export default function CartBar({ selectedItems, onClear, onSend }: Props) {
  if (selectedItems.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B1F5C] border-t-2 border-yellow-400 shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-5xl mx-auto px-3 py-2">
        {/* Chips row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-yellow-400 text-xs font-bold whitespace-nowrap">
            {selectedItems.length} selected:
          </span>
          {selectedItems.map((item) => (
            <span
              key={item.id}
              className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full whitespace-nowrap"
            >
              {item.label.length > 28 ? item.label.slice(0, 28) + '…' : item.label}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-1.5">
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors min-h-[44px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
          <button
            onClick={onSend}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#25D366] text-white text-sm font-bold hover:bg-green-600 transition-colors min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            Send on WhatsApp →
          </button>
        </div>
      </div>
    </div>
  );
}
