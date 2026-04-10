import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const COBALT_INSTANCES = [
  'https://cobalt.meowing.de',
  'https://cobalt.canine.tools',
  'https://cobalt.3kh0.net',
  'https://cobalt.tools',
];

function detectPlatform(url: string): 'youtube' | 'tiktok' | 'instagram' | 'other' {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.includes('instagram.com')) return 'instagram';
  return 'other';
}

async function fetchFromCobalt(url: string, instance: string): Promise<any> {
  const response = await fetch(`${instance}/api/json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ url, videoQuality: '720' }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json() as any;
  if (data.status === 'error') throw new Error(data.text || 'API error');
  return data;
}

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ status: 'error', message: 'الرابط مطلوب' });
    return;
  }

  try {
    new URL(url);
  } catch {
    res.status(400).json({ status: 'error', message: 'الرابط غير صحيح' });
    return;
  }

  const platform = detectPlatform(url);
  let result: any = null;

  for (const instance of COBALT_INSTANCES) {
    try {
      result = await fetchFromCobalt(url, instance);
      if (result && result.status !== 'error') break;
    } catch {
      continue;
    }
  }

  if (!result || result.status === 'error') {
    res.status(500).json({
      status: 'error',
      message: 'فشل الاتصال بخدمة التحميل. يرجى المحاولة مرة أخرى.',
    });
    return;
  }

  let downloadUrl = '';
  if (typeof result.url === 'string') downloadUrl = result.url;
  else if (Array.isArray(result.picker) && result.picker.length > 0) {
    downloadUrl = result.picker[0].url;
  }

  if (!downloadUrl) {
    res.status(500).json({
      status: 'error',
      message: 'لم نتمكن من العثور على رابط تحميل لهذا الفيديو.',
    });
    return;
  }

  res.json({
    status: 'success',
    downloadUrl,
    title: result.title || 'فيديو جاهز للتحميل',
    thumbnail: result.thumbnail,
    platform,
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
