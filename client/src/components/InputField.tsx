import { useState, type FormEvent, useRef } from 'react';
import { Download, Loader2, Link2, X } from 'lucide-react';
import { isValidUrl } from '../lib/utils';

interface Props {
  onSubmit: (url: string) => Promise<void>;
  isLoading?: boolean;
}

export default function InputField({ onSubmit, isLoading = false }: Props) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = url.trim();
    if (!trimmed) { setError('يرجى إدخال رابط الفيديو'); return; }
    if (!isValidUrl(trimmed)) { setError('الرابط غير صحيح — تأكد أنه يبدأ بـ https://'); return; }
    try { await onSubmit(trimmed); setUrl(''); } catch { /* handled by parent */ }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && isValidUrl(text.trim())) { setUrl(text.trim()); setError(''); }
    } catch { /* clipboard not available */ }
  };

  const borderColor = focused
    ? 'rgba(139,92,246,0.7)'
    : error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)';

  const boxShadow = focused ? '0 0 0 4px rgba(139,92,246,0.15)' : 'none';

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, borderRadius: 14,
        border: `2px solid ${borderColor}`, background: 'rgba(255,255,255,0.04)',
        transition: 'all 0.2s ease', boxShadow, overflow: 'hidden',
      }}>
        <div style={{ flexShrink: 0, paddingRight: 14 }}>
          <Link2 size={16} color={focused ? '#a78bfa' : '#6b7280'} />
        </div>

        <input
          ref={inputRef}
          type="url"
          placeholder="الصق رابط الفيديو هنا..."
          value={url}
          onChange={e => { setUrl(e.target.value); if (error) setError(''); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={isLoading}
          dir="ltr"
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: '#f0f2ff', fontSize: 14, padding: '14px 0', fontFamily: 'monospace',
            minWidth: 0,
          }}
        />

        {url && !isLoading && (
          <button type="button" onClick={() => { setUrl(''); setError(''); }}
            style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 6px', color: '#6b7280' }}>
            <X size={15} />
          </button>
        )}

        {!url && !isLoading && (
          <button type="button" onClick={handlePaste}
            style={{ flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#a78bfa',
              background: 'rgba(139,92,246,0.12)', border: 'none', cursor: 'pointer',
              padding: '6px 12px', marginLeft: 6, borderRadius: 8 }}>
            لصق
          </button>
        )}

        <button type="submit" disabled={isLoading || !url.trim()}
          style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
            fontWeight: 700, fontSize: 13, padding: '10px 20px', margin: 6,
            borderRadius: 10, border: 'none', cursor: isLoading || !url.trim() ? 'not-allowed' : 'pointer',
            background: isLoading || !url.trim() ? 'rgba(139,92,246,0.3)' : '#8b5cf6',
            color: isLoading || !url.trim() ? 'rgba(255,255,255,0.5)' : '#fff',
            transition: 'all 0.2s', boxShadow: !isLoading && url.trim() ? '0 4px 16px rgba(139,92,246,0.35)' : 'none',
          }}>
          {isLoading
            ? <><Loader2 size={15} className="animate-spin" /><span>جاري...</span></>
            : <><Download size={15} /><span>تحميل</span></>
          }
        </button>
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: 13, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
          {error}
        </p>
      )}
    </form>
  );
}
