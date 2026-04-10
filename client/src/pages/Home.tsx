import { useState } from 'react';
import { toast } from 'sonner';
import { Download, Shield, Zap, Sparkles, Github, Play } from 'lucide-react';
import InputField from '../components/InputField';
import VideoResult from '../components/VideoResult';
import { detectPlatform, type Platform } from '../lib/utils';

interface DownloadItem {
  id: string;
  title: string;
  platform: Platform;
  thumbnail?: string;
  downloadUrl?: string;
}

export default function Home() {
  const [results, setResults] = useState<DownloadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        toast.error(data.message || 'حدث خطأ أثناء معالجة الرابط');
        return;
      }

      const platform = (data.platform as Platform) || detectPlatform(url);
      setResults((prev) => [
        { id: Date.now().toString(), title: data.title, platform, thumbnail: data.thumbnail, downloadUrl: data.downloadUrl },
        ...prev,
      ]);
      toast.success('الفيديو جاهز للتحميل!');
    } catch {
      toast.error('تعذّر الاتصال بالخادم. تأكد من تشغيله.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}
          className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <Download size={16} color="#a78bfa" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>محمل الفيديوهات</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2"
              style={{ fontSize: 12, color: 'var(--muted)', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 99 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} className="animate-pulse" />
              متاح الآن
            </div>
            <a href="https://github.com/aayyaayy/ahmed_yhya" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--muted)' }} className="hover:text-white transition-colors">
              <Github size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: '80px 20px 100px' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'rgba(139,92,246,0.12)', filter: 'blur(100px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(59,130,246,0.08)', filter: 'blur(80px)', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="inline-flex items-center gap-2 glass"
            style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa', padding: '8px 16px',
              borderRadius: 99, marginBottom: 28, border: '1px solid rgba(139,92,246,0.25)' }}>
            <Sparkles size={13} />
            يدعم YouTube · TikTok · Instagram
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.15,
            marginBottom: 16, color: 'var(--text)' }}>
            حمّل أي فيديو<br />
            <span className="gradient-text">في ثانية واحدة</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
            ألصق الرابط واحصل على رابط تحميل مباشر من أشهر المنصات. بسيط، سريع، مجاني.
          </p>

          {/* Input card */}
          <div style={{ borderRadius: 20, padding: 1,
            background: 'linear-gradient(135deg, rgba(167,139,250,0.4), rgba(96,165,250,0.4), rgba(52,211,153,0.2))' }}>
            <div className="glass-strong" style={{ borderRadius: 19, padding: '28px 32px' }}>
              <InputField onSubmit={handleDownload} isLoading={isLoading} />
              <div className="flex items-center justify-center gap-3 flex-wrap" style={{ marginTop: 18 }}>
                {[
                  { name: 'YouTube', cls: 'bg-red-500/15 text-red-400 border-red-500/25' },
                  { name: 'TikTok', cls: 'bg-white/10 text-white border-white/20' },
                  { name: 'Instagram', cls: 'bg-pink-500/15 text-pink-400 border-pink-500/25' },
                ].map(p => (
                  <span key={p.name} className={`${p.cls} border`}
                    style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 flex-wrap" style={{ marginTop: 32, fontSize: 13, color: 'var(--muted)' }}>
            {[
              { icon: <Zap size={14} color="#fbbf24" />, text: 'سريع جداً' },
              { icon: <Shield size={14} color="#4ade80" />, text: 'آمن وخاص' },
              { icon: <Sparkles size={14} color="#a78bfa" />, text: 'مجاني 100%' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">{s.icon}<span>{s.text}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      {results.length > 0 && (
        <section style={{ padding: '0 20px 48px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
              <div style={{ width: 4, height: 24, borderRadius: 4,
                background: 'linear-gradient(to bottom, #a78bfa, #60a5fa)' }} />
              <h2 style={{ fontWeight: 700, fontSize: 17 }}>روابط التحميل</h2>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa',
                background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)',
                padding: '2px 10px', borderRadius: 99 }}>{results.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {results.map(r => (
                <VideoResult key={r.id} {...r}
                  onDownload={() => r.downloadUrl && window.open(r.downloadUrl, '_blank', 'noopener,noreferrer')}
                  onCopyLink={() => {
                    if (r.downloadUrl) {
                      navigator.clipboard.writeText(r.downloadUrl);
                      toast.success('تم نسخ الرابط');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>لماذا محملنا؟</h2>
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>الأداة الأفضل لتحميل الفيديوهات مجاناً</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: <Zap size={22} color="#fbbf24" />, bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)',
                title: 'تحميل فوري', desc: 'يعالج الرابط ويحضر التحميل في ثوانٍ. بدون انتظار.' },
              { icon: <Shield size={22} color="#4ade80" />, bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)',
                title: 'خصوصية كاملة', desc: 'لا نحفظ أي بيانات ولا روابط. التحميل من المصدر مباشرةً.' },
              { icon: <Sparkles size={22} color="#a78bfa" />, bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)',
                title: 'سهل الاستخدام', desc: 'فقط ألصق الرابط واضغط تحميل. لا تسجيل، لا اشتراك.' },
            ].map(f => (
              <div key={f.title} className="glass card-hover" style={{ borderRadius: 18, padding: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg,
                  border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section style={{ padding: '60px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.04), transparent)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>كيفية الاستخدام</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 48, fontSize: 15 }}>ثلاث خطوات بسيطة</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
            {[
              { num: '١', grad: 'linear-gradient(135deg, #a78bfa, #60a5fa)', title: 'انسخ الرابط', desc: 'افتح الفيديو وانسخ رابطه' },
              { num: '٢', grad: 'linear-gradient(135deg, #60a5fa, #22d3ee)', title: 'الصق وحمّل', desc: 'الصق الرابط واضغط تحميل' },
              { num: '٣', grad: 'linear-gradient(135deg, #22d3ee, #4ade80)', title: 'احفظ الفيديو', desc: 'انقر تحميل أو انسخ الرابط المباشر' },
            ].map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: s.grad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 18,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>{s.num}</div>
                <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{s.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 13 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="glass-strong" style={{ borderRadius: 28, padding: '48px 40px', textAlign: 'center',
            position: 'relative', overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))',
              pointerEvents: 'none' }} />
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="pulse-glow" style={{ width: 64, height: 64, borderRadius: 20,
                background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Play size={28} color="#a78bfa" fill="rgba(167,139,250,0.4)" />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>جاهز للتحميل؟</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>ابدأ الآن بلا تسجيل ولا اشتراك</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: 14,
                  padding: '12px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(139,92,246,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Download size={16} />
                ابدأ الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '28px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex',
          flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 8,
              background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Download size={13} color="#a78bfa" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 13 }}>محمل الفيديوهات الذكي</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="https://github.com/aayyaayy/ahmed_yhya" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--muted)', display: 'flex', gap: 4, alignItems: 'center' }}
              className="hover:text-white transition-colors">
              <Github size={13} />Ahmed Yahya
            </a>
            <span>·</span>
            <span>&copy; 2026 · للاستخدام الشخصي فقط</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
