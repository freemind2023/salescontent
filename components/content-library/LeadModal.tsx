'use client';

import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWAMessage, buildWAUrl } from '@/lib/contentLibraryData';
import type { ContentItem } from '@/lib/contentLibraryData';

interface Props {
  items: ContentItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ items, isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [lang, setLang] = useState<'en' | 'mr'>('en');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowPreview(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const message = buildWAMessage(items, name, phone, lang);
  const isValid = name.trim().length > 0 && /^\d{10}$/.test(phone.trim());

  const handleSend = () => {
    if (!isValid) return;
    window.open(buildWAUrl(phone, message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col"
        style={{ color: '#171717' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="text-base font-bold text-[#0B1F5C]">Send to Lead</h2>
            <p className="text-xs text-gray-500">{items.length} item{items.length > 1 ? 's' : ''} selected</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Lead Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter lead's name"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 bg-white">
              <span className="px-3 py-2.5 bg-gray-100 text-sm font-medium text-gray-700 border-r border-gray-300">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit number"
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message Language</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors
                  ${lang === 'en' ? 'border-[#0B1F5C] bg-[#0B1F5C] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors
                  ${lang === 'mr' ? 'border-[#0B1F5C] bg-[#0B1F5C] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Selected items */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1.5">ITEMS TO SHARE ({items.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span key={item.id} className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  {item.label.length > 30 ? item.label.slice(0, 30) + '…' : item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1F5C] hover:text-blue-700 transition-colors"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? 'Hide' : 'Preview'} Message
            </button>
            {showPreview && (
              <div className="mt-2 p-3 bg-[#e7ffd9] rounded-xl text-xs text-gray-800 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto border border-green-200">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          {!isValid && (
            <p className="text-xs text-gray-500 text-center mb-2">Enter name and 10-digit WhatsApp number</p>
          )}
          <button
            onClick={handleSend}
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[52px]
              ${isValid ? 'bg-[#25D366] text-white hover:bg-green-600 shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <FaWhatsapp className="w-5 h-5" />
            {lang === 'mr' ? 'मराठीत WhatsApp वर पाठवा' : 'Send on WhatsApp (English)'}
          </button>
        </div>
      </div>
    </div>
  );
}
