import { useState } from 'react';
import { Download, Copy, CheckCircle, ExternalLink, Film } from 'lucide-react';
import { platformLabels, platformBadge, type Platform } from '../lib/utils';

interface Props {
  title: string;
  thumbnail?: string;
  platform: Platform;
  downloadUrl?: string;
  onDownload?: () => void;
  onCopyLink?: () => void;
}

export default function VideoResult({ title, thumbnail, platform, downloadUrl, onDownload, onCopyLink }: Props) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const gradients: Record<Platform, string> = {
    youtube: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
    tiktok: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
    instagram: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.05))',
    other: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))',
  };

  const handleCopy = () => {
    onCopyLink?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass card-hover" style={{ borderRadius: 18, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Thumbnail */}
        <div style={{ width: 160, minHeight: 110, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          {thumbnail && !imgError ? (
            <img src={thumbnail} alt={title} onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', minHeight: 110,
              background: gradients[platform], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Film size={36} color="rgba(255,255,255,0.2)" />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
            <span className={platformBadge[platform]}
              style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 99 }}>
              {platformLabels[platform]}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5, color: '#f0f2ff',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {title}
          </h3>

          {downloadUrl && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button onClick={onDownload}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#8b5cf6',
                  color: '#fff', fontWeight: 700, fontSize: 13, padding: '8px 16px', borderRadius: 10,
                  border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>
                <Download size={13} />تحميل
              </button>

              <button onClick={handleCopy}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 13,
                  padding: '8px 14px', borderRadius: 10, border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  background: copied ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.05)',
                  color: copied ? '#4ade80' : '#9ca3af', cursor: 'pointer', transition: 'all 0.2s' }}>
                {copied ? <><CheckCircle size={13} />تم النسخ</> : <><Copy size={13} />نسخ الرابط</>}
              </button>

              <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6b7280',
                  fontSize: 13, padding: '8px 12px', borderRadius: 10, textDecoration: 'none',
                  border: '1px solid transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f0f2ff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'transparent'; }}>
                <ExternalLink size={13} />فتح
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
