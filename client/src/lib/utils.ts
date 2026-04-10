export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'other';

export function detectPlatform(url: string): Platform {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.includes('instagram.com')) return 'instagram';
  return 'other';
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export const platformLabels: Record<Platform, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  other: 'فيديو',
};

export const platformBadge: Record<Platform, string> = {
  youtube: 'bg-red-500 text-white',
  tiktok: 'bg-black text-white border border-white/20',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  other: 'bg-blue-600 text-white',
};
