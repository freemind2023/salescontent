'use client';

import { Copy, ExternalLink, Check } from 'lucide-react';
import { FaYoutube, FaGlobe } from 'react-icons/fa';
import { FaFilePdf, FaBook, FaLink, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import type { ContentItem, ContentCategory } from '@/lib/contentLibraryData';

const CATEGORY_COLORS: Record<ContentCategory, string> = {
  'youtube-course': 'bg-red-600',
  'youtube-generic': 'bg-red-500',
  brochure: 'bg-orange-500',
  ebook: 'bg-teal-600',
  'landing-page': 'bg-blue-600',
  'social-media': 'bg-purple-600',
  contact: 'bg-gray-600',
};

const CATEGORY_BG: Record<ContentCategory, string> = {
  'youtube-course': 'bg-red-50 border-red-200',
  'youtube-generic': 'bg-red-50 border-red-200',
  brochure: 'bg-orange-50 border-orange-200',
  ebook: 'bg-teal-50 border-teal-200',
  'landing-page': 'bg-blue-50 border-blue-200',
  'social-media': 'bg-purple-50 border-purple-200',
  contact: 'bg-gray-50 border-gray-200',
};

function CategoryIcon({ category }: { category: ContentCategory }) {
  const cls = 'w-6 h-6';
  switch (category) {
    case 'youtube-course':
    case 'youtube-generic':
      return <FaYoutube className={`${cls} text-red-600`} />;
    case 'brochure':
      return <FaFilePdf className={`${cls} text-orange-500`} />;
    case 'ebook':
      return <FaBook className={`${cls} text-teal-600`} />;
    case 'landing-page':
      return <FaLink className={`${cls} text-blue-600`} />;
    case 'social-media':
      return <FaGlobe className={`${cls} text-purple-600`} />;
    case 'contact':
      return <FaMapMarkerAlt className={`${cls} text-gray-600`} />;
    default:
      return <FaGlobe className={`${cls} text-gray-600`} />;
  }
}

function TagBadge({ tag, category }: { tag?: string; category: ContentCategory }) {
  if (!tag) return null;
  const colorMap: Record<ContentCategory, string> = {
    'youtube-course': 'bg-red-100 text-red-700',
    'youtube-generic': 'bg-red-100 text-red-700',
    brochure: 'bg-orange-100 text-orange-700',
    ebook: 'bg-teal-100 text-teal-700',
    'landing-page': 'bg-blue-100 text-blue-700',
    'social-media': 'bg-purple-100 text-purple-700',
    contact: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colorMap[category]}`}>
      {tag}
    </span>
  );
}

interface Props {
  item: ContentItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function ContentCard({ item, isSelected, onToggle }: Props) {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.url);
      toast.success('Link copied!');
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-xl border-2 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer
        ${isSelected
          ? 'border-yellow-400 bg-yellow-50 shadow-yellow-200'
          : `border-transparent ${CATEGORY_BG[item.category]}`
        }`}
      onClick={() => onToggle(item.id)}
    >
      {/* Top stripe */}
      <div className={`h-1.5 w-full ${CATEGORY_COLORS[item.category]}`} />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-1">
          <CategoryIcon category={item.category} />
          <div className="flex items-center gap-1 ml-auto">
            <TagBadge tag={item.tag} category={item.category} />
            {isSelected && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400">
                <Check className="w-3 h-3 text-yellow-900" />
              </span>
            )}
          </div>
        </div>

        {/* Labels */}
        <div className="flex-1 min-h-0">
          <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">{item.label}</p>
          {item.sublabel && (
            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.sublabel}</p>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}
            className={`flex-1 text-[11px] font-semibold py-1.5 rounded-lg transition-colors min-h-[36px]
              ${isSelected
                ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                : 'bg-[#0B1F5C] text-white hover:bg-blue-900'
              }`}
          >
            {isSelected ? '✓ Added' : '+ Add to Share'}
          </button>
          <button
            onClick={handleCopy}
            title="Copy link"
            className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <Copy className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Open link"
            className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
