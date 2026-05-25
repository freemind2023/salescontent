'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function extractWAMessage(text: string): string | null {
  // Match ```whatsapp (with any whitespace after) ... ``` — handles \n, \r\n, spaces
  const match = text.match(/```whatsapp[\s\S]*?\n([\s\S]*?)```/i)
    || text.match(/```whatsapp\s+([\s\S]*?)```/i)
    || text.match(/```\s*whatsapp\s*\n([\s\S]*?)```/i);
  return match ? match[1].trim() : null;
}

function stripWABlock(text: string): string {
  return text
    .replace(/```whatsapp[\s\S]*?```/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim();
}

function buildWAUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// Render plain text with proper line breaks
function TextWithBreaks({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n');
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          {line || <>&nbsp;</>}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  const waMessage = !isUser ? extractWAMessage(msg.content) : null;
  const displayText = (waMessage ? stripWABlock(msg.content) : msg.content).trim();

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400 bg-[#0B1F5C]">
          <Image src="/aryan-avatar.jpg" alt="Aryan" width={28} height={28} className="object-cover w-full h-full" />
        </div>
      )}
      <div className={`flex flex-col gap-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        {displayText && (
          <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed
            ${isUser
              ? 'bg-[#0B1F5C] text-white rounded-br-sm'
              : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
            }`}>
            <TextWithBreaks text={displayText} />
          </div>
        )}
        {waMessage && (
          <div className="bg-[#e7ffd9] border border-green-200 rounded-2xl rounded-bl-sm overflow-hidden w-full">
            {/* Header */}
            <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1.5 border-b border-green-200">
              <FaWhatsapp className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">WhatsApp Message — Ready to Send</span>
            </div>
            {/* Message body */}
            <div className="px-3 py-2.5">
              <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                {waMessage}
              </p>
            </div>
            {/* Send button */}
            <a
              href={buildWAUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-xs font-bold py-2.5 hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              Open in WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  'My lead is a B.Com student interested in Dubai placement',
  'Parent asking about fees and OJT stipend for B.Com',
  'Science student curious about B.Sc. AI program',
  'MBA enquiry — working professional, evening batch',
];

export default function AryanChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setMessages([{
        role: 'assistant',
        content: `Hey! 👋 I'm Aryan, your PES sales buddy.\n\nTell me about your lead — their interest, background, or any concern — and I'll instantly draft a WhatsApp message with the right resources for you to send! 🚀`,
      }]);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (open) inputRef.current?.focus();
  }, [messages, open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/aryan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content || 'Sorry, something went wrong. Try again!',
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Connection error. Check your internet and try again.`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-[60] flex items-center gap-2 bg-[#0B1F5C] text-white pl-2 pr-4 py-2 rounded-full shadow-2xl hover:scale-105 transition-transform border-2 border-yellow-400"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0 bg-white">
            <Image src="/aryan-avatar.jpg" alt="Aryan" width={36} height={36} className="object-cover w-full h-full" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-yellow-400 leading-none">Ask Aryan</p>
            <p className="text-[10px] text-white/70">AI Sales Assistant</p>
          </div>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-[70] flex flex-col bg-gray-50 shadow-2xl border border-gray-200
            /* mobile: bottom sheet */
            inset-x-0 bottom-0 h-[88dvh] rounded-t-2xl
            /* desktop: side panel */
            sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[380px] sm:h-[600px] sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0B1F5C] rounded-t-2xl sm:rounded-t-2xl flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 bg-white">
                <Image src="/aryan-avatar.jpg" alt="Aryan" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-[#0B1F5C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Aryan</p>
              <p className="text-[10px] text-yellow-400">PES AI Sales Assistant · Online</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400 bg-[#0B1F5C]">
                  <Image src="/aryan-avatar.jpg" alt="Aryan" width={28} height={28} className="object-cover w-full h-full" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                  <Loader2 className="w-4 h-4 text-[#0B1F5C] animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — only when no user messages sent yet */}
          {messages.length <= 1 && !loading && (
            <div className="px-3 pb-2 flex flex-col gap-1.5 flex-shrink-0">
              <p className="text-[10px] text-gray-400 font-semibold px-1">QUICK EXAMPLES</p>
              <div className="flex flex-col gap-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-200 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Describe your lead..."
              disabled={loading}
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-10 h-10 flex items-center justify-center bg-[#0B1F5C] text-white rounded-xl hover:bg-blue-900 disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
