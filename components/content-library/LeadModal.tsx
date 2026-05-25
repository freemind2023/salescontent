'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, Eye, EyeOff } from 'lucide-react';
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

  const message = buildWAMessage(items, name, phone);
  const isValid = name.trim().length > 0 && /^\d{10}$/.test(phone.trim());

  const handleSend = () => {
    if (!isValid) return;
    window.open(buildWAUrl(phone, message), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col">
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
          {/* Lead Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Lead Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter lead's name"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-transparent">
              <span className="px-3 py-2.5 bg-gray-100 text-sm font-medium text-gray-700 border-r border-gray-300">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit number"
                className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Selected items summary */}
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

          {/* Message Preview */}
          <div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1F5C] hover:text-blue-700 transition-colors"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? 'Hide' : 'Preview'} WhatsApp Message
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
          {!isValid && name.trim() === '' && phone.trim() === '' && (
            <p className="text-xs text-gray-500 text-center mb-2">Enter lead&apos;s name and number to send</p>
          )}
          <button
            onClick={handleSend}
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[52px]
              ${isValid
                ? 'bg-[#25D366] text-white hover:bg-green-600 shadow-lg shadow-green-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <MessageCircle className="w-5 h-5" />
            Send on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
